'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useCartStore } from '@/stores/useCartStore';
import { getProductById } from '@/data/products';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const subtotal = items.reduce((acc, item) => {
    const product = getProductById(item.productId);
    if (!product) return acc;
    return acc + product.price * item.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 8.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main className="min-h-screen bg-sand-light">
        {/* Header */}
        <div className="bg-white-wash border-b border-seafoam">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-section font-bold text-deep-sea">Your Cart</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {items.length === 0 ? (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-seafoam-light flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-ocean-blue"
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
              <h2 className="text-2xl font-semibold text-deep-sea mb-2">
                Your cart is empty
              </h2>
              <p className="text-text-secondary mb-8">
                Looks like you haven&apos;t added anything yet. Let&apos;s fix that!
              </p>
              <Link href="/shop" className="btn btn-primary">
                Shop Now
              </Link>
            </motion.div>
          ) : (
            /* Cart with Items */
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {/* Header Row */}
                <div className="hidden md:grid md:grid-cols-[1fr_120px_120px_40px] gap-4 pb-4 border-b border-seafoam text-sm font-medium text-text-secondary">
                  <span>Product</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Total</span>
                  <span></span>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-seafoam">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    const itemTotal = product.price * item.quantity;

                    return (
                      <motion.div
                        key={item.variantSku}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="py-6 md:grid md:grid-cols-[1fr_120px_120px_40px] md:gap-4 md:items-center"
                      >
                        {/* Product Info */}
                        <div className="flex gap-4">
                          <Link
                            href={`/shop/${product.slug}`}
                            className="relative w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 group"
                          >
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="96px"
                            />
                          </Link>
                          <div>
                            <Link
                              href={`/shop/${product.slug}`}
                              className="font-medium text-deep-sea hover:text-ocean-blue transition-colors"
                            >
                              {product.name}
                            </Link>
                            <p className="text-sm text-text-secondary mt-1">
                              {item.color} / {item.size}
                            </p>
                            <p className="font-semibold text-deep-sea mt-2 md:hidden">
                              ${product.price}
                            </p>
                          </div>
                        </div>

                        {/* Quantity - Mobile */}
                        <div className="flex items-center justify-between mt-4 md:hidden">
                          <div className="quantity-control">
                            <button
                              onClick={() => updateQuantity(item.variantSku, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.variantSku, parseInt(e.target.value) || 1)}
                              min="1"
                              className="text-center"
                            />
                            <button
                              onClick={() => updateQuantity(item.variantSku, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variantSku)}
                            className="text-coral hover:text-coral-dark transition-colors text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        {/* Quantity - Desktop */}
                        <div className="hidden md:flex justify-center">
                          <div className="quantity-control">
                            <button
                              onClick={() => updateQuantity(item.variantSku, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.variantSku, parseInt(e.target.value) || 1)}
                              min="1"
                              className="text-center"
                            />
                            <button
                              onClick={() => updateQuantity(item.variantSku, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="hidden md:block text-right font-semibold text-deep-sea">
                          ${itemTotal.toFixed(2)}
                        </div>

                        {/* Remove - Desktop */}
                        <div className="hidden md:flex justify-center">
                          <button
                            onClick={() => removeItem(item.variantSku)}
                            className="p-2 text-text-muted hover:text-coral transition-colors"
                            aria-label="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Clear Cart */}
                <div className="flex justify-between items-center pt-6">
                  <Link
                    href="/shop"
                    className="text-ocean-blue hover:text-ocean-blue-dark transition-colors text-sm font-medium"
                  >
                    &larr; Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-coral hover:text-coral-dark transition-colors text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 lg:mt-0">
                <div className="bg-white-wash rounded-2xl p-6 border border-seafoam sticky top-24">
                  <h2 className="text-lg font-semibold text-deep-sea mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 pb-6 border-b border-seafoam">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-ocean-blue">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Tax (7%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-6">
                    <span className="font-semibold text-deep-sea">Total</span>
                    <span className="text-2xl font-bold text-deep-sea">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* Free Shipping Progress */}
                  {subtotal < 100 && (
                    <div className="mb-6 p-3 bg-seafoam-light rounded-lg">
                      <p className="text-sm text-deep-sea mb-2">
                        Add <span className="font-semibold">${(100 - subtotal).toFixed(2)}</span> more for free shipping!
                      </p>
                      <div className="h-2 bg-sand rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                          className="h-full bg-ocean-blue rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-deep-sea mb-2">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 border border-seafoam rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue focus:border-transparent"
                      />
                      <button className="btn btn-outline px-4">Apply</button>
                    </div>
                  </div>

                  <Link href="/checkout" className="btn btn-coral w-full text-center">
                    Proceed to Checkout
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-seafoam">
                    <div className="flex items-center justify-center gap-4 text-text-muted text-sm">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Secure</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Easy Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
