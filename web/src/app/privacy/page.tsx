import { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Bibliothèque",
  description: "How Bibliothèque handles your data.",
};

const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const blue = "#1D4ED8";
const cream = "#FAFAF7";

export default function PrivacyPage() {
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
        <h1 style={{ fontSize: 36, fontWeight: 400, fontStyle: "italic", letterSpacing: "-.02em", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontFamily: mono, fontSize: 11, color: ink3, marginBottom: 32 }}>Last updated: March 2026</p>

        {[
          { title: "What we collect", body: "When you use Bibliothèque, we collect the minimum data necessary to provide the service: session messages (to maintain conversation context during your visit), basic analytics (page views, session counts), and account information if you register (email address). Anonymous visitors are identified only by a temporary session ID." },
          { title: "What we don't collect", body: "We do not sell your data. We do not share session transcripts with third parties. We do not use your conversations to train AI models. Session data is not retained after your visit unless you have a registered account with session history enabled." },
          { title: "AI processing", body: "Sessions are powered by Claude (Anthropic). Your messages are sent to Anthropic's API for processing during active sessions. Anthropic's data retention policies apply to API calls. We do not send personally identifiable information to Anthropic beyond the content of your session messages." },
          { title: "Cookies", body: "We use essential cookies for session management. We do not use tracking cookies, advertising cookies, or third-party analytics that track you across sites." },
          { title: "Your rights", body: "You can request deletion of your account and associated data at any time by contacting hello@tmos13.ai. We will respond within 30 days." },
          { title: "Contact", body: "For privacy questions: hello@tmos13.ai" },
        ].map(s => (
          <section key={s.title} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 400, fontStyle: "italic", marginBottom: 8 }}>{s.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: ink2 }}>{s.body}</p>
          </section>
        ))}

        <p style={{ fontFamily: mono, fontSize: 10, color: ink3, marginTop: 32 }}>TMOS13, LLC · Jersey City, NJ</p>
      </main>

      <SiteFooter />
    </div>
  );
}
