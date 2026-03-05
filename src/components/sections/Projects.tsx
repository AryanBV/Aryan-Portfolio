'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectStatus = 'Live' | 'Built' | 'In Development'

type Project = {
  id:          string
  title:       string
  tagline:     string
  description: string
  status:      ProjectStatus
  featured?:   boolean
  tech:        string[]
  links: {
    github?: string
    live?:   string
  }
  image: string
}

// ─── Project data ─────────────────────────────────────────────────────────────
// TODO: Replace github/live URLs with real ones before deploy.
// TODO: Replace image paths with final screenshots when ready.
// image.png in public/images/ is the current placeholder for all projects.

const PROJECTS: Project[] = [
  {
    id:          'hsp-manager',
    title:       'HSP Manager',
    tagline:     'Automotive retail business management system',
    description:
      'Full-stack business management system built for and running daily at an automotive spare parts retailer in Karnataka. Handles inventory tracking, billing, supplier management, and daily operations — replacing a manual paper-based workflow.',
    status:      'Live',
    featured:    true,
    tech:        ['Next.js', 'NestJS', 'Supabase', 'PostgreSQL', 'TypeScript'],
    links: {
      github: 'https://github.com/AryanBV/hsp-manager',
    },
    image: '/images/project1.png',
  },
  {
    id:          'lumina-crafts',
    title:       'Lumina Crafts',
    tagline:     'E-commerce platform for handmade goods',
    description:
      'Full-stack e-commerce platform with product catalogue, cart, checkout with payment integration, and a complete admin dashboard for inventory and order management.',
    status:      'Live',
    tech:        ['Next.js', 'Supabase', 'TypeScript', 'Stripe'],
    links: {
      github: 'https://github.com/AryanBV/lumina-crafts',
    },
    image: '/images/project2.png',
  },
  {
    id:          'smart-med',
    title:       'SMART_MED',
    tagline:     'AI-powered family health PWA',
    description:
      'Progressive web app for family health management. Uses OCR to digitize paper prescriptions, checks for drug interactions, and stores health records — built on a multi-agent AI architecture.',
    status:      'Built',
    tech:        ['Next.js', 'Claude API', 'OpenAI API', 'TypeScript', 'PWA'],
    links: {
      github: 'https://github.com/AryanBV/smart-med',
    },
    image: '/images/project3.png',
  },
]

// ─── Animation variants ────────────────────────────────────────────────────────

const EASING = [0.22, 1, 0.36, 1] as const

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING } },
}

// ─── Status badge ──────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<ProjectStatus, { color: string; bg: string }> = {
  'Live':           { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)' },
  'Built':          { color: 'var(--accent)', bg: 'var(--accent-dim)' },
  'In Development': { color: '#facc15', bg: 'rgba(250, 204, 21, 0.1)' },
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const { color, bg } = STATUS_COLORS[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium"
      style={{
        color,
        backgroundColor: bg,
        fontFamily: 'var(--font-mono)',
        border: `1px solid ${color}`,
        opacity: 0.9,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {status}
    </span>
  )
}

// ─── Tech pill ─────────────────────────────────────────────────────────────────

function TechPill({ label }: { label: string }) {
  return (
    <span
      className="px-2.5 py-1 text-xs"
      style={{
        color:           'var(--text-muted)',
        border:          '1px solid var(--border)',
        fontFamily:      'var(--font-mono)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      {label}
    </span>
  )
}

// ─── Project links ─────────────────────────────────────────────────────────────

function ProjectLinks({ links }: { links: Project['links'] }) {
  const linkStyle = {
    color:      'var(--text-muted)',
    transition: 'color 200ms',
  }

  return (
    <div className="flex items-center gap-4">
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <FiGithub size={18} />
        </a>
      )}
      {links.live && (
        <a
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Live site"
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <FiExternalLink size={18} />
        </a>
      )}
    </div>
  )
}

// ─── Featured project card ─────────────────────────────────────────────────────

function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-0"
      style={{ border: '1px solid var(--border)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {/* Image — left on desktop */}
      <div
        className="relative w-full"
        style={{ minHeight: '280px', backgroundColor: 'var(--bg-surface)' }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top"
        />
        {/* Featured label overlay */}
        <span
          className="absolute top-4 left-4 px-2.5 py-1 text-xs font-semibold tracking-widest uppercase"
          style={{
            backgroundColor: 'var(--bg-base)',
            color:           'var(--accent)',
            border:          '1px solid var(--border)',
            fontFamily:      'var(--font-mono)',
          }}
        >
          Featured
        </span>
      </div>

      {/* Content — right on desktop */}
      <div
        className="flex flex-col justify-between gap-6 p-8"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <StatusBadge status={project.status} />
            <ProjectLinks links={project.links} />
          </div>

          <div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.title}
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
            >
              {project.tagline}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <TechPill key={t} label={t} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Regular project card ──────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col"
      style={{ border: '1px solid var(--border)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {/* Image */}
      <div
        className="relative w-full"
        style={{ height: '200px', backgroundColor: 'var(--bg-surface)' }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Content */}
      <div
        className="flex flex-col justify-between gap-5 p-6 flex-1"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <StatusBadge status={project.status} />
            <ProjectLinks links={project.links} />
          </div>

          <div>
            <h3
              className="text-lg font-bold mb-1.5"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.title}
            </h3>
            <p
              className="text-xs mb-3"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
            >
              {project.tagline}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <TechPill key={t} label={t} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function Projects() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const featured = PROJECTS.find(p => p.featured)
  const rest     = PROJECTS.filter(p => !p.featured)

  return (
    <section ref={ref} id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EASING }}
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
        >
          Projects
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASING }}
          className="text-3xl sm:text-4xl font-bold mb-16"
          style={{ color: 'var(--text-primary)' }}
        >
          Production systems,{' '}
          <span style={{ color: 'var(--text-secondary)' }}>
            not demo projects.
          </span>
        </motion.h2>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-6"
        >
          {/* Featured card — full width */}
          {featured && <FeaturedCard project={featured} />}

          {/* Remaining cards — 2-column grid, own stagger context */}
          {rest.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {rest.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  )
}
