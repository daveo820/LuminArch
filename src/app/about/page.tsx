'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { FadeIn, StaggerChildren, staggerItem } from '@/components/ui/ScrollAnimations';
import { TextScramble, SplitText } from '@/components/ui/TextEffects';

const values = [
  {
    title: 'QUALITY',
    description: 'Premium fabrics and meticulous craftsmanship in every piece we create.',
    icon: '◆',
  },
  {
    title: 'COMFORT',
    description: 'Designed for real life. From morning coffee to evening hangouts.',
    icon: '○',
  },
  {
    title: 'SIMPLICITY',
    description: 'Minimal design, maximum versatility. Less is always more.',
    icon: '□',
  },
  {
    title: 'COMMUNITY',
    description: 'Proudly Wilmington. Supporting local and building connections.',
    icon: '△',
  },
];

const timeline = [
  { year: '2025', event: 'NOWADAYS. is born in Wilmington, NC' },
  { year: '2025', event: 'First collection drops: The Essentials' },
  { year: '2025', event: 'Community pop-up at Wilmington Riverfront' },
  { year: 'NOW', event: 'Growing with you, one moment at a time' },
];

export default function AboutPage() {
  return (
    <>
      <CustomCursor />
      <CartDrawer />
      <Navbar />

      <main className="min-h-screen bg-cream-light">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
              alt="Nowadays Wilmington"
              fill
              className="object-cover opacity-40"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          <div className="relative z-10 text-center text-white px-4">
            <FadeIn>
              <span className="text-[10px] tracking-[0.5em] text-white/50 uppercase mb-6 block">
                Our Story
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-brand text-7xl md:text-9xl tracking-wider mb-6">
                <TextScramble>ABOUT US</TextScramble>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/60 text-lg max-w-xl mx-auto">
                Learn to love the now.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="left">
                <div className="relative">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
                      alt="Wilmington beach lifestyle"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <motion.div
                    className="absolute -bottom-8 -right-8 w-48 h-48 bg-black"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <span className="font-brand text-xl tracking-wider">EST. 2025</span>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <div>
                  <span className="text-[10px] tracking-[0.5em] text-gray uppercase mb-6 block">
                    The Beginning
                  </span>
                  <h2 className="font-brand text-5xl md:text-6xl tracking-wider text-black mb-8">
                    <SplitText>BORN IN WILMINGTON</SplitText>
                  </h2>
                  <div className="space-y-6 text-gray leading-relaxed">
                    <p>
                      NOWADAYS. started with a simple idea: create clothes that feel as good as
                      they look. Clothes you actually want to wear every day. No fuss, no
                      overthinking — just quality pieces that fit your life.
                    </p>
                    <p>
                      Based in Wilmington, NC, we're inspired by the laid-back coastal energy
                      that surrounds us. The beach mornings, the downtown walks, the moments
                      in between. We design for those moments.
                    </p>
                    <p>
                      Every piece is crafted with intention. Premium materials meet minimal
                      design. Because when you're not worried about what you're wearing,
                      you can focus on what matters — living in the now.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-black text-white">
          <div className="container mx-auto px-4">
            <FadeIn className="text-center mb-20">
              <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-6 block">
                What We Stand For
              </span>
              <h2 className="font-brand text-5xl md:text-7xl tracking-wider">
                OUR VALUES
              </h2>
            </FadeIn>

            <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  className="text-center p-8 border border-white/10 hover:border-white/30 transition-colors duration-300"
                >
                  <span className="text-4xl mb-6 block opacity-30">{value.icon}</span>
                  <h3 className="font-brand text-2xl tracking-wider mb-4">{value.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <FadeIn className="text-center mb-20">
              <span className="text-[10px] tracking-[0.5em] text-gray uppercase mb-6 block">
                Our Journey
              </span>
              <h2 className="font-brand text-5xl md:text-7xl tracking-wider text-black">
                THE TIMELINE
              </h2>
            </FadeIn>

            <div className="max-w-2xl mx-auto">
              {timeline.map((item, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="flex gap-8 mb-12 last:mb-0">
                    <div className="w-20 flex-shrink-0">
                      <span className="font-brand text-2xl text-black">{item.year}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="w-full h-px bg-sand mb-4" />
                      <p className="text-gray">{item.event}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-24 bg-sand">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <div>
                  <span className="text-[10px] tracking-[0.5em] text-gray uppercase mb-6 block">
                    Where We Call Home
                  </span>
                  <h2 className="font-brand text-5xl md:text-6xl tracking-wider text-black mb-8">
                    WILMINGTON, NC
                  </h2>
                  <div className="space-y-6 text-gray leading-relaxed">
                    <p>
                      There's something special about this place. The way the morning light
                      hits the river. The sound of the waves at Wrightsville. The energy of
                      downtown on a Friday night.
                    </p>
                    <p>
                      Wilmington isn't just where we're based — it's who we are. Every
                      collection is inspired by the coastal lifestyle we live every day.
                      And every piece is made for the people who call this place home.
                    </p>
                  </div>
                  <motion.div
                    className="mt-8"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-4 text-black font-medium tracking-wider text-sm"
                    >
                      <span>SHOP THE COLLECTION</span>
                      <span className="text-xl">→</span>
                    </Link>
                  </motion.div>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <div className="relative aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80"
                    alt="Wilmington NC"
                    fill
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black text-white text-center">
          <div className="container mx-auto px-4">
            <FadeIn>
              <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-6 block">
                Join the Community
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-brand text-5xl md:text-7xl tracking-wider mb-8">
                LIVE IN THE NOW
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/50 mb-12 max-w-md mx-auto">
                Follow along for new drops, behind-the-scenes, and all things Nowadays.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link
                href="https://instagram.com/nowadayswilmington"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
              >
                @nowadayswilmington
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
