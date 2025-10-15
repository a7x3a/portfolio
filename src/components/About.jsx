import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { GraduationCap, Code, Target } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const hasPointerDevice = window.matchMedia('(pointer: fine)').matches;
      const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
      setIsDesktop(hasPointerDevice && isLargeScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
    container: typeof window !== 'undefined' ? undefined : null
  });

  const y = useTransform(scrollYProgress, [0, 1], isDesktop ? [100, -100] : [0, 0]);

  const highlights = [
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Stage 4 CS Student',
      detail: 'University of Sulaymaniah',
      color: 'bg-blue-500 dark:bg-blue-600'
    },
    {
      icon: Code,
      title: 'Focus',
      description: 'Front-End Dev',
      detail: 'React & Modern Web',
      color: 'bg-primary-600 dark:bg-primary-500'
    },
    {
      icon: Target,
      title: 'Goal',
      description: 'Tech Success',
      detail: 'Continuous Learning',
      color: 'bg-purple-600 dark:bg-purple-500'
    }
  ];

  return (
    <section id="about" ref={ref} className="relative py-16 px-6 sm:py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50 overflow-hidden" aria-label="About section">
      {/* Parallax background - Only on desktop */}
      {isDesktop && (
        <motion.div
          style={{ y }}
          className="absolute top-20 right-10 w-80 h-80 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none"
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px", amount: 0.3 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            About Me
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
            Building the Future
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start text-center sm:text-start">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
            className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base"
          >
            <p>
              I am a <span className="text-gray-900 dark:text-white font-medium">Stage 4 Computer Science student</span> at the University of Sulaymaniah in Iraq, 
              currently focused on learning front-end development online.
            </p>
            <p>
              While I'm still a junior in this field, I am dedicated to advancing my skills and achieving success in the tech industry. 
              Every day is an opportunity to learn something new.
            </p>
            <p>
              I believe in <span className="text-primary-600 dark:text-primary-400 font-medium">continuous growth</span> and pushing boundaries to become a better developer.
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
            className="grid grid-cols-1 gap-3 sm:gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
                className="p-4 sm:p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`p-2.5 sm:p-3 ${item.color} rounded-lg flex-shrink-0`}>
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-0.5">
                      {item.description}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Section Separator */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <div className="w-24 h-px bg-gray-300 dark:bg-gray-700 opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default About;
