import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Achievements from '../components/sections/Achievements';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
    </div>
  );
};

export default Home;