"use client";

import { useState } from "react";
import { NEWS_CATEGORIES, LIBRARY_CATEGORIES } from "@/lib/demo-data";

export default function FooterPortalBar() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const allSections = [...NEWS_CATEGORIES, ...LIBRARY_CATEGORIES];

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        borderTop: "0.5px solid #e5e7eb",
        padding: "14px 24px",
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        justifyContent: "center",
      }}
    >
      {allSections.map((section) => (
        <button
          key={section}
          onClick={() => setActiveSlug(section)}
          onMouseEnter={(e) => {
            (e.currentTarget.style.color = "#1d4ed8");
            (e.currentTarget.style.borderColor = "#bfdbfe");
          }}
          onMouseLeave={(e) => {
            if (activeSlug !== section) {
              (e.currentTarget.style.color = "#6b7280");
              (e.currentTarget.style.borderColor = "#e5e7eb");
            }
          }}
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: 9,
            color: activeSlug === section ? "#1d4ed8" : "#6b7280",
            backgroundColor: "transparent",
            border: `0.5px solid ${activeSlug === section ? "#bfdbfe" : "#e5e7eb"}`,
            borderRadius: 12,
            padding: "3px 10px",
            cursor: "pointer",
            transition: "all 0.1s ease",
          }}
        >
          {section}
        </button>
      ))}
    </div>
  );
}
