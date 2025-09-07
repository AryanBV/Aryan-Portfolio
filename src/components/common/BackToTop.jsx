import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaRocket } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearTop, setIsNearTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const toggleVisibility = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Show button when scrolled down 500px
      setIsVisible(currentScroll > 500);
      
      // Check if near top for rocket animation
      setIsNearTop(currentScroll < 100);
      
      // Calculate scroll progress
      if (scrollHeight > 0) {
        const progress = (currentScroll / scrollHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Initial check
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[50] group"
          aria-label="Back to top"
        >
          {/* Button container */}
          <div className="relative">
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
            
            {/* Progress ring */}
            <svg className="absolute inset-0 w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="rgba(2, 132, 199, 0.2)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="url(#backToTopGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray={150.8}
                strokeDashoffset={150.8 - (150.8 * scrollProgress) / 100}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Main button */}
            <div className="relative w-14 h-14 bg-gradient-to-br from-primary to-blue-500 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Icon */}
              <motion.div
                animate={isNearTop ? { y: [-2, 2, -2] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {scrollProgress > 90 ? (
                  <FaRocket className="text-white text-xl" />
                ) : (
                  <FaArrowUp className="text-white text-xl" />
                )}
              </motion.div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {scrollProgress > 90 ? 'Launch to top!' : 'Back to top'}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;