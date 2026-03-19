import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        editorial: {
          bg: "#ffffff",
          text: "#111827",
          accent: "#1d4ed8",
          muted: "#6b7280",
          border: "#e5e7eb",
        },
        session: {
          bg: "#020817",
          text: "#e2e8f0",
          accent: "#3B82F6",
          muted: "#64748b",
          border: "#1e293b",
        },
      },
      fontFamily: {
        display: ["var(--font-crimson-pro)", "Georgia", "serif"],
        body: ["var(--font-source-serif)", "Georgia", "serif"],
        mono: ["var(--font-dm-mono)", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
