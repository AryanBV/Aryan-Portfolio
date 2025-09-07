import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import TechStack from '../components/sections/TechStack';
import Projects from '../components/sections/Projects';
import Timeline from '../components/sections/Timeline';
import CodeStats from '../components/sections/CodeStats';
import Certificates from '../components/sections/Certificates';
import Achievements from '../components/sections/Achievements';
// import Testimonials from '../components/sections/Testimonials'; // Uncomment when you have real testimonials
// import Blog from '../components/sections/Blog'; // Uncomment when you start writing blogs
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <TechStack />
      <Projects />
      <Timeline />
      <CodeStats />
      <Certificates />
      <Achievements />
      {/* <Testimonials /> */}
      {/* <Blog /> */}
      <Contact />
    </div>
  );
};

export default Home;