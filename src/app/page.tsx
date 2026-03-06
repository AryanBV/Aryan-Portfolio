import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import CodeStats from "@/components/sections/CodeStats";
import Certificates from "@/components/sections/Certificates";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <div id="skills">
        <Skills />
        <CodeStats />
        <Certificates />
      </div>
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center"
        style={{ color: "var(--text-muted)" }}
      >
        Contact — coming in M6
      </section>
    </>
  );
}
