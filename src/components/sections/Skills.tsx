"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiPrisma,
  SiOpenai,
  SiPython,
  SiDocker,
  SiGit,
  SiVercel,
  SiGithub,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import type { IconType } from "react-icons";

type Skill = { name: string; icon?: IconType };
type Category = { label: string; skills: Skill[] };

const CATEGORIES: Category[] = [
  {
    label: "Frontend",
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: TbBrandFramerMotion },
      { name: "shadcn/ui" },
      { name: "React Query" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "NestJS", icon: SiNestjs },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Zod" },
    ],
  },
  {
    label: "Database",
    skills: [
      { name: "Supabase", icon: SiSupabase },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Prisma", icon: SiPrisma },
      { name: "pgvector" },
    ],
  },
  {
    label: "AI / ML",
    skills: [
      { name: "OpenAI API", icon: SiOpenai },
      { name: "Claude API" },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    label: "DevOps & Tools",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Vercel", icon: SiVercel },
      { name: "Docker", icon: SiDocker },
      { name: "Railway" },
    ],
  },
];

const EASING = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASING } },
};

function SkillChip({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-2 text-sm transition-colors duration-200"
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
        color: "var(--text-secondary)",
        fontFamily: "var(--font-mono)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      {Icon && <Icon size={14} style={{ flexShrink: 0 }} />}
      {skill.name}
    </span>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EASING }}
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          Skills
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASING }}
          className="text-3xl sm:text-4xl font-bold mb-16"
          style={{ color: "var(--text-primary)" }}
        >
          What I build with.
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-10"
        >
          {CATEGORIES.map(({ label, skills }) => (
            <motion.div key={label} variants={itemVariants}>
              <p
                className="text-xs uppercase tracking-widest mb-4"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
