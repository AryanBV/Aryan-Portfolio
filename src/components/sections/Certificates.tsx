import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SpotCard from "@/components/ui/SpotCard";
import MagneticLink from "@/components/ui/MagneticLink";
import { ArrowUpRight } from "@/components/ui/Icons";
import { certificates } from "@/lib/certificates";

// Certificate card: the whole document is visible — these are proof
// artifacts, not hero images, so cropping them (objectFit: cover) was wrong.
//   - objectFit: "contain" + inner padding so the full certificate fits.
//   - Letterbox fills with the elevated surface so it reads as intentional.
//   - Code + year chips moved OUT of the image overlay into a dedicated
//     meta bar between the image and the content — they couldn't anchor
//     reliably on the image bottom once the image stopped filling the
//     container.
//   - Subtle zoom on hover to match project-card interaction language.
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
                className="cert-card"
                style={{
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Image banner — padded + contained so whole cert is visible */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 10",
                    padding: 16,
                    background: "var(--bg-elevated)",
                    borderBottom: "1px solid var(--divider)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="cert-image-wrap"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      transition: "transform 500ms var(--ease-emph)",
                    }}
                  >
                    <Image
                      src={c.image}
                      alt={`${c.name} certificate`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                </div>

                {/* Meta bar — code + year */}
                <div
                  style={{
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    borderBottom: "1px solid var(--divider)",
                    background: "var(--bg-surface)",
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
                      border: "1px solid var(--accent-subtle)",
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

                {/* Content */}
                <div
                  style={{
                    padding: "20px 24px 24px",
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
                    <div style={{ marginTop: "auto", paddingTop: 12 }}>
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

      <style>{`
        .cert-card:hover .cert-image-wrap {
          transform: scale(1.03);
        }
        @media (prefers-reduced-motion: reduce) {
          .cert-card:hover .cert-image-wrap { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
