'use client';

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

import FluidBackground from '@/components/FluidBackground';
import SiteShell from '@/components/layout/SiteShell';
import Footer from '../../../components/Footer';

type ServiceBlock = {
  title: string;
  descriptionPrimary: string;
  descriptionSecondary: string;
  subservices: string[];
};

type FAQRawItem = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

type OfferingItem = {
  title: string;
  description: string;
};

type PillarItem = {
  title: string;
  description: string;
};

const SERVICE_VISUALS = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2400&auto=format&fit=crop',
];

function splitHeadline(text: string, lineCount = 3) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const chunkSize = Math.max(1, Math.ceil(words.length / lineCount));
  const lines: string[] = [];

  for (let index = 0; index < words.length; index += chunkSize) {
    lines.push(words.slice(index, index + chunkSize).join(' '));
  }

  return lines;
}

export default function ServicesPage() {
  const { t, i18n } = useTranslation();

  const heroTitle = t('services.hero.title');
  const heroLines = useMemo(() => splitHeadline(heroTitle, 3), [heroTitle]);

  const offerings = t('services.offerings.items', { returnObjects: true }) as OfferingItem[];
  const servicesData = t('services.breakdown.sections', { returnObjects: true }) as ServiceBlock[];
  const pillars = t('services.pillars.items', { returnObjects: true }) as PillarItem[];
  const faqRaw = t('services.faq.items', { returnObjects: true }) as FAQRawItem[];

  const faqs = useMemo(
    () =>
      (faqRaw || [])
        .map((item) => ({
          question: item.question ?? item.q ?? '',
          answer: item.answer ?? item.a ?? '',
        }))
        .filter((item) => item.question && item.answer),
    [faqRaw]
  );

  const [activeChapter, setActiveChapter] = useState(0);
  const [activePillar, setActivePillar] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const faqButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!servicesData.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex = -1;
        let bestRatio = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.index ?? '-1');
          if (idx < 0) continue;

          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIndex = idx;
          }
        }

        if (bestIndex >= 0) {
          setActiveChapter((prev) => (prev === bestIndex ? prev : bestIndex));
        }
      },
      {
        threshold: [0.25, 0.45, 0.65, 0.85],
        rootMargin: '-15% 0px -30% 0px',
      }
    );

    chapterRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [servicesData.length]);

  const scrollToChapter = (index: number) => {
    const target = chapterRefs.current[index];
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFaqKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!faqs.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      faqButtonRefs.current[(index + 1) % faqs.length]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      faqButtonRefs.current[(index - 1 + faqs.length) % faqs.length]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      faqButtonRefs.current[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      faqButtonRefs.current[faqs.length - 1]?.focus();
    }
  };

  const activeService = servicesData[activeChapter];
  const manifestoText = `${t('services.hero.description')} ${t('services.offerings.description')} ${t('services.pillars.description')}`;
  const locale = i18n.language.startsWith('pt') ? 'pt' : i18n.language.startsWith('es') ? 'es' : 'en';

  const socialProofCopy = {
    en: 'Loved by clients and teams alike! ★★★★★ Premium digital systems shaped with clarity, execution, and design rigor.',
    pt: 'Amado por clientes e equipes! ★★★★★ Sistemas digitais premium construidos com clareza, execucao e rigor de design.',
    es: 'Valorado por clientes y equipos! ★★★★★ Sistemas digitales premium creados con claridad, ejecucion y rigor de diseno.',
  }[locale];

  const solutionsList = offerings.slice(0, 6).map((item) => item.title);
  const servicesList = servicesData.map((item) => item.title);

  const techList = {
    en: ['React / Next.js', 'TypeScript', 'Node.js', 'Python', 'Automation & AI', 'Cloud & DevOps', 'Mobile Delivery'],
    pt: ['React / Next.js', 'TypeScript', 'Node.js', 'Python', 'Automacao e IA', 'Cloud e DevOps', 'Entrega Mobile'],
    es: ['React / Next.js', 'TypeScript', 'Node.js', 'Python', 'Automatizacion e IA', 'Cloud y DevOps', 'Entrega Mobile'],
  }[locale];

  return (
    <SiteShell withBackground>
      <div className="min-h-screen bg-transparent text-white selection:bg-neon-lime selection:text-black">
        <section id="globe-trigger" className="relative h-screen overflow-hidden bg-transparent text-white">
          <div className="relative z-10 flex h-full flex-col px-6 md:px-12 lg:px-16">
            <div className="flex h-full flex-col justify-center pt-24">
              <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">
                <div className="w-full">
                  <div className="flex flex-col items-start leading-[0.82] font-display uppercase">
                    {heroLines.map((line, index) => (
                      <h1
                        key={`${line}-${index}`}
                        className={`text-[14vw] lg:text-[7.3vw] whitespace-nowrap tracking-[-0.07em] ${
                          index === 1 ? 'text-white/22 font-light' : index === heroLines.length - 1 ? 'text-white font-bold' : 'text-white'
                        }`}
                      >
                        {line}
                      </h1>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pb-6 pt-5 md:pb-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-white/30 text-[9px] tracking-[0.3em] font-medium uppercase">
                    {t('services.hero.scrollLabel')}
                  </p>
                </div>

                <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:w-[56%]">
                  {servicesData.slice(0, 4).map((service, index) => (
                    <button
                      key={`${service.title}-${index}`}
                      type="button"
                      onClick={() => scrollToChapter(index)}
                      className="group text-left"
                    >
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/30 group-hover:text-neon-lime">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/68 group-hover:text-white">
                        {service.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black px-6 py-20 md:px-12 md:py-24 lg:px-16 lg:py-28">
          <div className="absolute inset-0 z-0 bg-black pointer-events-none">
            <FluidBackground />
          </div>
          <div className="absolute inset-0 z-[1] bg-black/38 pointer-events-none" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col items-center text-center">
            <div className="mb-10 flex h-24 w-24 items-center justify-center md:mb-12 md:h-28 md:w-28">
              <img
                src="/Wlogo.svg"
                alt="Webstar W"
                className="h-full w-full object-contain opacity-95"
              />
            </div>

            <p className="max-w-6xl font-editorial text-[clamp(2rem,4vw,4.2rem)] leading-[1.22] tracking-[-0.04em] text-[#f4f1e8]">
              {manifestoText}
            </p>
          </div>
        </section>

        <section className="bg-black/92 px-6 py-14 md:px-12 md:py-18 lg:px-16 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1650px] gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="overflow-hidden">
                  <img
                    src={SERVICE_VISUALS[activeChapter % SERVICE_VISUALS.length]}
                    alt={activeService?.title}
                    className="h-[92svh] w-full object-cover"
                  />
                </div>
              </div>
            </aside>

            <div className="border-t border-white/10">
              {servicesData.map((service, index) => (
                <section
                  key={`${service.title}-${index}`}
                  ref={(node) => {
                    chapterRefs.current[index] = node;
                  }}
                  data-index={index}
                  className="min-h-[92svh] border-b border-white/10 py-10 md:py-14"
                >
                  <div className="grid gap-8 lg:grid-cols-[120px_minmax(0,1fr)]">
                    <div className="space-y-5">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{String(index + 1).padStart(2, '0')}</p>
                      <button
                        type="button"
                        onClick={() => scrollToChapter(index)}
                        className="hidden text-left text-[10px] uppercase tracking-[0.24em] text-white/34 hover:text-white/68 lg:block"
                      >
                        {t('services.breakdown.navLabel')}
                      </button>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
                      <div>
                        <div className="mb-8 overflow-hidden lg:hidden">
                          <img
                            src={SERVICE_VISUALS[index % SERVICE_VISUALS.length]}
                            alt={service.title}
                            className="h-[42svh] w-full object-cover"
                          />
                        </div>

                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{t('services.breakdown.sectionLabel')}</p>
                        <h3 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.82] tracking-[-0.05em] md:text-6xl lg:text-[4.8rem]">
                          {service.title}
                        </h3>
                        <p className="mt-7 max-w-3xl font-editorial text-[clamp(1.08rem,1.8vw,1.55rem)] italic leading-[1.34] text-white/80">
                          {service.descriptionPrimary}
                        </p>
                      </div>

                      <div>
                        <p className="max-w-xl text-base leading-relaxed text-white/58">{service.descriptionSecondary}</p>

                        <div className="mt-10 border-t border-white/10 pt-5">
                          <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{t('services.breakdown.listLabel')}</p>
                          <ul className="mt-5 space-y-4">
                            {service.subservices.map((item, itemIndex) => (
                              <li
                                key={`${item}-${itemIndex}`}
                                className="grid gap-4 border-b border-white/10 pb-3 md:grid-cols-[50px_minmax(0,1fr)] md:items-start"
                              >
                                <span className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">
                                  {String(itemIndex + 1).padStart(2, '0')}
                                </span>
                                <span className="text-sm leading-relaxed text-white/74 md:text-base">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/95 px-6 py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('services.pillars.eyebrow')}</p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[0.82] tracking-[-0.05em] md:text-6xl">
              {t('services.pillars.title')}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/58">{t('services.pillars.description')}</p>

            <div className="mt-12 hidden min-h-[62svh] overflow-hidden border border-white/10 lg:flex">
              {pillars.map((item, index) => {
                const isActive = activePillar === index;

                return (
                  <button
                    key={`${item.title}-${index}`}
                    type="button"
                    onMouseEnter={() => setActivePillar(index)}
                    onFocus={() => setActivePillar(index)}
                    onClick={() => setActivePillar(index)}
                    className="relative flex min-h-full flex-col justify-end overflow-hidden border-r border-white/10 px-8 py-10 text-left transition-[flex,background-color] duration-500 last:border-r-0"
                    style={{ flex: isActive ? 1.5 : 0.85 }}
                    aria-pressed={isActive}
                  >
                    <p className={`text-[10px] uppercase tracking-[0.24em] ${isActive ? 'text-neon-lime' : 'text-white/34'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className={`mt-5 font-display text-[2.2rem] uppercase leading-[0.84] tracking-[-0.05em] transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/42'}`}>
                      {item.title}
                    </p>
                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-5 max-w-md overflow-hidden text-sm leading-relaxed text-white/60"
                        >
                          {item.description}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 space-y-6 lg:hidden">
              {pillars.map((item, index) => (
                <article key={`${item.title}-${index}`} className="border-b border-white/10 pb-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 font-display text-3xl uppercase leading-[0.88] tracking-[-0.05em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/96 px-6 py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <p className="text-center text-[10px] uppercase tracking-[0.28em] text-neon-lime">{t('services.faq.eyebrow')}</p>
            <h2 className="mt-4 text-center font-display text-4xl uppercase leading-[0.84] tracking-[-0.05em] md:text-6xl">
              {t('services.faq.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-white/58">
              {t('services.faq.description')}
            </p>

            <dl className="mt-12 border-t border-white/15">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                const buttonId = `faq-trigger-${index}`;
                const panelId = `faq-panel-${index}`;

                return (
                  <div key={`${faq.question}-${index}`} className="border-b border-white/15">
                    <dt>
                      <button
                        ref={(node) => {
                          faqButtonRefs.current[index] = node;
                        }}
                        type="button"
                        id={buttonId}
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq((prev) => (prev === index ? null : index))}
                        onKeyDown={(event) => handleFaqKeyDown(event, index)}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span className="text-lg leading-snug text-white md:text-xl">{faq.question}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-neon-lime transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </dt>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.dd
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pr-2 text-base leading-relaxed text-white/66 md:text-lg">{faq.answer}</p>
                        </motion.dd>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>

        <section className="bg-transparent px-6 py-10 text-[#f4f1e8] md:px-12 md:py-12 lg:px-16">
          <div className="mx-auto w-full max-w-[1800px] border-b border-white/10">
            <div className="grid lg:grid-cols-[1fr_1.02fr]">
              <div className="border-b border-white/10 py-12 lg:border-b-0 lg:border-r lg:py-28 lg:pr-16">
                <div className="max-w-[56rem] space-y-10 text-[clamp(1.85rem,2.9vw,3.55rem)] leading-[1.06] tracking-[-0.05em]">
                  <p>{t('services.hero.description')}</p>
                  <p>{t('services.pillars.description')}</p>
                </div>
              </div>

              <div>
                <div className="border-b border-white/10 px-0 py-8 lg:px-4 lg:py-7">
                  <div className="max-w-4xl">
                    <p className="text-[clamp(1.15rem,1.35vw,1.6rem)] leading-[1.35] tracking-[-0.02em] text-[#f4f1e8]/92">
                      {socialProofCopy}
                    </p>
                    <div className="mt-8">
                      <a
                        href="/contact"
                        className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium tracking-[-0.01em] text-[#f4f1e8] transition-colors duration-300 hover:border-neon-lime hover:text-neon-lime"
                      >
                        {t('services.cta.button')}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid gap-12 px-0 py-10 md:grid-cols-3 lg:px-4 lg:py-10">
                  <div>
                    <h3 className="text-[clamp(2rem,1.9vw,2.45rem)] leading-none tracking-[-0.05em]">Solutions</h3>
                    <div className="mt-9 space-y-3 text-[clamp(1.1rem,1.12vw,1.45rem)] leading-[1.28] text-[#f4f1e8]/92">
                      {solutionsList.map((item, index) => (
                        <p key={`${item}-${index}`}>{item}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[clamp(2rem,1.9vw,2.45rem)] leading-none tracking-[-0.05em]">Services</h3>
                    <div className="mt-9 space-y-3 text-[clamp(1.1rem,1.12vw,1.45rem)] leading-[1.28] text-[#f4f1e8]/92">
                      {servicesData.map((item, index) => (
                        <p key={`${item.title}-${index}`}>{item.title}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[clamp(2rem,1.9vw,2.45rem)] leading-none tracking-[-0.05em]">Tech</h3>
                    <div className="mt-9 space-y-3 text-[clamp(1.1rem,1.12vw,1.45rem)] leading-[1.28] text-[#f4f1e8]/92">
                      {techList.map((item, index) => (
                        <p key={`${item}-${index}`}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />

      </div>
    </SiteShell>
  );
}
