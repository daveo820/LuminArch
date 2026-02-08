'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCard } from '@/components/shop/ProductCard';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress, ScrollIndicator } from '@/components/ui/SmoothScroll';
import { MarqueeText } from '@/components/ui/TextReveal';
import { TextScramble, SplitText } from '@/components/ui/TextEffects';
import { TiltCard, GlowCard } from '@/components/ui/TiltCard';
import { FadeIn, ScaleOnScroll, StaggerChildren, staggerItem } from '@/components/ui/ScrollAnimations';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { GradientOrbs, InteractiveBlob, FloatingParticles, RisingParticles, NoiseOverlay } from '@/components/immersive/Particles';
import { CursorGlow, CursorTrail } from '@/components/immersive/CursorGlow';
import { HorizontalScrollWithProgress, FeaturedScrollItem } from '@/components/immersive/HorizontalScroll';
import { TextReveal, StickyReveal, CharacterReveal, MaskReveal, ScrollCounter } from '@/components/immersive/StickyReveal';
import { getFeaturedProducts, getNewProducts, products } from '@/data/products';

const vibes = [
  {
    id: 'beach-day',
    name: 'Beach Day',
    emoji: '🏖️',
    description: 'Sun, sand, and good vibes',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
  },
  {
    id: 'sunset-drinks',
    name: 'Cozy Nights',
    emoji: '🌅',
    description: 'Golden hour essentials',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600',
  },
  {
    id: 'brunch',
    name: 'Brunch Ready',
    emoji: '🥂',
    description: 'Effortlessly chic',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
  },
  {
    id: 'boardwalk',
    name: 'Everyday',
    emoji: '🌴',
    description: 'Your daily go-to',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600',
  },
];

// Floating shapes component
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)`,
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// Animated line divider
function AnimatedDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const isFeaturedInView = useInView(featuredRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Banner parallax
  const { scrollYProgress: bannerProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '150%']);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const bannerY = useTransform(bannerProgress, [0, 1], ['20%', '-20%']);
  const bannerScale = useTransform(bannerProgress, [0, 0.5, 1], [1.2, 1, 1.1]);

  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <CursorGlow />
      <CursorTrail />
      <InteractiveBlob />
      <GradientOrbs />
      <NoiseOverlay opacity={0.02} />
      <ScrollProgress />
      <Navbar />
      <CartDrawer />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden bg-black">
          {/* Background Image with Parallax, Scale & Rotation */}
          <motion.div
            style={{ y: heroY, scale: heroScale, rotate: heroRotate }}
            className="absolute inset-[-10%]"
          >
            <Image
              src="/hero-wilmington-pier.jpg"
              alt="Wilmington Pier aerial view"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
          </motion.div>

          {/* Floating shapes */}
          <FloatingShapes />

          {/* Floating particles */}
          <FloatingParticles count={40} color="rgba(255,255,255,0.08)" minSize={1} maxSize={4} />

          {/* Animated grain overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

          {/* Hero Content */}
          <motion.div
            style={{ opacity: heroOpacity, y: textY, scale: textScale }}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mb-8"
            >
              <span className="text-[10px] md:text-xs tracking-[0.5em] text-white/40 uppercase">
                EST. 2025 &bull; Wilmington, NC
              </span>
            </motion.div>

            {/* Main Logo with staggered reveal */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: '120%', rotateX: -40 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 1.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="font-brand text-[18vw] md:text-[14vw] lg:text-[12vw] text-white leading-none tracking-[0.05em]"
                style={{ perspective: 1000 }}
              >
                NOWADAYS.
              </motion.h1>
            </div>

            {/* Script tagline with character animation */}
            <div className="overflow-hidden mb-16">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="font-script text-2xl md:text-4xl lg:text-5xl text-white/70"
              >
                Learn to love the now
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton strength={0.2}>
                <Link
                  href="/shop"
                  className="group relative px-14 py-5 bg-white text-black text-sm tracking-[0.2em] uppercase overflow-hidden inline-block"
                  data-cursor="pointer"
                  data-cursor-text="Shop"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Shop Collection
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link
                  href="/shop?new=true"
                  className="group relative px-14 py-5 border border-white/40 text-white text-sm tracking-[0.2em] uppercase overflow-hidden inline-block"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                    New Arrivals
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white origin-bottom"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Scroll Indicator */}
            <ScrollIndicator />
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-8 left-8 text-white/30 text-[10px] tracking-[0.3em] uppercase hidden lg:block"
          >
            Scroll to explore
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-8 right-8 text-white/30 text-[10px] tracking-[0.3em] uppercase hidden lg:block"
          >
            Premium Sweat Sets
          </motion.div>
        </section>

        {/* Marquee Section with enhanced animation */}
        <section className="py-8 bg-black border-y border-white/5 overflow-hidden relative">
          <AnimatedDivider />
          <div className="py-4">
            <MarqueeText className="font-brand text-2xl md:text-3xl text-white/20 tracking-[0.4em]">
              LIVE WELL &bull; LEARN TO LOVE THE NOW &bull; EVERY MOMENT BECOMES A MEMORY &bull; PREMIUM SWEAT SETS &bull; WILMINGTON NC &bull;
            </MarqueeText>
          </div>
          <AnimatedDivider />
        </section>

        {/* Shop by Vibe Section */}
        <section className="py-32 md:py-40 bg-cream-light relative">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

          <div className="container mx-auto px-4">
            <FadeIn className="text-center mb-20">
              <motion.span
                className="text-[10px] tracking-[0.5em] text-gray uppercase mb-6 block"
              >
                Find Your Style
              </motion.span>
              <h2 className="font-brand text-6xl md:text-8xl text-black tracking-wider">
                <TextScramble>SHOP BY VIBE</TextScramble>
              </h2>
            </FadeIn>

            <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8" staggerDelay={0.15}>
              {vibes.map((vibe, index) => (
                <motion.div key={vibe.id} variants={staggerItem}>
                  <TiltCard className="h-full" intensity={10}>
                    <Link
                      href={`/shop?vibe=${vibe.id}`}
                      className="group block relative aspect-[3/4] overflow-hidden"
                      data-cursor="pointer"
                    >
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                      >
                        <Image
                          src={vibe.image}
                          alt={vibe.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <motion.span
                          className="text-4xl mb-4 block transform"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {vibe.emoji}
                        </motion.span>
                        <h3 className="font-brand text-2xl md:text-3xl tracking-wider text-white mb-2">
                          {vibe.name.toUpperCase()}
                        </h3>
                        <p className="text-sm text-white/50 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          {vibe.description}
                        </p>
                      </div>

                      {/* Hover overlay effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Bottom line animation */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-white"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                      />
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Horizontal Scroll Product Showcase */}
        <HorizontalScrollWithProgress title="BESTSELLERS" subtitle="Shop the Look">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <FeaturedScrollItem
              key={product.id}
              image={product.images[0]}
              title={product.name}
              subtitle={product.category}
              price={`$${product.price}`}
              href={`/shop/${product.slug}`}
              index={index}
            />
          ))}
        </HorizontalScrollWithProgress>

        {/* Text Reveal Manifesto */}
        <section className="bg-black py-24 md:py-32">
          <div className="container mx-auto px-4">
            <TextReveal className="font-brand text-3xl md:text-5xl lg:text-6xl text-white tracking-wider leading-tight max-w-4xl mx-auto text-center">
              Learn to love the now. Every moment becomes a memory. This is your story — wear it well.
            </TextReveal>
          </div>
        </section>

        {/* Featured Products */}
        <section ref={featuredRef} className="py-32 md:py-40 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <FadeIn direction="left">
                <span className="text-[10px] tracking-[0.5em] text-gray uppercase mb-6 block">
                  Bestsellers
                </span>
                <h2 className="font-brand text-6xl md:text-8xl text-black tracking-wider">
                  <SplitText animation="fadeUp" staggerDelay={0.05}>FEATURED SETS</SplitText>
                </h2>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <MagneticButton>
                  <Link
                    href="/shop?featured=true"
                    className="group inline-flex items-center gap-4 text-black text-sm tracking-[0.2em] uppercase"
                  >
                    View All
                    <motion.span
                      className="w-12 h-[1px] bg-black origin-left"
                      whileHover={{ scaleX: 1.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </MagneticButton>
              </FadeIn>
            </div>

            <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10" staggerDelay={0.1}>
              {featuredProducts.slice(0, 4).map((product, index) => (
                <motion.div key={product.id} variants={staggerItem}>
                  <GlowCard glowColor="rgba(0, 0, 0, 0.05)">
                    <ProductCard product={product} priority={index < 2} />
                  </GlowCard>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Full-width Image Banner with enhanced parallax */}
        <section ref={bannerRef} className="relative h-[80vh] min-h-[600px] overflow-hidden">
          <motion.div
            className="absolute inset-[-20%]"
            style={{ y: bannerY, scale: bannerScale }}
          >
            <Image
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920"
              alt="Beach sunset"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          {/* Floating shapes */}
          <FloatingShapes />

          {/* Rising particles like ocean mist */}
          <RisingParticles count={25} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <ScaleOnScroll scaleFrom={0.8}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[10px] tracking-[0.5em] text-white/50 uppercase mb-8 block"
              >
                Just Dropped
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="font-brand text-7xl md:text-9xl lg:text-[12rem] text-white tracking-wider mb-12"
              >
                NEW IN
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <MagneticButton strength={0.15}>
                  <Link
                    href="/shop?new=true"
                    className="group relative inline-block px-14 py-5 bg-white text-black text-sm tracking-[0.2em] uppercase overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      Shop New Arrivals
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-black origin-center"
                      initial={{ scale: 0, borderRadius: '100%' }}
                      whileHover={{ scale: 2, borderRadius: '0%' }}
                      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                    />
                  </Link>
                </MagneticButton>
              </motion.div>
            </ScaleOnScroll>
          </div>
        </section>

        {/* New Products Grid */}
        {newProducts.length > 0 && (
          <section className="py-32 md:py-40 bg-cream-light">
            <div className="container mx-auto px-4">
              <FadeIn className="text-center mb-20">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 'auto' }}
                  viewport={{ once: true }}
                  className="inline-block px-8 py-3 bg-black text-white text-[10px] tracking-[0.4em] uppercase mb-8 overflow-hidden"
                >
                  New In
                </motion.span>
                <h2 className="font-brand text-6xl md:text-8xl text-black tracking-wider">
                  <TextScramble revealDelay={300}>FRESH DROPS</TextScramble>
                </h2>
              </FadeIn>

              <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10" staggerDelay={0.1}>
                {newProducts.slice(0, 4).map((product) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <GlowCard glowColor="rgba(0, 0, 0, 0.05)">
                      <ProductCard product={product} />
                    </GlowCard>
                  </motion.div>
                ))}
              </StaggerChildren>
            </div>
          </section>
        )}

        {/* Instagram Section with reveal mask */}
        <section className="py-32 md:py-40 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <FadeIn className="text-center mb-20">
              <span className="text-[10px] tracking-[0.5em] text-gray uppercase mb-6 block">
                Join the Community
              </span>
              <h2 className="font-brand text-5xl md:text-7xl text-black tracking-wider mb-8">
                <SplitText animation="fadeUp">@NOWADAYSWILMINGTON</SplitText>
              </h2>
              <MagneticButton>
                <a
                  href="https://instagram.com/nowadayswilmington"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-black hover:text-gray transition-colors"
                >
                  <span className="text-sm tracking-[0.2em] uppercase">Follow</span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </motion.svg>
                </a>
              </MagneticButton>
            </FadeIn>

            {/* Instagram Grid with staggered reveal */}
            <StaggerChildren className="grid grid-cols-3 md:grid-cols-6 gap-2" staggerDelay={0.05}>
              {[...Array(6)].map((_, i) => (
                <motion.a
                  key={i}
                  variants={staggerItem}
                  href="https://instagram.com/nowadayswilmington"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <Image
                      src={products[i % products.length].images[0]}
                      alt="Instagram post"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 16vw"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center"
                  >
                    <motion.svg
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0.5 }}
                      whileHover={{ scale: 1 }}
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                    </motion.svg>
                  </motion.div>
                </motion.a>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Sticky Reveal Brand Story Section */}
        <StickyReveal
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
          imageAlt="Wilmington coastline"
          imagePosition="left"
          className="bg-cream-light"
        >
          <div className="space-y-8">
            <MaskReveal direction="up">
              <span className="text-[10px] tracking-[0.5em] text-gray uppercase">Our Story</span>
            </MaskReveal>
            <h2 className="font-brand text-5xl md:text-7xl text-black tracking-wider">
              <CharacterReveal delay={0.2}>BORN BY THE SEA</CharacterReveal>
            </h2>
            <MaskReveal direction="up" delay={0.4}>
              <p className="text-text-secondary text-lg leading-relaxed max-w-md">
                Nowadays was born from the salt air and golden sunsets of Wilmington, NC.
                We believe in living well, dressing comfortably, and making every moment count.
              </p>
            </MaskReveal>
            <MaskReveal direction="up" delay={0.6}>
              <p className="text-text-secondary text-lg leading-relaxed max-w-md">
                Our sweat sets are designed for those who embrace the coastal lifestyle —
                whether you&apos;re catching waves at sunrise or watching the sunset from your porch.
              </p>
            </MaskReveal>
            <MaskReveal direction="left" delay={0.8}>
              <Link
                href="/about"
                className="inline-flex items-center gap-4 text-black text-sm tracking-[0.2em] uppercase group"
              >
                Learn More
                <span className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-300" />
              </Link>
            </MaskReveal>
          </div>
        </StickyReveal>

        {/* Stats Section with ScrollCounter */}
        <section className="py-20 md:py-28 bg-black text-white relative overflow-hidden">
          <RisingParticles count={20} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              <FadeIn>
                <div className="space-y-2">
                  <div className="font-brand text-6xl md:text-8xl tracking-wider">
                    <ScrollCounter target={2025} className="tabular-nums" />
                  </div>
                  <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Est.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="space-y-2">
                  <div className="font-brand text-6xl md:text-8xl tracking-wider">
                    <ScrollCounter target={100} suffix="%" className="tabular-nums" />
                  </div>
                  <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Cotton</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="space-y-2">
                  <div className="font-brand text-6xl md:text-8xl tracking-wider">
                    <ScrollCounter target={5} prefix="" suffix="K+" className="tabular-nums" />
                  </div>
                  <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Happy Customers</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="space-y-2">
                  <div className="font-brand text-6xl md:text-8xl tracking-wider">
                    <ScrollCounter target={24} suffix="/7" className="tabular-nums" />
                  </div>
                  <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Beach Vibes</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Newsletter Section with floating elements */}
        <section className="relative py-40 overflow-hidden bg-black">
          <FloatingShapes />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-8 block">
                  Stay Connected
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-brand text-6xl md:text-8xl tracking-wider mb-8" style={{ color: '#FFFFFF' }}>
                  JOIN THE NOW
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-white/40 mb-12 text-lg">
                  Subscribe for exclusive drops and 10% off your first order
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-8 py-5 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-all duration-300 focus:bg-white/10"
                  />
                  <MagneticButton strength={0.1}>
                    <button
                      type="submit"
                      className="group relative px-12 py-5 bg-white text-black text-sm tracking-[0.2em] uppercase overflow-hidden"
                    >
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Subscribe
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-black origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </button>
                  </MagneticButton>
                </form>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p className="text-[10px] text-white/20 mt-8 tracking-wider">
                  No spam, just good vibes. Unsubscribe anytime.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Animated border lines */}
          <div className="absolute top-0 left-0 w-full overflow-hidden">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
