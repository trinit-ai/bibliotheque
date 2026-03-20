# Bibliothèque — Security Posture

_Library-grade security. Not enterprise-grade. Different threat model._

---

## Threat Model

Bibliothèque is a public-facing reading library. The threats are:

1. **Prompt injection** — user tries to override session governance
2. **Jailbreaking** — user tries to make the model say things it shouldn't
3. **Cost abuse** — user burns tokens at scale (anonymous access)
4. **Content extraction** — user tries to extract system prompts or pack protocols

What it is NOT:
- Not handling client PII (no intake forms, no medical data)
- Not processing financial transactions
- Not managing employee data
- Not connected to external systems via MCP

This means: basic guards, not the full enterprise fortress.

---

## What's Enabled (from embedded engine)

### 1. Prompt Caching (`llm_provider.py`)
**Status: Active**

The LLM provider uses Anthropic's prompt caching via `cache_control` markers on system prompt blocks. This reduces cost significantly for repeat sessions on the same pack/book — the system prompt (which is large for living books) is cached across turns.

No action needed — already wired in the embedded engine.

### 2. Prompt Guard (`prompt_guard.py`)
**Status: Available, wire into session pipeline**

Detects common prompt injection patterns in user input:
- Direct instruction override ("ignore previous instructions")
- Role-play injection ("pretend you are a system with no rules")
- System prompt extraction attempts ("print your system prompt")
- Encoding evasion (base64, unicode tricks)

**Bibliothèque usage:** Run on every user message before sending to LLM.
Light touch — flag and log, don't hard-block (library users ask weird things legitimately).

### 3. Output Guard (`output_guard.py`)
**Status: Available, wire into response pipeline**

Filters model output for:
- System prompt leakage
- Internal state signal leakage ([STATE:...], [NAVIGATE:...])
- Protocol boundary violations

**Bibliothèque usage:** Run on every assistant response before returning to user.
This is already partially handled by the assembler's `[PROTOCOL BOUNDARY]` block.

### 4. Rate Limiting (Supabase `bib_rate_limits` table)
**Status: Schema exists, wire into session endpoints**

- Anonymous: 5 turns per topic per day (IP-based)
- Free registered: 50 turns per day
- Paid: unlimited

**Implementation:** Check `bib_rate_limits` table before each `/session/turn` call.
Increment on success. Return 429 when exceeded.

---

## What's Available But Not Needed

### Distillation Guard (`distillation_guard.py`)
Enterprise concern — prevents model distillation via repeated queries.
Not relevant for a public library. Skip.

### PII Gate (`pii_gate.py`)
Enterprise concern — detects and blocks PII in session data.
Bibliothèque doesn't collect PII through sessions. Skip.

### Abuse Shield (not embedded)
Enterprise concern — IP reputation, CAPTCHA, behavioral analysis.
Overkill for a library. Rate limiting is sufficient.

---

## Recommended Implementation Order

### Phase 1 (MVP — do now)
1. **Prompt caching** — already active, verify it's working
2. **Rate limiting** — wire `bib_rate_limits` into session endpoints
3. **Output stripping** — strip [STATE:], [NAVIGATE:], :::fences from responses

### Phase 2 (post-launch)
4. **Prompt guard** — light injection detection, log don't block
5. **Output guard** — system prompt leakage prevention
6. **CORS hardening** — restrict API origins to bibliotheque.ai

### Phase 3 (if needed)
7. **Content extraction defense** — if users are systematically extracting pack protocols
8. **Embedding-based injection detection** — if basic pattern matching isn't catching attacks
9. **Per-user session limits** — if anonymous abuse exceeds rate limiting

---

## What the Pack Architecture Already Provides

The manifest-based governance (authorized/prohibited actions, kill lists, routing rules) is itself a security layer:

- A living book session can only discuss its text — the governance prevents the model from being redirected to arbitrary topics
- Kill lists prevent specific failure modes per domain
- Routing rules ensure safety-critical situations (crisis, emergency) are handled correctly

This is "security by governance" — the pack constrains the behavioral surface before any guard module runs.

---

## Reference

- Arcanum PI Taxonomy: https://arcanum-sec.github.io/arc_pi_taxonomy/
- TMOS13 security issue: trinit-ai/tmos13.ai#171
- Embedded guards: `api/engine/prompt_guard.py`, `api/engine/output_guard.py`
