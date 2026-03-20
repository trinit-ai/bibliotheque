"""
Bibliothèque Session API
Handles session start and turn with security guards.
"""
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from typing import Optional

from security import check_input, clean_output, check_rate_limit

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


@router.post("/start")
async def start_session(req: SessionStartRequest) -> dict:
    """Start a new session with a pack or living book."""
    # TODO: wire to embedded engine pack_loader + assembler
    # For now return a stub session
    import uuid
    session_id = str(uuid.uuid4())
    return {
        "session_id": session_id,
        "pack_id": req.pack_id,
        "content_type": req.content_type,
        "status": "open",
        "greeting": f"Session opened for {req.pack_id}. How can I help?",
    }


@router.post("/turn")
async def session_turn(req: SessionTurnRequest, request: Request) -> dict:
    """
    Send a message in an existing session.
    Security pipeline: rate limit → input guard → LLM → output guard → respond.
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

    # 3. Call LLM (TODO: wire to embedded engine)
    # For now return a demo response
    raw_response = f"Thank you for your question about '{req.message[:50]}'. This is a demo response — the engine will be wired here."

    # 4. Output guard
    cleaned = clean_output(raw_response)

    return {
        "session_id": req.session_id,
        "response": cleaned,
        "flagged": False,
    }
