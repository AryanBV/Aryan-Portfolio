"use client";

import Reveal from "@/components/ui/Reveal";
import SpotCard from "@/components/ui/SpotCard";
import MagneticLink from "@/components/ui/MagneticLink";

// Facts grid rendered in the education card. Extending to include the AI-900
// cert means the existing Certificates section still lists the full record
// while this card gives the highlight in context.
const FACTS: Array<[label: string, value: string]> = [
  ["Duration", "2021–25"],
  ["Location", "Bangalore"],
  ["Cert", "Azure AI-900"],
  ["Grad", "2025"],
];

export default function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 lg:py-32 relative z-[2] overflow-hidden"
    >
      {/* Ambient wash — mirrors Stats, keeps visual rhythm consistent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "-12%",
          width: "45%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle at center, rgba(245,166,35,0.06), transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(40px)",
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-16">
          {/* Left: eyebrow + title + currently */}
          <Reveal>
            <div>
              <div className="eyebrow-line">
                <span className="section-number">03</span>
                <span>About</span>
              </div>
              <h2
                style={{
                  fontSize: "var(--fluid-h2)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                  margin: "20px 0 0",
                }}
              >
                The story behind
                <br />
                <span
                  style={{
                    color: "var(--accent)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  the code.
                </span>
              </h2>
              <div
                style={{
                  marginTop: 32,
                  paddingLeft: 24,
                  borderLeft: "1px solid var(--accent-subtle)",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--accent)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Currently
                </p>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--text-secondary)",
                    margin: "8px 0 0",
                    lineHeight: 1.55,
                  }}
                >
                  Shipping the PDF trilogy. Open to full-time SWE roles in
                  Bangalore or remote. Interested in infra + developer tools.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: narrative + education */}
          <div className="flex flex-col gap-6 md:gap-7">
            <Reveal>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                I grew up in Kodagu, Karnataka, where my family runs{" "}
                <MagneticLink
                  href="#projects"
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 500,
                    display: "inline",
                  }}
                >
                  Amar Jyothi Spare Parts
                </MagneticLink>{" "}
                — an automotive retail business. Watching purchases tracked in
                paper notebooks, supplier records filed in cabinets, and the
                entire stock counted by hand every six months showed me how much
                time manual processes consume.
              </p>
            </Reveal>
            <Reveal>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                So I built{" "}
                <strong
                  style={{ color: "var(--text-primary)", fontWeight: 500 }}
                >
                  AJSP Manager
                </strong>{" "}
                — a full-stack PWA that replaced that 15-year paper workflow.
                It&apos;s been in daily production use since launch. That
                experience shaped how I approach every project:{" "}
                <em
                  style={{
                    color: "var(--text-primary)",
                    fontStyle: "italic",
                  }}
                >
                  start with a real problem, build something that actually gets
                  used
                </em>
                .
              </p>
            </Reveal>
            <Reveal>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                The{" "}
                <strong
                  style={{ color: "var(--text-primary)", fontWeight: 500 }}
                >
                  PDF trilogy
                </strong>{" "}
                came from going a layer deeper when the shallow fix wasn&apos;t
                enough. I started with pdf-toolkit-mcp, hit the limits of
                existing PDF libraries, and built pdf-edit-engine — a Python
                library that modifies content-stream operators in place and
                keeps fonts, kerning, and pixel positioning intact.
              </p>
            </Reveal>

            <Reveal>
              <SpotCard style={{ marginTop: 12, padding: 0 }}>
                <div
                  className="flex items-center justify-between flex-wrap gap-4"
                  style={{
                    padding: "24px 28px",
                    borderBottom: "1px solid var(--divider)",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        color: "var(--accent)",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        margin: 0,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Education
                    </p>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        margin: "8px 0 0",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      B.Tech · AI/ML
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--text-secondary)",
                        margin: "4px 0 0",
                      }}
                    >
                      M S Ramaiah University of Applied Sciences
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: 44,
                      fontWeight: 300,
                      color: "var(--accent)",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    8.0
                    <span
                      style={{
                        fontSize: 16,
                        color: "var(--text-muted)",
                        fontWeight: 400,
                      }}
                    >
                      /10
                    </span>
                  </div>
                </div>
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                  style={{
                    padding: "20px 28px",
                    background: "var(--bg-base)",
                  }}
                >
                  {FACTS.map(([l, v]) => (
                    <div key={l}>
                      <p
                        style={{
                          fontSize: 9,
                          color: "var(--text-muted)",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          margin: 0,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {l}
                      </p>
                      <p
                        style={{
                          fontSize: 14,
                          color: "var(--text-primary)",
                          margin: "6px 0 0",
                          fontWeight: 500,
                        }}
                      >
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              </SpotCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
