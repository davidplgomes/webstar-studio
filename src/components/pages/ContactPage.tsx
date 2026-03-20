'use client';

import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

import SiteShell from '@/components/layout/SiteShell';
import Footer from '../../../components/Footer';

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type Step = 1 | 2;

type OfficeItem = { title: string; detail: string };
type TrustItem = { label: string; value: string };

type Channels = {
  email: { title: string; detail: string };
  scope: { title: string; detail: string };
  reply: { title: string; detail: string };
};

type LegalBlock = {
  eyebrow: string;
  legalName: string;
  cnpj: string;
  note: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  company: '',
  message: '',
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

export default function ContactPage() {
  const { t } = useTranslation();
  const heroTitle = t('contact.hero.title');

  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const trustItems = t('contact.trust.items', { returnObjects: true }) as TrustItem[];
  const offices = t('contact.offices.items', { returnObjects: true }) as OfficeItem[];
  const channels = t('contact.channels', { returnObjects: true }) as Channels;
  const legal = t('contact.legal', { returnObjects: true }) as LegalBlock;
  const heroLines = splitHeadline(heroTitle, 3);

  const validateStepOne = () => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) next.name = t('contact.form.errors.name');
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) next.email = t('contact.form.errors.email');

    return next;
  };

  const validateStepTwo = () => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.message.trim() || form.message.trim().length < 15) {
      next.message = t('contact.form.errors.message');
    }

    return next;
  };

  const goToStepTwo = () => {
    const nextErrors = validateStepOne();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep(2);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 1) {
      goToStepTwo();
      return;
    }

    const nextErrors = validateStepTwo();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus('submitting');
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus('success');
    setForm(initialForm);
    setErrors({});
    setStep(1);
  };

  return (
    <SiteShell withBackground>
      <div className="min-h-screen bg-transparent text-white selection:bg-neon-lime selection:text-black">
        <section id="globe-trigger" className="relative h-screen overflow-hidden bg-transparent text-white">
          <div className="relative z-10 flex h-full flex-col px-6 md:px-12 lg:px-16">
            <div className="flex h-full flex-col justify-center pt-24">
              <div className="max-w-[1220px]">
                {heroLines.map((line, index) => (
                  <h1
                    key={`${line}-${index}`}
                    className={`font-display text-[15vw] uppercase leading-[0.82] tracking-[-0.07em] md:text-[9.8vw] lg:text-[6.9vw] ${
                      index === 1 ? 'font-light text-white/32' : index === heroLines.length - 1 ? 'font-bold text-white' : 'text-white'
                    }`}
                  >
                    {line}
                  </h1>
                ))}
                <p className="mt-8 max-w-3xl font-editorial text-[clamp(1.18rem,1.9vw,1.75rem)] italic leading-[1.34] text-white/80">
                  {t('contact.hero.description')}
                </p>
              </div>
            </div>

            <div className="grid gap-8 border-t border-white/10 pb-6 pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:pb-8">
              <div className="grid gap-6 md:grid-cols-2">
                {trustItems.slice(0, 4).map((item, index) => (
                  <div key={`${item.label}-${index}`}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/42">{item.label}</p>
                    <p className="mt-2 font-display text-2xl uppercase leading-[0.9] tracking-[-0.04em] text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {[channels.email, channels.scope, channels.reply].map((channel, index) => (
                  <div key={`${channel.title}-${index}`}>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-2 font-display text-2xl uppercase leading-[0.9] tracking-[-0.04em] text-white">{channel.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/58">{channel.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black/86 px-6 py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[10px] uppercase tracking-[0.24em] text-neon-lime">{t('contact.formBlock.eyebrow')}</p>
              <h2 className="mt-4 max-w-md font-display text-4xl uppercase leading-[0.82] tracking-[-0.04em] md:text-6xl">
                {t('contact.formBlock.title')}
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-white/58">{t('contact.formBlock.description')}</p>

              <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={step === 1 ? 'text-neon-lime' : 'text-white/35'}
                  aria-current={step === 1 ? 'step' : undefined}
                >
                  01
                </button>
                <span className="text-white/35">/</span>
                <button
                  type="button"
                  onClick={() => {
                    const nextErrors = validateStepOne();
                    if (Object.keys(nextErrors).length === 0) {
                      setErrors({});
                      setStep(2);
                    } else {
                      setErrors(nextErrors);
                    }
                  }}
                  className={step === 2 ? 'text-neon-lime' : 'text-white/35'}
                  aria-current={step === 2 ? 'step' : undefined}
                >
                  02
                </button>
              </div>
            </div>

            <div>
              <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="pt-2"
                  >
                    <p className="max-w-3xl font-display text-3xl uppercase leading-[0.84] tracking-[-0.04em] text-neon-lime md:text-5xl">
                      {t('contact.form.success')}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-8 border-b border-white/45 pb-1 text-xs uppercase tracking-[0.18em] text-white/82"
                    >
                      {t('contact.form.submit')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key={`step-${step}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    {step === 1 ? (
                      <>
                        <label className="block">
                          <span className="text-[10px] uppercase tracking-[0.24em] text-white/45">{t('contact.form.name')}</span>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                            className="mt-3 w-full border-b border-white/28 bg-transparent pb-3 text-2xl leading-none outline-none transition-colors focus:border-neon-lime md:text-4xl"
                            autoComplete="name"
                          />
                        </label>

                        <label className="block">
                          <span className="text-[10px] uppercase tracking-[0.24em] text-white/45">{t('contact.form.email')}</span>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                            className="mt-3 w-full border-b border-white/28 bg-transparent pb-3 text-2xl leading-none outline-none transition-colors focus:border-neon-lime md:text-4xl"
                            autoComplete="email"
                          />
                        </label>

                        <label className="block">
                          <span className="text-[10px] uppercase tracking-[0.24em] text-white/45">{t('contact.form.company')}</span>
                          <input
                            type="text"
                            value={form.company}
                            onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                            className="mt-3 w-full border-b border-white/28 bg-transparent pb-3 text-2xl leading-none outline-none transition-colors focus:border-neon-lime md:text-4xl"
                            autoComplete="organization"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={goToStepTwo}
                          className="group inline-flex items-center gap-2 border-b border-neon-lime pb-1 text-xs uppercase tracking-[0.2em] text-neon-lime"
                        >
                          01 / 02
                          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1 text-sm leading-relaxed text-white/55">
                          <p>{form.name || '-'}</p>
                          <p>{form.email || '-'}</p>
                          <p>{form.company || '-'}</p>
                        </div>

                        <label className="block">
                          <span className="text-[10px] uppercase tracking-[0.24em] text-white/45">{t('contact.form.message')}</span>
                          <textarea
                            rows={5}
                            value={form.message}
                            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                            className="mt-4 w-full border-b border-white/28 bg-transparent pb-3 text-xl leading-[1.25] outline-none transition-colors focus:border-neon-lime md:text-3xl"
                          />
                        </label>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              setStep(1);
                              setErrors({});
                            }}
                            className="text-xs uppercase tracking-[0.18em] text-white/65"
                          >
                            01
                          </button>
                          <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="border-b border-neon-lime pb-1 text-xs uppercase tracking-[0.2em] text-neon-lime disabled:opacity-55"
                          >
                            {status === 'submitting' ? t('contact.form.sending') : t('contact.form.submit')}
                          </button>
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      {Object.values(errors).map((error, index) => (
                        <p key={`${error}-${index}`} className="text-[10px] uppercase tracking-[0.2em] text-[#ffadad]">
                          {error}
                        </p>
                      ))}
                    </div>

                    <p className="text-xs leading-relaxed text-white/42">{t('contact.form.mockNotice')}</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/90 px-6 py-14 md:px-12 md:py-16 lg:px-16">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_1fr_1fr]">
            {offices.map((office, index) => (
              <article key={`${office.title}-${index}`} className="border-b border-white/10 pb-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-neon-lime">{office.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/62">{office.detail}</p>
              </article>
            ))}

            {[channels.email, channels.scope, channels.reply].map((channel, index) => (
              <article key={`${channel.title}-${index}`} className="border-b border-white/10 pb-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-neon-lime">{channel.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/62">{channel.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-black/92 px-6 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl border-t border-white/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-neon-lime">{legal.eyebrow}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/66">{legal.legalName}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/66">{legal.cnpj}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58">{legal.note}</p>
          </div>
        </section>

        <Footer />
      </div>
    </SiteShell>
  );
}
