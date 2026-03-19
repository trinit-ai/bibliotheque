"use client";

const STATS = [
  { label: "Living Books", value: "1" },
  { label: "In Progress", value: "1,700+" },
  { label: "Expeditions", value: "\u221E" },
  { label: "Packs", value: "968" },
  { label: "Sessions Today", value: "0" },
  { label: "Corpus Target", value: "1,700+" },
];

export default function LibraryStats() {
  return (
    <div
      style={{
        marginBottom: 24,
        paddingBottom: 20,
        borderBottom: "0.5px solid #e5e7eb",
      }}
    >
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
        Library
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px 16px",
        }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: 10,
                color: "#6b7280",
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: 10,
                color: "#1d4ed8",
                fontWeight: 600,
              }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
