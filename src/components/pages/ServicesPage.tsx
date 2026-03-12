'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import { useMotionSettings } from '@/hooks/useMotionSettings';

gsap.registerPlugin(ScrollTrigger);

interface ServiceUseCase {
  title: string;
  description: string;
  metric: string;
}

interface CapabilityItem {
  title: string;
  value: string;
  detail: string;
}

interface DeliveryStep {
  phase: string;
  title: string;
  description: string;
}

export default function ServicesPage() {
  const { t } = useTranslation();
  const { cinematicEnabled } = useMotionSettings();

  const heroRef = useRef<HTMLElement>(null);
  const matrixRef = useRef<HTMLElement>(null);

  const useCases = t('services.useCases.items', { returnObjects: true }) as ServiceUseCase[];
  const capabilities = t('services.capabilities.items', { returnObjects: true }) as CapabilityItem[];
  const delivery = t('services.delivery.items', { returnObjects: true }) as DeliveryStep[];

  useGSAP(
    () => {
      if (!cinematicEnabled) return;
      if (!heroRef.current || !matrixRef.current) return;

      const heroTitle = heroRef.current.querySelector('[data-hero-title]');
      const heroDescription = heroRef.current.querySelector('[data-hero-description]');

      gsap.fromTo(
        heroTitle,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        heroDescription,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 78%',
          },
        }
      );

      ScrollTrigger.create({
        trigger: matrixRef.current,
        start: 'top top+=120',
        end: 'bottom bottom',
        pin: matrixRef.current.querySelector('[data-matrix-pin]'),
        pinSpacing: false,
      });
    },
    { dependencies: [cinematicEnabled] }
  );

  return (
    <SiteShell withBackground withCursor>
      <div className="px-6 pb-24 pt-44 md:px-12">
        <section ref={heroRef} className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neon-lime">{t('services.hero.eyebrow')}</p>
            <h1 data-hero-title className="font-display text-5xl uppercase leading-[0.9] text-white md:text-7xl lg:text-8xl">
              {t('services.hero.title')}
            </h1>
          </div>
          <p data-hero-description className="max-w-xl place-self-end text-lg leading-relaxed text-white/65">
            {t('services.hero.description')}
          </p>
        </section>

        <section className="mx-auto mt-24 w-full max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl uppercase tracking-wide text-white md:text-6xl">{t('services.useCases.title')}</h2>
            <p className="max-w-xl text-sm uppercase tracking-[0.2em] text-white/40">{t('services.useCases.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                className="liquid-glass-card group flex min-h-72 flex-col justify-between rounded-sm p-6"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">{item.metric}</p>
                <div>
                  <h3 className="mb-4 text-2xl uppercase leading-tight text-white transition-colors group-hover:text-neon-lime">{item.title}</h3>
                  <p className="text-white/55">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section ref={matrixRef} className="mx-auto mt-28 grid w-full max-w-7xl gap-10 lg:grid-cols-[0.45fr_0.55fr]">
          <div data-matrix-pin className="liquid-glass-card h-fit rounded-sm p-8">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neon-lime">{t('services.capabilities.eyebrow')}</p>
            <h2 className="font-display text-4xl uppercase leading-[0.95] text-white md:text-6xl">{t('services.capabilities.title')}</h2>
            <p className="mt-6 text-white/60">{t('services.capabilities.description')}</p>
          </div>

          <div className="space-y-4">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                className="liquid-glass-card grid gap-6 rounded-sm p-6 md:grid-cols-[0.34fr_0.66fr]"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">0{index + 1}</p>
                  <h3 className="mt-3 text-xl uppercase text-white">{capability.title}</h3>
                </div>
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <p className="text-white/60">{capability.detail}</p>
                  <p className="font-display text-lg uppercase tracking-wide text-neon-lime">{capability.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-28 w-full max-w-7xl">
          <h2 className="mb-8 font-display text-4xl uppercase text-white md:text-5xl">{t('services.delivery.title')}</h2>
          <div className="relative border-l border-white/15 pl-8 md:pl-16">
            {delivery.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="relative mb-12"
              >
                <span className="absolute -left-[41px] top-2 h-3 w-3 rounded-full bg-neon-lime md:-left-[65px]" />
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/45">{step.phase}</p>
                <h3 className="text-2xl uppercase text-white">{step.title}</h3>
                <p className="mt-2 max-w-3xl text-white/60">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="liquid-glass-card mx-auto mt-20 w-full max-w-7xl rounded-sm p-10 md:p-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.26em] text-neon-lime">{t('services.cta.eyebrow')}</p>
              <h2 className="font-display text-4xl uppercase leading-[0.95] text-white md:text-6xl">{t('services.cta.title')}</h2>
            </div>
            <Link href="/contact" className="group inline-flex items-center gap-2 text-lg uppercase tracking-wide text-neon-lime transition-colors hover:text-white">
              {t('services.cta.button')}
              <ArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" size={20} />
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
