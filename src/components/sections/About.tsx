'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const STRENGTHS = [
  {
    label: 'Production-first mindset',
    detail: 'Every project I ship runs in a real environment — not just a demo.',
  },
  {
    label: 'Full-stack + AI in one',
    detail: 'I combine end-to-end engineering with practical AI/ML integration.',
  },
  {
    label: 'SME domain expertise',
    detail: 'Deep understanding of Indian SME operations and export processes — rare for a 2025 grad.',
  },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.2em] uppercase mb-12"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
        >
          About
        </motion.p>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >

          {/* Left — Bio */}
          <div className="flex flex-col gap-8">
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              I engineer systems end-to-end —{' '}
              <span style={{ color: 'var(--text-secondary)' }}>
                from database schema to deployed product.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I&apos;m a Full-Stack Developer and AI/ML Engineer based in Bangalore.
              I specialize in building end-to-end production systems — from e-commerce
              platforms processing live payments to business management tools running
              daily in an automotive retail environment.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I bring domain expertise in SME operations and Indian export processes,
              which shapes how I think about the software I build. My stack centers
              on Next.js, NestJS, Supabase, and the OpenAI and Claude APIs.
            </motion.p>

            {/* Strengths */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 pt-2">
              {STRENGTHS.map(({ label, detail }) => (
                <div key={label} className="flex gap-4">
                  <span
                    className="mt-1 shrink-0 w-1 h-1 rounded-full self-start translate-y-2"
                    style={{ backgroundColor: 'var(--accent)', minWidth: '4px', minHeight: '4px' }}
                  />
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                    >
                      {label}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Education card */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div
              className="p-6 flex flex-col gap-5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                  >
                    Education
                  </p>
                  <h3
                    className="text-base font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    B.Tech — Artificial Intelligence & Machine Learning
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    M S Ramaiah University of Applied Sciences
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid var(--border)' }} />

              {/* Meta row */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Year', value: '2021 – 2025' },
                  { label: 'GPA',  value: '8.0 / 10' },
                  { label: 'Location', value: 'Bangalore, IN' },
                  { label: 'Certification', value: 'Azure AI-900' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p
                      className="text-xs uppercase tracking-wider mb-1"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                      {label}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently building card */}
            <div
              className="p-6"
              style={{
                backgroundColor: 'var(--accent-dim)',
                border: '1px solid var(--accent)',
                borderLeftWidth: '3px',
              }}
            >
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
              >
                Currently Building
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                An export platform for Indian SME exporters — starting with an
                AI-powered ITC-HS code classifier.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
