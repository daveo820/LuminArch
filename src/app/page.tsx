import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';

// MK Traditions actual images from their site
const MK_IMAGES = {
  hero: 'https://images.squarespace-cdn.com/content/v1/67e6bf8bba8157627d5386e4/b7650186-c550-467c-97b3-314aa06cebc8/IMG_2899.JPG',
  portrait: 'https://images.squarespace-cdn.com/content/v1/67e6bf8bba8157627d5386e4/65376edc-692f-4c25-aedb-ae67db7f21a7/M%26K_Portraits-13.jpg',
  event: 'https://images.squarespace-cdn.com/content/v1/67e6bf8bba8157627d5386e4/b02d03bb-5b4e-4e32-8a47-54471a8f90ec/IMG_5104.JPG',
};

const services = [
  {
    title: 'Weddings',
    description:
      'From intimate elopements to grand celebrations, we craft your perfect day with meticulous attention to every detail.',
    href: '/services#weddings',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Milestone Celebrations',
    description:
      'Birthdays, anniversaries, graduations — we make life\'s big moments truly unforgettable.',
    href: '/services#milestones',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
        />
      </svg>
    ),
  },
  {
    title: 'Corporate Events',
    description:
      'Team retreats, holiday parties, and launch events that strengthen bonds and elevate your brand.',
    href: '/services#corporate',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: 'Custom Events',
    description:
      'Themed parties, family reunions, or something entirely unique — if you can dream it, we can plan it.',
    href: '/services#custom',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
];

// Using MK Traditions images for Instagram section too
const instagramImages = [
  { src: MK_IMAGES.hero, alt: 'MK Traditions event' },
  { src: MK_IMAGES.portrait, alt: 'Megan and Katherine' },
  { src: MK_IMAGES.event, alt: 'Event celebration' },
  { src: MK_IMAGES.hero, alt: 'MK Traditions celebration' },
  { src: MK_IMAGES.event, alt: 'Party setup' },
  { src: MK_IMAGES.portrait, alt: 'MK Traditions founders' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={MK_IMAGES.hero}
            alt="MK Traditions celebration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/65 to-charcoal/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p
            className="uppercase tracking-[0.3em] text-sm mb-6 animate-fade-in font-semibold"
            style={{ color: '#C9A86C', textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}
          >
            Cary, NC &amp; Triangle Event Planning
          </p>
          <h1
            className="text-hero mb-6 animate-fade-in-up"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 0.7)'
            }}
          >
            Creating Unforgettable Moments
          </h1>
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-1"
            style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}
          >
            From intimate gatherings to grand celebrations, we bring your vision to life
            with personal attention and heartfelt dedication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
            <Link href="/contact" className="btn btn-primary text-base">
              Start Planning Your Event
            </Link>
            <Link href="/services" className="btn btn-secondary !border-white !text-white hover:!bg-white hover:!text-charcoal">
              Explore Our Services
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-portrait relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={MK_IMAGES.portrait}
                  alt="Megan and Katherine, founders of MK Traditions"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blush rounded-lg -z-10" />
            </div>
            <div>
              <p className="text-champagne-dark uppercase tracking-widest text-sm mb-4 font-semibold">
                Meet Your Planners
              </p>
              <h2
                className="text-section mb-6"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                We&apos;re Megan &amp; Katherine
              </h2>
              <div className="divider divider-left" />
              <p className="text-text-secondary leading-relaxed mb-6">
                Cousins, best friends, and your personal event planning team. We grew up
                celebrating together — from backyard birthday parties to elaborate family
                reunions — and discovered that bringing people together is our greatest joy.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                At MK Traditions, we believe every celebration deserves the same love and
                attention we&apos;d give our own family&apos;s special moments. That&apos;s not just a
                philosophy — it&apos;s our family tradition.
              </p>
              <Link href="/about" className="btn btn-outline">
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-cream">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-champagne-dark uppercase tracking-widest text-sm mb-4 font-semibold">
              What We Do
            </p>
            <h2
              className="text-section mb-4"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Our Services
            </h2>
            <div className="divider" />
            <p className="text-text-secondary">
              Every event is unique, and so is our approach. Whether you need full-service
              planning or day-of coordination, we&apos;re here to make it seamless.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-blush">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-champagne-dark uppercase tracking-widest text-sm mb-4 font-semibold">
              Kind Words
            </p>
            <h2
              className="text-section"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              What Our Clients Say
            </h2>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Our Story Teaser */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-champagne-dark uppercase tracking-widest text-sm mb-4 font-semibold">
                Our Heritage
              </p>
              <h2
                className="text-section mb-6"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                A Tradition of Togetherness
              </h2>
              <div className="divider divider-left" />
              <p className="text-text-secondary leading-relaxed mb-6">
                Our grandmother had a gift for bringing people together. Every holiday,
                every birthday, every ordinary Sunday — she transformed them into moments
                we&apos;d treasure forever.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                MK Traditions carries on her legacy. We don&apos;t just plan events — we
                create the kind of memories that become family stories, passed down through
                generations.
              </p>
              <Link href="/about" className="btn btn-outline">
                Discover Our Story
              </Link>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="aspect-landscape relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={MK_IMAGES.event}
                  alt="MK Traditions event"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-champagne/20 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={MK_IMAGES.hero}
            alt="MK Traditions celebration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/85" />
        </div>
        <div className="relative z-10 container mx-auto text-center">
          <h2
            className="text-section mb-6"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 0.7)'
            }}
          >
            Ready to Celebrate?
          </h2>
          <p
            className="text-lg mb-10 max-w-xl mx-auto"
            style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}
          >
            Let&apos;s create something unforgettable together. Book a free consultation
            and tell us about your vision.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Let&apos;s Talk
          </Link>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="section bg-cream">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-champagne-dark uppercase tracking-widest text-sm mb-4 font-semibold">
              Follow Along
            </p>
            <h2
              className="text-section mb-2"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              @mktraditions
            </h2>
            <p className="text-text-secondary">
              Get inspired and see our latest celebrations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramImages.map((image, index) => (
              <a
                key={index}
                href="https://instagram.com/mktraditions"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://instagram.com/mktraditions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-champagne hover:text-charcoal transition-colors font-medium"
            >
              Follow Us on Instagram
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
