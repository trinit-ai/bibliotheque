"use client";

import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────

const NEWS_TABS = ["World", "Politics", "Markets", "Tech", "Health", "Science", "Opinion", "Arts", "Sports"];
const CONTENT_TABS = ["Books", "Digests", "Essays", "Horoscopes", "Games"];
const LIB_SUBJECTS = ["Philosophy", "Religion", "Science", "History", "Mathematics", "Esoterica", "Literature", "Society", "Technology", "Health", "Psychology"];

const TOP_STORIES = [
  { n: "01", hl: "TSMC\u2019s Arizona Bet Reshapes the Global Chip Map", cat: "tech", time: "6 min", session: true },
  { n: "02", hl: "Bird Flu Emergency Declaration Raises Pandemic Preparedness Questions", cat: "health", time: "5 min", session: false },
  { n: "03", hl: "TikTok\u2019s Supreme Court Moment: Free Speech vs. National Security", cat: "politics", time: "7 min", session: true },
  { n: "04", hl: "Inside OpenAI\u2019s $300 Billion Valuation and the Race It Reflects", cat: "tech", time: "9 min", session: true },
  { n: "05", hl: "NATO Allies Quietly Accelerate Arctic Defense Spending", cat: "world", time: "4 min", session: false },
];

const ARTS = [
  { n: "01", hl: "The Quiet Luxury Backlash: Why Logomania Is Returning", time: "4 min", session: false },
  { n: "02", hl: "A Brutalist Church in Tokyo Becomes the Season\u2019s Hottest Gallery", time: "5 min", session: true },
  { n: "03", hl: "Manhattan\u2019s Last Affordable Neighborhood? Not for Long", time: "6 min", session: false },
  { n: "04", hl: "Why Financial Advisors Are Telling Clients to Wait on Real Estate", time: "5 min", session: false },
  { n: "05", hl: "The Rise of the \u2018Microretirement\u2019: Taking a Year Off at 35", time: "7 min", session: true },
];

const PICKS = [
  { title: "Tao Te Ching", meta: "Laozi \u00b7 Living Book", dot: "#3B82F6" },
  { title: "The Stoicism Expedition", meta: "Philosophy \u00b7 Expedition", dot: "#10B981" },
  { title: "I Ching Oracle", meta: "Divination \u00b7 Oracle", dot: "#F59E0B" },
  { title: "Politics and the English Language", meta: "Orwell \u00b7 Essay", dot: "#8B5CF6" },
];

const ENCOUNTERS = [
  { text: "A visitor spent 4 turns exploring the ", em: "Tao Te Ching", rest: ", asking about wu wei and its relationship to modern leadership theory." },
  { text: "Someone asked the ", em: "Stoicism", rest: " expedition about Epictetus\u2019s view on what we can and cannot control, then pivoted to Marcus Aurelius." },
  { text: "A reader engaged the ", em: "I Ching", rest: " oracle for 3 turns, receiving hexagram 49 (Revolution)." },
];

const CAT_COLORS: Record<string, { bg: string; color: string }> = {
  tech: { bg: "#EFF6FF", color: "#1E40AF" },
  health: { bg: "#F0FDF4", color: "#166534" },
  politics: { bg: "#FFF7ED", color: "#9A3412" },
  world: { bg: "#F5F3FF", color: "#5B21B6" },
  arts: { bg: "#FEFCE8", color: "#854D0E" },
};

const TICKER = "Fed holds 4.25\u20134.50%  \u00b7  S&P 500  5,638  +0.42%  \u00b7  TSMC Arizona $65B  \u00b7  WHO declares bird flu emergency  \u00b7  BTC  83,412  \u22121.24%  \u00b7  OpenAI valued at $300B  \u00b7  NATO accelerates Arctic spending  \u00b7  Nasdaq  17,691  +0.87%  \u00b7  10Y Yield  4.29%";

// ── Tokens ────────────────────────────────────────────────────────────────

const cream = "#FAFAF7";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const border2 = "#F0EDE6";
const blue = "#1D4ED8";
const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";

// ── Tiny components ───────────────────────────────────────────────────────

function CatTag({ cat }: { cat: string }) {
  const c = CAT_COLORS[cat] || { bg: "#F3F4F6", color: "#374151" };
  return (
    <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".04em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 2, background: c.bg, color: c.color }}>
      {cat}
    </span>
  );
}

function SessionTag() {
  return (
    <span style={{ background: "#EFF6FF", border: "0.5px solid rgba(29,78,216,.2)", color: blue, padding: "2px 7px", borderRadius: 2, fontFamily: mono, fontSize: 10, cursor: "pointer" }}>
      ↗ session
    </span>
  );
}

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: ink3, paddingBottom: 12, borderBottom: `0.5px solid ${border2}`, marginBottom: 16 }}>
      {children}
    </div>
  );
}

function SbSection({ children }: { children: React.ReactNode }) {
  return <div style={{ paddingBottom: 16, marginBottom: 16, borderBottom: `0.5px solid ${border2}` }}>{children}</div>;
}

// ── Masthead ──────────────────────────────────────────────────────────────

function Masthead() {
  const [q, setQ] = useState("");
  return (
    <div style={{ background: cream, borderBottom: `0.5px solid ${border2}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 200 }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: 38, letterSpacing: "-.025em", lineHeight: 1, color: ink }}>
            Biblioth<span style={{ color: blue }}>è</span>que
          </div>
          <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: ink3, marginTop: 5 }}>
            The Living Library
          </div>
        </div>
        <div style={{ width: 200, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "center", border: `0.5px solid ${border_}`, borderRadius: 3, padding: "5px 10px", background: "#fff" }}>
            <input
              type="text"
              placeholder="Search library…"
              value={q}
              onChange={e => setQ(e.target.value)}
              style={{ border: "none", outline: "none", fontFamily: mono, fontSize: 11, color: ink, background: "transparent", width: 140 }}
            />
            <span style={{ color: ink3, fontSize: 14 }}>⌕</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── News nav ──────────────────────────────────────────────────────────────

function NewsNav({ active, onSelect }: { active: string; onSelect: (t: string) => void }) {
  const [hov, setHov] = useState<string | null>(null);
  return (
    <div style={{ background: cream, borderBottom: `0.5px solid ${border_}`, position: "sticky", top: 0, zIndex: 30 }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "center" }}>
      {NEWS_TABS.map(t => (
        <span
          key={t}
          onClick={() => onSelect(t)}
          onMouseEnter={() => setHov(t)}
          onMouseLeave={() => setHov(null)}
          style={{
            fontFamily: serif, fontSize: 15,
            padding: "0 14px", height: 44, lineHeight: "44px",
            color: active === t ? blue : hov === t ? ink : ink2,
            cursor: "pointer", whiteSpace: "nowrap",
            borderBottom: active === t ? `2px solid ${blue}` : "2px solid transparent",
            display: "inline-block", transition: "color .12s",
          }}
        >
          {t}
        </span>
      ))}
      <div style={{ width: "0.5px", height: 18, background: border_, margin: "0 6px", flexShrink: 0 }} />
      {CONTENT_TABS.map(t => (
        <span
          key={t}
          onClick={() => onSelect(t)}
          onMouseEnter={() => setHov(t)}
          onMouseLeave={() => setHov(null)}
          style={{
            fontFamily: mono, fontSize: 12,
            padding: "0 10px", height: 44, lineHeight: "44px",
            color: active === t ? blue : hov === t ? "#1e40af" : "#3B82F6",
            cursor: "pointer", whiteSpace: "nowrap",
            borderBottom: active === t ? `2px solid ${blue}` : "2px solid transparent",
            display: "inline-block", transition: "color .12s",
          }}
        >
          {t}
        </span>
      ))}
    </div>
    </div>
  );
}

// ── Library nav ───────────────────────────────────────────────────────────

function LibNav({ active, onSelect }: { active: string | null; onSelect: (t: string | null) => void }) {
  const [hov, setHov] = useState<string | null>(null);
  const all: (string | null)[] = [...LIB_SUBJECTS];
  return (
    <div style={{ background: blue, borderBottom: "0.5px solid rgba(255,255,255,.15)", display: "flex", justifyContent: "center", position: "sticky", top: 44, zIndex: 29 }}>
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", maxWidth: 1200, padding: "0 12px" }}>
      <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginRight: 14, paddingRight: 14, borderRight: "0.5px solid rgba(255,255,255,.2)", whiteSpace: "nowrap", flexShrink: 0 }}>
        The Library
      </span>
      {all.map((t, i) =>
        t === null
          ? <div key={`div-${i}`} style={{ width: "0.5px", height: 14, background: "rgba(255,255,255,.25)", margin: "0 6px", flexShrink: 0 }} />
          : (
            <span
              key={t}
              onClick={() => onSelect(active === t ? null : t)}
              onMouseEnter={() => setHov(t)}
              onMouseLeave={() => setHov(null)}
              style={{
                fontFamily: mono, fontSize: 12,
                padding: "0 11px", height: 38, lineHeight: "38px",
                color: active === t ? "#fff" : hov === t ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.7)",
                cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                borderBottom: active === t ? "2px solid rgba(255,255,255,.75)" : "2px solid transparent",
                display: "inline-block", transition: "color .1s",
              }}
            >
              {t}
            </span>
          )
      )}
    </div>
    </div>
  );
}

// ── Ticker ────────────────────────────────────────────────────────────────

function TickerBar() {
  const t = `${TICKER}          `;
  return (
    <div style={{ background: ink, height: 22, overflow: "hidden", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
      <style>{`@keyframes btick { to { transform: translateX(-50%); } } *::-webkit-scrollbar { display: none; }`}</style>
      <div style={{ display: "inline-block", fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,.5)", letterSpacing: ".03em", animation: "btick 55s linear infinite", whiteSpace: "nowrap" }}>
        {t}{t}
      </div>
    </div>
  );
}

// ── Thread band ───────────────────────────────────────────────────────────

function ThreadBand() {
  return (
    <div style={{ background: "#1C1A18", padding: "20px 40px", display: "grid", gridTemplateColumns: "1fr 48px 1fr", alignItems: "center", borderBottom: "0.5px solid rgba(255,255,255,.06)" }}>
      <div>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: 10 }}>
          Today&apos;s Thread
        </div>
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 19, lineHeight: 1.45, color: "rgba(255,255,255,.82)" }}>
          &ldquo;Fed Signals Patience as Inflation Proves Stickier Than Expected&rdquo;
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "0.5px", height: 22, background: "rgba(59,130,246,.4)" }} />
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3B82F6", border: "2px solid #1C1A18" }} />
        <div style={{ width: "0.5px", height: 22, background: "rgba(59,130,246,.4)" }} />
      </div>
      <div style={{ paddingLeft: 24, borderLeft: "0.5px solid rgba(59,130,246,.18)" }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(59,130,246,.75)", marginBottom: 10 }}>
          The Wealth of Nations · Adam Smith · 1776
        </div>
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,.7)", marginBottom: 12 }}>
          &ldquo;The natural price is the central price, to which the prices of all commodities are continually gravitating…&rdquo;
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: mono, fontSize: 11, color: "rgba(59,130,246,.85)", background: "rgba(59,130,246,.1)", border: "0.5px solid rgba(59,130,246,.28)", padding: "6px 14px", borderRadius: 3, cursor: "pointer" }}>
          Open in Library →
        </span>
      </div>
    </div>
  );
}

// ── Story list ────────────────────────────────────────────────────────────

function StoryListSection() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: blue, marginBottom: 10 }}>Markets</div>
        <div style={{ fontFamily: serif, fontSize: 28, lineHeight: 1.18, letterSpacing: "-.01em", marginBottom: 12 }}>
          Fed Signals Patience as Inflation Proves Stickier Than Expected
        </div>
        <div style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.75, color: ink2, marginBottom: 12 }}>
          The Federal Reserve held its benchmark rate steady for the sixth consecutive meeting, acknowledging that progress toward its 2% inflation target has slowed. Chair Powell emphasized a data-dependent approach while markets recalibrated expectations for the first cut.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: mono, fontSize: 11, color: ink3, paddingBottom: 20, borderBottom: `0.5px solid ${border2}` }}>
          <span>8 min</span><SessionTag />
        </div>
      </div>

      {TOP_STORIES.map(s => (
        <div key={s.n} style={{ display: "flex", gap: 12, padding: "11px 0", borderBottom: `0.5px solid ${border2}` }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: ink3, minWidth: 20, paddingTop: 2, flexShrink: 0 }}>{s.n}</div>
          <div>
            <div style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.4, marginBottom: 6 }}>{s.hl}</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <CatTag cat={s.cat} />
              <span style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>{s.time}</span>
              {s.session && <SessionTag />}
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 20, paddingTop: 14, borderTop: `0.5px solid ${border2}` }}>
        <ColLabel>Markets</ColLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[
            { label: "S&P 500", val: "5,638.94", chg: "+0.42%", up: true },
            { label: "Nasdaq", val: "17,691.63", chg: "+0.87%", up: true },
            { label: "BTC", val: "83,412.60", chg: "−1.24%", up: false },
          ].map(m => (
            <div key={m.label}>
              <div style={{ fontFamily: mono, fontSize: 10, color: ink3, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontFamily: mono, fontSize: 14, color: ink }}>{m.val}</div>
              <div style={{ fontFamily: mono, fontSize: 10, color: m.up ? "#15803D" : "#DC2626" }}>{m.chg}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Library column ────────────────────────────────────────────────────────

function LibraryColumn() {
  return (
    <div>
      <div style={{ border: `0.5px solid ${border_}`, borderRadius: 6, overflow: "hidden", marginBottom: 18 }}>
        <div style={{ background: blue, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.75)" }}>Living Book</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,.5)" }}>81 chapters · 47 sessions this week</span>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 24, lineHeight: 1.1, marginBottom: 5 }}>Tao Te Ching</div>
          <div style={{ fontFamily: mono, fontSize: 10, color: ink3, marginBottom: 12 }}>Laozi · Taoist tradition · 6th century BC</div>
          <div style={{ fontFamily: serif, fontSize: 14, lineHeight: 1.7, color: ink2, marginBottom: 14 }}>
            The foundational text of Taoist philosophy, rendered as a living conversation. Ask about wu wei, the nature of the Tao, or explore any of the 81 chapters in dialogue.
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: `0.5px solid ${border2}` }}>
            <span style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>81 chapters indexed</span>
            <button style={{ background: blue, color: "#fff", border: "none", borderRadius: 3, fontFamily: mono, fontSize: 11, padding: "7px 16px", cursor: "pointer" }}>
              Open session →
            </button>
          </div>
        </div>
      </div>

      <ColLabel>Arts &amp; Lifestyle</ColLabel>
      {ARTS.map(a => (
        <div key={a.n} style={{ padding: "10px 0", borderBottom: `0.5px solid ${border2}` }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: ink3, marginBottom: 5 }}>{a.n}</div>
          <div style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.35, color: blue, marginBottom: 6 }}>{a.hl}</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <CatTag cat="arts" />
            <span style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>{a.time}</span>
            {a.session && <SessionTag />}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────

function SidebarSection() {
  return (
    <div>
      <SbSection>
        <ColLabel>Today&apos;s Picks</ColLabel>
        {PICKS.map(p => (
          <div key={p.title} style={{ display: "flex", gap: 9, padding: "5px 0", alignItems: "flex-start" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.dot, flexShrink: 0, marginTop: 6 }} />
            <div>
              <div style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.25 }}>{p.title}</div>
              <div style={{ fontFamily: mono, fontSize: 10, color: ink3, marginTop: 3 }}>{p.meta}</div>
            </div>
          </div>
        ))}
      </SbSection>

      <SbSection>
        <ColLabel>On This Day — March 19</ColLabel>
        <div style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.65, color: ink2 }}>
          In 1610, Johannes Kepler published <em>Astronomia Nova</em>, introducing his first two laws of planetary motion and forever changing our understanding of celestial mechanics.
        </div>
        <a style={{ fontFamily: mono, fontSize: 11, color: blue, display: "inline-block", marginTop: 10, cursor: "pointer" }}>
          Explore the expedition →
        </a>
      </SbSection>

      <SbSection>
        <ColLabel>Library</ColLabel>
        {[["Living Books", "1"], ["In Progress", "1,700+"], ["Expeditions", "∞"], ["Sessions Today", "0"], ["Corpus Target", "1,700+"]].map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "5px 0" }}>
            <span style={{ color: ink2 }}>{l}</span>
            <span style={{ color: blue }}>{v}</span>
          </div>
        ))}
      </SbSection>

      <div>
        <ColLabel>Recent Encounters</ColLabel>
        {ENCOUNTERS.map((e, i) => (
          <div key={i} style={{ fontFamily: serif, fontSize: 14, lineHeight: 1.65, color: ink2, marginBottom: 10 }}>
            {e.text}<em style={{ color: "#0C3D6B" }}>{e.em}</em>{e.rest}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [newsTab, setNewsTab] = useState("World");
  const [libTab, setLibTab] = useState<string | null>(null);

  return (
    <div style={{ background: cream, color: ink, minHeight: "100vh", fontFamily: serif, overflowX: "hidden" }}>
      <TickerBar />
      <Masthead />
      <NewsNav active={newsTab} onSelect={t => { setNewsTab(t); setLibTab(null); }} />
      <LibNav active={libTab} onSelect={setLibTab} />
      <ThreadBand />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.5px 1fr 0.5px 220px", maxWidth: 1200, margin: "0 auto", padding: "28px 24px", gap: 0, alignItems: "start" }}>
        <div style={{ paddingRight: 28 }}>
          <ColLabel>Top Stories</ColLabel>
          <StoryListSection />
        </div>
        <div style={{ background: border2 }} />
        <div style={{ padding: "0 28px" }}>
          <ColLabel>From the Library</ColLabel>
          <LibraryColumn />
        </div>
        <div style={{ background: border2 }} />
        <div style={{ paddingLeft: 28 }}>
          <SidebarSection />
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `0.5px solid ${border_}`, background: "#F5F3EE", marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 24, marginBottom: 28 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink, fontWeight: 600, marginBottom: 10 }}>News</div>
              {["World", "U.S.", "Politics", "Business", "Economy", "Markets", "Tech", "Health", "Science", "Sports"].map(s => (
                <div key={s} style={{ fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", cursor: "pointer" }}>{s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink, fontWeight: 600, marginBottom: 10 }}>Opinion</div>
              {["Opinion", "Free Expression", "Arts", "Lifestyle", "Style", "Real Estate", "Personal Finance"].map(s => (
                <div key={s} style={{ fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", cursor: "pointer" }}>{s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink, fontWeight: 600, marginBottom: 10 }}>Library</div>
              {["Books", "Digests", "Essays", "Horoscopes", "Games"].map(s => (
                <div key={s} style={{ fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", cursor: "pointer" }}>{s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink, fontWeight: 600, marginBottom: 10 }}>Subjects</div>
              {["Philosophy", "Religion", "Science", "History", "Mathematics", "Esoterica", "Literature", "Society", "Technology", "Health", "Psychology"].map(s => (
                <div key={s} style={{ fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", cursor: "pointer" }}>{s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink, fontWeight: 600, marginBottom: 10 }}>Account</div>
              {["Sign In", "Register", "Reading History", "Session Journal", "Settings"].map(s => (
                <div key={s} style={{ fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", cursor: "pointer" }}>{s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink, fontWeight: 600, marginBottom: 10 }}>About</div>
              {["About Bibliothèque", "TMOS13, LLC", "Privacy Policy", "Terms of Use", "Contact"].map(s => (
                <div key={s} style={{ fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", cursor: "pointer" }}>{s}</div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: `0.5px solid ${border_}`, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 16, color: ink3 }}>
              Biblioth<span style={{ color: blue }}>è</span>que
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>
              © 2026 TMOS13, LLC
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
