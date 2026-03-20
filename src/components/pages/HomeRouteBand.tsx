'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const pageLinks = [
  { id: 'services', href: '/services', key: 'nav.services' },
  { id: 'about', href: '/about', key: 'nav.about' },
  { id: 'portfolio', href: '/portfolio', key: 'nav.portfolio' },
  { id: 'contact', href: '/contact', key: 'nav.contact' },
];

export default function HomeRouteBand() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-white/10 bg-black/70 px-6 py-20 backdrop-blur-2xl md:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div className="flex items-center justify-between gap-8">
          <p className="text-xs uppercase tracking-[0.28em] text-neon-lime">{t('homeRoutes.eyebrow')}</p>
          <p className="max-w-xl text-right text-white/45">{t('homeRoutes.description')}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pageLinks.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={item.href}
                className="liquid-glass-card group flex min-h-28 flex-col justify-between rounded-sm p-5 transition-all duration-300 hover:border-white/30"
              >
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">0{index + 1}</span>
                <div className="flex items-center justify-between text-white/75 transition-colors group-hover:text-neon-lime">
                  <span className="text-lg uppercase tracking-wide">{t(item.key)}</span>
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
