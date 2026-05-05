import React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, fullWidth, icon, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-accent hover:bg-primary-light shadow-lg',
      secondary: 'bg-secondary text-primary hover:bg-secondary-light',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-accent',
      ghost: 'text-primary hover:bg-primary/10',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg font-semibold',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        disabled={isLoading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2',
          fullWidth ? 'w-full' : '',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {icon && <span>{icon}</span>}
            {children}
          </div>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
