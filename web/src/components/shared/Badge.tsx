"use client";

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  WORLD: { bg: "#fef3c7", text: "#92400e" },
  POLITICS: { bg: "#ffedd5", text: "#9a3412" },
  MARKETS: { bg: "#dcfce7", text: "#166534" },
  TECH: { bg: "#dbeafe", text: "#1e40af" },
  HEALTH: { bg: "#ffe4e6", text: "#9f1239" },
  OPINION: { bg: "#f3e8ff", text: "#6b21a8" },
  ARTS: { bg: "#fae8ff", text: "#86198f" },
  SPORTS: { bg: "#d1fae5", text: "#065f46" },
  SCIENCE: { bg: "#dbeafe", text: "#1e40af" },
};

export default function Badge({ category }: { category: string }) {
  const colors = COLOR_MAP[category.toUpperCase()] || { bg: "#f3f4f6", text: "#374151" };

  return (
    <span
      style={{
        fontFamily: "var(--font-dm-mono), monospace",
        fontSize: 8,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: 2,
        padding: "1px 5px",
        display: "inline-block",
        lineHeight: 1.5,
      }}
    >
      {category}
    </span>
  );
}
