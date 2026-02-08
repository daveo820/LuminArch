'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'wave',
}: SkeletonProps) {
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const baseStyles = `bg-sand-dark/50 ${variantStyles[variant]}`;

  const style = {
    width: width ?? '100%',
    height: height ?? (variant === 'text' ? '1em' : '100%'),
  };

  if (animation === 'none') {
    return <div className={`${baseStyles} ${className}`} style={style} />;
  }

  if (animation === 'pulse') {
    return (
      <motion.div
        className={`${baseStyles} ${className}`}
        style={style}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    );
  }

  // Wave animation
  return (
    <div className={`${baseStyles} ${className} overflow-hidden relative`} style={style}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="group">
      <Skeleton className="aspect-[3/4] mb-4" variant="rounded" />
      <div className="space-y-3">
        <div className="flex gap-2">
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="circular" width={20} height={20} />
        </div>
        <Skeleton variant="text" height={16} width="70%" />
        <Skeleton variant="text" height={14} width="30%" />
      </div>
    </div>
  );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Text Block Skeleton
export function TextBlockSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={16}
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}

// Image Skeleton with blur placeholder
export function ImageSkeleton({ aspectRatio = '3/4' }: { aspectRatio?: string }) {
  return (
    <div className="relative overflow-hidden bg-sand" style={{ aspectRatio }}>
      <Skeleton className="absolute inset-0" />
    </div>
  );
}

// Cart Item Skeleton
export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 py-4 border-b border-sand">
      <Skeleton variant="rounded" width={80} height={100} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" height={16} width="80%" />
        <Skeleton variant="text" height={12} width="40%" />
        <Skeleton variant="text" height={14} width="25%" />
      </div>
    </div>
  );
}

// Hero Skeleton
export function HeroSkeleton() {
  return (
    <div className="relative h-screen">
      <Skeleton className="absolute inset-0" animation="pulse" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6">
          <Skeleton variant="text" height={80} width={400} className="mx-auto" />
          <Skeleton variant="text" height={24} width={300} className="mx-auto" />
          <Skeleton variant="rounded" height={50} width={180} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
