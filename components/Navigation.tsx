'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Instagram, Linkedin } from 'lucide-react';

import { HOME_STORY_ANCHORS, PRIMARY_NAV_ITEMS } from '@/data/navigation';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const menuVariants = {
    closed: {
      x: '100%',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
    open: {
      x: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  const linkVariants = {
    closed: { x: 80, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.2 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const currentLanguage = i18n.language || 'en';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 flex flex-col overflow-hidden border border-white/[0.08] bg-black/80 text-white backdrop-blur-[48px] saturate-[180%] md:flex-row"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150vh] w-[150vw] -translate-x-1/2 -translate-y-1/2 rotate-[32deg] bg-gradient-to-br from-[#cfff28]/15 via-[#345c59]/15 to-transparent blur-[120px] md:w-[50vw]" />

          <button
            onClick={onClose}
            className="absolute right-8 top-8 z-50 p-2 transition-all duration-500 hover:rotate-90 hover:text-neon-lime"
            aria-label={t('navigation.close')}
          >
            <X size={28} strokeWidth={1} />
          </button>

          <div className="hidden h-full w-1/3 flex-col justify-between border-r border-white/[0.08] p-16 md:flex">
            <div>
              <h2 className="mb-8 font-display text-xs uppercase tracking-[0.3em] text-neon-lime">{t('navigation.contactLabel')}</h2>
              <p className="text-sm font-light leading-relaxed text-white/40">
                {t('navigation.contactBlock.line1')}
                <br />
                {t('navigation.contactBlock.line2')}
                <br />
                {t('navigation.contactBlock.line3')}
                <br />
                <Link href="mailto:hello@webstar.studio" className="text-white/60 transition-colors hover:text-neon-lime">
                  hello@webstar.studio
                </Link>
              </p>
            </div>

            <div className="flex gap-6">
              <Link href="https://instagram.com/weare.webstar" target="_blank" rel="noreferrer" className="text-white/40 transition-colors duration-300 hover:text-neon-lime">
                <Instagram size={20} />
              </Link>
              <Link href="https://linkedin.com/company/webstarstudio" target="_blank" rel="noreferrer" className="text-white/40 transition-colors duration-300 hover:text-neon-lime">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div className="flex h-full flex-1 flex-col justify-center px-8 md:px-24">
            <nav className="flex flex-col gap-3 md:gap-5">
              {PRIMARY_NAV_ITEMS.map((item, index) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                return (
                  <motion.div key={item.id} custom={index} variants={linkVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`font-display text-4xl uppercase tracking-wide transition-colors duration-300 hover:translate-x-3 hover:text-neon-lime md:text-7xl ${
                        isActive ? 'text-neon-lime' : 'text-white/60'
                      }`}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div variants={linkVariants} custom={PRIMARY_NAV_ITEMS.length + 1} className="mt-14">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/35">{t('nav.story.label')}</p>
              <div className="flex flex-wrap gap-4 text-xs tracking-[0.2em] text-white/55">
                {HOME_STORY_ANCHORS.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    className="border-b border-transparent pb-1 transition-colors hover:border-neon-lime hover:text-neon-lime"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div variants={linkVariants} custom={PRIMARY_NAV_ITEMS.length + 2} className="mt-12 flex gap-6 text-xs tracking-[0.3em]">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`${currentLanguage.startsWith('en') ? 'border-b border-neon-lime text-neon-lime' : 'text-white/30 hover:text-white/60'} pb-1 transition-colors`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('pt')}
                className={`${currentLanguage.startsWith('pt') ? 'border-b border-neon-lime text-neon-lime' : 'text-white/30 hover:text-white/60'} pb-1 transition-colors`}
              >
                PT
              </button>
              <button
                onClick={() => i18n.changeLanguage('es')}
                className={`${currentLanguage.startsWith('es') ? 'border-b border-neon-lime text-neon-lime' : 'text-white/30 hover:text-white/60'} pb-1 transition-colors`}
              >
                ES
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
