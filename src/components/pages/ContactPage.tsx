'use client';

import { FormEvent, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Mail, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import { PageHero, PageSection, PageShell, SectionIntro, pageMotion, EASE, VIEWPORT } from '@/components/pages/PagePrimitives';

type FormState = { name: string; email: string; company: string; message: string };
type OfficeItem = { title: string; detail: string };

const initialState: FormState = { name: '', email: '', company: '', message: '' };

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const trustItems = t('contact.trust.items', { returnObjects: true }) as Array<{ label: string; value: string }>;
  const offices = t('contact.offices.items', { returnObjects: true }) as OfficeItem[];

  const channels = useMemo(
    () => [
      { icon: Mail, title: t('contact.channels.email.title'), detail: t('contact.channels.email.detail') },
      { icon: Building2, title: t('contact.channels.scope.title'), detail: t('contact.channels.scope.detail') },
      { icon: MapPin, title: t('contact.channels.reply.title'), detail: t('contact.channels.reply.detail') },
    ],
    [t]
  );

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = t('contact.form.errors.name');
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) next.email = t('contact.form.errors.email');
    if (!form.message.trim() || form.message.trim().length < 15) next.message = t('contact.form.errors.message');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus('success');
    setForm(initialState);
    setErrors({});
  };

  return (
    <SiteShell withBackground withCursor>
      <PageShell>
        <PageHero
          eyebrow={t('contact.hero.eyebrow')}
          title={t('contact.hero.title')}
          description={t('contact.hero.description')}
          aside={<p className="max-w-xl text-sm uppercase tracking-[0.22em] text-white/38">{t('contact.hero.aside')}</p>}
        />

        {/* ─── Trust strip — inline horizontal bar ─── */}
        <PageSection className="mt-16">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-y-4 border-y border-white/10 py-5"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={pageMotion.staggerFast}
          >
            {trustItems.map((item, i) => (
              <motion.div key={item.label} variants={pageMotion.fadeUp} className="flex items-center">
                {i > 0 && <span className="mx-6 hidden h-6 w-px bg-white/15 md:block" />}
                <div className="flex items-center gap-3 px-2">
                  <span className="font-display text-lg text-neon-lime">{item.value}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </PageSection>

        {/* ─── Form + Channels ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('contact.formBlock.eyebrow')}
            title={t('contact.formBlock.title')}
            description={t('contact.formBlock.description')}
          />

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Form panel */}
            <div className="page-panel">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex min-h-[300px] flex-col items-center justify-center text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-neon-lime">
                      <Send size={24} className="text-neon-lime" />
                    </div>
                    <p className="text-xl uppercase text-white">{t('contact.form.success')}</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-neon-lime"
                    >
                      {t('contact.form.submit')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50">{t('contact.form.name')}</label>
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full rounded-sm border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-all focus:border-neon-lime focus:ring-1 focus:ring-neon-lime/30"
                        />
                        {errors.name ? <p className="mt-1 text-xs text-[#ff7a7a]">{errors.name}</p> : null}
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50">{t('contact.form.email')}</label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="w-full rounded-sm border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-all focus:border-neon-lime focus:ring-1 focus:ring-neon-lime/30"
                        />
                        {errors.email ? <p className="mt-1 text-xs text-[#ff7a7a]">{errors.email}</p> : null}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50">{t('contact.form.company')}</label>
                      <input
                        id="company"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                        className="w-full rounded-sm border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-all focus:border-neon-lime focus:ring-1 focus:ring-neon-lime/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50">{t('contact.form.message')}</label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                        rows={6}
                        className="w-full rounded-sm border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-all focus:border-neon-lime focus:ring-1 focus:ring-neon-lime/30"
                      />
                      <div className="mt-1 flex justify-between">
                        {errors.message ? <p className="text-xs text-[#ff7a7a]">{errors.message}</p> : <span />}
                        <span className="text-xs text-white/25">{form.message.length}</span>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === 'submitting'}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex items-center gap-2 rounded-full border border-neon-lime px-6 py-3 text-xs uppercase tracking-[0.24em] text-neon-lime transition-colors hover:bg-neon-lime hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Send size={14} />
                      {status === 'submitting' ? t('contact.form.sending') : t('contact.form.submit')}
                    </motion.button>

                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">{t('contact.form.mockNotice')}</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Channel tilt cards */}
            <div className="grid gap-4">
              {channels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <motion.article
                    key={channel.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={pageMotion.fadeUp}
                    whileHover={{ scale: 1.02, rotateX: -2, rotateY: 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
                    className="page-panel relative overflow-hidden"
                  >
                    {/* Watermark icon */}
                    <Icon size={80} className="pointer-events-none absolute right-4 top-4 text-white/[0.03]" />

                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-lime/10">
                        <Icon size={20} className="text-neon-lime" />
                      </div>
                      <h2 className="mt-4 text-2xl uppercase text-white">{channel.title}</h2>
                      <p className="mt-2 text-white/60">{channel.detail}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </PageSection>

        {/* ─── Offices — glass-technical cards ─── */}
        <PageSection>
          <SectionIntro
            eyebrow={t('contact.offices.eyebrow')}
            title={t('contact.offices.title')}
            description={t('contact.offices.description')}
          />

          <motion.div
            className="grid gap-4 lg:grid-cols-[1fr_1fr_0.9fr]"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={pageMotion.staggerContainer}
          >
            {offices.map((item) => (
              <motion.article
                key={item.title}
                variants={pageMotion.scaleIn}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-technical rounded-sm p-6"
              >
                <p className="text-xl uppercase text-white">{item.title}</p>
                <p className="mt-3 text-white/58">{item.detail}</p>
              </motion.article>
            ))}
            <motion.article
              variants={pageMotion.scaleIn}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-technical rounded-sm p-6"
            >
              <p className="page-kicker">{t('contact.legal.eyebrow')}</p>
              <p className="mt-4 text-white/75">{t('contact.legal.legalName')}</p>
              <p className="mt-2 text-white/58">{t('contact.legal.cnpj')}</p>
              <p className="mt-6 text-white/58">{t('contact.legal.note')}</p>
            </motion.article>
          </motion.div>
        </PageSection>
      </PageShell>
    </SiteShell>
  );
}
