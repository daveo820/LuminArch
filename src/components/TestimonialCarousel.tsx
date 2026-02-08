'use client';

import { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  event: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "MK Traditions turned our wedding into a fairytale. Every detail was perfect, and we could actually enjoy our day knowing everything was in their capable hands.",
    author: 'Sarah & Michael',
    event: 'Wedding, October 2024',
  },
  {
    quote:
      "From the first call to the last dance, Megan and Katherine were incredible. They understood our vision and brought it to life beyond our wildest dreams.",
    author: 'Jennifer T.',
    event: '50th Birthday Celebration',
  },
  {
    quote:
      "Our company retreat was flawless thanks to MK Traditions. Professional, creative, and so easy to work with. We've already booked them for next year!",
    author: 'David Chen',
    event: 'Corporate Event',
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Quote Icon */}
      <div className="text-champagne/20 flex justify-center mb-8">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Testimonial Content */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-4 text-center"
            >
              <blockquote
                className="text-xl md:text-2xl text-charcoal leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="text-charcoal font-semibold">
                {testimonial.author}
              </div>
              <div className="text-text-secondary text-sm mt-1">
                {testimonial.event}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal hover:text-champagne transition-colors"
        aria-label="Previous testimonial"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal hover:text-champagne transition-colors"
        aria-label="Next testimonial"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-10">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-champagne w-8'
                : 'bg-champagne/30 hover:bg-champagne/50'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
