import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ConsoleSignature from "@/components/ui/ConsoleSignature";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ConsoleSignature />
      <Hero />
      <Marquee />
      <Stats />
      <Projects />
      <About />
      <Skills />
      <Certificates />
      <Contact />
      <ScrollToTop />
    </>
  );
}
