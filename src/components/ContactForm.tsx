'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: string;
  preferredDate: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSuccess(true);
      reset();
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-lg text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3
          className="text-2xl mb-4"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          Message Sent!
        </h3>
        <p className="text-text-secondary mb-6">
          Thank you for reaching out! We&apos;ll get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="btn btn-outline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className={errors.name ? 'border-red-500' : ''}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className={errors.email ? 'border-red-500' : ''}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Event Type */}
      <div>
        <label htmlFor="eventType">Event Type *</label>
        <select
          id="eventType"
          {...register('eventType', { required: 'Please select an event type' })}
          className={errors.eventType ? 'border-red-500' : ''}
          defaultValue=""
        >
          <option value="" disabled>
            Select your event type
          </option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday / Milestone Celebration</option>
          <option value="corporate">Corporate Event</option>
          <option value="baby-shower">Baby Shower / Gender Reveal</option>
          <option value="anniversary">Anniversary</option>
          <option value="other">Other</option>
        </select>
        {errors.eventType && (
          <p className="text-red-500 text-sm mt-1">{errors.eventType.message}</p>
        )}
      </div>

      {/* Guest Count */}
      <div>
        <label htmlFor="guestCount">Estimated Guest Count</label>
        <select id="guestCount" {...register('guestCount')} defaultValue="">
          <option value="" disabled>
            Select approximate guest count
          </option>
          <option value="1-25">1-25 guests</option>
          <option value="26-50">26-50 guests</option>
          <option value="51-100">51-100 guests</option>
          <option value="101-150">101-150 guests</option>
          <option value="151-200">151-200 guests</option>
          <option value="200+">200+ guests</option>
        </select>
      </div>

      {/* Preferred Date */}
      <div>
        <label htmlFor="preferredDate">Preferred Event Date</label>
        <input
          type="date"
          id="preferredDate"
          {...register('preferredDate')}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message">Tell Us About Your Vision *</label>
        <textarea
          id="message"
          rows={5}
          {...register('message', { required: 'Please tell us about your event' })}
          className={errors.message ? 'border-red-500' : ''}
          placeholder="Share your ideas, inspiration, or any details that will help us understand your dream event..."
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
