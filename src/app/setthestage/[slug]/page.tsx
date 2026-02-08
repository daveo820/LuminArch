import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

const blogPosts: Record<string, BlogPost> = {
  '5-things-every-triangle-bride-should-know': {
    slug: '5-things-every-triangle-bride-should-know',
    title: '5 Things Every Triangle Bride Should Know Before Planning',
    excerpt:
      'Getting engaged is exciting, but wedding planning in the Triangle has its own unique considerations.',
    content: `
      <p>Congratulations on your engagement! If you're planning a wedding in the Raleigh-Durham-Chapel Hill area, you're in for a treat. The Triangle offers stunning venues, amazing vendors, and a vibrant wedding scene. But before you dive into Pinterest boards and venue tours, here are five things you should know.</p>

      <h2>1. Book Your Venue Early — Really Early</h2>
      <p>The Triangle's wedding scene has exploded in recent years. Popular venues like The Pavilion at Angus Barn, The Bradford, and The Rickhouse are booking 12-18 months in advance for peak season (September through November, and April through June). If you have your heart set on a specific venue, don't wait.</p>
      <p>Pro tip: Consider a Friday or Sunday wedding. You'll often get a significant discount and have an easier time securing your dream date.</p>

      <h2>2. Weather Is Unpredictable</h2>
      <p>North Carolina weather can be... dramatic. We've seen beautiful outdoor October weddings interrupted by unexpected hurricanes, and April ceremonies blessed with perfect 70-degree sunshine. Always have a rain plan, even if your venue has covered backup options.</p>
      <p>The ideal months for outdoor ceremonies? Late September through mid-October and late April through May tend to be the sweet spots.</p>

      <h2>3. The Vendor Community Is Tight-Knit</h2>
      <p>One of the best things about planning a wedding in the Triangle is our incredible vendor community. Photographers, florists, caterers — many of them have worked together for years and genuinely collaborate to make your day perfect. Ask for referrals, and trust when vendors recommend each other. There's usually a reason.</p>

      <h2>4. Traffic Is Real</h2>
      <p>If you're planning a wedding that requires guests to travel between locations (ceremony at a church, reception at a venue), factor in Triangle traffic. Rush hour on I-40 or Highway 540 can add 30+ minutes to travel time. Consider providing shuttle transportation or choosing times that avoid peak traffic.</p>

      <h2>5. Personalization Matters More Than Pinterest Perfection</h2>
      <p>We've planned hundreds of weddings, and the ones that stand out aren't always the most expensive or elaborate. They're the ones that feel authentic to the couple. Include touches that tell your story — your grandmother's recipe at the dessert bar, a reading from your favorite book, a first dance to the song that was playing on your first date.</p>
      <p>Your wedding should feel like YOU, not like a Pinterest board come to life.</p>

      <h2>Ready to Start Planning?</h2>
      <p>We'd love to help you navigate the Triangle wedding scene and create a day that's perfectly you. Book a free consultation to chat about your vision.</p>
    `,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    date: 'February 1, 2026',
    category: 'Wedding Planning',
    readTime: '5 min read',
    author: 'Megan & Katherine',
  },
  'milestone-birthday-party-guide': {
    slug: 'milestone-birthday-party-guide',
    title: 'How to Throw a Milestone Birthday Party That Actually Feels Special',
    excerpt:
      'Milestone birthdays deserve more than a generic celebration. Learn how to create a party that truly reflects the guest of honor.',
    content: `
      <p>Turning 30, 40, 50, or beyond is a big deal. These milestone birthdays mark transitions, achievements, and the start of new chapters. They deserve more than a generic party with "Over the Hill" decorations. Here's how to create a celebration that truly honors the guest of honor.</p>

      <h2>Start With Their Story</h2>
      <p>The best milestone parties tell a story. Before you start planning décor or menus, sit down and think about what makes this person special. What are their passions? Their favorite memories? The people who have shaped their life?</p>
      <p>We once planned a 60th birthday where we recreated the guest of honor's favorite childhood summer camp — complete with canoes, s'mores, and cabin-style décor. It wasn't the most "elegant" party, but it was perfect for her.</p>

      <h2>Make It Personal, Not Generic</h2>
      <p>Skip the "over the hill" and "getting old" jokes unless you know the birthday person genuinely finds them funny. Instead, focus on celebrations of what they've accomplished and who they are.</p>
      <p>Ideas for personalization:</p>
      <ul>
        <li>Photo displays from each decade of their life</li>
        <li>A memory book where guests share their favorite moments</li>
        <li>A playlist featuring songs from significant years</li>
        <li>A menu featuring their all-time favorite foods</li>
        <li>Toasts or speeches from friends and family</li>
      </ul>

      <h2>Consider the Guest of Honor's Energy Level</h2>
      <p>Not everyone wants a rager for their 50th. Some people dream of an intimate dinner party. Others want to dance until midnight. Plan the party around their preferences, not what you think a milestone party "should" look like.</p>

      <h2>Create Moments, Not Just Decorations</h2>
      <p>The most memorable parties have intentional moments built in. Plan a few surprises:</p>
      <ul>
        <li>A video montage with messages from friends and family (including those who can't attend)</li>
        <li>A special toast or roast session</li>
        <li>A meaningful gift presentation</li>
        <li>An activity the birthday person loves (dance lesson, game tournament, cooking class)</li>
      </ul>

      <h2>Don't Forget the Details</h2>
      <p>Little touches make a big difference:</p>
      <ul>
        <li>Personalized cocktails named after the guest of honor</li>
        <li>Party favors that reflect their interests</li>
        <li>A signature color scheme based on their favorites</li>
        <li>Thoughtful seating arrangements that encourage connection</li>
      </ul>

      <h2>The Most Important Element</h2>
      <p>Above all, the birthday person should feel celebrated and loved. Whether it's a backyard barbecue or a black-tie gala, what matters is that they feel seen and appreciated by the people who matter most.</p>

      <h2>Need Help Planning?</h2>
      <p>Milestone birthdays are our specialty. From intimate dinner parties to surprise extravaganzas, we love helping families celebrate the people they love. Let's chat about your vision.</p>
    `,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
    date: 'January 15, 2026',
    category: 'Celebrations',
    readTime: '4 min read',
    author: 'Megan & Katherine',
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const relatedPosts = Object.values(blogPosts).filter((p) => p.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
        </div>
        <div className="relative z-10 container mx-auto text-center text-white">
          <Link
            href="/setthestage"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <span className="inline-block bg-champagne text-white text-xs uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            {post.category}
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/80 text-sm">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="section bg-white">
        <div className="container mx-auto max-w-3xl">
          <div
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-charcoal prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-text-secondary prose-p:leading-relaxed prose-li:text-text-secondary prose-a:text-champagne prose-a:no-underline hover:prose-a:underline"
            style={{ fontFamily: 'var(--font-lato)' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Box */}
          <div className="mt-16 p-8 bg-cream rounded-lg flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=200&q=80"
                alt={post.author}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center md:text-left">
              <h3
                className="text-xl mb-2"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Written by {post.author}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Megan and Katherine are the cousins behind MK Traditions. They love
                sharing event planning tips and inspiration with couples and families
                across the Triangle.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center p-8 bg-blush rounded-lg">
            <h3
              className="text-2xl mb-4"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Ready to Plan Your Celebration?
            </h3>
            <p className="text-text-secondary mb-6">
              Let&apos;s bring your vision to life. Book a free consultation today.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section bg-cream">
          <div className="container mx-auto">
            <h2
              className="text-section text-center mb-12"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              More from Set the Stage
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {relatedPosts.slice(0, 2).map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/setthestage/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3
                        className="text-lg group-hover:text-champagne transition-colors"
                        style={{ fontFamily: 'var(--font-cormorant)' }}
                      >
                        {relatedPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
