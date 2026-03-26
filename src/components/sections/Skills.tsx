"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";

// ─── Data ──────────────────────────────────────────────────────────────────────

type SkillColumn = { heading: string; items: string[] };

const COLUMNS: SkillColumn[] = [
  {
    heading: "BUILD",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "Express",
    ],
  },
  {
    heading: "INTEGRATE",
    items: [
      "Claude API",
      "Supabase",
      "Razorpay",
      "PostgreSQL",
      "Tesseract.js (OCR)",
    ],
  },
  {
    heading: "SHIP",
    items: ["Vercel", "GitHub", "PWA", "SEO & Analytics"],
  },
];

type Certificate = {
  id: string;
  name: string;
  code: string;
  issuer: string;
  issued: string;
  verifyUrl: string;
  image: string;
  description: string;
};

const CERTIFICATES: Certificate[] = [
  {
    id: "az-900-ai",
    name: "Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    issued: "2024",
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/AryanSalian-4114/878ECBC7C3BE4794?sharingId=D3203799C3E8D012",
    image: "/images/microsoft-cert.png",
    description:
      "Core AI and machine learning concepts on Microsoft Azure — covering ML workloads, computer vision, NLP, and generative AI fundamentals.",
  },
  {
    id: "apna-alpha",
    name: "Java & Data Structures — Alpha Batch",
    code: "ALPHA",
    issuer: "Apna College",
    issued: "2023",
    verifyUrl: "https://www.apnacollege.in/course/alpha-placement-course",
    image: "/images/alpha-certificate.png",
    description:
      "Comprehensive Java and Data Structures & Algorithms course — covering arrays, linked lists, trees, graphs, dynamic programming, OOP, and placement-ready problem solving.",
  },
  {
    id: "apna-delta",
    name: "Full Stack Web Development — Delta Batch",
    code: "DELTA",
    issuer: "Apna College",
    issued: "2024",
    verifyUrl: "https://www.apnacollege.in/course/delta",
    image: "/images/delta-certificate.png",
    description:
      "Complete MERN stack development — HTML, CSS, JavaScript, Node.js, Express.js, React, MongoDB, REST APIs, and full-stack deployment.",
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
      <div className="max-w-3xl mx-auto">
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
          What I build with.
        </motion.h2>

        {/* BUILD / INTEGRATE / SHIP columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {COLUMNS.map(({ heading, items }) => (
            <motion.div
              key={heading}
              variants={itemVariants}
              className="border-l-2 border-[var(--border)] pl-4"
            >
              <p
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {heading}
              </p>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="text-base"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Certifications ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.3,
            ease: EASING,
          }}
          className="mt-12 md:mt-16"
        >
          <p
            className="text-xs tracking-[0.2em] uppercase mb-6 md:mb-8"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Certifications
          </p>

          <div className="flex flex-col gap-6">
            {/* Azure AI-900 — prominent */}
            {CERTIFICATES.filter((c) => c.id === "az-900-ai").map((cert) => (
              <div
                key={cert.id}
                className="overflow-hidden card-shadow rounded-lg"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                {cert.image && (
                  <div className="relative w-full h-44 sm:h-52">
                    <Image
                      src={cert.image}
                      alt={`${cert.name} certificate`}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                <div className="p-5 sm:p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className="text-xs px-2 py-0.5 self-start mb-1 rounded-sm"
                        style={{
                          backgroundColor: "var(--accent-dim)",
                          color: "var(--accent)",
                          border: "1px solid var(--border)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {cert.code}
                      </span>
                      <h3
                        className="text-base sm:text-lg font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {cert.name}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {cert.issuer} · {cert.issued}
                      </p>
                    </div>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${cert.name} certificate`}
                      className="shrink-0 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                    >
                      <FiExternalLink size={16} />
                    </a>
                  </div>
                  <div style={{ borderTop: "1px solid var(--border)" }} />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Apna College certs — compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATES.filter((c) => c.id !== "az-900-ai").map((cert) => (
                <div
                  key={cert.id}
                  className="overflow-hidden card-shadow rounded-lg"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {cert.image && (
                    <div className="relative w-full h-32">
                      <Image
                        src={cert.image}
                        alt={`${cert.name} certificate`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-0.5">
                        <h3
                          className="text-sm font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {cert.name}
                        </h3>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {cert.issuer} · {cert.issued}
                        </p>
                      </div>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Verify ${cert.name} certificate`}
                        className="shrink-0 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                      >
                        <FiExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
