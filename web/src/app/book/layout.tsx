"use client";

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#020817", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
