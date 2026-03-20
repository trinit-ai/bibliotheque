import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: "Bibliothèque — Living Library",
  description:
    "Every article is a conversation. 1,700+ sacred texts, expeditions, packs, oracles.",
  metadataBase: new URL("https://bibliotheque.ai"),
  icons: {
    icon: "/brand/bibliotheque-favicon.svg",
    shortcut: "/brand/bibliotheque-favicon.svg",
    apple: "/brand/bibliotheque-favicon.svg",
  },
  openGraph: {
    title: "Bibliothèque",
    description: "The living library.",
    url: "https://bibliotheque.ai",
    siteName: "Bibliothèque",
    images: [
      {
        url: "/brand/bibliotheque-logo.svg",
        width: 200,
        height: 240,
        alt: "Bibliothèque",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Bibliothèque",
    description: "The living library.",
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
