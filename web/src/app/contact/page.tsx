import { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact | Bibliothèque",
  description: "Get in touch with TMOS13, LLC.",
};

const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const blue = "#1D4ED8";
const cream = "#FAFAF7";

export default function ContactPage() {
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
        <h1 style={{ fontSize: 36, fontWeight: 400, fontStyle: "italic", letterSpacing: "-.02em", marginBottom: 32 }}>Contact</h1>

        <p style={{ fontSize: 16, lineHeight: 1.75, color: ink2, marginBottom: 32 }}>
          For questions about the platform, partnership inquiries, content contributions, or anything else:
        </p>

        <a href="mailto:hello@tmos13.ai" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: mono, fontSize: 14, color: blue,
          padding: "14px 28px", border: `0.5px solid ${blue}`, borderRadius: 4,
          textDecoration: "none", transition: "background 0.15s",
        }}>
          hello@tmos13.ai
        </a>

        <div style={{ borderTop: `0.5px solid ${border_}`, marginTop: 48, paddingTop: 32 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink3, marginBottom: 16 }}>Company</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["Company", "TMOS13, LLC"],
              ["Location", "Jersey City, NJ"],
              ["Founder", "Robert C. Ventura"],
              ["Email", "hello@tmos13.ai"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 12, padding: "6px 0", borderBottom: `0.5px solid ${border_}` }}>
                <span style={{ color: ink2 }}>{label}</span>
                <span style={{ color: ink }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
