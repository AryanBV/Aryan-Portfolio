import Reveal from "@/components/ui/Reveal";
import SpotCard from "@/components/ui/SpotCard";
import TechPill from "@/components/ui/TechPill";
import { Code, Layers, Zap } from "@/components/ui/Icons";

// Three skill cards — Build / Integrate / Ship. Each has a primary list
// (logos + names) and a secondary "also using" list that matches the style.
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

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 relative z-[2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <Reveal>
          <div className="mb-12">
            <div className="eyebrow-line">
              <span className="section-number">03</span>
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
                          <TechPill key={t} name={t} />
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
                          <TechPill key={t} name={t} secondary />
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
