"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";
const blue = "#1d4ed8";
const cream = "#FAFAF7";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";

const PORTAL_COLORS: Record<string, { tint: string; accent: string }> = {
  philosophy:  { tint: "#F5F3FF", accent: "#7C3AED" },
  religion:    { tint: "#FFF7ED", accent: "#C2410C" },
  science:     { tint: "#ECFDF5", accent: "#065F46" },
  history:     { tint: "#FFFBEB", accent: "#92400E" },
  mathematics: { tint: "#EFF6FF", accent: "#1E40AF" },
  esoterica:   { tint: "#FDF4FF", accent: "#7E22CE" },
  literature:  { tint: "#FFF1F2", accent: "#9F1239" },
  psychology:  { tint: "#ECFEFF", accent: "#155E75" },
};

const PORTAL_ENTRIES: Record<string, { id: string; title: string; author: string; desc: string; meta: string; format: string }[]> = {
  history: [
    { id: "the_prince", title: "The Prince", author: "Niccolo Machiavelli · 1532", desc: "The most influential — and most misread — work of political theory. A clinical anatomy of power.", meta: "26 chapters", format: "living_book" },
    { id: "decline_fall_roman_empire", title: "The Decline and Fall of the Roman Empire", author: "Edward Gibbon · 1776\u20131789", desc: "Six volumes on how the greatest empire in history unraveled. Gibbon\u2019s prose is itself a monument.", meta: "71 chapters", format: "living_book" },
    { id: "peloponnesian_war", title: "History of the Peloponnesian War", author: "Thucydides · c. 400 BC", desc: "Athens vs. Sparta. The first masterpiece of political realism. The Melian Dialogue alone is worth the session.", meta: "8 books", format: "living_book" },
  ],
  philosophy: [
    { id: "genealogy_of_morality", title: "On the Genealogy of Morality", author: "Friedrich Nietzsche · 1887", desc: "Where do our moral values come from? Resentment, guilt, and the will to power — the most unsettling challenge to conventional ethics.", meta: "3 essays", format: "living_book" },
    { id: "republic", title: "The Republic", author: "Plato · c. 375 BC", desc: "Justice, the ideal state, the allegory of the cave. The dialogue that launched Western philosophy\u2019s longest conversation.", meta: "10 books", format: "living_book" },
    { id: "meditations", title: "Meditations", author: "Marcus Aurelius · c. 170\u2013180 AD", desc: "The private journal of a philosopher-emperor. 12 books of Stoic self-examination.", meta: "12 books", format: "living_book" },
    { id: "tao_te_ching", title: "Tao Te Ching", author: "Laozi · 6th century BC", desc: "The foundational text of Taoist philosophy. 81 chapters on the nature of the Tao, virtue, and effortless action.", meta: "81 chapters", format: "living_book" },
  ],
};

const RELATED_EXPEDITIONS: Record<string, string[]> = {
  history: ["Rise and Fall of Civilizations", "Empires Compared"],
  philosophy: ["Stoicism", "Ethics Through the Ages"],
};

const RELATED_SUBJECTS: Record<string, { name: string; color: string }[]> = {
  history: [
    { name: "Society", color: "#059669" },
    { name: "Philosophy", color: "#7C3AED" },
    { name: "Literature", color: "#DC2626" },
    { name: "Science", color: "#1E40AF" },
  ],
  philosophy: [
    { name: "Religion", color: "#DC2626" },
    { name: "Psychology", color: "#059669" },
    { name: "Mathematics", color: "#1E40AF" },
    { name: "Literature", color: "#DC2626" },
  ],
};

function toTitle(s: string) {
  return s.replace(/_/g, " ").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export default function PortalPage() {
  const params = useParams();
  const category = (params.category as string).toLowerCase();
  const displayName = toTitle(category);
  const [hov, setHov] = useState<string | null>(null);

  const colors = PORTAL_COLORS[category] || { tint: "#F9FAFB", accent: "#374151" };
  const entries = PORTAL_ENTRIES[category] || [];
  const expeditions = RELATED_EXPEDITIONS[category] || [];
  const subjects = RELATED_SUBJECTS[category] || [];

  return (
    <div style={{ background: cream, color: ink, minHeight: "100vh", fontFamily: serif }}>
      {/* Header */}
      <div style={{ borderBottom: `0.5px solid ${border_}`, padding: "16px 16px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ fontFamily: serif, fontStyle: "italic", fontSize: 18, color: ink, textDecoration: "none" }}>
            Biblioth<span style={{ color: blue }}>e</span>que
          </a>
          <a href="/" style={{ fontFamily: mono, fontSize: 11, color: ink3, textDecoration: "none" }}>
            &larr; Home
          </a>
        </div>
      </div>

      {/* Portal title */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: colors.accent }}>
            {displayName}
          </div>
          <span style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>
            · {entries.length} entries
          </span>
        </div>
        <div style={{ width: 40, height: 2, background: colors.accent, marginTop: 8 }} />
      </div>

      {/* Main content */}
      <div className="portal-layout">
        {/* Entries column */}
        <div className="portal-main">
          {entries.map((entry, i) => (
            <a
              key={entry.id}
              href={`/book/${entry.id}`}
              onMouseEnter={() => setHov(entry.id)}
              onMouseLeave={() => setHov(null)}
              className="portal-entry-card"
              style={{
                display: "block",
                border: `0.5px solid ${hov === entry.id ? colors.accent : border_}`,
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 16,
                textDecoration: "none",
                color: ink,
                transition: "border-color .15s",
              }}
            >
              <div style={{ background: blue, padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.9)" }}>
                  {entry.format === "living_book" ? "Living Book" : "Expedition"}
                </span>
                <span style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,.5)" }}>
                  {Math.floor(Math.random() * 40 + 5)} this week
                </span>
              </div>
              <div style={{ padding: "16px 16px 18px" }}>
                <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 22, lineHeight: 1.2, marginBottom: 6, letterSpacing: "-.01em" }}>
                  {entry.title}
                </div>
                <div style={{ fontFamily: mono, fontSize: 10, color: colors.accent, letterSpacing: ".04em", marginBottom: 10 }}>
                  {entry.author}
                </div>
                <div style={{ fontFamily: serif, fontSize: 14, lineHeight: 1.65, color: ink2, marginBottom: 14 }}>
                  {entry.desc}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: `0.5px solid ${border_}` }}>
                  <span style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>{entry.meta}</span>
                  <span style={{ background: blue, color: "#fff", border: "none", borderRadius: 6, fontFamily: mono, fontSize: 10, padding: "6px 14px", letterSpacing: ".04em" }}>
                    Open session &rarr;
                  </span>
                </div>
              </div>
            </a>
          ))}

          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <a href="/" style={{ fontFamily: mono, fontSize: 11, color: blue, textDecoration: "none" }}>
              &larr; Back to Bibliotheque
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className="portal-sidebar">
          {/* Related Expeditions */}
          {expeditions.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink3, paddingBottom: 10, borderBottom: `0.5px solid ${border_}`, marginBottom: 12 }}>
                Related Expeditions
              </div>
              {expeditions.map(exp => (
                <div key={exp} style={{ fontFamily: serif, fontSize: 15, color: blue, marginBottom: 8, cursor: "pointer" }}>
                  {exp} &rarr;
                </div>
              ))}
            </div>
          )}

          {/* Related Subjects */}
          {subjects.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink3, paddingBottom: 10, borderBottom: `0.5px solid ${border_}`, marginBottom: 12 }}>
                Related Subjects
              </div>
              {subjects.map(sub => (
                <div key={sub.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: sub.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: serif, fontSize: 14, color: ink2 }}>{sub.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
