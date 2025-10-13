import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiCode, FiLayers, FiDatabase, FiTool } from 'react-icons/fi';

const Skills = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: FiCode,
      skills: ['React', 'Vue', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Backend',
      icon: FiDatabase,
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API'],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Design',
      icon: FiLayers,
      skills: ['UI/UX', 'Figma', 'Adobe XD', 'Responsive Design', 'Animation'],
      color: 'from-lime-500 to-green-500'
    },
    {
      title: 'Tools',
      icon: FiTool,
      skills: ['Git', 'Docker', 'CI/CD', 'AWS', 'Agile'],
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-br from-gray-50 via-green-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute top-40 left-20 w-96 h-96 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 text-transparent bg-clip-text">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Technologies and tools I work with</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="relative p-6 bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all shadow-sm hover:shadow-lg">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                <div className="relative z-10">
                  <div className={`inline-block p-3 bg-gradient-to-br ${category.color} rounded-xl mb-4`}>
                    <category.icon className="text-white text-2xl" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{category.title}</h3>
                  
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`} />
                        <span className="text-gray-700 dark:text-gray-400">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
