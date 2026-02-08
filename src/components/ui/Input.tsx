import { cn } from '@/lib/cn';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full h-10 px-3 rounded-lg text-sm',
          'bg-[rgb(var(--bg-base))] text-[rgb(var(--text-primary))]',
          'border border-[var(--border)]',
          'placeholder:text-[rgb(var(--text-muted))]',
          'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
          'transition-colors duration-200',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
