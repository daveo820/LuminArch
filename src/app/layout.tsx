import type { Metadata } from 'next';
import { Cormorant_Garamond, Lato } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MK Traditions | Event Planning in Cary, NC — Weddings, Celebrations & More',
    template: '%s | MK Traditions',
  },
  description:
    'MK Traditions is a boutique event planning company in Cary, NC serving the Triangle area. From elegant weddings to milestone celebrations, we create unforgettable moments with personal attention and family values.',
  keywords: [
    'Cary NC event planner',
    'Raleigh wedding planner',
    'Triangle area event planning',
    'Durham event planner',
    'Chapel Hill wedding coordinator',
    'birthday party planner Cary NC',
    'corporate event planner Raleigh',
    'NC wedding coordinator',
    'Triangle celebration planning',
    'Raleigh Durham event planning',
  ],
  authors: [{ name: 'MK Traditions' }],
  creator: 'MK Traditions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mktraditions.com',
    siteName: 'MK Traditions',
    title: 'MK Traditions | Event Planning in Cary, NC & the Triangle',
    description:
      'Boutique event planning in Cary, NC serving the Triangle. From elegant weddings to milestone celebrations, we create unforgettable moments.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MK Traditions Event Planning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MK Traditions | Event Planning in Cary, NC & the Triangle',
    description:
      'Boutique event planning in Cary, NC serving the Triangle. From elegant weddings to milestone celebrations.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C9A86C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'MK Traditions',
              description:
                'Boutique event planning company in Cary, NC serving the Triangle area, specializing in weddings, milestone celebrations, and corporate events.',
              url: 'https://mktraditions.com',
              telephone: '',
              email: 'mktraditions.nc@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cary',
                addressRegion: 'NC',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 35.7915,
                longitude: -78.7811,
              },
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Cary',
                  containedInPlace: { '@type': 'State', name: 'North Carolina' },
                },
                {
                  '@type': 'City',
                  name: 'Raleigh',
                  containedInPlace: { '@type': 'State', name: 'North Carolina' },
                },
                {
                  '@type': 'City',
                  name: 'Durham',
                  containedInPlace: { '@type': 'State', name: 'North Carolina' },
                },
                {
                  '@type': 'City',
                  name: 'Chapel Hill',
                  containedInPlace: { '@type': 'State', name: 'North Carolina' },
                },
              ],
              priceRange: '$$',
              image: 'https://mktraditions.com/og-image.jpg',
              sameAs: ['https://instagram.com/mktraditions'],
              serviceType: [
                'Wedding Planning',
                'Event Planning',
                'Corporate Event Planning',
                'Birthday Party Planning',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
