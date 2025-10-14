import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  SiReact, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, 
  SiNodedotjs, SiMongodb, SiGit, SiGithub, SiFigma,
  SiVite, SiFirebase, SiNetlify,
  SiVercel, SiPostman, SiNpm, SiBootstrap
} from 'react-icons/si';

const Skills = () => {
  const ref = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const skills = [
    { name: 'React', icon: SiReact, color: '#61DAFB', darkColor: '#61DAFB' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', darkColor: '#F7DF1E' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26', darkColor: '#E34F26' },
    { name: 'CSS3', icon: SiCss3, color: '#1572B6', darkColor: '#1572B6' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', darkColor: '#06B6D4' },
    { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3', darkColor: '#7952B3' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933', darkColor: '#339933' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248', darkColor: '#47A248' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', darkColor: '#FFCA28' },
    { name: 'Git', icon: SiGit, color: '#F05032', darkColor: '#F05032' },
    { name: 'GitHub', icon: SiGithub, color: '#181717', darkColor: '#FFFFFF' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E', darkColor: '#F24E1E' },
    { name: 'Vite', icon: SiVite, color: '#646CFF', darkColor: '#646CFF' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37', darkColor: '#FF6C37' },
    { name: 'npm', icon: SiNpm, color: '#CB3837', darkColor: '#CB3837' },
    { name: 'Netlify', icon: SiNetlify, color: '#00C7B7', darkColor: '#00C7B7' },
    { name: 'Vercel', icon: SiVercel, color: '#000000', darkColor: '#FFFFFF' },
  ];

  return (
    <section id="skills" ref={ref} className="relative py-16 sm:py-20 md:py-32 px-6 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            My Expertise
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Skills & Technologies
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Hover to reveal skill names
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4 sm:gap-5 md:gap-6">
          {skills.map((skill, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.03,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group flex items-center justify-center"
              >
                {/* Circle Shape */}
                <motion.div
                  className="relative w-full aspect-square max-w-[80px] sm:max-w-[90px] md:max-w-[100px] cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Circle Container */}
                  <div className="relative w-full h-full">
                    {/* Glow Effect */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.6, scale: 1.4 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: `radial-gradient(circle, ${skill.color}60, transparent 70%)`,
                        }}
                      />
                    )}

                    {/* Rounded Square Background */}
                    <motion.div
                      className="relative w-full h-full rounded-2xl bg-white dark:bg-gray-800 border-2 transition-all duration-300 shadow-lg"
                      style={{
                        borderColor: isHovered ? skill.color : undefined,
                        boxShadow: isHovered 
                          ? `0 8px 30px ${skill.color}40, 0 0 0 4px ${skill.color}10`
                          : '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      {/* Inner glow on hover */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            background: `radial-gradient(circle, ${skill.color}15, transparent 70%)`,
                          }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Icon - Centered */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.15 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <skill.icon 
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all duration-300"
                        style={{ 
                          color: skill.color,
                          filter: isHovered ? `drop-shadow(0 0 8px ${skill.color}60)` : 'none',
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Tooltip - Emerges from center */}
                  <AnimatePresence>
                    {isHovered && (
                      <>
                        {/* Connecting Line - Perfectly Centered */}
                        <motion.div
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          exit={{ scaleY: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-10 sm:h-12 origin-bottom z-40 mb-0"
                          style={{
                            background: `linear-gradient(to top, ${skill.color}60, ${skill.color}00)`,
                          }}
                        />
                        
                        {/* Tooltip - Perfectly Centered */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ 
                            duration: 0.3,
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }}
                          className="absolute -top-20 sm:-top-24 left-1/2 z-50"
                          style={{
                            transformOrigin: "center bottom",
                            transform: "translateX(-50%)"
                          }}
                        >
                          <div 
                            className="relative px-4 py-2 rounded-xl backdrop-blur-md shadow-2xl border-2"
                            style={{
                              background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}05)`,
                              borderColor: skill.color,
                              boxShadow: `0 8px 32px ${skill.color}40, 0 0 0 1px ${skill.color}20`,
                            }}
                          >
                            {/* Glassmorphism overlay */}
                            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 rounded-xl -z-10 backdrop-blur-md" />
                            
                            {/* Text */}
                            <span 
                              className="relative text-xs sm:text-sm font-bold whitespace-nowrap dark:text-white"
                              style={{ color: skill.color }}
                            >
                              <span className="dark:hidden">{skill.name}</span>
                              <span className="hidden dark:inline" style={{ color: skill.darkColor }}>{skill.name}</span>
                            </span>
                            
                            {/* Bottom shine effect */}
                            <div 
                              className="absolute bottom-0 left-0 right-0 h-px opacity-50"
                              style={{ background: skill.color }}
                            />
                          </div>
                          
                          {/* Arrow - Centered Diamond */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2">
                            <div 
                              className="w-3 h-3 rotate-45 border-r-2 border-b-2 -mt-1.5"
                              style={{
                                background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}05)`,
                                borderColor: skill.color,
                              }}
                            />
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-600 font-medium">
            And continuously learning more...
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
