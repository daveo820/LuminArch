'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Product } from '@/types/shop';
import { useCartStore } from '@/stores/useCartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { addItem } = useCartStore();
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = isOnSale
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const firstAvailableSize = product.sizes.find((size) =>
      product.variants.some(
        (v) => v.size === size && v.color === selectedColor.name && v.stock > 0
      )
    );

    if (firstAvailableSize) {
      addItem(product.id, firstAvailableSize, selectedColor.name, 1);
      toast.success(`Added ${product.name} to cart!`);
    } else {
      toast.error('This color is out of stock');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/shop/${product.slug}`} className="block" data-cursor="pointer">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-sand mb-4">
          {/* Main Image */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-700 ${
                isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
            />
          </motion.div>

          {/* Hover Image */}
          {product.images[1] && (
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: isHovered ? 1 : 1.08,
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Image
                src={product.images[1]}
                alt={`${product.name} - alternate view`}
                fill
                className={`object-cover transition-opacity duration-700 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>
          )}

          {/* Overlay gradient on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.new && (
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="px-3 py-1 bg-black text-white text-[10px] tracking-[0.15em] uppercase"
              >
                New
              </motion.span>
            )}
            {product.bestseller && (
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-3 py-1 bg-white text-black text-[10px] tracking-[0.15em] uppercase"
              >
                Best
              </motion.span>
            )}
            {isOnSale && (
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="px-3 py-1 bg-coral text-white text-[10px] tracking-[0.15em] uppercase"
              >
                -{discount}%
              </motion.span>
            )}
          </div>

          {/* Quick Add Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            onClick={handleQuickAdd}
            className="absolute bottom-4 left-4 right-4 py-3 bg-white/95 backdrop-blur-sm text-black text-xs tracking-[0.15em] uppercase font-medium hover:bg-black hover:text-white transition-colors duration-300 z-10"
          >
            Quick Add
          </motion.button>

          {/* Bottom line animation */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-black z-10"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '100%' : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <motion.button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color);
                  }}
                  className={`w-5 h-5 rounded-full transition-all duration-300 ${
                    selectedColor.name === color.name
                      ? 'ring-2 ring-black ring-offset-2'
                      : 'ring-1 ring-black/10 hover:ring-black/30'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-medium text-black text-sm tracking-wide group-hover:text-gray transition-colors duration-300">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className={`font-medium ${isOnSale ? 'text-coral' : 'text-black'}`}>
              ${product.price}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray line-through">
                ${product.compareAtPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;
