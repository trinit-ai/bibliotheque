"use client";

import { DEMO_MARKETS } from "@/lib/demo-data";

export default function MarketsStrip() {
  return (
    <div
      style={{
        display: "flex",
        border: "0.5px solid #e5e7eb",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {DEMO_MARKETS.map((market, i) => (
        <div
          key={market.name}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRight:
              i < DEMO_MARKETS.length - 1
                ? "0.5px solid #e5e7eb"
                : "none",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 9,
              color: "#6b7280",
              marginBottom: 3,
            }}
          >
            {market.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 13,
              color: "#111827",
              fontWeight: 500,
              marginBottom: 2,
            }}
          >
            {market.value}
          </div>
          <div
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 10,
              color: market.up ? "#16a34a" : "#dc2626",
            }}
          >
            {market.change}
          </div>
        </div>
      ))}
    </div>
  );
}
