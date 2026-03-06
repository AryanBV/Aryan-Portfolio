import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainLayout from "@/components/layout/MainLayout";
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
  metadataBase: new URL("https://aryan-portfolio.vercel.app"),
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
    url: "https://aryan-portfolio.vercel.app",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
