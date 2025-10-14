import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  gradient,
  ...props 
}) => {
  const baseStyles = 'relative bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300';
  
  const hoverStyles = hover ? 'hover:shadow-lg hover:border-green-300 dark:hover:border-green-600' : '';
  
  const content = (
    <>
      {gradient && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
  
  if (hover) {
    return (
      <motion.div
        className={`${baseStyles} ${hoverStyles} ${className} group`}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {content}
      </motion.div>
    );
  }
  
  return (
    <div className={`${baseStyles} ${className}`} {...props}>
      {content}
    </div>
  );
};

export default Card;

