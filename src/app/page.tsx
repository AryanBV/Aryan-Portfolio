import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Certificates from "@/components/sections/Certificates";
import Stats from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ConsoleSignature from "@/components/ui/ConsoleSignature";

// Section order (Order E from audit):
//
//   Hero → Marquee → Projects (01) → About (02) → Skills (03)
//        → Certs (04) → Stats (05) → Contact (06)
//
// Rationale: Stats sits directly before Contact so the "active developer
// who ships consistently" signal is the last thing a prospective client
// sees before the CTA. Skills → Certs → Stats reads as a natural
// progression: what I use → formal validation → ongoing practice.
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
      <Certificates />
      <Stats />
      <Contact />
      <ScrollToTop />
    </>
  );
}
