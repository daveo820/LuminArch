'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextEffects';

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

interface ImmersiveHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export function ImmersiveHero({
  title = 'NOWADAYS.',
  subtitle = 'Learn to love the now',
  ctaText = 'Shop Now',
  ctaLink = '/shop',
  backgroundImage = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
}: ImmersiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax layers
  const backgroundY = useParallax(scrollYProgress, 300);
  const midgroundY = useParallax(scrollYProgress, 150);
  const foregroundY = useParallax(scrollYProgress, 50);

  // Scale and opacity
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Smooth springs
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative h-[150vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background layer - slowest */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: smoothBackgroundY, scale: smoothScale }}
        >
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
        </motion.div>

        {/* Floating shapes - midground */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ y: midgroundY }}
        >
          <FloatingShapes />
        </motion.div>

        {/* Content - foreground */}
        <motion.div
          className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4"
          style={{ y: textY, opacity }}
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-[10px] tracking-[0.5em] text-white/50 uppercase">
              Wilmington, NC • Est. 2025
            </span>
          </motion.div>

          {/* Main title with mask reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-brand text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none tracking-wider"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <TextScramble>{title}</TextScramble>
            </motion.h1>
          </div>

          {/* Subtitle with stagger */}
          <div className="overflow-hidden mb-12">
            <motion.p
              className="text-xl md:text-2xl text-white/70 font-light tracking-wide"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {subtitle}
            </motion.p>
          </div>

          {/* CTA with hover effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href={ctaLink}>
              <motion.span
                className="group relative inline-flex items-center gap-4 px-8 py-4 border border-white/30 text-white text-sm tracking-[0.2em] uppercase overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover fill */}
                <motion.span
                  className="absolute inset-0 bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  {ctaText}
                </span>
                <motion.span
                  className="relative z-10 group-hover:text-black transition-colors duration-300"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
                Scroll
              </span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>
    </div>
  );
}

// Floating shapes component
function FloatingShapes() {
  const shapes = [
    { size: 300, x: '10%', y: '20%', delay: 0 },
    { size: 200, x: '80%', y: '30%', delay: 0.5 },
    { size: 150, x: '20%', y: '70%', delay: 1 },
    { size: 250, x: '70%', y: '75%', delay: 1.5 },
    { size: 100, x: '50%', y: '50%', delay: 2 },
  ];

  return (
    <>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: `radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}
