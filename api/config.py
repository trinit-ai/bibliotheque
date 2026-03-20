import os
import logging
from dotenv import load_dotenv

load_dotenv()

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
