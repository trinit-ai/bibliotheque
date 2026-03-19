"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import SessionBar from "@/components/session/SessionBar";
import ChatArea, { type Message } from "@/components/session/ChatArea";
import InputBar from "@/components/session/InputBar";

function toTitleCase(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function bookTitleCase(slug: string): string {
  return slug
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CrossoverBridgePage() {
  const params = useParams<{ story_id: string; book_id: string }>();
  const router = useRouter();

  const storyHeadline = toTitleCase(params.story_id);
  const bookTitle = bookTitleCase(params.book_id);

  const [mode, setMode] = useState<"bridge" | "session">("bridge");
  const [messages, setMessages] = useState<Message[]>([]);
  const [turnCount, setTurnCount] = useState(0);

  const enterSession = useCallback(() => {
    const contextMsg: Message = {
      role: "user",
      content: `Opening with context from: ${storyHeadline}`,
    };
    const assistantMsg: Message = {
      role: "assistant",
      content: `The connection between this story and ${bookTitle} is worth exploring. The themes raised in the article echo ideas the text addresses directly \u2014 the tension between progress and preservation, and what it means to act wisely under uncertainty.`,
    };
    setMessages([contextMsg, assistantMsg]);
    setTurnCount(1);
    setMode("session");
  }, [storyHeadline, bookTitle]);

  const handleSend = useCallback(
    (text: string) => {
      setMessages((prev) => [...prev, { role: "user", content: text }]);
      setTurnCount((c) => c + 1);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "That is a perceptive reading. The text would suggest that what appears as contradiction is often complementarity \u2014 two aspects of the same underlying principle, viewed from different positions.",
          },
        ]);
      }, 500);
    },
    []
  );

  const handleBack = useCallback(() => {
    if (mode === "session") {
      setMode("bridge");
      setMessages([]);
      setTurnCount(0);
    } else {
      router.push("/");
    }
  }, [mode, router]);

  /* ─── Bridge mode ─── */
  if (mode === "bridge") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FAFAF7",
          color: "#1A1816",
        }}
      >
        {/* Back link */}
        <div style={{ padding: "16px 24px" }}>
          <button
            onClick={handleBack}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#9A9590",
              cursor: "pointer",
              padding: 0,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1816")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9590")}
          >
            &larr; Back
          </button>
        </div>

        {/* Split view */}
        <div
          style={{
            display: "flex",
            maxWidth: 960,
            margin: "40px auto 0",
            padding: "0 24px",
            gap: 0,
            alignItems: "flex-start",
          }}
        >
          {/* Left 55%: news story */}
          <div style={{ flex: "0 0 55%", paddingRight: 40 }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#9A9590",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 12,
              }}
            >
              Story
            </div>
            <h1
              style={{
                fontFamily: "'Crimson Pro', 'Georgia', serif",
                fontSize: 28,
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.3,
                margin: "0 0 16px",
                color: "#1A1816",
              }}
            >
              {storyHeadline}
            </h1>
            <p
              style={{
                fontFamily: "'Source Serif 4', 'Georgia', serif",
                fontSize: 15,
                color: "#6B6760",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              A recent report raises questions about the assumptions underlying
              current approaches. Experts weigh in on what it means for both
              policy and practice, and why the conventional wisdom may be due
              for revision.
            </p>
          </div>

          {/* Center connector */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
              width: 20,
              paddingTop: 8,
            }}
          >
            <div
              style={{
                width: 0.5,
                height: 60,
                background: "#3B82F6",
              }}
            />
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#3B82F6",
                margin: "6px 0",
              }}
            />
            <div
              style={{
                width: 0.5,
                flex: 1,
                minHeight: 60,
                background: "#3B82F6",
              }}
            />
          </div>

          {/* Right 45%: book passages */}
          <div style={{ flex: "0 0 calc(45% - 20px)", paddingLeft: 40 }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#9A9590",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 12,
              }}
            >
              From the Library
            </div>
            <h2
              style={{
                fontFamily: "'Crimson Pro', 'Georgia', serif",
                fontSize: 22,
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.3,
                margin: "0 0 16px",
                color: "#1A1816",
              }}
            >
              {bookTitle}
            </h2>
            <blockquote
              style={{
                fontFamily: "'Source Serif 4', 'Georgia', serif",
                fontSize: 14,
                fontStyle: "italic",
                color: "#6B6760",
                lineHeight: 1.7,
                margin: "0 0 24px",
                padding: 0,
                borderLeft: "none",
              }}
            >
              &ldquo;The wise act without forcing, teach without speaking, and
              accomplish without taking credit. Because they do not claim it,
              the achievement endures.&rdquo;
            </blockquote>
            <button
              onClick={enterSession}
              style={{
                background: "#1D4ED8",
                color: "#fff",
                border: "none",
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                padding: "10px 20px",
                borderRadius: 6,
                cursor: "pointer",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Enter the library &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Session mode ─── */
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
      <SessionBar
        title={`${storyHeadline} \u00d7 ${bookTitle}`}
        turnCount={turnCount}
        onBack={handleBack}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <ChatArea messages={messages} />
        <InputBar onSend={handleSend} />
      </div>
    </div>
  );
}
