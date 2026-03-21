import os
import logging
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# ---------------------------------------------------------------------------
# Paths (required by engine modules)
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).parent.parent
PROTOCOL_DIR = BASE_DIR / "protocols" / "packs" / "guest"  # default fallback

# ---------------------------------------------------------------------------
# LLM
# ---------------------------------------------------------------------------
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
TMOS13_MODEL = os.getenv("TMOS13_MODEL", "claude-sonnet-4-6")
TMOS13_FALLBACK_MODEL = os.getenv("TMOS13_FALLBACK_MODEL", "")
TMOS13_LLM_PROVIDER = os.getenv("TMOS13_LLM_PROVIDER", "")

# ---------------------------------------------------------------------------
# Supabase
# ---------------------------------------------------------------------------
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------
ENV = os.getenv("ENV", "development")
PORT = int(os.getenv("PORT", "8001"))
ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:3001,https://bibliotheque.ai"
    ).split(",")
]

# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------
REGISTRATION_OPEN = os.getenv("REGISTRATION_OPEN", "true").lower() == "true"

# ---------------------------------------------------------------------------
# Engine compatibility (functions/vars expected by engine modules)
# ---------------------------------------------------------------------------
MODEL = TMOS13_MODEL
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
TMOS13_MANIFEST_ENABLED = os.getenv("TMOS13_MANIFEST_ENABLED", "false").lower() == "true"
WEB_SEARCH_ENABLED = os.getenv("WEB_SEARCH_ENABLED", "false").lower() == "true"
WEB_SEARCH_MAX_RESULTS = int(os.getenv("WEB_SEARCH_MAX_RESULTS", "5"))

_active_pack = None
_active_cartridges: dict = {}


def get_pack():
    """Return the currently active pack (if any)."""
    return _active_pack


def set_pack(pack):
    """Set the active pack."""
    global _active_pack
    _active_pack = pack


def get_cartridges():
    """Return the active cartridges dict."""
    return _active_cartridges


def get_default_settings():
    """Return default session settings for the engine."""
    return {
        "model": TMOS13_MODEL,
        "max_tokens": 4096,
        "temperature": 0.7,
    }

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()

logger = logging.getLogger("bibliotheque")
logger.setLevel(getattr(logging, LOG_LEVEL, logging.INFO))

if not logger.handlers:
    handler = logging.StreamHandler()
    handler.setFormatter(
        logging.Formatter("%(asctime)s | %(name)s | %(levelname)s | %(message)s")
    )
    logger.addHandler(handler)
