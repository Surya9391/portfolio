import React, { memo, forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ButtonProps extends Omit<MotionProps, 'children'> {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = memo(forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  ...motionProps
}, ref) => {
  const baseClasses = 'font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#64ffda] via-[#415a77] to-[#64ffda] text-white hover:shadow-2xl focus:ring-[#64ffda]',
    secondary: 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:shadow-2xl focus:ring-white/50',
    outline: 'bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 text-[#64ffda] border border-[#64ffda]/30 backdrop-blur-sm hover:shadow-2xl focus:ring-[#64ffda]',
    ghost: 'bg-transparent text-[#64ffda] hover:bg-[#64ffda]/10 focus:ring-[#64ffda]'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-10 py-5 text-lg'
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={disabled || loading ? undefined : href}
        className={`${buttonClasses} ${disabled || loading ? 'pointer-events-none opacity-50' : ''}`}
        onClick={disabled || loading ? undefined : onClick}
        whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}));

Button.displayName = 'Button';

export default Button;
