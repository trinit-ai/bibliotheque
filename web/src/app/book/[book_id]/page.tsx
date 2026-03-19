"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import SessionBar from "@/components/session/SessionBar";
import ChatArea, { type Message } from "@/components/session/ChatArea";
import InputBar from "@/components/session/InputBar";
import PassagesPanel from "@/components/session/PassagesPanel";

function toTitleCase(slug: string): string {
  return slug
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const CHAPTERS = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);

const DEMO_RESPONSE =
  "The text speaks to this in [Chapter 8]: 'A person of great virtue is like the flowing water, which benefits all things without contention.' This passage illuminates the question you raise.";

export default function BookSessionPage() {
  const params = useParams<{ book_id: string }>();
  const router = useRouter();
  const bookTitle = toTitleCase(params.book_id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [turnCount, setTurnCount] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [passages, setPassages] = useState<{ cite: string; text: string }[]>([]);

  useEffect(() => {
    setSessionStarted(true);
  }, []);

  const handleSend = useCallback(
    (text: string) => {
      setMessages((prev) => [...prev, { role: "user", content: text }]);
      setTurnCount((c) => c + 1);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: DEMO_RESPONSE },
        ]);
        setPassages((prev) => [
          ...prev,
          {
            cite: "[Chapter 8]",
            text: "A person of great virtue is like the flowing water, which benefits all things without contention.",
          },
        ]);
      }, 500);
    },
    []
  );

  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  if (!sessionStarted) return null;

  return (
    <div
      data-mode="session"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#020817",
        color: "#e2e8f0",
      }}
    >
      <SessionBar title={bookTitle} turnCount={turnCount} onBack={handleBack} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left TOC */}
        <div
          style={{
            width: 200,
            flexShrink: 0,
            borderRight: "0.5px solid rgba(59,130,246,0.1)",
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
              marginBottom: 12,
            }}
          >
            Contents
          </div>
          {CHAPTERS.map((ch) => (
            <div
              key={ch}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "#64748b",
                padding: "6px 8px",
                borderRadius: 4,
                cursor: "pointer",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e8f0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              {ch}
            </div>
          ))}
        </div>

        {/* Center chat */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <ChatArea messages={messages} />
          <InputBar onSend={handleSend} />
        </div>

        {/* Right passages */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <PassagesPanel passages={passages} />
        </div>
      </div>
    </div>
  );
}
