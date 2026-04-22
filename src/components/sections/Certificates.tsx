"use client";

import Reveal from "@/components/ui/Reveal";
import SpotCard from "@/components/ui/SpotCard";
import MagneticLink from "@/components/ui/MagneticLink";
import { ArrowUpRight } from "@/components/ui/Icons";
import { certificates } from "@/lib/certificates";

export default function Certificates() {
  return (
    <section
      id="certifications"
      className="py-16 md:py-24 lg:py-32 relative z-[2]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 flex-wrap mb-12">
            <div>
              <div className="eyebrow-line">
                <span className="section-number">05</span>
                <span>Certifications</span>
              </div>
              <h2
                style={{
                  fontSize: "var(--fluid-h2)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  margin: "20px 0 0",
                }}
              >
                Verified credentials.
              </h2>
            </div>
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certificates.map((c) => (
              <SpotCard
                key={c.id}
                style={{
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    padding: "22px 24px 18px",
                    borderBottom: "1px solid var(--divider)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      padding: "4px 10px",
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      background: "var(--accent-dim)",
                      borderRadius: 4,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                    }}
                  >
                    {c.code}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      letterSpacing: "0.15em",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {c.issued}
                  </span>
                </div>

                <div
                  style={{
                    padding: "22px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      margin: 0,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {c.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--accent)",
                      margin: 0,
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {c.issuer}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    {c.description}
                  </p>
                  {c.verifyUrl && (
                    <div style={{ marginTop: 8 }}>
                      <MagneticLink
                        external
                        href={c.verifyUrl}
                        style={{ fontSize: 12 }}
                      >
                        Verify credential{" "}
                        <span className="arrow">
                          <ArrowUpRight size={11} />
                        </span>
                      </MagneticLink>
                    </div>
                  )}
                </div>
              </SpotCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
