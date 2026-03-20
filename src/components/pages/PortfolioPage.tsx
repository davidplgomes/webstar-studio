'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

import SiteShell from '@/components/layout/SiteShell';
import { PORTFOLIO_ENTRIES } from '@/data/portfolio';
import { pickLocalized } from '@/lib/locale';
import Footer from '../../../components/Footer';
import Projects from '../../../components/Projects';

const PROJECT_VISUALS: Record<string, string> = {
  'fox-delivery': 'https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?q=80&w=2400&auto=format&fit=crop',
  daton: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2400&auto=format&fit=crop',
  'rankey-ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2400&auto=format&fit=crop',
  'cpb-advocacia': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2400&auto=format&fit=crop',
  'affordable-granite-florida': 'https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?q=80&w=2400&auto=format&fit=crop',
  ciranda: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2400&auto=format&fit=crop',
  'lisheen-springs-golf-club': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2400&auto=format&fit=crop',
  'veranne-brand': 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2400&auto=format&fit=crop',
};

function splitHeadline(text: string, lineCount = 3) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const chunkSize = Math.max(1, Math.ceil(words.length / lineCount));
  const lines: string[] = [];

  for (let index = 0; index < words.length; index += chunkSize) {
    lines.push(words.slice(index, index + chunkSize).join(' '));
  }

  return lines;
}

export default function PortfolioPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const heroTitle = t('portfolio.hero.title');

  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');

  const sectors = useMemo(
    () => Array.from(new Set(PORTFOLIO_ENTRIES.map((entry) => pickLocalized(entry.sector, locale)))),
    [locale]
  );
  const countries = useMemo(() => Array.from(new Set(PORTFOLIO_ENTRIES.map((entry) => entry.country))), []);

  const filteredEntries = useMemo(
    () =>
      PORTFOLIO_ENTRIES.filter((entry) => {
        const sector = pickLocalized(entry.sector, locale);
        const matchesSector = sectorFilter === 'all' || sector === sectorFilter;
        const matchesCountry = countryFilter === 'all' || entry.country === countryFilter;
        return matchesSector && matchesCountry;
      }),
    [countryFilter, locale, sectorFilter]
  );

  const featuredEntry = filteredEntries.find((entry) => entry.featured) ?? null;
  const showcaseEntries = filteredEntries;
  const heroLines = useMemo(() => splitHeadline(heroTitle, 3), [heroTitle]);
  const activeSectorLabel = sectorFilter === 'all' ? t('portfolio.filters.all') : sectorFilter;
  const activeCountryLabel = countryFilter === 'all' ? t('portfolio.filters.all') : countryFilter;

  return (
    <SiteShell withBackground>
      <div className="min-h-screen bg-transparent text-white selection:bg-neon-lime selection:text-black">
        <section id="globe-trigger" className="relative h-screen overflow-hidden bg-transparent text-white">
          <div className="relative z-10 flex h-full flex-col px-6 md:px-12 lg:px-16">
            <div className="flex h-full flex-col justify-center pt-24">
              <div className="w-full max-w-[1400px]">
                {heroLines.map((line, index) => (
                  <h1
                    key={`${line}-${index}`}
                    className={`font-display text-[15vw] uppercase leading-[0.82] tracking-[-0.07em] md:text-[9vw] lg:text-[6.6vw] ${
                      index === 1 ? 'font-light text-white/32' : index === heroLines.length - 1 ? 'font-bold text-white' : 'text-white'
                    }`}
                  >
                    {line}
                  </h1>
                ))}
                <p className="mt-8 max-w-3xl font-editorial text-[clamp(1.18rem,1.9vw,1.75rem)] italic leading-[1.34] text-white/80">
                  {t('portfolio.hero.description')}
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pb-6 pt-5 md:pb-8">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">{t('portfolio.featured.eyebrow')}</p>
                  <div className="mt-4 space-y-3">
                    {(filteredEntries.length ? filteredEntries : PORTFOLIO_ENTRIES).slice(0, 3).map((entry, index) => (
                      <p key={`${entry.slug}-${index}`} className="font-display text-2xl uppercase leading-[0.9] tracking-[-0.05em] text-white/82">
                        {pickLocalized(entry.title, locale)}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">{t('portfolio.grid.eyebrow')}</p>
                  <p className="mt-4 max-w-3xl font-display text-3xl uppercase leading-[0.9] tracking-[-0.05em] text-white">
                    {String(filteredEntries.length).padStart(2, '0')} projects / {activeSectorLabel} / {activeCountryLabel}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">
                    {t('portfolio.grid.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black/92 px-6 py-10 md:px-12 md:py-12 lg:px-16">
          <div className="relative z-10 mx-auto w-full max-w-[1500px] border-t border-white/10 py-6">
            <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <button
                  type="button"
                  onClick={() => setSectorFilter('all')}
                  className={`pb-1 text-xs uppercase tracking-[0.18em] ${
                    sectorFilter === 'all' ? 'border-b border-neon-lime text-neon-lime' : 'text-white/46 hover:text-white'
                  }`}
                  aria-pressed={sectorFilter === 'all'}
                >
                  {t('portfolio.filters.all')}
                </button>
                {sectors.map((sector) => {
                  const isActive = sectorFilter === sector;
                  return (
                    <button
                      key={sector}
                      type="button"
                      onClick={() => setSectorFilter(sector)}
                      className={`pb-1 text-xs uppercase tracking-[0.18em] ${
                        isActive ? 'border-b border-neon-lime text-neon-lime' : 'text-white/46 hover:text-white'
                      }`}
                      aria-pressed={isActive}
                    >
                      {sector}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 xl:justify-end">
                <button
                  type="button"
                  onClick={() => setCountryFilter('all')}
                  className={`pb-1 text-xs uppercase tracking-[0.18em] ${
                    countryFilter === 'all' ? 'border-b border-neon-lime text-neon-lime' : 'text-white/46 hover:text-white'
                  }`}
                  aria-pressed={countryFilter === 'all'}
                >
                  {t('portfolio.filters.all')}
                </button>
                {countries.map((country) => {
                  const isActive = countryFilter === country;
                  return (
                    <button
                      key={country}
                      type="button"
                      onClick={() => setCountryFilter(country)}
                      className={`pb-1 text-xs uppercase tracking-[0.18em] ${
                        isActive ? 'border-b border-neon-lime text-neon-lime' : 'text-white/46 hover:text-white'
                      }`}
                      aria-pressed={isActive}
                    >
                      {country}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <Projects showViewAll={false} />

        <section className="bg-black/86 px-6 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-12 border-t border-white/10 pt-6 md:mb-16">
              <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('portfolio.grid.title')}</p>
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="max-w-4xl font-display text-4xl uppercase leading-[0.82] tracking-[-0.04em] md:text-6xl">
                  {featuredEntry ? pickLocalized(featuredEntry.title, locale) : t('portfolio.grid.title')}
                </h2>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">
                  {String(showcaseEntries.length).padStart(2, '0')} / {t('portfolio.filters.all')}
                </p>
              </div>
            </div>

            {showcaseEntries.length ? (
              <div className="space-y-16 md:space-y-20">
                {showcaseEntries.map((entry, index) => {
                  const reverse = index % 2 === 1;
                  const image = PROJECT_VISUALS[entry.slug] ?? entry.image;

                  return (
                    <motion.article
                      key={entry.slug}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="relative border-b border-white/10 pb-14 md:pb-16"
                    >
                      <div className="pointer-events-none absolute right-0 top-0 hidden font-display text-[8rem] uppercase leading-none tracking-[-0.08em] text-white/[0.05] md:block">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                        <div className={`${reverse ? 'lg:order-2' : ''} relative overflow-hidden`}>
                          <img src={image} alt={pickLocalized(entry.title, locale)} className="h-[40svh] w-full object-cover md:h-[58svh]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/8 to-black/18" />
                        </div>

                        <div className={`${reverse ? 'lg:order-1' : ''}`}>
                          <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">
                            {String(index + 1).padStart(2, '0')} / {pickLocalized(entry.sector, locale)}
                          </p>
                          <h3 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.82] tracking-[-0.04em] md:text-6xl">
                            {pickLocalized(entry.title, locale)}
                          </h3>
                          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
                            {pickLocalized(entry.summary, locale)}
                          </p>
                          <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-white/52">{entry.country}</p>
                          <Link
                            href={entry.website}
                            target="_blank"
                            rel="noreferrer"
                            className="group mt-8 inline-flex w-fit items-center gap-2 border-b border-white/35 pb-1 text-xs uppercase tracking-[0.2em] text-white/82 hover:border-neon-lime hover:text-neon-lime"
                          >
                            {t('portfolio.grid.visit')}
                            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            ) : (
              <div className="py-20 text-center">
                <h3 className="font-display text-4xl uppercase leading-[0.84] tracking-[-0.04em] md:text-6xl">
                  {t('portfolio.grid.title')}
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/62">{t('portfolio.grid.description')}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSectorFilter('all');
                    setCountryFilter('all');
                  }}
                  className="mt-8 border-b border-neon-lime pb-1 text-xs uppercase tracking-[0.2em] text-neon-lime"
                >
                  {t('portfolio.filters.all')}
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/92 px-6 py-12 md:px-12 lg:px-16">
          <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {(t('portfolio.metrics.items', { returnObjects: true }) as Array<{ label: string; value: string }>).map((item, index) => (
              <div key={`${item.label}-${index}`}>
                <p className="font-display text-5xl uppercase tracking-[-0.04em] md:text-6xl">{item.value}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/55">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </SiteShell>
  );
}
