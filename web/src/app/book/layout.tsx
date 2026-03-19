"use client";

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#111827" }}>
      {children}
    </div>
  );
}
