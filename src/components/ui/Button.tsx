import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const baseClasses = 'font-bebas tracking-wider inline-flex items-center justify-center transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-rb-red text-rb-white hover:bg-rb-red-dark',
    secondary: 'bg-rb-white text-rb-black hover:bg-rb-gray-200',
    outline: 'border-2 border-rb-white text-rb-white hover:bg-rb-white hover:text-rb-black',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-base',
    md: 'px-6 py-3 text-xl',
    lg: 'px-8 py-4 text-2xl',
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`;

  // Animation properties
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };
  
  if (to) {
    return (
      <motion.div
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <Link to={to} className={buttonClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }
  
  if (href) {
    return (
      <motion.div
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <a href={href} className={buttonClasses} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : "tap"}
      variants={buttonVariants}
    >
      {children}
    </motion.button>
  );
};

export default Button;