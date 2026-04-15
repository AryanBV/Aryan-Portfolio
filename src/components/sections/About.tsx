"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function About() {
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
      id="about"
      className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 12 }
          }
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.5 }}
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          About
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
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 md:mb-12"
          style={{ color: "var(--text-primary)" }}
        >
          The story behind the code.
        </motion.h2>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-8 lg:gap-12"
        >
          {/* Story text */}
          <div className="max-w-2xl flex flex-col gap-6">
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              I grew up in Kodagu, Karnataka, where my family runs Amar Jyothi
              Spare Parts — an automotive parts retail business. Watching
              purchases get tracked in paper notebooks, supplier records filed
              away in cabinets, and the entire stock counted by hand every six
              months showed me firsthand how much time manual processes consume.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              So I built AJSP Manager — a full-stack PWA that replaced that
              15-year paper workflow. It&apos;s been in daily production use
              since launch. That experience shaped how I approach every project:
              start with a real problem, build something that actually gets
              used.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              The PDF trilogy came from going a layer deeper when the shallow
              fix wasn&apos;t enough. I started with pdf-toolkit-mcp — a
              zero-config MCP server for everyday PDF tasks like
              Markdown-to-PDF, merging, and form filling — and hit the limits of
              existing PDF editing libraries, which cover the original text with
              a white rectangle and stamp replacements in a substitute font,
              silently destroying fonts and kerning. So I built pdf-edit-engine,
              a Python library that modifies content-stream operators in place
              and keeps fonts, kerning, and pixel positioning intact, shipped to
              PyPI with 628 tests under mypy strict, validated across seven PDF
              generators. Then I wrapped the engine in pdf-edit-mcp so AI agents
              get the same format-preserving editing through 38 tools with
              Zod-validated inputs and a long-running Python bridge. Same habit
              as AJSP, applied to a different kind of problem: go deep enough to
              actually fix it.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Whether it&apos;s a family business running on paper or a PDF
              library that covers text with a rectangle, the habit is the same:
              find the real problem, build what actually fixes it, ship it with
              enough discipline to trust the result. Based in Bangalore, open to
              freelance projects and full-time roles.
            </motion.p>
          </div>

          {/* Education card */}
          <motion.div variants={itemVariants} className="max-w-2xl">
            <div
              className="p-6 rounded-lg flex flex-col gap-5 card-shadow"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Education
                  </p>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    B.Tech — Artificial Intelligence & Machine Learning
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    M S Ramaiah University of Applied Sciences
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid var(--border)" }} />

              {/* Meta row */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Year", value: "2021 – 2025" },
                  { label: "GPA", value: "8.0 / 10" },
                  { label: "Location", value: "Bangalore, IN" },
                  { label: "Certification", value: "Azure AI-900" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p
                      className="text-xs uppercase tracking-wider mb-1"
                      style={{
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
