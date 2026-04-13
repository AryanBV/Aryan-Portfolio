"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { DeviceFrame } from "@/components/ui/device-frame";
import { TerminalFrame } from "@/components/ui/terminal-frame";
import {
  getFeaturedProject,
  getRestProjects,
  getProjectCaseStudyRoute,
  type Project,
  type ProjectStatus,
} from "@/lib/projects";

// ─── Animation variants ────────────────────────────────────────────────────────

const EASING = [0.22, 1, 0.36, 1] as const;

// Variants are defined inside the component to access useReducedMotion

// ─── Live-link label derivation ────────────────────────────────────────────────

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

// ─── Status badge ──────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<ProjectStatus, { color: string; bg: string }> = {
  Live: { color: "var(--status-live)", bg: "var(--accent-dim)" },
  Prototype: { color: "var(--text-muted)", bg: "var(--bg-elevated)" },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const { color, bg } = STATUS_COLORS[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full"
      style={{ color, backgroundColor: bg }}
    >
      {status}
    </span>
  );
}

// ─── Tech pill ─────────────────────────────────────────────────────────────────

function TechPill({ label }: { label: string }) {
  return (
    <span
      className="px-2.5 py-1 text-xs"
      style={{
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
        fontFamily: "var(--font-mono)",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      {label}
    </span>
  );
}

// ─── Project links ─────────────────────────────────────────────────────────────

function ProjectLinks({ project }: { project: Project }) {
  const caseStudyRoute = getProjectCaseStudyRoute(project);
  const liveLinkLabel = getLiveLinkLabel(project.kind);

  const hasAnyLink =
    caseStudyRoute || project.links.live || project.links.github;
  if (!hasAnyLink) return null;

  const linkClass =
    "text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]";

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {caseStudyRoute && (
        <a href={caseStudyRoute} className={linkClass}>
          Read Case Study &rarr;
        </a>
      )}
      {project.links.live && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {liveLinkLabel} &#8599;
        </a>
      )}
      {project.links.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Source Code &#8599;
        </a>
      )}
    </div>
  );
}

// ─── Image or placeholder ──────────────────────────────────────────────────────

function ProjectImage({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative w-full aspect-[16/10]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
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
}

// ─── Framed image — picks DeviceFrame for web apps, TerminalFrame otherwise ────

function FramedImage({ project }: { project: Project }) {
  const content = <ProjectImage project={project} />;
  if (project.kind === "web-app") {
    return <DeviceFrame url={project.links.live}>{content}</DeviceFrame>;
  }
  return <TerminalFrame label={`~ $ ${project.slug}`}>{content}</TerminalFrame>;
}

// ─── Featured project card ─────────────────────────────────────────────────────

function FeaturedCard({
  project,
  itemVariants,
}: {
  project: Project;
  itemVariants: import("framer-motion").Variants;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-lg overflow-hidden card-shadow card-shadow-hover"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      {/* Image in frame — left on desktop */}
      <div className="p-4 md:p-6">
        <FramedImage project={project} />
      </div>

      {/* Content — right on desktop */}
      <div className="flex flex-col gap-5 p-6 md:p-8 md:pl-0">
        <div className="flex items-center gap-3">
          <StatusBadge status={project.status} />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Featured
          </span>
        </div>

        <div>
          <h3
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.tagline}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechPill key={t} label={t} />
          ))}
        </div>

        <ProjectLinks project={project} />
      </div>
    </motion.div>
  );
}

// ─── Regular project card ──────────────────────────────────────────────────────

function ProjectCard({
  project,
  itemVariants,
}: {
  project: Project;
  itemVariants: import("framer-motion").Variants;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col rounded-lg overflow-hidden card-shadow"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      {/* Framed image */}
      <div className="p-4">
        <FramedImage project={project} />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between gap-5 p-6 pt-2 flex-1">
        <div className="flex flex-col gap-4">
          <StatusBadge status={project.status} />

          <div>
            <h3
              className="text-lg font-bold mb-1.5"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </h3>
            <p
              className="text-xs mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.tagline}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <TechPill key={t} label={t} />
            ))}
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

  const itemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASING },
        },
      };

  const featured = getFeaturedProject();
  const rest = getRestProjects();

  return (
    <section
      ref={ref}
      id="projects"
      className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 12 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            ease: EASING,
          }}
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          Projects
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 16 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.05,
            ease: EASING,
          }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 lg:mb-16"
          style={{ color: "var(--text-primary)" }}
        >
          Production systems,{" "}
          <span style={{ color: "var(--text-secondary)" }}>
            not demo projects.
          </span>
        </motion.h2>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-6 md:gap-8"
        >
          {/* Featured card — full width */}
          <FeaturedCard project={featured} itemVariants={itemVariants} />

          {/* Remaining cards — 2-column grid, own stagger context */}
          {rest.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              {rest.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  itemVariants={itemVariants}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
