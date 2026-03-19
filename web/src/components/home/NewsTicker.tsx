"use client";

import { DEMO_TICKER_STORIES } from "@/lib/demo-data";

export default function NewsTicker() {
  const tickerText = DEMO_TICKER_STORIES.join("  |  ");
  const doubled = `${tickerText}  |  ${tickerText}`;

  return (
    <div
      style={{
        backgroundColor: "#111827",
        height: 32,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: 8,
            color: "#ffffff",
            backgroundColor: "#3B82F6",
            borderRadius: 2,
            padding: "2px 6px",
            letterSpacing: "0.08em",
            fontWeight: 500,
          }}
        >
          LIVE
        </span>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "tickerScroll 60s linear infinite",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 10,
              color: "#9ca3af",
            }}
          >
            {doubled}
          </span>
        </div>
      </div>
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
