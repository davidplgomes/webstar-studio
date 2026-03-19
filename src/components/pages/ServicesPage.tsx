'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import { PageCTA, PageHero, PageSection, PageShell, SectionIntro, pageMotion, EASE, VIEWPORT } from '@/components/pages/PagePrimitives';

interface ServiceItem { title: string; description: string }
interface PillarItem { title: string; description: string }
interface DeliveryItem { phase: string; title: string; description: string }
interface FaqItem { question: string; answer: string }

export default function ServicesPage() {
  const { t } = useTranslation();
  const [activeOffering, setActiveOffering] = useState(0);
  const [activeFaq, setActiveFaq] = useState(-1);

  const offerings = t('services.offerings.items', { returnObjects: true }) as ServiceItem[];
  const pillars = t('services.pillars.items', { returnObjects: true }) as PillarItem[];
  const delivery = t('services.delivery.items', { returnObjects: true }) as DeliveryItem[];
  const faq = t('services.faq.items', { returnObjects: true }) as FaqItem[];

  return (
    <SiteShell withBackground withCursor>
      <PageShell>
        <PageHero
          eyebrow={t('services.hero.eyebrow')}
          title={t('services.hero.title')}
          description={t('services.hero.description')}
          aside={<p className="max-w-xl text-sm uppercase tracking-[0.22em] text-white/38">{t('services.hero.aside')}</p>}
        />

        {/* ─── Offerings — interactive accordion ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('services.offerings.eyebrow')}
            title={t('services.offerings.title')}
            description={t('services.offerings.description')}
          />

          <div className="page-divider">
            {offerings.map((item, index) => {
              const isActive = index === activeOffering;
              return (
                <motion.div
                  key={item.title}
                  className="cursor-pointer border-b border-white/10 py-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={pageMotion.fadeUp}
                  onClick={() => setActiveOffering(isActive ? -1 : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className={`font-display text-2xl transition-colors duration-300 ${isActive ? 'text-neon-lime' : 'text-white/30'}`}>
                        0{index + 1}
                      </span>
                      <motion.h3
                        animate={{ x: isActive ? 8 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="text-2xl uppercase text-white"
                      >
                        {item.title}
                      </motion.h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <Plus size={20} className={`transition-colors duration-300 ${isActive ? 'text-neon-lime' : 'text-white/40'}`} />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-3xl pl-12 pt-4 text-white/60">{item.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </PageSection>

        {/* ─── Pillars — tall cards with watermark numbers ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('services.pillars.eyebrow')}
            title={t('services.pillars.title')}
            description={t('services.pillars.description')}
          />

          <motion.div
            className="grid gap-4 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={pageMotion.staggerContainer}
          >
            {pillars.map((item, index) => (
              <motion.article
                key={item.title}
                variants={pageMotion.scaleIn}
                whileHover={{ scale: 1.01, borderColor: 'rgba(207,255,40,0.3)' }}
                transition={{ duration: 0.3 }}
                className="page-panel relative min-h-[360px] overflow-hidden"
              >
                <span className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[8rem] leading-none text-white/5 transition-colors duration-500 group-hover:text-neon-lime/15">
                  0{index + 1}
                </span>
                <p className="page-kicker relative">0{index + 1}</p>
                <h3 className="relative mt-4 text-2xl uppercase text-white">{item.title}</h3>
                <p className="relative mt-3 text-white/60">{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </PageSection>

        {/* ─── Delivery — horizontal scroll timeline ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('services.delivery.eyebrow')}
            title={t('services.delivery.title')}
            description={t('services.delivery.description')}
          />

          <div className="flex gap-0 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            {delivery.map((step, index) => (
              <motion.div
                key={step.title}
                className="min-w-[280px] flex-shrink-0 snap-center px-3 md:min-w-[320px] lg:min-w-0 lg:flex-1"
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={pageMotion.fadeUp}
              >
                <p className="font-display text-6xl text-white/[0.06]">{String(index + 1).padStart(2, '0')}</p>
                <div className="page-panel mt-3">
                  <p className="page-kicker">{step.phase}</p>
                  <h3 className="mt-3 text-xl uppercase text-white">{step.title}</h3>
                  <p className="mt-3 text-white/60">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </PageSection>

        {/* ─── FAQ — expandable panels with accent bar ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('services.faq.eyebrow')}
            title={t('services.faq.title')}
            description={t('services.faq.description')}
          />

          <div className="flex flex-col gap-3">
            {faq.map((item, index) => {
              const isActive = index === activeFaq;
              return (
                <motion.article
                  key={item.question}
                  className={`cursor-pointer page-panel transition-all duration-300 ${isActive ? 'border-l-2 border-l-neon-lime' : ''}`}
                  onClick={() => setActiveFaq(isActive ? -1 : index)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={pageMotion.fadeUp}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xl uppercase text-white">{item.question}</p>
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="flex-shrink-0"
                    >
                      <Plus size={18} className={`transition-colors duration-300 ${isActive ? 'text-neon-lime' : 'text-white/40'}`} />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 max-w-4xl text-white/60">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </PageSection>

        {/* ─── CTA ─── */}
        <PageSection>
          <PageCTA
            eyebrow={t('services.cta.eyebrow')}
            title={t('services.cta.title')}
            buttonText={t('services.cta.button')}
            href="/contact"
          />
        </PageSection>
      </PageShell>
    </SiteShell>
  );
}
