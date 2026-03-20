-- =========================================================================
-- Bibliothèque Migration 003 — Transcripts, Subscriptions, Bookmarks
-- =========================================================================

-- ── TRANSCRIPT ENTRIES ──────────────────────────────────────────────────
-- Individual messages within a session (bib_sessions already exists in 001)
CREATE TABLE IF NOT EXISTS bib_transcript_entries (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id      UUID NOT NULL REFERENCES bib_sessions(id) ON DELETE CASCADE,
    turn_number     INTEGER NOT NULL,
    role            TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content         TEXT NOT NULL,
    tokens          INTEGER DEFAULT 0,
    metadata        JSONB DEFAULT '{}'::jsonb,
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transcript_session
    ON bib_transcript_entries(session_id, turn_number);

ALTER TABLE bib_transcript_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own_transcripts" ON bib_transcript_entries
    FOR SELECT
    USING (
        session_id IN (
            SELECT id FROM bib_sessions WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "service_role_transcripts" ON bib_transcript_entries
    FOR ALL USING (auth.role() = 'service_role');

-- ── BOOKMARKS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bib_bookmarks (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_id      TEXT NOT NULL,
    content_type    TEXT NOT NULL CHECK (content_type IN (
        'living_book', 'expedition', 'essay', 'horoscope', 'game', 'news_session'
    )),
    title           TEXT NOT NULL,
    note            TEXT,
    created_at      TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, content_id)
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bib_bookmarks(user_id, created_at DESC);

ALTER TABLE bib_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_manage_own_bookmarks" ON bib_bookmarks
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "service_role_bookmarks" ON bib_bookmarks
    FOR ALL USING (auth.role() = 'service_role');

-- ── SUBSCRIPTIONS ───────────────────────────────────────────────────────
-- Manages paid tiers. Free/anonymous users have no row here.
CREATE TABLE IF NOT EXISTS bib_subscriptions (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    tier            TEXT NOT NULL DEFAULT 'early_subscriber' CHECK (tier IN (
        'early_subscriber', 'reader', 'patron'
    )),
    status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'active', 'cancelled', 'past_due', 'trialing'
    )),
    stripe_customer_id      TEXT,
    stripe_subscription_id  TEXT,
    current_period_start    TIMESTAMPTZ,
    current_period_end      TIMESTAMPTZ,
    cancel_at               TIMESTAMPTZ,
    turns_per_day           INTEGER NOT NULL DEFAULT 50,
    metadata                JSONB DEFAULT '{}'::jsonb,
    created_at              TIMESTAMPTZ DEFAULT now(),
    updated_at              TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON bib_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON bib_subscriptions(stripe_customer_id);

ALTER TABLE bib_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own_subscription" ON bib_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "service_role_subscriptions" ON bib_subscriptions
    FOR ALL USING (auth.role() = 'service_role');

-- ── ENHANCE PROFILES ────────────────────────────────────────────────────
-- Add subscription-related fields to existing profiles table
ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
    ADD COLUMN IF NOT EXISTS turns_used_today INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS turns_reset_at TIMESTAMPTZ DEFAULT date_trunc('day', now()),
    ADD COLUMN IF NOT EXISTS total_sessions INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS total_turns INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS last_session_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS referral_code TEXT,
    ADD COLUMN IF NOT EXISTS referred_by TEXT;

-- ── USAGE TRACKING ──────────────────────────────────────────────────────
-- Daily usage aggregates for analytics and rate limiting
CREATE TABLE IF NOT EXISTS bib_daily_usage (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    ip_address      TEXT,
    date            DATE NOT NULL DEFAULT CURRENT_DATE,
    turns_used      INTEGER DEFAULT 0,
    sessions_started INTEGER DEFAULT 0,
    tokens_input    INTEGER DEFAULT 0,
    tokens_output   INTEGER DEFAULT 0,
    content_ids     TEXT[] DEFAULT '{}',
    UNIQUE(user_id, date),
    UNIQUE(ip_address, date)
);

CREATE INDEX IF NOT EXISTS idx_daily_usage_user ON bib_daily_usage(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_usage_ip ON bib_daily_usage(ip_address, date DESC);

ALTER TABLE bib_daily_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own_usage" ON bib_daily_usage
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "service_role_usage" ON bib_daily_usage
    FOR ALL USING (auth.role() = 'service_role');

-- ── FUNCTIONS ───────────────────────────────────────────────────────────

-- Check if user/IP has turns remaining
CREATE OR REPLACE FUNCTION check_turns_remaining(
    p_user_id UUID DEFAULT NULL,
    p_ip TEXT DEFAULT NULL,
    p_tier TEXT DEFAULT 'anonymous'
)
RETURNS TABLE (allowed BOOLEAN, remaining INTEGER, limit_val INTEGER) AS $$
DECLARE
    v_limit INTEGER;
    v_used INTEGER;
BEGIN
    -- Determine limit by tier
    v_limit := CASE p_tier
        WHEN 'anonymous' THEN 5
        WHEN 'early_subscriber' THEN 50
        WHEN 'reader' THEN 50
        WHEN 'patron' THEN 9999
        ELSE 5
    END;

    -- Check subscription override
    IF p_user_id IS NOT NULL THEN
        SELECT s.turns_per_day INTO v_limit
        FROM bib_subscriptions s
        WHERE s.user_id = p_user_id AND s.status = 'active';
    END IF;

    -- Get usage
    IF p_user_id IS NOT NULL THEN
        SELECT COALESCE(d.turns_used, 0) INTO v_used
        FROM bib_daily_usage d
        WHERE d.user_id = p_user_id AND d.date = CURRENT_DATE;
    ELSIF p_ip IS NOT NULL THEN
        SELECT COALESCE(d.turns_used, 0) INTO v_used
        FROM bib_daily_usage d
        WHERE d.ip_address = p_ip AND d.date = CURRENT_DATE;
    ELSE
        v_used := 0;
    END IF;

    IF v_used IS NULL THEN v_used := 0; END IF;

    RETURN QUERY SELECT (v_used < v_limit), (v_limit - v_used), v_limit;
END;
$$ LANGUAGE plpgsql;

-- Record a turn (upsert daily usage)
CREATE OR REPLACE FUNCTION record_turn(
    p_user_id UUID DEFAULT NULL,
    p_ip TEXT DEFAULT NULL,
    p_content_id TEXT DEFAULT '_global',
    p_tokens_in INTEGER DEFAULT 0,
    p_tokens_out INTEGER DEFAULT 0
)
RETURNS VOID AS $$
BEGIN
    IF p_user_id IS NOT NULL THEN
        INSERT INTO bib_daily_usage (user_id, date, turns_used, sessions_started, tokens_input, tokens_output, content_ids)
        VALUES (p_user_id, CURRENT_DATE, 1, 0, p_tokens_in, p_tokens_out, ARRAY[p_content_id])
        ON CONFLICT (user_id, date) DO UPDATE SET
            turns_used = bib_daily_usage.turns_used + 1,
            tokens_input = bib_daily_usage.tokens_input + p_tokens_in,
            tokens_output = bib_daily_usage.tokens_output + p_tokens_out,
            content_ids = CASE
                WHEN p_content_id = ANY(bib_daily_usage.content_ids) THEN bib_daily_usage.content_ids
                ELSE array_append(bib_daily_usage.content_ids, p_content_id)
            END;
    ELSIF p_ip IS NOT NULL THEN
        INSERT INTO bib_daily_usage (ip_address, date, turns_used, sessions_started, tokens_input, tokens_output, content_ids)
        VALUES (p_ip, CURRENT_DATE, 1, 0, p_tokens_in, p_tokens_out, ARRAY[p_content_id])
        ON CONFLICT (ip_address, date) DO UPDATE SET
            turns_used = bib_daily_usage.turns_used + 1,
            tokens_input = bib_daily_usage.tokens_input + p_tokens_in,
            tokens_output = bib_daily_usage.tokens_output + p_tokens_out,
            content_ids = CASE
                WHEN p_content_id = ANY(bib_daily_usage.content_ids) THEN bib_daily_usage.content_ids
                ELSE array_append(bib_daily_usage.content_ids, p_content_id)
            END;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger: update profile stats on session close
CREATE OR REPLACE FUNCTION update_profile_on_session_close()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.user_id IS NOT NULL AND OLD.turn_count IS DISTINCT FROM NEW.turn_count THEN
        UPDATE profiles SET
            total_sessions = total_sessions + 1,
            total_turns = total_turns + NEW.turn_count,
            last_session_at = NOW(),
            updated_at = NOW()
        WHERE user_id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Only create trigger if bib_sessions exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'session_close_profile_update'
    ) THEN
        CREATE TRIGGER session_close_profile_update
            AFTER UPDATE ON bib_sessions
            FOR EACH ROW
            WHEN (OLD.turn_count IS DISTINCT FROM NEW.turn_count)
            EXECUTE FUNCTION update_profile_on_session_close();
    END IF;
END;
$$;

-- Auto-update timestamps on subscriptions
CREATE TRIGGER subscriptions_updated_at
    BEFORE UPDATE ON bib_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
