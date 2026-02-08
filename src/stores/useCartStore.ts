'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, ProductSize } from '@/types/shop';
import { getProductById } from '@/data/products';

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (productId: string, size: ProductSize, color: string, quantity?: number) => void;
  removeItem: (variantSku: string) => void;
  updateQuantity: (variantSku: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
  getCartItems: () => (CartItem & { product: ReturnType<typeof getProductById> })[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (productId, size, color, quantity = 1) => {
        const product = getProductById(productId);
        if (!product) return;

        const variant = product.variants.find(
          (v) => v.size === size && v.color === color
        );
        if (!variant) return;

        const existingItem = get().items.find(
          (item) => item.variantSku === variant.sku
        );

        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.variantSku === variant.sku
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                productId,
                variantSku: variant.sku,
                quantity,
                size,
                color,
              },
            ],
          });
        }

        // Open cart drawer when item is added
        set({ isOpen: true });
      },

      removeItem: (variantSku) => {
        set({
          items: get().items.filter((item) => item.variantSku !== variantSku),
        });
      },

      updateQuantity: (variantSku, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantSku);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.variantSku === variantSku ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((acc, item) => {
          const product = getProductById(item.productId);
          if (!product) return acc;

          const variant = product.variants.find(
            (v) => v.sku === item.variantSku
          );
          const price = variant?.price || product.price;

          return acc + price * item.quantity;
        }, 0);
      },

      getCartItems: () => {
        return get().items.map((item) => ({
          ...item,
          product: getProductById(item.productId),
        }));
      },
    }),
    {
      name: 'nowadays-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
