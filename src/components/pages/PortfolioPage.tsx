'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import Projects from '../../../components/Projects';
import SiteShell from '@/components/layout/SiteShell';
import { PageCTA, PageHero, PageSection, PageShell, SectionIntro, StatStrip, pageMotion, VIEWPORT } from '@/components/pages/PagePrimitives';
import { PORTFOLIO_ENTRIES } from '@/data/portfolio';
import { pickLocalized } from '@/lib/locale';

export default function PortfolioPage() {
  const { t, i18n } = useTranslation();
  const [activeSector, setActiveSector] = useState('all');
  const locale = i18n.language;

  const metrics = t('portfolio.metrics.items', { returnObjects: true }) as Array<{ label: string; value: string }>;

  const categories = useMemo(() => {
    const sectors = PORTFOLIO_ENTRIES.map((item) => pickLocalized(item.sector, locale));
    return ['all', ...Array.from(new Set(sectors))];
  }, [locale]);

  const featured = PORTFOLIO_ENTRIES.find((item) => item.featured) ?? PORTFOLIO_ENTRIES[0];
  const filtered = activeSector === 'all'
    ? PORTFOLIO_ENTRIES
    : PORTFOLIO_ENTRIES.filter((item) => pickLocalized(item.sector, locale) === activeSector);

  /* ─── Featured image parallax ─── */
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <SiteShell withBackground withCursor>
      <PageShell>
        <PageHero
          eyebrow={t('portfolio.hero.eyebrow')}
          title={t('portfolio.hero.title')}
          description={t('portfolio.hero.description')}
          aside={<p className="max-w-xl text-sm uppercase tracking-[0.22em] text-white/38">{t('portfolio.hero.aside')}</p>}
        />

        {/* ─── Metrics ─── */}
        <PageSection className="mt-16">
          <StatStrip items={metrics} />
        </PageSection>

        <Projects />

        {/* ─── Featured Project — cinematic showcase ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('portfolio.featured.eyebrow')}
            title={t('portfolio.featured.title')}
            description={t('portfolio.featured.description')}
          />

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={pageMotion.fadeUp}
          >
            {/* Cinematic 21:9 image with parallax */}
            <div
              ref={imageRef}
              className="overflow-hidden rounded-sm border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(207,255,40,0.12),_transparent_48%),linear-gradient(180deg,rgba(10,10,10,0.88),rgba(6,6,6,0.98))]"
              style={{ aspectRatio: '21/9' }}
            >
              <motion.img
                src={featured.image}
                alt={pickLocalized(featured.title, locale)}
                className="h-[120%] w-full object-cover"
                style={{ y: imageY }}
              />
            </div>

            {/* Details below image */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div>
                <p className="page-kicker">{pickLocalized(featured.sector, locale)} / {featured.country}</p>
                <h2 className="mt-4 font-display text-4xl uppercase leading-[0.94] text-white md:text-5xl">
                  {pickLocalized(featured.title, locale)}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/64">
                  {pickLocalized(featured.summary, locale)}
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-end lg:justify-end">
                <span className="page-chip">{featured.country}</span>
                <Link
                  href={featured.website}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-neon-lime transition-colors hover:text-white"
                >
                  {t('portfolio.featured.visit')}
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </motion.article>
        </PageSection>

        {/* ─── Portfolio Grid with animated filter underline ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('portfolio.grid.eyebrow')}
            title={t('portfolio.grid.title')}
            description={t('portfolio.grid.description')}
          />

          {/* Filter with animated underline indicator */}
          <div className="mb-8 flex flex-wrap gap-5">
            {categories.map((category) => {
              const isActive = activeSector === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveSector(category)}
                  className="relative pb-2 text-xs uppercase tracking-[0.22em] transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolioActiveFilter"
                      className="absolute bottom-0 left-0 right-0 h-px bg-neon-lime"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? 'text-neon-lime' : 'text-white/50 hover:text-white'}>
                    {category === 'all' ? t('portfolio.filters.all') : category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Masonry-style grid: every 3rd card spans 2 columns */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((entry, i) => {
              const isWide = i % 3 === 0;
              return (
                <motion.article
                  key={entry.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  variants={pageMotion.rotateIn}
                  className={`group page-panel p-0 ${isWide ? 'md:col-span-2' : ''}`}
                  style={{ perspective: '600px' }}
                >
                  <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(15,15,15,0.8),rgba(8,8,8,0.95))] p-4">
                    <img
                      src={entry.image}
                      alt={pickLocalized(entry.title, locale)}
                      className={`w-full rounded-sm border border-white/10 object-cover transition-transform duration-700 group-hover:scale-105 ${
                        isWide ? 'h-64 md:h-80' : 'h-56'
                      }`}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-4 flex items-center justify-center rounded-sm bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <ArrowUpRight size={32} className="text-neon-lime" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 p-6">
                    <div>
                      <p className="page-kicker">{pickLocalized(entry.sector, locale)} / {entry.country}</p>
                      <h3 className="mt-4 text-2xl uppercase leading-tight text-white transition-colors group-hover:text-neon-lime">
                        {pickLocalized(entry.title, locale)}
                      </h3>
                      <p className="mt-3 text-white/60">{pickLocalized(entry.summary, locale)}</p>
                    </div>
                    <Link
                      href={entry.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neon-lime transition-colors hover:text-white"
                    >
                      {t('portfolio.grid.visit')}
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </PageSection>

        {/* ─── CTA ─── */}
        <PageSection>
          <PageCTA
            eyebrow={t('portfolio.cta.eyebrow')}
            title={t('portfolio.cta.title')}
            buttonText={t('portfolio.cta.button')}
            href="/contact"
          />
        </PageSection>
      </PageShell>
    </SiteShell>
  );
}
