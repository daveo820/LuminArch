'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  aspectRatio?: string;
  showSkeleton?: boolean;
  hoverZoom?: boolean;
  fadeIn?: boolean;
}

export function OptimizedImage({
  aspectRatio,
  showSkeleton = true,
  hoverZoom = false,
  fadeIn = true,
  className = '',
  alt,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${hoverZoom ? 'group' : ''}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton/Placeholder */}
      <AnimatePresence>
        {showSkeleton && !isLoaded && !hasError && (
          <motion.div
            className="absolute inset-0 bg-sand-dark/30"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-sand flex items-center justify-center">
          <span className="text-gray text-sm">Failed to load</span>
        </div>
      )}

      {/* Actual Image */}
      <motion.div
        className={`relative w-full h-full ${hoverZoom ? 'transition-transform duration-700 group-hover:scale-110' : ''}`}
        initial={fadeIn ? { opacity: 0 } : undefined}
        animate={fadeIn && isLoaded ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5 }}
      >
        <Image
          {...props}
          alt={alt}
          className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      </motion.div>
    </div>
  );
}

// Lazy-loaded image that only loads when in viewport
export function LazyImage({
  threshold = 0.1,
  ...props
}: OptimizedImageProps & { threshold?: number }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  return (
    <div
      className="relative"
      ref={(el) => {
        if (!el || shouldLoad) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              observer.disconnect();
            }
          },
          { threshold }
        );
        observer.observe(el);
      }}
    >
      {shouldLoad ? (
        <OptimizedImage {...props} />
      ) : (
        <div
          className="bg-sand-dark/30 animate-pulse"
          style={props.aspectRatio ? { aspectRatio: props.aspectRatio } : { paddingBottom: '100%' }}
        />
      )}
    </div>
  );
}

// Image with blur-up effect using a tiny placeholder
export function BlurImage({
  blurDataURL,
  ...props
}: OptimizedImageProps & { blurDataURL?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate a simple blur placeholder if none provided
  const defaultBlur = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRThFMkQ5Ii8+PC9zdmc+';

  return (
    <div className="relative overflow-hidden" style={props.aspectRatio ? { aspectRatio: props.aspectRatio } : undefined}>
      {/* Blurred placeholder */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1, filter: 'blur(20px)', scale: 1.1 }}
        animate={isLoaded ? { opacity: 0, filter: 'blur(0px)', scale: 1 } : undefined}
        transition={{ duration: 0.5 }}
      >
        <Image
          {...props}
          src={blurDataURL || defaultBlur}
          alt=""
          className="w-full h-full object-cover"
          priority
        />
      </motion.div>

      {/* Full image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : undefined}
        transition={{ duration: 0.3 }}
      >
        <Image
          {...props}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
    </div>
  );
}
