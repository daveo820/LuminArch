import type { Metadata } from 'next';
import { Bebas_Neue, Inter, Dancing_Script } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';

const bebas = Bebas_Neue({
  variable: '--font-bebas',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const dancingScript = Dancing_Script({
  variable: '--font-script',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NOWADAYS. | Live Well - Wilmington, NC',
    template: '%s | NOWADAYS.',
  },
  description:
    'Learn to love the now. Shop premium sweat sets from Nowadays Wilmington. Every moment becomes a memory. EST. 2025.',
  keywords: [
    'Wilmington boutique',
    'sweat sets',
    'matching sets',
    'Wilmington NC shopping',
    'loungewear',
    'athleisure',
    'Nowadays Wilmington',
    'live well',
    'premium sweatsuits',
    'coastal lifestyle',
  ],
  authors: [{ name: 'Nowadays Wilmington' }],
  creator: 'Nowadays Wilmington',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nowadayswilmington.com',
    siteName: 'NOWADAYS.',
    title: 'NOWADAYS. | Live Well - Wilmington, NC',
    description:
      'Learn to love the now. Premium sweat sets from Wilmington, NC. Every moment becomes a memory. EST. 2025.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NOWADAYS. - Live Well',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOWADAYS. | Live Well - Wilmington, NC',
    description:
      'Learn to love the now. Premium sweat sets from Wilmington, NC. EST. 2025.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${dancingScript.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1A1A1A" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Only hide cursor on devices with hover capability (desktop)
                  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

                  // Add class to html element - CSS handles the rest
                  document.documentElement.classList.add('hide-cursor');
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ClothingStore',
              name: 'Nowadays Wilmington',
              description:
                'Coastal-inspired boutique fashion in Wilmington, NC. Curated beachy styles for the laid-back lifestyle.',
              url: 'https://nowadayswilmington.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Wilmington',
                addressRegion: 'NC',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 34.2257,
                longitude: -77.9447,
              },
              priceRange: '$$',
              image: 'https://nowadayswilmington.com/og-image.jpg',
              sameAs: ['https://instagram.com/nowadayswilmington'],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#FFFFFF',
              color: '#1A1A1A',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
              fontFamily: 'var(--font-inter)',
            },
            success: {
              iconTheme: {
                primary: '#1A1A1A',
                secondary: '#FFFFFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#E8998D',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
