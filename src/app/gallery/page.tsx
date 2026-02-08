import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse our portfolio of weddings, celebrations, and corporate events in Cary, NC and the Triangle. See how MK Traditions brings visions to life.',
};

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    alt: 'Elegant wedding reception',
    category: 'weddings' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    alt: 'Wedding table setting with florals',
    category: 'weddings' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    alt: 'Birthday celebration balloons',
    category: 'celebrations' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    alt: 'Party celebration with confetti',
    category: 'celebrations' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    alt: 'Corporate event setup',
    category: 'corporate' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80',
    alt: 'Business conference room',
    category: 'corporate' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80',
    alt: 'Birthday cake display',
    category: 'celebrations' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&q=80',
    alt: 'Champagne toast',
    category: 'weddings' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    alt: 'Event venue with lighting',
    category: 'weddings' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80',
    alt: 'Garden party setting',
    category: 'celebrations' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    alt: 'Corporate team event',
    category: 'corporate' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800&q=80',
    alt: 'Wedding ceremony flowers',
    category: 'weddings' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1516914589923-f105f1535f88?w=800&q=80',
    alt: 'Anniversary celebration',
    category: 'celebrations' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    alt: 'Festival event',
    category: 'celebrations' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    alt: 'Outdoor celebration',
    category: 'celebrations' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
    alt: 'Business networking event',
    category: 'corporate' as const,
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80"
            alt="Event gallery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/65 to-charcoal/80" />
        </div>
        <div className="relative z-10 container mx-auto text-center">
          <p
            className="uppercase tracking-[0.3em] text-sm mb-6 font-semibold"
            style={{ color: '#C9A86C', textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}
          >
            Our Work
          </p>
          <h1
            className="text-hero mb-6"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 0.7)'
            }}
          >
            Event Gallery
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}
          >
            A glimpse into the celebrations we&apos;ve had the honor of creating.
            Every event tells a story.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1920&q=80"
            alt="Celebration"
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
            Ready to Create Your Own Story?
          </h2>
          <p
            className="text-lg mb-10 max-w-xl mx-auto"
            style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}
          >
            Let&apos;s plan an event that you&apos;ll be proud to show off.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Start Planning
          </Link>
        </div>
      </section>
    </>
  );
}
