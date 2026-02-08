import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// MK Traditions actual images from their site
const MK_IMAGES = {
  hero: 'https://images.squarespace-cdn.com/content/v1/67e6bf8bba8157627d5386e4/b7650186-c550-467c-97b3-314aa06cebc8/IMG_2899.JPG',
  portrait: 'https://images.squarespace-cdn.com/content/v1/67e6bf8bba8157627d5386e4/65376edc-692f-4c25-aedb-ae67db7f21a7/M%26K_Portraits-13.jpg',
  event: 'https://images.squarespace-cdn.com/content/v1/67e6bf8bba8157627d5386e4/b02d03bb-5b4e-4e32-8a47-54471a8f90ec/IMG_5104.JPG',
};

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet Megan Olson and Katherine Ruffolo, the cousins behind MK Traditions. Learn about our family legacy and passion for creating unforgettable celebrations in Cary, NC and the Triangle.',
};

const approachSteps = [
  {
    step: '01',
    title: 'Dream It',
    description:
      'Tell us your vision. We start with a conversation to understand what makes your celebration unique — your style, your story, your must-haves.',
  },
  {
    step: '02',
    title: 'Design It',
    description:
      'We handle every detail. From venue selection to vendor coordination, timeline creation to décor design, we craft a comprehensive plan tailored to you.',
  },
  {
    step: '03',
    title: 'Live It',
    description:
      'Enjoy your event stress-free. On the big day, you\'re a guest at your own celebration while we ensure everything runs seamlessly.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={MK_IMAGES.event}
            alt="MK Traditions celebration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
        </div>
        <div className="relative z-10 container mx-auto text-center text-white text-shadow">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-6 font-semibold">
            Our Story
          </p>
          <h1
            className="text-hero mb-6 text-shadow-strong"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            The Heart Behind MK Traditions
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            Two cousins, one shared passion, and a grandmother who taught us that
            the best moments in life are the ones we celebrate together.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-portrait relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={MK_IMAGES.portrait}
                  alt="Megan and Katherine together"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-blush rounded-lg -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-champagne/20 rounded-lg -z-10" />
            </div>
            <div>
              <p className="text-champagne-dark uppercase tracking-widest text-sm mb-4 font-semibold">
                How It All Began
              </p>
              <h2
                className="text-section mb-6"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Cousins First, Partners Always
              </h2>
              <div className="divider divider-left" />
              <div className="space-y-5 text-text-secondary leading-relaxed">
                <p>
                  We&apos;re Megan Olson and Katherine Ruffolo — cousins who are eight years
                  apart but have been inseparable since Katherine was born. Growing up in
                  a large, close-knit family, we spent every holiday, birthday, and
                  &ldquo;just because&rdquo; gathering together.
                </p>
                <p>
                  From coordinating matching outfits at family reunions to planning
                  elaborate surprise parties for our parents, we discovered early on that
                  we share a gift for bringing people together and making moments special.
                </p>
                <p>
                  When we both found ourselves in the Triangle area — Megan after college,
                  Katherine following her career — starting MK Traditions felt like the
                  most natural thing in the world. It wasn&apos;t just about starting a
                  business; it was about honoring the tradition of togetherness that our
                  family instilled in us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Bios */}
      <section className="section bg-cream">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-champagne-dark uppercase tracking-widest text-sm mb-4 font-semibold">
              Meet Your Planners
            </p>
            <h2
              className="text-section"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              The Faces Behind Every Event
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Megan */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-square relative">
                <Image
                  src={MK_IMAGES.portrait}
                  alt="Megan Olson"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-8">
                <h3
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Megan Olson
                </h3>
                <p className="text-champagne-dark text-sm uppercase tracking-widest mb-4 font-semibold">
                  Co-Founder &amp; Lead Planner
                </p>
                <p className="text-text-secondary leading-relaxed">
                  The detail-oriented dreamer. Megan has a knack for turning vague ideas
                  into stunning realities. With a background in project management and an
                  eye for design, she ensures every event flows seamlessly while looking
                  absolutely beautiful. When she&apos;s not planning, you&apos;ll find her exploring
                  local venues, testing new caterers, or perfecting her signature cocktail
                  recipes.
                </p>
              </div>
            </div>

            {/* Katherine */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-square relative">
                <Image
                  src={MK_IMAGES.portrait}
                  alt="Katherine Ruffolo"
                  fill
                  className="object-cover object-bottom"
                />
              </div>
              <div className="p-8">
                <h3
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Katherine Ruffolo
                </h3>
                <p className="text-champagne-dark text-sm uppercase tracking-widest mb-4 font-semibold">
                  Co-Founder &amp; Creative Director
                </p>
                <p className="text-text-secondary leading-relaxed">
                  The creative connector. Katherine brings warmth and personality to every
                  client relationship. Her superpower is making people feel heard and
                  understood, then translating their vision into unforgettable experiences.
                  A natural hostess with an infectious laugh, she believes every celebration
                  should feel as good as it looks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grandmother Legacy */}
      <section className="section bg-blush">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-lg bg-champagne/20 flex items-center justify-center">
              <svg className="w-12 h-12 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <blockquote
              className="text-2xl md:text-3xl text-charcoal mb-8 leading-relaxed"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              &ldquo;The table is ready when everyone you love is gathered around it.&rdquo;
            </blockquote>
            <p className="text-champagne-dark text-sm uppercase tracking-widest mb-6 font-semibold">
              — Our Grandmother
            </p>
            <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto">
              Our grandmother didn&apos;t just host gatherings — she created magic. Her home
              was always open, her table always set for one more. She taught us that
              celebrations aren&apos;t about perfection; they&apos;re about presence. Every event
              we plan carries a piece of her spirit: the belief that bringing people
              together is the most important work we can do.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-champagne-dark uppercase tracking-widest text-sm mb-4 font-semibold">
              How We Work
            </p>
            <h2
              className="text-section mb-4"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Our Approach
            </h2>
            <div className="divider" />
            <p className="text-text-secondary">
              Planning should be as enjoyable as the celebration itself. Here&apos;s how we
              make that happen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {approachSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="text-6xl text-champagne/20 font-bold mb-4">
                  {step.step}
                </div>
                <h3
                  className="text-xl mb-4"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={MK_IMAGES.hero}
            alt="MK Traditions event"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative z-10 container mx-auto text-center text-shadow">
          <h2
            className="text-section text-white mb-6 text-shadow-strong"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Ready to Start Planning?
          </h2>
          <p className="text-white text-lg mb-10 max-w-xl mx-auto">
            We&apos;d love to hear about your vision. Let&apos;s create something
            unforgettable together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary">
              Book a Consultation
            </Link>
            <Link href="/services" className="btn btn-secondary !border-white !text-white hover:!bg-white hover:!text-charcoal">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
