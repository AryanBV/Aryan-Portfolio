"use client";

import AnimatedHeadline from "@/components/ui/AnimatedHeadline";
import HeroVisual from "@/components/ui/HeroVisual";
import LiveClock from "@/components/ui/LiveClock";
import { ArrowRight, Download } from "@/components/ui/Icons";

// Hero section — the strict "fits within viewport" section.
//
// Key constraints (see plan file):
//   - min-h-[100svh] (svh handles mobile browser-chrome expansion/collapse)
//   - Fluid type via --fluid-h1 (2.25rem at 360px → 5rem at lg+)
//   - Hero visual stacks ABOVE text on mobile (order-first md:order-last)
//     but below the hidden-on-mobile meta row — so the page still starts
//     with the "AVAILABLE FOR WORK" marker before the photo.
//   - CTAs stack full-width on mobile (w-full sm:w-auto)
//   - Safe-area top padding so floating nav never overlaps content on iOS
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center overflow-hidden"
      style={{
        minHeight: "100svh",
        paddingTop: "max(5rem, calc(env(safe-area-inset-top) + 4.5rem))",
        paddingBottom: "clamp(1rem, 3vh, 3rem)",
      }}
    >
      {/* Radial amber washes */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "70%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle at center, rgba(245,166,35,0.18), transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-5%",
          width: "50%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle at center, rgba(255,107,53,0.1), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-[2] w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Top meta row: available-for-work + clock */}
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
          style={{
            paddingBottom: "clamp(16px, 3vh, 32px)",
            fontSize: 12,
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            animation: "heroFadeIn 800ms 300ms both",
          }}
        >
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--status-live)",
                boxShadow: "0 0 8px var(--status-live)",
                animation: "heroPulse 2s infinite",
              }}
            />
            AVAILABLE FOR WORK
          </span>
          <span aria-hidden="true" style={{ opacity: 0.4 }}>
            ·
          </span>
          <LiveClock />
        </div>

        <div className="grid items-center gap-[clamp(1rem,3vw,4rem)] grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="order-2 md:order-1">
            <AnimatedHeadline
              lines={[
                [
                  { text: "I turn" },
                  { text: "business" },
                  { text: "problems" },
                ],
                [
                  { text: "into", italic: true },
                  { text: "production" },
                  { text: "software." },
                ],
              ]}
            />

            <p
              style={{
                marginTop: "clamp(12px, 2vh, 24px)",
                fontSize: "clamp(0.9rem, 1.2vw, 1.0625rem)",
                color: "var(--text-secondary)",
                maxWidth: 520,
                lineHeight: 1.55,
                animation: "heroFadeUp 800ms var(--ease-emph) 1200ms both",
              }}
            >
              Full-stack engineer who built the system that replaced a{" "}
              <em style={{ color: "var(--text-primary)", fontStyle: "italic" }}>
                15-year Excel workflow
              </em>
              . Now shipping a PDF editing trilogy with an audit suite of{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                144 invariant probes
              </strong>{" "}
              and{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                88% coverage
              </strong>
              .
            </p>

            <div
              className="flex flex-row flex-wrap gap-2 sm:gap-3"
              style={{
                marginTop: "clamp(16px, 2.5vh, 28px)",
                animation: "heroFadeUp 800ms var(--ease-emph) 1400ms both",
              }}
            >
              <a
                href="#projects"
                className="btn-xl primary flex-1 sm:flex-none justify-center sm:justify-start"
              >
                View My Work <ArrowRight size={14} />
              </a>
              <a
                href="/Aryan_BV_Resume_2026.pdf"
                download
                className="btn-xl ghost flex-1 sm:flex-none justify-center sm:justify-start"
              >
                <Download size={14} /> Resume
              </a>
            </div>
          </div>

          <div
            className="order-1 md:order-2 flex justify-center"
            style={{
              animation: "heroFadeUp 1000ms var(--ease-emph) 800ms both",
            }}
          >
            <HeroVisual />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes heroFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes heroPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </section>
  );
}
