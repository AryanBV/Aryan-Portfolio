import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <section id="projects" className="min-h-screen flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>Projects — coming in M4</section>
      <section id="skills"   className="min-h-screen flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>Skills — coming in M5</section>
      <section id="contact"  className="min-h-screen flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>Contact — coming in M6</section>
    </>
  )
}
