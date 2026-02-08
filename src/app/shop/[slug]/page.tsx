'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCard } from '@/components/shop/ProductCard';
import { getProductBySlug, products } from '@/data/products';
import { useCartStore } from '@/stores/useCartStore';
import type { ProductSize } from '@/types/shop';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();

  if (!product) {
    notFound();
  }

  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = isOnSale
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const getStockForVariant = (size: ProductSize, color: string) => {
    const variant = product.variants.find((v) => v.size === size && v.color === color);
    return variant?.stock || 0;
  };

  const isVariantAvailable = (size: ProductSize) => {
    if (!selectedColor) return false;
    return getStockForVariant(size, selectedColor.name) > 0;
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size');
      return;
    }

    const stock = getStockForVariant(selectedSize, selectedColor.name);
    if (stock < quantity) {
      toast.error('Not enough stock available');
      return;
    }

    addItem(product.id, selectedSize, selectedColor.name, quantity);
    toast.success(`Added ${product.name} to cart!`);
  };

  // Get related products (same vibes, different product)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.vibes.some((v) => product.vibes.includes(v)))
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main className="min-h-screen bg-sand-light">
        {/* Breadcrumb */}
        <div className="bg-white-wash border-b border-seafoam">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-text-secondary">
              <Link href="/" className="hover:text-ocean-blue">
                Home
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-ocean-blue">
                Shop
              </Link>
              <span>/</span>
              <span className="text-deep-sea">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Image Gallery */}
            <div className="mb-8 lg:mb-0">
              {/* Main Image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-sand mb-4"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.new && <span className="badge badge-ocean">New</span>}
                  {product.bestseller && <span className="badge badge-coral">Bestseller</span>}
                  {isOnSale && (
                    <span className="badge bg-coral text-white-wash">-{discount}%</span>
                  )}
                </div>
              </motion.div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-24 rounded-lg overflow-hidden transition-all ${
                        selectedImage === index
                          ? 'ring-2 ring-ocean-blue ring-offset-2'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-deep-sea mb-2">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`text-2xl font-bold ${isOnSale ? 'text-coral' : 'text-deep-sea'}`}
                >
                  ${product.price}
                </span>
                {isOnSale && (
                  <span className="text-lg text-text-muted line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-text-secondary mb-6">{product.shortDescription}</p>

              {/* Color Selection */}
              {product.colors.length > 1 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-deep-sea mb-3">
                    Color: <span className="font-normal">{selectedColor?.name}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full transition-all ${
                          selectedColor?.name === color.name
                            ? 'ring-2 ring-deep-sea ring-offset-2'
                            : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-deep-sea mb-3">
                  Size: <span className="font-normal">{selectedSize || 'Select a size'}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const available = isVariantAvailable(size);
                    return (
                      <button
                        key={size}
                        onClick={() => available && setSelectedSize(size)}
                        disabled={!available}
                        className={`size-dot w-12 h-12 text-sm ${
                          selectedSize === size ? 'active' : ''
                        } ${!available ? 'out-of-stock' : ''}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-deep-sea mb-3">
                  Quantity
                </label>
                <div className="quantity-control inline-flex">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="text-center"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full btn btn-coral text-lg py-4 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedSize ? 'Add to Cart' : 'Select a Size'}
              </button>

              {/* Details */}
              {product.details && product.details.length > 0 && (
                <div className="border-t border-seafoam pt-6 mt-6">
                  <h3 className="font-semibold text-deep-sea mb-3">Details</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-text-secondary">
                        <svg className="w-5 h-5 text-ocean-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <div className="border-t border-seafoam pt-6 mt-6">
                <h3 className="font-semibold text-deep-sea mb-3">Description</h3>
                <p className="text-text-secondary leading-relaxed">{product.description}</p>
              </div>

              {/* Care Instructions */}
              {product.careInstructions && (
                <div className="border-t border-seafoam pt-6 mt-6">
                  <h3 className="font-semibold text-deep-sea mb-3">Care</h3>
                  <p className="text-text-secondary">{product.careInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-white-wash">
            <div className="container mx-auto px-4">
              <h2 className="text-section font-bold text-deep-sea mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
