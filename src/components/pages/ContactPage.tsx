'use client';

import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  message: '',
};

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const channels = useMemo(
    () => [
      {
        icon: Mail,
        title: t('contact.channels.email.title'),
        detail: t('contact.channels.email.detail'),
      },
      {
        icon: Phone,
        title: t('contact.channels.phone.title'),
        detail: t('contact.channels.phone.detail'),
      },
      {
        icon: MessageSquare,
        title: t('contact.channels.reply.title'),
        detail: t('contact.channels.reply.detail'),
      },
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
      <div className="px-6 pb-24 pt-44 md:px-12">
        <section className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-neon-lime">{t('contact.hero.eyebrow')}</p>
            <h1 className="font-display text-5xl uppercase leading-[0.9] text-white md:text-7xl lg:text-8xl">{t('contact.hero.title')}</h1>
          </div>
          <p className="self-end text-lg leading-relaxed text-white/65">{t('contact.hero.description')}</p>
        </section>

        <section className="mx-auto mt-16 grid w-full max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="liquid-glass-card space-y-4 rounded-sm p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50">
                  {t('contact.form.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-sm border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-neon-lime"
                />
                {errors.name ? <p className="mt-1 text-xs text-[#ff7a7a]">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50">
                  {t('contact.form.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full rounded-sm border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-neon-lime"
                />
                {errors.email ? <p className="mt-1 text-xs text-[#ff7a7a]">{errors.email}</p> : null}
              </div>
            </div>

            <div>
              <label htmlFor="company" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50">
                {t('contact.form.company')}
              </label>
              <input
                id="company"
                type="text"
                value={form.company}
                onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                className="w-full rounded-sm border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-neon-lime"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                rows={6}
                className="w-full rounded-sm border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-neon-lime"
              />
              {errors.message ? <p className="mt-1 text-xs text-[#ff7a7a]">{errors.message}</p> : null}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 rounded-full border border-neon-lime px-6 py-3 text-xs uppercase tracking-[0.24em] text-neon-lime transition-colors hover:bg-neon-lime hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={14} />
              {status === 'submitting' ? t('contact.form.sending') : t('contact.form.submit')}
            </button>

            {status === 'success' ? (
              <p className="rounded-sm border border-neon-lime/40 bg-neon-lime/[0.08] px-4 py-3 text-sm text-neon-lime">
                {t('contact.form.success')}
              </p>
            ) : (
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">{t('contact.form.mockNotice')}</p>
            )}
          </form>

          <div className="space-y-4">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.article
                  key={channel.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                  className="liquid-glass-card rounded-sm p-6"
                >
                  <Icon size={20} className="text-neon-lime" />
                  <h2 className="mt-4 text-2xl uppercase text-white">{channel.title}</h2>
                  <p className="mt-2 text-white/60">{channel.detail}</p>
                </motion.article>
              );
            })}

            <article className="liquid-glass-card rounded-sm p-6">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-neon-lime">{t('contact.trust.eyebrow')}</p>
              <p className="text-white/75">{t('contact.trust.description')}</p>
            </article>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
