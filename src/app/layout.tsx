import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";

/**
 * Display typeface — used for headlines and large numerals.
 * Mirrors the original Golem identity (Bricolage Grotesque).
 */
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Body typeface — the workhorse for paragraph copy and UI. */
const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Monospace — used for the "receipt" chips, eyebrows and data artifacts. */
const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://golem.ai"),
  title: {
    default: "Golem — The independent AI for your dispensary",
    template: "%s · Golem AI",
  },
  description:
    "Golem is an independent, evidence-grounded AI operations layer for cannabis retail. It answers any question about your store, shows the source of every number, and acts only when you approve.",
  keywords: [
    "cannabis retail AI",
    "dispensary software",
    "independent AI",
    "POS-agnostic",
    "Golem AI",
  ],
  authors: [{ name: "Golem AI" }],
  openGraph: {
    title: "Golem — The independent AI for your dispensary",
    description:
      "An independent AI operations layer that answers to the operator — register, market and compliance, with receipts.",
    type: "website",
    locale: "en_US",
    siteName: "Golem AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Golem — The independent AI for your dispensary",
    description:
      "Independent, grounded, approval-first AI for cannabis retail.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
