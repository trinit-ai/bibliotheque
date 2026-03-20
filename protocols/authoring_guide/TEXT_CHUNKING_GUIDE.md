# Bibliothèque — Text Chunking Guide
# protocols/authoring_guide/TEXT_CHUNKING_GUIDE.md
# How to prepare a text for ingestion as a Living Book.
# © 2026 TMOS13, LLC — Robert C. Ventura

---

## What chunking is

A living book session is grounded in actual text — not the model's training
memory. For that to work, the text must be:

1. **Chunked** — split into retrievable units (chapters, verses, paragraphs)
2. **Indexed** — each chunk tagged with keywords for search
3. **Cross-referenced** — keywords mapped to chunk IDs for thematic navigation

The result is a `text/` directory inside the pack:

```
protocols/library/books/[book_id]/
    text/
        full_text.txt       — the complete, clean source text
        chunks.json         — structured chunks with keywords
        index.yaml          — cross-reference map (keyword → chunk IDs)
```

---

## The three structure types

### chapters

For texts with explicit chapter divisions: Tao Te Ching (81 chapters),
Meditations (12 books), Thus Spake Zarathustra (parts + chapters).

The ingestor detects chapter breaks by regex:
```
Chapter One / Chapter 1 / Chapter Twenty-One / CHAPTER XLII
```

Each chapter becomes one chunk. Chunk IDs: `{book_id}_ch001`, `{book_id}_ch002`, etc.

**Best for:** Most books. This is the default.

### verses

For texts with numbered verse structure: Dhammapada (423 verses),
Bhagavad Gita (700 verses), Psalms.

The ingestor detects verse breaks by the pattern `\d+.\s+` at line start.

Each verse becomes one chunk. Chunk IDs: `{book_id}_v0001`, `{book_id}_v0002`, etc.

**Best for:** Sacred texts with verse numbering, poetry collections.

### paragraphs

Fallback for texts with no clear structural divisions: essays, letters,
continuous prose.

The ingestor splits on double newlines. Paragraphs shorter than 40 characters
are dropped (headers, page numbers, etc.).

Each paragraph becomes one chunk. Chunk IDs: `{book_id}_p0001`, `{book_id}_p0002`, etc.

**Best for:** Essays, letters, prose without chapter structure.

---

## Chunk anatomy

Each chunk in `chunks.json` has this shape:

```json
{
  "id": "tao_te_ching_ch001",
  "label": "Chapter One",
  "number": 1,
  "text": "Chapter One\nTao (The Way) that can be spoken of is not the Constant Tao...",
  "keywords": ["constant", "name", "origin", "essence", "named", "enables", "profound", "mystery"],
  "themes": ["constant", "name", "origin"]
}
```

| Field | What it is |
|---|---|
| `id` | Unique chunk identifier — never changes once assigned |
| `label` | Human-readable label for citations (e.g., "Chapter One", "Verse 42") |
| `number` | Sequential number for ordering |
| `text` | The full text of the chunk |
| `keywords` | Top concept words, stop-words removed, max 8 per chunk |
| `themes` | Top 3 keywords — used for thematic clustering |

---

## Keyword extraction

The ingestor extracts keywords automatically:

1. Tokenize the chunk text into words
2. Remove stop words (common English words — "the", "and", "is", etc.)
3. Remove words shorter than 4 characters
4. Count frequency of remaining words
5. Take the top 8 by frequency (or all if fewer than 20 unique words)
6. First 3 become `themes`

This is intentionally simple. The keywords power fuzzy search, not semantic
embedding. A visitor searching "water" will find every chunk where "water"
appears as a keyword. Cross-references surface which chunks share keywords.

---

## The cross-reference index

`index.yaml` maps keywords to the chunks they appear in:

```yaml
book_id: tao_te_ching
title: Tao Te Ching
chunk_count: 81
cross_references:
  water:
    - tao_te_ching_ch008
    - tao_te_ching_ch015
    - tao_te_ching_ch078
  nature:
    - tao_te_ching_ch005
    - tao_te_ching_ch006
    - tao_te_ching_ch010
    # ... (16 chapters reference "nature")
  virtue:
    - tao_te_ching_ch010
    - tao_te_ching_ch017
    - tao_te_ching_ch038
    # ... (8 chapters reference "virtue")
```

Only keywords that appear in **more than one chunk** are cross-referenced.
Single-occurrence keywords are still in the chunk's `keywords` array but
don't generate a cross-reference entry.

This is what lets the session say: "Water appears in seven chapters — most
famously in Chapter 8 and Chapter 78. Would you like to explore the water
imagery across the text?"

---

## How to prepare a text for ingestion

### Step 1: Get a clean text file

- Public domain: Project Gutenberg, Internet Archive, Wikisource
- Strip all front matter (copyright notices, editor introductions, page numbers)
- Strip all back matter (appendices, indices, translator notes) — unless
  you want them as searchable chunks
- Keep the chapter/verse/section headers exactly as they appear
- Save as UTF-8 plain text

### Step 2: Choose the structure type

| If the text has... | Use |
|---|---|
| "Chapter 1", "Chapter One", etc. | `chapters` |
| Numbered verses (1. ... 2. ... 3. ...) | `verses` |
| Neither | `paragraphs` |

### Step 3: Run the ingestor

```python
from engine.living_book.ingestor import BookIngestor

ingestor = BookIngestor(
    book_id="meditations_aurelius",
    title="Meditations",
    author="Marcus Aurelius",
    translator="George Long",
    year="170 CE",
    license="public_domain",
    structure_type="chapters",  # Books I-XII → 12 chunks
)

result = ingestor.ingest(raw_text)
# result = {"book_id": "meditations_aurelius", "chunks": 12, ...}
```

The ingestor creates the full directory structure:
```
protocols/library/books/meditations_aurelius/
    header.yaml
    MANIFEST.md
    manifest.json
    master.md
    text/
        full_text.txt
        chunks.json
        index.yaml
```

### Step 4: Review the output

After ingestion, check:

- [ ] `chunks.json` — are the chapter breaks in the right places?
- [ ] `chunks.json` — are the keywords meaningful? (not just "chapter", "section")
- [ ] `index.yaml` — do the cross-references make sense?
- [ ] `master.md` — does the generated master.md need customization?

The ingestor generates **generic** protocol files. For a production living book,
you should replace the auto-generated `MANIFEST.md` and `master.md` with
versions written using the templates in `MASTER_REFERENCE.md`. The auto-generated
versions are functional but lack the tradition-specific voice, citation format,
and routing rules that make a Bibliothèque session feel alive.

### Step 5: Customize the protocol files

This is where the authoring guide matters. The ingestor gets you the text layer.
The authoring guide gets you the session layer.

1. Replace `master.md` with the Living Book template from `MASTER_REFERENCE.md`
2. Add the tradition-specific voice directive from `VOICE_GUIDE.md`
3. Replace `MANIFEST.md` with a full behavioral specification
4. Update `header.yaml` with catalogue metadata (section, tags, triggers, etc.)
5. Write a `boot.md` if the text deserves an opening invocation

---

## Manual chunking

For texts where the automatic chunking doesn't work — mixed structure,
unusual formatting, or texts where you want to control the chunk boundaries —
you can create `chunks.json` manually.

The format is:

```json
{
  "book_id": "gospel_of_thomas",
  "chunk_count": 114,
  "chunks": [
    {
      "id": "gospel_of_thomas_s001",
      "label": "Saying 1",
      "number": 1,
      "text": "These are the secret sayings that the living Jesus spoke...",
      "keywords": ["secret", "sayings", "living", "jesus", "interpretation", "death"],
      "themes": ["secret", "sayings", "living"]
    }
  ]
}
```

You can use any `id` prefix — `_ch` for chapters, `_v` for verses, `_s` for
sayings, `_b` for books, `_t` for tablets. The ID must be globally unique
within the book.

After creating `chunks.json` manually, generate `index.yaml` by running:

```python
from engine.living_book.ingestor import BookIngestor
# Use the _build_index method directly on your chunks
import json, yaml

with open("text/chunks.json") as f:
    data = json.load(f)

ingestor = BookIngestor("gospel_of_thomas", "Gospel of Thomas", "Anonymous")
index = ingestor._build_index(data["chunks"])

with open("text/index.yaml", "w") as f:
    yaml.dump(index, f, default_flow_style=False, allow_unicode=True)
```

---

## Token budget awareness

Each chunk's text is injected into the session's system prompt when the visitor
asks about it. Keep this in mind:

- A chapter of the Tao Te Ching is ~100-300 words (manageable)
- A book of Meditations is ~2,000-5,000 words (still fine for one at a time)
- An entire novel chapter might be 5,000-10,000 words (too large — consider
  splitting into sub-chunks)

The retriever injects the **top 3 most relevant chunks** per query. So your
total injected text per turn is roughly `3 × average_chunk_size`. If that
exceeds ~5,000 words, consider splitting your chunks smaller.

---

## Worked example: Tao Te Ching

See `example_tao_te_ching/` in this bundle:

```
example_tao_te_ching/
    header.yaml                 — minimal metadata
    MANIFEST.md                 — behavioral specification
    manifest.json               — runtime config
    master.md                   — system prompt (auto-generated, functional)
    text/
        chunks_sample.json      — first 3 chapters (sample of 81)
        index.yaml              — full cross-reference map
```

The Tao Te Ching is the simplest possible living book:
- 81 short chapters (one chunk per chapter)
- Clear "Chapter N" structure (auto-detected by ingestor)
- Rich keyword overlap across chapters (water, nature, virtue, etc.)
- Public domain

This is ground zero. Every living book follows this pattern.

---

*Pack authored by Robert C. Ventura — TMOS13, LLC — bibliotheque.ai*
