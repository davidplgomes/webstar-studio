'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';

interface BenefitItem {
  title: string;
  detail: string;
}

interface ProcessItem {
  step: string;
  title: string;
  description: string;
}

export default function CareersPage() {
  const { t } = useTranslation();

  const benefits = t('careers.benefits.items', { returnObjects: true }) as BenefitItem[];
  const process = t('careers.process.items', { returnObjects: true }) as ProcessItem[];

  return (
    <SiteShell withBackground withCursor>
      <div className="px-6 pb-24 pt-44 md:px-12">
        <section className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-neon-lime">{t('careers.hero.eyebrow')}</p>
            <h1 className="font-display text-5xl uppercase leading-[0.9] text-white md:text-7xl lg:text-8xl">{t('careers.hero.title')}</h1>
          </div>
          <p className="self-end text-lg leading-relaxed text-white/65">{t('careers.hero.description')}</p>
        </section>

        <section className="liquid-glass-card mx-auto mt-20 w-full max-w-7xl rounded-sm p-8 md:p-12">
          <p className="mb-4 text-xs uppercase tracking-[0.26em] text-neon-lime">{t('careers.manifesto.eyebrow')}</p>
          <p className="max-w-4xl font-display text-3xl uppercase leading-[1.05] text-white md:text-5xl">{t('careers.manifesto.text')}</p>
        </section>

        <section className="mx-auto mt-24 w-full max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl uppercase text-white md:text-5xl">{t('careers.benefits.title')}</h2>
            <p className="max-w-lg text-sm uppercase tracking-[0.2em] text-white/40">{t('careers.benefits.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {benefits.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="liquid-glass-card rounded-sm p-6"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-neon-lime">0{index + 1}</p>
                <h3 className="mt-3 text-2xl uppercase text-white">{item.title}</h3>
                <p className="mt-2 text-white/60">{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 w-full max-w-7xl">
          <h2 className="mb-8 font-display text-4xl uppercase text-white md:text-5xl">{t('careers.process.title')}</h2>

          <div className="grid gap-5 md:grid-cols-3">
            {process.map((item, index) => (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="liquid-glass-card group rounded-sm p-6 transition-colors hover:border-white/30"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">{item.step}</p>
                <h3 className="mt-4 text-2xl uppercase text-white transition-colors group-hover:text-neon-lime">{item.title}</h3>
                <p className="mt-3 text-white/60">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="liquid-glass-card mx-auto mt-24 w-full max-w-7xl rounded-sm p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.26em] text-neon-lime">{t('careers.cta.eyebrow')}</p>
              <h2 className="font-display text-4xl uppercase text-white md:text-6xl">{t('careers.cta.title')}</h2>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-lg uppercase tracking-wide text-neon-lime transition-colors hover:text-white"
            >
              {t('careers.cta.button')}
              <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
