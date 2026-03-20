"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Link2, Twitter, Mail } from "lucide-react";

const cream = "#FAFAF7";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const blue = "#1D4ED8";
const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";

function toTitleCase(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function bookTitleCase(slug: string): string {
  return slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CrossoverBridgePage() {
  const params = useParams<{ story_id: string; book_id: string }>();
  const storyHeadline = toTitleCase(params.story_id);
  const bookTitle = bookTitleCase(params.book_id);
  const bookId = params.book_id;

  return (
    <div style={{ minHeight: "100vh", background: cream, color: ink, fontFamily: serif }}>
      {/* Top bar */}
      <div style={{ borderBottom: `0.5px solid ${border_}`, padding: "0 24px", background: cream }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", height: 48, gap: 16 }}>
          <Link href="/" className="bib-logo" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span style={{ fontSize: 20, fontFamily: serif, fontStyle: "italic", fontWeight: 400, color: ink, letterSpacing: "-.025em" }}>
              Biblioth<span className="bib-accent" style={{ color: blue }}>è</span>que
            </span>
          </Link>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)} title="Copy link" style={{ all: "unset", cursor: "pointer", color: ink3, display: "flex", padding: 2 }} className="bib-slash"><Link2 size={14} strokeWidth={1.5} /></button>
            <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(storyHeadline + " × " + bookTitle + " — Bibliothèque")}`, "_blank")} title="Share on X" style={{ all: "unset", cursor: "pointer", color: ink3, display: "flex", padding: 2 }} className="bib-slash"><Twitter size={14} strokeWidth={1.5} /></button>
            <button onClick={() => window.open(`mailto:?subject=${encodeURIComponent(storyHeadline + " × " + bookTitle + " — Bibliothèque")}&body=${encodeURIComponent(window.location.href)}`, "_blank")} title="Email" style={{ all: "unset", cursor: "pointer", color: ink3, display: "flex", padding: 2 }} className="bib-slash"><Mail size={14} strokeWidth={1.5} /></button>
            <div style={{ width: "0.5px", height: 14, background: border_ }} />
            <Link href="/" style={{ textDecoration: "none", fontFamily: mono, fontSize: 11, color: ink3, display: "flex", alignItems: "center", gap: 4 }}>
              <ArrowLeft size={12} strokeWidth={1.5} /> Home
            </Link>
          </div>
        </div>
      </div>

      {/* Bridge */}
      <div className="crossover-split">
        {/* Left: news story */}
        <div className="crossover-left">
          <div style={{ fontFamily: mono, fontSize: 10, color: ink3, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>
            Story
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 28, fontStyle: "italic", fontWeight: 400, lineHeight: 1.3, margin: "0 0 16px", color: ink }}>
            {storyHeadline}
          </h1>
          <p style={{ fontFamily: serif, fontSize: 15, color: ink2, lineHeight: 1.7, margin: 0 }}>
            A recent report raises questions about the assumptions underlying
            current approaches. Experts weigh in on what it means for both
            policy and practice, and why the conventional wisdom may be due
            for revision.
          </p>
        </div>

        {/* Center connector */}
        <div className="crossover-connector">
          <div style={{ width: 0.5, height: 60, background: blue }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: blue, margin: "6px 0" }} />
          <div style={{ width: 0.5, flex: 1, minHeight: 60, background: blue }} />
        </div>

        {/* Right: book passage */}
        <div className="crossover-right">
          <div style={{ fontFamily: mono, fontSize: 10, color: blue, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>
            From the Library
          </div>
          <h2 style={{ fontFamily: serif, fontSize: 22, fontStyle: "italic", fontWeight: 400, lineHeight: 1.3, margin: "0 0 16px", color: ink }}>
            {bookTitle}
          </h2>
          <blockquote style={{ fontFamily: serif, fontSize: 14, fontStyle: "italic", color: ink2, lineHeight: 1.7, margin: "0 0 24px", padding: 0, borderLeft: "none" }}>
            &ldquo;The wise act without forcing, teach without speaking, and
            accomplish without taking credit. Because they do not claim it,
            the achievement endures.&rdquo;
          </blockquote>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              href={`/book/${bookId}`}
              className="bib-card"
              style={{
                background: blue, color: "#fff", border: "none",
                fontFamily: mono, fontSize: 12, padding: "10px 22px",
                borderRadius: 4, cursor: "pointer", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 6,
              }}
            >
              Enter the library →
            </Link>
            <Link
              href={`/wiki/${bookId}`}
              style={{
                border: `0.5px solid ${border_}`, color: ink2,
                fontFamily: mono, fontSize: 12, padding: "10px 18px",
                borderRadius: 4, cursor: "pointer", textDecoration: "none",
              }}
            >
              About this text
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, borderTop: `0.5px solid ${border_}`, padding: "8px 24px", background: cream, display: "flex", justifyContent: "center" }}>
        <span style={{ fontFamily: mono, fontSize: 9, color: ink3, opacity: 0.5 }}>Bibliothèque is AI-powered. Responses are generated, not authored.</span>
      </div>
    </div>
  );
}
