"use client";

import { useReducedMotion, motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
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
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "5rem" }}
    >
      {/* Spotlight background */}
      <Spotlight
        fill="rgba(245, 166, 35, 0.15)"
        className="-top-40 left-0 md:left-60 md:-top-20"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 w-full py-16 md:py-24 lg:py-32">
        {/* Mobile photo — centered above headline */}
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="flex justify-center mb-8 md:hidden"
        >
          <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-[var(--accent-subtle)]">
            <Image
              src="/images/Aryan Profile Picture.jpeg"
              alt="Aryan B V"
              fill
              sizes="112px"
              className="object-cover object-top"
              priority
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
          {/* Left — Text content */}
          <div className="text-center md:text-left">
            {/* Headline */}
            <h1>
              <TextGenerateEffect
                words="I turn business problems into production software."
                highlightWord="production"
              />
            </h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 text-base md:text-lg text-[var(--text-secondary)]"
            >
              Full-stack engineer who built the system that replaced a 15-year
              paper workflow.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
              className="flex flex-wrap justify-center md:justify-start gap-4 mt-8"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--bg-base)] font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              >
                View My Work
                <FiArrowDown size={14} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] px-6 py-3 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Resume link */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
              className="mt-4 text-center md:text-left"
            >
              <a
                href="/Aryan_BV_Resume_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              >
                Download Resume &#8599;
              </a>
            </motion.div>

            {/* Tech stack line */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
              className="mt-8 text-sm text-[var(--text-muted)] font-mono"
            >
              Currently building with Next.js · React · Supabase · Claude API
            </motion.p>
          </div>

          {/* Right — Desktop photo */}
          <motion.div
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              scale: prefersReducedMotion ? 1 : 0.96,
            }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden md:flex justify-center items-center"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden ring-2 ring-[var(--accent-subtle)]">
              <Image
                src="/images/Aryan Profile Picture.jpeg"
                alt="Aryan B V"
                fill
                sizes="(min-width: 768px) 288px, 256px"
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
