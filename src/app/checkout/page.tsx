'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useCartStore } from '@/stores/useCartStore';
import { getProductById } from '@/data/products';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = items.reduce((acc, item) => {
    const product = getProductById(item.productId);
    if (!product) return acc;
    return acc + product.price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <CartDrawer />
        <main className="min-h-screen bg-sand-light flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-4"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-seafoam-light flex items-center justify-center">
              <svg
                className="w-12 h-12 text-ocean-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-deep-sea mb-2">
              Your cart is empty
            </h1>
            <p className="text-text-secondary mb-6">
              Add some items to your cart before checking out
            </p>
            <Link href="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main className="min-h-screen bg-sand-light">
        {/* Header */}
        <div className="bg-white-wash border-b border-seafoam">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-section font-bold text-deep-sea">Checkout</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Order Summary */}
            <div className="bg-white-wash rounded-2xl p-6 border border-seafoam mb-8">
              <h2 className="text-lg font-semibold text-deep-sea mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;

                  return (
                    <div key={item.variantSku} className="flex gap-4">
                      <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-deep-sea">{product.name}</p>
                        <p className="text-sm text-text-secondary">
                          {item.color} / {item.size}
                        </p>
                        <p className="text-sm text-text-secondary">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="font-semibold text-deep-sea">
                        ${(product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-seafoam pt-4 space-y-2">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
              </div>

              <div className="border-t border-seafoam mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-deep-sea">Subtotal</span>
                  <span className="text-xl font-bold text-deep-sea">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Info */}
            <div className="bg-seafoam-light rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-ocean-blue flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white-wash" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-deep-sea mb-1">
                    Secure Checkout with Stripe
                  </h3>
                  <p className="text-sm text-text-secondary">
                    You&apos;ll be redirected to Stripe&apos;s secure checkout page to complete your payment.
                    We never see or store your payment details.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="btn btn-coral w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Continue to Payment'
                )}
              </button>

              <Link
                href="/cart"
                className="btn btn-outline w-full text-center"
              >
                &larr; Back to Cart
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex items-center justify-center gap-6 text-text-muted text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Order Updates</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
