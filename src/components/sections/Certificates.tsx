"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { certificates } from "@/lib/certificates";
import { SafeExternalLink } from "@/components/ui/safe-external-link";

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
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          Certifications
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
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 md:mb-8"
          style={{ color: "var(--text-primary)" }}
        >
          Verified credentials.
        </motion.h2>

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
          {certificates.map((cert) => (
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
                      className="text-base sm:text-lg font-semibold"
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
                  {cert.verifyUrl && (
                    <SafeExternalLink
                      href={cert.verifyUrl}
                      aria-label={`Verify ${cert.name} certificate`}
                      className="shrink-0 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                    >
                      <FiExternalLink size={16} />
                    </SafeExternalLink>
                  )}
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
