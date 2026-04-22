import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Stats from "@/components/sections/Stats";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ConsoleSignature from "@/components/ui/ConsoleSignature";

// Section order — locked per user preference:
//
//   Hero → Marquee → Projects (01) → About (02) → Skills (03)
//        → Stats (04) → Certs (05) → Contact (06)
//
// This matches the navbar numbering 1:1. Do not swap Stats and Certs —
// that's a decision already made and revisited, see
// .claude/.../memory/feedback_section_order.md.
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ConsoleSignature />
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Skills />
      <Stats />
      <Certificates />
      <Contact />
      <ScrollToTop />
    </>
  );
}
