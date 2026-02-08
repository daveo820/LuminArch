import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Set the Stage - Blog',
  description:
    'Event planning tips, inspiration, and behind-the-scenes stories from MK Traditions. Get ideas for your next celebration in the Triangle.',
};

const blogPosts = [
  {
    slug: '5-things-every-triangle-bride-should-know',
    title: '5 Things Every Triangle Bride Should Know Before Planning',
    excerpt:
      'Getting engaged is exciting, but wedding planning in the Triangle has its own unique considerations. Here\'s what you need to know before you start.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    date: 'February 1, 2026',
    category: 'Wedding Planning',
    readTime: '5 min read',
  },
  {
    slug: 'milestone-birthday-party-guide',
    title: 'How to Throw a Milestone Birthday Party That Actually Feels Special',
    excerpt:
      'Milestone birthdays deserve more than a generic celebration. Learn how to create a party that truly reflects the guest of honor.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    date: 'January 15, 2026',
    category: 'Celebrations',
    readTime: '4 min read',
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
            alt="Set the Stage Blog"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
        </div>
        <div className="relative z-10 container mx-auto text-center text-white text-shadow">
          <p className="text-champagne uppercase tracking-[0.3em] text-sm mb-6 font-semibold">
            The MK Traditions Blog
          </p>
          <h1
            className="text-hero mb-6 text-shadow-strong"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Set the Stage
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            Tips, inspiration, and stories to help you plan your perfect celebration.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>

          {/* More Posts Coming Soon */}
          <div className="mt-16 text-center">
            <div className="bg-cream rounded-lg p-8 max-w-xl mx-auto">
              <h3
                className="text-xl mb-4"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                More Stories Coming Soon
              </h3>
              <p className="text-text-secondary mb-6">
                We&apos;re always adding new tips and inspiration. Follow us on Instagram
                for the latest updates!
              </p>
              <a
                href="https://instagram.com/mktraditions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-champagne-dark hover:text-charcoal transition-colors font-semibold"
              >
                Follow @mktraditions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-blush">
        <div className="container mx-auto text-center max-w-2xl">
          <h2
            className="text-section mb-6"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Get Planning Tips in Your Inbox
          </h2>
          <p className="text-text-secondary mb-8">
            Subscribe to our newsletter for exclusive event planning tips, local vendor
            recommendations, and inspiration delivered monthly.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full px-6"
              required
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-text-muted text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
