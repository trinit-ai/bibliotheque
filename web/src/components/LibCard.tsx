"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * LibCard — the standard library card component.
 *
 * ARCHITECTURE:
 * Every pack in Bibliothèque gets two URLs:
 *   /wiki/[id]  — the transition/intro page (territories, description, "Begin exploration")
 *   /book/[id]  — the session page (chat, sidebars, input bar)
 *
 * The card has two clickable zones:
 *   1. Card body (title, description, metadata) → /wiki/[id] (transition page)
 *   2. "Open session →" button → /book/[id] (session, bypasses transition)
 *
 * This pattern is universal. Every content type — living_book, essay,
 * expedition, horoscope, game — follows the same structure.
 */

const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";

const FORMAT_COLORS: Record<string, { label: string; tab: string; tint: string }> = {
  living_book: { label: "Living Book", tab: "#1D4ED8", tint: "#EFF6FF" },
  expedition:  { label: "Expedition",  tab: "#0891B2", tint: "#ECFEFF" },
  horoscope:   { label: "Horoscope",   tab: "#7C3AED", tint: "#F5F3FF" },
  essay:       { label: "Essay",       tab: "#B45309", tint: "#FFFBEB" },
  interaction: { label: "Interaction", tab: "#059669", tint: "#ECFDF5" },
  pack:        { label: "Pack",        tab: "#6B7280", tint: "#F9FAFB" },
  game:        { label: "Game",        tab: "#059669", tint: "#ECFDF5" },
};

const PORTAL_COLORS: Record<string, { tint: string; accent: string }> = {
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
  health:      { tint: "#FFF1F2", accent: "#881337" },
  brand:       { tint: "#EFF6FF", accent: "#1D4ED8" },
};

export interface CardEntry {
  id: string;
  title: string;
  author?: string;
  desc?: string;
  format: string;
  portal: string;
  meta?: string;
  sessions?: string;
}

export default function LibCard({ entry }: { entry: CardEntry }) {
  const [hov, setHov] = useState(false);
  const f = FORMAT_COLORS[entry.format] || FORMAT_COLORS.pack;
  const p = PORTAL_COLORS[entry.portal] || { tint: "#F9FAFB", accent: "#374151" };

  // Every pack gets two URLs
  const wikiUrl = `/wiki/${entry.id}`;
  const sessionUrl = `/book/${entry.id}`;

  return (
    <Link
      href={wikiUrl}
      className="bib-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#fff" : p.tint,
        border: `0.5px solid ${hov ? p.accent : "rgba(0,0,0,.08)"}`,
        borderRadius: 10, overflow: "hidden", cursor: "pointer",
        display: "flex", flexDirection: "column",
        textDecoration: "none", color: "inherit",
      }}
    >
      {/* Format tab */}
      <div style={{ background: f.tab, padding: "6px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.9)", fontWeight: 500 }}>{f.label}</span>
      </div>

      {/* Card body */}
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 22, lineHeight: 1.15, color: ink, letterSpacing: "-.01em" }}>{entry.title}</div>
        {entry.author && <div style={{ fontFamily: mono, fontSize: 10, color: p.accent, letterSpacing: ".04em" }}>{entry.author}</div>}
        {entry.desc && <div style={{ fontFamily: serif, fontSize: 13, lineHeight: 1.65, color: ink2, marginTop: 4, flex: 1 }}>{entry.desc}</div>}

        {/* Footer: meta + session button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, marginTop: 4, borderTop: "0.5px solid rgba(0,0,0,.07)" }}>
          {entry.meta && <span style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>{entry.meta}</span>}
          <span
            onClick={e => { e.preventDefault(); e.stopPropagation(); window.location.href = sessionUrl; }}
            style={{ background: f.tab, color: "#fff", border: "none", borderRadius: 6, fontFamily: mono, fontSize: 10, padding: "5px 12px", cursor: "pointer", letterSpacing: ".04em" }}
          >
            Open session →
          </span>
        </div>
      </div>
    </Link>
  );
}
