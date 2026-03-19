'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import { pickLocalized } from '@/lib/locale';
import { EASE, VIEWPORT, pageMotion } from '@/components/pages/PagePrimitives';
import { NewsArticle } from '../../../types';

interface NewsArticlePageProps {
  article: NewsArticle;
  related: NewsArticle[];
}

export default function NewsArticlePage({ article, related }: NewsArticlePageProps) {
  const { t, i18n } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const value = total <= 0 ? 0 : (window.scrollY / total) * 100;
      setProgress(Math.max(0, Math.min(100, value)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const locale = i18n.language;

  const localizedTitle = useMemo(() => pickLocalized(article.title, locale), [article.title, locale]);
  const localizedExcerpt = useMemo(() => pickLocalized(article.excerpt, locale), [article.excerpt, locale]);
  const localizedContent = useMemo(() => pickLocalized(article.content, locale), [article.content, locale]);

  /* ─── Cover parallax settle-in ─── */
  const coverRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ['start end', 'end start'] });
  const coverScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1]);

  return (
    <SiteShell withBackground withCursor>
      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-[112px] z-30 h-1 bg-white/10 md:top-[122px]">
        <div className="h-full bg-neon-lime transition-all duration-75" style={{ width: `${progress}%` }} />
      </div>

      <article className="px-6 pb-24 pt-44 md:px-12">
        {/* ─── Header with staggered entrance ─── */}
        <motion.header
          className="mx-auto w-full max-w-5xl"
          initial="hidden"
          animate="visible"
          variants={pageMotion.staggerContainer}
        >
          <motion.div variants={pageMotion.slideFromLeft}>
            <Link href="/news" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/50 transition-colors hover:text-neon-lime">
              <ArrowLeft size={14} />
              {t('newsArticle.back')}
            </Link>
          </motion.div>

          <motion.p className="mt-8 text-xs uppercase tracking-[0.24em] text-neon-lime" variants={pageMotion.fadeUp}>
            {pickLocalized(article.category, locale)}
          </motion.p>

          <motion.h1
            className="mt-4 font-display text-5xl uppercase leading-[0.9] text-white md:text-7xl lg:text-8xl"
            variants={pageMotion.blurIn}
          >
            {localizedTitle}
          </motion.h1>

          <motion.p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/60" variants={pageMotion.fadeUp}>
            {localizedExcerpt}
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap items-center gap-y-2 text-sm text-white/45" variants={pageMotion.fadeUp}>
            <span>{article.author}</span>
            <span className="mx-4 text-white/20">|</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            <span className="mx-4 text-white/20">|</span>
            <span>{pickLocalized(article.readTime, locale)}</span>
          </motion.div>
        </motion.header>

        {/* ─── Cover image with parallax settle-in ─── */}
        <motion.div
          ref={coverRef}
          className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          <motion.img
            src={article.coverImage}
            alt={localizedTitle}
            className="h-full min-h-80 w-full object-cover"
            style={{ scale: coverScale }}
          />
        </motion.div>

        {/* ─── Content with drop cap + pull quote ─── */}
        <section className="mx-auto mt-12 w-full max-w-3xl space-y-6 text-lg leading-relaxed text-white/75">
          {localizedContent.map((paragraph, index) => {
            /* Drop cap on first paragraph */
            if (index === 0) {
              const firstLetter = paragraph.charAt(0);
              const rest = paragraph.slice(1);
              return (
                <motion.p
                  key={paragraph}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  variants={pageMotion.fadeUp}
                >
                  <span className="float-left mr-3 mt-1 font-editorial text-[4rem] leading-[0.8] text-neon-lime">
                    {firstLetter}
                  </span>
                  {rest}
                </motion.p>
              );
            }

            /* Pull quote on second paragraph */
            if (index === 1) {
              return (
                <motion.blockquote
                  key={paragraph}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  variants={pageMotion.slideFromLeft}
                  className="my-8 border-l-2 border-neon-lime pl-8 font-editorial text-2xl italic leading-relaxed text-white/80"
                >
                  {paragraph}
                </motion.blockquote>
              );
            }

            return (
              <motion.p
                key={paragraph}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={pageMotion.fadeUp}
              >
                {paragraph}
              </motion.p>
            );
          })}
        </section>

        {/* ─── Tags with hover effect ─── */}
        <section className="mx-auto mt-12 w-full max-w-3xl border-t border-neon-lime/20 pt-8">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-neon-lime">{t('newsArticle.tags')}</p>
          <div className="flex flex-wrap gap-2">
            {pickLocalized(article.tags, locale).map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/65 transition-colors hover:border-neon-lime/40 hover:text-neon-lime"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </section>

        {/* ─── Related articles with hover lift ─── */}
        <motion.section
          className="mx-auto mt-20 w-full max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={pageMotion.staggerContainer}
        >
          <h2 className="mb-8 font-display text-4xl uppercase text-white md:text-5xl">{t('newsArticle.relatedTitle')}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {related.map((item) => (
              <motion.article
                key={item.slug}
                variants={pageMotion.scaleIn}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group overflow-hidden rounded-sm border border-white/10 bg-black/40 backdrop-blur-md"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={pickLocalized(item.title, locale)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">{pickLocalized(item.category, locale)}</p>
                  <h3 className="mt-3 text-2xl uppercase text-white transition-colors group-hover:text-neon-lime">
                    {pickLocalized(item.title, locale)}
                  </h3>
                  <p className="mt-3 text-white/60">{pickLocalized(item.excerpt, locale)}</p>
                  <Link href={`/news/${item.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon-lime">
                    {t('newsArticle.readMore')}
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </article>
    </SiteShell>
  );
}
