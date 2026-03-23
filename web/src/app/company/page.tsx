import { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "TMOS13, LLC | Bibliothèque",
  description: "The company behind Bibliothèque and the 13TMOS engine.",
};

const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const blue = "#1D4ED8";
const cream = "#FAFAF7";

export default function CompanyPage() {
  return (
    <div style={{ background: cream, color: ink, minHeight: "100vh", fontFamily: serif }}>
      <div style={{ borderBottom: `0.5px solid ${border_}`, background: cream }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 20, fontStyle: "italic", fontWeight: 400, color: ink, letterSpacing: "-.025em" }}>
              Biblioth<span style={{ color: blue }}>è</span>que
            </span>
          </Link>
          <Link href="/" style={{ fontFamily: mono, fontSize: 11, color: ink3, textDecoration: "none" }}>Home</Link>
        </div>
      </div>

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 60px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 400, fontStyle: "italic", letterSpacing: "-.02em", marginBottom: 32 }}>TMOS13, LLC</h1>

        <section style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: ink2, marginBottom: 16 }}>
            TMOS13, LLC is the company behind Bibliothèque and the 13TMOS engine. Founded by Robert C. Ventura in Jersey City, New Jersey.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: ink2, marginBottom: 16 }}>
            The 13TMOS engine is a protocol-native AI runtime that governs every session, every turn, every interaction on the platform. It was designed from the ground up to solve the problems that raw AI cannot: identity coherence, conversational guardrails, deployer oversight, and the discipline required to let a text speak for itself without hallucination or drift.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: ink2 }}>
            Bibliothèque is a public benefit corporation product — a living library where every text is a two-way conversation, grounded in the actual work, governed by protocol.
          </p>
        </section>

        <section style={{ borderTop: `0.5px solid ${border_}`, paddingTop: 32 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink3, marginBottom: 16 }}>Details</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["Company", "TMOS13, LLC"],
              ["Founded", "2025"],
              ["Location", "Jersey City, NJ"],
              ["Founder", "Robert C. Ventura"],
              ["Contact", "hello@tmos13.ai"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 12, padding: "6px 0", borderBottom: `0.5px solid ${border_}` }}>
                <span style={{ color: ink2 }}>{label}</span>
                <span style={{ color: ink }}>{value}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
