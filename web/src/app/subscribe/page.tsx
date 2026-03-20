"use client";

import { useState } from "react";
import Link from "next/link";

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

// ── Tiers ─────────────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "Anonymous",
    price: "Free",
    turns: "5 turns / day",
    features: ["No sign-up required", "Access full library", "Anonymous sessions", "IP-based rate limiting"],
    cta: null,
    accent: ink3,
    current: false,
  },
  {
    name: "Early Subscriber",
    price: "Free",
    turns: "50 turns / day",
    features: ["Email registration only", "Access full library", "Reading history", "Session journal", "Bookmarks"],
    cta: "Join",
    accent: blue,
    current: true,
  },
  {
    name: "Patron",
    price: "Coming soon",
    turns: "Unlimited",
    features: ["Unlimited turns", "Priority sessions", "Early access to new texts", "Support the library"],
    cta: null,
    accent: ink3,
    current: false,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────

export default function SubscribePage() {
  const [email, setEmail] = useState("");

  return (
    <div style={{ background: cream, color: ink, minHeight: "100vh", fontFamily: serif, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ borderBottom: `0.5px solid ${border2}`, padding: "28px 0", textAlign: "center" }}>
        <Link href="/" className="bib-logo" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 32, fontWeight: 400, letterSpacing: "-.025em", color: ink }}>
            Biblioth<span className="bib-accent" style={{ color: blue }}>è</span>que
          </div>
        </Link>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "56px 24px 60px", flex: 1 }}>
        {/* Title block */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: ink3, marginBottom: 16 }}>
            Subscribe
          </div>
          <h1 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 42, fontWeight: 400, lineHeight: 1.15, letterSpacing: "-.02em", color: ink, margin: "0 0 16px" }}>
            Join the Library
          </h1>
          <p style={{ fontFamily: serif, fontSize: 18, lineHeight: 1.6, color: ink2, margin: 0 }}>
            Free readers get 50 turns per day. Anonymous visitors get 5.
          </p>
        </div>

        {/* Email form */}
        <div className="bib-input-pill" style={{ maxWidth: 440, margin: "0 auto 56px", display: "flex", gap: 10, border: `0.5px solid ${border_}`, borderRadius: 24, padding: "6px 6px 6px 18px", background: "#fff", alignItems: "center" }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1, border: "none", background: "transparent", outline: "none",
              fontFamily: mono, fontSize: 13, color: ink, padding: "6px 0",
            }}
          />
          <button
            style={{
              background: blue, color: "#fff", border: "none",
              borderRadius: 20, padding: "10px 24px",
              fontFamily: mono, fontSize: 12, letterSpacing: ".04em",
              cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            Join
          </button>
        </div>

        {/* Tier cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48 }}>
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="bib-card"
              style={{
                border: `0.5px solid ${tier.current ? blue : border_}`,
                borderRadius: 8, overflow: "hidden",
                background: tier.current ? "#fff" : cream,
              }}
            >
              <div style={{
                padding: "14px 20px",
                borderBottom: `0.5px solid ${tier.current ? "rgba(29,78,216,.15)" : border2}`,
                background: tier.current ? "#EFF6FF" : "transparent",
              }}>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: tier.accent, marginBottom: 6 }}>
                  {tier.name}
                </div>
                <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 26, fontWeight: 400, color: ink, lineHeight: 1.2 }}>
                  {tier.price}
                </div>
                <div style={{ fontFamily: mono, fontSize: 11, color: ink2, marginTop: 4 }}>
                  {tier.turns}
                </div>
              </div>
              <div style={{ padding: "16px 20px 20px" }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "5px 0" }}>
                    <span style={{ fontFamily: mono, fontSize: 11, color: tier.current ? blue : ink3, flexShrink: 0, marginTop: 1 }}>+</span>
                    <span style={{ fontFamily: serif, fontSize: 14, lineHeight: 1.5, color: ink2 }}>{f}</span>
                  </div>
                ))}
                {tier.cta && (
                  <button className="bib-send-btn" style={{
                    width: "100%", marginTop: 16, padding: "10px 0",
                    background: blue, color: "#fff", border: "none", borderRadius: 4,
                    fontFamily: mono, fontSize: 12, letterSpacing: ".04em", cursor: "pointer",
                  }}>
                    {tier.cta}
                  </button>
                )}
                {!tier.cta && tier.name === "Patron" && (
                  <div style={{
                    marginTop: 16, padding: "10px 0", textAlign: "center",
                    fontFamily: mono, fontSize: 11, color: ink3,
                    border: `0.5px solid ${border2}`, borderRadius: 4,
                  }}>
                    Coming soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Privacy & legal */}
        <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
          <p style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.7, color: ink3, margin: "0 0 20px" }}>
            No credit card required. Your reading history stays private.
          </p>
          <p style={{ fontFamily: serif, fontSize: 12, lineHeight: 1.8, color: ink3, margin: 0 }}>
            By joining, you agree to our Terms of Use and Privacy Policy.
            Bibliothèque is a product of TMOS13, LLC. Sessions are AI-powered
            by the 13TMOS engine. Responses are generated, not authored.
            All texts in the library are public domain or used under license.
            Your data is never sold. We use cookies only for session management.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `0.5px solid ${border_}`, background: "#F5F3EE" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 24px", textAlign: "center" }}>
          <Link href="/" className="bib-logo" style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: ink3, textDecoration: "none" }}>
            Biblioth<span className="bib-accent" style={{ color: blue }}>è</span>que
          </Link>
          <div style={{ fontFamily: mono, fontSize: 10, color: ink3, marginTop: 8 }}>
            © 2026 TMOS13, LLC. All rights reserved.
          </div>
          <div style={{ fontFamily: mono, fontSize: 9, color: ink3, marginTop: 6, opacity: 0.6, lineHeight: 1.7 }}>
            TMOS13, LLC · Jersey City, NJ · Robert C. Ventura, Founder
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 10 }}>
            {["Privacy Policy", "Terms of Use", "Contact", "About"].map(s => (
              <span key={s} style={{ fontFamily: mono, fontSize: 9, color: ink3, cursor: "pointer" }} className="bib-slash">{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
