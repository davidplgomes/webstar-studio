'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { HOME_STORY_ANCHORS, PRIMARY_NAV_ITEMS } from '@/data/navigation';

interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMenuOpen }) => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 40);
  });

  const currentLanguage = i18n.language || 'en';

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-40 flex flex-col text-[10px] uppercase tracking-widest text-white/80 transition-all duration-500 ${
        isScrolled ? 'bg-black/65 backdrop-blur-2xl' : 'bg-black/20 backdrop-blur-xl'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex h-10 w-full items-center justify-center border-b border-white/5 bg-white/[0.03] px-4">
        <p className="flex items-center gap-2 text-[#88d388]">
          <span className="text-[12px]">✧</span>
          <span className="normal-case tracking-normal text-white/70">{t('header.banner.message')}</span>
          <span className="font-medium">{t('header.banner.cta')}</span>
        </p>
      </div>

      <div className="flex h-[72px] w-full items-center border-b border-white/5">
        <div className="flex h-full w-16 shrink-0 items-center justify-center border-r border-white/5 md:w-24">
          <button
            aria-label={t('header.menuToggle')}
            onClick={onMenuClick}
            className="group flex flex-col items-center justify-center gap-1.5 focus:outline-none lg:hidden"
          >
            {!isMenuOpen && (
              <>
                <span className="block h-0.5 w-6 bg-white transition-colors duration-300 group-hover:bg-neon-lime" />
                <span className="block h-0.5 w-6 bg-white transition-colors duration-300 group-hover:bg-neon-lime" />
              </>
            )}
          </button>
        </div>

        <div className="flex h-full shrink-0 items-center border-r border-white/5 px-8 md:px-12">
          <Link href="/" className="font-display text-lg font-bold tracking-[0.1em] text-white transition-colors duration-300 md:text-xl">
            WEBSTAR
          </Link>
        </div>

        <div className="hidden h-full shrink-0 items-center border-r border-white/5 px-8 text-white/70 transition-colors hover:text-white lg:flex">
          <Link href="/#projects" className="flex items-center gap-3">
            {t('nav.story.label')}
            <span className="mb-1 text-[14px] leading-none opacity-50 transition-opacity hover:opacity-100">⠿</span>
          </Link>
        </div>

        <nav className="hidden h-full flex-1 items-center gap-10 px-10 lg:flex xl:gap-12">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`transition-colors ${isActive ? 'text-neon-lime' : 'text-white/70 hover:text-white'}`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="h-full flex-1 border-r border-white/5 lg:hidden" />

        <div className="flex h-full w-16 items-center justify-center border-l border-white/5 md:w-24">
          <button
            onClick={() => i18n.changeLanguage(currentLanguage.startsWith('pt') ? 'es' : currentLanguage.startsWith('es') ? 'en' : 'pt')}
            className="transition-colors hover:text-white"
          >
            {currentLanguage.slice(0, 2).toUpperCase()}
          </button>
        </div>

        <div className="hidden h-full w-24 items-center justify-center border-x border-white/5 transition-colors hover:text-white md:flex md:w-32">
          <Link href="/contact">{t('nav.contact')}</Link>
        </div>

        <div className="hidden h-full w-16 shrink-0 lg:block md:w-24" />
      </div>

      {pathname === '/' ? (
        <div className="hidden w-full items-center justify-center gap-8 border-b border-white/5 bg-black/30 px-8 py-2 text-[9px] tracking-[0.28em] text-white/45 lg:flex">
          {HOME_STORY_ANCHORS.map((item) => (
            <Link key={item.id} href={item.href} className="transition-colors hover:text-neon-lime">
              {t(item.labelKey)}
            </Link>
          ))}
        </div>
      ) : null}
    </motion.header>
  );
};

export default Header;
