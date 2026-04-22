"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Map } from "@/components/ui/Icons";

// HeroVisual renders two treatments and swaps via Tailwind breakpoints:
//   - Mobile (<md): circular avatar with amber ring + "Open to work" pill.
//     Saves ~80–100px of vertical space and reads more personally on phones.
//   - Desktop (md+): the full 3D-tilt framed card with corner ticks and
//     both floating tags ("Open to work" + "Bangalore, IN").
// Design system colors/tokens are shared between both variants.

const CORNERS: Array<{
  position: React.CSSProperties;
  borders: React.CSSProperties;
}> = [
  {
    position: { top: 12, left: 12 },
    borders: { borderTopWidth: 1, borderLeftWidth: 1 },
  },
  {
    position: { top: 12, right: 12 },
    borders: { borderTopWidth: 1, borderRightWidth: 1 },
  },
  {
    position: { bottom: 12, left: 12 },
    borders: { borderBottomWidth: 1, borderLeftWidth: 1 },
  },
  {
    position: { bottom: 12, right: 12 },
    borders: { borderBottomWidth: 1, borderRightWidth: 1 },
  },
];

export default function HeroVisual() {
  return (
    <>
      <MobileCircle />
      <DesktopCard />
    </>
  );
}

// ─── Mobile variant: layered circle with orbiting decorative ring ──────────
// Composition (outer to inner):
//   1. Ambient amber glow (blur 32px, soft radial)
//   2. Dashed decorative ring (SVG, slowly rotates — mirrors the "technical"
//      design language of the desktop corner ticks)
//   3. Solid 1px amber ring (hairline) + slight inner shadow for depth
//   4. Circular photo with proper face-centered crop
//   5. "Open to work" pill below, with a small accent dot
function MobileCircle() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="md:hidden flex flex-col items-center" style={{ gap: 16 }}>
      <div
        style={{
          position: "relative",
          width: "min(180px, 48vw)",
          aspectRatio: "1",
        }}
      >
        {/* Ambient glow — softer, wider than before */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: -32,
            background:
              "radial-gradient(circle at center, rgba(245,166,35,0.4), transparent 60%)",
            filter: "blur(32px)",
            animation: prefersReducedMotion
              ? "none"
              : "heroGlow 6s ease-in-out infinite alternate",
          }}
        />

        {/* Decorative rotating dashed ring — mirrors desktop corner ticks */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            inset: -8,
            width: "calc(100% + 16px)",
            height: "calc(100% + 16px)",
            animation: prefersReducedMotion
              ? "none"
              : "heroRingSpin 30s linear infinite",
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(245,166,35,0.35)"
            strokeWidth="0.4"
            strokeDasharray="1.5 2"
          />
        </svg>

        {/* Solid hairline amber ring + photo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(245,166,35,0.55)",
            background: "var(--bg-elevated)",
            overflow: "hidden",
            boxShadow:
              "0 24px 48px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(10,10,10,1), 0 0 0 4px rgba(245,166,35,0.08)",
          }}
        >
          <Image
            src="/images/Aryan Profile Picture.jpeg"
            alt="Aryan B V"
            fill
            sizes="180px"
            style={{
              objectFit: "cover",
              objectPosition: "50% 18%",
              filter: "contrast(1.05) saturate(0.95)",
            }}
            priority
          />
          {/* Bottom vignette — adds depth, makes the pill beneath feel connected */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 30%, transparent 60%, rgba(10,10,10,0.5))",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Small accent dot floating at the ring — decorative anchor */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 12px var(--accent), 0 0 2px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      {/* Open-to-work pill — slightly bigger, stronger accent */}
      <div
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid rgba(245,166,35,0.2)",
          borderRadius: 999,
          padding: "7px 14px",
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          color: "var(--text-secondary)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.4), 0 0 0 4px rgba(245,166,35,0.04)",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--status-live)",
            boxShadow: "0 0 8px var(--status-live)",
            animation: prefersReducedMotion ? "none" : "heroPulse 2s infinite",
          }}
        />
        Open to work
      </div>

      <style>{`
        @keyframes heroGlow {
          from { opacity: 0.6; transform: scale(0.95); }
          to   { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes heroRingSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

// ─── Desktop variant: 3D-tilt framed card with corner ticks + floating tags ─
function DesktopCard() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    setTilt({ x: x * 8, y: y * -8 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="hidden md:block w-[min(340px,30vw)]"
      style={{
        position: "relative",
        aspectRatio: "4/5",
        perspective: 1200,
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: -40,
          background:
            "radial-gradient(ellipse at center, rgba(245,166,35,0.25), transparent 65%)",
          filter: "blur(40px)",
          animation: prefersReducedMotion
            ? "none"
            : "heroGlow 6s ease-in-out infinite alternate",
        }}
      />

      {/* Tilting frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 24,
          border: "1px solid var(--divider)",
          background:
            "linear-gradient(180deg, rgba(245,166,35,0.04), transparent 60%)",
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 400ms var(--ease-emph)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Corner ticks */}
        {CORNERS.map((c, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 16,
              height: 16,
              borderStyle: "solid",
              borderColor: "var(--accent)",
              borderWidth: 0,
              ...c.position,
              ...c.borders,
            }}
          />
        ))}

        {/* Photo */}
        <div
          style={{
            position: "absolute",
            inset: 32,
            borderRadius: 16,
            overflow: "hidden",
            background: "var(--bg-elevated)",
            transform: "translateZ(40px)",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,166,35,0.2)",
          }}
        >
          <Image
            src="/images/Aryan Profile Picture.jpeg"
            alt="Aryan B V"
            fill
            sizes="340px"
            style={{
              objectFit: "cover",
              objectPosition: "top",
              filter: "contrast(1.05) saturate(0.95)",
            }}
            priority
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at top, transparent 40%, rgba(0,0,0,0.3))",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Floating "Open to work" */}
        <div
          style={{
            position: "absolute",
            top: -16,
            right: 24,
            background: "var(--bg-elevated)",
            border: "1px solid var(--divider)",
            borderRadius: 999,
            padding: "8px 14px",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            color: "var(--text-secondary)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transform: "translateZ(60px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--status-live)",
              boxShadow: "0 0 8px var(--status-live)",
            }}
          />
          Open to work
        </div>

        {/* Floating "Bangalore" */}
        <div
          style={{
            position: "absolute",
            bottom: -16,
            left: 24,
            background: "var(--bg-elevated)",
            border: "1px solid var(--divider)",
            borderRadius: 999,
            padding: "8px 14px",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            color: "var(--text-secondary)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transform: "translateZ(60px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            whiteSpace: "nowrap",
          }}
        >
          <Map size={12} />
          Bangalore, IN
        </div>
      </div>
    </div>
  );
}
