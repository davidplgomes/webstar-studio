'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import { PageHero, PageSection, PageShell, SectionIntro, pageMotion, VIEWPORT } from '@/components/pages/PagePrimitives';
import { NEWS_ARTICLES } from '@/data/news';
import { pickLocalized } from '@/lib/locale';

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const locale = i18n.language;

  const categories = useMemo(() => {
    const localized = NEWS_ARTICLES.map((article) => pickLocalized(article.category, locale));
    return ['all', ...Array.from(new Set(localized))];
  }, [locale]);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return NEWS_ARTICLES;
    return NEWS_ARTICLES.filter((article) => pickLocalized(article.category, locale) === activeCategory);
  }, [activeCategory, locale]);

  const featured = NEWS_ARTICLES[0];

  return (
    <SiteShell withBackground withCursor>
      <PageShell>
        <PageHero
          eyebrow={t('newsPage.hero.eyebrow')}
          title={t('newsPage.hero.title')}
          description={t('newsPage.hero.description')}
          aside={<p className="max-w-xl text-sm uppercase tracking-[0.22em] text-white/38">{t('newsPage.hero.aside')}</p>}
        />

        {/* ─── Featured Article — gradient overlay card ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('newsPage.featured.eyebrow')}
            title={t('newsPage.featured.title')}
            description={t('newsPage.featured.description')}
          />

          <motion.article
            className="group relative min-h-[500px] cursor-pointer overflow-hidden rounded-sm md:min-h-[600px]"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={pageMotion.fadeUp}
          >
            {/* Background image with hover zoom */}
            <motion.img
              src={featured.coverImage}
              alt={pickLocalized(featured.title, locale)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Content overlaid */}
            <div className="relative flex h-full min-h-[500px] flex-col justify-between p-8 md:min-h-[600px] md:p-12">
              <span className="page-chip self-start border-white/30 text-white/80">
                {pickLocalized(featured.category, locale)}
              </span>

              <div>
                <h2 className="font-display text-4xl uppercase leading-[0.9] text-white md:text-5xl lg:text-6xl">
                  {pickLocalized(featured.title, locale)}
                </h2>
                <p className="mt-4 max-w-2xl text-white/65">{pickLocalized(featured.excerpt, locale)}</p>
                <div className="mt-6 flex items-center gap-6">
                  <span className="text-sm text-white/45">{pickLocalized(featured.readTime, locale)}</span>
                  <Link
                    href={`/news/${featured.slug}`}
                    className="group/link inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-neon-lime transition-colors hover:text-white"
                  >
                    {t('newsPage.featured.readStory')}
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/link:rotate-45" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </PageSection>

        {/* ─── Article Grid with animated filter ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('newsPage.filters.label')}
            title={t('newsPage.grid.title')}
            description={t('newsPage.grid.description')}
          />

          {/* Filter pills with layoutId animated indicator */}
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="relative rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="newsActiveFilter"
                      className="absolute inset-0 rounded-full border border-neon-lime bg-neon-lime"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-black' : 'text-white/65 hover:text-neon-lime'}`}>
                    {category === 'all' ? t('newsPage.filters.all') : category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mixed-size grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.map((article, index) => {
              const isLead = index === 0;
              return (
                <motion.article
                  key={article.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  variants={pageMotion.scaleIn}
                  className={`group page-panel overflow-hidden p-0 ${isLead ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <div className="overflow-hidden border-b border-white/10 p-4">
                    <img
                      src={article.coverImage}
                      alt={pickLocalized(article.title, locale)}
                      className={`w-full rounded-sm border border-white/10 object-cover transition-transform duration-700 group-hover:scale-105 ${
                        isLead ? 'h-72 md:h-[360px]' : 'h-52'
                      }`}
                    />
                  </div>
                  <div className="p-6">
                    <p className="page-kicker">{pickLocalized(article.category, locale)}</p>
                    <h3 className={`mt-3 uppercase leading-tight text-white transition-colors group-hover:text-neon-lime ${
                      isLead ? 'text-3xl md:text-4xl' : 'text-2xl'
                    }`}>
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
              );
            })}
          </div>
        </PageSection>
      </PageShell>
    </SiteShell>
  );
}
