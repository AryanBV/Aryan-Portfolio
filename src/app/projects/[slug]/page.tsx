import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectSlugs,
  projects,
  type Project,
} from "@/lib/projects";
import { DeviceFrame } from "@/components/ui/device-frame";
import { TerminalFrame } from "@/components/ui/terminal-frame";

// ─── Static generation ──────────────────────────────────────────────────────

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
  return {
    title: `${project.title} | Aryan B V`,
    description: project.description,
  };
}

// ─── Live-link label derivation ─────────────────────────────────────────────

function getLiveLinkLabel(kind: Project["kind"]): string {
  switch (kind) {
    case "library":
      return "View on PyPI";
    case "mcp-server":
    case "cli":
      return "View on npm";
    case "web-app":
    default:
      return "View Live";
  }
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

  // Find next case study project for bottom navigation
  const caseStudySlugs = getProjectSlugs();
  const currentIndex = caseStudySlugs.indexOf(slug);
  const nextSlug =
    currentIndex < caseStudySlugs.length - 1
      ? caseStudySlugs[currentIndex + 1]
      : null;
  const nextProject = nextSlug
    ? projects.find((p) => p.slug === nextSlug)
    : null;

  // Image or gradient-fallback content used inside both frame variants
  const imageContent = project.image ? (
    <div className="relative w-full aspect-[16/10]">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover object-top"
        priority
      />
    </div>
  ) : (
    <div
      className="aspect-[16/10] w-full flex flex-col items-center justify-center gap-3"
      style={{
        background:
          "linear-gradient(to bottom, var(--bg-surface), var(--bg-elevated))",
      }}
    >
      <span
        className="text-lg font-semibold"
        style={{ color: "var(--text-muted)" }}
      >
        {project.title}
      </span>
      <span
        className="text-xs"
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          opacity: 0.7,
        }}
      >
        {project.tech.join(" · ")}
      </span>
    </div>
  );

  return (
    <main
      className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-16"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-3xl mx-auto space-y-12 md:space-y-16 lg:space-y-20">
        {/* ── Back nav ─────────────────────────────────────────────── */}
        <nav>
          <Link
            href="/#projects"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            &larr; Back to Projects
          </Link>
        </nav>

        {/* ── Header ───────────────────────────────────────────────── */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full"
              style={{
                color:
                  project.status === "Live"
                    ? "var(--status-live)"
                    : "var(--text-muted)",
                backgroundColor:
                  project.status === "Live"
                    ? "var(--accent-dim)"
                    : "var(--bg-elevated)",
              }}
            >
              {project.status}
            </span>
            <span
              className="text-xs"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {project.tech.join(" · ")}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h1>

          <p
            className="text-lg md:text-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {cs.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                {getLiveLinkLabel(project.kind)} &#8599;
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                Source Code &#8599;
              </a>
            )}
          </div>
        </header>

        {/* ── Device / terminal frame screenshot ───────────────────── */}
        <div className="max-w-4xl mx-auto">
          {project.kind === "web-app" ? (
            <DeviceFrame url={project.links.live}>{imageContent}</DeviceFrame>
          ) : (
            <TerminalFrame label={`~ $ ${project.slug}`}>
              {imageContent}
            </TerminalFrame>
          )}
        </div>

        {/* ── The Challenge ────────────────────────────────────────── */}
        <section>
          <p
            className="text-sm uppercase tracking-[0.2em] mb-4"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            The Challenge
          </p>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {cs.challenge}
          </p>
        </section>

        {/* ── The Approach ─────────────────────────────────────────── */}
        <section>
          <p
            className="text-sm uppercase tracking-[0.2em] mb-4"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            The Approach
          </p>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {cs.approach}
          </p>
        </section>

        {/* ── The Impact ───────────────────────────────────────────── */}
        <section>
          <p
            className="text-sm uppercase tracking-[0.2em] mb-4"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            The Impact
          </p>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {cs.impact}
          </p>
        </section>

        {/* ── Tech Stack ───────────────────────────────────────────── */}
        <section>
          <p
            className="text-sm uppercase tracking-[0.2em] mb-6"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Tech Stack
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cs.techDetails.map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded-lg card-shadow"
                style={{ backgroundColor: "var(--bg-surface)" }}
              >
                <p
                  className="text-sm font-medium"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {tech.name}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {tech.reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom navigation ────────────────────────────────────── */}
        <nav
          className="flex items-center justify-between pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <Link
            href="/#projects"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            &larr; Back to Projects
          </Link>
          {nextProject && nextProject.caseStudy && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              {nextProject.title} &rarr;
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
