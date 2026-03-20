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

const DEMO_RESPONSE =
  "That is a thoughtful question. The framework suggests approaching this through three lenses: context, intention, and outcome. Each informs the other, and together they create a more complete understanding of the situation you are describing.";

export default function PackSessionPage() {
  const params = useParams<{ pack_id: string }>();
  const router = useRouter();
  const packTitle = toTitleCase(params.pack_id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [turnCount, setTurnCount] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [passages] = useState<{ cite: string; text: string }[]>([]);

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
      className="session-page"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#020817",
        color: "#e2e8f0",
      }}
    >
      <SessionBar title={packTitle} turnCount={turnCount} onBack={handleBack} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
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
        <div className="pack-passages">
          <PassagesPanel passages={passages} />
        </div>
      </div>
    </div>
  );
}
