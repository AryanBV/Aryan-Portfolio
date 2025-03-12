import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowRight, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.p 
              className="text-primary text-lg font-medium tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              WELCOME TO MY PORTFOLIO
            </motion.p>
            
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
              Hi, I'm <span className="text-primary">Aryan B V</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-6">
              Software Developer
            </h2>
            
            <p className="text-lg text-gray-400 mb-10 max-w-xl">
              Results-driven developer specializing in full-stack development and AI/ML solutions. 
              Building scalable applications that combine responsive web design with machine learning techniques.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/30 text-center">
                <div className="text-3xl font-bold text-primary">350+</div>
                <div className="text-gray-400 text-sm">Coding Problems</div>
              </div>
              
              <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/30 text-center">
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
              
              <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/30 text-center">
                <div className="text-3xl font-bold text-primary">8.3/10</div>
                <div className="text-gray-400 text-sm">GPA</div>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.a 
                href="#projects" 
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <FaArrowRight className="ml-2" />
              </motion.a>
              
              <motion.a 
                href="#contact" 
                className="border border-primary text-primary hover:bg-primary/10 font-medium py-3 px-6 rounded-md transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
                <FaEnvelope className="ml-2" />
              </motion.a>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-5">
              <a 
                href="https://github.com/AryanBV" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={26} />
              </a>
              <a 
                href="https://www.linkedin.com/in/aryan-b-v-78aa63246/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={26} />
              </a>
            </div>
          </motion.div>
          
          {/* Right Column: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative max-w-md w-full">
              {/* Blue glow effect around the image */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-xl blur opacity-30"></div>
              
              {/* Image container */}
              <div className="relative rounded-xl overflow-hidden border-2 border-primary/20">
                <img 
                  src="/src/assets/images/image.png" 
                  alt="Aryan B V" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <a 
            href="#about"
            className="text-gray-400 hover:text-primary transition-colors flex flex-col items-center"
            aria-label="Scroll down"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 14.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;