import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState('dark');
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  
  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.sectionId);
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      setIsOpen(false);
    }
  };
  
  const navLinks = [
    { name: 'Home', sectionId: 'hero', icon: '🏠' },
    { name: 'About', sectionId: 'about', icon: '👤' },
    { name: 'Skills', sectionId: 'skills', icon: '💡' },
    { name: 'Projects', sectionId: 'projects', icon: '🚀' },
    { name: 'Timeline', sectionId: 'timeline', icon: '📅' },
    { name: 'Certificates', sectionId: 'certificates', icon: '🏆' },
    { name: 'Achievements', sectionId: 'achievements', icon: '🎯' },
    { name: 'Contact', sectionId: 'contact', icon: '📧' },
  ];
  
  return (
    <>
      {/* Main Navbar */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-800/50' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name with animation */}
            <motion.button 
              onClick={() => scrollToSection('hero')}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-primary to-blue-500 text-white font-bold text-xl px-3 py-1 rounded-lg">
                    AB
                  </div>
                </div>
                <span className="text-xl font-bold text-white hidden sm:block">
                  Aryan B V
                </span>
              </div>
            </motion.button>
            
            {/* Desktop menu with glassmorphism */}
            <div className="hidden md:flex items-center space-x-1">
              <div className="flex items-center bg-gray-800/30 backdrop-blur-sm rounded-full p-1 border border-gray-700/30">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.sectionId)}
                    className="relative group px-4 py-2 rounded-full transition-all duration-300"
                  >
                    {/* Active indicator */}
                    {activeSection === link.sectionId && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-primary/20 rounded-full border border-primary/50"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    <span className={`relative z-10 text-sm font-medium transition-colors ${
                      activeSection === link.sectionId 
                        ? 'text-primary' 
                        : 'text-gray-400 group-hover:text-white'
                    }`}>
                      <span className="hidden lg:inline">{link.name}</span>
                      <span className="lg:hidden">{link.icon}</span>
                    </span>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gray-700/0 group-hover:bg-gray-700/20 rounded-full transition-colors" />
                  </button>
                ))}
              </div>
              
              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 text-gray-400 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
              </motion.button>
            </div>
            
            {/* Mobile menu button with animation */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-800/30 backdrop-blur-sm text-gray-400"
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
              </motion.button>
              
              {/* Hamburger menu */}
              <motion.button
                onClick={toggleMenu}
                className="relative p-2 rounded-lg text-gray-400 hover:text-primary focus:outline-none"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu dropdown with glassmorphism */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50">
                <div className="px-4 py-4 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      onClick={() => scrollToSection(link.sectionId)}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        activeSection === link.sectionId
                          ? 'bg-primary/20 text-primary border-l-4 border-primary'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="font-medium">{link.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-16 left-0 right-0 h-0.5 bg-gray-800 z-40"
        initial={{ scaleX: 0 }}
        style={{ 
          scaleX: scrolled ? 1 : 0,
          transformOrigin: "left"
        }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-blue-500"
          style={{
            scaleX: typeof window !== 'undefined' 
              ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
              : 0,
            transformOrigin: "left"
          }}
        />
      </motion.div>
    </>
  );
};

export default Navbar;