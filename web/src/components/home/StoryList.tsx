"use client";

import { useState } from "react";
import Badge from "@/components/shared/Badge";
import SessionChip from "@/components/shared/SessionChip";

interface Story {
  num: string;
  headline: string;
  category: string;
  readTime: string;
  hasSession: boolean;
}

export default function StoryList({ stories }: { stories: Story[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      {stories.map((story, i) => (
        <div
          key={story.num}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            display: "flex",
            gap: 10,
            padding: "10px 0",
            borderBottom:
              i < stories.length - 1 ? "0.5px solid #e5e7eb" : "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 11,
              color: "#d1d5db",
              width: 18,
              flexShrink: 0,
              lineHeight: 1.5,
            }}
          >
            {story.num}
          </span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "var(--font-crimson-pro), Georgia, serif",
                fontSize: 15,
                fontStyle: "italic",
                fontWeight: 600,
                color: hoveredIndex === i ? "#1d4ed8" : "#111827",
                lineHeight: 1.35,
                marginBottom: 6,
                transition: "color 0.15s ease",
              }}
            >
              {story.headline}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Badge category={story.category} />
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: 9,
                  color: "#9ca3af",
                }}
              >
                {story.readTime}
              </span>
              {story.hasSession && <SessionChip />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
