"""
Bibliothèque Session API
Real sessions powered by the embedded 13TMOS engine.
"""
import sys
import uuid
from pathlib import Path
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from typing import Optional

from config import logger
from security import check_input, clean_output, check_rate_limit

# Add engine to path
ENGINE_DIR = Path(__file__).parent / "engine"
sys.path.insert(0, str(ENGINE_DIR))

from state import SessionState
from engine.session_store import SessionStore
from engine.assembler import Assembler
from engine.llm_provider import init_llm_provider, get_llm_provider

# ── Singletons ────────────────────────────────────────────────────────────

_store: Optional[SessionStore] = None
_llm_initialized = False


def _get_store() -> SessionStore:
    global _store
    if _store is None:
        _store = SessionStore(cache=None)
    return _store


def _ensure_llm():
    global _llm_initialized
    if not _llm_initialized:
        init_llm_provider()
        _llm_initialized = True


# ── Request/Response Models ───────────────────────────────────────────────

router = APIRouter()


class SessionStartRequest(BaseModel):
    pack_id: str
    content_type: str = "pack"
    visitor_name: Optional[str] = None


class SessionTurnRequest(BaseModel):
    session_id: str
    message: str
    user_id: str = "anonymous"
    content_id: str = "_global"
    tier: str = "anonymous"


# ── Routes ────────────────────────────────────────────────────────────────

@router.post("/start")
async def start_session(req: SessionStartRequest) -> dict:
    """Start a new session with a pack or living book."""
    store = _get_store()
    _ensure_llm()

    session_id = str(uuid.uuid4())[:8]
    state = SessionState(
        session_id=session_id,
        pack_id=req.pack_id,
        user_id="anonymous",
    )

    # Try to load the pack and generate a greeting
    greeting = ""
    try:
        pack = _load_pack(req.pack_id)
        assembler = Assembler(pack=pack)
        system_prompt = assembler.build_system_prompt(state)

        provider = get_llm_provider()
        response = await provider.generate(
            system=system_prompt,
            messages=[{"role": "user", "content": "(session opened — deliver your greeting)"}],
            max_tokens=1024,
        )
        greeting = clean_output(response.text)
        state.add_message("assistant", greeting)
        state.tokens_input += response.input_tokens
        state.tokens_output += response.output_tokens
    except Exception as exc:
        import traceback
        logger.warning(f"Could not generate greeting for {req.pack_id}: {exc}\n{traceback.format_exc()}")
        greeting = f"Welcome to {req.pack_id.replace('_', ' ').title()}. How can I help?"
        state.add_message("assistant", greeting)

    store.put(state)

    return {
        "session_id": session_id,
        "pack_id": req.pack_id,
        "content_type": req.content_type,
        "status": "open",
        "greeting": greeting,
    }


@router.post("/turn")
async def session_turn(req: SessionTurnRequest, request: Request) -> dict:
    """
    Send a message in an existing session.
    Pipeline: rate limit → input guard → assemble → LLM → output guard → respond.
    """
    # 1. Rate limiting
    db = getattr(request.app.state, "db", None)
    if db:
        allowed = await check_rate_limit(db, req.user_id, req.content_id, req.tier)
        if not allowed:
            raise HTTPException(
                status_code=429,
                detail="Turn limit reached. Register for more turns or try again tomorrow."
            )

    # 2. Input guard
    input_check = check_input(req.message)
    if not input_check.safe:
        return {
            "session_id": req.session_id,
            "response": "I'm not able to process that request. Could you rephrase?",
            "flagged": True,
            "flag_category": input_check.category,
        }

    # 3. Load session state
    store = _get_store()
    _ensure_llm()
    state = store.get(req.session_id)

    if not state:
        # Session expired or not found — create a fresh one
        state = SessionState(
            session_id=req.session_id,
            pack_id="guest",
            user_id=req.user_id,
        )

    # 4. Add user message
    state.add_message("user", req.message)
    state.turn_count += 1

    # 5. Build system prompt and call LLM
    try:
        pack = _load_pack(state.pack_id)
        assembler = Assembler(pack=pack)
        system_prompt = assembler.build_system_prompt(state)

        provider = get_llm_provider()
        response = await provider.generate(
            system=system_prompt,
            messages=state.history,
            max_tokens=4096,
        )

        raw_response = response.text
        state.tokens_input += response.input_tokens
        state.tokens_output += response.output_tokens

    except Exception as exc:
        import traceback
        tb = traceback.format_exc()
        logger.error(f"LLM call failed: {exc}\n{tb}")
        raw_response = f"DEBUG — LLM error: {exc}\n\nTraceback:\n{tb[-500:]}"

    # 6. Output guard
    cleaned = clean_output(raw_response)

    # 7. Update state
    state.add_message("assistant", cleaned)
    state.update_depth()
    store.put(state)

    return {
        "session_id": req.session_id,
        "response": cleaned,
        "turn": state.turn_count,
        "flagged": False,
    }


@router.get("/guest")
async def get_guest_pack() -> dict:
    """Return the default getting-started pack metadata."""
    return {
        "pack_id": "bibliotheque_getting_started",
        "title": "Getting Started",
        "subtitle": "What Bibliothèque is and how it works",
        "content_type": "pack",
        "portal": "brand",
    }


@router.get("/{session_id}")
async def get_session(session_id: str) -> dict:
    """Get session state (for reconnection)."""
    store = _get_store()
    state = store.get(session_id)
    if not state:
        raise HTTPException(status_code=404, detail="Session not found")

    return {
        "session_id": state.session_id,
        "pack_id": state.pack_id,
        "turn_count": state.turn_count,
        "history": state.history[-20:],
    }


# ── Helpers ───────────────────────────────────────────────────────────────

_LIBRARY_ALIASES: dict[str, str] = {
    "machines_of_loving_grace": "amodei_machines_loving_grace",
}


def _load_pack(pack_id: str):
    """Try to load a pack, with fallbacks.

    Searches: protocols/packs/ first, then protocols/library/ subdirectories.
    """
    from pathlib import Path

    # 1. Try loading from protocols/packs/ (engine packs)
    try:
        from engine.pack_loader import PackLoader
        return PackLoader(pack_id)
    except Exception:
        pass

    # 2. Try loading from protocols/library/ subdirectories
    library_base = Path(__file__).parent.parent / "protocols" / "library"
    dir_name = _LIBRARY_ALIASES.get(pack_id, pack_id)
    if library_base.exists():
        for subdir in library_base.iterdir():
            if not subdir.is_dir():
                continue
            pack_dir = subdir / dir_name
            if pack_dir.exists() and (pack_dir / "master.md").exists():
                logger.info(f"Pack '{pack_id}' found in library at {pack_dir}")
                try:
                    from engine.assembler import Assembler
                    assembler = Assembler(protocol_dir=pack_dir)
                    # Return a minimal pack-like object so the assembler can work
                    return _LibraryPack(pack_id, pack_dir)
                except Exception as exc:
                    logger.warning(f"Failed to load library pack {pack_id}: {exc}")

    logger.info(f"Pack '{pack_id}' not found, using minimal assembler")
    return None


class _LibraryPack:
    """Minimal pack wrapper for library protocol directories."""

    def __init__(self, pack_id: str, protocol_dir):
        from pathlib import Path
        self.pack_id = pack_id
        self.protocol_dir = Path(protocol_dir)
        self.name = pack_id.replace("_", " ").title()
        self.version = "1.0"
        self.cartridges = {}
        self.system_screens = {}
        self.settings = {}
        self.features = {}
        self.commands = {}
        self.personality = {}
        self.nav = {}
