import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'accent';
}

const Badge: React.FC<BadgeProps> = ({ className, variant = 'secondary', ...props }) => {
  const variants = {
    primary: 'bg-primary text-accent',
    secondary: 'bg-secondary text-primary',
    accent: 'bg-accent text-primary border border-secondary/20',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export { Badge };
