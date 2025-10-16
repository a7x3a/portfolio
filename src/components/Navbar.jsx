import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Sun, Moon, Home, User, Code, Briefcase, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    { name: 'Home', href: '#', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail }
  ];

  const scrollToSection = (href) => {
    closeMobileMenu();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 0;
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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setActiveSection(getActiveSection());
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      {!isMobile && (
        <motion.nav
          className="fixed left-0 top-0 h-screen w-20 z-50"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="h-full w-full flex flex-col backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-r border-gray-200 dark:border-gray-800 shadow-xl">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center py-5 px-4 border-b border-gray-200/80 dark:border-gray-700/80">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#');
                }}
                className="relative group"
              >
                <motion.div
                  whileHover={{ opacity: 0.9 }}
                  className="flex items-center justify-center transition-opacity duration-200"
                >
                  <span className="text-2xl font-black text-gray-900 dark:text-white">
                    A<span className="text-primary-600 dark:text-primary-400">.</span>
                  </span>
                </motion.div>
              </a>
            </div>

            {/* Navigation Links - Vertical */}
            <div className="flex-1 flex flex-col justify-center gap-1.5 py-6 w-full px-3">
              {navLinks.map((item, index) => {
                const isActive = activeSection === item.href;
                const isHovered = hoveredItem === index;
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className={`relative w-full flex items-center justify-center py-3.5 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/20' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/60'
                    }`}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Icon */}
                    <Icon className="w-5 h-5 relative z-10" strokeWidth={2} />
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-full  ml-4 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none"
                        >
                          {item.name}
                          {/* Tooltip arrow */}
                          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-800" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </a>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col items-center gap-2 py-4 px-3 border-t border-gray-200/80 dark:border-gray-700/80">
              <motion.button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: 0.2 }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5 text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Mobile Top Navigation - Icon Only Buttons */}
      {isMobile && (
        <>
          {/* Theme Toggle Button - Left Top */}
          <motion.div
            className="fixed top-0 left-0 z-50 transition-all duration-300"
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              filter: isMobileMenuOpen ? 'blur(4px)' : 'blur(0px)'
            }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.button
              onClick={toggleTheme}
              className="p-3 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border m-2 border-gray-200/80 dark:border-gray-700/80 rounded-br-2xl shadow-md"
              animate={{
                opacity: isMobileMenuOpen ? 0.3 : 1
              }}
              transition={{ duration: 0.3 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          {/* Menu Button - Right Top */}
          <motion.div
            className="fixed top-0 right-0 z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.button
              onClick={toggleMobileMenu}
              className="p-3 backdrop-blur-xl border m-2 bg-white/95 dark:bg-gray-900/95  border-gray-200/80 dark:border-gray-700/80 rounded-bl-2xl shadow-md"
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-gray-700 dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </>
      )}

      {/* Mobile Menu */}
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
