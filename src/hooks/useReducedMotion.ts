'use client';

import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true); // Default to reduced for SSR

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Animation variants that respect reduced motion
export const motionSafe = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// Reduced motion variants - instant transitions
export const motionReduced = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0 },
  },
  fadeInDown: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0 },
  },
  scaleIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0 },
  },
  slideInLeft: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0 },
  },
  slideInRight: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0 },
  },
};

// Get the appropriate variants based on user preference
export function getMotionVariants(prefersReducedMotion: boolean) {
  return prefersReducedMotion ? motionReduced : motionSafe;
}
