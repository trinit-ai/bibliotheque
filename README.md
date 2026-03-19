# Bibliothèque

**The living library.** Every article is a conversation.

[bibliotheque.ai](https://bibliotheque.ai) — a consumer product of [TMOS13, LLC](https://tmos13.ai)

---

## What it is

Bibliothèque is an interactive knowledge library. Wikipedia's structure, with one difference: every article talks back.

- **Living books** — paste any text and it becomes a governed interactive session. The model serves the text, not the other way around. Every response cites the actual passage.
- **Wiki expeditions** — any person, concept, event, place, or species becomes an interactive exploration. Type `/wiki octopus` and enter the territory.
- **Packs** — 968 governed session packs across every domain of human knowledge and professional practice.
- **Oracle & games** — I Ching, Tarot, divination systems as interactive sessions.
- **Forms** — guided form completion as conversation.

The first living book is the Tao Te Ching (81 chapters, fully indexed). The corpus target is the Internet Sacred Text Archive — 1,700+ texts, every major sacred, mythological, folkloric, and philosophical work ever digitized.

---

## Architecture

```
bibliotheque.ai (Vercel)          tmos13.ai engine (Railway)
  ├── Next.js 14 (App Router)      ├── Pack loader (968 packs)
  ├── Editorial white UI           ├── Assembler
  ├── Session deep blue UI         ├── RAG pipeline
  ├── Catalogue system             ├── Vault
  └── FastAPI (Railway)  ──────►  ├── Auth (Supabase)
       ├── catalogue.py            └── Living book system
       ├── engine_client.py
       └── api_*.py
```

Bibliothèque does not contain the TMOS13 engine. It calls it via `engine_client.py`. No engine logic is duplicated.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind |
| Backend | FastAPI (Python), Railway |
| Database | Supabase PostgreSQL |
| Engine | TMOS13 API (tmos13.ai) |
| Auth | Supabase Auth |
| Email | Resend |
| Deploy | Vercel (web) + Railway (api) |

---

## Design System

Two modes, one codebase. Toggled via `data-mode` attribute.

**Editorial** (browsing, catalogue, portals)
- Background: `#ffffff`
- Text: `#111827`
- Accent: `#1d4ed8`

**Session** (active conversation, living book, expedition)
- Background: `#020817`
- Text: `#e2e8f0`
- Accent: `#3B82F6`

**Fonts**
- Display: [Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro) — titles, article headings
- Body: [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) — prose, chat messages
- UI: [DM Mono](https://fonts.google.com/specimen/DM+Mono) — labels, metadata, citations, badges

---

## Routes

| Route | Content |
|-------|---------|
| `/` | Home — featured topics, today's picks, portal grid |
| `/wiki/[entity]` | Wiki expedition for any knowledge entity |
| `/book/[book_id]` | Living book session |
| `/pack/[pack_id]` | Pack session |
| `/portal/[category]` | Portal browse page |
| `/play` | Oracle & games |
| `/form` | Forms library |
| `/search` | Cross-catalogue search |

---

## The Catalogue

`api/catalogue.py` is the architectural centerpiece. It indexes every content item across all types — living books, wiki expeditions, packs, oracles, forms — and makes them uniformly browseable, searchable, and cross-referenced.

```python
class ContentType(str, Enum):
    LIVING_BOOK = "living_book"
    EXPEDITION  = "expedition"
    PACK        = "pack"
    ORACLE      = "oracle"
    GAME        = "game"
    FORM        = "form"
    NEWS        = "news"
```

The catalogue loads from three sources on startup:
1. **Static YAML** — curated entries in `api/catalogue/entries/*.yaml`
2. **TMOS13 engine** — live pack list fetched from the engine API
3. **Living books** — indexed from `protocols/books/`

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- A Supabase project
- The TMOS13 engine API key

### Environment

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

Key variables:

```bash
# Engine
TMOS13_ENGINE_URL=https://tmos13.ai
TMOS13_ENGINE_API_KEY=your_key

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

Run the migration in the Supabase SQL editor or via CLI:

```bash
supabase db push
```

Or paste `supabase/migrations/001_bibliotheque_schema.sql` directly.

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
/book tao_te_ching_mou

> What does it say about water?

[Chapter 8]: A person of great virtue is like the flowing water.
Water benefits all things and contends not with them...

[Chapter 78]: There is nothing in this world that is softer and
meeker than water. Yet for dissolving the hard and inflexible,
nothing can surpass it.
```

Five properties of the living book system:
1. **Domain specificity** — claims grounded in the actual text, not training memory
2. **Searchability** — query the text directly by keyword, theme, or passage
3. **Pre-authoring** — governance is encoded before the session begins
4. **IP designation** — every book carries title, author, translator, license
5. **Auditable** — every response cites the passage it draws from

---

## Wiki Expedition System

Any knowledge entity becomes an interactive expedition on demand. Ten entity types, each governed by a template:

`person` · `work` · `concept` · `event` · `place` · `movement` · `period` · `field` · `species` · `phenomenon`

```
/wiki burt_reynolds   → person expedition
/wiki game_theory     → concept/field expedition
/wiki kind_of_blue    → work expedition
/wiki weimar_republic → period expedition
/wiki octopus         → species expedition
```

The session follows the visitor's curiosity. It has opinions. It goes where they pull.

---

## Deployment

**Frontend → Vercel**
Connect `trinit-ai/bibliotheque`, set root to `web/`, add env vars.

**Backend → Railway**
Connect `trinit-ai/bibliotheque`, set root to `api/`, add env vars.
The `api/railway.toml` and `api/Dockerfile` are already configured.

---

## Relation to TMOS13

Bibliothèque is a consumer product built on the TMOS13 engine.

- **TMOS13, LLC** — the engine, B2B operator sales, the pack library
- **Bibliothèque** — the consumer product, public-facing, bibliotheque.ai

The engine is called via HTTP through `engine_client.py`. No engine code lives in this repo. The pack library (968 packs), assembler, RAG pipeline, and vault are all on the TMOS13 engine. Bibliothèque adds the catalogue layer, the living book system, the wiki expedition system, and the editorial UI on top.

---

## License

© 2026 TMOS13, LLC. All rights reserved.

The Bibliothèque codebase is proprietary. The living book corpus draws from public domain texts via the Internet Sacred Text Archive. Individual pack protocols are proprietary intellectual property of TMOS13, LLC.

---

*bibliotheque.ai — the library, finally talkable.*
