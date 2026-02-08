'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/SmoothScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageWrapperProps {
  children: ReactNode;
  showScrollProgress?: boolean;
  showCursor?: boolean;
  className?: string;
  bgColor?: 'cream' | 'white' | 'black';
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export function PageWrapper({
  children,
  showScrollProgress = true,
  showCursor = true,
  className = '',
  bgColor = 'cream',
}: PageWrapperProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const bgColors = {
    cream: 'bg-cream-light',
    white: 'bg-white',
    black: 'bg-black',
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      {showCursor && <CustomCursor />}
      {showScrollProgress && <ScrollProgress />}
      <CartDrawer />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          id="main-content"
          className={`min-h-screen ${bgColors[bgColor]} ${className}`}
          variants={prefersReducedMotion ? reducedMotionVariants : pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}

// Hero section wrapper with parallax effect
export function HeroSection({
  children,
  className = '',
  height = 'h-screen',
  overlay = true,
  overlayOpacity = 0.4,
}: {
  children: ReactNode;
  className?: string;
  height?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}) {
  return (
    <section className={`relative ${height} overflow-hidden ${className}`}>
      {overlay && (
        <div
          className="absolute inset-0 bg-black pointer-events-none z-10"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-20 h-full">{children}</div>
    </section>
  );
}

// Content section wrapper with consistent spacing
export function Section({
  children,
  className = '',
  id,
  bgColor = 'transparent',
  paddingY = 'py-16 md:py-24',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bgColor?: 'transparent' | 'cream' | 'white' | 'black' | 'sand';
  paddingY?: string;
}) {
  const bgColors = {
    transparent: '',
    cream: 'bg-cream-light',
    white: 'bg-white',
    black: 'bg-black text-white',
    sand: 'bg-sand',
  };

  return (
    <section id={id} className={`${paddingY} ${bgColors[bgColor]} ${className}`}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

// Section header with consistent styling
export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className = '',
  titleClassName = '',
}: {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignClasses[align]} ${className}`}>
      {label && (
        <motion.span
          className="text-[10px] tracking-[0.5em] text-gray uppercase mb-4 block"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        className={`font-brand text-5xl md:text-7xl tracking-wider ${titleClassName}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className="text-gray mt-4 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
