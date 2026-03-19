"use client";

import { useState } from "react";

export default function SessionChip({ label = "\u2197 session" }: { label?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-dm-mono), monospace",
        fontSize: 9,
        color: "#1d4ed8",
        backgroundColor: hovered ? "#dbeafe" : "#eff6ff",
        border: "0.5px solid #bfdbfe",
        borderRadius: 3,
        padding: "2px 6px",
        cursor: "pointer",
        display: "inline-block",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
