import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
// import Skills from '../components/sections/Skills'; // Removed - merged with TechStack
import TechStack from '../components/sections/TechStack';
import Projects from '../components/sections/Projects';
import Timeline from '../components/sections/Timeline';
import CodeStats from '../components/sections/CodeStats';
import Certificates from '../components/sections/Certificates';
// import Achievements from '../components/sections/Achievements'; // Removed - already in CodeStats
// import Testimonials from '../components/sections/Testimonials'; // Uncomment when you have real testimonials
// import Blog from '../components/sections/Blog'; // Uncomment when you start writing blogs
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Timeline />
      <CodeStats />
      <Certificates />
      {/* <Testimonials /> */}
      {/* <Blog /> */}
      <Contact />
    </div>
  );
};

export default Home;