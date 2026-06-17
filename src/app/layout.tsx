import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainLayout from "@/components/layout/MainLayout";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/ui/json-ld";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryanbv.com"),
  title: "Aryan B V — Full-Stack Developer & AI/ML Engineer",
  description:
    "I build production systems — from e-commerce platforms to AI-powered tools. " +
    "Next.js, NestJS, Supabase, Claude API. Based in Bangalore, India.",
  keywords: [
    "Full-Stack Developer",
    "AI/ML Engineer",
    "Next.js Developer",
    "Bangalore",
    "React",
    "NestJS",
    "Supabase",
    "TypeScript",
  ],
  authors: [{ name: "Aryan B V" }],
  openGraph: {
    title: "Aryan B V — Full-Stack Developer & AI/ML Engineer",
    description: "I build production systems that run in the real world.",
    url: "https://aryanbv.com",
    siteName: "Aryan B V",
    locale: "en_IN",
    type: "website",
    // No 'images' key — Next.js auto-links opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan B V — Full-Stack Developer & AI/ML Engineer",
    description: "I build production systems that run in the real world.",
    // No 'images' key — Next.js auto-links opengraph-image.tsx
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aryan B V",
  url: "https://aryanbv.com",
  jobTitle: "Full-Stack Developer & AI/ML Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/AryanBV",
    "https://www.linkedin.com/in/aryan-b-v-78aa63246/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      {/* suppressHydrationWarning: browser extensions (dark reader, Grammarly) inject
          attributes into <body> before hydration; this prevents false-positive warnings
          without affecting any first-party attributes. */}
      <body suppressHydrationWarning>
        <JsonLd data={personJsonLd} id="ld-person" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-black focus:rounded focus:font-semibold"
        >
          Skip to content
        </a>
        <MainLayout>{children}</MainLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
