'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MK_LOGO = 'https://images.squarespace-cdn.com/content/v1/67e6bf8bba8157627d5386e4/0c48ec95-c98a-46ff-93cc-564ef9148486/MK.jpg';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/setthestage', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-12 w-32 md:h-14 md:w-36">
          <Image
            src={MK_LOGO}
            alt="MK Traditions"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-champagne transition-colors text-sm uppercase tracking-widest font-medium ${
                isScrolled ? 'text-charcoal' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn btn-primary text-sm uppercase tracking-widest"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute left-0 w-full h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-charcoal' : 'bg-white'
              } ${isOpen ? 'top-2 rotate-45 !bg-charcoal' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 top-2 w-full h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-charcoal' : 'bg-white'
              } ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-charcoal' : 'bg-white'
              } ${isOpen ? 'top-2 -rotate-45 !bg-charcoal' : 'top-4'}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[60px] bg-white z-40 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-charcoal hover:text-champagne transition-colors text-lg uppercase tracking-widest font-medium ${
                isOpen ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={`btn btn-primary text-lg uppercase tracking-widest mt-4 ${
              isOpen ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
