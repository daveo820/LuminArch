import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const MK_LOGO = 'https://images.squarespace-cdn.com/content/v1/67e6bf8bba8157627d5386e4/0c48ec95-c98a-46ff-93cc-564ef9148486/MK.jpg';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-cream">
      <div className="container mx-auto px-6 text-center">
        {/* Animated Logo */}
        <div className="relative w-32 h-32 mx-auto mb-8 animate-fade-in">
          <Image
            src={MK_LOGO}
            alt="MK Traditions"
            fill
            className="object-contain"
          />
        </div>

        {/* 404 Text */}
        <h1
          className="text-8xl md:text-9xl font-bold mb-4 text-champagne/30"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          404
        </h1>

        <h2
          className="text-3xl md:text-4xl mb-6 text-charcoal"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          Page Not Found
        </h2>

        <p className="text-text-secondary max-w-md mx-auto mb-10">
          Looks like this page wandered off to a celebration somewhere.
          Let&apos;s get you back on track.
        </p>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-10 border-t border-champagne/20">
          <p className="text-sm text-text-muted mb-6">Or explore our pages:</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/services" className="text-champagne-dark hover:text-charcoal transition-colors font-medium">
              Services
            </Link>
            <Link href="/about" className="text-champagne-dark hover:text-charcoal transition-colors font-medium">
              About Us
            </Link>
            <Link href="/gallery" className="text-champagne-dark hover:text-charcoal transition-colors font-medium">
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
