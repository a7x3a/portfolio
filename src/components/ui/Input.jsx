import { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = 'text', 
  placeholder, 
  className = '',
  error,
  icon,
  ...props 
}, ref) => {
  const baseStyles = 'w-full px-4 py-3 sm:px-6 sm:py-4 bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base';
  
  const errorStyles = error ? 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400' : '';
  
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`${baseStyles} ${errorStyles} ${icon ? 'pl-12' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

