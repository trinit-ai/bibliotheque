"use client";

import { useState } from "react";
import { PORTALS } from "@/lib/demo-data";

export default function PortalGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="portal-grid"
      style={{
        display: "grid",
        gap: 10,
      }}
    >
      {PORTALS.map((portal, i) => (
        <div
          key={portal.slug}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            border: `0.5px solid ${hoveredIndex === i ? "#1d4ed8" : "#e5e7eb"}`,
            borderRadius: 8,
            padding: "14px 8px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: hoveredIndex === i ? "#eff6ff" : "transparent",
            transition: "all 0.15s ease",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-crimson-pro), Georgia, serif",
              fontSize: 20,
              fontStyle: "italic",
              color: "#1d4ed8",
              marginBottom: 6,
              lineHeight: 1,
            }}
          >
            {portal.icon}
          </div>
          <div
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 11,
              color: "#111827",
              marginBottom: 2,
            }}
          >
            {portal.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 9,
              color: "#9ca3af",
            }}
          >
            {portal.count}
          </div>
        </div>
      ))}
    </div>
  );
}
