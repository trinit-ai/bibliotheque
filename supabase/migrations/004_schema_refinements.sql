-- =========================================================================
-- Bibliothèque Migration 004 — Schema Refinements
-- =========================================================================

-- ── Fix bookmark uniqueness to include content_type ─────────────────────
-- Allows bookmarking the same content_id as different types
-- (e.g. stoicism as both expedition and book)
ALTER TABLE bib_bookmarks DROP CONSTRAINT IF EXISTS bib_bookmarks_user_id_content_id_key;
ALTER TABLE bib_bookmarks ADD CONSTRAINT bib_bookmarks_user_content_type_unique
    UNIQUE(user_id, content_id, content_type);

-- ── Add missing profile columns ─────────────────────────────────────────
ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
    ADD COLUMN IF NOT EXISTS turns_used_today INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS turns_reset_at TIMESTAMPTZ DEFAULT date_trunc('day', now()),
    ADD COLUMN IF NOT EXISTS total_sessions INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS total_turns INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS last_session_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS referral_code TEXT,
    ADD COLUMN IF NOT EXISTS referred_by TEXT;

-- ── Partial index for active subscriptions ──────────────────────────────
CREATE INDEX IF NOT EXISTS idx_bib_subscriptions_active_user
    ON bib_subscriptions(user_id)
    WHERE status = 'active';
