"use client";

import { useState } from "react";
import { NEWS_CATEGORIES, LIBRARY_CATEGORIES } from "@/lib/demo-data";

export default function CategoryRail() {
  const [active, setActive] = useState("World");

  const allCategories = [
    ...NEWS_CATEGORIES,
    "|",
    ...LIBRARY_CATEGORIES,
  ];

  return (
    <div
      style={{
        height: 38,
        borderBottom: "0.5px solid #e5e7eb",
        overflowX: "auto",
        overflowY: "hidden",
        display: "flex",
        alignItems: "stretch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
      className="hide-scrollbar"
    >
      {allCategories.map((cat, i) =>
        cat === "|" ? (
          <span
            key={`divider-${i}`}
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 10,
              color: "#d1d5db",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              flexShrink: 0,
            }}
          >
            |
          </span>
        ) : (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 10,
              color: active === cat ? "#1d4ed8" : "#6b7280",
              background: "none",
              border: "none",
              borderBottom:
                active === cat ? "2px solid #1d4ed8" : "2px solid transparent",
              padding: "0 12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {cat}
          </button>
        )
      )}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
