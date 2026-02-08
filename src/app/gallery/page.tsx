'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { FadeIn, StaggerChildren, staggerItem } from '@/components/ui/ScrollAnimations';
import { TextScramble } from '@/components/ui/TextEffects';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    alt: 'Casual street style look',
    category: 'lifestyle',
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    alt: 'Summer vibes collection',
    category: 'lookbook',
  },
  {
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    alt: 'Beach day essentials',
    category: 'lifestyle',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    alt: 'Coastal sunset session',
    category: 'lookbook',
  },
  {
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
    alt: 'Minimalist style',
    category: 'lookbook',
  },
  {
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    alt: 'Downtown Wilmington vibes',
    category: 'lifestyle',
  },
  {
    src: 'https://images.unsplash.com/photo-1485968579169-a6d6e9c7b6a4?w=800&q=80',
    alt: 'Athleisure comfort',
    category: 'product',
  },
  {
    src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    alt: 'Casual everyday look',
    category: 'lookbook',
  },
  {
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    alt: 'Premium sweat set detail',
    category: 'product',
  },
  {
    src: 'https://images.unsplash.com/photo-1475180429745-4a210df74d76?w=800&q=80',
    alt: 'Sunset beach moment',
    category: 'lifestyle',
  },
  {
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    alt: 'Shopping day style',
    category: 'lifestyle',
  },
  {
    src: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    alt: 'Neutral tones collection',
    category: 'product',
  },
];

const categories = ['all', 'lifestyle', 'lookbook', 'product'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <>
      <CustomCursor />
      <CartDrawer />
      <Navbar />

      <main className="min-h-screen bg-cream-light">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-black text-white overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
              alt="Gallery hero"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <FadeIn>
              <span className="text-[10px] tracking-[0.5em] text-white/50 uppercase mb-6 block">
                @nowadayswilmington
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-brand text-7xl md:text-9xl tracking-wider mb-6">
                <TextScramble>GALLERY</TextScramble>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/60 text-lg max-w-xl mx-auto">
                Moments captured in the now. Real people, real style, real life.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="sticky top-[72px] z-40 bg-cream-light/95 backdrop-blur-sm border-b border-sand py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 md:px-6 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-black text-white'
                      : 'bg-transparent text-gray hover:text-black'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4" staggerDelay={0.08}>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${image.src}-${index}`}
                  variants={staggerItem}
                  className={`group relative overflow-hidden cursor-pointer ${
                    index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`relative ${index % 5 === 0 ? 'aspect-square' : 'aspect-[3/4]'}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes={index % 5 === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="text-white text-xs tracking-[0.2em] uppercase">
                        View
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-6 block">
                Be Part of the Now
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-brand text-5xl md:text-7xl tracking-wider mb-6">
                TAG US
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/50 mb-8 max-w-md mx-auto">
                Share your Nowadays moments with #NowadaysWilmington for a chance to be featured
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link
                href="https://instagram.com/nowadayswilmington"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
              >
                Follow @nowadayswilmington
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white text-2xl z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </motion.button>
            <motion.div
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[selectedImage].src.replace('w=800', 'w=1600')}
                alt={filteredImages[selectedImage].alt}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Navigation arrows */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(prev => prev === 0 ? filteredImages.length - 1 : (prev ?? 0) - 1);
              }}
            >
              ←
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(prev => prev === filteredImages.length - 1 ? 0 : (prev ?? 0) + 1);
              }}
            >
              →
            </button>
          </motion.div>
        )}
      </main>

      <Footer />
    </>
  );
}
