import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectSlugs,
  projects,
  liveLinkLabel,
  type Project,
} from "@/lib/projects";
import BrowserPreview from "@/components/ui/BrowserPreview";
import StatusBadge from "@/components/ui/StatusBadge";
import TerminalPreview from "@/components/ui/TerminalPreview";
import SpotCard from "@/components/ui/SpotCard";
import Reveal from "@/components/ui/Reveal";
import MagneticLink from "@/components/ui/MagneticLink";
import { JsonLd } from "@/components/ui/json-ld";
import { InstallSnippet } from "@/components/ui/install-snippet";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  External,
} from "@/components/ui/Icons";

// ─── Static generation ──────────────────────────────────────────────────────

const SITE_ORIGIN = "https://aryanbv.com";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = `${project.title} | Aryan B V`;
  const description = project.description;
  const url = `${SITE_ORIGIN}/projects/${project.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      // images auto-injected from src/app/projects/[slug]/opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ─── JSON-LD ────────────────────────────────────────────────────────────────

function getProjectJsonLd(project: Project): Record<string, unknown> {
  const isWebApp = project.kind === "web-app";
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": isWebApp ? "WebApplication" : "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: isWebApp
      ? "BusinessApplication"
      : "DeveloperApplication",
    operatingSystem: isWebApp ? "Web" : "Cross-platform",
    author: { "@type": "Person", name: "Aryan B V", url: SITE_ORIGIN },
    url: project.links.live ?? `${SITE_ORIGIN}/projects/${project.slug}`,
  };
  // Only the genuinely free, installable open-source packages get a price-0
  // Offer — asserting "free" on client/commercial web-apps is inaccurate
  // structured data Google may flag.
  if (!isWebApp) {
    ld.offers = { "@type": "Offer", price: "0", priceCurrency: "USD" };
  }
  if (project.links.github) ld.codeRepository = project.links.github;
  if (project.image) ld.image = `${SITE_ORIGIN}${project.image}`;
  return ld;
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !project.caseStudy) notFound();

  const cs = project.caseStudy;
  const isCode = project.kind !== "web-app";
  const liveLabel = liveLinkLabel(project.kind, { verbose: true });

  // Next-project nav at the bottom
  const caseStudySlugs = getProjectSlugs();
  const currentIdx = caseStudySlugs.indexOf(slug);
  const nextSlug =
    currentIdx < caseStudySlugs.length - 1
      ? caseStudySlugs[currentIdx + 1]
      : null;
  const nextProject = nextSlug
    ? projects.find((p) => p.slug === nextSlug)
    : null;

  const preview = isCode ? (
    <TerminalPreview
      lines={project.terminalPreview ?? [`$ ${project.title}`]}
      title={`~/${project.slug}`}
    />
  ) : (
    <BrowserPreview
      image={project.image}
      url={
        project.links.live
          ? project.links.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
          : undefined
      }
      title={project.title}
    />
  );

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        paddingTop: "clamp(6rem, 14vh, 9rem)",
        paddingBottom: "clamp(3rem, 6vh, 5rem)",
      }}
    >
      <JsonLd data={getProjectJsonLd(project)} id={`ld-${project.slug}`} />

      {/* Ambient washes — same visual language as Hero */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "50%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle at center, rgba(245,166,35,0.12), transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "40%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle at center, rgba(255,107,53,0.06), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-[1]">
        {/* Back link */}
        <Reveal>
          <Link
            href="/#projects"
            className="magnetic-link"
            style={{ fontSize: 13 }}
          >
            ← Back to work
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal>
          <header style={{ marginTop: 32 }}>
            <div className="eyebrow-line">
              <span className="section-number">Case study</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ color: "var(--text-muted)" }}>{project.slug}</span>
            </div>

            <div
              className="flex flex-wrap items-baseline gap-4"
              style={{ marginTop: 20 }}
            >
              <h1
                style={{
                  fontSize: "var(--fluid-h1)",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  margin: 0,
                  color: "var(--text-primary)",
                }}
              >
                {project.title}
              </h1>
              <StatusBadge status={project.status} />
            </div>

            <p
              style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)",
                color: "var(--accent)",
                fontWeight: 500,
                lineHeight: 1.45,
                marginTop: 16,
                maxWidth: 720,
              }}
            >
              {cs.tagline}
            </p>

            <div
              className="flex flex-wrap gap-5"
              style={{ marginTop: 24, fontSize: 13 }}
            >
              {project.links.live && (
                <MagneticLink external href={project.links.live}>
                  <External size={13} /> {liveLabel}{" "}
                  <span className="arrow">
                    <ArrowUpRight size={11} />
                  </span>
                </MagneticLink>
              )}
              {project.links.github && (
                <MagneticLink external href={project.links.github}>
                  <Github size={13} /> Source{" "}
                  <span className="arrow">
                    <ArrowUpRight size={11} />
                  </span>
                </MagneticLink>
              )}
            </div>
          </header>
        </Reveal>

        {/* Preview — terminal or browser chrome */}
        <Reveal>
          <div style={{ marginTop: 48 }}>{preview}</div>
        </Reveal>

        {/* Metrics row — surfaces headline numbers where present */}
        {project.metrics && project.metrics.length > 0 && (
          <Reveal stagger>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              style={{
                marginTop: 24,
              }}
            >
              {project.metrics.map((m) => (
                <SpotCard
                  key={m.label}
                  style={{
                    padding: "20px 24px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                      fontWeight: 600,
                      color: "var(--accent)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-muted)",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      marginTop: 8,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {m.label}
                  </div>
                </SpotCard>
              ))}
            </div>
          </Reveal>
        )}

        {/* Install */}
        {project.install && project.install.length > 0 && (
          <Reveal>
            <section style={{ marginTop: 48 }}>
              <div className="eyebrow-line">
                <span className="section-number">Install</span>
              </div>
              <div style={{ marginTop: 16 }}>
                <InstallSnippet install={project.install} />
              </div>
            </section>
          </Reveal>
        )}

        {/* ── Narrative sections: Challenge / Approach / Impact ─────── */}
        <div
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            gap: 64,
          }}
        >
          <Reveal>
            <section style={{ maxWidth: 760 }}>
              <div className="eyebrow-line">
                <span className="section-number">01</span>
                <span>The challenge</span>
              </div>
              <h2
                style={{
                  fontSize: "var(--fluid-h2)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  margin: "20px 0 20px",
                }}
              >
                Why this needed to exist.
              </h2>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                {cs.challenge}
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section style={{ maxWidth: 760 }}>
              <div className="eyebrow-line">
                <span className="section-number">02</span>
                <span>The approach</span>
              </div>
              <h2
                style={{
                  fontSize: "var(--fluid-h2)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  margin: "20px 0 20px",
                }}
              >
                How I built it.
              </h2>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                {cs.approach}
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section style={{ maxWidth: 760 }}>
              <div className="eyebrow-line">
                <span className="section-number">03</span>
                <span>Impact</span>
              </div>
              <h2
                style={{
                  fontSize: "var(--fluid-h2)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  margin: "20px 0 20px",
                }}
              >
                What it did.
              </h2>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                {cs.impact}
              </p>
            </section>
          </Reveal>
        </div>

        {/* Tech stack grid */}
        <Reveal>
          <section style={{ marginTop: 96 }}>
            <div className="eyebrow-line">
              <span className="section-number">04</span>
              <span>Tech stack</span>
            </div>
            <h2
              style={{
                fontSize: "var(--fluid-h2)",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                margin: "20px 0 32px",
              }}
            >
              What I used &mdash;{" "}
              <span style={{ color: "var(--text-muted)" }}>and why.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cs.techDetails.map((t) => (
                <SpotCard key={t.name} style={{ padding: "22px 24px" }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--accent)",
                      margin: 0,
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontSize: 13.5,
                      color: "var(--text-secondary)",
                      marginTop: 10,
                      marginBottom: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {t.reason}
                  </p>
                </SpotCard>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Closer CTA */}
        <Reveal>
          <section style={{ marginTop: 96, textAlign: "center" }}>
            <h2
              style={{
                fontSize: "var(--fluid-h2)",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                margin: 0,
                maxWidth: 720,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Want something{" "}
              <span
                style={{
                  color: "var(--accent)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                similar?
              </span>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                marginTop: 14,
                maxWidth: 520,
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.55,
              }}
            >
              Available for freelance projects and contract engineering. Usually
              reply within 24 hours.
            </p>
            <div
              className="flex flex-wrap gap-3 justify-center"
              style={{ marginTop: 28 }}
            >
              <Link href="/#contact" className="btn-xl primary">
                Let&apos;s talk <ArrowRight size={14} />
              </Link>
              <Link href="/#projects" className="btn-xl ghost">
                More work <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </Reveal>

        {/* Bottom nav */}
        <nav
          className="flex flex-wrap items-center justify-between gap-4"
          style={{
            marginTop: 80,
            paddingTop: 32,
            borderTop: "1px solid var(--divider)",
          }}
        >
          <MagneticLink href="/#projects" style={{ fontSize: 13 }}>
            ← Back to all work
          </MagneticLink>
          {nextProject && nextProject.caseStudy && (
            <MagneticLink
              href={`/projects/${nextProject.slug}`}
              style={{ fontSize: 13 }}
            >
              Next: {nextProject.title}{" "}
              <span className="arrow">
                <ArrowRight size={12} />
              </span>
            </MagneticLink>
          )}
        </nav>
      </div>
    </main>
  );
}
