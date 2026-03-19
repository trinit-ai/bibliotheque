"use client";

import SessionChip from "@/components/shared/SessionChip";

interface HeroStoryProps {
  category: string;
  headline: string;
  deck: string;
  readTime: string;
  sessionEnabled: boolean;
}

export default function HeroStory({
  category,
  headline,
  deck,
  readTime,
  sessionEnabled,
}: HeroStoryProps) {
  return (
    <div
      style={{
        borderBottom: "0.5px solid #e5e7eb",
        paddingBottom: 20,
        marginBottom: 4,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 9,
          color: "#1d4ed8",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
        }}
      >
        {category}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-crimson-pro), Georgia, serif",
          fontSize: 24,
          fontStyle: "italic",
          fontWeight: 600,
          color: "#111827",
          lineHeight: 1.25,
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}
      >
        {headline}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-source-serif), Georgia, serif",
          fontSize: 13,
          color: "#374151",
          lineHeight: 1.65,
          marginBottom: 12,
        }}
      >
        {deck}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: 9,
            color: "#9ca3af",
          }}
        >
          {readTime}
        </span>
        {sessionEnabled && <SessionChip />}
      </div>
    </div>
  );
}
