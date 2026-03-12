'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import { pickLocalized } from '@/lib/locale';
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

  return (
    <SiteShell withBackground withCursor>
      <div className="fixed left-0 right-0 top-[112px] z-30 h-1 bg-white/10 md:top-[122px]">
        <div className="h-full bg-neon-lime transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      <article className="px-6 pb-24 pt-44 md:px-12">
        <header className="mx-auto w-full max-w-5xl">
          <Link href="/news" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/50 transition-colors hover:text-neon-lime">
            <ArrowLeft size={14} />
            {t('newsArticle.back')}
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.24em] text-neon-lime">{pickLocalized(article.category, locale)}</p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] text-white md:text-7xl">{localizedTitle}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/60">{localizedExcerpt}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/45">
            <span>{article.author}</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            <span>{pickLocalized(article.readTime, locale)}</span>
          </div>

          <div className="liquid-glass-card mt-10 overflow-hidden rounded-sm">
            <img src={article.coverImage} alt={localizedTitle} className="h-full min-h-80 w-full object-cover" />
          </div>
        </header>

        <section className="mx-auto mt-12 w-full max-w-3xl space-y-6 text-lg leading-relaxed text-white/75">
          {localizedContent.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="mx-auto mt-12 w-full max-w-3xl border-t border-white/10 pt-8">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-neon-lime">{t('newsArticle.tags')}</p>
          <div className="flex flex-wrap gap-2">
            {pickLocalized(article.tags, locale).map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/65">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 w-full max-w-5xl">
          <h2 className="mb-8 font-display text-4xl uppercase text-white md:text-5xl">{t('newsArticle.relatedTitle')}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {related.map((item) => (
              <article key={item.slug} className="liquid-glass-card group overflow-hidden rounded-sm">
                <div className="h-52 overflow-hidden">
                  <img src={item.coverImage} alt={pickLocalized(item.title, locale)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
              </article>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
