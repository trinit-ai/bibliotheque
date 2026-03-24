"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, Search, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";
const cream = "#FAFAF7";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const blue = "#1D4ED8";

const FORMAT_COLORS: Record<string, { label: string; color: string; bg: string }> = {
  living_book: { label: "Living Book", color: "#1D4ED8", bg: "#EFF6FF" },
  essay:       { label: "Essay",       color: "#B45309", bg: "#FFFBEB" },
  expedition:  { label: "Expedition",  color: "#0891B2", bg: "#ECFEFF" },
  horoscope:   { label: "Horoscope",   color: "#7C3AED", bg: "#F5F3FF" },
  digest:      { label: "Digest",      color: "#DC2626", bg: "#FEF2F2" },
  game:        { label: "Game",        color: "#7C3AED", bg: "#F5F3FF" },
  editorial:   { label: "Essay",       color: "#B45309", bg: "#FFFBEB" },
};

interface SearchEntry {
  id: string;
  title: string;
  author: string;
  desc: string;
  format: string;
  portal: string;
  meta: string;
  href: string;
}

// Client-side catalogue — all packs available for search
const CATALOGUE: SearchEntry[] = [
  { id: "tao_te_ching", title: "Tao Te Ching", author: "Laozi", desc: "81 chapters on the nature of the Tao — the text that begins by undermining itself.", format: "living_book", portal: "religion", meta: "81 chapters", href: "/book/tao_te_ching" },
  { id: "machines_of_loving_grace", title: "Machines of Loving Grace", author: "Dario Amodei", desc: "The case for radical AI optimism — across biology, neuroscience, economics, governance, and meaning.", format: "essay", portal: "technology", meta: "~15,000 words", href: "/book/machines_of_loving_grace" },
  { id: "avant_garde_and_kitsch", title: "Avant-Garde and Kitsch", author: "Clement Greenberg", desc: "The essay that drew the line between genuine culture and its imitation — and argued the line is political.", format: "essay", portal: "society", meta: "~6,500 words", href: "/book/avant_garde_and_kitsch" },
  { id: "room_of_ones_own", title: "A Room of One's Own", author: "Virginia Woolf", desc: "What does a woman need in order to write? Five hundred pounds a year and a room with a lock on the door.", format: "living_book", portal: "literature", meta: "~38,000 words", href: "/book/room_of_ones_own" },
  { id: "relativity_einstein", title: "On the Electrodynamics of Moving Bodies", author: "Albert Einstein", desc: "The original special relativity paper. Thirty pages that dismantled absolute time.", format: "living_book", portal: "science", meta: "Full text", href: "/book/relativity_einstein" },
  { id: "the_prince", title: "The Prince × Jeffrey Epstein", author: "Bibliothèque", desc: "Machiavelli's manual on power, pointed at the machinery that protected Epstein.", format: "digest", portal: "history", meta: "Digest", href: "/book/the_prince" },
  { id: "genealogy_of_morality", title: "The Madman: God Is Dead", author: "Friedrich Nietzsche", desc: "Nietzsche's most famous passage — and the most misunderstood. He's diagnosing a catastrophe.", format: "digest", portal: "philosophy", meta: "Single passage", href: "/book/genealogy_of_morality" },
  { id: "ecclesiastes", title: "Ecclesiastes", author: "Qohelet", desc: "The most existential book of the Bible. All is vanity. Yet still: eat, drink, find joy in your labor.", format: "living_book", portal: "religion", meta: "12 chapters", href: "/book/ecclesiastes" },
  { id: "enlightened_duck", title: "The Enlightened Duck", author: "Bibliothèque", desc: "A pilgrim climbs a mountain. Three questions. No shortcuts. The duck has been waiting.", format: "game", portal: "esoterica", meta: "3 questions", href: "/book/enlightened_duck" },
  { id: "getting_started", title: "Getting Started", author: "Bibliothèque", desc: "What this place is, how it works, and why the book reads you back.", format: "expedition", portal: "platform", meta: "Welcome", href: "/book/getting_started" },
  // Expeditions (wiki)
  { id: "stoicism", title: "Stoicism", author: "Philosophy", desc: "Virtue, duty, reason, impermanence. The ancient art of living well.", format: "expedition", portal: "philosophy", meta: "Expedition", href: "/wiki/stoicism" },
  { id: "consciousness", title: "Consciousness", author: "Philosophy of Mind", desc: "The hardest problem in science: why is there subjective experience?", format: "expedition", portal: "philosophy", meta: "Expedition", href: "/wiki/consciousness" },
  { id: "entropy", title: "Entropy", author: "Physics", desc: "The second law of thermodynamics and the arrow of time.", format: "expedition", portal: "science", meta: "Expedition", href: "/wiki/entropy" },
  { id: "free_will", title: "Free Will", author: "Philosophy", desc: "Do we genuinely choose our actions, or is every decision inevitable?", format: "expedition", portal: "philosophy", meta: "Expedition", href: "/wiki/free_will" },
  { id: "game_theory", title: "Game Theory", author: "Mathematics", desc: "The mathematical study of strategic interaction.", format: "expedition", portal: "mathematics", meta: "Expedition", href: "/wiki/game_theory" },
];

function searchCatalogue(query: string): SearchEntry[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return CATALOGUE.filter(e =>
    e.title.toLowerCase().includes(q) ||
    e.author.toLowerCase().includes(q) ||
    e.desc.toLowerCase().includes(q) ||
    e.portal.toLowerCase().includes(q) ||
    e.format.toLowerCase().includes(q)
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setResults(searchCatalogue(query));
  }, [query]);

  return (
    <div style={{ background: cream, minHeight: "100vh", fontFamily: serif }}>
      {/* Header */}
      <div style={{ borderBottom: `0.5px solid ${border_}`, background: cream }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span style={{ fontSize: 20, fontFamily: serif, fontStyle: "italic", fontWeight: 400, color: ink, letterSpacing: "-.025em" }}>
              Biblioth<span style={{ color: blue }}>è</span>que
            </span>
          </Link>
          <button onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", color: ink3, display: "flex", alignItems: "center", gap: 4, fontFamily: mono, fontSize: 11 }}>
            <X size={16} strokeWidth={1.5} /> Close
          </button>
        </div>
      </div>

      {/* Search input */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: `2px solid ${ink}`, paddingBottom: 12 }}>
          <Search size={20} strokeWidth={1.5} style={{ color: ink3, flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search the library…"
            style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              fontFamily: serif, fontSize: 28, fontStyle: "italic", fontWeight: 400,
              color: ink, letterSpacing: "-.02em",
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: ink3, display: "flex" }}>
              <X size={18} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 60px" }}>
        {query && results.length === 0 && (
          <p style={{ fontFamily: serif, fontSize: 15, color: ink3, fontStyle: "italic", padding: "20px 0" }}>
            No results for &ldquo;{query}&rdquo;
          </p>
        )}

        {!query && (
          <div style={{ padding: "20px 0" }}>
            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: ink3, marginBottom: 16 }}>
              Browse
            </p>
            {["Philosophy", "Religion", "Science", "History", "Mathematics", "Literature", "Psychology", "Society", "Technology", "Health", "Esoterica"].map(s => (
              <Link key={s} href={`/portal/${s.toLowerCase()}`} style={{
                display: "inline-block", textDecoration: "none", fontFamily: mono, fontSize: 12,
                color: blue, padding: "6px 14px", border: `0.5px solid ${border_}`, borderRadius: 20,
                margin: "0 8px 8px 0", transition: "background 0.15s",
              }}>
                {s}
              </Link>
            ))}
          </div>
        )}

        {results.map(r => {
          const f = FORMAT_COLORS[r.format] || FORMAT_COLORS.living_book;
          return (
            <Link key={r.id} href={r.href} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{
                padding: "20px 0", borderBottom: `0.5px solid ${border_}`,
                display: "flex", gap: 16, alignItems: "flex-start",
                cursor: "pointer", transition: "background 0.1s",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: ".06em", textTransform: "uppercase", color: f.color, background: f.bg, padding: "2px 6px", borderRadius: 2 }}>
                      {f.label}
                    </span>
                    <span style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>{r.meta}</span>
                  </div>
                  <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 19, lineHeight: 1.25, color: ink, marginBottom: 4 }}>
                    {r.title}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: ink3, marginBottom: 6 }}>{r.author}</div>
                  <div style={{ fontFamily: serif, fontSize: 14, lineHeight: 1.6, color: ink2 }}>{r.desc}</div>
                </div>
                <ArrowRight size={16} strokeWidth={1.5} style={{ color: border_, flexShrink: 0, marginTop: 24 }} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
