import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-semibold text-primary/80 ml-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'flex w-full rounded-2xl border-2 border-primary/10 bg-white px-4 py-3 text-sm transition-all duration-300 placeholder:text-muted-foreground focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-12',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500 ml-2">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
