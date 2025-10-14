import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { isDark, toggleTheme } = useTheme();

  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    closeMobileMenu();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 17;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const getActiveSection = () => {
    const sections = navLinks.map(link => link.href);
    for (const href of sections.reverse()) {
      if (href === '#') continue;
      const element = document.querySelector(href);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100) return href;
      }
    }
    return '#';
  };

  const [activeSection, setActiveSection] = useState('#');

  useEffect(() => {
    const handleScroll = () => {
      setActiveSection(getActiveSection());
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          className="w-full max-w-full pointer-events-auto"
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            paddingLeft: isScrolled ? '2.5%' : '0px',
            paddingRight: isScrolled ? '2.5%' : '0px',
            marginTop: isScrolled ? '0.75rem' : '0',
          }}
          transition={{ 
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.div
            className="relative backdrop-blur-md border"
            animate={{
              backgroundColor: isDark 
                ? (isScrolled ? 'rgba(17, 24, 39, 0.85)' : 'rgba(17, 24, 39, 0.7)')
                : (isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.8)'),
              borderRadius: isScrolled ? '1rem' : '0',
              borderColor: isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.3)',
              boxShadow: isScrolled
                ? isDark 
                  ? '0 4px 24px rgba(0, 0, 0, 0.4)'
                  : '0 4px 24px rgba(0, 0, 0, 0.06)'
                : 'none',
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#');
                }}
                className="relative group"
              >
                <motion.div
                  className="flex items-center gap-1.5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                    A<span className="text-primary-600 dark:text-primary-400">.</span>
                  </span>
                </motion.div>
              </a>

              <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
                {navLinks.map((item, index) => {
                  const isActive = activeSection === item.href;
                  const isHovered = hoveredItem === index;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className="relative px-2.5 lg:px-4 py-1.5 lg:py-2 group"
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span 
                        className={`relative z-10 text-xs lg:text-sm font-medium transition-colors ${
                          isActive 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {item.name}
                      </span>
                      
                      {isActive && (
                        <motion.div
                          layoutId="activeUnderline"
                          className="absolute bottom-0 left-2.5 lg:left-4 right-2.5 lg:right-4 h-0.5 bg-primary-600 dark:bg-white"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      {isHovered && !isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gray-100/60 dark:bg-gray-800/60 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </a>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <motion.button
                  onClick={toggleTheme}
                  className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.div
                        key="sun"
                        initial={{ y: -10, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 10, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ y: -10, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 10, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={toggleMobileMenu}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white" />
                  ) : (
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 md:hidden"
              style={{ backdropFilter: 'blur(12px)' }}
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
            />
            
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-white dark:bg-gray-900 z-50 md:hidden shadow-2xl border-l border-gray-200 dark:border-gray-800"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
                    A<span className="text-primary-600 dark:text-primary-400">.</span>
                  </span>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-white" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {navLinks.map((item, index) => {
                      const isActive = activeSection === item.href;
                      return (
                        <motion.a
                          key={index}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.href);
                          }}
                          className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive 
                              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          }`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {item.name}
                        </motion.a>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
