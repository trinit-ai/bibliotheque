# Bibliothèque

**The living library.** Every article is a conversation.

[bibliotheque.ai](https://bibliotheque.ai) — a consumer product of [TMOS13, LLC](https://tmos13.ai)

---

## What it is

Bibliothèque is an interactive knowledge library. Wikipedia's structure, with one difference: every article talks back.

- **Living books** — paste any text and it becomes a governed interactive session. The model serves the text, not the other way around. Every response cites the actual passage.
- **Wiki expeditions** — any person, concept, event, place, or species becomes an interactive exploration.
- **591 governed session packs** — philosophy, sacred texts, mythology, science, arts, oracle, games, and more.
- **Oracle & games** — I Ching, Tarot, divination systems as interactive sessions.
- **Forms** — guided form completion as conversation.
- **News crossover** — live news feeds threaded to library content. Reuters writes the story. We find the connection.

The first living book is the Tao Te Ching (81 chapters, fully indexed). The corpus target is the Internet Sacred Text Archive — 1,700+ texts.

---

## Architecture

The 13TMOS engine is embedded directly in this repository under a perpetual license from TMOS13, LLC. No external engine dependency.

```
bibliotheque.ai
├── web/                         Next.js 14 (App Router) — Vercel
│   ├── Editorial white UI       browsing, catalogue, portals
│   └── Academic session UI      living book + expedition sessions
│
├── api/                         FastAPI backend — Railway
│   ├── engine/                  13TMOS engine (embedded, 53 modules)
│   │   ├── pack_loader.py       pack resolution
│   │   ├── assembler.py         system prompt construction
│   │   ├── llm_provider.py      LLM abstraction
│   │   ├── rag.py               retrieval-augmented generation
│   │   ├── living_book/         text ingestion + retrieval
│   │   └── ...                  guards, vault, state, etc.
│   ├── catalogue.py             living catalogue system
│   └── api_*.py                 route handlers
│
├── protocols/
│   ├── library/                 591 curated packs (43 categories)
│   ├── books/                   living book corpus
│   └── shared/                  shared protocol fragments
│
└── supabase/                    database schema + migrations
```

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind |
| Backend | FastAPI (Python), Railway |
| Engine | 13TMOS (embedded, perpetual license) |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| LLM | Anthropic Claude API |
| Email | Resend |
| Deploy | Vercel (web) + Railway (api) |

---

## Design System

White academic layout throughout. Session pages use the same white surface as browse pages — no dark mode.

**Fonts**
- Display: [Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro) — titles, article headings, italic
- Body: [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) — prose, chat messages
- UI: [DM Mono](https://fonts.google.com/specimen/DM+Mono) — labels, metadata, citations, badges

**Accent:** `#1d4ed8` — the è is always in accent blue.

---

## Routes

| Route | Content |
|-------|---------|
| `/` | Home — featured cards, news feed, crossover thread, portals |
| `/wiki/[entity]` | Wiki expedition for any knowledge entity |
| `/book/[book_id]` | Living book session (3-column academic layout) |
| `/pack/[pack_id]` | Pack session |
| `/portal/[category]` | Portal browse page |
| `/play` | Oracle & games |
| `/form` | Forms library |
| `/search` | Cross-catalogue search |
| `/crossover/[story]/[book]` | News-to-library bridge page |

---

## The Catalogue

`api/catalogue.py` indexes every content item — living books, wiki expeditions, packs, oracles, forms — and makes them uniformly browseable, searchable, and cross-referenced.

The catalogue loads from:
1. **Static YAML** — curated entries in `api/catalogue/entries/*.yaml`
2. **Local engine** — 591 packs from the embedded protocol library
3. **Living books** — indexed from `protocols/books/`

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- A Supabase project
- Anthropic API key

### Environment

```bash
cp .env.example .env
```

Key variables:

```bash
# LLM
ANTHROPIC_API_KEY=your_key

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:8001
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Database

Run the migrations in the Supabase SQL editor:
1. `supabase/migrations/001_bibliotheque_schema.sql`
2. `supabase/migrations/002_extended_schema.sql`

### Frontend

```bash
cd web
npm install
npm run dev
# → http://localhost:3000
```

### Backend

```bash
cd api
pip install -r requirements.txt
uvicorn app:app --reload --port 8001
# → http://localhost:8001
```

---

## User Model

| Tier | Access |
|------|--------|
| Anonymous | Full browse, 5 session turns per topic per day |
| Free (registered) | 50 turns per day, session history |
| Reader (paid) | Unlimited turns, vault, session journal export |

---

## The Living Book System

A living book inverts the normal model. Instead of asking a language model what it knows about a text, you paste the text in. The text becomes the ground truth. Every response cites the actual passage. The model serves the text.

```
> What does it say about water?

[Chapter 8]: A person of great virtue is like the flowing water.
Water benefits all things and contends not with them...

[Chapter 78]: There is nothing in this world that is softer and
meeker than water. Yet for dissolving the hard and inflexible,
nothing can surpass it.
```

Five properties:
1. **Domain specificity** — claims grounded in the actual text, not training memory
2. **Searchability** — query the text directly by keyword, theme, or passage
3. **Pre-authoring** — governance is encoded before the session begins
4. **IP designation** — every book carries title, author, translator, license
5. **Auditable** — every response cites the passage it draws from

---

## News Crossover System

Bibliothèque is a library, not a newsroom. We never write news copy.

```
RSS / API feeds → ingest → chunk into story objects →
run crossover matching against catalogue → surface on homepage
```

Reuters writes the Fed story. We connect it to Adam Smith. The value is the library connection, not the news content. See `docs/NEWS_ARCHITECTURE.md` for full design.

---

## Embedded Engine

The 13TMOS engine is embedded under a perpetual, irrevocable, royalty-free license from TMOS13, LLC. See `LIBRARY_LICENSE.md` and `docs/TMOS13_Bibliotheque_Perpetual_License.pdf`.

**What's embedded:**
- Pack loader, assembler, session engine (53 Python modules)
- 591 curated packs across 43 categories
- Living book system (ingestor, retriever, session)
- Guards (output, prompt, distillation, PII, rate)
- RAG pipeline, vault, knowledge bridge

**What's not included (enterprise-only):**
- Legal, medical, HR, sales, consulting packs
- Billing, channels, MCP server, ambassador system

---

## Relation to TMOS13

- **TMOS13, LLC** — the engine, B2B operator sales, the full pack library
- **Bibliothèque** — the consumer product, public-facing, bibliotheque.ai

The engine is embedded locally. No HTTP dependency on the TMOS13 cloud. The protocol library is a curated subset — library-relevant packs only.

---

## License

© 2026 TMOS13, LLC. All rights reserved.

The Bibliothèque codebase is proprietary. The embedded 13TMOS engine is licensed under perpetual terms from TMOS13, LLC. The living book corpus draws from public domain texts. Individual pack protocols are proprietary intellectual property of TMOS13, LLC.

---

*bibliotheque.ai — the library, finally talkable.*
