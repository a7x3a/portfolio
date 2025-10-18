import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Button from './ui/Button';

const IdleScreen = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const idleTimerRef = useRef(null);

  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs"
    },
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House"
    },
    {
      text: "First, solve the problem. Then, write the code.",
      author: "John Johnson"
    },
    {
      text: "Experience is the name everyone gives to their mistakes.",
      author: "Oscar Wilde"
    },
    {
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay"
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      author: "Martin Fowler"
    },
    {
      text: "Simplicity is the soul of efficiency.",
      author: "Austin Freeman"
    },
    {
      text: "Make it work, make it right, make it fast.",
      author: "Kent Beck"
    },
    {
      text: "The only limit to our realization of tomorrow is our doubts of today.",
      author: "Franklin D. Roosevelt"
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "It's not about ideas. It's about making ideas happen.",
      author: "Scott Belsky"
    },
    {
      text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
      author: "Antoine de Saint-Exupéry"
    },
    {
      text: "Quality is not an act, it is a habit.",
      author: "Aristotle"
    }
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const closeIdleScreen = () => {
    setIsIdle(false);
  };

  useEffect(() => {
    const resetTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setCurrentQuote(getRandomQuote());
        setIsIdle(true);
      }, 30000);
    };

    const handleActivity = () => {
      setIsIdle(false);
      resetTimer();
    };

    // Start initial timer
    resetTimer();

    // Activity event listeners with passive flag for better performance
    const events = ['mousedown', 'keypress', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Cleanup
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  // Auto-rotate quotes when idle screen is visible
  useEffect(() => {
    if (!isIdle) return;

    const quoteRotationInterval = setInterval(() => {
      setCurrentQuote(getRandomQuote());
    }, 8000); // Change quote every 8 seconds

    return () => {
      clearInterval(quoteRotationInterval);
    };
  }, [isIdle]);

  return (
    <AnimatePresence>
      {isIdle && currentQuote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          style={{ 
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            onClick={closeIdleScreen}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 hover:scale-110 group"
            aria-label="Close idle screen"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-200" />
          </motion.button>

          {/* Quote Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-4xl w-full text-center"
          >
            {/* Quote Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </motion.div>

            {/* Quote Text with AnimatePresence for smooth transitions */}
            <div className="mb-8 sm:mb-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuote.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 sm:mb-8 px-4">
                    "{currentQuote.text}"
                  </h2>
                  <p className="text-lg sm:text-xl md:text-2xl text-primary-300 font-medium">
                    — {currentQuote.author}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center justify-center"
            >
              <Button
                variant="primary"
                size="md"
                onClick={closeIdleScreen}
                className="shadow-lg hover:shadow-xl text-sm"
              >
                Continue Browsing
              </Button>
            </motion.div>

            {/* Hint Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-6 text-xs sm:text-sm text-white/50"
            >
              Click anywhere or press any key to dismiss
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IdleScreen;

