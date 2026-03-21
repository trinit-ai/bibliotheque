import sys
from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import ALLOWED_ORIGINS, ENV, PORT, logger
from db import init_db
from catalogue import init_catalogue, get_catalogue

# Ensure engine is importable (append so api/ modules take priority)
ENGINE_DIR = Path(__file__).parent / "engine"
if str(ENGINE_DIR) not in sys.path:
    sys.path.append(str(ENGINE_DIR))

# Route modules
from api_catalogue import router as catalogue_router
from api_session import router as session_router
from api_search import router as search_router

# Optional route modules (may not exist yet)
try:
    from api_book import router as book_router
except ImportError:
    book_router = None
try:
    from api_wiki import router as wiki_router
except ImportError:
    wiki_router = None
try:
    from api_auth import router as auth_router
except ImportError:
    auth_router = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown logic."""
    logger.info(f"Bibliothèque API starting (env={ENV})")

    # Database
    init_db()

    # Catalogue (static + living books)
    init_catalogue()

    # Initialize LLM provider
    try:
        from engine.llm_provider import init_llm_provider
        provider = init_llm_provider()
        logger.info(f"LLM provider initialized: {provider.__class__.__name__}")
    except Exception as exc:
        logger.warning(f"LLM provider init failed (sessions will fail): {exc}")

    logger.info("Bibliothèque API ready")
    yield
    logger.info("Bibliothèque API stopped")


app = FastAPI(
    title="Bibliothèque API",
    description="Backend API for bibliotheque.ai — the living library",
    version="0.1.0",
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# Middleware
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
app.include_router(catalogue_router, prefix="/api/catalogue", tags=["catalogue"])
app.include_router(session_router, prefix="/api/session", tags=["session"])
app.include_router(search_router, prefix="/api/search", tags=["search"])

if book_router:
    app.include_router(book_router, prefix="/api/book", tags=["book"])
if wiki_router:
    app.include_router(wiki_router, prefix="/api/wiki", tags=["wiki"])
if auth_router:
    app.include_router(auth_router, prefix="/api/auth", tags=["auth"])


@app.get("/health")
async def health():
    """Health check endpoint."""
    catalogue = get_catalogue()
    return {
        "status": "ok",
        "env": ENV,
        "catalogue_entries": len(catalogue.all_entries()),
    }


@app.get("/debug/files")
async def debug_files():
    """Temporary: show what pack files exist on disk."""
    from pathlib import Path
    library_base = Path(__file__).parent.parent / "protocols" / "library"
    packs_base = Path(__file__).parent.parent / "protocols" / "packs"
    result = {
        "library_base_exists": library_base.exists(),
        "library_base_path": str(library_base),
        "packs_base_exists": packs_base.exists(),
        "library_dirs": {},
        "api_session_has_aliases": False,
    }
    if library_base.exists():
        for subdir in sorted(library_base.iterdir()):
            if subdir.is_dir():
                packs = []
                for pack_dir in sorted(subdir.iterdir()):
                    if pack_dir.is_dir():
                        files = [f.name for f in pack_dir.iterdir()]
                        packs.append({"name": pack_dir.name, "files": files})
                result["library_dirs"][subdir.name] = packs
    try:
        from api_session import _LIBRARY_ALIASES
        result["api_session_has_aliases"] = True
        result["aliases"] = _LIBRARY_ALIASES
    except Exception:
        pass
    return result


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=PORT, reload=(ENV == "development"))
