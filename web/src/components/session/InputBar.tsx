"use client";

import { useState, useCallback, type KeyboardEvent } from "react";

interface InputBarProps {
  onSend: (text: string) => void;
  placeholder?: string;
}

export default function InputBar({ onSend, placeholder = "Ask the text..." }: InputBarProps) {
  const [value, setValue] = useState("");

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }, [value, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div
      style={{
        padding: "12px 20px 16px",
        background: "#020817",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#0f1e3a",
          border: "0.5px solid rgba(59,130,246,0.2)",
          borderRadius: 8,
          padding: "0 4px 0 14px",
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "'Source Serif 4', 'Georgia', serif",
            fontSize: 14,
            color: "#e2e8f0",
            padding: "10px 0",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            background: "none",
            border: "none",
            fontSize: 18,
            color: "#3B82F6",
            cursor: "pointer",
            padding: "8px 10px",
            lineHeight: 1,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#60a5fa")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#3B82F6")}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
