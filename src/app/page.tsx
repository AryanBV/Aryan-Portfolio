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

// Section order: lead with the work, close with proof.
//
//   Hero → Marquee → Projects (01) → About (02) → Skills (03)
//        → Stats (04) → Certs (05) → Contact (06)
//
// Rationale: a recruiter's flow is "read headline → see projects → check
// evidence → contact." Putting Stats up front (as the prototype did) meant
// showing "36 repos / 551 contribs" before the user had context for what
// those numbers represent. Evidence works better as a closer.
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
