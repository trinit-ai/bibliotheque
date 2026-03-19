import { useState } from "react";

// ── Card color system ──────────────────────────────────────────────────────
//
// Two color axes:
//   FORMAT color  — what kind of thing it is (tab accent + icon)
//   PORTAL color  — what subject it's in (background tint)
//
// Light tints, rounded tabs. Wikipedia-legible but warmer.

const FORMAT = {
  living_book: {
    label: "Living Book",
    tab:   "#1D4ED8",          // blue
    tint:  "#EFF6FF",
    text:  "#1E3A8A",
  },
  expedition: {
    label: "Expedition",
    tab:   "#0891B2",          // teal
    tint:  "#ECFEFF",
    text:  "#164E63",
  },
  oracle: {
    label: "Oracle",
    tab:   "#7C3AED",          // violet
    tint:  "#F5F3FF",
    text:  "#4C1D95",
  },
  essay: {
    label: "Essay",
    tab:   "#B45309",          // amber
    tint:  "#FFFBEB",
    text:  "#78350F",
  },
  pack: {
    label: "Pack",
    tab:   "#374151",          // slate
    tint:  "#F9FAFB",
    text:  "#111827",
  },
  interaction: {
    label: "Interaction",
    tab:   "#059669",          // green
    tint:  "#ECFDF5",
    text:  "#064E3B",
  },
};

const PORTAL = {
  philosophy:  { tint: "#F5F3FF", accent: "#7C3AED" },
  religion:    { tint: "#FFF7ED", accent: "#C2410C" },
  science:     { tint: "#ECFDF5", accent: "#065F46" },
  history:     { tint: "#FFFBEB", accent: "#92400E" },
  mathematics: { tint: "#EFF6FF", accent: "#1E40AF" },
  esoterica:   { tint: "#FDF4FF", accent: "#7E22CE" },
  literature:  { tint: "#FFF1F2", accent: "#9F1239" },
  psychology:  { tint: "#ECFEFF", accent: "#155E75" },
  society:     { tint: "#F0FDF4", accent: "#14532D" },
  technology:  { tint: "#EFF6FF", accent: "#1E3A8A" },
};

// ── Sample catalogue entries ───────────────────────────────────────────────

const ENTRIES = [
  {
    id: "tao_te_ching",
    title: "Tao Te Ching",
    subtitle: "The Book of the Way",
    author: "Laozi · 6th century BC",
    desc: "The foundational text of Taoist philosophy. 81 chapters on the nature of the Tao, virtue, and effortless action.",
    format: "living_book",
    portal: "religion",
    meta: "81 chapters indexed",
    sessions: "47 sessions this week",
    featured: true,
  },
  {
    id: "stoicism",
    title: "Stoicism",
    subtitle: "The philosophy of endurance",
    author: "Expedition · Zeno to Aurelius",
    desc: "From Zeno's stoa to Marcus Aurelius's journal. Virtue ethics, the dichotomy of control, living according to nature.",
    format: "expedition",
    portal: "philosophy",
    meta: "Full tradition indexed",
    sessions: "31 sessions this week",
    featured: true,
  },
  {
    id: "i_ching",
    title: "I Ching",
    subtitle: "Book of Changes",
    author: "Oracle · Chinese antiquity",
    desc: "Cast a hexagram. Receive interpretation from the oldest continuously consulted divinatory text in the world.",
    format: "oracle",
    portal: "esoterica",
    meta: "64 hexagrams",
    sessions: "12 sessions this week",
    featured: true,
  },
  {
    id: "orwell_essay",
    title: "Politics and the English Language",
    subtitle: "Six rules for clear writing",
    author: "George Orwell · 1946",
    desc: "On the corruption of language by political orthodoxy and the defense of clear prose as a political act.",
    format: "essay",
    portal: "literature",
    meta: "~4,000 words",
    sessions: "8 sessions this week",
    featured: true,
  },
  {
    id: "game_theory",
    title: "Game Theory",
    subtitle: "Strategy, decisions, interaction",
    author: "Expedition · Nash to Schelling",
    desc: "The mathematics of strategic interaction. Prisoner's dilemma, Nash equilibrium, Schelling points, evolutionary dynamics.",
    format: "expedition",
    portal: "mathematics",
    meta: "Full field indexed",
    sessions: "19 sessions this week",
    featured: false,
  },
  {
    id: "meditations",
    title: "Meditations",
    subtitle: "Private notes of a philosopher-emperor",
    author: "Marcus Aurelius · c. 170–180 AD",
    desc: "The personal journal of Rome's philosopher-king. Twelve books of Stoic reflection written for himself, never meant to be published.",
    format: "living_book",
    portal: "philosophy",
    meta: "12 books indexed",
    sessions: "24 sessions this week",
    featured: false,
  },
  {
    id: "corpus_hermeticum",
    title: "Corpus Hermeticum",
    subtitle: "The foundational Hermetic texts",
    author: "Hermes Trismegistus · c. 2nd–3rd century",
    desc: "The texts attributed to Hermes Trismegistus. Explore the nature of God, mind, cosmos, and the path of spiritual ascent.",
    format: "living_book",
    portal: "esoterica",
    meta: "18 tractates indexed",
    sessions: "6 sessions this week",
    featured: false,
  },
  {
    id: "consciousness",
    title: "Consciousness",
    subtitle: "The hard problem and beyond",
    author: "Expedition · Philosophy of mind",
    desc: "Qualia, the explanatory gap, integrated information theory, panpsychism, and the question that won't go away.",
    format: "expedition",
    portal: "psychology",
    meta: "Full territory indexed",
    sessions: "22 sessions this week",
    featured: false,
  },
];

// ── Card component ─────────────────────────────────────────────────────────

function Card({ entry }) {
  const [hov, setHov] = useState(false);
  const f = FORMAT[entry.format];
  const p = PORTAL[entry.portal] || { tint: "#F9FAFB", accent: "#374151" };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#fff" : p.tint,
        border: `0.5px solid ${hov ? p.accent : "rgba(0,0,0,.08)"}`,
        borderRadius: 10,
        overflow: "hidden",
        transition: "border-color .15s, background .15s",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Format tab */}
      <div style={{
        background: f.tab,
        padding: "6px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "'DM Mono', 'Courier New', monospace",
          fontSize: 10,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.9)",
          fontWeight: 500,
        }}>
          {f.label}
        </span>
        <span style={{
          fontFamily: "'DM Mono', 'Courier New', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,.5)",
        }}>
          {entry.sessions}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{
          fontFamily: "'Crimson Pro', Georgia, serif",
          fontStyle: "italic",
          fontSize: 22,
          lineHeight: 1.15,
          color: "#111827",
          letterSpacing: "-.01em",
        }}>
          {entry.title}
        </div>
        <div style={{
          fontFamily: "'DM Mono', 'Courier New', monospace",
          fontSize: 10,
          color: p.accent,
          letterSpacing: ".04em",
        }}>
          {entry.author}
        </div>
        <div style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 13,
          lineHeight: 1.65,
          color: "#4B5563",
          marginTop: 4,
          flex: 1,
        }}>
          {entry.desc}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 12,
          marginTop: 4,
          borderTop: "0.5px solid rgba(0,0,0,.07)",
        }}>
          <span style={{
            fontFamily: "'DM Mono', 'Courier New', monospace",
            fontSize: 10,
            color: "#9CA3AF",
          }}>
            {entry.meta}
          </span>
          <button style={{
            background: f.tab,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontFamily: "'DM Mono', 'Courier New', monospace",
            fontSize: 10,
            padding: "5px 12px",
            cursor: "pointer",
            letterSpacing: ".04em",
          }}>
            Open session →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Compact card (for sidebar / picks list) ────────────────────────────────

function CardCompact({ entry }) {
  const [hov, setHov] = useState(false);
  const f = FORMAT[entry.format];
  const p = PORTAL[entry.portal] || { tint: "#F9FAFB", accent: "#374151" };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 8,
        background: hov ? p.tint : "transparent",
        border: `0.5px solid ${hov ? "rgba(0,0,0,.08)" : "transparent"}`,
        cursor: "pointer",
        transition: "all .15s",
        alignItems: "flex-start",
      }}
    >
      {/* Color dot = format color */}
      <div style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: f.tab,
        flexShrink: 0,
        marginTop: 5,
      }} />
      <div>
        <div style={{
          fontFamily: "'Crimson Pro', Georgia, serif",
          fontSize: 15,
          lineHeight: 1.25,
          color: "#111827",
        }}>
          {entry.title}
        </div>
        <div style={{
          fontFamily: "'DM Mono', 'Courier New', monospace",
          fontSize: 10,
          color: "#9CA3AF",
          marginTop: 2,
        }}>
          {f.label} · {entry.portal}
        </div>
      </div>
    </div>
  );
}

// ── Portal pill ────────────────────────────────────────────────────────────

function PortalPill({ name, portal }) {
  const [hov, setHov] = useState(false);
  const p = PORTAL[portal] || { tint: "#F9FAFB", accent: "#374151" };
  return (
    <span style={{
      fontFamily: "'DM Mono', 'Courier New', monospace",
      fontSize: 11,
      padding: "4px 12px",
      borderRadius: 20,
      background: hov ? p.accent : p.tint,
      color: hov ? "#fff" : p.accent,
      border: `0.5px solid ${p.accent}`,
      cursor: "pointer",
      transition: "all .15s",
      whiteSpace: "nowrap",
    }}
    onMouseEnter={() => setHov(true)}
    onMouseLeave={() => setHov(false)}
    >
      {name}
    </span>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────

export default function CardEconomy() {
  const [filter, setFilter] = useState("all");

  const formats = ["all", ...Object.keys(FORMAT)];
  const visible = filter === "all" ? ENTRIES : ENTRIES.filter(e => e.format === filter);

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh", padding: "32px 40px", fontFamily: "Georgia, serif" }}>

      {/* Section label */}
      <div style={{ fontFamily: "'DM Mono', 'Courier New', monospace", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 20 }}>
        From the Library
      </div>

      {/* Format filter tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28 }}>
        {formats.map(f => {
          const active = filter === f;
          const fmt = FORMAT[f];
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "'DM Mono', 'Courier New', monospace",
                fontSize: 11,
                padding: "5px 14px",
                borderRadius: 20,
                border: `0.5px solid ${active ? (fmt?.tab || "#111827") : "rgba(0,0,0,.15)"}`,
                background: active ? (fmt?.tab || "#111827") : "transparent",
                color: active ? "#fff" : "#6B7280",
                cursor: "pointer",
                transition: "all .15s",
                letterSpacing: ".04em",
              }}
            >
              {f === "all" ? "All" : fmt?.label}
            </button>
          );
        })}
      </div>

      {/* Portal pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {Object.entries(PORTAL).map(([key, val]) => (
          <PortalPill key={key} name={key.charAt(0).toUpperCase() + key.slice(1)} portal={key} />
        ))}
      </div>

      {/* Card grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
        {visible.map(e => <Card key={e.id} entry={e} />)}
      </div>

      {/* Compact list (sidebar mode) */}
      <div style={{ fontFamily: "'DM Mono', 'Courier New', monospace", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 12 }}>
        Today's Picks — compact view
      </div>
      <div style={{ maxWidth: 320, border: "0.5px solid #E5E7EB", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
        {ENTRIES.filter(e => e.featured).map((e, i) => (
          <div key={e.id} style={{ borderBottom: i < 3 ? "0.5px solid #F3F4F6" : "none" }}>
            <CardCompact entry={e} />
          </div>
        ))}
      </div>

    </div>
  );
}
