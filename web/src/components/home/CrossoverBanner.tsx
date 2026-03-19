"use client";

import { CROSSOVER } from "@/lib/demo-data";

export default function CrossoverBanner() {
  return (
    <div
      style={{
        backgroundColor: "#020817",
        borderRadius: 8,
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 8,
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
        }}
      >
        Crossover
      </div>
      <p
        style={{
          fontFamily: "var(--font-source-serif), Georgia, serif",
          fontSize: 13,
          color: "#94a3b8",
          lineHeight: 1.6,
          marginBottom: 4,
        }}
      >
        Today&apos;s lead story connects to{" "}
        <span style={{ fontStyle: "italic", color: "#e2e8f0" }}>
          {CROSSOVER.bookTitle}
        </span>
        .
      </p>
      <p
        style={{
          fontFamily: "var(--font-source-serif), Georgia, serif",
          fontSize: 12,
          color: "#64748b",
          lineHeight: 1.55,
          marginBottom: 14,
        }}
      >
        {CROSSOVER.description}
      </p>
      <button
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 10,
          backgroundColor: "#1d4ed8",
          color: "#ffffff",
          border: "none",
          borderRadius: 4,
          padding: "6px 14px",
          cursor: "pointer",
        }}
      >
        Open in library &rarr;
      </button>
    </div>
  );
}
