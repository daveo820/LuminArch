'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// Parallax wrapper
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function Parallax({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const baseValue = speed * 100;
  const yUp = useTransform(scrollYProgress, [0, 1], [baseValue, -baseValue]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-baseValue, baseValue]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [baseValue, -baseValue]);
  const xRight = useTransform(scrollYProgress, [0, 1], [-baseValue, baseValue]);

  const transforms = {
    up: { y: yUp },
    down: { y: yDown },
    left: { x: xLeft },
    right: { x: xRight },
  };

  return (
    <motion.div ref={ref} className={className} style={transforms[direction]}>
      {children}
    </motion.div>
  );
}

// Fade in on scroll
interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const directionOffsets = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionOffsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionOffsets[direction] }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation
interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
}

export function StaggerChildren({
  children,
  className = '',
  staggerDelay = 0.1,
  delay = 0,
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// Horizontal scroll section
interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className={`flex gap-8 ${className}`}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// Scale on scroll
interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  scaleFrom?: number;
  scaleTo?: number;
}

export function ScaleOnScroll({
  children,
  className = '',
  scaleFrom = 0.8,
  scaleTo = 1,
}: ScaleOnScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo]), {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div ref={ref} className={className} style={{ scale, opacity }}>
      {children}
    </motion.div>
  );
}

// Rotate on scroll
interface RotateOnScrollProps {
  children: ReactNode;
  className?: string;
  rotateFrom?: number;
  rotateTo?: number;
}

export function RotateOnScroll({
  children,
  className = '',
  rotateFrom = -10,
  rotateTo = 0,
}: RotateOnScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [rotateFrom, rotateTo]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <motion.div ref={ref} className={className} style={{ rotate }}>
      {children}
    </motion.div>
  );
}

// Reveal mask animation
interface RevealMaskProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

export function RevealMask({
  children,
  className = '',
  direction = 'left',
}: RevealMaskProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const clipPaths = {
    left: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0% 0 0)',
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0%)',
    },
    top: {
      hidden: 'inset(0 0 100% 0)',
      visible: 'inset(0 0 0% 0)',
    },
    bottom: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0% 0 0 0)',
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : {}}
      transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Blur on scroll (out of view)
interface BlurOnScrollProps {
  children: ReactNode;
  className?: string;
}

export function BlurOnScroll({ children, className = '' }: BlurOnScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [10, 0, 0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
}
