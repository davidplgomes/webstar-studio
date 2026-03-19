'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import { PageHero, PageSection, PageShell, SectionIntro, StatStrip, pageMotion, EASE, VIEWPORT } from '@/components/pages/PagePrimitives';

interface MetricItem { label: string; value: string }
interface ValueItem { title: string; description: string }
interface PresenceItem { city: string; detail: string }
interface TestimonialItem { quote: string; author: string }

export default function AboutPage() {
  const { t } = useTranslation();

  const metrics = t('about.metrics.items', { returnObjects: true }) as MetricItem[];
  const values = t('about.values.items', { returnObjects: true }) as ValueItem[];
  const presence = t('about.presence.items', { returnObjects: true }) as PresenceItem[];
  const testimonials = t('about.testimonials.items', { returnObjects: true }) as TestimonialItem[];
  const credentials = t('about.founder.credentials', { returnObjects: true }) as string[];

  /* ─── Testimonial carousel ─── */
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <SiteShell withBackground withCursor>
      <PageShell>
        <PageHero
          eyebrow={t('about.hero.eyebrow')}
          title={t('about.hero.title')}
          description={t('about.hero.description')}
          aside={<p className="max-w-xl text-sm uppercase tracking-[0.22em] text-white/38">{t('about.hero.aside')}</p>}
        />

        {/* ─── Metrics ─── */}
        <PageSection className="mt-16">
          <StatStrip items={metrics} />
        </PageSection>

        {/* ─── Positioning — editorial pull quote + mission strip ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('about.positioning.eyebrow')}
            title={t('about.positioning.title')}
            description={t('about.positioning.description')}
          />

          {/* Pull quote */}
          <motion.article
            className="page-panel relative"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={pageMotion.fadeUp}
          >
            <span className="pointer-events-none absolute -left-2 -top-8 select-none font-editorial text-[8rem] leading-none text-neon-lime/20">
              &ldquo;
            </span>
            <p className="page-kicker">{t('about.positioning.pitchLabel')}</p>
            <p className="mt-5 font-editorial text-[clamp(1.5rem,3.5vw,3rem)] italic leading-[1.2] text-white/85">
              {t('about.positioning.pitch')}
            </p>
          </motion.article>

          {/* Mission / Vision / Promise strip */}
          <motion.div
            className="mt-4 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/5 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={pageMotion.staggerFast}
          >
            {[
              { label: t('about.mission.title'), text: t('about.mission.description') },
              { label: t('about.vision.title'), text: t('about.vision.description') },
              { label: t('about.promise.title'), text: t('about.promise.description') },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={pageMotion.fadeUp}
                className="bg-black/80 p-6 backdrop-blur-md"
              >
                <p className="page-kicker">{item.label}</p>
                <p className="mt-4 text-white/62">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </PageSection>

        {/* ─── Values — bento asymmetric grid ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('about.values.eyebrow')}
            title={t('about.values.title')}
            description={t('about.values.description')}
          />

          <div className="flex flex-col gap-4">
            {/* Row 1: 1.5fr / 1fr */}
            <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
              {values.slice(0, 2).map((item, index) => (
                <motion.article
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  variants={index === 0 ? pageMotion.slideFromLeft : pageMotion.slideFromRight}
                  className="page-panel"
                >
                  <p className="page-kicker">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl uppercase text-white">{item.title}</h3>
                  <p className="mt-3 text-white/60">{item.description}</p>
                </motion.article>
              ))}
            </div>
            {/* Row 2: 1fr / 1.5fr */}
            <div className="grid gap-4 md:grid-cols-[1fr_1.5fr]">
              {values.slice(2, 4).map((item, index) => (
                <motion.article
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  variants={index === 0 ? pageMotion.slideFromLeft : pageMotion.slideFromRight}
                  className="page-panel"
                >
                  <p className="page-kicker">0{index + 3}</p>
                  <h3 className="mt-4 text-2xl uppercase text-white">{item.title}</h3>
                  <p className="mt-3 text-white/60">{item.description}</p>
                </motion.article>
              ))}
            </div>
            {/* Row 3: 1fr / 1fr */}
            <div className="grid gap-4 md:grid-cols-2">
              {values.slice(4, 6).map((item, index) => (
                <motion.article
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  variants={index === 0 ? pageMotion.slideFromLeft : pageMotion.slideFromRight}
                  className="page-panel"
                >
                  <p className="page-kicker">0{index + 5}</p>
                  <h3 className="mt-4 text-2xl uppercase text-white">{item.title}</h3>
                  <p className="mt-3 text-white/60">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </PageSection>

        {/* ─── Founder — magazine spread with vertical divider ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('about.founder.eyebrow')}
            title={t('about.founder.title')}
            description={t('about.founder.description')}
          />

          <motion.article
            className="page-panel"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={pageMotion.fadeUp}
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_2px_1fr]">
              {/* Bio side */}
              <div>
                <p className="page-kicker">{t('about.founder.role')}</p>
                <h3 className="mt-4 stroke-text-lime font-display text-[clamp(3rem,5vw,5rem)] uppercase leading-[0.95]">
                  {t('about.founder.name')}
                </h3>
                <p className="mt-5 text-white/62">{t('about.founder.bio')}</p>
              </div>

              {/* Vertical neon divider */}
              <div className="hidden bg-neon-lime/30 lg:block" />

              {/* Credentials side */}
              <div>
                <p className="page-kicker">{t('about.founder.credentialsLabel')}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {credentials.map((item) => (
                    <span key={item} className="page-chip transition-colors hover:border-neon-lime/40 hover:bg-neon-lime/10 hover:text-neon-lime">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </PageSection>

        {/* ─── Presence — horizontal scroll strip ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('about.presence.eyebrow')}
            title={t('about.presence.title')}
            description={t('about.presence.description')}
          />

          <motion.div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={pageMotion.staggerContainer}
          >
            {presence.map((item) => (
              <motion.article
                key={item.city}
                variants={pageMotion.slideFromRight}
                className="page-panel min-w-[280px] flex-shrink-0 snap-center md:min-w-[320px]"
              >
                <p className="font-display text-5xl uppercase leading-none text-white">{item.city}</p>
                <p className="mt-4 text-white/58">{item.detail}</p>
              </motion.article>
            ))}
          </motion.div>
        </PageSection>

        {/* ─── Testimonials — rotating carousel ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('about.testimonials.eyebrow')}
            title={t('about.testimonials.title')}
            description={t('about.testimonials.description')}
          />

          <div className="page-panel relative min-h-[200px]">
            <AnimatePresence mode="wait">
              {testimonials.length > 0 && (
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <p className="font-editorial text-2xl italic leading-relaxed text-white/80 md:text-3xl lg:text-4xl">
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </p>
                  <p className="mt-6 flex items-center gap-3 page-kicker">
                    <span className="inline-block h-px w-6 bg-neon-lime" />
                    {testimonials[activeTestimonial].author}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot navigation */}
            {testimonials.length > 1 && (
              <div className="mt-8 flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeTestimonial ? 'w-6 bg-neon-lime' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </PageSection>
      </PageShell>
    </SiteShell>
  );
}
