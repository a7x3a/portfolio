import { motion } from 'framer-motion';

const IconButton = ({ 
  icon, 
  onClick, 
  className = '',
  variant = 'default',
  size = 'md',
  ariaLabel,
  ...props 
}) => {
  const baseStyles = 'rounded-full transition-all duration-300 flex items-center justify-center';
  
  const variants = {
    default: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/50 border border-gray-200 dark:border-gray-700',
    primary: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/50',
    ghost: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:text-white hover:bg-green-600 dark:hover:bg-green-600',
  };
  
  const sizes = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };
  
  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </motion.button>
  );
};

export default IconButton;

