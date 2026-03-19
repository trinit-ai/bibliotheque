"use client";

const PICKS = [
  {
    title: "Tao Te Ching",
    meta: "Lao Tzu \u00b7 Living Book",
    dotColor: "#3b82f6",
  },
  {
    title: "The Stoicism Expedition",
    meta: "Philosophy \u00b7 Expedition",
    dotColor: "#8b5cf6",
  },
  {
    title: "I Ching Oracle",
    meta: "Divination \u00b7 Oracle",
    dotColor: "#14b8a6",
  },
  {
    title: "Politics and the English Language",
    meta: "Orwell \u00b7 Essay",
    dotColor: "#f59e0b",
  },
];

export default function TodaysPicks() {
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
        Today&apos;s picks
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PICKS.map((pick) => (
          <div
            key={pick.title}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: pick.dotColor,
                flexShrink: 0,
                marginTop: 5,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-crimson-pro), Georgia, serif",
                  fontSize: 13,
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "#111827",
                  lineHeight: 1.3,
                }}
              >
                {pick.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: 9,
                  color: "#9ca3af",
                }}
              >
                {pick.meta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
