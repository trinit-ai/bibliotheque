# Bibliothèque — News Architecture

_Bibliothèque is a library, not a newsroom. We never write news copy._

---

## Model

Pure aggregation + chunking + crossover threading:

```
RSS / API feeds → ingest → chunk into story objects →
run crossover matching against catalogue → surface on homepage
```

Pull the feed, never touch content editorially. The value is entirely on the library side — the crossover connection, the session that opens from it. Reuters writes the Fed story. We connect it to Adam Smith.

---

## Feed Sources

| Source | Type | Cost | Coverage |
|--------|------|------|----------|
| Reuters | RSS | Free tier | Wire copy, broad, no paywall |
| AP | RSS | Free tier | Wire copy, US + international |
| NewsAPI | API | Free tier (100 req/day) | 80,000+ sources, topic filtering |
| GDELT | Open dataset | Free | Global news events |
| The Guardian | API | Free | Well-structured, international |
| Government feeds | Primary sources | Free | Fed, Congress, WHO — no copyright, crossover-rich |

### Phase 2 (paid/licensed)
- Financial Times / Bloomberg — paywalled but markets coverage
- Specialized topic feeds for science, tech, health

---

## Story Object

The chunked story object contains only what's legally safe and functionally needed:

```typescript
interface StoryObject {
  id: string;
  headline: string;           // facts aren't copyrightable
  lede: string;               // 2 sentences max
  source: string;             // "Reuters", "AP", "Guardian"
  source_url: string;         // link to original article
  category: string;           // world, politics, markets, tech, etc.
  tags: string[];             // extracted from content
  named_entities: string[];   // people, organizations, places
  published_at: string;       // ISO timestamp
  ingested_at: string;
  crossover_matches: CrossoverMatch[];
}

interface CrossoverMatch {
  catalogue_id: string;       // matched catalogue entry
  match_score: number;        // similarity score
  connection_thesis: string;  // auto-generated connection description
  matched_tags: string[];     // which tags overlapped
}
```

### Copyright rule
- Headlines + ledes: freely displayable (facts)
- Full article text: NEVER stored or displayed — link to source
- The homepage story is a teaser that links out to the source
- Bibliothèque's value is the library connection, not the news content

---

## Chunking Pipeline

```
raw_article →
  extract: headline, lede, category, tags, named_entities →
  run: crossover_matcher(tags, entities) against catalogue →
  if match_score > threshold:
    create: crossover object { story, catalogue_entry, connection_thesis }
    surface: on homepage thread band + story session chip
  always:
    store: as news content_type in catalogue
    enable: ↗ session chip on story (generic analysis pack)
```

---

## Crossover Matcher

The matcher embeds story tags/entities and compares against catalogue entry embeddings.

```python
# api/news/crossover_matcher.py

async def match_crossovers(story: StoryObject, catalogue: Catalogue) -> list[CrossoverMatch]:
    """
    Find catalogue entries that connect to this news story.

    Uses embedding similarity between:
    - story tags + named entities + category
    - catalogue entry tags + description + tradition

    Returns top 3 matches above threshold (0.7).
    """
    story_text = f"{story.headline} {' '.join(story.tags)} {' '.join(story.named_entities)}"
    story_embedding = await embed(story_text)

    matches = []
    for entry in catalogue.all():
        entry_text = f"{entry.title} {' '.join(entry.tags)} {entry.description}"
        entry_embedding = await embed(entry_text)  # cached

        score = cosine_similarity(story_embedding, entry_embedding)
        if score > 0.7:
            matches.append(CrossoverMatch(
                catalogue_id=entry.id,
                match_score=score,
                connection_thesis=await generate_thesis(story, entry),
                matched_tags=list(set(story.tags) & set(entry.tags)),
            ))

    return sorted(matches, key=lambda m: m.match_score, reverse=True)[:3]
```

### Connection thesis generation
When a crossover is found, a one-sentence thesis is auto-generated:

```python
async def generate_thesis(story: StoryObject, entry: CatalogueEntry) -> str:
    """Generate a one-sentence connection between news story and catalogue entry."""
    # Uses Haiku for speed and cost
    prompt = f"""
    News: {story.headline}
    Library: {entry.title} by {entry.author}

    Write ONE sentence explaining how this news story connects to this text.
    Be specific. Not "both are about economics" — what specific idea in the text
    illuminates this news story?
    """
    return await call_haiku(prompt)
```

---

## News section → portal mappings

Used as a fallback when embedding similarity is ambiguous:

```
World     →  History, Religion, Political Economy, Mythology
Politics  →  Political Economy, Philosophy, History
Markets   →  Political Economy, Mathematics, History
Tech      →  Science, Mathematics, Philosophy, Technology
Health    →  Health, Science, Psychology
Science   →  Science, Mathematics, Philosophy
Opinion   →  Philosophy, Literature, Political Economy
Arts      →  Literature, Esoterica, Philosophy
Sports    →  Philosophy, History, Psychology
```

---

## Ingestor

```python
# api/news/ingestor.py

class NewsIngestor:
    sources = [
        RSSSource("https://feeds.reuters.com/reuters/topNews"),
        RSSSource("https://feeds.reuters.com/reuters/businessNews"),
        RSSSource("https://feeds.reuters.com/reuters/technologyNews"),
        GuardianSource(api_key=os.environ.get("GUARDIAN_API_KEY")),
    ]

    async def ingest(self):
        """Run all sources, chunk articles, match crossovers, store."""
        for source in self.sources:
            articles = await source.fetch()
            for article in articles:
                story = self.chunk(article)
                crossovers = await self.match_crossovers(story)
                await self.store(story, crossovers)

    def chunk(self, article: dict) -> StoryObject:
        """Extract headline, lede (2 sentences), tags, entities."""
        return StoryObject(
            headline=article["title"],
            lede=extract_lede(article["description"], max_sentences=2),
            source=article["source"],
            source_url=article["url"],
            category=classify_category(article),
            tags=extract_tags(article),
            named_entities=extract_entities(article),
            published_at=article["published_at"],
        )

    async def match_crossovers(self, story: StoryObject) -> list[CrossoverMatch]:
        from news.crossover_matcher import match_crossovers
        return await match_crossovers(story, self.catalogue)

    async def store(self, story: StoryObject, crossovers: list[CrossoverMatch]):
        """Store story + crossovers in Supabase."""
        # Insert into bib_news_stories table
        # Insert crossover matches into bib_crossovers table
        ...
```

---

## Homepage Integration

Stories surface on the homepage via:

1. **Ticker** — latest headlines, scrolling
2. **Thread band** — top crossover match (story + connected text + quote)
3. **Story list** — numbered stories with ↗ session chips
4. **Session chips** — open a general analysis session for any story

The thread band is the premium position — only stories with strong crossover matches get it.

---

## Editorial Decisions

The only editorial decisions Bibliothèque makes:

1. **Which feeds to trust** — curated source list
2. **Crossover threshold** — what match score is high enough to surface
3. **Thread band selection** — which crossover is today's featured connection
4. **Category classification** — how stories map to news sections

We never write, edit, or editorialize news content. The library connection is our editorial voice.

---

## Database Tables Needed

```sql
CREATE TABLE bib_news_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    headline TEXT NOT NULL,
    lede TEXT,
    source TEXT NOT NULL,
    source_url TEXT NOT NULL,
    category TEXT,
    tags TEXT[],
    named_entities TEXT[],
    published_at TIMESTAMPTZ,
    ingested_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bib_crossovers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID REFERENCES bib_news_stories(id),
    catalogue_id TEXT NOT NULL,
    match_score FLOAT,
    connection_thesis TEXT,
    matched_tags TEXT[],
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Phase 1 (MVP)

- RSS ingest from Reuters + Guardian
- Basic tag extraction (no embeddings — keyword matching)
- Hardcoded crossover connections for demo
- Homepage renders from static demo data + 2-3 live stories

## Phase 2

- NewsAPI integration for broader coverage
- Embedding-based crossover matching
- Auto-generated connection theses via Haiku
- Thread band auto-selects strongest daily crossover

## Phase 3

- GDELT integration for global event tracking
- Government primary source feeds
- Real-time crossover matching as stories arrive
- User-facing "why this connects" explanations

---

*Bibliothèque is the layer on top. Reuters writes the story. We find the connection.*
