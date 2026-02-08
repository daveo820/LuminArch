'use client';

import { cn } from '@/lib/cn';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ checked, onChange, className }: CheckboxProps) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200',
        checked
          ? 'bg-[var(--accent)] border-[var(--accent)] glow-accent'
          : 'border-[rgb(var(--text-muted))] hover:border-[var(--accent)]',
        className
      )}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-[rgb(var(--bg-base))]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}
