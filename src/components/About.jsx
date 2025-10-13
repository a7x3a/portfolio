import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-32 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 w-64 h-64 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          style={{ opacity }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 text-transparent bg-clip-text">Me</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              I'm a passionate developer with a keen eye for design and a love for creating 
              exceptional digital experiences. With expertise in modern web technologies, 
              I transform ideas into elegant, user-friendly applications.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              My journey in web development started several years ago, and I've been 
              continuously learning and adapting to new technologies ever since. I believe 
              in writing clean, maintainable code and creating intuitive user interfaces.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 text-transparent bg-clip-text"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  5+
                </motion.div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">Years Experience</div>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 text-transparent bg-clip-text"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  50+
                </motion.div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">Projects Done</div>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 text-transparent bg-clip-text"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  30+
                </motion.div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">Happy Clients</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 rounded-3xl"
                animate={{
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute inset-4 bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&h=600&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
