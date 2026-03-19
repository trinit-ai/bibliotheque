import { useState, useRef, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

const STARTERS = [
  "What does it say about water?",
  "Take me to Chapter 1",
  "What is wu wei?",
  "How does the sage ruler govern?",
  "What does it say about strength and weakness?",
];

const CHAPTER_WATER = ["Ch. 8","Ch. 15","Ch. 28","Ch. 43","Ch. 76","Ch. 78","Ch. 79"];

const DEMO_RESPONSE = {
  intro: "Water appears in 7 chapters. It is the text's central metaphor for",
  concept: "Te (virtue)",
  mid: "— the quality that benefits without contending.",
  passages: [
    {
      cite: "Chapter 8",
      text: "A person of great virtue is like the flowing water. Water benefits all things and contends not with them. It puts itself in a place that no one wishes to be and thus is closest to Tao.",
    },
    {
      cite: "Chapter 78",
      text: "There is nothing in this world that is softer and meeker than water. Yet for dissolving the hard and inflexible, nothing can surpass it.",
    },
  ],
  closing: "The pattern across all seven: water as archetype of Te — occupying the lowly position, overcoming by yielding, benefiting without claiming.",
  related: ["Chapter 8 in full", "Wu wei", "Te (virtue)", "Taoism"],
};

// ── Sub-components ─────────────────────────────────────────────────────────

function Badge({ children, variant = "default" }) {
  const styles = {
    book: { background: "#eff6ff", color: "#1d4ed8", border: "0.5px solid #bfdbfe" },
    default: { background: "transparent", color: "#6b7280", border: "0.5px solid #e5e7eb" },
  };
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: 10, padding: "2px 8px",
      borderRadius: 3, ...styles[variant]
    }}>
      {children}
    </span>
  );
}

function PassageLink({ children, chapter }) {
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace", fontSize: 10,
      color: "#1d4ed8", background: "#eff6ff",
      border: "0.5px solid #bfdbfe", borderRadius: 3,
      padding: "1px 6px", cursor: "pointer", whiteSpace: "nowrap",
      marginLeft: 4,
    }}>
      → {chapter}
    </span>
  );
}

function Infobox() {
  const rows = [
    ["Author", "Laozi (attributed)"],
    ["Date", "6th century BC"],
    ["Chapters", "81"],
    ["Tradition", "Taoism"],
    ["Translation", "Mou (this edition)"],
    ["License", "Public domain"],
    ["Related", "Chuang Tzu · Lieh Tzu"],
  ];
  return (
    <div style={{ border: "0.5px solid #e5e7eb", borderRadius: 8, overflow: "hidden", fontSize: 12 }}>
      <div style={{ background: "#eff6ff", padding: "10px 12px" }}>
        <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 14, fontWeight: 600, fontStyle: "italic", color: "#0C447C" }}>
          Tao Te Ching
        </div>
      </div>
      {rows.map(([label, val]) => (
        <div key={label} style={{ display: "flex", borderBottom: "0.5px solid #f3f4f6", padding: "7px 12px", gap: 8 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#6b7280", minWidth: 72, paddingTop: 1 }}>{label}</span>
          <span style={{ fontSize: 12 }}>{val}</span>
        </div>
      ))}
    </div>
  );
}

function TOC({ onSectionClick }) {
  const sections = ["Overview", "Key themes", "Water as metaphor", "The sage ruler", "Wu wei", "Reception", "All 81 chapters →"];
  return (
    <div style={{ border: "0.5px solid #f3f4f6", borderRadius: 8, padding: 12, marginTop: 14, fontSize: 12 }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
        Contents
      </div>
      {sections.map((s, i) => (
        <div key={s} style={{ padding: "3px 0", borderBottom: i < sections.length - 1 ? "0.5px solid #f3f4f6" : "none", cursor: "pointer" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9ca3af", marginRight: 6 }}>{i + 1}</span>
          <span style={{ fontSize: 12, color: "#1d4ed8", fontFamily: "'Source Serif 4', Georgia, serif" }}>{s}</span>
        </div>
      ))}
    </div>
  );
}

function WarmStartBar({ onOpen }) {
  return (
    <div style={{ borderTop: "0.5px solid #e5e7eb", paddingTop: 16, marginTop: 8 }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
        Start a session — or pick a thread
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 }}>
        {STARTERS.map(s => (
          <button key={s} onClick={() => onOpen(s)} style={{
            fontSize: 12, fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic",
            padding: "6px 14px", border: "0.5px solid #e5e7eb", borderRadius: 20,
            background: "#fff", cursor: "pointer", color: "#374151",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "#1d4ed8"; e.target.style.color = "#1d4ed8"; e.target.style.background = "#eff6ff"; }}
          onMouseLeave={e => { e.target.style.borderColor = "#e5e7eb"; e.target.style.color = "#374151"; e.target.style.background = "#fff"; }}
          >
            {s}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => onOpen("")} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#1d4ed8", color: "#fff", border: "none",
          borderRadius: 6, padding: "9px 18px", fontSize: 13,
          fontFamily: "'DM Mono', monospace", cursor: "pointer",
        }}>
          Open session ↗
        </button>
        <a href="#" style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#9ca3af", textDecoration: "none", borderBottom: "0.5px solid #e5e7eb" }}>
          Full text (81 chapters)
        </a>
      </div>
    </div>
  );
}

// ── Citation chip ──────────────────────────────────────────────────────────

function Cite({ children }) {
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500,
      color: "#3B82F6", background: "rgba(59,130,246,0.12)",
      border: "0.5px solid rgba(59,130,246,0.3)", borderRadius: 3,
      padding: "1px 6px", cursor: "pointer", margin: "0 2px",
    }}>
      {children}
    </span>
  );
}

function PassageBlock({ text, cite }) {
  return (
    <div style={{
      borderLeft: "2px solid rgba(59,130,246,0.4)", padding: "8px 12px",
      margin: "10px 0", background: "rgba(59,130,246,0.05)", borderRadius: "0 4px 4px 0",
    }}>
      <div style={{ fontStyle: "italic", color: "#cbd5e1", fontSize: 13, lineHeight: 1.65 }}>"{text}"</div>
      <div style={{ marginTop: 4 }}><Cite>{cite}</Cite></div>
    </div>
  );
}

function ChapterDots({ chapters }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, margin: "8px 0" }}>
      {chapters.map(ch => (
        <span key={ch} style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10,
          background: "rgba(59,130,246,0.12)", border: "0.5px solid rgba(59,130,246,0.25)",
          borderRadius: 3, padding: "2px 7px", color: "#93c5fd", cursor: "pointer",
        }}>
          {ch}
        </span>
      ))}
    </div>
  );
}

function RelatedChips({ items }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: 6,
      marginTop: 12, paddingTop: 10,
      borderTop: "0.5px solid rgba(59,130,246,0.12)",
    }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#475569", paddingTop: 2 }}>explore →</span>
      {items.map(item => (
        <span key={item} style={{
          fontSize: 11, fontFamily: "'DM Mono', monospace",
          color: "#64748b", border: "0.5px solid rgba(59,130,246,0.15)",
          borderRadius: 4, padding: "3px 8px", cursor: "pointer",
        }}>
          {item}
        </span>
      ))}
    </div>
  );
}

function AiMessage({ starter }) {
  const isWater = starter.toLowerCase().includes("water") || starter === "";
  if (isWater) {
    return (
      <div style={{
        background: "rgba(15,23,42,0.8)", border: "0.5px solid rgba(59,130,246,0.18)",
        borderRadius: "4px 14px 14px 14px", padding: "14px 16px",
        fontSize: 13, fontFamily: "'Source Serif 4', Georgia, serif",
        lineHeight: 1.7, color: "#e2e8f0",
      }}>
        {DEMO_RESPONSE.intro}{" "}
        <span style={{ color: "#93c5fd", borderBottom: "0.5px solid rgba(59,130,246,0.4)", cursor: "pointer" }}>
          {DEMO_RESPONSE.concept}
        </span>{" "}
        {DEMO_RESPONSE.mid}
        <ChapterDots chapters={CHAPTER_WATER} />
        The fullest treatment is Chapter 8:
        <PassageBlock text={DEMO_RESPONSE.passages[0].text} cite={DEMO_RESPONSE.passages[0].cite} />
        Chapter 78 returns to it directly:
        <PassageBlock text={DEMO_RESPONSE.passages[1].text} cite={DEMO_RESPONSE.passages[1].cite} />
        {DEMO_RESPONSE.closing}
        <RelatedChips items={DEMO_RESPONSE.related} />
      </div>
    );
  }
  return (
    <div style={{
      background: "rgba(15,23,42,0.8)", border: "0.5px solid rgba(59,130,246,0.18)",
      borderRadius: "4px 14px 14px 14px", padding: "14px 16px",
      fontSize: 13, fontFamily: "'Source Serif 4', Georgia, serif",
      lineHeight: 1.7, color: "#e2e8f0",
    }}>
      <Cite>Searching indexed text…</Cite>{" "}
      Let me find the relevant passages for <em>"{starter}"</em>. The text is fully indexed — I'll surface the actual chapters.
    </div>
  );
}

// ── Session layer ──────────────────────────────────────────────────────────

function SessionLayer({ starter, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    setMessages([
      { role: "user", text: starter || "What does it say about water?" },
      { role: "ai", starter: starter || "" },
    ]);
  }, [starter]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev,
      { role: "user", text: input },
      { role: "ai", starter: input },
    ]);
    setInput("");
  };

  return (
    <div style={{ background: "#020817", borderRadius: 12, overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        padding: "12px 20px", borderBottom: "0.5px solid rgba(59,130,246,0.15)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3B82F6", letterSpacing: "0.08em" }}>
          Tao Te Ching · 81 chapters indexed · session open
        </span>
        <span style={{ marginLeft: "auto", fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 14, fontStyle: "italic", color: "#e2e8f0" }}>
          Biblioth<span style={{ color: "#3B82F6" }}>è</span>que
        </span>
        <button onClick={onClose} style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#475569",
          cursor: "pointer", marginLeft: 8, padding: "3px 8px",
          border: "0.5px solid #334155", borderRadius: 4, background: "transparent",
        }}>
          ← article
        </button>
      </div>

      {/* Messages */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14, maxHeight: 480, overflowY: "auto" }}>
        {/* Context injection */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 10, borderBottom: "0.5px solid rgba(59,130,246,0.1)" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#3B82F6", flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3B82F6" }}>
            Opening with: {(starter || "water across all 81 chapters").toLowerCase()}
          </span>
        </div>

        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "user" ? (
              <div style={{
                background: "#1e40af", color: "#fff",
                borderRadius: "14px 4px 14px 14px",
                padding: "9px 14px", maxWidth: "72%",
                fontSize: 13, fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.6,
              }}>
                {msg.text}
              </div>
            ) : (
              <AiMessage starter={msg.starter} />
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "12px 20px 16px", borderTop: "0.5px solid rgba(59,130,246,0.12)" }}>
        <div style={{
          display: "flex", gap: 8, background: "rgba(15,23,42,0.8)",
          border: "0.5px solid rgba(59,130,246,0.2)", borderRadius: 8, padding: "8px 12px",
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); }}}
            placeholder="Ask about the Tao Te Ching…"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontSize: 13, fontFamily: "'Source Serif 4', Georgia, serif", color: "#e2e8f0",
            }}
          />
          <button onClick={sendMsg} style={{
            width: 26, height: 26, borderRadius: 5,
            background: "rgba(59,130,246,0.2)", border: "none",
            color: "#3B82F6", fontSize: 13, cursor: "pointer", flexShrink: 0,
          }}>↑</button>
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#1e3a5f", marginTop: 6 }}>
          /chapter · /search · /compare · /related · full text →
        </div>
      </div>
    </div>
  );
}

// ── Article layer ──────────────────────────────────────────────────────────

function ArticleLayer({ onOpen }) {
  return (
    <div style={{ paddingTop: 24, fontFamily: "'Source Serif 4', Georgia, serif", color: "#111827" }}>
      {/* Meta */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <Badge variant="book">LIVING BOOK</Badge>
        <Badge>TAOISM · 81 CHAPTERS</Badge>
        <span style={{ marginLeft: "auto", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9ca3af" }}>
          47 sessions this week
        </span>
      </div>

      {/* Title */}
      <h1 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 34, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 8 }}>
        Tao Te Ching
      </h1>

      {/* Lede */}
      <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16, maxWidth: 560 }}>
        The <em>Tao Te Ching</em> (道德經) is a Chinese classic text traditionally attributed to the sage{" "}
        <a href="#" style={{ color: "#1d4ed8", textDecoration: "none", borderBottom: "0.5px solid #bfdbfe" }}>Laozi</a>,
        written in the 6th century BC. A foundational text of{" "}
        <a href="#" style={{ color: "#1d4ed8", textDecoration: "none", borderBottom: "0.5px solid #bfdbfe" }}>Taoism</a>,
        it presents 81 short chapters on the nature of the Tao — the Way — and its relationship
        to virtue (<em>te</em>), effortless action (<em>wu wei</em>), and the natural order.
      </p>

      {/* Two-column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 28, marginBottom: 0 }}>
        <div>
          <h2 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 20, fontWeight: 400, margin: "0 0 8px", paddingBottom: 6, borderBottom: "0.5px solid #f3f4f6" }}>
            Overview
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>
            The text opens by undermining itself: <em>"The Tao that can be told is not the eternal Tao."</em>{" "}
            In eighty-one brief chapters, Laozi returns repeatedly to paradox as method.
            Strength comes through yielding <PassageLink chapter="Ch. 76" />.
            The highest good is like water <PassageLink chapter="Ch. 8" />.
            The Tao that can be named is already a departure from the Tao.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>
            Water appears as the text's central metaphor across{" "}
            <a href="#" style={{ color: "#1d4ed8", textDecoration: "none", borderBottom: "0.5px solid #bfdbfe" }}>seven chapters</a>.
            The ideal ruler governs like the Tao — present but unfelt, effective but unclaimed.
            The sage does not accumulate. The greatest achievement appears inadequate <PassageLink chapter="Ch. 45" />.
          </p>

          <h2 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 20, fontWeight: 400, margin: "20px 0 8px", paddingBottom: 6, borderBottom: "0.5px solid #f3f4f6" }}>
            Key themes
          </h2>
          <div style={{ fontSize: 14, lineHeight: 1.75, WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", maxHeight: 80, overflow: "hidden" }}>
            Wu wei (effortless action) · Te (virtue/power) · The uncarved block · Return to origin · Paradox and reversal · The sage ruler · Yin/Yang polarity · The ten thousand things
          </div>
          <div style={{ marginTop: 8 }}>
            <a href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#1d4ed8", textDecoration: "none", borderBottom: "0.5px solid #bfdbfe" }}>
              Read full text →
            </a>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9ca3af", marginLeft: 16 }}>
              Mou translation · public domain
            </span>
          </div>
        </div>

        <div>
          <Infobox />
          <TOC />
        </div>
      </div>

      <WarmStartBar onOpen={onOpen} />
    </div>
  );
}

// ── Root component ─────────────────────────────────────────────────────────

export default function BibliothequeArticle() {
  const [mode, setMode] = useState("article"); // "article" | "session"
  const [starter, setStarter] = useState("");

  const openSession = (s) => { setStarter(s); setMode("session"); };
  const closeSession = () => setMode("article");

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 40px" }}>
      {mode === "article" ? (
        <ArticleLayer onOpen={openSession} />
      ) : (
        <div style={{ paddingTop: 16 }}>
          <SessionLayer starter={starter} onClose={closeSession} />
        </div>
      )}
    </div>
  );
}
