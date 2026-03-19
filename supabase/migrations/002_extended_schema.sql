-- =========================================================================
-- Bibliothèque Extended Schema (Migration 002)
-- Adds: profiles, session_journal, catalogue, books, notify
-- =========================================================================

-- ── PROFILES ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
    user_id       UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email         TEXT,
    display_name  TEXT,
    avatar_url    TEXT,
    provider      TEXT DEFAULT 'email',
    tier          TEXT DEFAULT 'free',
    role          TEXT DEFAULT 'user',
    preferred_name TEXT,
    timezone      TEXT DEFAULT 'UTC',
    language      TEXT DEFAULT 'en',
    bio           TEXT,
    onboarded_at  TIMESTAMPTZ,
    profile_version INTEGER DEFAULT 1,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_profile" ON profiles
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "users_insert_own_profile" ON profiles
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "service_role_profiles" ON profiles
    FOR ALL USING (auth.role() = 'service_role');

-- ── SESSION JOURNAL ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bib_session_journal (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      UUID REFERENCES bib_sessions(id) ON DELETE CASCADE,
    user_id         TEXT NOT NULL DEFAULT 'anonymous',
    content_type    TEXT NOT NULL,
    content_id      TEXT NOT NULL,
    content_title   TEXT,
    opening_query   TEXT,
    top_passage     TEXT,
    unexpected_turn TEXT,
    closing_query   TEXT,
    arc_summary     TEXT,
    turn_count      INTEGER DEFAULT 0,
    public          BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_journal_content ON bib_session_journal(content_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_journal_user ON bib_session_journal(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_journal_public ON bib_session_journal(public, created_at DESC);

ALTER TABLE bib_session_journal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_journal_readable" ON bib_session_journal
    FOR SELECT USING (public = TRUE);

CREATE POLICY "users_own_journal" ON bib_session_journal
    FOR ALL USING (user_id = auth.uid()::text OR user_id = 'anonymous');

CREATE POLICY "service_role_journal" ON bib_session_journal
    FOR ALL USING (auth.role() = 'service_role');

-- ── CATALOGUE ENTRIES ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bib_catalogue (
    id              TEXT PRIMARY KEY,
    content_type    TEXT NOT NULL,
    title           TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    portal          TEXT NOT NULL,
    tradition       TEXT,
    description     TEXT,
    author          TEXT,
    translator      TEXT,
    year            INTEGER,
    license         TEXT DEFAULT 'public_domain',
    chapter_count   INTEGER,
    pack_id         TEXT,
    entity_type     TEXT,
    featured        BOOLEAN DEFAULT FALSE,
    featured_order  INTEGER,
    tags            TEXT[],
    related         TEXT[],
    session_count   INTEGER DEFAULT 0,
    status          TEXT DEFAULT 'active',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_catalogue_portal ON bib_catalogue(portal);
CREATE INDEX IF NOT EXISTS idx_catalogue_type ON bib_catalogue(content_type);
CREATE INDEX IF NOT EXISTS idx_catalogue_featured ON bib_catalogue(featured, featured_order);
CREATE INDEX IF NOT EXISTS idx_catalogue_slug ON bib_catalogue(slug);

ALTER TABLE bib_catalogue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "catalogue_public_read" ON bib_catalogue
    FOR SELECT USING (TRUE);

CREATE POLICY "service_role_catalogue" ON bib_catalogue
    FOR ALL USING (auth.role() = 'service_role');

-- ── LIVING BOOKS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bib_books (
    id              TEXT PRIMARY KEY,
    title           TEXT NOT NULL,
    author          TEXT,
    translator      TEXT,
    tradition       TEXT,
    license         TEXT DEFAULT 'public_domain',
    chunk_count     INTEGER DEFAULT 0,
    structure_type  TEXT DEFAULT 'chapters',
    status          TEXT DEFAULT 'active',
    session_count   INTEGER DEFAULT 0,
    ingested_at     TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bib_books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "books_public_read" ON bib_books
    FOR SELECT USING (TRUE);

CREATE POLICY "service_role_books" ON bib_books
    FOR ALL USING (auth.role() = 'service_role');

-- ── NOTIFY ME ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bib_notify (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       TEXT NOT NULL,
    content_id  TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(email, content_id)
);

CREATE INDEX IF NOT EXISTS idx_notify_content ON bib_notify(content_id);

ALTER TABLE bib_notify ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notify_insert_only" ON bib_notify
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "service_role_notify" ON bib_notify
    FOR ALL USING (auth.role() = 'service_role');

-- ── FUNCTIONS ─────────────────────────────────────────────────────────────

-- Increment session count on catalogue and books
CREATE OR REPLACE FUNCTION increment_session_count(
    p_content_id TEXT,
    p_content_type TEXT
)
RETURNS VOID AS $$
BEGIN
    UPDATE bib_catalogue
    SET session_count = session_count + 1, updated_at = NOW()
    WHERE id = p_content_id;

    IF p_content_type = 'living_book' THEN
        UPDATE bib_books
        SET session_count = session_count + 1, updated_at = NOW()
        WHERE id = p_content_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Recent encounters for sidebar
CREATE OR REPLACE FUNCTION get_recent_encounters(p_limit INTEGER DEFAULT 5)
RETURNS TABLE (
    content_title   TEXT,
    content_type    TEXT,
    arc_summary     TEXT,
    created_at      TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        j.content_title,
        j.content_type,
        j.arc_summary,
        j.created_at
    FROM bib_session_journal j
    WHERE j.public = TRUE
      AND j.arc_summary IS NOT NULL
      AND j.turn_count >= 3
    ORDER BY j.created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Generic updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER catalogue_updated_at
    BEFORE UPDATE ON bib_catalogue
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER books_updated_at
    BEFORE UPDATE ON bib_books
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── SEED DATA ─────────────────────────────────────────────────────────────

-- Catalogue entries
INSERT INTO bib_catalogue (id, content_type, title, slug, portal, tradition, description, author, translator, license, chapter_count, featured, featured_order, tags, status)
VALUES
  ('tao_te_ching_mou',    'living_book', 'Tao Te Ching',      'tao-te-ching',      'religion',    'taoism',              'The fundamental text of Taoist philosophy. 81 chapters on the nature of the Tao, virtue, and effortless action.',   'Lao Tzu',             'Mou',          'public_domain', 81,   TRUE, 1, ARRAY['tao','virtue','wu-wei','water','sage'],           'active'),
  ('meditations_marcus',  'living_book', 'Meditations',       'meditations',       'philosophy',  'stoicism',            'Private journal of a philosopher-emperor. 12 books of Stoic self-examination.',                                    'Marcus Aurelius',     'George Long',  'public_domain', 12,   TRUE, 2, ARRAY['stoicism','virtue','self-examination','death'],   'active'),
  ('bhagavad_gita',       'living_book', 'Bhagavad Gita',     'bhagavad-gita',     'religion',    'hinduism',            '700-verse dialogue between Arjuna and Krishna on duty, devotion, and liberation.',                                 'Vyasa',               'Edwin Arnold', 'public_domain', 18,   TRUE, 3, ARRAY['hinduism','dharma','yoga','krishna','devotion'],  'active'),
  ('wiki_stoicism',       'expedition',  'Stoicism',          'stoicism',          'philosophy',  'stoicism',            'Virtue as the only good. The dichotomy of control. Marcus, Epictetus, Seneca.',                                    NULL,                  NULL,           'public_domain', NULL, TRUE, 4, ARRAY['stoicism','virtue','marcus','epictetus'],         'active'),
  ('wiki_game_theory',    'expedition',  'Game Theory',       'game-theory',       'mathematics', 'mathematics',         'The mathematical study of strategic interaction. Nash equilibrium.',                                                NULL,                  NULL,           'public_domain', NULL, TRUE, 5, ARRAY['mathematics','strategy','nash','economics'],      'active'),
  ('epic_of_gilgamesh',   'living_book', 'Epic of Gilgamesh', 'epic-of-gilgamesh', 'history',     'ancient_mesopotamia', 'The oldest surviving work of literature.',                                                                         'Unknown',             NULL,           'public_domain', NULL, TRUE, 6, ARRAY['mesopotamia','gilgamesh','immortality','ancient'], 'active'),
  ('corpus_hermeticum',   'living_book', 'Corpus Hermeticum', 'corpus-hermeticum', 'esoteric',    'hermeticism',         'The foundational texts of Hermeticism. As above, so below.',                                                       'Hermes Trismegistus', NULL,           'public_domain', NULL, TRUE, 7, ARRAY['hermeticism','alchemy','gnosis','esoteric'],      'active'),
  ('wiki_consciousness',  'expedition',  'Consciousness',     'consciousness',     'philosophy',  'philosophy',          'The hard problem. Qualia. What is it like to be something?',                                                       NULL,                  NULL,           'public_domain', NULL, FALSE, NULL, ARRAY['consciousness','mind','qualia'],              'active'),
  ('wiki_entropy',        'expedition',  'Entropy',           'entropy',           'science',     'physics',             'The thermodynamic quantity. The arrow of time.',                                                                   NULL,                  NULL,           'public_domain', NULL, FALSE, NULL, ARRAY['entropy','thermodynamics','physics'],           'active'),
  ('wiki_octopus',        'expedition',  'Octopus',           'octopus',           'science',     'biology',             'Eight arms, three hearts, distributed intelligence.',                                                              NULL,                  NULL,           'public_domain', NULL, FALSE, NULL, ARRAY['octopus','cephalopod','intelligence'],          'active')
ON CONFLICT (id) DO NOTHING;

-- Living books
INSERT INTO bib_books (id, title, author, translator, tradition, license, chunk_count, structure_type, status)
VALUES
  ('tao_te_ching_mou',  'Tao Te Ching',     'Lao Tzu',             'Mou',          'taoism',              'public_domain', 81,  'chapters', 'active'),
  ('meditations_marcus','Meditations',       'Marcus Aurelius',     'George Long',  'stoicism',            'public_domain', 12,  'books',    'coming_soon'),
  ('bhagavad_gita',     'Bhagavad Gita',     'Vyasa',               'Edwin Arnold', 'hinduism',            'public_domain', 18,  'chapters', 'coming_soon'),
  ('epic_of_gilgamesh', 'Epic of Gilgamesh', 'Unknown',             NULL,           'ancient_mesopotamia', 'public_domain', NULL,'sections', 'coming_soon'),
  ('corpus_hermeticum', 'Corpus Hermeticum', 'Hermes Trismegistus', NULL,           'hermeticism',         'public_domain', NULL,'sections', 'coming_soon')
ON CONFLICT (id) DO NOTHING;
