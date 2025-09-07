// GlassCard.jsx
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', hover = true, gradient = false }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ duration: 0.3 }}
      className={`relative group ${className}`}
    >
      {gradient && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-300" />
      )}
      <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

// LoadingScreen.jsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!loading) return null;
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center"
    >
      <div className="text-center">
        {/* Animated logo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 mx-auto mb-4"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            AB
          </div>
        </motion.div>
        
        {/* Loading text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white text-xl font-medium mb-2"
        >
          Aryan B V
        </motion.h2>
        
        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ScrollToTop.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// AnimatedBackground.jsx
export const AnimatedBackground = ({ variant = 'dots' }) => {
  if (variant === 'dots') {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(2, 132, 199, 0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`
            }}
          />
        ))}
      </div>
    );
  }
  
  if (variant === 'gradient') {
    return (
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>
    );
  }
  
  return null;
};

// MagneticButton.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

export const MagneticButton = ({ children, className = '', onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.button
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// SectionHeader.jsx
import { motion } from 'framer-motion';

export const SectionHeader = ({ title, subtitle, centered = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {title.split(' ').map((word, index) => (
          <span key={index}>
            {index === title.split(' ').length - 1 ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                {word}
              </span>
            ) : (
              <span>{word} </span>
            )}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
};

// ProgressBar.jsx
export const ProgressBar = ({ value, label, color = 'primary', showPercentage = true }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300 text-sm">{label}</span>
        {showPercentage && (
          <span className="text-gray-400 text-sm">{value}%</span>
        )}
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${
            color === 'primary' 
              ? 'from-primary to-blue-500' 
              : color === 'success'
              ? 'from-green-500 to-emerald-500'
              : color === 'warning'
              ? 'from-yellow-500 to-orange-500'
              : 'from-purple-500 to-pink-500'
          }`}
        />
      </div>
    </div>
  );
};