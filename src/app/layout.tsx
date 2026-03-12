import type { Metadata } from 'next';
import { Space_Grotesk, Syne, Cormorant_Garamond, Oswald, Bebas_Neue } from 'next/font/google';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import I18nInit from '@/components/I18nInit';
import LiquidGlassFilter from '@/components/LiquidGlassFilter';
import './globals.css';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WEBSTAR',
  description: 'High-performance WebGL portfolio by Webstar Studio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable} ${cormorant.variable} ${oswald.variable} ${bebasNeue.variable}`}
    >
      <body className="font-sans">
        <I18nInit />
        <LiquidGlassFilter />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
