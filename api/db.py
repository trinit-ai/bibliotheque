from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, logger

_db: Client | None = None
_anon_db: Client | None = None


def create_db(url: str, key: str) -> Client:
    """Create a Supabase client with the given URL and key."""
    return create_client(url, key)


def init_db() -> None:
    """Initialize the database clients. Called during app lifespan startup."""
    global _db, _anon_db
    if not SUPABASE_URL:
        logger.warning("SUPABASE_URL not set — database features disabled")
        return
    if SUPABASE_SERVICE_ROLE_KEY:
        try:
            _db = create_db(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
            logger.info("Supabase service-role client initialized")
        except Exception as exc:
            logger.warning(f"Supabase service-role init failed (non-fatal): {exc}")
    if SUPABASE_ANON_KEY:
        try:
            _anon_db = create_db(SUPABASE_URL, SUPABASE_ANON_KEY)
            logger.info("Supabase anon client initialized")
        except Exception as exc:
            logger.warning(f"Supabase anon init failed (non-fatal): {exc}")


def get_db() -> Client | None:
    """Return the service-role Supabase client (or None if not configured)."""
    return _db


def get_anon_db() -> Client | None:
    """Return the anon Supabase client (or None if not configured)."""
    return _anon_db
