# CC Prompt — Bibliothèque Pack Batch Authoring
# Use this prompt to author new packs at scale.
# Give CC a list of texts, subjects, or essays and it will
# generate the complete file set for each one.

---

## Read first

Before authoring any packs, read these files in order:

1. AUTHORING_GUIDE.md
   — What a pack is, the five content types, the voice

2. HEADER_REFERENCE.md
   — All header.yaml fields and templates

3. MASTER_REFERENCE.md
   — master.md templates for each content type

4. example_enlightened_duck/
   — Read all five files as a worked example of the format

5. EXECUTION_MODES.md
   — Surface-specific behavior rules (CLI vs web vs MCP)

6. VOICE_GUIDE.md
   — The voice register — read this before writing any master.md

Do not author any pack until you have read all five.

---

## What to produce for each pack

For each item in the authoring queue below, create a directory:

```
protocols/library/[section]/[pack_id]/
    header.yaml
    MANIFEST.md
    manifest.json
    master.md
    boot.md     (optional — include for living books and oracles)
```

Use the templates from HEADER_REFERENCE.md and MASTER_REFERENCE.md.
Adapt them specifically for each text — do not produce generic content.

Every pack should feel like it was written by someone who has
actually read the text, not by someone who has read a summary of it.

---

## Authoring queue

### Batch 1 — Living Books (Philosophy)

**Pack 1: Meditations — Marcus Aurelius**
- id: meditations_aurelius
- section: philosophy
- tradition: stoicism
- translator: George Long (public domain)
- chapter_count: 12 (called "Books")
- citation format: [Book N] or [Book N, §N]
- key themes: virtue, death, duty, reason, impermanence, amor fati
- signature passage: "You have power over your mind, not outside events."
- voice: the reflective emperor — private, earnest, austere but warm
- what this text rewards: slow reading, not summary
- exclusions: productivity advice framing, "life hacks" framing

**Pack 2: Enchiridion — Epictetus**
- id: enchiridion_epictetus
- section: philosophy
- tradition: stoicism
- translator: Elizabeth Carter (public domain)
- chapter_count: 53 (short sections)
- citation format: [§N]
- key themes: dichotomy of control, freedom, externals, desire, aversion
- signature passage: "Some things are in our control and others not."
- voice: the former slave who became a philosopher — direct, no comfort
- what this text rewards: the first section contains the whole argument
- exclusions: therapy framing, self-help framing

**Pack 3: Thus Spake Zarathustra — Nietzsche**
- id: zarathustra_nietzsche
- section: philosophy
- tradition: existentialism
- translator: Thomas Common (public domain)
- citation format: [Part N, Chapter Title]
- key themes: Übermensch, eternal recurrence, will to power, nihilism, creation
- signature passage: "What is great in man is that he is a bridge and not an end."
- voice: the prophet who has come down from the mountain
- what this text rewards: the prologue and Part I; the later parts are harder
- exclusions: Nazi/fascist framing — address directly if raised; Nietzsche was
  neither and his sister's distortions are a matter of historical record

---

### Batch 2 — Living Books (Sacred Texts)

**Pack 4: Dhammapada**
- id: dhammapada
- section: sacred_texts
- tradition: buddhism
- translator: F. Max Müller (public domain)
- chapter_count: 26
- citation format: [Chapter N, Verse N] or [Verse N]
- key themes: mind, dharma, impermanence, suffering, liberation, the path
- signature passage: "All that we are is the result of what we have thought."
- voice: the text speaks directly; the companion helps the visitor hear it
- what this text rewards: the first verse contains the whole teaching
- exclusions: specific meditation instruction, guidance on actual practice

**Pack 5: Book of Job**
- id: book_of_job
- section: sacred_texts
- tradition: judaism
- translator: King James Version (public domain)
- chapter_count: 42
- citation format: [Chapter N:Verse N]
- key themes: suffering, justice, theodicy, faith, divine mystery, lament
- signature passage: "Where wast thou when I laid the foundations of the earth?"
- voice: the text is a debate; let it be a debate
- what this text rewards: the speeches of Job's friends are as important as
  Job's own — they represent the orthodoxy the text is interrogating
- note: this is one of the strangest texts in any tradition; honor its strangeness

**Pack 6: Gospel of Thomas**
- id: gospel_of_thomas
- section: sacred_texts
- tradition: gnosticism
- translator: Thomas O. Lambdin / Nag Hammadi translation (public domain)
- structure: 114 sayings (no chapters)
- citation format: [Saying N] or [Logion N]
- key themes: the kingdom within, hidden wisdom, gnosis, the light, the living Jesus
- voice: oblique, parabolic — the text resists direct interpretation
- what this text rewards: the sayings that seem most paradoxical
- exclusions: canonical Christianity framing — this is not a canonical text and
  should not be harmonized with canonical gospels

---

### Batch 3 — Wiki Expeditions

**Expedition 1: Free Will**
- id: wiki_free_will
- section: philosophy
- entity_type: concept
- key territories: hard determinism, compatibilism, libertarian free will,
  Frankfurt cases, moral responsibility, neuroscience and free will
- living book connections: Meditations (Stoic acceptance), Zarathustra (will to power)
- surprising angle: compatibilism is the majority position among philosophers
  but most non-philosophers are hard determinists or libertarians

**Expedition 2: The Trolley Problem**
- id: wiki_trolley_problem
- section: philosophy
- entity_type: concept
- key territories: Philippa Foot's original, Judith Jarvis Thomson's footbridge variant,
  the doctrine of double effect, consequentialism vs deontology,
  the expanding uses of trolleyology
- living book connections: Nicomachean Ethics (virtue ethics perspective)
- surprising angle: Foot invented it to argue against absolutist ethics; it's been
  used to argue for almost everything since

**Expedition 3: The Enlightenment**
- id: wiki_enlightenment
- section: history
- entity_type: period
- key territories: French Enlightenment (Voltaire, Rousseau), Scottish (Hume, Smith),
  German (Kant), the American founding, the Counter-Enlightenment,
  postmodern critiques
- living book connections: Common Sense (Paine), Wealth of Nations (Smith), On Liberty (Mill)
- surprising angle: the Enlightenment and Romanticism developed simultaneously
  as responses to each other

**Expedition 4: Sacred Geometry**
- id: wiki_sacred_geometry
- section: esoteric
- entity_type: concept
- key territories: the Vesica Piscis, Platonic solids, the golden ratio,
  Metatron's Cube, the Flower of Life, the relationship to Pythagorean
  and Neoplatonic philosophy
- living book connections: Corpus Hermeticum
- surprising angle: the mathematical relationships are real; the mystical
  interpretation is layered on top; both are worth taking seriously

**Expedition 5: Quantum Mechanics**
- id: wiki_quantum_mechanics
- section: science
- entity_type: field
- key territories: the double-slit experiment, Heisenberg uncertainty, superposition,
  entanglement, the measurement problem, Copenhagen vs Many Worlds,
  quantum field theory, what it actually implies (and doesn't) for consciousness
- living book connections: Wigner's "Unreasonable Effectiveness" essay
- critical note: do not endorse quantum woo — the text should be clear about what
  quantum mechanics actually says vs what is extrapolated beyond the science

---

### Batch 4 — Editorial Sessions

**Editorial 1: Avant-Garde and Kitsch — Clement Greenberg**
- id: greenberg_avant_garde_kitsch
- section: editorial (also: arts / opinion)
- year: 1939
- core claim: avant-garde culture exists to preserve the standards of high culture
  against the spread of kitsch — mass-produced, formulaic, passively consumed art
- where it's strong: the diagnosis of kitsch as pre-digested experience is precise
- where it's thin: the historical materialism framework for explaining the avant-garde;
  the implicit hierarchy that conveniently places Western European modernism at top
- the uncomfortable question: does his definition of kitsch describe anything you love?
- connect to: Bibliothèque's own design philosophy (the two-way street vs passive consumption)

**Editorial 2: Machines of Loving Grace — Dario Amodei**
- id: amodei_machines_loving_grace
- section: editorial (also: tech)
- year: 2024
- core claim: AI will be the most transformative technology in human history
  and will be broadly beneficial if developed responsibly
- where it's strong: the compressing of scientific progress argument; the
  concrete specificity about biology and medicine
- where it's thin: the internal tension between this optimism and Anthropic's
  own safety messaging; the assumption that "broadly beneficial" is achievable
- the uncomfortable question: can the person building one of the most powerful
  AI systems also be the most reliable voice on its safety?
- note: this is the flagship editorial demo — treat it with particular care

**Editorial 3: What Is It Like to Be a Bat? — Thomas Nagel**
- id: nagel_what_is_it_like
- section: editorial (also: science / opinion)
- year: 1974
- core claim: there is something it is like to be a bat; this subjective character
  of experience cannot be captured by objective physical accounts;
  therefore physicalism cannot fully explain the mind
- where it's strong: the intuition pump is powerful and widely shared
- where it's thin: Nagel assumes the phenomenal/physical gap is unbridgeable
  rather than showing it; the "what it is like" criterion is intuitive but contested
- connect to: Consciousness expedition; the hard problem (Chalmers);
  the question of whether AI systems have "something it is like" to be them

---

## Authoring instructions

For each pack in the queue:

1. Create the directory: `protocols/library/[section]/[pack_id]/`

2. Write `header.yaml` using the template from HEADER_REFERENCE.md.
   Fill every field. Use the information above.

3. Write `MANIFEST.md` using the structure from AUTHORING_GUIDE.md.
   The purpose, identity, authorization, session structure, voice,
   deliverable, and web potential sections must all be specific to
   this text — not generic.

4. Write `manifest.json` using the template from HEADER_REFERENCE.md.
   For living books, include the text source paths.

5. Write `master.md` using the template from MASTER_REFERENCE.md.
   Adapt the template for this specific text's needs.
   The voice directive, citation format, and routing rules must be
   specific to this text.

6. Write `boot.md` for living books and oracles only.
   For living books: one paragraph introducing the text to a
   visitor who may know nothing about it. Written in the voice of
   the pack. Ends with an invitation to begin.

---

## Quality check

After writing each pack, verify:

- Does the master.md feel like it was written by someone who
  has actually read this text?
- Is the voice directive specific enough to produce consistent
  sessions? (Not "warm and curious" — that's the default.
  What is specific to THIS text?)
- Are the routing rules complete? (What happens if they ask
  for a summary? What if they go off-topic?)
- Is the citation format correct for this tradition?
- Does the boot.md invite rather than summarize?

---

## Commit message

```
feat: living book packs — meditations, enchiridion, zarathustra, dhammapada, job, thomas
feat: expedition packs — free will, trolley problem, enlightenment, sacred geometry, quantum
feat: editorial packs — greenberg, amodei, nagel
```
