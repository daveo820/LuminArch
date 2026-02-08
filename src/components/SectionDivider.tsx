'use client';

interface SectionDividerProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function SectionDivider({ variant = 'default', className = '' }: SectionDividerProps) {
  const colors = {
    default: {
      line: 'bg-champagne/30',
      text: 'text-champagne',
      bg: 'bg-white',
    },
    light: {
      line: 'bg-champagne/20',
      text: 'text-champagne/60',
      bg: 'bg-cream',
    },
    dark: {
      line: 'bg-champagne/40',
      text: 'text-champagne',
      bg: 'bg-charcoal',
    },
  };

  const { line, text, bg } = colors[variant];

  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${className}`}>
      <div className={`h-px flex-1 max-w-24 ${line}`} />
      <div className={`${bg} px-4`}>
        <span
          className={`text-2xl font-semibold ${text}`}
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          MK
        </span>
      </div>
      <div className={`h-px flex-1 max-w-24 ${line}`} />
    </div>
  );
}
