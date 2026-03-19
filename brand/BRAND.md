# Bibliothèque — Brand Guide

**Product of TMOS13, LLC**
bibliotheque.ai

---

## Name

Always: **Bibliothèque**
Never: Bibliotheque, bibliothèque (lowercase), BibliothÃ¨que

The è is the brand. It renders in accent blue (#1d4ed8) in all HTML/UI contexts. In plain text (emails, CLI output), use: Bibliotheque.

---

## Logomark

The mark is a rectangular frame (library window / doorway) containing three shelves of books rendered as abstract color blocks.

The accent grave ( ` ) floats above the frame as a designed element — the accent you couldn't put in the domain, owned as architecture.

A single period ( · ) sits below the frame as a full stop.

Files:
- `bibliotheque-logo.svg` — primary (editorial white context)
- `bibliotheque-logo-dark.svg` — dark (session blue context)
- `bibliotheque-favicon.svg` — B monogram (square, 32x32)
- `bibliotheque-wordmark.svg` — horizontal lockup

---

## Colors

### Editorial mode (default)
| Token | Hex | Use |
|-------|-----|-----|
| Background | #ffffff | Page background |
| Text primary | #111827 | Body text, headings |
| Accent | #1d4ed8 | Links, the è, CTAs, active states |
| Accent light | #eff6ff | Hover backgrounds, highlighted cards |
| Accent border | #bfdbfe | Card borders, dividers |
| Border | #e5e7eb | Default borders |
| Muted text | #6b7280 | Secondary text, metadata |
| Subtle text | #9ca3af | Labels, hints |

### Session mode (active conversation)
| Token | Hex | Use |
|-------|-----|-----|
| Background | #020817 | Page background |
| Text primary | #e2e8f0 | Body text |
| Accent | #3B82F6 | Links, citations, the è, active |
| Accent light | rgba(59,130,246,0.1) | Hover backgrounds |
| Border | rgba(59,130,246,0.12) | Card borders |
| Muted text | #94a3b8 | Secondary |
| Subtle text | #64748b | Hints, labels |

---

## Typography

| Role | Font | Weight | Style |
|------|------|--------|-------|
| Display / headings | Crimson Pro | 300-600 | Italic preferred |
| Body / chat | Source Serif 4 | 300-400 | Normal and italic |
| UI / metadata / citations | DM Mono | 300-500 | Normal |

### Citation format
Always monospace, accent color, brackets:
`[Chapter 8]` `[Book III]` `[Verse 42]`

```tsx
<span className="font-mono text-[11px] text-blue-700 font-semibold">
  [Chapter 8]
</span>
```

---

## The è rule

The è in Bibliothèque always renders in accent blue.
In editorial mode: #1d4ed8
In session mode: #3B82F6

In React:
```tsx
<>Biblioth<span className="text-blue-700">è</span>que</>
```

In SVG:
```svg
<tspan fill="#111827">Biblioth</tspan>
<tspan fill="#1d4ed8">è</tspan>
<tspan fill="#111827">que</tspan>
```

---

## The B monogram

Square, 6px rounded corners, #1d4ed8 fill, italic B in white.
Used as: favicon, app icon, compact nav, social avatar.

---

## Voice

**Tone:** Authoritative but not academic. Knowledgeable but not encyclopedic. The tone of a brilliant companion in a great library — not a search engine, not a chatbot.

**Headlines:** Sentence case always.
`The living library` not `The Living Library`

**Tagline:** `The living library.` or `The library, finally talkable.`

**The è in copy:** Use the accented character in running prose.
`Open a Bibliothèque session` not `Open a Bibliotheque session`

---

## What it is not

Not a Wikipedia clone. Not an AI chatbot. Not a search engine.
Not a reading app. Not a study tool (though it can be used as one).

It is a living library. Every article talks back.
