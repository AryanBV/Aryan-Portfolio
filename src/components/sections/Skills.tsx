"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SpotCard from "@/components/ui/SpotCard";
import TechPill, { type TechPillMode } from "@/components/ui/TechPill";
import { Code, Layers, Zap } from "@/components/ui/Icons";

// Three skill cards — Build / Integrate / Ship. Each has a primary list
// (logos + names) and a secondary "also using" list (name only / small logo).
const SKILLS: Array<{
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  sub: string;
  primary: string[];
  secondary: string[];
}> = [
  {
    icon: Code,
    title: "Build",
    sub: "Frontend & backend code",
    primary: ["React", "Next.js", "TypeScript", "Python", "Tailwind"],
    secondary: ["NestJS", "Node.js", "FastAPI"],
  },
  {
    icon: Layers,
    title: "Integrate",
    sub: "APIs, databases, AI",
    primary: ["Claude API", "MCP Protocol", "Supabase", "PostgreSQL"],
    secondary: ["Razorpay", "Tesseract OCR", "REST"],
  },
  {
    icon: Zap,
    title: "Ship",
    sub: "Deploy with confidence",
    primary: ["Vercel", "Git / GitHub", "pytest", "PWA"],
    secondary: ["mypy", "Zod", "GitHub Actions"],
  },
];

const LOGO_MODES: Array<{ id: TechPillMode; label: string }> = [
  { id: "both", label: "Logo + name" },
  { id: "logo", label: "Logo only" },
  { id: "name", label: "Name only" },
];

export default function Skills() {
  const [mode, setMode] = useState<TechPillMode>("both");

  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 relative z-[2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <div>
              <div className="eyebrow-line">
                <span className="section-number">04</span>
                <span>Skills</span>
              </div>
              <h2
                style={{
                  fontSize: "var(--fluid-h2)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  margin: "20px 0 0",
                }}
              >
                What I build with.
              </h2>
            </div>
            <div
              role="radiogroup"
              aria-label="Tech pill display mode"
              style={{
                display: "inline-flex",
                padding: 4,
                borderRadius: 10,
                background: "var(--bg-surface)",
                border: "1px solid var(--divider)",
                alignItems: "center",
                gap: 2,
              }}
            >
              {LOGO_MODES.map((m) => (
                <button
                  key={m.id}
                  role="radio"
                  aria-checked={mode === m.id}
                  onClick={() => setMode(m.id)}
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "8px 12px",
                    borderRadius: 7,
                    background:
                      mode === m.id ? "var(--accent-subtle)" : "transparent",
                    color:
                      mode === m.id ? "var(--accent)" : "var(--text-muted)",
                    border:
                      mode === m.id
                        ? "1px solid var(--accent-dim)"
                        : "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 200ms var(--ease-emph)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS.map((s) => {
              const Icon = s.icon;
              return (
                <SpotCard
                  key={s.title}
                  style={{
                    padding: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      padding: "24px 24px 18px",
                      borderBottom: "1px solid var(--divider)",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background:
                          "linear-gradient(135deg, var(--accent-dim), var(--accent-subtle))",
                        border: "1px solid var(--accent-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          margin: 0,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 12,
                          color: "var(--text-muted)",
                          margin: "2px 0 0",
                        }}
                      >
                        {s.sub}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: 24,
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                      flex: 1,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 10,
                          color: "var(--text-muted)",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          margin: "0 0 12px",
                          opacity: 0.7,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        Core
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.primary.map((t) => (
                          <TechPill key={t} name={t} mode={mode} />
                        ))}
                      </div>
                    </div>
                    <div
                      style={{
                        borderTop: "1px dashed var(--divider)",
                        paddingTop: 16,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 10,
                          color: "var(--text-muted)",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          margin: "0 0 12px",
                          opacity: 0.5,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        Also using
                      </p>
                      <div className="flex flex-wrap gap-x-3.5 gap-y-2.5">
                        {s.secondary.map((t) => (
                          <TechPill key={t} name={t} mode={mode} secondary />
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotCard>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
