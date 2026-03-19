# Bibliothèque — Category Taxonomy
_Working document. Updated from live site + codebase._

---

## Three Axes, Not Two

The catalogue has three orthogonal dimensions. They should never be mixed on the same nav row.

```
FORMAT   →  "What kind of thing is it?"    Books · Digests · Essays · Horoscopes · Interaction
SUBJECT  →  "What is it about?"            Philosophy · Religion · Science · History …
NEWS     →  "What is happening?"           World · Politics · Markets · Tech · Health …
```

A single entry sits at the intersection of all three:
> *Meditations* by Marcus Aurelius is a **Book** (format) about **Philosophy** (subject)
> that crossovers to **Opinion** and **Politics** (news sections).

The two nav bars map as:
```
NEWS BAR    →  News sections  |  Format shortcuts
LIBRARY BAR →  Subject portals
```

---

## Nav Bar 1 — News (white bar)

### News sections
Standard newspaper sections. Left of the divider.

```
World  ·  Politics  ·  Markets  ·  Tech  ·  Health  ·  Science  ·  Opinion  ·  Arts  ·  Sports
```

### Format / form-factor shortcuts
Right of the divider on the same bar. These are *how* something is delivered, not *what it's about*.
A Book can be about Philosophy or Religion. An Essay can be about Markets or Tech.
Format is orthogonal to portal subject.

```
Books  ·  Digests  ·  Essays  ·  Horoscopes  ·  Interaction
```

Think of it as the answer to: "what kind of thing do you want right now?"
vs. the library bar which answers: "what subject do you want to explore?"

| Format      | ContentType in catalogue.py | What it is | Status |
|-------------|----------------------------|------------|--------|
| Books       | `living_book`              | Full texts you can converse with. Cited, governed sessions. | Active. |
| Digests     | — (not yet in enum)        | Short, non-interactive summaries of a topic. ~600 words. Good for casual readers and SEO. | Planned. |
| Essays      | — (lives as living_book or pack currently) | Standalone canonical essays with a session. Orwell, Emerson, Berlin, MLK. | Needs own ContentType or clear mapping. |
| Horoscopes  | `oracle` (sub-type)        | The accessible face of the Oracle format. "Horoscopes" is what casual users click; "Oracles" is the internal ContentType. Route: `/oracle/horoscopes`. Nav label stays Horoscopes. | Active intent. |
| Interaction | `game`                     | Structured epistemic experiences — Socratic debate, thought experiments, guided dialogues. "Interaction" is what the user does; "game" is the internal type. | ContentType exists in enum, not yet populated. |

**Key principle:** clicking "Books" on the news bar should show all living books
regardless of portal — a format filter, not a subject filter.
Clicking "Philosophy" on the library bar shows all formats (books, expeditions, packs)
within that subject. The two axes are independent and can be combined.

---

## Nav Bar 2 — Library (blue bar)

Subject portals. Each portal is a wing of the library — a browseable collection
of living books, expeditions, packs, and oracles grouped by subject.

### Current portals (live site)

```
Philosophy  ·  Religion  ·  Science  ·  History  ·  Mathematics
Esoterica  ·  Literature  ·  Society  ·  Technology  ·  Health  ·  Psychology
```

### Portal status (cross-referenced with codebase)

| Portal       | In demo-data.ts | In core.yaml | Notes |
|--------------|----------------|--------------|-------|
| Philosophy   | ✓              | ✓            | Active. Stoicism expedition, Meditations living book. |
| Religion     | ✓              | ✓            | Active. Tao Te Ching, Bhagavad Gita. Largest ISTA coverage. |
| Science      | ✓              | ✓            | Active. Entropy expedition, Octopus expedition. |
| History      | ✓              | ✓            | Active. Epic of Gilgamesh. |
| Mathematics  | ✓              | ✓            | Active. Game Theory expedition. |
| Esoterica    | ✓ (Esoteric)   | ✓ (esoteric) | Active. Corpus Hermeticum. Note spelling: live site uses "Esoterica". |
| Literature   | ✓              | —            | In demo-data, not yet in core.yaml entries. |
| Psychology   | ✓              | —            | In demo-data, not yet in core.yaml entries. |
| Society      | —              | —            | On live site. Not in codebase. Needs portal slug + entries. |
| Technology   | —              | —            | On live site. Not in codebase. Overlaps with Science + news Tech. Needs definition. |
| Health       | —              | —            | On live site. Also a news section — same word, different layer. Needs portal slug. |

### Portals missing from live site (in codebase or obviously needed)

| Portal          | Rationale |
|-----------------|-----------|
| Mythology       | ISTA corpus has enormous coverage. Norse, Greek, Egyptian, Celtic, Vedic. Currently orphaned. |
| Political Economy | The crossover layer for Markets + Politics news. Smith, Marx, Keynes, Hayek. Wealth of Nations lives here. |

---

## Content Types (catalogue.py ContentType enum)

These are formats — what a thing *is* — not subjects.

| Type          | Slug          | Description | Status |
|---------------|---------------|-------------|--------|
| Living Book   | `living_book` | Full text, conversational. Every response cites the passage. | Active. 1 live (Tao Te Ching), several in core.yaml. |
| Expedition    | `expedition`  | Wiki-style interactive deep-dive on any concept, person, or event. | Active. Stoicism, Game Theory, Consciousness, Entropy, Octopus. |
| Pack          | `pack`        | 968 governed session packs. Loaded from TMOS13 engine. | Active. |
| Oracle        | `oracle`      | Divinatory systems as interactive sessions. | Active. I Ching in demo data. |
| Game          | `game`        | Structured epistemic games. | In enum, not populated. |
| Form          | `form`        | Guided structured form completion via conversation. | In enum, not populated. |
| News          | `news`        | News stories. | In enum for crossover threading. |
| Digest        | —             | Not yet in enum. On live nav. Needs defining. | Planned. |
| Essay         | —             | Not a separate ContentType — currently Living Book or Pack. Could be its own. | Review needed. |

---

## Crossover Layer

The mechanism that threads news stories to library entries.
Currently: `CrossoverBanner` component, hardcoded to Fed story → Wealth of Nations.

**Rule:** A news story triggers a crossover when its news section maps to a portal
that contains an entry whose tags overlap with the story's subject.

### News section → portal mappings (current best guess)

```
World     →  History, Religion, Political Economy, Mythology
Politics  →  Political Economy, Philosophy, History
Markets   →  Political Economy, Mathematics, History
Tech      →  Science, Mathematics, Philosophy
Health    →  Health, Science, Psychology
Science   →  Science, Mathematics, Philosophy
Opinion   →  Philosophy, Literature, Political Economy
Arts      →  Literature, Esoterica, Philosophy
Sports    →  Philosophy, History, Psychology
```

---

## Open Questions

1. **Society** — what belongs here that doesn't fit History, Political Economy, or Psychology?
   Sociology texts? Anthropology? Needs a definition before populating.

2. **Technology** — is this a portal (philosophy of technology, Turing, cybernetics)
   or just the news Tech section bleeding over? Probably needs to be distinct.

3. **Health** — same word on both navs. As a news section = current health stories.
   As a library portal = medicine, anatomy, psychology of illness. Make sure URLs don't collide (`/portal/health` vs news filter).

4. **Horoscopes** — lives under Oracles as a content type, or gets its own nav slot?
   If it's popular enough to be on the news bar it probably deserves `/play/horoscopes` or `/oracle/astrology`.

5. **Digests** — shortest useful description of a ContentType that doesn't exist yet.
   Proposed: a non-interactive summary of an expedition topic. No session. ~600 words. Good for SEO and casual readers.

6. **Essay vs Living Book** — "Politics and the English Language" is in demo-data as an editorial essay with `hasSession: true`. Is it a living book (full text, cited responses) or a pack (governed session about the essay)? Needs a decision so the ContentType is consistent.
