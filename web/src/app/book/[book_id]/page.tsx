"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowLeft, User, Send, ChevronDown, Bookmark, History, Newspaper, Hash, BookMarked, Compass, Share2, Link2, Twitter, Mail } from "lucide-react";

const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";
const cream = "#FAFAF7";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const border2 = "#F0EDE6";
const blue = "#1D4ED8";

interface Message { role: "user" | "assistant"; content: string }

function toTitle(s: string) { return s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()); }

// ── Book metadata lookup ──────────────────────────────────────────────────

const BOOK_DATA: Record<string, { title: string; author: string; tradition: string; chapters: string; desc: string; portal: string; related: { title: string; type: string; typeColor: string; meta: string; desc: string; href: string }[]; greeting: string }> = {
  tao_te_ching: {
    title: "Tao Te Ching", author: "Laozi", tradition: "Taoism", chapters: "81 chapters", portal: "Religion",
    desc: "The foundational text of Taoist philosophy. 81 chapters on the nature of the Tao, virtue, and effortless action.",
    related: [
      { title: "Dhammapada", type: "LIVING BOOK", typeColor: blue, meta: "Buddhism · 26 chapters", desc: "The path of dharma. The most accessible Buddhist text.", href: "/book/dhammapada" },
      { title: "Stoicism", type: "EXPEDITION", typeColor: "#0891B2", meta: "Philosophy", desc: "Virtue as the only good. The dichotomy of control.", href: "/wiki/stoicism" },
      { title: "I Ching", type: "HOROSCOPE", typeColor: "#7C3AED", meta: "Divination · 64 hexagrams", desc: "Cast a hexagram. 3,000-year-old wisdom system.", href: "/book/i_ching" },
    ],
    greeting: "The Tao that can be spoken of is not the constant Tao. The name that can be named is not a constant name.\n\nThis is where the text begins — by undermining itself. What can be said about something that, by its own account, cannot be named?\n\n81 chapters follow. They return again and again to water, to emptiness, to the sage who leads by stepping back. The text contradicts itself freely — not by accident, but as method. Chapter 2 says beauty and ugliness give birth to each other. Chapter 78 says nothing is softer than water, yet nothing overcomes the hard like water does.\n\nThe full text is indexed and present in this session. You can ask about any chapter, search for a theme, or follow a thread across the whole work.\n\nWhat draws you here today?",
  },
  machines_of_loving_grace: {
    title: "Machines of Loving Grace", author: "Dario Amodei · Anthropic · 2024", tradition: "Technology · AI", chapters: "Essay · ~15,000 words", portal: "Technology",
    desc: "The CEO of Anthropic argues that AI will compress a century of scientific progress into a decade — and that this will be broadly beneficial if developed responsibly. The essay is strongest on biology and medicine, most vulnerable on its own internal tensions.",
    related: [
      { title: "Consciousness", type: "EXPEDITION", typeColor: "#0891B2", meta: "Philosophy of Mind", desc: "The hard problem. Does AI have 'something it is like' to be it?", href: "/wiki/consciousness" },
      { title: "Avant-Garde and Kitsch", type: "ESSAY", typeColor: "#B45309", meta: "Greenberg · 1939", desc: "Genuine culture requires difficulty. What does AI do to that?", href: "/book/avant_garde_and_kitsch" },
      { title: "The Prince", type: "LIVING BOOK", typeColor: blue, meta: "Machiavelli · 26 chapters", desc: "A clinical anatomy of power. Relevant when the builder is also the regulator.", href: "/book/the_prince" },
    ],
    greeting: "Dario Amodei's essay makes a specific, ambitious claim: AI will compress a century of scientific progress into a decade, and this will be broadly beneficial — in biology, medicine, neuroscience, economics, and governance.\n\nThe argument is strongest where it's most concrete: the case for AI-accelerated drug discovery and disease eradication. It's most vulnerable where it meets its own shadow — the tension between building one of the most powerful AI systems in history and claiming to be the most reliable voice on its safety.\n\nHere are some ways into the text:\n\n• \"Map the argument\" — walk through the essay's structure and key claims\n• \"Where is this weakest?\" — find the places where evidence is thin\n• \"The biology case\" — his strongest section, on disease and longevity\n• \"The Anthropic tension\" — can the builder also be the safety authority?\n• \"What would a skeptic say?\" — steelman the opposition\n\nOr ask anything. The full text is here.",
  },
  ecclesiastes: {
    title: "Ecclesiastes", author: "Qohelet", tradition: "Judaism", chapters: "12 chapters", portal: "Religion",
    desc: "The most existential book of the Bible. All is vanity. Yet still: eat, drink, find joy in your labor.",
    related: [
      { title: "Book of Job", type: "LIVING BOOK", typeColor: blue, meta: "Judaism · 42 chapters", desc: "Where wast thou when I laid the foundations of the earth?", href: "/book/book_of_job" },
      { title: "Free Will", type: "EXPEDITION", typeColor: "#0891B2", meta: "Philosophy", desc: "Determinism, compatibilism, and moral responsibility.", href: "/wiki/free_will" },
      { title: "Meditations", type: "LIVING BOOK", typeColor: blue, meta: "Stoicism · 12 books", desc: "Private journal of a philosopher-emperor.", href: "/book/meditations_aurelius" },
    ],
    greeting: "Vanity of vanities, saith the Preacher. All is vanity.\n\nThis is the Bible's most unsettling book — the one that questions whether any of it matters. And yet it doesn't despair. It recommends bread, wine, and the work of your hands. What draws you here?",
  },
};

const DEFAULT_DATA = {
  tradition: "Literature", chapters: "Full text", portal: "Literature",
  desc: "A text from the living library. Open a session to explore it in conversation.",
  related: [
    { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Taoism · 81 chapters", desc: "The foundational text of Taoist philosophy.", href: "/book/tao_te_ching" },
    { title: "Stoicism", type: "EXPEDITION", typeColor: "#0891B2", meta: "Philosophy", desc: "Virtue, duty, reason, impermanence.", href: "/wiki/stoicism" },
    { title: "Consciousness", type: "EXPEDITION", typeColor: "#0891B2", meta: "Philosophy of Mind", desc: "The hard problem. What is it like to be something?", href: "/wiki/consciousness" },
  ],
  greeting: "Welcome to this living book session.\n\nThe full text is indexed and present — when you ask about it, I retrieve from the actual text, not from memory. Every claim comes with a citation you can check.\n\nYou can ask about a specific passage, search for a theme that runs through the work, compare chapters, or simply tell me what brought you here and we'll find the right place to start.\n\nWhat would you like to explore?",
};

const FORMAT_COLORS: Record<string, { bg: string; border: string }> = {
  "LIVING BOOK": { bg: "#EFF6FF", border: "#BFDBFE" },
  "EXPEDITION": { bg: "#ECFEFF", border: "#A5F3FC" },
  "HOROSCOPE": { bg: "#F5F3FF", border: "#DDD6FE" },
  "ESSAY": { bg: "#FFFBEB", border: "#FDE68A" },
};

export default function BookPage() {
  const params = useParams();
  const bookId = params.book_id as string;
  const data = BOOK_DATA[bookId] || { ...DEFAULT_DATA, title: toTitle(bookId), author: "" };
  const title = data.title || toTitle(bookId);
  const author = ("author" in data) ? (data as { author: string }).author : "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leftOpen, setLeftOpen] = useState<Record<string, boolean>>({ sessions: true, bookmarks: true, news: false, subjects: false, formats: false });
  const [expandedMsgs, setExpandedMsgs] = useState<Record<number, boolean>>({});
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages]);

  // Auto-greeting on mount
  useEffect(() => {
    const g = ("greeting" in data) ? (data as { greeting: string }).greeting : DEFAULT_DATA.greeting;
    setIsLoading(true);
    setTimeout(() => {
      setMessages([{ role: "assistant", content: g }]);
      setIsLoading(false);
    }, 800);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = () => {
    if (!input.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `That's worth sitting with.\n\nThe text addresses this most directly in two places:\n\n[Chapter 8] — "A person of great virtue is like the flowing water. Water benefits all things and contends not with them."\n\n[Chapter 78] — "There is nothing in this world that is softer and meeker than water. Yet for dissolving the hard and inflexible, nothing can surpass it."\n\nThe pattern across both: what is soft overcomes what is hard. Not by force — by persistence and by occupying the position no one else wants.\n\nWould you like to follow the water imagery further, or does this connect to something else you're thinking about?`
      }]);
      setIsLoading(false);
    }, 1200);
  };

  const renderContent = (text: string, clickable = false) => {
    // Split into paragraphs (double newline)
    const paragraphs = text.split(/\n\n+/);
    return paragraphs.map((para, pi) => {
      // Check for starter prompts
      const lines = para.split("\n");
      const hasStarters = clickable && lines.some(l => l.match(/^• "/));
      if (hasStarters) {
        return (
          <div key={pi} style={{ display: "flex", flexDirection: "column", gap: 4, margin: "4px 0" }}>
            {lines.map((line, li) => {
              const m = line.match(/^• "(.+?)" — (.+)$/);
              if (m) {
                return (
                  <div key={li} onClick={() => { setInput(m[1]); }} style={{ display: "flex", gap: 8, padding: "8px 12px", borderRadius: 6, border: `0.5px solid ${border_}`, cursor: "pointer", background: cream, alignItems: "baseline", transition: "border-color .15s" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = blue)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = border_)}
                  >
                    <span style={{ color: blue, fontFamily: mono, fontSize: 13, fontWeight: 500, flexShrink: 0 }}>&quot;{m[1]}&quot;</span>
                    <span style={{ color: ink3, fontSize: 14 }}> — {m[2]}</span>
                  </div>
                );
              }
              return <span key={li}>{line}</span>;
            })}
          </div>
        );
      }

      // Check if paragraph is a blockquote (starts with " or ")
      if (para.match(/^[""\u201C]/)) {
        return (
          <p key={pi} style={{ margin: "0", paddingLeft: 20, borderLeft: `2px solid ${blue}`, color: ink2, fontStyle: "italic" }}>
            {renderInline(para)}
          </p>
        );
      }

      return <p key={pi} style={{ margin: "0" }}>{renderInline(para)}</p>;
    });
  };

  const renderInline = (text: string) => {
    // Handle **bold**, citations [Chapter N], and regular text
    const parts = text.split(/(\*\*[^*]+\*\*|\[Chapter \d+\]|\[Book [IVXLC]+(?:, §\d+)?\]|\[Verse \d+\]|\[Saying \d+\]|\[§\d+\])/g);
    return parts.map((part, i) => {
      if (/^\[.+\]$/.test(part)) {
        return <span key={i} style={{ color: blue, fontFamily: mono, fontSize: 13, fontWeight: 600, letterSpacing: ".01em" }}>{part}</span>;
      }
      if (/^\*\*(.+)\*\*$/.test(part)) {
        return <strong key={i} style={{ fontWeight: 600, color: ink }}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const related = data.related || DEFAULT_DATA.related;

  return (
    <div style={{ fontFamily: serif, minHeight: "100vh", display: "flex", flexDirection: "column", background: cream }}>
      {/* Top bar */}
      <div className="session-topbar" style={{ borderBottom: `0.5px solid ${border_}`, padding: "0 24px", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, height: 48 }}>
          <Link href="/" className="bib-logo" style={{ display: "flex", alignItems: "baseline", gap: 2, flexShrink: 0, textDecoration: "none" }}>
            <span style={{ fontSize: 20, fontFamily: serif, fontStyle: "italic", fontWeight: 400, color: ink, letterSpacing: "-.02em" }}>Biblioth<span className="bib-accent" style={{ color: blue }}>è</span>que</span>
          </Link>
          <div className="book-search">
            <Link href="/search" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6, background: cream, border: `0.5px solid ${border_}`, borderRadius: 4, padding: "6px 10px", color: ink3 }}>
              <Search size={13} strokeWidth={1.5} />
              <span style={{ fontSize: 11, fontFamily: mono }}>Search library…</span>
            </Link>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/" style={{ textDecoration: "none", fontFamily: mono, fontSize: 11, color: ink3, display: "flex", alignItems: "center", gap: 4 }}>
              <ArrowLeft size={12} strokeWidth={1.5} /> Home
            </Link>
            <Link href="/subscribe" style={{ width: 32, height: 32, borderRadius: "50%", background: cream, border: `0.5px solid ${border_}`, display: "flex", alignItems: "center", justifyContent: "center", color: ink3, textDecoration: "none", cursor: "pointer", flexShrink: 0 }}>
              <User size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Left sidebar */}
        <div className="book-sidebar-left" style={{ background: cream, borderRightColor: border_ }}>
          {/* Sessions */}
          <div onClick={() => setLeftOpen(p => ({ ...p, sessions: !p.sessions }))} style={{ padding: "0 14px 6px", fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><History size={11} strokeWidth={1.5} /> Sessions</span>
            <ChevronDown size={12} strokeWidth={1.5} style={{ transition: "transform .15s", transform: leftOpen.sessions ? "rotate(0)" : "rotate(-90deg)" }} />
          </div>
          {leftOpen.sessions && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ padding: "5px 14px", fontSize: 11, fontFamily: mono, color: blue, borderLeft: `2px solid ${blue}`, background: "#EFF6FF", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
                {title}
              </div>
              {[
                { label: "Tao Te Ching · Ch. 42", href: "/book/tao_te_ching" },
                { label: "Stoicism · Dichotomy", href: "/wiki/stoicism" },
                { label: "Ecclesiastes", href: "/book/ecclesiastes" },
              ].filter(s => s.label.split(" · ")[0] !== title).map(s => (
                <Link key={s.label} href={s.href} style={{ display: "block", padding: "5px 14px", fontSize: 11, fontFamily: mono, color: ink3, textDecoration: "none", borderLeft: "2px solid transparent" }}>
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          {/* Bookmarks */}
          <div onClick={() => setLeftOpen(p => ({ ...p, bookmarks: !p.bookmarks }))} style={{ padding: "6px 14px", fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none", borderTop: `0.5px solid ${border2}` }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Bookmark size={11} strokeWidth={1.5} /> Bookmarks</span>
            <ChevronDown size={12} strokeWidth={1.5} style={{ transition: "transform .15s", transform: leftOpen.bookmarks ? "rotate(0)" : "rotate(-90deg)" }} />
          </div>
          {leftOpen.bookmarks && (
            <div style={{ marginBottom: 8 }}>
              {[
                { label: "Tao Te Ching", href: "/book/tao_te_ching", dot: "#3B82F6" },
                { label: "Meditations", href: "/book/meditations_aurelius", dot: "#3B82F6" },
                { label: "Stoicism", href: "/wiki/stoicism", dot: "#0891B2" },
                { label: "I Ching", href: "/book/i_ching", dot: "#7C3AED" },
              ].map(b => (
                <Link key={b.label} href={b.href} style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 14px", fontSize: 12, color: ink2, textDecoration: "none", fontFamily: serif }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: b.dot, flexShrink: 0 }} />
                  {b.label}
                </Link>
              ))}
              <div style={{ padding: "6px 14px", fontSize: 10, color: ink3, fontFamily: mono, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><BookMarked size={10} strokeWidth={1.5} /> Add bookmark</div>
            </div>
          )}

          {/* Axis 1: News */}
          <div onClick={() => setLeftOpen(p => ({ ...p, news: !p.news }))} style={{ padding: "6px 14px", fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none", borderTop: `0.5px solid ${border2}` }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Newspaper size={11} strokeWidth={1.5} /> News</span>
            <ChevronDown size={12} strokeWidth={1.5} style={{ transition: "transform .15s", transform: leftOpen.news ? "rotate(0)" : "rotate(-90deg)" }} />
          </div>
          {leftOpen.news && ["World", "Politics", "Markets", "Tech", "Health", "Science", "Opinion", "Arts", "Sports"].map(s => (
            <div key={s} style={{ padding: "4px 14px", fontSize: 12, color: ink2, cursor: "pointer", borderLeft: "2px solid transparent" }}>{s}</div>
          ))}

          {/* Axis 2: Subjects (wiki/expedition territory) */}
          <div onClick={() => setLeftOpen(p => ({ ...p, subjects: !p.subjects }))} style={{ padding: "6px 14px", fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none", borderTop: `0.5px solid ${border2}` }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Compass size={11} strokeWidth={1.5} /> Subjects</span>
            <ChevronDown size={12} strokeWidth={1.5} style={{ transition: "transform .15s", transform: leftOpen.subjects ? "rotate(0)" : "rotate(-90deg)" }} />
          </div>
          {leftOpen.subjects && ["Philosophy", "Religion", "Science", "History", "Mathematics", "Esoterica", "Literature", "Society", "Technology", "Health", "Psychology"].map(s => (
            <Link key={s} href={`/portal/${s.toLowerCase()}`} style={{ display: "block", padding: "4px 14px", fontSize: 12, color: ink2, cursor: "pointer", textDecoration: "none", borderLeft: "2px solid transparent" }}>{s}</Link>
          ))}

          {/* Axis 3: Format / content types */}
          <div onClick={() => setLeftOpen(p => ({ ...p, formats: !p.formats }))} style={{ padding: "6px 14px", fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none", borderTop: `0.5px solid ${border2}` }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Hash size={11} strokeWidth={1.5} /> Format</span>
            <ChevronDown size={12} strokeWidth={1.5} style={{ transition: "transform .15s", transform: leftOpen.formats ? "rotate(0)" : "rotate(-90deg)" }} />
          </div>
          {leftOpen.formats && [
            { label: "Books", dot: "#1D4ED8" },
            { label: "Essays", dot: "#B45309" },
            { label: "Expeditions", dot: "#0891B2" },
            { label: "Horoscopes", dot: "#7C3AED" },
            { label: "Games", dot: "#059669" },
          ].map(f => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 14px", fontSize: 12, color: ink2, cursor: "pointer" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: f.dot, flexShrink: 0 }} />
              {f.label}
            </div>
          ))}
        </div>

        {/* Center — article header + chat */}
        <div className="session-center" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, borderLeft: `0.5px solid ${border_}`, borderRight: `0.5px solid ${border_}`, background: "#fff" }}>
          {/* Article header — compact, sticky */}
          <div className="session-header" style={{ padding: "14px 32px", borderBottom: `0.5px solid ${border2}`, position: "sticky", top: 0, zIndex: 10, background: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <h1 style={{ fontSize: 22, fontWeight: 400, margin: 0, fontStyle: "italic", letterSpacing: "-.02em", color: ink, fontFamily: serif }}>{title}</h1>
                <span className="session-header-meta" style={{ fontSize: 10, color: ink3, fontFamily: mono }}>{author}</span>
              </div>
              <div className="session-header-meta" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 9, color: blue, fontFamily: mono, letterSpacing: ".08em", textTransform: "uppercase", padding: "2px 8px", background: "#EFF6FF", borderRadius: 3 }}>Living Book</span>
                <span style={{ fontSize: 9, color: ink3, fontFamily: mono }}>{data.tradition} · {data.chapters}</span>
                <div style={{ width: "0.5px", height: 14, background: border_, margin: "0 2px" }} />
                <button onClick={() => navigator.clipboard?.writeText(window.location.href)} title="Copy link" style={{ all: "unset", cursor: "pointer", color: ink3, display: "flex", padding: 2 }} className="bib-slash"><Link2 size={13} strokeWidth={1.5} /></button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title + " — Bibliothèque")}`, "_blank")} title="Share on X" style={{ all: "unset", cursor: "pointer", color: ink3, display: "flex", padding: 2 }} className="bib-slash"><Twitter size={13} strokeWidth={1.5} /></button>
                <button onClick={() => window.open(`mailto:?subject=${encodeURIComponent(title + " — Bibliothèque")}&body=${encodeURIComponent(window.location.href)}`, "_blank")} title="Share via email" style={{ all: "unset", cursor: "pointer", color: ink3, display: "flex", padding: 2 }} className="bib-slash"><Mail size={13} strokeWidth={1.5} /></button>
              </div>
            </div>
          </div>

          {/* Chat area */}
          <style>{`@keyframes bibspin { to { transform: rotate(360deg); } }`}</style>
          <div ref={chatRef} className="session-chat" style={{ flex: 1, overflowY: "auto", padding: "28px 16px", display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}>
            {messages.map((m, i) => {
              const isExpanded = expandedMsgs[i];
              const isLongUser = m.role === "user" && m.content.length > 200;

              return m.role === "assistant" ? (
                <div key={i} className="bib-msg-in" style={{ maxWidth: 680, width: "100%", paddingLeft: 12 }}>
                  <div style={{ fontSize: 17, lineHeight: 1.85, color: ink, fontFamily: serif, display: "flex", flexDirection: "column", gap: 16, letterSpacing: "-.005em" }}>
                    {renderContent(m.content, i === 0)}
                  </div>
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="bib-badge" style={{ width: 26, height: 26, borderRadius: "50%", background: blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontFamily: serif, fontStyle: "italic", cursor: "default" }}>è</div>
                    <button onClick={() => navigator.clipboard?.writeText(m.content)} title="Copy response" style={{ all: "unset", cursor: "pointer", color: border_, display: "flex", padding: 2 }} className="bib-slash"><Link2 size={12} strokeWidth={1.5} /></button>
                  </div>
                </div>
              ) : (
                <div key={i} className="bib-msg-in" style={{ display: "flex", justifyContent: "flex-end", maxWidth: 680, width: "100%", paddingRight: 12 }}>
                  <div className="bib-user-msg" style={{
                    maxWidth: 520, padding: "12px 18px",
                    borderRadius: "18px 4px 18px 18px",
                    background: blue, color: "#fff",
                    fontSize: 15, lineHeight: 1.7, fontFamily: serif,
                    position: "relative",
                  }}>
                    {isLongUser && !isExpanded ? (
                      <>
                        <span>{m.content.slice(0, 200)}…</span>
                        <button
                          onClick={() => setExpandedMsgs(p => ({ ...p, [i]: true }))}
                          style={{ all: "unset", cursor: "pointer", display: "block", marginTop: 6, fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,.6)", letterSpacing: ".03em" }}
                        >
                          Show more ↓
                        </button>
                      </>
                    ) : (
                      <>
                        {m.content}
                        {isLongUser && (
                          <button
                            onClick={() => setExpandedMsgs(p => ({ ...p, [i]: false }))}
                            style={{ all: "unset", cursor: "pointer", display: "block", marginTop: 6, fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,.6)", letterSpacing: ".03em" }}
                          >
                            Show less ↑
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && messages.length > 0 && (
              <div style={{ maxWidth: 680, width: "100%" }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 0" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: ink3, opacity: 0.4, animation: "bibspin 1s ease-in-out infinite" }} />
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: ink3, opacity: 0.3, animation: "bibspin 1s ease-in-out 0.2s infinite" }} />
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: ink3, opacity: 0.2, animation: "bibspin 1s ease-in-out 0.4s infinite" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="session-input" style={{ padding: "12px 24px 8px", background: "#fff" }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <div className="bib-input-pill" style={{ display: "flex", gap: 10, alignItems: input.includes("\n") || input.length > 80 ? "flex-end" : "center", border: `0.5px solid ${border_}`, borderRadius: 24, padding: "10px 12px 10px 20px", background: cream, minHeight: 44 }}>
                <textarea
                  ref={textareaRef}
                  placeholder={`Ask about ${title}…`}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    const ta = textareaRef.current;
                    if (ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 160) + "px"; }
                  }}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  rows={1}
                  style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 14, fontFamily: serif, color: ink, resize: "none", overflow: "hidden", lineHeight: 1.5, padding: 0, maxHeight: 160, display: "block" }}
                  disabled={isLoading}
                />
                <div
                  className="bib-send-btn"
                  data-loading={isLoading ? "true" : "false"}
                  onClick={isLoading ? undefined : sendMessage}
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: isLoading ? "transparent" : (input.trim() ? blue : border_),
                    border: isLoading ? `2.5px solid ${border_}` : "none",
                    borderTopColor: isLoading ? blue : undefined,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 14, cursor: isLoading ? "default" : "pointer", flexShrink: 0,
                    animation: isLoading ? "bibspin 0.8s linear infinite" : "none",
                  }}
                >
                  {isLoading ? null : <Send size={14} strokeWidth={2} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="book-sidebar-right" style={{ background: cream, borderLeftColor: border_ }}>
          <div style={{ fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 12 }}>Related</div>
          {related.map(c => {
            const fc = FORMAT_COLORS[c.type] || { bg: "#F9FAFB", border: "#E5E7EB" };
            return (
              <Link key={c.title} href={c.href} style={{ display: "block", background: "#fff", border: `0.5px solid ${border_}`, borderRadius: 6, padding: 12, marginBottom: 8, cursor: "pointer", textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontStyle: "italic", fontFamily: serif, color: ink }}>{c.title}</span>
                  <span style={{ fontSize: 8, fontFamily: mono, color: c.typeColor, background: fc.bg, border: `0.5px solid ${fc.border}`, borderRadius: 2, padding: "2px 6px", whiteSpace: "nowrap", letterSpacing: ".04em" }}>{c.type}</span>
                </div>
                <div style={{ fontSize: 10, color: ink3, fontFamily: mono, marginBottom: 4 }}>{c.meta}</div>
                <div style={{ fontSize: 12, color: ink2, lineHeight: 1.5, fontFamily: serif }}>{c.desc}</div>
              </Link>
            );
          })}

          <div style={{ fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", marginTop: 18, marginBottom: 8 }}>Further Reading</div>
          <a href="https://www.gutenberg.org" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />Project Gutenberg
          </a>
          <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Amazon Kindle
          </a>
          <a href="https://archive.org" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />Internet Archive
          </a>
          <a href="https://plato.stanford.edu" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#1D4ED8", flexShrink: 0 }} />Stanford Encyclopedia
          </a>

          <div style={{ fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", marginTop: 16, marginBottom: 8 }}>Tools</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: mono, cursor: "pointer" }} className="bib-slash">
            <Search size={11} strokeWidth={1.5} style={{ color: ink3 }} /> Web search
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: mono, cursor: "pointer" }} className="bib-slash">
            <BookMarked size={11} strokeWidth={1.5} style={{ color: ink3 }} /> Save to bookmarks
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: mono, cursor: "pointer" }} className="bib-slash">
            <Link2 size={11} strokeWidth={1.5} style={{ color: ink3 }} /> Copy session link
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="session-footer" style={{ borderTop: `0.5px solid ${border_}`, padding: "6px 24px", background: cream, display: "flex", alignItems: "center", position: "relative" }}>
        <div className="session-footer-slash" style={{ display: "flex", gap: 10 }}>
          {["/chapter", "/search", "/compare", "/wiki", "/book"].map(c => (
            <span key={c} className="bib-slash" style={{ fontSize: 10, color: ink3, fontFamily: mono, cursor: "pointer" }}>{c}</span>
          ))}
        </div>
        <span className="session-footer-disclaimer" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontFamily: mono, fontSize: 9, color: ink3, opacity: 0.5, whiteSpace: "nowrap" }}>Bibliothèque is AI-powered. Responses are generated, not authored.</span>
        <span className="hide-mobile" style={{ fontFamily: mono, fontSize: 10, color: ink3, marginLeft: "auto" }}>© 2026 TMOS13, LLC.</span>
      </div>
    </div>
  );
}
