import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Full-service event planning in Cary, NC and the Triangle. Wedding planning, milestone celebrations, corporate events, and custom parties tailored to your vision.',
};

const services = [
  {
    id: 'weddings',
    title: 'Wedding Planning',
    subtitle: 'Your Perfect Day, Perfectly Planned',
    description:
      'From the moment you say "yes" to the moment you say "I do," we\'re by your side. Our wedding planning services are designed to give you the celebration of your dreams while you enjoy every moment of your engagement.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    packages: [
      {
        name: 'Full-Service Planning',
        description:
          'Complete wedding planning from engagement to honeymoon. We handle every detail so you can simply show up and celebrate.',
        includes: [
          'Unlimited planning consultations',
          'Venue selection & vendor recommendations',
          'Budget creation & management',
          'Design concept & décor planning',
          'Timeline & logistics coordination',
          'Day-of coordination & execution',
          'Post-wedding wrap-up',
        ],
      },
      {
        name: 'Partial Planning',
        description:
          'Perfect for couples who have started planning but need professional guidance to bring it all together.',
        includes: [
          'Planning consultations (up to 10 hours)',
          'Vendor recommendations & management',
          'Design assistance',
          'Timeline creation',
          'Rehearsal coordination',
          'Full day-of coordination',
        ],
      },
      {
        name: 'Day-Of Coordination',
        description:
          'You\'ve done the planning — we\'ll make sure your day runs flawlessly so you can be fully present.',
        includes: [
          'Final vendor confirmations',
          'Detailed timeline creation',
          'Rehearsal direction',
          'Up to 10 hours of on-site coordination',
          'Vendor payment distribution',
          'Emergency kit & problem-solving',
        ],
      },
    ],
  },
  {
    id: 'milestones',
    title: 'Milestone Celebrations',
    subtitle: 'Making Life\'s Big Moments Unforgettable',
    description:
      'Birthdays, anniversaries, graduations, baby showers, retirement parties — every milestone deserves to be celebrated in style. We create personalized experiences that honor your journey.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    packages: [
      {
        name: 'Birthday Celebrations',
        description:
          'From sweet sixteens to milestone decades, we create birthday parties that reflect the guest of honor\'s personality.',
        includes: [
          'Theme development & design',
          'Venue selection',
          'Vendor coordination',
          'Custom décor & styling',
          'Entertainment booking',
          'Day-of management',
        ],
      },
      {
        name: 'Anniversary Parties',
        description:
          'Celebrate years of love with an event as special as your relationship.',
        includes: [
          'Concept & design planning',
          'Venue & catering coordination',
          'Memory displays & tributes',
          'Music & entertainment',
          'Photography coordination',
          'Full event management',
        ],
      },
      {
        name: 'Baby Showers & Gender Reveals',
        description:
          'Welcome new additions with joyful, thoughtfully planned celebrations.',
        includes: [
          'Theme & design creation',
          'Venue or home event setup',
          'Games & activities planning',
          'Catering & cake coordination',
          'Gift organization',
          'Event hosting support',
        ],
      },
    ],
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    subtitle: 'Elevating Your Brand Through Experience',
    description:
      'Team retreats, holiday parties, product launches, client appreciation events — we help businesses create meaningful experiences that strengthen relationships and elevate their brand.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    packages: [
      {
        name: 'Team Building Events',
        description:
          'Foster connection and collaboration with thoughtfully designed team experiences.',
        includes: [
          'Activity planning & facilitation',
          'Venue coordination',
          'Catering management',
          'Transportation logistics',
          'Team-building exercises',
          'Event photography',
        ],
      },
      {
        name: 'Holiday Parties',
        description:
          'End the year with a celebration your team will remember.',
        includes: [
          'Theme & décor design',
          'Venue selection',
          'Full catering coordination',
          'Entertainment booking',
          'Awards & recognition moments',
          'Complete event management',
        ],
      },
      {
        name: 'Launch Events',
        description:
          'Make a splash with product launches and company announcements.',
        includes: [
          'Event concept & branding',
          'Venue transformation',
          'Media & PR coordination',
          'VIP guest management',
          'Audio/visual production',
          'Post-event follow-up',
        ],
      },
    ],
  },
  {
    id: 'custom',
    title: 'Custom Events',
    subtitle: 'If You Can Dream It, We Can Plan It',
    description:
      'Some celebrations don\'t fit into a category — and that\'s exactly how we like it. From themed parties to family reunions, we bring your unique vision to life.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    packages: [
      {
        name: 'Themed Parties',
        description:
          'Immersive experiences that transport your guests to another world.',
        includes: [
          'Theme development & research',
          'Custom décor & props',
          'Costume coordination',
          'Themed food & drinks',
          'Interactive elements',
          'Full production management',
        ],
      },
      {
        name: 'Family Reunions',
        description:
          'Bring generations together with a gathering that celebrates your family\'s story.',
        includes: [
          'Multi-day event planning',
          'Venue & accommodation coordination',
          'Activity scheduling',
          'Catering for all ages',
          'Family tree displays',
          'Memory-making activities',
        ],
      },
      {
        name: 'Something Unique',
        description:
          'Have an idea that doesn\'t fit the mold? We love a creative challenge.',
        includes: [
          'Concept development',
          'Custom vendor sourcing',
          'Bespoke design elements',
          'Specialized logistics',
          'Whatever your event needs',
          'Complete peace of mind',
        ],
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1920&q=80"
            alt="Event planning services"
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
            What We Do
          </p>
          <h1
            className="text-hero mb-6"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 0.7)'
            }}
          >
            Our Services
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}
          >
            Every event is unique, and so is our approach. From full-service planning
            to day-of coordination, we tailor our services to fit your needs.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section ${index % 2 === 0 ? 'bg-white' : 'bg-cream'}`}
        >
          <div className="container mx-auto">
            <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="aspect-landscape relative rounded-lg overflow-hidden shadow-xl sticky top-32">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <p className="text-champagne-dark uppercase tracking-widest text-sm mb-4 font-semibold">
                  {service.subtitle}
                </p>
                <h2
                  className="text-section mb-6"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {service.title}
                </h2>
                <div className="divider divider-left" />
                <p className="text-text-secondary leading-relaxed mb-10">
                  {service.description}
                </p>

                {/* Packages */}
                <div className="space-y-8">
                  {service.packages.map((pkg) => (
                    <div key={pkg.name} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                      <h3
                        className="text-xl mb-2"
                        style={{ fontFamily: 'var(--font-cormorant)' }}
                      >
                        {pkg.name}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4">
                        {pkg.description}
                      </p>
                      <ul className="space-y-2">
                        {pkg.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm">
                            <svg
                              className="w-5 h-5 text-champagne flex-shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-text-secondary">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/contact" className="btn btn-primary">
                    Get a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing Note */}
      <section className="section bg-blush">
        <div className="container mx-auto text-center max-w-3xl">
          <h2
            className="text-section mb-6"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Custom Pricing for Every Vision
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            Every event is unique — that&apos;s why we don&apos;t believe in one-size-fits-all
            pricing. We&apos;ll work with you to create a custom quote tailored to your
            specific needs, style, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary">
              Request a Quote
            </Link>
            <Link href="/contact#consultation" className="btn btn-outline">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Not Sure CTA */}
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
            Not Sure What You Need?
          </h2>
          <p
            className="text-lg mb-10 max-w-xl mx-auto"
            style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}
          >
            That&apos;s perfectly okay! Let&apos;s chat about your vision and we&apos;ll help you
            figure out the best approach for your celebration.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Let&apos;s Talk
          </Link>
        </div>
      </section>
    </>
  );
}
