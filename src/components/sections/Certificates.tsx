"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";

// ─── Data ──────────────────────────────────────────────────────────────────────

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
    name: "Microsoft Azure AI Fundamentals (AI-900)",
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

export default function Certificates() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="certifications"
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
          className="text-xs tracking-[0.2em] uppercase mb-6 md:mb-8"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          Certifications
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.05,
            ease: EASING,
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col overflow-hidden card-shadow rounded-lg"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              {cert.image && (
                <div className="relative w-full h-36 sm:h-40">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certificate`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
              )}
              <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-3">
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
                      className="text-sm sm:text-base font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {cert.name}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {cert.issuer} &middot; {cert.issued}
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
        </motion.div>
      </div>
    </section>
  );
}
