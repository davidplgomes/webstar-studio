'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import Footer from '../../../components/Footer';

type MetricItem = { label: string; value: string };
type ValueItem = { title: string; description: string };
type PresenceItem = { city: string; detail: string };
type TestimonialItem = { quote: string; author: string };

type FounderBlock = {
  eyebrow: string;
  title: string;
  description: string;
  role: string;
  name: string;
  bio: string;
  credentialsLabel: string;
  credentials: string[];
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

export default function AboutPage() {
  const { t } = useTranslation();
  const heroTitle = t('about.hero.title');

  const metrics = t('about.metrics.items', { returnObjects: true }) as MetricItem[];
  const values = t('about.values.items', { returnObjects: true }) as ValueItem[];
  const founder = t('about.founder', { returnObjects: true }) as FounderBlock;
  const presence = t('about.presence.items', { returnObjects: true }) as PresenceItem[];
  const testimonials = t('about.testimonials.items', { returnObjects: true }) as TestimonialItem[];
  const heroLines = splitHeadline(heroTitle, 3);

  return (
    <SiteShell withBackground>
      <div className="min-h-screen bg-transparent text-white selection:bg-neon-lime selection:text-black">
        <section id="globe-trigger" className="relative h-screen overflow-hidden bg-transparent text-white">
          <div className="relative z-10 flex h-full flex-col px-6 md:px-12 lg:px-16">
            <div className="flex h-full flex-col justify-center pt-24">
              <div className="max-w-[1280px]">
                {heroLines.map((line, index) => (
                  <h1
                    key={`${line}-${index}`}
                    className={`font-display text-[15vw] uppercase leading-[0.82] tracking-[-0.07em] md:text-[9.5vw] lg:text-[6.8vw] ${
                      index === 1 ? 'font-light text-white/32' : index === heroLines.length - 1 ? 'font-bold text-white' : 'text-white'
                    }`}
                  >
                    {line}
                  </h1>
                ))}
                <p className="mt-8 max-w-3xl font-editorial text-[clamp(1.18rem,1.9vw,1.75rem)] italic leading-[1.34] text-white/80">
                  {t('about.hero.description')}
                </p>
              </div>
            </div>

            <div className="grid gap-8 border-t border-white/10 pb-6 pt-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:pb-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('about.mission.title')}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/62">{t('about.mission.description')}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('about.vision.title')}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/62">{t('about.vision.description')}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('about.promise.title')}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/62">{t('about.promise.description')}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {metrics.slice(0, 4).map((item, index) => (
                  <div key={`${item.label}-${index}`}>
                    <p className="font-display text-3xl uppercase leading-none tracking-[-0.05em] text-white md:text-4xl">{item.value}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/42">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-black/86 px-6 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('about.positioning.eyebrow')}</p>
              <h2 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[0.82] tracking-[-0.04em] md:text-6xl">
                {t('about.positioning.title')}
              </h2>
              <p className="mt-7 max-w-3xl font-editorial text-[clamp(1.1rem,2vw,1.6rem)] italic leading-[1.38] text-white/76">
                {t('about.positioning.description')}
              </p>
            </div>

            <div className="space-y-7">
              <div className="border-l border-neon-lime/70 pl-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('about.positioning.pitchLabel')}</p>
                <p className="mt-3 text-base leading-relaxed text-white/64">{t('about.positioning.pitch')}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 md:gap-4">
                <div className="border-t border-white/15 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-neon-lime">{t('about.mission.title')}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{t('about.mission.description')}</p>
                </div>
                <div className="border-t border-white/15 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-neon-lime">{t('about.vision.title')}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{t('about.vision.description')}</p>
                </div>
                <div className="border-t border-white/15 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-neon-lime">{t('about.promise.title')}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{t('about.promise.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black/86 px-6 py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('about.values.eyebrow')}</p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.82] tracking-[-0.04em] md:text-6xl">
                {t('about.values.title')}
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-white/58">{t('about.values.description')}</p>
            </div>

            <div className="space-y-10">
              {values.map((value, index) => (
                <motion.article
                  key={`${value.title}-${index}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/10 pb-8"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <span className="min-w-10 text-[10px] uppercase tracking-[0.22em] text-neon-lime">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl uppercase leading-[0.86] tracking-[-0.03em] md:text-5xl">
                        {value.title}
                      </h3>
                      <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/66 md:text-lg">{value.description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/90">
          <div className="mx-auto grid min-h-[84svh] w-full max-w-7xl lg:grid-cols-[1fr_1fr]">
            <div className="relative min-h-[48svh] overflow-hidden lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1800&auto=format&fit=crop"
                alt={founder.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-black/12 to-black/24" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{founder.role}</p>
                <p className="mt-2 font-display text-4xl uppercase leading-none tracking-[-0.04em] md:text-6xl">{founder.name}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-12 md:px-10 lg:px-14">
              <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{founder.eyebrow}</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.82] tracking-[-0.04em] md:text-6xl">
                {founder.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/58">{founder.description}</p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">{founder.bio}</p>

              <div className="mt-10 border-t border-white/10 pt-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">{founder.credentialsLabel}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {founder.credentials.map((credential, index) => (
                    <span key={`${credential}-${index}`} className="text-[10px] uppercase tracking-[0.18em] text-white/78">
                      {credential}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black/90 px-6 py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('about.presence.eyebrow')}</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.82] tracking-[-0.04em] md:text-6xl">
                {t('about.presence.title')}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/58">{t('about.presence.description')}</p>
            </div>

            <div className="space-y-6">
              {presence.map((item, index) => (
                <article key={`${item.city}-${index}`} className="border-b border-white/10 pb-5">
                  <h3 className="font-display text-3xl uppercase leading-[0.86] tracking-[-0.03em] md:text-4xl">{item.city}</h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-white/64">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/90 px-6 py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('about.testimonials.eyebrow')}</p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[0.82] tracking-[-0.04em] md:text-6xl">
              {t('about.testimonials.title')}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/58">{t('about.testimonials.description')}</p>

            <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-2">
              {testimonials.map((item, index) => (
                <blockquote key={`${item.author}-${index}`} className="min-w-[88%] snap-center md:min-w-[46%] lg:min-w-[32%]">
                  <p className="font-editorial text-[clamp(1.55rem,2.6vw,2.35rem)] italic leading-[1.28] text-white/82">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="mt-7 text-[10px] uppercase tracking-[0.24em] text-neon-lime">{item.author}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black/92 px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((item, index) => (
              <div key={`${item.label}-${index}`}>
                <p className="font-display text-5xl uppercase leading-none tracking-[-0.04em] md:text-6xl">{item.value}</p>
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
