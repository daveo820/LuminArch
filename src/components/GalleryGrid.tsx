'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  category: 'weddings' | 'celebrations' | 'corporate';
}

interface GalleryGridProps {
  images: GalleryImage[];
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'celebrations', label: 'Celebrations' },
  { id: 'corporate', label: 'Corporate' },
];

const categoryLabels: Record<string, string> = {
  weddings: 'Wedding',
  celebrations: 'Celebration',
  corporate: 'Corporate',
};

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    activeFilter === 'all'
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === cat.id
                ? 'bg-champagne text-white'
                : 'bg-gray-100 text-charcoal hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => setLightboxImage(image)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={index % 3 === 0 ? 500 : index % 3 === 1 ? 350 : 400}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center text-white p-4">
                  <span className="inline-block px-3 py-1 bg-champagne/80 rounded-full text-xs uppercase tracking-wider mb-2">
                    {categoryLabels[image.category]}
                  </span>
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-champagne transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <Image
              src={lightboxImage.src.replace('w=800', 'w=1600')}
              alt={lightboxImage.alt}
              width={1600}
              height={1000}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
              <span className="text-champagne text-xs uppercase tracking-wider block">
                {categoryLabels[lightboxImage.category]}
              </span>
              <span className="text-sm">{lightboxImage.alt}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
