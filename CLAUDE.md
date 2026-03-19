# Bibliothèque — CLAUDE.md

## What This Is

bibliotheque.ai is a PBC (Public Benefit Corporation) living library. Consumer-facing, anonymous-first. Users converse with living books, explore wiki-style expeditions, consult oracles, and play structured epistemic games — all powered by the TMOS13 engine.

## Architecture

- **Frontend**: Next.js 14 (App Router), deployed on Vercel
- **Backend**: FastAPI (Python), deployed on Railway
- **Database**: Supabase (Postgres + Auth + RLS)
- **Engine**: TMOS13 engine accessed via HTTP (engine_client.py)

### Key Constraint

Never duplicate engine logic. The TMOS13 engine handles sessions, packs, protocols, prompt assembly, tool execution, and state management. Bibliothèque calls it via `api/engine_client.py`. If you need engine behavior, call the engine — do not reimplement.

## Design Language

Two visual modes:

### Editorial Mode (browsing, catalogue, wiki)
- Background: `#ffffff`
- Text: `#111827`
- Accent: `#1d4ed8`
- Feel: clean, typographic, magazine-like

### Session Mode (in-conversation with a living book or expedition)
- Background: `#020817`
- Text: `#e2e8f0`
- Accent: `#3B82F6`
- Feel: deep, immersive, focused

### Fonts
- **Display**: Crimson Pro (headings, titles, book names)
- **Body**: Source Serif 4 (paragraph text, descriptions)
- **UI/Mono**: DM Mono (metadata, labels, code, turn counters)

## Catalogue System

`api/catalogue.py` indexes all content into a unified catalogue:
- **ContentTypes**: living_book, expedition, pack, oracle, game, form, news
- **Sources**: static YAML entries (`catalogue/entries/*.yaml`), TMOS13 engine packs, living book protocol directories
- **Indexed by**: id, slug, portal (category), type, featured rank
- **Portals**: top-level browsing categories (philosophy, religion, science, history, mathematics, esoteric)

## URL Structure

| Path | Purpose |
|---|---|
| `/` | Home — featured entries, portal grid |
| `/wiki/[entity]` | Wiki expedition page (e.g., `/wiki/stoicism`) |
| `/book/[book_id]` | Living book session (e.g., `/book/tao_te_ching_mou`) |
| `/pack/[pack_id]` | Pack session (e.g., `/pack/guest`) |
| `/portal/[category]` | Portal browse page (e.g., `/portal/philosophy`) |
| `/play` | Games and interactive experiences |
| `/form` | Structured form experiences |
| `/search` | Full-text search across catalogue |

## Session Model

Bibliothèque is stateless. All session state lives in the TMOS13 engine. The frontend opens a session via `POST /session/start`, then exchanges turns via `POST /session/turn`. The backend proxies these to the engine and returns responses.

## User Model

| Tier | Auth | Turns | Notes |
|---|---|---|---|
| Anonymous | None | 5 turns per topic per day | IP-based rate limiting |
| Free Registered | Supabase Auth | 50 turns per day | Email registration |
| Reader (paid) | Supabase Auth | Unlimited | Subscription via Stripe (future) |

## File Layout

```
bibliotheque/
├── CLAUDE.md
├── package.json              # Workspace root
├── turbo.json
├── vercel.json
├── tsconfig.base.json
├── .env.example
├── .gitignore
├── api/                      # FastAPI backend
│   ├── app.py
│   ├── config.py
│   ├── db.py
│   ├── errors.py
│   ├── engine_client.py
│   ├── catalogue.py
│   ├── api_catalogue.py
│   ├── api_session.py
│   ├── api_search.py
│   ├── api_book.py
│   ├── api_wiki.py
│   ├── api_auth.py
│   ├── requirements.txt
│   └── catalogue/
│       └── entries/
│           └── core.yaml
├── supabase/
│   └── migrations/
│       └── 001_bibliotheque_schema.sql
└── web/                      # Next.js frontend
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.js
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── globals.css
        │   ├── page.tsx
        │   ├── wiki/[entity]/page.tsx
        │   ├── book/[book_id]/page.tsx
        │   ├── pack/[pack_id]/page.tsx
        │   └── search/page.tsx
        ├── lib/
        │   ├── types.ts
        │   └── api.ts
        └── public/
            └── favicon.ico
```

## Development

```bash
# Backend
cd api && pip install -r requirements.txt && uvicorn app:app --port 8001 --reload

# Frontend
cd web && npm install && npm run dev

# Both (from root)
npm run dev
```
