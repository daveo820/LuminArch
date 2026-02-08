'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/useCartStore';
import { getProductById } from '@/data/products';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();

  // Close on escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeCart();
  }, [closeCart]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const subtotal = items.reduce((acc, item) => {
    const product = getProductById(item.productId);
    if (!product) return acc;
    return acc + product.price * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.8 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream-light shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sand">
              <h2 id="cart-title" className="font-brand text-2xl tracking-wider text-black">
                CART ({items.length})
              </h2>
              <motion.button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-sand transition-colors"
                aria-label="Close cart"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className="w-5 h-5 text-deep-sea"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 mb-4 rounded-full bg-seafoam-light flex items-center justify-center">
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
                  <p className="text-deep-sea font-medium mb-2">Your cart is empty</p>
                  <p className="text-text-muted text-sm mb-6">
                    Looks like you haven&apos;t added anything yet
                  </p>
                  <button
                    onClick={closeCart}
                    className="btn btn-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <motion.div
                        key={item.variantSku}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 p-3 bg-sand-light rounded-lg"
                      >
                        {/* Product Image */}
                        <div className="relative w-20 h-24 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/shop/${product.slug}`}
                            onClick={closeCart}
                            className="font-medium text-deep-sea hover:text-ocean-blue transition-colors line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-text-muted mt-0.5">
                            {item.color} / {item.size}
                          </p>
                          <p className="font-semibold text-deep-sea mt-1">
                            ${product.price}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-2">
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
                              className="p-1.5 text-text-muted hover:text-coral transition-colors"
                              aria-label="Remove item"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-seafoam bg-white-wash">
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-xl font-semibold text-deep-sea">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-text-muted mb-4 text-center">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Buttons */}
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn btn-coral w-full"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="btn btn-outline w-full"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
