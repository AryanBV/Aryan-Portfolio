"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
  SiExpress,
  SiPython,
  SiAnthropic,
  SiSupabase,
  SiRazorpay,
  SiPostgresql,
  SiVercel,
  SiGithub,
  SiPytest,
} from "react-icons/si";

// ─── Data ──────────────────────────────────────────────────────────────────────

type Skill = { name: string; icon: IconType | null };
type SkillGroup = { title: string; subtitle: string; skills: Skill[] };

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "BUILD",
    subtitle: "Frontend & backend code",
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "NestJS", icon: SiNestjs },
      { name: "Express", icon: SiExpress },
    ],
  },
  {
    title: "INTEGRATE",
    subtitle: "APIs, databases, AI",
    skills: [
      { name: "Claude API", icon: SiAnthropic },
      { name: "Model Context Protocol", icon: null },
      { name: "Supabase", icon: SiSupabase },
      { name: "Razorpay", icon: SiRazorpay },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Tesseract.js", icon: null },
    ],
  },
  {
    title: "SHIP",
    subtitle: "Deploy & deliver",
    skills: [
      { name: "Vercel", icon: SiVercel },
      { name: "GitHub", icon: SiGithub },
      { name: "PWA", icon: null },
      { name: "SEO & Analytics", icon: null },
      { name: "pytest", icon: SiPytest },
      { name: "mypy", icon: null },
    ],
  },
];

// ─── Animation ─────────────────────────────────────────────────────────────────

const EASING = [0.22, 1, 0.36, 1] as const;

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Skills() {
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
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASING },
        },
      };

  return (
    <section
      ref={ref}
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
          Skills
        </motion.p>

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
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 md:mb-12"
          style={{ color: "var(--text-primary)" }}
        >
          What I build with.
        </motion.h2>

        {/* BUILD / INTEGRATE / SHIP cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {SKILL_GROUPS.map(({ title, subtitle, skills }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="card-shadow rounded-lg p-6"
              style={{ backgroundColor: "var(--bg-surface)" }}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map(({ name, icon: Icon }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm"
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {Icon && (
                      <Icon
                        className="w-4 h-4"
                        style={{ color: "var(--text-muted)" }}
                      />
                    )}
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
