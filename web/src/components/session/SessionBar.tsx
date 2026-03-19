"use client";

interface SessionBarProps {
  title: string;
  turnCount: number;
  onBack: () => void;
}

export default function SessionBar({ title, turnCount, onBack }: SessionBarProps) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        background: "#0a1628",
        borderBottom: "0.5px solid rgba(59,130,246,0.12)",
      }}
    >
      {/* Left: logo */}
      <div
        style={{
          width: 24,
          height: 24,
          background: "#1D4ED8",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: "#fff",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          B
        </span>
      </div>

      {/* Center: session info */}
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: "#94a3b8",
          textAlign: "center",
          flex: 1,
          padding: "0 12px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title} &middot; session open &middot; {turnCount} turn{turnCount !== 1 ? "s" : ""}
      </div>

      {/* Right: back button */}
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: "#64748b",
          cursor: "pointer",
          padding: "4px 8px",
          flexShrink: 0,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e8f0")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
      >
        &larr; library
      </button>
    </div>
  );
}
