"use client";

export default function OnThisDay() {
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
          marginBottom: 8,
        }}
      >
        On this day
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 10,
          color: "#6b7280",
          marginBottom: 8,
        }}
      >
        March 19
      </div>
      <p
        style={{
          fontFamily: "var(--font-source-serif), Georgia, serif",
          fontSize: 12,
          color: "#6b7280",
          fontStyle: "italic",
          lineHeight: 1.6,
          marginBottom: 8,
        }}
      >
        In 1610, Johannes Kepler published{" "}
        <span style={{ color: "#374151" }}>Astronomia Nova</span>, introducing
        his first two laws of planetary motion and forever changing our
        understanding of celestial mechanics.
      </p>
      <span
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 9,
          color: "#1d4ed8",
          cursor: "pointer",
        }}
      >
        Explore the expedition &rarr;
      </span>
    </div>
  );
}
