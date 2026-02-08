import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Coming soon: Event planning guides, checklists, and resources from MK Traditions.',
};

const products = [
  {
    title: 'The Ultimate Wedding Planning Checklist',
    description:
      'A comprehensive timeline and checklist to keep you organized from engagement to honeymoon.',
    price: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
    category: 'Digital Download',
  },
  {
    title: 'Event Budget Template',
    description:
      'A detailed spreadsheet to track every expense and stay on budget for any celebration.',
    price: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80',
    category: 'Digital Download',
  },
  {
    title: 'Vendor Interview Guide',
    description:
      'The essential questions to ask every vendor before signing a contract.',
    price: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
    category: 'Digital Download',
  },
  {
    title: 'Day-Of Timeline Template',
    description:
      'A customizable timeline to share with your wedding party and vendors.',
    price: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&q=80',
    category: 'Digital Download',
  },
];

export default function ShopPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1920&q=80"
            alt="MK Traditions Shop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
        </div>
        <div className="relative z-10 container mx-auto text-center text-white">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-6">
            Resources & Tools
          </p>
          <h1
            className="text-hero mb-6"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Shop
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Planning tools and resources to help you create your perfect celebration.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section bg-white">
        <div className="container mx-auto">
          {/* Coming Soon Banner */}
          <div className="bg-blush rounded-lg p-8 text-center mb-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-champagne/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-champagne"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2
              className="text-2xl mb-4"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Shop Opening Soon!
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              We&apos;re putting the finishing touches on our collection of event planning
              resources. Sign up for our newsletter to be the first to know when
              we launch.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.title}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="aspect-square relative bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-charcoal text-white text-xs uppercase tracking-wider px-4 py-2 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-champagne text-xs uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3
                    className="text-lg mt-2 mb-2"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-champagne font-semibold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section bg-cream">
        <div className="container mx-auto text-center max-w-2xl">
          <h2
            className="text-section mb-6"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Be the First to Know
          </h2>
          <p className="text-text-secondary mb-8">
            Subscribe to our newsletter and we&apos;ll let you know as soon as our shop
            opens. Plus, subscribers get exclusive early access and discounts!
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full px-6"
              required
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Notify Me
            </button>
          </form>
        </div>
      </section>

      {/* Services CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80"
            alt="Event planning services"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative z-10 container mx-auto text-center">
          <h2
            className="text-section text-white mb-6"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Need Full-Service Planning?
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto">
            Our shop resources are great for DIY planners, but if you want the
            full MK Traditions experience, we&apos;re here to help.
          </p>
          <a href="/services" className="btn btn-primary">
            View Our Services
          </a>
        </div>
      </section>
    </>
  );
}
