import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');
  
  // Loading messages
  const loadingMessages = [
    'Initializing',
    'Loading Assets',
    'Preparing Experience',
    'Almost Ready',
    'Welcome!'
  ];
  
  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    
    // Change loading text
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        if (currentIndex < loadingMessages.length - 1) {
          return loadingMessages[currentIndex + 1];
        }
        clearInterval(textInterval);
        return prev;
      });
    }, 600);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);
  
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gray-900 z-[100] flex items-center justify-center"
        >
          {/* Background animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-10 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse animation-delay-2000" />
            </div>
          </div>
          
          <div className="relative text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-24 h-24 mx-auto relative"
              >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/30" />
                
                {/* Inner rotating element */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">AB</span>
                </div>
                
                {/* Orbiting dots */}
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      marginTop: '-4px',
                      marginLeft: '-4px'
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.66
                    }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full -translate-y-12" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Aryan B V
            </motion.h1>
            
            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 mb-8"
            >
              Full-Stack Developer | AI/ML Engineer
            </motion.p>
            
            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="w-64 mx-auto mb-4"
            >
              <div className="bg-gray-800 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
            
            {/* Loading Text */}
            <motion.div
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-gray-500"
            >
              {loadingText}
              <span className="ml-1">
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 0.6,
                      duration: 0.3
                    }}
                  >
                    .
                  </motion.span>
                ))}
              </span>
            </motion.div>
            
            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-gray-600 mt-2"
            >
              {loadingProgress}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;