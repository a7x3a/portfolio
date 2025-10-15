import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import Button from './ui/Button';

const Projects = () => {
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

  const projects = [
    {
      title: 'Hawin Travel',
      description: 'Modern travel booking platform with flight search, hotel reservations, and trip planning features.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop',
      tags: ['React', 'Tailwind', 'API'],
      github: 'https://github.com/a7x3a/hawin-travel',
      live: 'https://www.hawintravel.com/',
    },
    {
      title: 'Cloudy',
      description: 'Weather forecast application with real-time data, beautiful UI, and location-based weather updates.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop',
      tags: ['JavaScript', 'Weather API', 'HTML/CSS'],
      github: 'https://github.com/a7x3a/cloudy',
      live: 'https://cloudyx.netlify.app/',
    },
    {
      title: 'Menuly',
      description: 'Digital menu management system for restaurants with QR code support and customizable layouts.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
      tags: ['React', 'Firebase', 'Bootstrap'],
      github: 'https://github.com/a7x3a/menuly',
      live: 'https://menuly.netlify.app/',
    },
    {
      title: 'DownTik',
      description: 'Download TikTok videos and audio without watermarks. Fast, simple, and efficient downloader tool.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop',
      tags: ['JavaScript', 'API', 'Node.js'],
      github: 'https://github.com/a7x3a/downtik',
      live: 'https://downtikk.vercel.app/',
    },
    {
      title: 'Raiy Store',
      description: 'E-commerce platform with product catalog, shopping cart, and checkout functionality.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop',
      tags: ['JavaScript', 'MongoDB', 'Express'],
      github: 'https://github.com/a7x3a/raiy_store',
      live: 'https://raiy.netlify.app/',
    },
    {
      title: 'Taskly',
      description: 'Task management application with priority levels, categories, and deadline tracking.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop',
      tags: ['JavaScript', 'LocalStorage', 'UI/UX'],
      github: 'https://github.com/a7x3a/taskly',
      live: 'https://tasklly.vercel.app/',
    },
    {
      title: 'Hotel Management System',
      description: 'Full-stack hotel management application with booking system, room management, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
      tags: ['React', 'Node.js', 'Express', 'Sequelize'],
      github: 'https://github.com/a7x3a',
      live: null,
    },
  ];

  return (
    <section id="projects" ref={ref} className="relative py-16 sm:py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50 overflow-hidden" aria-label="Projects portfolio section">
      {/* Parallax background - Only on desktop */}
      {isDesktop && (
        <motion.div
          style={{ y }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px", amount: 0.3 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            My Work
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Recent projects I've worked on
          </p>
        </motion.div>

        {/* Minimal Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              className="group"
            >
              <motion.div 
                className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 ease-out h-full"
                whileHover={isDesktop ? { y: -6 } : {}}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - ${project.description}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                    <a href={project.live || project.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {project.title}
                    </a>
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] sm:text-xs font-medium rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex">
                    {project.live ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => window.open(project.live, '_blank')}
                        icon={<ExternalLink className="w-3.5 h-3.5" />}
                        iconPosition="right"
                        className="text-xs w-full"
                      >
                        Visit
                      </Button>
                    ) : (
                      <div className="w-full flex items-center justify-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Offline Project</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Section Separator */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <div className="w-24 h-px bg-gray-300 dark:bg-gray-700 opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
