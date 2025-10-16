import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from './ui/Button';

const Hero = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // All hooks must be called at the top level, always in the same order
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Spring values for gradient orbs
  const orbX1 = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const orbY1 = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const orbX2 = useSpring(mouseX, { stiffness: 30, damping: 20, mass: 0.5 });
  const orbY2 = useSpring(mouseY, { stiffness: 30, damping: 20, mass: 0.5 });

  useEffect(() => {
    // Check if device is desktop and user prefers motion
    const checkDevice = () => {
      const hasPointerDevice = window.matchMedia('(pointer: fine)').matches;
      const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
      setIsDesktop(hasPointerDevice && isLargeScreen);
    };

    const checkMotionPreference = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setPrefersReducedMotion(prefersReduced);
    };

    checkDevice();
    checkMotionPreference();

    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    // Only add mousemove listener on desktop
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isDesktop]);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" aria-label="Hero section">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs - Only on desktop with mouse tracking */}
        {isDesktop ? (
          <>
            <motion.div
              className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl opacity-30 dark:opacity-20"
              style={{
                background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)',
                x: orbX1,
                y: orbY1,
                translateX: '-50%',
                translateY: '-50%',
              }}
            />
            <motion.div
              className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl opacity-30 dark:opacity-20"
              style={{
                background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
                x: orbX2,
                y: orbY2,
                translateX: '50%',
                translateY: '50%',
              }}
            />
          </>
        ) : (
          /* Static gradient orbs for mobile - no animations */
          <>
            <div
              className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-2xl opacity-20 dark:opacity-10"
              style={{
                background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-2xl opacity-20 dark:opacity-10"
              style={{
                background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
              }}
            />
          </>
        )}

        {/* Animated Grid Lines - Lighter on mobile */}
        <svg className="absolute inset-0 w-full h-full opacity-5 lg:opacity-10 dark:opacity-[0.02] dark:lg:opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" className="text-primary-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Elements - Disabled on mobile and reduced motion */}
        {!prefersReducedMotion && isDesktop && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary-500/40"
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-2/3 right-1/4 w-4 h-4 rounded-full bg-blue-500/40"
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-emerald-500/40"
              animate={{
                y: [0, -25, 0],
                x: [0, 15, 0],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg">
            <Sparkles className="w-4 h-4 text-primary-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Available for opportunities
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Hi, I'm{' '}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary-600 via-emerald-500 to-primary-600 dark:from-white dark:via-primary-400 dark:to-white bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Ahmad Omar
            </span>
            <motion.span
              className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-emerald-500/20 dark:from-primary-400/20 dark:to-emerald-400/20 blur-lg -z-10"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </span>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 max-w-2xl mx-auto font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Front-End Developer | CS Student
        </motion.p>

        <motion.p
          className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-500 mb-6 sm:mb-8 max-w-xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Stage 4 Computer Science at University of Sulaymaniah, Iraq
        </motion.p>

        {/* Social Links */}
        <motion.div
          className="flex gap-2 sm:gap-3 justify-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { Icon: Github, href: 'https://github.com/a7x3a', label: 'GitHub', color: 'hover:bg-gray-900 dark:hover:bg-gray-700' },
            { Icon: Linkedin, href: 'https://iq.linkedin.com/in/ahmadomar0', label: 'LinkedIn', color: 'hover:bg-blue-600' },
            { Icon: Mail, href: 'mailto:ahmadomar6511@gmail.com', label: 'Email', color: 'hover:bg-primary-600' }
          ].map(({ Icon, href, label, color }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 sm:p-3 md:p-3.5 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 group shadow-md ${color} hover:text-white hover:border-transparent transition-all duration-300 hover:opacity-90`}
              aria-label={label}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors duration-300" />
            </a>
          ))}
        </motion.div>

    

        {/* Stats */}
        <motion.div
          className="mt-10 sm:mt-12 px-8 sm:px-2 grid sm:grid-cols-3 grid-cols-1 gap-2 sm:gap-3 max-w-md mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {[
            { label: 'Projects', value: '7', color: 'from-primary-500 to-emerald-500' },
            { label: 'Experience', value: '1Y+', color: 'from-blue-500 to-cyan-500' },
            { label: 'Technologies', value: '17', color: 'from-purple-500 to-pink-500' }
          ].map((stat, index) => (
            <div
              key={index}
              className="relative p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-md overflow-hidden group hover:opacity-90 transition-opacity duration-300"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-emerald-600 dark:from-primary-400 dark:to-emerald-400 bg-clip-text text-transparent mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="flex absolute bottom-6 sm:bottom-8 flex-col items-center gap-1.5 sm:gap-2 cursor-pointer group z-10"
  
        onClick={() => {
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 font-medium uppercase tracking-wider">Scroll Down</span>
        <div className="p-1.5 sm:p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 group-hover:border-primary-500 dark:group-hover:border-primary-400 transition-all shadow-lg group-hover:shadow-xl">
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
