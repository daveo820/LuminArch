'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { FadeIn } from '@/components/ui/ScrollAnimations';
import { TextScramble } from '@/components/ui/TextEffects';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: 'general', message: '' });
    setIsSubmitting(false);
  };

  return (
    <>
      <CustomCursor />
      <CartDrawer />
      <Navbar />

      <main className="min-h-screen bg-cream-light">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-black text-white overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80"
              alt="Contact us"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black" />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <FadeIn>
              <span className="text-[10px] tracking-[0.5em] text-white/50 uppercase mb-6 block">
                Get In Touch
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-brand text-7xl md:text-9xl tracking-wider mb-6">
                <TextScramble>CONTACT</TextScramble>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/60 text-lg max-w-xl mx-auto">
                Questions, feedback, or just want to say hey? We're here.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Contact Form */}
              <FadeIn>
                <div>
                  <span className="text-[10px] tracking-[0.5em] text-gray uppercase mb-4 block">
                    Send a Message
                  </span>
                  <h2 className="font-brand text-4xl md:text-5xl tracking-wider text-black mb-8">
                    DROP US A LINE
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="text-xs tracking-wider uppercase text-gray block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-sand focus:border-black focus:ring-0 transition-colors text-black"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="text-xs tracking-wider uppercase text-gray block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-sand focus:border-black focus:ring-0 transition-colors text-black"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="text-xs tracking-wider uppercase text-gray block mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-sand focus:border-black focus:ring-0 transition-colors text-black"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Question</option>
                        <option value="returns">Returns & Exchanges</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="collab">Collaboration</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="text-xs tracking-wider uppercase text-gray block mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-sand focus:border-black focus:ring-0 transition-colors text-black resize-none"
                        placeholder="What's on your mind?"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </form>
                </div>
              </FadeIn>

              {/* Contact Info */}
              <FadeIn delay={0.2}>
                <div className="lg:pl-12">
                  <span className="text-[10px] tracking-[0.5em] text-gray uppercase mb-4 block">
                    Other Ways
                  </span>
                  <h2 className="font-brand text-4xl md:text-5xl tracking-wider text-black mb-12">
                    REACH US
                  </h2>

                  <div className="space-y-10">
                    {/* Email */}
                    <div>
                      <h3 className="font-brand text-lg tracking-wider mb-2">EMAIL</h3>
                      <a
                        href="mailto:hello@nowadayswilmington.com"
                        className="text-gray hover:text-black transition-colors"
                      >
                        hello@nowadayswilmington.com
                      </a>
                    </div>

                    {/* Instagram */}
                    <div>
                      <h3 className="font-brand text-lg tracking-wider mb-2">INSTAGRAM</h3>
                      <a
                        href="https://instagram.com/nowadayswilmington"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray hover:text-black transition-colors"
                      >
                        @nowadayswilmington
                      </a>
                    </div>

                    {/* Location */}
                    <div>
                      <h3 className="font-brand text-lg tracking-wider mb-2">LOCATION</h3>
                      <p className="text-gray">
                        Wilmington, NC
                      </p>
                    </div>

                    {/* Response Time */}
                    <div className="pt-10 border-t border-sand">
                      <p className="text-gray text-sm">
                        We typically respond within 24-48 hours during business days.
                        For order-related questions, please include your order number.
                      </p>
                    </div>
                  </div>

                  {/* FAQ Link */}
                  <div className="mt-12 p-8 bg-sand">
                    <h3 className="font-brand text-xl tracking-wider mb-4">QUICK ANSWERS</h3>
                    <p className="text-gray text-sm mb-6">
                      Looking for shipping info, returns, or sizing? Check our FAQ.
                    </p>
                    <Link
                      href="/faq"
                      className="inline-block text-xs tracking-[0.15em] uppercase text-black border-b border-black pb-1 hover:border-gray hover:text-gray transition-colors"
                    >
                      View FAQ →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Map/Location Section */}
        <section className="py-24 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-6 block">
                Based In
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-brand text-5xl md:text-7xl tracking-wider mb-6">
                WILMINGTON, NC
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/50 max-w-md mx-auto mb-12">
                On the coast of North Carolina, where the river meets the sea.
                Shipping nationwide.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="aspect-video max-w-4xl mx-auto overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104715.09792788878!2d-77.99898055!3d34.2257255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89a9f5a20debaed5%3A0x5e66493884093032!2sWilmington%2C%20NC!5e0!3m2!1sen!2sus!4v1707000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(90%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wilmington, NC"
                />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
