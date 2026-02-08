'use client';

import { useRef, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';

interface StickyRevealProps {
  children: ReactNode;
  image: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  className?: string;
}

export function StickyReveal({
  children,
  image,
  imageAlt = '',
  imagePosition = 'left',
  className = '',
}: StickyRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.6], [100, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className={`relative min-h-[120vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className={`container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
          imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
        }`}>
          {/* Image */}
          <motion.div
            className={`relative aspect-[4/5] overflow-hidden ${imagePosition === 'right' ? 'lg:order-2' : ''}`}
            style={{ opacity: imageOpacity }}
          >
            <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className={imagePosition === 'right' ? 'lg:order-1' : ''}
            style={{ y: contentY, opacity: contentOpacity }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Text reveal on scroll - word by word
interface TextRevealProps {
  children: string;
  className?: string;
}

export function TextReveal({ children, className = '' }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = children.split(' ');

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mr-[0.25em] mt-[0.1em]">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

// Character reveal animation
interface CharacterRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function CharacterReveal({ children, className = '', delay = 0 }: CharacterRevealProps) {
  const characters = children.split('');

  return (
    <span className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Mask reveal - reveals content with a sliding mask
interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export function MaskReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}: MaskRevealProps) {
  const getInitialClipPath = () => {
    switch (direction) {
      case 'up': return 'inset(100% 0 0 0)';
      case 'down': return 'inset(0 0 100% 0)';
      case 'left': return 'inset(0 100% 0 0)';
      case 'right': return 'inset(0 0 0 100%)';
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ clipPath: getInitialClipPath() }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Number counter with scroll trigger
interface ScrollCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function ScrollCounter({
  target,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2,
}: ScrollCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: 'easeOut',
        onUpdate: (value) => setCount(Math.round(value)),
      });
      return () => controls.stop();
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span>{count}</span>
      {suffix}
    </span>
  );
}
