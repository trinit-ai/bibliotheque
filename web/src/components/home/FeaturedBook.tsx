"use client";

import { useState } from "react";

export default function FeaturedBook() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `0.5px solid ${hovered ? "#1d4ed8" : "#e5e7eb"}`,
        borderRadius: 8,
        padding: "18px 20px",
        cursor: "pointer",
        transition: "border-color 0.15s ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 9,
          color: "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
        }}
      >
        Living Book
      </div>
      <div
        style={{
          fontFamily: "var(--font-crimson-pro), Georgia, serif",
          fontSize: 18,
          fontStyle: "italic",
          fontWeight: 600,
          color: "#111827",
          lineHeight: 1.3,
          marginBottom: 4,
        }}
      >
        Tao Te Ching
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 9,
          color: "#9ca3af",
          marginBottom: 10,
        }}
      >
        Lao Tzu &middot; Taoist tradition
      </div>
      <p
        style={{
          fontFamily: "var(--font-source-serif), Georgia, serif",
          fontSize: 12,
          color: "#6b7280",
          lineHeight: 1.6,
          marginBottom: 12,
        }}
      >
        The foundational text of Taoist philosophy, rendered as a living
        conversation. Ask about wu wei, the nature of the Tao, or explore any of
        the 81 chapters in dialogue.
      </p>
      <span
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 9,
          color: "#6b7280",
          backgroundColor: "#f9fafb",
          border: "0.5px solid #e5e7eb",
          borderRadius: 3,
          padding: "2px 8px",
        }}
      >
        81 chapters indexed
      </span>
    </div>
  );
}
