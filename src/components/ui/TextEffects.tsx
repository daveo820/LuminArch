'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

// Text scramble effect
interface TextScrambleProps {
  children: string;
  className?: string;
  scrambleSpeed?: number;
  revealDelay?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function TextScramble({
  children,
  className = '',
  scrambleSpeed = 30,
  revealDelay = 0,
}: TextScrambleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayText, setDisplayText] = useState(children);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    setHasAnimated(true);
    const originalText = children.toUpperCase();
    let iteration = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          originalText
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) return originalText[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, scrambleSpeed);

      return () => clearInterval(interval);
    }, revealDelay);

    return () => clearTimeout(timeout);
  }, [isInView, children, scrambleSpeed, revealDelay, hasAnimated]);

  return (
    <span ref={ref} className={`[color:inherit] ${className}`}>
      {displayText}
    </span>
  );
}

// Split text with stagger animation
interface SplitTextProps {
  children: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerDelay?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'scaleUp' | 'rotateIn';
}

const animations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { opacity: 1, rotateX: 0 },
  },
};

export function SplitText({
  children,
  className = '',
  charClassName = '',
  delay = 0,
  staggerDelay = 0.03,
  animation = 'fadeUp',
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const words = children.split(' ');

  return (
    <span ref={ref} className={`inline-block [color:inherit] ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap [color:inherit]">
          {word.split('').map((char, charIndex) => {
            const globalIndex =
              words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + charIndex;
            return (
              <motion.span
                key={charIndex}
                className={`inline-block [color:inherit] ${charClassName}`}
                variants={animations[animation]}
                initial="hidden"
                animate={controls}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1],
                  delay: delay + globalIndex * staggerDelay,
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

// Typewriter effect
interface TypewriterProps {
  children: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export function Typewriter({
  children,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true,
}: TypewriterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= children.length) {
          setDisplayText(children.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          // Blink cursor after typing
          if (cursor) {
            const blinkInterval = setInterval(() => {
              setShowCursor((prev) => !prev);
            }, 500);
            return () => clearInterval(blinkInterval);
          }
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, children, speed, delay, cursor]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && (
        <span className={`inline-block w-[2px] h-[1em] bg-current ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
      )}
    </span>
  );
}

// Counter animation
interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  className = '',
  prefix = '',
  suffix = '',
}: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const currentCount = Math.floor(from + (to - from) * easeProgress);

        setCount(currentCount);

        if (now < endTime) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(to);
        }
      };

      requestAnimationFrame(updateCount);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, from, to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// Gradient text animation
export function GradientText({
  children,
  className = '',
  colors = ['#1A1A1A', '#5B9EAD', '#1A1A1A'],
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
      }}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}
