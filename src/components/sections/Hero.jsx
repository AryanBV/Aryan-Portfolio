import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="hero" className="section-container min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm <span className="text-primary">Aryan B V</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-6">
            Software Developer
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Results-driven developer specializing in full-stack development and AI/ML solutions. Building scalable applications that combine responsive web design with machine learning techniques.
          </p>
          <div className="flex space-x-4">
            <a 
              href="#projects" 
              className="btn-primary"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="border border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-4 rounded transition duration-300"
            >
              Contact Me
            </a>
          </div>
          <div className="flex mt-8 space-x-4">
            <a 
              href="https://github.com/AryanBV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition duration-300"
            >
              <FaGithub size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/aryan-b-v-78aa63246/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition duration-300"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
            >
            <img 
                src="/src/assets/images/image.png" 
                alt="Aryan B V" 
                className="rounded-lg shadow-lg w-full h-auto max-w-md"
            />
            </motion.div>
      </div>
    </section>
  );
};

export default Hero;