"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";

const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";
const blue = "#1d4ed8";

const PORTALS = [
  "Culture & Arts", "History & Events", "Natural Sciences", "Philosophy",
  "Religion & Belief", "Mathematics", "Society", "Geography", "Health",
  "Technology", "People", "Human Activities",
];
const BIB_SECTIONS = ["Sacred Texts", "Mythology", "Esoteric", "Oracle & Games"];
const NAV_TABS = ["Wiki", "Books", "Packs", "Games", "Forms", "News"];
const SUB_TABS = ["Featured", "Living Books", "Expeditions", "Today", "Random"];

interface Message { role: "user" | "assistant"; content: string }

function toTitle(s: string) { return s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()); }

export default function BookPage() {
  const params = useParams();
  const bookId = params.book_id as string;
  const title = toTitle(bookId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [activePortal, setActivePortal] = useState("Religion & Belief");
  const [activeNav, setActiveNav] = useState("Books");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Water appears in 7 chapters. The fullest treatment:\n\n[Chapter 8] — A person of great virtue is like the flowing water. Water benefits all things and contends not with them. It puts itself in a place that no one wishes to be and thus is closest to Tao.\n\n[Chapter 78] — There is nothing in this world that is softer and meeker than water. Yet for dissolving the hard and inflexible, nothing can surpass it.\n\nThe pattern across all seven: water as archetype of Te — benefiting without contending, occupying the lowly position, overcoming by yielding.`
      }]);
    }, 600);
  };

  const renderContent = (text: string) => {
    return text.split(/(\[Chapter \d+\])/g).map((part, i) =>
      /^\[Chapter \d+\]$/.test(part)
        ? <span key={i} style={{ color: blue, fontFamily: mono, fontSize: 11, fontWeight: 600 }}>{part}</span>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div className="chat-page" style={{ fontFamily: serif, display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ borderBottom: "1px solid #e5e7eb", padding: "0 24px", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, height: 52 }}>
          <a href="/" style={{ display: "flex", alignItems: "baseline", gap: 2, flexShrink: 0, textDecoration: "none" }}>
            <span style={{ fontSize: 22, fontFamily: serif, fontWeight: 600, color: "#111", letterSpacing: "-.02em" }}>Biblioth<span style={{ color: blue }}>è</span>que</span>
            <span style={{ fontSize: 10, fontFamily: mono, color: blue, marginLeft: 6, padding: "2px 6px", border: "1px solid #bfdbfe", borderRadius: 3 }}>PBC</span>
          </a>
          <div className="book-search">
            <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, padding: "7px 10px 7px 30px", fontSize: 12, fontFamily: mono, color: "#9ca3af", position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>⌕</span>
              Search books, topics, expeditions…
            </div>
          </div>
          <div className="book-nav-tabs">
            {NAV_TABS.map((t, i) => (
              <button key={t} onClick={() => setActiveNav(t)} style={{
                all: "unset", cursor: "pointer", fontSize: 12, fontFamily: mono, padding: "4px 10px",
                color: activeNav === t ? blue : "#4b5563",
                borderRight: i < NAV_TABS.length - 1 ? "1px solid #e5e7eb" : "none",
              }}>{t}</button>
            ))}
          </div>
        </div>
        <div className="book-sub-tabs">
          {SUB_TABS.map(t => (
            <button key={t} style={{
              all: "unset", cursor: "pointer", fontSize: 11, fontFamily: mono, padding: "6px 14px",
              color: t === "Living Books" ? blue : "#6b7280",
              borderBottom: t === "Living Books" ? `2px solid ${blue}` : "2px solid transparent",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Left sidebar */}
        <div className="book-sidebar-left">
          <div style={{ padding: "0 14px 8px", fontSize: 9, color: "#9ca3af", fontFamily: mono, letterSpacing: ".1em", textTransform: "uppercase" }}>Portals</div>
          {PORTALS.map(p => (
            <div key={p} onClick={() => setActivePortal(p)} style={{
              padding: "6px 14px", fontSize: 12, cursor: "pointer",
              color: activePortal === p ? blue : "#374151",
              background: activePortal === p ? "#eff6ff" : "transparent",
              borderLeft: activePortal === p ? `2px solid ${blue}` : "2px solid transparent",
            }}>{p}</div>
          ))}
          <div style={{ margin: "14px 14px 8px", borderTop: "1px solid #e5e7eb", paddingTop: 12, fontSize: 9, color: "#9ca3af", fontFamily: mono, letterSpacing: ".1em", textTransform: "uppercase" }}>Bibliothèque</div>
          {BIB_SECTIONS.map(s => (
            <div key={s} style={{ padding: "6px 14px", fontSize: 12, color: "#374151", cursor: "pointer" }}>{s}</div>
          ))}
          <div style={{ margin: "16px 14px 0", padding: 12, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6 }}>
            <div style={{ fontSize: 9, color: "#9ca3af", fontFamily: mono, marginBottom: 8, letterSpacing: ".08em" }}>LIBRARY</div>
            {[["Books", "1,700+"], ["Packs", "968"], ["Expeditions", "60"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: "#6b7280", fontFamily: mono }}>{l}</span>
                <span style={{ fontSize: 10, color: blue, fontFamily: mono }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ padding: "22px 16px 16px", borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 9, color: blue, fontFamily: mono, letterSpacing: ".1em" }}>LIVING BOOK</span>
              <span style={{ color: "#d1d5db", fontSize: 10 }}>·</span>
              <span style={{ fontSize: 9, color: "#9ca3af", fontFamily: mono }}>TAOISM</span>
              <span style={{ color: "#d1d5db", fontSize: 10 }}>·</span>
              <span style={{ fontSize: 9, color: "#9ca3af", fontFamily: mono }}>81 CHAPTERS</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 400, margin: "0 0 6px", fontStyle: "italic", letterSpacing: "-.02em" }}>{title}</h1>
            <p style={{ fontSize: 13.5, color: "#374151", margin: "0 0 12px", maxWidth: 560, lineHeight: 1.6 }}>
              The <em>Tao Te Ching</em> is a Chinese classic text traditionally credited to the 6th-century BC sage Laozi. A fundamental text of Taoism containing 81 short chapters on the nature of the Tao, virtue, and effortless action.
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <button style={{ all: "unset", cursor: "pointer", background: blue, color: "#fff", fontSize: 11, fontFamily: mono, padding: "6px 14px", borderRadius: 4 }}>Open Session</button>
              {["Browse Chapters", "Search Text", "Related Topics"].map(b => (
                <button key={b} style={{ all: "unset", cursor: "pointer", border: "1px solid #e5e7eb", fontSize: 11, fontFamily: mono, padding: "6px 14px", borderRadius: 4, color: "#4b5563" }}>{b}</button>
              ))}
            </div>
          </div>

          <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "18px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 10, borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: blue }} />
              <span style={{ fontSize: 10, color: "#9ca3af", fontFamily: mono }}>{title} · 81 chapters indexed · session open</span>
            </div>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 10 }}>
                {m.role === "assistant" && <div style={{ width: 24, height: 24, borderRadius: "50%", background: blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontFamily: mono, flexShrink: 0, marginTop: 2 }}>B</div>}
                <div style={{
                  maxWidth: m.role === "user" ? "70%" : "82%", padding: m.role === "user" ? "9px 14px" : "12px 14px",
                  borderRadius: m.role === "user" ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                  background: m.role === "user" ? blue : "#f9fafb", color: m.role === "user" ? "#fff" : "#111",
                  border: m.role === "user" ? "none" : "1px solid #e5e7eb", fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-wrap",
                }}>
                  {m.role === "assistant" ? renderContent(m.content) : m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input-bar" style={{ borderTop: "1px solid #e5e7eb", background: "#fff" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 8, padding: "9px 12px", background: "#f9fafb" }}>
              <input type="text" placeholder={`Ask about the ${title}…`} value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 16, fontFamily: serif, color: "#111" }}
              />
              <div onClick={sendMessage} style={{ width: 32, height: 32, borderRadius: 5, background: blue, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, cursor: "pointer", flexShrink: 0 }}>↑</div>
            </div>
            <div className="hide-mobile" style={{ display: "flex", gap: 10, marginTop: 5, paddingLeft: 2 }}>
              <span style={{ fontSize: 10, color: "#d1d5db", fontFamily: mono }}>/chapter · /search · /compare · /wiki · /book</span>
              <span style={{ marginLeft: "auto", fontSize: 10, color: "#d1d5db", fontFamily: mono }}>shift+enter for newline</span>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="book-sidebar-right">
          <div style={{ fontSize: 9, color: "#9ca3af", fontFamily: mono, letterSpacing: ".1em", marginBottom: 12 }}>RELATED</div>
          {[
            { title: "Bhagavad Gita", type: "LIVING BOOK", typeColor: blue, meta: "Hinduism · 18 chapters", desc: "700-verse dialogue on duty, devotion, and liberation." },
            { title: "Stoicism", type: "EXPEDITION", typeColor: "#6b7280", meta: "Philosophy", desc: "Virtue as the only good. The dichotomy of control." },
            { title: "I Ching Oracle", type: "ORACLE", typeColor: "#6b7280", meta: "Divination · 64 hexagrams", desc: "Cast a hexagram. 3,000-year-old wisdom system." },
          ].map(c => (
            <div key={c.title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: 14, marginBottom: 8, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</span>
                <span style={{ fontSize: 8, fontFamily: mono, color: c.typeColor, border: `1px solid ${c.typeColor === blue ? "#bfdbfe" : "#e5e7eb"}`, borderRadius: 2, padding: "1px 5px", whiteSpace: "nowrap" }}>{c.type}</span>
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af", fontFamily: mono, marginBottom: 4 }}>{c.meta}</div>
              <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.45 }}>{c.desc}</div>
            </div>
          ))}

          <div style={{ fontSize: 9, color: "#9ca3af", fontFamily: mono, letterSpacing: ".1em", marginTop: 16, marginBottom: 10 }}>TODAY&apos;S FEATURED</div>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden", marginBottom: 18 }}>
            <div style={{ background: "#f0f7ff", padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 11, fontFamily: mono, color: blue, marginBottom: 3 }}>FROM THE LIBRARY</div>
              <div style={{ fontSize: 14, fontStyle: "italic", fontWeight: 600 }}>Meditations</div>
              <div style={{ fontSize: 10, color: "#9ca3af", fontFamily: mono }}>Marcus Aurelius · Stoicism</div>
            </div>
            <div style={{ padding: "10px 12px" }}>
              <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5, margin: 0 }}>Private journal of a philosopher-emperor. 12 books of Stoic self-examination.</p>
            </div>
          </div>

          <div style={{ fontSize: 9, color: "#9ca3af", fontFamily: mono, letterSpacing: ".1em", marginBottom: 8 }}>RECENT SESSIONS</div>
          {["Tao Te Ching · Chapter 42", "Game Theory · Nash eq.", "Stoicism · Dichotomy"].map(s => (
            <div key={s} style={{ padding: "6px 0", borderBottom: "1px solid #f3f4f6", fontSize: 11, fontFamily: mono, color: "#6b7280", cursor: "pointer" }}>↩ {s}</div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #e5e7eb", padding: "12px 24px", background: "#f9fafb", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 9, color: "#9ca3af", fontFamily: mono, letterSpacing: ".1em", marginRight: 4 }}>PORTALS:</span>
        {["Culture", "History", "Science", "Philosophy", "Religion", "Mathematics", "Technology", "Geography", "Health", "Society", "People", "Sacred Texts", "Oracle", "Games", "Forms"].map(p => (
          <span key={p} style={{ display: "inline-block", fontSize: 10, fontFamily: mono, padding: "2px 8px", borderRadius: 3, border: "1px solid #e5e7eb", color: "#6b7280", cursor: "pointer" }}>{p}</span>
        ))}
      </div>
    </div>
  );
}
