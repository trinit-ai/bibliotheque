"use client";

import {
  HERO_STORY,
  TOP_STORIES,
  ARTS_STORIES,
} from "@/lib/demo-data";

import NewsTicker from "@/components/home/NewsTicker";
import CategoryRail from "@/components/home/CategoryRail";
import HeroStory from "@/components/home/HeroStory";
import StoryList from "@/components/home/StoryList";
import MarketsStrip from "@/components/home/MarketsStrip";
import CrossoverBanner from "@/components/home/CrossoverBanner";
import FeaturedBook from "@/components/home/FeaturedBook";
import EditorialStrip from "@/components/home/EditorialStrip";
import PortalGrid from "@/components/home/PortalGrid";
import FooterPortalBar from "@/components/home/FooterPortalBar";
import SectionLabel from "@/components/shared/SectionLabel";
import TodaysPicks from "@/components/sidebar/TodaysPicks";
import OnThisDay from "@/components/sidebar/OnThisDay";
import LibraryStats from "@/components/sidebar/LibraryStats";
import RecentEncounters from "@/components/sidebar/RecentEncounters";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* Full-width top section */}
      <NewsTicker />

      {/* Masthead */}
      <div
        style={{
          textAlign: "center",
          padding: "18px 0 0",
          borderBottom: "0.5px solid #e5e7eb",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-crimson-pro), Georgia, serif",
            fontSize: 32,
            fontWeight: 600,
            fontStyle: "italic",
            color: "#111827",
            letterSpacing: "-0.01em",
            margin: "0 0 2px",
          }}
        >
          Biblioth<span style={{ color: "#1d4ed8" }}>e&#768;</span>que
        </h1>
        <div
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: 9,
            color: "#9ca3af",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          The living library
        </div>
      </div>

      <CategoryRail />

      {/* 3-column body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 280px",
          gap: 24,
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Left column */}
        <div>
          <SectionLabel label="Top stories" />
          <HeroStory
            category={HERO_STORY.category}
            headline={HERO_STORY.headline}
            deck={HERO_STORY.deck}
            readTime={HERO_STORY.readTime}
            sessionEnabled={HERO_STORY.sessionEnabled}
          />
          <StoryList stories={TOP_STORIES} />
          <SectionLabel label="Markets" />
          <MarketsStrip />
        </div>

        {/* Middle column */}
        <div>
          <SectionLabel label="From the library" />
          <CrossoverBanner />
          <div style={{ marginTop: 16 }}>
            <FeaturedBook />
          </div>
          <SectionLabel label="Arts & Lifestyle" />
          <StoryList stories={ARTS_STORIES} />
          <SectionLabel label="Editorial" />
          <EditorialStrip />
          <SectionLabel label="Browse portals" />
          <PortalGrid />
        </div>

        {/* Right column (sidebar) */}
        <div style={{ paddingTop: 20 }}>
          <TodaysPicks />
          <OnThisDay />
          <LibraryStats />
          <RecentEncounters />
        </div>
      </div>

      {/* Full-width footer */}
      <div style={{ marginTop: 40 }}>
        <FooterPortalBar />
      </div>
    </main>
  );
}
