"use client";

import { ENCOUNTERS } from "@/lib/demo-data";

export default function RecentEncounters() {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 10,
          color: "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 12,
        }}
      >
        Recent encounters
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ENCOUNTERS.map((encounter, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-source-serif), Georgia, serif",
              fontSize: 11,
              color: "#6b7280",
              lineHeight: 1.6,
              margin: 0,
            }}
            dangerouslySetInnerHTML={{
              __html: encounter
                .replace(
                  /Tao Te Ching/g,
                  '<span style="font-style:italic;color:#374151">Tao Te Ching</span>'
                )
                .replace(
                  /Stoicism/g,
                  '<span style="font-style:italic;color:#374151">Stoicism</span>'
                )
                .replace(
                  /Epictetus/g,
                  '<span style="font-style:italic;color:#374151">Epictetus</span>'
                )
                .replace(
                  /Marcus Aurelius/g,
                  '<span style="font-style:italic;color:#374151">Marcus Aurelius</span>'
                )
                .replace(
                  /I Ching/g,
                  '<span style="font-style:italic;color:#374151">I Ching</span>'
                ),
            }}
          />
        ))}
      </div>
    </div>
  );
}
