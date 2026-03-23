import Link from "next/link";

const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const blue = "#1D4ED8";

const FOOTER_LINKS = {
  Library: [
    { label: "Books", href: "/portal/books" },
    { label: "Essays", href: "/portal/essays" },
    { label: "Digests", href: "/portal/digests" },
    { label: "Games", href: "/portal/games" },
  ],
  Subjects: [
    { label: "Philosophy", href: "/portal/philosophy" },
    { label: "Religion", href: "/portal/religion" },
    { label: "Science", href: "/portal/science" },
    { label: "History", href: "/portal/history" },
    { label: "Literature", href: "/portal/literature" },
    { label: "Society", href: "/portal/society" },
    { label: "Technology", href: "/portal/technology" },
  ],
  Account: [
    { label: "Sign In", href: "/subscribe" },
    { label: "Register", href: "/subscribe" },
  ],
  About: [
    { label: "About Bibliothèque", href: "/about" },
    { label: "TMOS13, LLC", href: "/company" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function SiteFooter() {
  return (
    <footer style={{ borderTop: `0.5px solid ${border_}`, background: "#F5F3EE" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 20px" }}>
        {/* Sitemap grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 32, marginBottom: 32 }}>
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: ink, fontWeight: 600, marginBottom: 12 }}>
                {section}
              </div>
              {links.map(l => (
                <Link key={l.label} href={l.href} style={{ display: "block", fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", textDecoration: "none" }} className="bib-slash">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div style={{ borderTop: `0.5px solid ${border_}`, paddingTop: 24, textAlign: "center" }}>
          <Link href="/" style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: ink3, textDecoration: "none" }}>
            Biblioth<span style={{ color: blue }}>è</span>que
          </Link>
          <div style={{ fontFamily: mono, fontSize: 10, color: ink3, marginTop: 8 }}>
            © 2026 TMOS13, LLC. All rights reserved.
          </div>
          <div style={{ fontFamily: mono, fontSize: 9, color: ink3, marginTop: 6, opacity: 0.6, lineHeight: 1.7 }}>
            TMOS13, LLC · Jersey City, NJ · Robert C. Ventura, Founder
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 10 }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Contact", href: "/contact" },
              { label: "About", href: "/about" },
            ].map(s => (
              <Link key={s.label} href={s.href} style={{ fontFamily: mono, fontSize: 9, color: ink3, textDecoration: "none" }} className="bib-slash">{s.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
