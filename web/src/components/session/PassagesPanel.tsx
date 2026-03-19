"use client";

interface Passage {
  cite: string;
  text: string;
}

interface PassagesPanelProps {
  passages: Passage[];
}

export default function PassagesPanel({ passages }: PassagesPanelProps) {
  return (
    <div
      style={{
        borderLeft: "0.5px solid rgba(59,130,246,0.15)",
        padding: "20px 16px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 16,
        }}
      >
        Passages
      </div>

      {passages.length === 0 && (
        <div
          style={{
            fontFamily: "'Source Serif 4', 'Georgia', serif",
            fontSize: 12,
            color: "#475569",
            fontStyle: "italic",
          }}
        >
          Citations will appear here as the conversation unfolds.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {passages.map((p, i) => (
          <div key={i}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#3B82F6",
                marginBottom: 4,
              }}
            >
              {p.cite}
            </div>
            <div
              style={{
                fontFamily: "'Source Serif 4', 'Georgia', serif",
                fontSize: 12,
                color: "#94a3b8",
                fontStyle: "italic",
                lineHeight: 1.6,
              }}
            >
              {p.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
