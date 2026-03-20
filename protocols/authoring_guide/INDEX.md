# Bibliothèque — Pack Authoring Bundle
# protocols/authoring_guide/INDEX.md
# © 2026 TMOS13, LLC — Robert C. Ventura

---

## What this bundle is

A complete, self-contained reference and automation system for authoring new packs
for the Bibliothèque living library. Covers the five content types:
living_book, expedition, editorial, oracle, news_session.

This bundle is designed to be handed to a contributor. They drop it into a Claude
session (Claude Code, Claude.ai, or any MCP client) and can produce complete,
consistent pack file sets ready for submission.

---

## Files in this bundle

### Reference documents (read first)

| File | Purpose |
|---|---|
| AUTHORING_GUIDE.md | Complete overview — what a pack is, the five types, authoring checklist |
| HEADER_REFERENCE.md | All header.yaml and manifest.json fields, templates for each content type |
| MASTER_REFERENCE.md | master.md templates for each content type |
| VOICE_GUIDE.md | The Bibliothèque voice register — tone, phrasing, what to avoid |
| EXECUTION_MODES.md | Surface-specific behavior rules — CLI, web, MCP/claude.ai |

### CC automation prompt

| File | Purpose |
|---|---|
| CC_PACK_BATCH_AUTHORING.md | The main CC prompt — give it a queue, it produces complete pack file sets |

### Supporting references (from 13TMOS engine heritage)

| File | Purpose |
|---|---|
| FORMATTING_STYLE_GUIDE.md | Markdown formatting standards for pack output |
| CC_FORMATTING_STANDARDIZATION.md | CC-specific formatting cleanup rules |
| NARRATIVE_ARCHITECTURE.md | Story and session arc structure — the narrative theory behind packs |
| PACK_DEVELOPMENT_TOOLKIT.md | Pack language ontology, design patterns, anti-patterns |
| PACK_PROJECT_INSTRUCTIONS.md | Instructions for running a pack development sandbox |
| PACK_REFINEMENT_PROTOCOL.md | How to diagnose and fix issues in existing packs |

### Worked example

| Directory | Purpose |
|---|---|
| example_enlightened_duck/ | Complete pack (5 files) — the OG example. Read all five files to see the format in action |

---

## Quick start

**To create a single new pack:**

1. Read AUTHORING_GUIDE.md → understand the content type
2. Read MASTER_REFERENCE.md → copy the right template
3. Read VOICE_GUIDE.md → understand the voice register
4. Read the enlightened duck example → see a complete pack
5. Create the five files in `protocols/library/[section]/[pack_id]/`
6. Run the authoring checklist from AUTHORING_GUIDE.md
7. Open a session — does it feel like Bibliothèque?

**To batch-author packs with CC:**

1. Open CC against the bibliotheque repo (or any workspace)
2. Paste CC_PACK_BATCH_AUTHORING.md
3. Add your authoring queue at the end
4. CC reads the reference docs, then produces all files

**To refine an existing pack:**

1. Read PACK_REFINEMENT_PROTOCOL.md
2. Open a session with the pack
3. Note what isn't working against the authoring checklist
4. Edit master.md first — it governs everything

---

## The five content types at a glance

| Type | Text authority | Session mode | Deliverable |
|---|---|---|---|
| living_book | The indexed text | Retrieval + conversation | book_session_record |
| expedition | Model knowledge | Guided exploration | expedition_record |
| editorial | The essay | Argument engagement | editorial_session_record |
| oracle | The symbolic system | Interpretation | oracle_reading_record |
| news_session | The article | Context + depth + library | news_session_record |

---

## Pack file structure

```
protocols/library/[section]/[pack_id]/
    header.yaml     — catalogue metadata and session config
    MANIFEST.md     — behavioral specification (human-readable)
    manifest.json   — runtime configuration (machine-readable)
    master.md       — the system prompt (what the model reads)
    boot.md         — optional opening screen
```

---

## Current pack queue status

| Pack | Type | Status |
|---|---|---|
| tao_te_ching_mou | living_book | active |
| meditations_aurelius | living_book | authoring |
| enchiridion_epictetus | living_book | authoring |
| zarathustra_nietzsche | living_book | authoring |
| dhammapada | living_book | authoring |
| book_of_job | living_book | authoring |
| gospel_of_thomas | living_book | authoring |
| wiki_stoicism | expedition | authoring |
| wiki_free_will | expedition | authoring |
| wiki_trolley_problem | expedition | authoring |
| wiki_enlightenment | expedition | authoring |
| wiki_sacred_geometry | expedition | authoring |
| wiki_quantum_mechanics | expedition | authoring |
| wiki_consciousness | expedition | authoring |
| greenberg_avant_garde_kitsch | editorial | authoring |
| amodei_machines_loving_grace | editorial | authoring |
| nagel_what_is_it_like | editorial | authoring |
| i_ching_oracle | oracle | authoring |
| tarot_major_arcana | oracle | authoring |

---

## Bibliothèque identity for pack authors

**Platform:** bibliotheque.ai
**Engine:** 13TMOS (embedded, perpetual license from TMOS13, LLC)
**Creator:** Robert C. Ventura, TMOS13, LLC, Jersey City, NJ
**Mission:** A living library where every text is a two-way street.

**The tagline:**
You read the book. And the book reads you.

**Pack author credit line (in all MANIFEST.md footers):**
*Pack authored by Robert C. Ventura — TMOS13, LLC — bibliotheque.ai*

---

## Relationship to protocols/shared/

The `protocols/shared/` directory is the legacy location for these files,
inherited from the 13TMOS engine. It remains in place for engine compatibility
(the assembler loads `branding.md` and `company_profile.md` from shared/ at runtime).

This authoring guide is the canonical, self-contained version for pack contributors.
If a file exists in both locations, this bundle is authoritative for authoring purposes.
