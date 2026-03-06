"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const EASING = [0.22, 1, 0.36, 1] as const;

const CERTIFICATES = [
  {
    id: "az-900-ai",
    name: "Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    issued: "2024",
    verifyUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/",
    description:
      "Core AI and machine learning concepts on Microsoft Azure — covering ML workloads, computer vision, NLP, and generative AI fundamentals.",
  },
];

export default function Certificates() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EASING }}
          className="text-xs tracking-[0.2em] uppercase mb-10"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          Certifications
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASING }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="p-6 flex flex-col gap-5"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-xs px-2 py-0.5 self-start mb-2"
                    style={{
                      backgroundColor: "var(--accent-dim)",
                      color: "var(--accent)",
                      border: "1px solid var(--accent)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {cert.code}
                  </span>
                  <h3
                    className="text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {cert.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {cert.issuer} · {cert.issued}
                  </p>
                </div>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Verify certificate"
                  className="shrink-0 transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
