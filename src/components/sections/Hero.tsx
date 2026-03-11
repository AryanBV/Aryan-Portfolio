"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import Image from "next/image";

// --- Animation variants ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// --- Animated stat counter ---
function StatCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.8, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Hero() {
  const [contributions, setContributions] = useState(544);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { totalContributions: number } | null) => {
        if (d?.totalContributions) setContributions(d.totalContributions);
      })
      .catch(() => {}); // non-fatal — counter stays at 0
  }, []);

  const STATS = [
    { value: 2, suffix: "", label: "Live Production\nSystems", static: false },
    {
      value: contributions,
      suffix: "+",
      label: "GitHub\nContributions",
      static: false,
    },
    {
      value: 0,
      suffix: "",
      label: "Azure AI\nCertified",
      static: true,
      display: "AI-900",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{ paddingTop: "5rem" }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Eyebrow label */}
            <motion.p
              variants={itemVariants}
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              Full-Stack Developer · AI/ML Engineer
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              I build production systems that{" "}
              <span style={{ color: "var(--accent)" }}>
                run in the real world.
              </span>
            </motion.h1>

            {/* Role animation */}
            <motion.div
              variants={itemVariants}
              className="text-lg"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <TypeAnimation
                sequence={[
                  "Next.js · NestJS · Supabase",
                  2500,
                  "OpenAI API · Claude API · pgvector",
                  2500,
                  "TypeScript · PostgreSQL · Vercel",
                  2500,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#0a0a0a",
                  fontFamily: "var(--font-mono)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View My Work
                <FiArrowDown size={14} />
              </a>
              <a
                href="/Aryan_BV_Resume_2026.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200"
                style={{
                  border: "1px solid var(--border-hover)",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <FiDownload size={14} />
                Download Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-6"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {STATS.map(
                ({ value, suffix, label, static: isStatic, display }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {isStatic ? (
                        <span>{display}</span>
                      ) : (
                        <StatCounter value={value} suffix={suffix} />
                      )}
                    </p>
                    <p
                      className="text-xs leading-tight whitespace-pre-line"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {label}
                    </p>
                  </div>
                ),
              )}
            </motion.div>
          </motion.div>

          {/* Right — Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center"
          >
            <div
              className="relative w-80 h-80"
              style={{ border: "1px solid var(--border)" }}
            >
              <Image
                src="/images/Aryan Profile Picture.jpeg"
                alt="Aryan B V"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Accent corner — top left */}
              <span
                className="absolute -top-px -left-px w-8 h-8"
                style={{
                  borderTop: "2px solid var(--accent)",
                  borderLeft: "2px solid var(--accent)",
                }}
              />
              {/* Accent corner — bottom right */}
              <span
                className="absolute -bottom-px -right-px w-8 h-8"
                style={{
                  borderBottom: "2px solid var(--accent)",
                  borderRight: "2px solid var(--accent)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
