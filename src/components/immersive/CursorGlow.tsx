'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const glowX = useSpring(cursorX, springConfig);
  const glowY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check for touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9990]"
      style={{
        x: glowX,
        y: glowY,
      }}
    >
      {/* Large ambient glow */}
      <div
        className="absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        }}
      />
      {/* Medium glow */}
      <div
        className="absolute w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}

// Magnetic cursor effect for elements
export function MagneticCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(isTouch);
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer';

      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          className="w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-white"
          animate={{
            scale: isHovering ? 2.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: useSpring(cursorX, { damping: 30, stiffness: 150 }),
          y: useSpring(cursorY, { damping: 30, stiffness: 150 }),
        }}
      >
        <motion.div
          className="w-10 h-10 -ml-5 -mt-5 rounded-full border border-white/30"
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHovering ? 0 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </>
  );
}

// Cursor trail with particles
export function CursorTrail() {
  const [isMobile, setIsMobile] = useState(true);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(isTouch);
    if (isTouch) return;

    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 50) {
        lastTime = now;
        particleIdRef.current++;
        setParticles((prev) => [
          ...prev.slice(-12),
          { id: particleIdRef.current, x: e.clientX, y: e.clientY },
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(-8));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="fixed top-0 left-0 pointer-events-none z-[9995]"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            left: particle.x,
            top: particle.y,
          }}
        >
          <div
            className="w-2 h-2 -ml-1 -mt-1 rounded-full bg-white/30"
            style={{
              opacity: (index + 1) / particles.length,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
