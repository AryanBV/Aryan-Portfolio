"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const PROJECT_HIGHLIGHTS = [
  {
    name: "AJSP Manager",
    description:
      "A full-stack PWA that digitized a 15-year paper workflow for a retail business. Used daily in production.",
  },
  {
    name: "Lumina Crafts",
    description:
      "A custom e-commerce platform with admin dashboard and Razorpay integration, built for a client.",
  },
  {
    name: "SMART_MED",
    description:
      "An AI-powered health management prototype with OCR and family tree visualization.",
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const sectionVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

  const itemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      ref={ref}
      id="services"
      className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 12 }
          }
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.5 }}
          className="text-xs tracking-[0.2em] uppercase mb-8 md:mb-12"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          Services
        </motion.p>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-8"
        >
          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Work With Me
          </motion.h2>

          {/* Intro */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            I build production web applications — from full-stack platforms to
            AI-integrated tools. Here&apos;s what I&apos;ve shipped:
          </motion.p>

          {/* Project highlight cards */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            {PROJECT_HIGHLIGHTS.map(({ name, description }) => (
              <div
                key={name}
                className="p-4 rounded-lg card-shadow"
                style={{
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <p
                  className="font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {name}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            I&apos;m available for freelance and contract work. If you have a
            project that needs a developer who ships production software, not
            just prototypes — let&apos;s talk.
          </motion.p>

          <motion.div variants={itemVariants}>
            <a
              href="#contact"
              className="inline-block border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] px-6 py-3 rounded-lg transition-colors"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
