import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  // Scroll to the About section when clicking the "Learn more" button
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden py-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-slate-900 opacity-100 dark:opacity-100"></div>
      
      {/* Content container */}
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white"
          >
            <motion.p 
              className="text-primary mb-2 font-medium tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              WELCOME TO MY PORTFOLIO
            </motion.p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
              Hi, I'm <span className="text-primary">Aryan B V</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-200 mb-6">
              Software Developer
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Results-driven developer specializing in full-stack development and AI/ML solutions. Building scalable applications that combine responsive web design with machine learning techniques.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="btn-primary flex items-center"
              >
                View My Work
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#contact" 
                className="border border-primary text-primary hover:bg-primary/10 font-medium py-2 px-4 rounded-md transition duration-300 flex items-center"
              >
                Contact Me
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
            <div className="flex mt-8 space-x-5">
              <a 
                href="https://github.com/AryanBV" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={26} />
              </a>
              <a 
                href="https://www.linkedin.com/in/aryan-b-v-78aa63246/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={26} />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:flex justify-center"
          >
            {/* Profile image with better styling */}
            <div className="relative">
              {/* Background shape */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-60"></div>
              
              {/* Image container */}
              <div className="relative max-w-md h-auto overflow-hidden rounded-2xl">
                <img 
                  src="/src/assets/images/image.png" 
                  alt="Aryan B V" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <button 
          onClick={scrollToAbout}
          className="text-gray-300 hover:text-primary transition duration-300 flex flex-col items-center"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-2">Scroll down</span>
          <FaArrowDown size={20} />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;