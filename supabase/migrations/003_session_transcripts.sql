-- Session transcripts for Bibliothèque
-- Stores full conversation history for registered users.

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    pack_id TEXT NOT NULL,
    content_type TEXT DEFAULT 'pack',
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
    turn_count INTEGER DEFAULT 0,
    tokens_input INTEGER DEFAULT 0,
    tokens_output INTEGER DEFAULT 0,
    started_at TIMESTAMPTZ DEFAULT now(),
    ended_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Transcript entries (individual messages)
CREATE TABLE IF NOT EXISTS transcript_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
    turn_number INTEGER NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Session bookmarks (user favorites)
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_id TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('book', 'expedition', 'essay', 'horoscope', 'game', 'session')),
    title TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, content_id, content_type)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_pack_id ON sessions(pack_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_transcript_session_id ON transcript_entries(session_id);
CREATE INDEX IF NOT EXISTS idx_transcript_turn ON transcript_entries(session_id, turn_number);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);

-- RLS policies
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcript_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can read their own sessions
CREATE POLICY "Users read own sessions"
    ON sessions FOR SELECT
    USING (auth.uid() = user_id);

-- Users can read transcript entries for their sessions
CREATE POLICY "Users read own transcripts"
    ON transcript_entries FOR SELECT
    USING (
        session_id IN (
            SELECT session_id FROM sessions WHERE user_id = auth.uid()
        )
    );

-- Users can manage their own bookmarks
CREATE POLICY "Users manage own bookmarks"
    ON bookmarks FOR ALL
    USING (auth.uid() = user_id);

-- Service role can do everything (for API writes)
CREATE POLICY "Service role full access sessions"
    ON sessions FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access transcripts"
    ON transcript_entries FOR ALL
    USING (auth.role() = 'service_role');
