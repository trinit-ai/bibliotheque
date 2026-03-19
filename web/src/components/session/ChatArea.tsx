"use client";

import { useEffect, useRef } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatAreaProps {
  messages: Message[];
}

function renderAssistantContent(content: string) {
  const parts = content.split(/(\[Chapter \d+\])/g);
  return parts.map((part, i) => {
    if (/^\[Chapter \d+\]$/.test(part)) {
      return (
        <span
          key={i}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "#3B82F6",
            fontWeight: 600,
          }}
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatArea({ messages }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {messages.map((msg, i) =>
        msg.role === "user" ? (
          <div
            key={i}
            style={{
              alignSelf: "flex-end",
              maxWidth: "75%",
              background: "#1e293b",
              color: "#e2e8f0",
              fontFamily: "'Source Serif 4', 'Georgia', serif",
              fontSize: 13,
              lineHeight: 1.6,
              padding: "10px 14px",
              borderRadius: 8,
            }}
          >
            {msg.content}
          </div>
        ) : (
          <div
            key={i}
            style={{
              alignSelf: "flex-start",
              maxWidth: "80%",
              background: "transparent",
              color: "#cbd5e1",
              fontFamily: "'Source Serif 4', 'Georgia', serif",
              fontSize: 14,
              lineHeight: 1.7,
              padding: "4px 0",
            }}
          >
            {renderAssistantContent(msg.content)}
          </div>
        )
      )}
      <div ref={bottomRef} />
    </div>
  );
}
