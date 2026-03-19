import type { Metadata } from "next";
import { Crimson_Pro, Source_Serif_4, DM_Mono } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biblioth\u00e8que \u2014 The Living Library",
  description:
    "Converse with living books, explore wiki expeditions, and discover knowledge through dialogue. A public benefit library powered by structured intelligence.",
  metadataBase: new URL("https://bibliotheque.ai"),
  openGraph: {
    title: "Biblioth\u00e8que",
    description: "The living library. Read by asking.",
    siteName: "Biblioth\u00e8que",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${sourceSerif.variable} ${dmMono.variable}`}
    >
      <body className="bg-editorial-bg text-editorial-text antialiased">
        {children}
      </body>
    </html>
  );
}
