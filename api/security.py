"""
Bibliothèque Security Layer
Library-grade: prompt guard, output guard, rate limiting, signal stripping.

Usage:
    from security import check_input, clean_output, check_rate_limit

    # Before sending to LLM
    result = check_input(user_message)
    if result.blocked:
        return {"error": "Message flagged", "category": result.category}

    # After receiving from LLM
    clean = clean_output(assistant_response)

    # Rate limiting
    allowed = await check_rate_limit(db, user_id, content_id, tier)
    if not allowed:
        return {"error": "Rate limit exceeded", "retry_after": "tomorrow"}
"""
import re
import logging
from dataclasses import dataclass
from typing import Optional
from datetime import datetime, timezone

logger = logging.getLogger("bibliotheque.security")


# ── Input Guard ──────────────────────────────────────────────────────────

@dataclass
class InputCheckResult:
    safe: bool
    category: Optional[str] = None
    severity: int = 0
    matched: Optional[str] = None

# Patterns: (regex, category, severity 1-3)
_INJECTION_PATTERNS = [
    # Direct instruction override
    (r"ignore\s+(all\s+|your\s+|the\s+)*(previous|prior|above)\s+(instructions?|prompts?|rules?)",
     "instruction_override", 3),
    (r"disregard\s+(all\s+|your\s+|the\s+)*(previous|prior|above|your)\s+(instructions?|prompts?|rules?)",
     "instruction_override", 3),
    (r"forget\s+(everything|all)\s+(you\s+)?(know|were\s+told|learned)",
     "instruction_override", 3),
    (r"you\s+are\s+now\s+(a|an|in)\s+",
     "role_hijack", 2),
    (r"new\s+instructions?\s*:",
     "instruction_override", 3),

    # System prompt extraction
    (r"(print|show|display|reveal|output|repeat)\s+(your\s+)?(system\s+prompt|instructions?|rules?|protocol)",
     "extraction", 3),
    (r"what\s+(are|were)\s+your\s+(initial|system|original)\s+(instructions?|prompt|rules?)",
     "extraction", 2),
    (r"(beginning|start)\s+of\s+(your\s+)?(prompt|instructions?|system)",
     "extraction", 2),

    # Encoding evasion
    (r"base64\s*:\s*[A-Za-z0-9+/=]{20,}",
     "encoding_evasion", 2),
    (r"decode\s+this\s*:",
     "encoding_evasion", 2),

    # DAN / jailbreak
    (r"(DAN|do\s+anything\s+now)",
     "jailbreak", 3),
    (r"pretend\s+(you\s+)?(have\s+)?no\s+(rules?|restrictions?|limitations?|filters?)",
     "jailbreak", 3),
    (r"act\s+as\s+if\s+(you\s+)?(have|had)\s+no\s+(rules?|restrictions?|guidelines?)",
     "jailbreak", 2),
]

_COMPILED_PATTERNS = [
    (re.compile(p, re.IGNORECASE), cat, sev)
    for p, cat, sev in _INJECTION_PATTERNS
]


def check_input(text: str) -> InputCheckResult:
    """
    Scan user input for prompt injection patterns.
    Returns InputCheckResult with safe=True if clean.

    Library policy: log all detections, only block severity 3.
    Severity 1-2: log and allow (library users ask unusual things).
    Severity 3: block (unambiguous attack).
    """
    for pattern, category, severity in _COMPILED_PATTERNS:
        match = pattern.search(text)
        if match:
            logger.warning(
                "Input guard: %s (severity %d) — '%s'",
                category, severity, match.group(0)[:50]
            )
            if severity >= 3:
                return InputCheckResult(
                    safe=False,
                    category=category,
                    severity=severity,
                    matched=match.group(0)[:50],
                )
            # Severity 1-2: log but allow
            return InputCheckResult(safe=True, category=category, severity=severity)

    return InputCheckResult(safe=True)


# ── Output Guard ─────────────────────────────────────────────────────────

# Patterns for things that should never appear in responses
_OUTPUT_STRIP_PATTERNS = [
    re.compile(r'\[STATE:[^\]]+\]'),
    re.compile(r'\[NAVIGATE:[^\]]+\]'),
    re.compile(r'\[ACTION:[^\]]+\]'),
    re.compile(r'\[FIELD:[^\]]+\]'),
    re.compile(r'\[CARTRIDGE:[^\]]+\]'),
    re.compile(r'\[TOOL_REQUEST:[^\]]*\]'),
    re.compile(r'\[REQUIRES_CONFIRMATION\]'),
    re.compile(r'^:::\w*\s*$', re.MULTILINE),
]

# System prompt leakage patterns
_LEAK_PATTERNS = [
    re.compile(r'\[PROTOCOL BOUNDARY\]', re.IGNORECASE),
    re.compile(r'\[END OF PROTOCOL INSTRUCTIONS\]', re.IGNORECASE),
    re.compile(r'\[SYSTEM INTELLIGENCE\]', re.IGNORECASE),
    re.compile(r'AUTHORIZED ACTIONS:', re.IGNORECASE),
    re.compile(r'PROHIBITED ACTIONS:', re.IGNORECASE),
    re.compile(r'KILL LIST:', re.IGNORECASE),
]


def clean_output(text: str) -> str:
    """
    Strip engine signals and check for protocol leakage.
    Always runs before returning a response to the client.
    """
    cleaned = text

    # Strip engine signals
    for pattern in _OUTPUT_STRIP_PATTERNS:
        cleaned = pattern.sub('', cleaned)

    # Check for protocol leakage
    for pattern in _LEAK_PATTERNS:
        if pattern.search(cleaned):
            logger.warning("Output guard: protocol leakage detected — %s", pattern.pattern[:40])
            # Redact the leaked section rather than blocking the whole response
            cleaned = pattern.sub('[redacted]', cleaned)

    # Collapse multiple blank lines
    cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)

    return cleaned.strip()


# ── Rate Limiting ────────────────────────────────────────────────────────

TIER_LIMITS = {
    "anonymous": 5,    # per topic per day
    "free": 50,        # per day total
    "reader": 999999,  # effectively unlimited
}


async def check_rate_limit(
    db,
    user_id: str,
    content_id: str,
    tier: str = "anonymous",
) -> bool:
    """
    Check if the user/IP has remaining turns for this content.
    Returns True if allowed, False if rate limited.

    Checks bib_rate_limits table. Upserts on each allowed turn.
    """
    limit = TIER_LIMITS.get(tier, 5)
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    try:
        # Check current count
        identifier = user_id
        identifier_type = "user" if user_id != "anonymous" else "ip"
        topic = content_id if tier == "anonymous" else "_global"

        result = db.table("bib_rate_limits").select("turns_used").match({
            "identifier": identifier,
            "identifier_type": identifier_type,
            "topic": topic,
        }).gte("window_start", f"{today}T00:00:00Z").execute()

        current = 0
        if result.data:
            current = result.data[0].get("turns_used", 0)

        if current >= limit:
            logger.info("Rate limited: %s (%s) — %d/%d", identifier[:8], tier, current, limit)
            return False

        # Increment
        db.table("bib_rate_limits").upsert({
            "identifier": identifier,
            "identifier_type": identifier_type,
            "topic": topic,
            "turns_used": current + 1,
            "window_start": f"{today}T00:00:00Z",
        }, on_conflict="identifier,identifier_type,topic,window_start").execute()

        return True

    except Exception as e:
        logger.warning("Rate limit check failed (allowing): %s", e)
        return True  # fail open — don't block on DB errors
