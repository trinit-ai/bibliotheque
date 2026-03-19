"use client";

import { useState } from "react";
import { EDITORIAL_ESSAYS } from "@/lib/demo-data";
import SessionChip from "@/components/shared/SessionChip";

export default function EditorialStrip() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
      }}
    >
      {EDITORIAL_ESSAYS.map((essay, i) => (
        <div
          key={essay.title}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            border: `0.5px solid ${hoveredIndex === i ? "#bfdbfe" : "#e5e7eb"}`,
            borderRadius: 6,
            padding: "14px 14px",
            cursor: "pointer",
            transition: "border-color 0.15s ease",
            display: "flex",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: essay.dotColor,
              flexShrink: 0,
              marginTop: 5,
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "var(--font-crimson-pro), Georgia, serif",
                fontSize: 15,
                fontStyle: "italic",
                fontWeight: 600,
                color: "#111827",
                lineHeight: 1.3,
                marginBottom: 4,
              }}
            >
              {essay.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: 9,
                color: "#9ca3af",
                marginBottom: 6,
              }}
            >
              {essay.author} &middot; {essay.publication}, {essay.year}
            </div>
            <p
              style={{
                fontFamily: "var(--font-source-serif), Georgia, serif",
                fontSize: 12,
                color: "#6b7280",
                lineHeight: 1.55,
                marginBottom: essay.hasSession ? 8 : 0,
              }}
            >
              {essay.description}
            </p>
            {essay.hasSession && <SessionChip />}
          </div>
        </div>
      ))}
    </div>
  );
}
