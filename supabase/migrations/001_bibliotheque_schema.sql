-- =========================================================================
-- Bibliothèque Schema
-- =========================================================================

-- -----------------------------------------------------------------
-- Sessions: track Bibliothèque-side session metadata
-- (actual session state lives in TMOS13 engine)
-- -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bib_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engine_session_id TEXT,
    user_id UUID REFERENCES auth.users(id),
    entry_id TEXT NOT NULL,
    entry_type TEXT NOT NULL,
    visitor_ip TEXT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_turn_at TIMESTAMPTZ,
    turn_count INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_bib_sessions_user ON bib_sessions(user_id);
CREATE INDEX idx_bib_sessions_entry ON bib_sessions(entry_id);
CREATE INDEX idx_bib_sessions_started ON bib_sessions(started_at);

-- RLS
ALTER TABLE bib_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own sessions"
    ON bib_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Service role has full access to sessions"
    ON bib_sessions FOR ALL
    USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------
-- Rate limits: per-IP and per-user turn tracking
-- -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bib_rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    identifier TEXT NOT NULL,
    identifier_type TEXT NOT NULL CHECK (identifier_type IN ('ip', 'user')),
    topic TEXT NOT NULL DEFAULT '_global',
    turns_used INTEGER NOT NULL DEFAULT 0,
    window_start TIMESTAMPTZ NOT NULL DEFAULT date_trunc('day', now()),
    UNIQUE (identifier, identifier_type, topic, window_start)
);

CREATE INDEX idx_bib_rate_limits_lookup
    ON bib_rate_limits(identifier, identifier_type, topic, window_start);

-- RLS
ALTER TABLE bib_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access to rate limits"
    ON bib_rate_limits FOR ALL
    USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------
-- Reading history: what users have explored
-- -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bib_reading_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    entry_id TEXT NOT NULL,
    entry_type TEXT NOT NULL,
    first_visited TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_visited TIMESTAMPTZ NOT NULL DEFAULT now(),
    visit_count INTEGER NOT NULL DEFAULT 1,
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE (user_id, entry_id)
);

CREATE INDEX idx_bib_reading_history_user ON bib_reading_history(user_id);
CREATE INDEX idx_bib_reading_history_last ON bib_reading_history(last_visited);

-- RLS
ALTER TABLE bib_reading_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own reading history"
    ON bib_reading_history FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reading history"
    ON bib_reading_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reading history"
    ON bib_reading_history FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Service role has full access to reading history"
    ON bib_reading_history FOR ALL
    USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------
-- Catalogue overrides: deployer-managed overrides for catalogue entries
-- -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bib_catalogue_overrides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id TEXT NOT NULL UNIQUE,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    featured INTEGER,
    hidden BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_bib_catalogue_overrides_entry ON bib_catalogue_overrides(entry_id);

-- RLS
ALTER TABLE bib_catalogue_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read catalogue overrides"
    ON bib_catalogue_overrides FOR SELECT
    USING (true);

CREATE POLICY "Service role has full access to catalogue overrides"
    ON bib_catalogue_overrides FOR ALL
    USING (auth.role() = 'service_role');
