'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower spring for outer ring
  const outerSpringConfig = { damping: 35, stiffness: 150 };
  const outerXSpring = useSpring(cursorX, outerSpringConfig);
  const outerYSpring = useSpring(cursorY, outerSpringConfig);

  useEffect(() => {
    let lastTrailTime = 0;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail points with throttling
      const now = Date.now();
      if (now - lastTrailTime > 30) {
        lastTrailTime = now;
        trailIdRef.current += 1;
        setTrail((prev) => [
          ...prev.slice(-8),
          { x: e.clientX, y: e.clientY, id: trailIdRef.current },
        ]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        setIsHovering(true);
        setCursorText(target.dataset.cursorText || '');
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Clear old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(-6));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Hide on mobile/touch devices
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check for touch capability
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // Also check media query for hover capability
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setIsMobile(isTouch || !hasHover);
  }, []);

  // Don't render custom cursor on mobile/touch devices
  if (isMobile) return null;

  return (
    <>
      {/* Cursor trail */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="fixed top-0 left-0 pointer-events-none z-[9996]"
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              x: point.x - 3,
              y: point.y - 3,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-black/30"
              style={{ opacity: (index + 1) / trail.length }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Outer ring - follows slower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: outerXSpring,
          y: outerYSpring,
        }}
      >
        <motion.div
          className="w-10 h-10 -ml-5 -mt-5 rounded-full border border-black/30"
          animate={{
            scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
            opacity: isHovering ? 0 : 0.6,
            borderWidth: isClicking ? 2 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="rounded-full bg-white"
            animate={{
              width: isHovering ? 80 : 12,
              height: isHovering ? 80 : 12,
              marginLeft: isHovering ? -40 : -6,
              marginTop: isHovering ? -40 : -6,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          />
          <AnimatePresence>
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute text-black text-xs font-medium tracking-wider uppercase"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

    </>
  );
}

// Simplified cursor for performance
export function SimpleCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMobile('ontouchstart' in window);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 -ml-2 -mt-2 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x, y }}
    >
      <div className="w-full h-full rounded-full bg-white" />
    </motion.div>
  );
}
