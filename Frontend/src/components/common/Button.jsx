// Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  // Black & white theme variants - no gradients
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500',
    secondary: 'bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 focus:ring-gray-400',
    danger: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-600',
  };

  // Determine spinner border color based on variant for contrast
  const getSpinnerBorderClass = () => {
    switch (variant) {
      case 'primary':
        return 'border-white';
      case 'secondary':
        return 'border-gray-800';
      case 'danger':
        return 'border-white';
      default:
        return 'border-white';
    }
  };

  const baseClasses = `px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`;
  
  const loadingClasses = loading ? 'opacity-70 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      className={`${baseClasses} ${loadingClasses}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className={`h-4 w-4 border-2 ${getSpinnerBorderClass()} border-t-transparent rounded-full animate-spin`} />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;