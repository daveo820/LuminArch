'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

// Animated gradient background
export function GradientBackground({
  children,
  className = '',
  colors = ['#1A1A1A', '#2D2D2D', '#1A1A1A'],
  animate = true,
}: {
  children?: ReactNode;
  className?: string;
  colors?: string[];
  animate?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.join(', ')})`,
          backgroundSize: '400% 400%',
        }}
        animate={
          animate
            ? {
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }
            : undefined
        }
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Noise texture overlay
export function NoiseOverlay({
  opacity = 0.03,
  className = '',
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Animated line divider
export function AnimatedDivider({
  className = '',
  color = 'black',
  thickness = 1,
  delay = 0,
}: {
  className?: string;
  color?: string;
  thickness?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ width: 0 }}
      whileInView={{ width: '100%' }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div
        className="w-full"
        style={{ height: thickness, backgroundColor: color === 'black' ? 'var(--black)' : color }}
      />
    </motion.div>
  );
}

// Floating shapes for background decoration
export function FloatingShape({
  className = '',
  size = 100,
  color = 'rgba(0,0,0,0.03)',
  duration = 20,
  delay = 0,
}: {
  className?: string;
  size?: number;
  color?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Parallax section wrapper
export function ParallaxSection({
  children,
  className = '',
  speed = 0.5,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// Spotlight effect that follows cursor
export function SpotlightEffect({
  children,
  className = '',
  size = 300,
  color = 'rgba(255,255,255,0.05)',
}: {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--spotlight-x', `${x}px`);
    containerRef.current.style.setProperty('--spotlight-y', `${y}px`);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        ['--spotlight-x' as string]: '-1000px',
        ['--spotlight-y' as string]: '-1000px',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size}px circle at var(--spotlight-x) var(--spotlight-y), ${color}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

// Grid pattern overlay
export function GridPattern({
  className = '',
  size = 40,
  color = 'rgba(0,0,0,0.03)',
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

// Dot pattern overlay
export function DotPattern({
  className = '',
  size = 2,
  gap = 20,
  color = 'rgba(0,0,0,0.1)',
}: {
  className?: string;
  size?: number;
  gap?: number;
  color?: string;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
        backgroundSize: `${gap}px ${gap}px`,
      }}
    />
  );
}

// Blur fade edge effect
export function BlurFade({
  children,
  className = '',
  direction = 'bottom',
  size = 100,
}: {
  children: ReactNode;
  className?: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  size?: number;
}) {
  const gradients = {
    top: `linear-gradient(to bottom, transparent, var(--cream-light) ${size}px)`,
    bottom: `linear-gradient(to top, transparent, var(--cream-light) ${size}px)`,
    left: `linear-gradient(to right, transparent, var(--cream-light) ${size}px)`,
    right: `linear-gradient(to left, transparent, var(--cream-light) ${size}px)`,
  };

  return (
    <div className={`relative ${className}`}>
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: gradients[direction],
          [direction]: 0,
          height: direction === 'top' || direction === 'bottom' ? size : '100%',
          width: direction === 'left' || direction === 'right' ? size : '100%',
        }}
      />
    </div>
  );
}

// Animated border glow
export function GlowBorder({
  children,
  className = '',
  glowColor = 'rgba(91, 158, 173, 0.3)',
  borderRadius = 8,
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: number;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
    >
      <motion.div
        className="absolute -inset-[1px] opacity-0"
        style={{
          background: glowColor,
          borderRadius,
          filter: 'blur(8px)',
        }}
        variants={{
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative" style={{ borderRadius }}>
        {children}
      </div>
    </motion.div>
  );
}
