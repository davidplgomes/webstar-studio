'use client';

import Link from 'next/link';
import SiteShell from '@/components/layout/SiteShell';

export default function NotFound() {
  return (
    <SiteShell withBackground withCursor>
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neon-lime">404</p>
        <h1 className="font-display text-5xl uppercase text-white md:text-7xl">Page not found</h1>
        <p className="mt-4 max-w-lg text-white/60">The route you requested is not available in this constellation.</p>
        <Link href="/" className="mt-8 rounded-full border border-neon-lime px-6 py-3 text-xs uppercase tracking-[0.24em] text-neon-lime transition-colors hover:bg-neon-lime hover:text-black">
          Back to home
        </Link>
      </section>
    </SiteShell>
  );
}
