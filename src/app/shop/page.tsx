'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCard } from '@/components/shop/ProductCard';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/SmoothScroll';
import { FadeIn, StaggerChildren, staggerItem } from '@/components/ui/ScrollAnimations';
import { TextScramble } from '@/components/ui/TextEffects';
import { products } from '@/data/products';
import type { ProductVibe, SortOption } from '@/types/shop';

const styles: { id: string; label: string }[] = [
  { id: 'all', label: 'All Sets' },
  { id: 'hoodie', label: 'Hoodie Sets' },
  { id: 'crewneck', label: 'Crewneck Sets' },
  { id: 'zip-up', label: 'Zip-Up Sets' },
  { id: 'cropped', label: 'Cropped Sets' },
];

const vibes: { id: ProductVibe; label: string; emoji: string }[] = [
  { id: 'brunch', label: 'Brunch Ready', emoji: '🥂' },
  { id: 'sunset-drinks', label: 'Cozy Nights', emoji: '🌅' },
  { id: 'beach-day', label: 'Beach Vibes', emoji: '🏖️' },
  { id: 'boardwalk', label: 'Everyday', emoji: '🌴' },
];

const sortOptions: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'bestselling', label: 'Best Selling' },
];

function ShopContent() {
  const searchParams = useSearchParams();

  const initialStyle = searchParams.get('style') || 'all';
  const initialVibe = searchParams.get('vibe') as ProductVibe | null;
  const showNew = searchParams.get('new') === 'true';
  const showFeatured = searchParams.get('featured') === 'true';

  const [selectedStyle, setSelectedStyle] = useState<string>(initialStyle);
  const [selectedVibe, setSelectedVibe] = useState<ProductVibe | null>(initialVibe);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedStyle !== 'all') {
      filtered = filtered.filter((p) => p.tags.includes(selectedStyle));
    }

    if (selectedVibe) {
      filtered = filtered.filter((p) => p.vibes.includes(selectedVibe));
    }

    if (showNew) {
      filtered = filtered.filter((p) => p.new);
    }

    if (showFeatured) {
      filtered = filtered.filter((p) => p.featured);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'bestselling':
        filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [selectedStyle, selectedVibe, sortBy, showNew, showFeatured]);

  const clearFilters = () => {
    setSelectedStyle('all');
    setSelectedVibe(null);
  };

  const hasActiveFilters = selectedStyle !== 'all' || selectedVibe !== null;

  return (
    <main className="min-h-screen bg-cream-light">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black text-white py-20 md:py-28 relative overflow-hidden"
      >
        {/* Animated background lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full"
              style={{ top: `${20 + i * 20}%` }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-6 block">
              {showNew ? 'Fresh Drops' : showFeatured ? 'Our Favorites' : 'Collection'}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-brand text-6xl md:text-8xl lg:text-9xl tracking-wider mb-4">
              <TextScramble>
                {showNew ? 'NEW IN' : showFeatured ? 'FEATURED' : 'SHOP'}
              </TextScramble>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-lg">
              {filteredProducts.length} matching set{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </FadeIn>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block">
            <FadeIn direction="left">
              <div className="sticky top-28 space-y-10">
                {/* Styles */}
                <div>
                  <h3 className="font-brand text-xl tracking-wider text-black mb-6">STYLE</h3>
                  <div className="space-y-1">
                    {styles.map((style, index) => (
                      <motion.button
                        key={style.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`group block w-full text-left px-4 py-3 transition-all duration-300 ${
                          selectedStyle === style.id
                            ? 'bg-black text-white'
                            : 'hover:bg-black/5 text-gray'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          {style.label}
                          {selectedStyle === style.id && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-1.5 h-1.5 bg-white rounded-full"
                            />
                          )}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Vibes */}
                <div>
                  <h3 className="font-brand text-xl tracking-wider text-black mb-6">VIBE</h3>
                  <div className="space-y-1">
                    {vibes.map((vibe, index) => (
                      <motion.button
                        key={vibe.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        onClick={() =>
                          setSelectedVibe(selectedVibe === vibe.id ? null : vibe.id)
                        }
                        className={`group flex items-center gap-3 w-full text-left px-4 py-3 transition-all duration-300 ${
                          selectedVibe === vibe.id
                            ? 'bg-black text-white'
                            : 'hover:bg-black/5 text-gray'
                        }`}
                      >
                        <span className="text-lg">{vibe.emoji}</span>
                        <span>{vibe.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onClick={clearFilters}
                      className="text-sm tracking-wider uppercase text-gray hover:text-black transition-colors underline underline-offset-4"
                    >
                      Clear all filters
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </aside>

          {/* Main Content */}
          <div>
            {/* Mobile Filter Bar */}
            <div className="lg:hidden flex items-center justify-between mb-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-3 px-5 py-3 bg-black text-white text-sm tracking-wider uppercase"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-white text-black text-xs rounded-full flex items-center justify-center">
                    {(selectedStyle !== 'all' ? 1 : 0) + (selectedVibe ? 1 : 0)}
                  </span>
                )}
              </motion.button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 bg-white border border-black/10 text-sm tracking-wider"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Sort */}
            <FadeIn className="hidden lg:flex items-center justify-between mb-10">
              {/* Active Filters Pills */}
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {selectedStyle !== 'all' && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 text-black text-sm"
                    >
                      {styles.find((s) => s.id === selectedStyle)?.label}
                      <button
                        onClick={() => setSelectedStyle('all')}
                        className="hover:text-gray"
                      >
                        ×
                      </button>
                    </motion.span>
                  )}
                  {selectedVibe && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 text-black text-sm"
                    >
                      {vibes.find((v) => v.id === selectedVibe)?.emoji}{' '}
                      {vibes.find((v) => v.id === selectedVibe)?.label}
                      <button
                        onClick={() => setSelectedVibe(null)}
                        className="hover:text-gray"
                      >
                        ×
                      </button>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 bg-white border border-black/10 text-sm tracking-wider focus:border-black focus:outline-none transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </FadeIn>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <StaggerChildren
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
                staggerDelay={0.08}
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </StaggerChildren>
            ) : (
              <FadeIn className="text-center py-24">
                <motion.div
                  className="w-24 h-24 mx-auto mb-8 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-6xl">🔍</span>
                </motion.div>
                <h3 className="font-brand text-3xl text-black mb-4">
                  NO SETS FOUND
                </h3>
                <p className="text-gray mb-8">
                  Try adjusting your filters or browse all sets
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="px-8 py-4 bg-black text-white text-sm tracking-[0.2em] uppercase"
                >
                  Clear Filters
                </motion.button>
              </FadeIn>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-brand text-2xl tracking-wider">FILTERS</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Styles */}
                <div className="mb-8">
                  <h3 className="font-brand text-lg tracking-wider mb-4">STYLE</h3>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((style) => (
                      <motion.button
                        key={style.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`px-5 py-3 text-sm tracking-wider transition-all ${
                          selectedStyle === style.id
                            ? 'bg-black text-white'
                            : 'bg-black/5 text-black'
                        }`}
                      >
                        {style.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Vibes */}
                <div className="mb-8">
                  <h3 className="font-brand text-lg tracking-wider mb-4">VIBE</h3>
                  <div className="flex flex-wrap gap-2">
                    {vibes.map((vibe) => (
                      <motion.button
                        key={vibe.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSelectedVibe(selectedVibe === vibe.id ? null : vibe.id)
                        }
                        className={`px-5 py-3 text-sm tracking-wider flex items-center gap-2 transition-all ${
                          selectedVibe === vibe.id
                            ? 'bg-black text-white'
                            : 'bg-black/5 text-black'
                        }`}
                      >
                        <span>{vibe.emoji}</span>
                        <span>{vibe.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-black/10">
                  {hasActiveFilters && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={clearFilters}
                      className="flex-1 py-4 border border-black text-black text-sm tracking-[0.2em] uppercase"
                    >
                      Clear All
                    </motion.button>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex-1 py-4 bg-black text-white text-sm tracking-[0.2em] uppercase"
                  >
                    View {filteredProducts.length} Sets
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

function ShopLoading() {
  return (
    <main className="min-h-screen bg-cream-light">
      <div className="bg-black py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="h-8 w-32 bg-white/10 mb-6 animate-pulse" />
          <div className="h-20 w-64 bg-white/10 mb-4 animate-pulse" />
          <div className="h-6 w-40 bg-white/10 animate-pulse" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-black/5 animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <CartDrawer />
      <Suspense fallback={<ShopLoading />}>
        <ShopContent />
      </Suspense>
      <Footer />
    </>
  );
}
