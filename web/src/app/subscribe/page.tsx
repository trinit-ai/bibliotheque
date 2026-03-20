"use client";

import { useState } from "react";

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
    name: "Reader",
    price: "Free",
    turns: "50 turns / day",
    features: ["Email registration only", "Access full library", "Reading history", "Session journal"],
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
    <div style={{ background: cream, color: ink, minHeight: "100vh", fontFamily: serif }}>
      {/* Header */}
      <header style={{ borderBottom: `0.5px solid ${border2}`, padding: "28px 0", textAlign: "center" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 32, fontWeight: 400, letterSpacing: "-.025em", color: ink }}>
            Biblioth<span style={{ color: blue }}>e</span>que
          </div>
        </a>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "56px 24px 80px" }}>
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
        <div style={{ maxWidth: 440, margin: "0 auto 56px", display: "flex", gap: 10 }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              border: `0.5px solid ${border_}`,
              borderRadius: 4,
              padding: "12px 16px",
              fontFamily: mono,
              fontSize: 13,
              color: ink,
              background: "#fff",
              outline: "none",
            }}
          />
          <button
            style={{
              background: blue,
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "12px 28px",
              fontFamily: mono,
              fontSize: 13,
              letterSpacing: ".04em",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Join
          </button>
        </div>

        {/* Tier cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 48 }}>
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              style={{
                border: `0.5px solid ${tier.current ? blue : border_}`,
                borderRadius: 8,
                overflow: "hidden",
                background: tier.current ? "#fff" : cream,
              }}
            >
              {/* Card header */}
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: `0.5px solid ${tier.current ? "rgba(29,78,216,.15)" : border2}`,
                  background: tier.current ? "#EFF6FF" : "transparent",
                }}
              >
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

              {/* Card body */}
              <div style={{ padding: "16px 20px 20px" }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "5px 0" }}>
                    <span style={{ fontFamily: mono, fontSize: 11, color: tier.current ? blue : ink3, flexShrink: 0, marginTop: 1 }}>+</span>
                    <span style={{ fontFamily: serif, fontSize: 14, lineHeight: 1.5, color: ink2 }}>{f}</span>
                  </div>
                ))}
                {tier.cta && (
                  <button
                    style={{
                      width: "100%",
                      marginTop: 16,
                      padding: "10px 0",
                      background: blue,
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      fontFamily: mono,
                      fontSize: 12,
                      letterSpacing: ".04em",
                      cursor: "pointer",
                    }}
                  >
                    {tier.cta}
                  </button>
                )}
                {!tier.cta && tier.name === "Patron" && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: "10px 0",
                      textAlign: "center",
                      fontFamily: mono,
                      fontSize: 11,
                      color: ink3,
                      border: `0.5px solid ${border2}`,
                      borderRadius: 4,
                    }}
                  >
                    Coming soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.7, color: ink3, margin: 0 }}>
            No credit card required. Your reading history stays private.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `0.5px solid ${border_}`, background: "#F5F3EE" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <a href="/" style={{ fontFamily: serif, fontStyle: "italic", fontSize: 16, color: ink3, textDecoration: "none" }}>
            Biblioth<span style={{ color: blue }}>e</span>que
          </a>
          <div style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>
            &copy; 2026 TMOS13, LLC
          </div>
        </div>
      </footer>
    </div>
  );
}
