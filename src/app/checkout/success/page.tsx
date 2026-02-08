'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/stores/useCartStore';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Clear the cart on successful payment
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-sand-light flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-ocean-blue flex items-center justify-center"
        >
          <svg
            className="w-12 h-12 text-white-wash"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-deep-sea mb-4"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-text-secondary text-lg mb-8"
        >
          Thank you for your order! We&apos;re getting your sweat set ready and will send you a confirmation email shortly.
        </motion.p>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white-wash rounded-2xl p-6 border border-seafoam mb-8 text-left"
        >
          <h2 className="font-semibold text-deep-sea mb-4">What&apos;s Next?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-seafoam-light flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-ocean-blue text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium text-deep-sea">Order Confirmation</p>
                <p className="text-sm text-text-secondary">Check your email for your order confirmation and receipt.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-seafoam-light flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-ocean-blue text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium text-deep-sea">Shipping Update</p>
                <p className="text-sm text-text-secondary">We&apos;ll email you when your order ships with tracking info.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-seafoam-light flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-ocean-blue text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium text-deep-sea">Enjoy!</p>
                <p className="text-sm text-text-secondary">Rock your new sweat set and tag us @nowadayswilmington</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Link href="/shop" className="btn btn-primary w-full">
            Continue Shopping
          </Link>
          <Link href="/" className="btn btn-outline w-full">
            Back to Home
          </Link>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-8 border-t border-seafoam"
        >
          <p className="text-text-secondary mb-4">
            Follow us for new drops and beach vibes
          </p>
          <a
            href="https://instagram.com/nowadayswilmington"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ocean-blue hover:text-coral transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @nowadayswilmington
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}

function SuccessLoading() {
  return (
    <main className="min-h-screen bg-sand-light flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-seafoam-light" />
        <div className="h-10 w-64 bg-seafoam-light rounded mb-4 mx-auto" />
        <div className="h-6 w-80 bg-seafoam-light rounded mx-auto" />
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<SuccessLoading />}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
