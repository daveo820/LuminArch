import type { Metadata } from 'next';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with MK Traditions for your event planning needs in Cary, NC and the Triangle. Book a free consultation or request a custom quote.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80"
            alt="Contact MK Traditions"
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
            Get In Touch
          </p>
          <h1
            className="text-hero mb-6"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 0.7)'
            }}
          >
            Let&apos;s Create Something Beautiful
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}
          >
            Ready to start planning? We&apos;d love to hear about your vision.
            Reach out for a free consultation.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div>
              <h2
                className="text-section mb-4"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Send Us a Message
              </h2>
              <p className="text-text-secondary mb-8">
                Fill out the form below and we&apos;ll get back to you within 24-48 hours.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info & Calendly */}
            <div className="space-y-10">
              {/* Contact Info */}
              <div className="bg-cream rounded-lg p-8">
                <h3
                  className="text-xl mb-6"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-champagne"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a
                        href="mailto:mktraditions.nc@gmail.com"
                        className="text-champagne-dark hover:text-charcoal transition-colors font-medium"
                      >
                        mktraditions.nc@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-champagne"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Instagram</h4>
                      <a
                        href="https://instagram.com/mktraditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-champagne-dark hover:text-charcoal transition-colors font-medium"
                      >
                        @mktraditions
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-champagne"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-text-secondary">
                        Cary, NC
                        <br />
                        <span className="text-sm">
                          Serving Raleigh, Durham, Chapel Hill & the Triangle
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendly Embed Placeholder */}
              <div id="consultation" className="bg-cream rounded-lg p-8">
                <h3
                  className="text-xl mb-4"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Book a Free Consultation
                </h3>
                <p className="text-text-secondary mb-6">
                  Prefer to chat in real-time? Schedule a complimentary 30-minute
                  consultation to discuss your event vision.
                </p>
                {/* Calendly would be embedded here */}
                <div className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-champagne/30">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-champagne/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-text-secondary text-sm mb-4">
                    Calendly scheduling widget will be embedded here
                  </p>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Schedule via Calendly
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-cream">
        <div className="container mx-auto py-12">
          <h2
            className="text-section text-center mb-8"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Serving the Triangle
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-10">
            Based in Cary, NC, we proudly serve clients throughout the Triangle area
            including Raleigh, Durham, Chapel Hill, Apex, Morrisville, and beyond.
          </p>
          {/* Google Maps Embed */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103487.79827846!2d-78.86751645!3d35.7795897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf5b35fafced5%3A0xc6f5cbe9f9d03a25!2sCary%2C%20NC!5e0!3m2!1sen!2sus!4v1707000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MK Traditions service area - Cary, NC and the Triangle"
            />
          </div>
        </div>
      </section>
    </>
  );
}
