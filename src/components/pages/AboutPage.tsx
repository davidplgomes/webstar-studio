'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import { useMotionSettings } from '@/hooks/useMotionSettings';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface MetricItem {
  label: string;
  value: string;
}

interface PresenceItem {
  city: string;
  detail: string;
}

interface LeadershipItem {
  title: string;
  value: string;
}

export default function AboutPage() {
  const { t } = useTranslation();
  const { cinematicEnabled } = useMotionSettings();

  const missionRef = useRef<HTMLElement>(null);

  const timeline = t('about.timeline.items', { returnObjects: true }) as TimelineItem[];
  const metrics = t('about.metrics.items', { returnObjects: true }) as MetricItem[];
  const presence = t('about.presence.items', { returnObjects: true }) as PresenceItem[];
  const leadership = t('about.leadership.items', { returnObjects: true }) as LeadershipItem[];

  useGSAP(
    () => {
      if (!missionRef.current || !cinematicEnabled) return;

      const cards = missionRef.current.querySelectorAll('[data-mission-card]');

      gsap.fromTo(
        cards,
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: missionRef.current,
            start: 'top 70%',
          },
        }
      );
    },
    { dependencies: [cinematicEnabled] }
  );

  return (
    <SiteShell withBackground withCursor>
      <div className="px-6 pb-24 pt-44 md:px-12">
        <section className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-neon-lime">{t('about.hero.eyebrow')}</p>
            <h1 className="font-display text-5xl uppercase leading-[0.9] text-white md:text-7xl lg:text-8xl">{t('about.hero.title')}</h1>
          </div>
          <p className="self-end text-lg leading-relaxed text-white/65">{t('about.hero.description')}</p>
        </section>

        <section ref={missionRef} className="mx-auto mt-24 grid w-full max-w-7xl gap-4 md:grid-cols-3">
          <article data-mission-card className="liquid-glass-card rounded-sm p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-neon-lime">{t('about.mission.title')}</p>
            <p className="mt-4 text-white/65">{t('about.mission.description')}</p>
          </article>
          <article data-mission-card className="liquid-glass-card rounded-sm p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-neon-lime">{t('about.vision.title')}</p>
            <p className="mt-4 text-white/65">{t('about.vision.description')}</p>
          </article>
          <article data-mission-card className="liquid-glass-card rounded-sm p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-neon-lime">{t('about.promise.title')}</p>
            <p className="mt-4 text-white/65">{t('about.promise.description')}</p>
          </article>
        </section>

        <section className="mx-auto mt-24 grid w-full max-w-7xl gap-12 lg:grid-cols-[0.52fr_0.48fr]">
          <div>
            <h2 className="mb-8 font-display text-4xl uppercase text-white md:text-5xl">{t('about.timeline.title')}</h2>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.article
                  key={item.year}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                  className="liquid-glass-card rounded-sm p-6"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neon-lime">{item.year}</p>
                  <h3 className="mt-3 text-2xl uppercase text-white">{item.title}</h3>
                  <p className="mt-2 text-white/60">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-8 font-display text-4xl uppercase text-white md:text-5xl">{t('about.metrics.title')}</h2>
            <div className="space-y-4">
              {metrics.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                  className="liquid-glass-card flex items-center justify-between rounded-sm px-5 py-4"
                >
                  <p className="text-white/60">{item.label}</p>
                  <p className="font-display text-2xl text-neon-lime">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-24 grid w-full max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 font-display text-4xl uppercase text-white md:text-5xl">{t('about.presence.title')}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {presence.map((item, index) => (
                <motion.article
                  key={item.city}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="liquid-glass-card rounded-sm p-5"
                >
                  <p className="text-lg uppercase text-white">{item.city}</p>
                  <p className="mt-2 text-sm text-white/55">{item.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-8 font-display text-4xl uppercase text-white md:text-5xl">{t('about.leadership.title')}</h2>
            <div className="space-y-4">
              {leadership.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                  className="liquid-glass-card rounded-sm p-6"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-neon-lime">{item.title}</p>
                  <p className="mt-3 text-2xl text-white/85">{item.value}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
