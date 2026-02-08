'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function HorizontalScroll({ children, className = '', speed = 1 }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${50 * speed}%`]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x: smoothX }}
          className={`flex gap-8 px-[10vw] ${className}`}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// Individual card for horizontal scroll
interface ScrollCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function ScrollCard({ children, className = '', index = 0 }: ScrollCardProps) {
  return (
    <motion.div
      className={`flex-shrink-0 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

// Horizontal scroll with progress indicator
interface HorizontalScrollWithProgressProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function HorizontalScrollWithProgress({
  children,
  title,
  subtitle,
}: HorizontalScrollWithProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        {(title || subtitle) && (
          <div className="absolute top-0 left-0 right-0 z-20 p-8 md:p-12">
            <div className="container mx-auto flex justify-between items-start">
              <div>
                {subtitle && (
                  <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase block mb-2">
                    {subtitle}
                  </span>
                )}
                {title && (
                  <h2 className="font-brand text-4xl md:text-6xl tracking-wider">{title}</h2>
                )}
              </div>
              {/* Progress indicator */}
              <div className="hidden md:block w-32">
                <div className="text-[10px] tracking-wider text-white/30 uppercase mb-2">
                  Scroll
                </div>
                <div className="h-[2px] bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scrolling content */}
        <div className="h-full flex items-center">
          <motion.div
            style={{ x: smoothX }}
            className="flex gap-6 md:gap-12 px-[5vw] pt-24"
          >
            {children}
          </motion.div>
        </div>

        {/* Gradient edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

// Large featured item for horizontal scroll
interface FeaturedScrollItemProps {
  image: string;
  title: string;
  subtitle?: string;
  price?: string;
  href?: string;
  index?: number;
}

export function FeaturedScrollItem({
  image,
  title,
  subtitle,
  price,
  href = '#',
  index = 0,
}: FeaturedScrollItemProps) {
  return (
    <motion.a
      href={href}
      className="group flex-shrink-0 w-[70vw] md:w-[40vw] relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden mb-6">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8 }}
        />
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <span className="text-white text-sm tracking-[0.3em] uppercase border border-white px-6 py-3">
            View
          </span>
        </motion.div>
      </div>

      {/* Text content */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-brand text-2xl md:text-3xl tracking-wider mb-1">{title}</h3>
          {subtitle && <p className="text-white/50 text-sm">{subtitle}</p>}
        </div>
        {price && <span className="font-brand text-xl">{price}</span>}
      </div>

      {/* Animated underline */}
      <motion.div
        className="h-[1px] bg-white/20 mt-4 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
      />
    </motion.a>
  );
}
