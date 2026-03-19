from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import ALLOWED_ORIGINS, ENV, PORT, logger
from db import init_db
from engine_client import init_engine_client, get_engine_client
from catalogue import init_catalogue, get_catalogue

# Route modules
from api_catalogue import router as catalogue_router
from api_session import router as session_router
from api_search import router as search_router
from api_book import router as book_router
from api_wiki import router as wiki_router
from api_auth import router as auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown logic."""
    # --- Startup ---
    logger.info(f"Bibliothèque API starting (env={ENV})")

    # Database
    init_db()

    # Engine client
    engine = init_engine_client()

    # Catalogue (static + living books loaded synchronously)
    catalogue = init_catalogue()

    # Try to load engine packs into catalogue
    try:
        packs = await engine.list_packs()
        await catalogue.load_from_engine(packs)
    except Exception as exc:
        logger.warning(f"Could not load engine packs at startup: {exc}")

    logger.info("Bibliothèque API ready")
    yield

    # --- Shutdown ---
    try:
        await get_engine_client().close()
    except Exception:
        pass
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
app.include_router(book_router, prefix="/api/book", tags=["book"])
app.include_router(wiki_router, prefix="/api/wiki", tags=["wiki"])
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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=PORT, reload=(ENV == "development"))
