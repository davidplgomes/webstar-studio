'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import { PageCTA, PageHero, PageSection, PageShell, SectionIntro, pageMotion, EASE, VIEWPORT } from '@/components/pages/PagePrimitives';

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

  /* Split manifesto into sentences for staggered animation */
  const manifestoText = t('careers.manifesto.text');
  const sentences = manifestoText
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 0);

  return (
    <SiteShell withBackground withCursor>
      <PageShell>
        <PageHero
          eyebrow={t('careers.hero.eyebrow')}
          title={t('careers.hero.title')}
          description={t('careers.hero.description')}
          aside={<p className="max-w-xl text-sm uppercase tracking-[0.22em] text-white/38">{t('careers.hero.aside')}</p>}
        />

        {/* ─── Manifesto — full-bleed typographic statement ─── */}
        <section className="mt-24 border-y border-white/10 px-6 py-20 md:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.p
              className="page-eyebrow"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={pageMotion.slideFromLeft}
            >
              {t('careers.manifesto.eyebrow')}
            </motion.p>
            <motion.div
              className="mt-6"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={pageMotion.staggerSlow}
            >
              {sentences.map((sentence, i) => (
                <motion.span
                  key={i}
                  className="block font-display text-3xl uppercase leading-[1.03] text-white md:text-5xl lg:text-6xl"
                  variants={pageMotion.revealUp}
                >
                  {sentence}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Benefits — zigzag alternating layout ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('careers.benefits.eyebrow')}
            title={t('careers.benefits.title')}
            description={t('careers.benefits.subtitle')}
          />
          <div className="flex flex-col gap-4">
            {benefits.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.article
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  variants={isEven ? pageMotion.slideFromLeft : pageMotion.slideFromRight}
                  className={`page-panel relative max-w-2xl overflow-hidden ${isEven ? 'mr-auto' : 'ml-auto'}`}
                >
                  <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-7xl text-white/[0.05]">
                    0{index + 1}
                  </span>
                  <p className="page-kicker relative">0{index + 1}</p>
                  <h3 className="relative mt-4 text-2xl uppercase text-white">{item.title}</h3>
                  <p className="relative mt-3 text-white/60">{item.detail}</p>
                </motion.article>
              );
            })}
          </div>
        </PageSection>

        {/* ─── Process — horizontal connected steps ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('careers.process.eyebrow')}
            title={t('careers.process.title')}
            description={t('careers.process.description')}
          />

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[5%] right-[5%] top-5 hidden h-px bg-white/10 md:block">
              <motion.div
                className="h-full origin-left bg-neon-lime"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
              />
            </div>

            {/* Steps */}
            <motion.div
              className="grid gap-6 md:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={pageMotion.staggerContainer}
            >
              {process.map((item, i) => (
                <motion.div key={item.step} variants={pageMotion.fadeUp} className="flex flex-col items-center">
                  {/* Circle node */}
                  <div className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-full border-2 border-neon-lime bg-black font-display text-sm text-neon-lime">
                    {i + 1}
                  </div>
                  {/* Card */}
                  <div className="page-panel w-full text-center">
                    <p className="page-kicker">{item.step}</p>
                    <h3 className="mt-3 text-xl uppercase text-white">{item.title}</h3>
                    <p className="mt-3 text-white/60">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </PageSection>

        {/* ─── CTA ─── */}
        <PageSection>
          <PageCTA
            eyebrow={t('careers.cta.eyebrow')}
            title={t('careers.cta.title')}
            buttonText={t('careers.cta.button')}
            href="/contact"
          />
        </PageSection>
      </PageShell>
    </SiteShell>
  );
}
