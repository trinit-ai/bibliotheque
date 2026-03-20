# Bibliothèque — header.yaml Reference
# protocols/authoring_guide/HEADER_REFERENCE.md
# Complete field-by-field reference for pack headers.

---

## Template — Living Book

```yaml
# ─────────────────────────────────────────────────────────────
# header.yaml — Living Book Pack
# [TITLE] by [AUTHOR]
# ─────────────────────────────────────────────────────────────

id: [snake_case_unique_id]           # e.g. tao_te_ching_mou
name: "[Title] — Living Book Session"
category: [category]                 # matches section in catalogue
wing: library                        # "library" or "news"
section: [section_id]                # sacred_texts | philosophy | mythology | science | history | esoteric | oracle | editorial
content_type: living_book

status: active                       # active | coming_soon | archived

# Display fields — shown in catalogue
title: "[Title]"
description: "[1-2 sentences. What this text is and why it matters.]"
author: "[Author name]"
translator: "[Translator name if applicable]"
license: public_domain               # public_domain | open_access | licensed | freely_available
chapter_count: [N]
tradition: [tradition]               # taoism | stoicism | buddhism | hinduism | etc.

# Session config
deliverable: book_session_record
estimated_turns: "6-20"
version: "1.0"
pack_author: "Robert C. Ventura"
created: "[YYYY-MM-DD]"

# Discovery — what triggers this pack to load
triggers:
  - "[primary text name]"
  - "[author name]"
  - "[tradition name]"
  - "open [short title]"

# What this pack explicitly does not do
excludes:
  - "[thing this pack refuses to do]"
  - "[another exclusion]"

# Catalogue fields
tags: []
related: []
featured: false
featured_order: null
```

---

## Template — Wiki Expedition

```yaml
id: wiki_[subject_slug]
name: "[Subject] — Expedition"
category: [category]
wing: library
section: [section_id]
content_type: expedition

status: active

title: "[Subject]"
description: "[1-2 sentences. What the expedition explores and why.]"
entity_type: concept        # concept | person | movement | field | period | species | place | event

deliverable: expedition_record
estimated_turns: "4-15"
version: "1.0"
pack_author: "Robert C. Ventura"
created: "[YYYY-MM-DD]"

triggers:
  - "[subject name]"
  - "[alternate name or alias]"
  - "expedition [subject]"

tags: []
related: []
featured: false
```

---

## Template — Editorial

```yaml
id: [author_slug]_[title_slug]
name: "[Title] — Editorial Session"
category: editorial
wing: [library or news]
section: [section_id]
content_type: editorial

status: active

title: "[Essay/Paper Title]"
description: "[1-2 sentences. What argument this essay makes.]"
author: "[Author name]"
year: [YYYY]
license: [public_domain | open_access | freely_available]
publication: "[Where it was published]"

deliverable: editorial_session_record
estimated_turns: "4-12"
version: "1.0"
pack_author: "Robert C. Ventura"
created: "[YYYY-MM-DD]"

triggers:
  - "[essay title]"
  - "[author name]"
  - "debate [topic]"
  - "argue [topic]"

tags: []
```

---

## Template — Oracle

```yaml
id: [system_slug]_oracle
name: "[System Name] Oracle"
category: oracle
wing: library
section: oracle
content_type: oracle

status: active

title: "[System Name]"
description: "[1-2 sentences. What this oracle system is.]"
tradition: [tradition]
symbol_count: [N]         # 64 for I Ching, 78 for Tarot, etc.

deliverable: oracle_reading_record
estimated_turns: "3-10"
version: "1.0"
pack_author: "Robert C. Ventura"
created: "[YYYY-MM-DD]"

triggers:
  - "[system name]"
  - "draw a card"
  - "cast a hexagram"
  - "read my [runes/cards/etc.]"

tags: []
```

---

## Field reference

### id
- snake_case, all lowercase
- Must be globally unique across all packs
- For living books: `[text_slug]_[translator_slug]` e.g. `tao_te_ching_mou`
- For expeditions: `wiki_[subject_slug]` e.g. `wiki_stoicism`
- For editorial: `[author_slug]_[title_slug]` e.g. `greenberg_avant_garde_kitsch`
- For oracle: `[system_slug]_oracle` e.g. `i_ching_oracle`
- Never change once committed — it's the permanent identifier

### name
- Human-readable display name
- Include the content type in the name: "— Living Book Session", "— Expedition", etc.
- Max 80 characters

### category / section
- Must match a valid section from `sections.yaml`
- `wing: library` sections: sacred_texts, philosophy, mythology, science, history, esoteric, oracle, editorial
- `wing: news` sections: world, us, politics, business, economy, markets_finance, tech, health, opinion, free_expression, arts, lifestyle, real_estate, personal_finance, style, sports

### status
- `active` — fully ingested, session works
- `coming_soon` — catalogue entry exists, session not yet available
- `archived` — no longer surfaced in catalogue

### license
- `public_domain` — Project Gutenberg or equivalent, no restrictions
- `open_access` — arXiv, PubMed Central, freely available academic papers
- `freely_available` — author-published, free to read (e.g. Dario's essay)
- `licensed` — specific permission obtained

### triggers
- What a visitor might type to open this pack
- At minimum: the text's common name, the author's name
- Add alternate spellings, common translations, tradition name
- Keep specific — "tao te ching" not "wisdom text"

### excludes
- Explicit exclusions, especially for sensitive adjacent content
- E.g. "direct spiritual advice" for a Taoist text
- E.g. "medical advice" for a health-adjacent expedition
- Keep short and precise

### tags
- All lowercase, hyphenated
- Used for catalogue search and related-item suggestions
- 5-15 tags, specific enough to be useful
- Include: tradition/field, key concepts, author name, content type hints

### estimated_turns
- Format: "N-N" string
- Based on the session arc — how many exchanges to complete it
- Living books: 6-20 (depends on text depth)
- Expeditions: 4-15 (depends on subject breadth)
- Editorial: 4-12 (depends on argument length)
- Oracle: 3-10 (depends on system complexity)
