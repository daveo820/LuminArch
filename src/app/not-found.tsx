import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-cream-light">
      <div className="container mx-auto px-6 text-center">
        {/* Logo Text */}
        <div className="mb-8">
          <span className="font-brand text-2xl tracking-[0.3em] text-black">NOWADAYS.</span>
        </div>

        {/* 404 Text */}
        <h1 className="font-brand text-[12rem] md:text-[16rem] leading-none text-sand tracking-wider mb-4">
          404
        </h1>

        <h2 className="font-brand text-3xl md:text-4xl tracking-wider text-black mb-6">
          LOST IN THE NOW
        </h2>

        <p className="text-gray max-w-md mx-auto mb-10">
          This page doesn&apos;t exist. But that&apos;s okay —
          there&apos;s plenty more to discover.
        </p>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-charcoal transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="px-8 py-4 border border-black text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-black hover:text-white transition-colors"
          >
            Shop Now
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-10 border-t border-sand">
          <p className="text-xs tracking-wider uppercase text-gray mb-6">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/shop" className="text-black hover:text-gray transition-colors text-sm">
              Shop
            </Link>
            <Link href="/about" className="text-black hover:text-gray transition-colors text-sm">
              About
            </Link>
            <Link href="/gallery" className="text-black hover:text-gray transition-colors text-sm">
              Gallery
            </Link>
            <Link href="/contact" className="text-black hover:text-gray transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
