import { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About | Bibliothèque",
  description: "A living library where every text is a two-way street.",
};

// ── Tokens ────────────────────────────────────────────────────────────────

const cream = "#FAFAF7";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const border2 = "#F0EDE6";
const blue = "#1D4ED8";
const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";

// ── Page ──────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div style={{ background: cream, color: ink, minHeight: "100vh", fontFamily: serif }}>
      {/* Header */}
      <header style={{ borderBottom: `0.5px solid ${border2}`, padding: "28px 0", textAlign: "center" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 32, fontWeight: 400, letterSpacing: "-.025em", color: ink }}>
            Biblioth<span style={{ color: blue }}>è</span>que
          </div>
        </a>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "56px 24px 80px" }}>
        {/* Title block */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: ink3, marginBottom: 16 }}>
            About
          </div>
          <h1 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 42, fontWeight: 400, lineHeight: 1.15, letterSpacing: "-.02em", color: ink, margin: "0 0 20px" }}>
            About Bibliothèque
          </h1>
          <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 20, lineHeight: 1.6, color: ink2, margin: 0 }}>
            You read the book. And the book reads you.
          </p>
        </div>

        {/* Mission */}
        <div style={{ borderTop: `0.5px solid ${border_}`, borderBottom: `0.5px solid ${border_}`, padding: "32px 0", marginBottom: 48 }}>
          <p style={{ fontFamily: serif, fontSize: 17, lineHeight: 1.85, color: ink2, margin: 0 }}>
            Bibliothèque is a living library where every text is a two-way street.
            With 1,700+ texts planned across philosophy, religion, science, history, literature, and beyond,
            we are building the world&apos;s first conversational corpus &mdash; a place where you don&apos;t just read,
            you engage. Anonymous-first. No tracking. No algorithms. Powered by the 13TMOS engine.
          </p>
        </div>

        {/* Section: What it is */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: blue, marginBottom: 12 }}>
            I
          </div>
          <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 28, fontWeight: 400, lineHeight: 1.25, letterSpacing: "-.015em", color: ink, margin: "0 0 16px" }}>
            What it is
          </h2>
          <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.85, color: ink2, margin: "0 0 12px" }}>
            Bibliothèque is a living library, not a chatbot. Every text in the collection &mdash; from the Tao Te Ching
            to Einstein&apos;s Relativity &mdash; is rendered as a living book: a conversational entity that knows its own pages,
            its own history, its own tradition. You open a session with a text the way you&apos;d sit down with a scholar
            who has spent a lifetime with that single work.
          </p>
          <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.85, color: ink2, margin: 0 }}>
            There is no feed. No recommendation engine. No engagement optimization.
            The library exists to be explored on your terms, at your pace, in your own direction.
          </p>
        </section>

        {/* Divider */}
        <div style={{ borderBottom: `0.5px solid ${border2}`, marginBottom: 48 }} />

        {/* Section: How it works */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: blue, marginBottom: 12 }}>
            II
          </div>
          <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 28, fontWeight: 400, lineHeight: 1.25, letterSpacing: "-.015em", color: ink, margin: "0 0 16px" }}>
            How it works
          </h2>
          <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.85, color: ink2, margin: "0 0 20px" }}>
            The collection is organized into five session formats, each designed for a different mode of inquiry:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Living Books", desc: "Full texts rendered as conversational entities. Ask questions, explore chapters, follow threads across the work." },
              { label: "Expeditions", desc: "Guided journeys across multiple texts and traditions. Stoicism, the history of consciousness, the philosophy of mathematics." },
              { label: "Horoscopes", desc: "Divination systems &mdash; I Ching, Tarot, astrology &mdash; presented with scholarly depth and genuine interpretive range." },
              { label: "Editorials", desc: "Essays and opinion pieces you can interrogate. Read Orwell, then ask him what he&apos;d think about today." },
              { label: "News Sessions", desc: "Current events rendered through the library&apos;s lens. The day&apos;s headlines paired with the texts that illuminate them." },
            ].map((item) => (
              <div key={item.label} style={{ paddingLeft: 20, borderLeft: `2px solid ${border_}` }}>
                <div style={{ fontFamily: mono, fontSize: 12, color: ink, letterSpacing: ".04em", marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.75, color: ink2 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{ borderBottom: `0.5px solid ${border2}`, marginBottom: 48 }} />

        {/* Section: Who built it */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: blue, marginBottom: 12 }}>
            III
          </div>
          <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 28, fontWeight: 400, lineHeight: 1.25, letterSpacing: "-.015em", color: ink, margin: "0 0 16px" }}>
            Who built it
          </h2>
          <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.85, color: ink2, margin: "0 0 12px" }}>
            Bibliothèque is built by TMOS13, LLC, founded by Robert C. Ventura in Jersey City, New Jersey.
          </p>
          <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.85, color: ink2, margin: 0 }}>
            The 13TMOS engine &mdash; the protocol layer that governs every session, every turn, every interaction &mdash;
            was designed from the ground up to solve the problems that raw AI cannot: identity coherence, conversational
            guardrails, deployer oversight, and the discipline required to let a text speak for itself without
            hallucination or drift.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
