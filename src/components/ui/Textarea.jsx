import { forwardRef } from 'react';

const Textarea = forwardRef(({ 
  placeholder, 
  rows = 6,
  className = '',
  error,
  ...props 
}, ref) => {
  const baseStyles = 'w-full px-4 py-3 sm:px-6 sm:py-4 bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base';
  
  const errorStyles = error ? 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400' : '';
  
  return (
    <div>
      <textarea
        ref={ref}
        placeholder={placeholder}
        rows={rows}
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;

