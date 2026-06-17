"use client";

import Reveal from "@/components/ui/Reveal";
import SpotCard from "@/components/ui/SpotCard";
import TerminalPreview from "@/components/ui/TerminalPreview";
import BrowserPreview from "@/components/ui/BrowserPreview";
import MagneticLink from "@/components/ui/MagneticLink";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  External,
} from "@/components/ui/Icons";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  projects,
  type Project,
  getProjectCaseStudyRoute,
  liveLinkLabel,
} from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  idx: string;
}

function ProjectCard({ project: p, index, idx }: ProjectCardProps) {
  const isCode = p.kind !== "web-app";
  const layout: "left" | "right" = index % 2 === 0 ? "left" : "right";
  const caseStudy = getProjectCaseStudyRoute(p);

  const preview = isCode ? (
    <TerminalPreview
      lines={p.terminalPreview ?? [`$ ${p.title}`]}
      title={`~/${p.slug}`}
    />
  ) : (
    <BrowserPreview
      image={p.image}
      url={
        p.links.live
          ? p.links.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
          : undefined
      }
      title={p.title}
    />
  );

  // Right-layout puts preview on the right side on md+. On mobile we always
  // stack preview first — no alternating, no CSS order flip. The alternation
  // happens via native grid order: layout=right swaps children via markup.
  return (
    <Reveal>
      <SpotCard style={{ padding: 24 }}>
        <div className="grid gap-6 md:gap-10 items-center grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {layout === "right" ? (
            <>
              <div className="md:order-2">{preview}</div>
              <div className="flex flex-col gap-4 md:order-1">
                <CardMeta idx={idx} status={p.status} year={p.year} />
                <CardBody p={p} caseStudy={caseStudy} />
              </div>
            </>
          ) : (
            <>
              <div>{preview}</div>
              <div className="flex flex-col gap-4">
                <CardMeta idx={idx} status={p.status} year={p.year} />
                <CardBody p={p} caseStudy={caseStudy} />
              </div>
            </>
          )}
        </div>
      </SpotCard>
    </Reveal>
  );
}

function CardMeta({
  idx,
  status,
  year,
}: {
  idx: string;
  status: Project["status"];
  year?: number;
}) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <span
        style={{
          fontSize: 12,
          color: "var(--accent)",
          letterSpacing: "0.1em",
          fontFamily: "var(--font-mono)",
        }}
      >
        {idx}
      </span>
      <div className="flex gap-2 items-center flex-wrap">
        <StatusBadge status={status} />
        {year !== undefined && (
          <span
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: "0.15em",
              fontFamily: "var(--font-mono)",
            }}
          >
            {year}
          </span>
        )}
      </div>
    </div>
  );
}

function CardBody({ p, caseStudy }: { p: Project; caseStudy: string | null }) {
  return (
    <>
      <div>
        <h3
          className="text-2xl sm:text-[1.75rem] lg:text-[2rem]"
          style={{
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: "0 0 8px 0",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            fontSize: 15,
            color: "var(--accent)",
            margin: "0 0 12px 0",
            fontWeight: 500,
          }}
        >
          {p.tagline}
        </p>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          {p.description}
        </p>
      </div>

      {p.metrics && p.metrics.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
          {p.metrics.map((m) => (
            <div key={m.label}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "var(--accent)",
                  lineHeight: 1,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginTop: 6,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 pt-1">
        {p.tech.map((t) => (
          <span
            key={t}
            style={{
              padding: "4px 10px",
              fontSize: 11,
              color: "var(--text-muted)",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--divider)",
              borderRadius: 6,
              fontFamily: "var(--font-mono)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-5 pt-2">
        {caseStudy && (
          <MagneticLink href={caseStudy} style={{ fontSize: 13 }}>
            Case study <ArrowRight size={13} />
          </MagneticLink>
        )}
        {p.links.github && (
          <MagneticLink external href={p.links.github} style={{ fontSize: 13 }}>
            <Github size={13} /> Source{" "}
            <span className="arrow">
              <ArrowUpRight size={11} />
            </span>
          </MagneticLink>
        )}
        {p.links.live && (
          <MagneticLink external href={p.links.live} style={{ fontSize: 13 }}>
            <External size={13} /> {liveLinkLabel(p.kind)}{" "}
            <span className="arrow">
              <ArrowUpRight size={11} />
            </span>
          </MagneticLink>
        )}
      </div>
    </>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 relative z-[2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 flex-wrap mb-12">
            <div>
              <div className="eyebrow-line">
                <span className="section-number">01</span>
                <span>Selected work</span>
              </div>
              <h2
                style={{
                  fontSize: "var(--fluid-h2)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                  margin: "20px 0 0",
                  maxWidth: 720,
                }}
              >
                Production systems.{" "}
                <span style={{ color: "var(--text-muted)" }}>Not demos.</span>
              </h2>
            </div>
            <MagneticLink
              external
              href="https://github.com/AryanBV?tab=repositories"
              style={{ fontSize: 13 }}
            >
              All projects on GitHub{" "}
              <span className="arrow">
                <ArrowUpRight size={12} />
              </span>
            </MagneticLink>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              idx={`/${String(i + 1).padStart(2, "0")}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
