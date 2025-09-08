import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaArrowRight, FaEnvelope, FaDownload } from 'react-icons/fa';
import { getImagePath } from '../../utils/pathUtils';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    "Full-Stack Developer",
    "AI/ML Engineer", 
    "Problem Solver",
    "Tech Enthusiast"
  ];
  
  // Mouse move effect for gradient
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Floating animation variants
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  return (
    <section id="hero" className="min-h-screen flex items-center py-16 bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic gradient that follows mouse */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(2, 132, 199, 0.3) 0%, transparent 50%)`
          }}
        />
        
        {/* Animated mesh background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230284c7' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Enhanced Text & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Animated welcome badge */}
            <motion.div 
              className="inline-flex items-center bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium">Available for opportunities</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4 text-white">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Aryan B V</span>
            </h1>
            
            {/* Animated role text */}
            <div className="h-12 mb-6">
              <motion.h2 
                key={currentRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl md:text-3xl font-medium text-gray-300"
              >
                {roles[currentRole]}
              </motion.h2>
            </div>
            
            <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
              Crafting elegant solutions at the intersection of <span className="text-primary font-medium">innovation</span> and <span className="text-primary font-medium">technology</span>. 
              Specialized in building scalable applications that seamlessly blend responsive design with cutting-edge AI/ML capabilities.
            </p>
            
            {/* Enhanced Stats Grid with glassmorphism */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: "550+", label: "Problems Solved", icon: "🎯" },
                { value: "4+", label: "Live Projects", icon: "🚀" },
                { value: "8/10", label: "GPA", icon: "📚" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 text-center hover:border-primary/30 transition-all duration-300"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Enhanced CTAs with magnetic effect */}
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button 
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    const offset = 80;
                    const elementPosition = projectsSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="group relative bg-gradient-to-r from-primary to-blue-500 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 flex items-center overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  View My Work
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              
              <motion.a 
                href="https://drive.google.com/file/d/1kWrXGA8Np7OhIYhjaHqLZ1WfMIOy2nRl/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group border-2 border-primary/50 text-primary hover:bg-primary/10 font-medium py-3 px-8 rounded-full transition-all duration-300 flex items-center backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="mr-2 group-hover:animate-bounce" />
                Download CV
              </motion.a>
            </div>
            
            {/* Enhanced Social Icons */}
            <div className="flex space-x-5">
              {[
                { icon: FaGithub, link: "https://github.com/AryanBV", label: "GitHub" },
                { icon: FaLinkedin, link: "https://www.linkedin.com/in/aryan-b-v-78aa63246/", label: "LinkedIn" },
                { icon: FaEnvelope, link: "mailto:aryansalian5678@gmail.com", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                  <div className="relative bg-gray-800/50 backdrop-blur-sm p-3 rounded-full border border-gray-700/50 group-hover:border-primary/50 transition-all duration-300">
                    <social.icon className="text-gray-400 group-hover:text-primary transition-colors" size={22} />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column: Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.div 
              className="relative max-w-md w-full"
              animate={floatingAnimation}
            >
              {/* Multiple glow layers */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-blue-400 to-primary rounded-2xl blur-2xl opacity-20 animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-blue-400 rounded-2xl blur-xl opacity-30" />
              
              {/* Glass morphism card behind image */}
              <div className="absolute inset-0 bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/30" />
              
              {/* Image container with enhanced styling */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl">
                <img 
                  src={getImagePath('image.png')} 
                  alt="Aryan B V" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <a 
            href="#about"
            className="group text-gray-400 hover:text-primary transition-colors flex flex-col items-center"
          >
            <span className="text-sm mb-2 opacity-75">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center group-hover:border-primary transition-colors">
              <motion.div 
                className="w-1.5 h-3 bg-primary rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;