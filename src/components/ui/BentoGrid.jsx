import { motion } from 'framer-motion';

const BentoGrid = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {children}
    </div>
  );
};

const BentoCard = ({ 
  children, 
  className = '', 
  span = '1',
  hover = true,
  gradient,
  ...props 
}) => {
  const spanClass = {
    '1': '',
    '2': 'md:col-span-2',
    '3': 'lg:col-span-3',
    'full': 'col-span-full',
  };

  return (
    <motion.div
      className={`relative group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 ${spanClass[span]} ${className}`}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {gradient && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export { BentoGrid, BentoCard };

