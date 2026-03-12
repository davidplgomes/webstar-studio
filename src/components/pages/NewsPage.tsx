'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import { NEWS_ARTICLES } from '@/data/news';
import { pickLocalized } from '@/lib/locale';

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const locale = i18n.language;

  const categories = useMemo(() => {
    const allLocalized = NEWS_ARTICLES.map((article) => pickLocalized(article.category, locale));
    return ['all', ...Array.from(new Set(allLocalized))];
  }, [locale]);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return NEWS_ARTICLES;

    return NEWS_ARTICLES.filter((article) => pickLocalized(article.category, locale) === activeCategory);
  }, [activeCategory, locale]);

  const featured = NEWS_ARTICLES[0];

  return (
    <SiteShell withBackground withCursor>
      <div className="px-6 pb-24 pt-44 md:px-12">
        <section className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-neon-lime">{t('newsPage.hero.eyebrow')}</p>
            <h1 className="font-display text-5xl uppercase leading-[0.9] text-white md:text-7xl lg:text-8xl">{t('newsPage.hero.title')}</h1>
          </div>
          <p className="self-end text-lg leading-relaxed text-white/65">{t('newsPage.hero.description')}</p>
        </section>

        <section className="liquid-glass-card mx-auto mt-20 w-full max-w-7xl overflow-hidden rounded-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
            <div className="h-full min-h-72 overflow-hidden">
              <img src={featured.coverImage} alt={pickLocalized(featured.title, locale)} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-6 p-8 md:p-10">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-neon-lime">{pickLocalized(featured.category, locale)}</p>
                <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-white md:text-5xl">
                  {pickLocalized(featured.title, locale)}
                </h2>
                <p className="mt-4 text-white/60">{pickLocalized(featured.excerpt, locale)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/45">{pickLocalized(featured.readTime, locale)}</p>
                <Link href={`/news/${featured.slug}`} className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-neon-lime">
                  {t('newsPage.featured.readStory')}
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-7xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/45">{t('newsPage.filters.label')}</p>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors ${
                    isActive
                      ? 'border-neon-lime bg-neon-lime text-black'
                      : 'border-white/20 bg-black/30 text-white/65 hover:border-neon-lime hover:text-neon-lime'
                  }`}
                >
                  {category === 'all' ? t('newsPage.filters.all') : category}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-10 grid w-full max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05, duration: 0.45 }}
              className="liquid-glass-card group overflow-hidden rounded-sm"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={article.coverImage}
                  alt={pickLocalized(article.title, locale)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">{pickLocalized(article.category, locale)}</p>
                <h3 className="mt-3 text-2xl uppercase leading-tight text-white transition-colors group-hover:text-neon-lime">
                  {pickLocalized(article.title, locale)}
                </h3>
                <p className="mt-3 text-white/60">{pickLocalized(article.excerpt, locale)}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-white/45">{pickLocalized(article.readTime, locale)}</span>
                  <Link href={`/news/${article.slug}`} className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-neon-lime">
                    {t('newsPage.card.read')}
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </SiteShell>
  );
}
