'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { PRIMARY_NAV_ITEMS } from '@/data/navigation';
import FluidBackground from '@/components/FluidBackground';

const footerNavItems = PRIMARY_NAV_ITEMS.filter((item) => item.id !== 'home');

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const socialItems = [
    { label: 'Instagram', href: 'https://instagram.com/weare.webstar' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/webstarstudio' },
    { label: 'Email', href: `mailto:${t('footer.email')}` },
  ];

  return (
    <footer className="relative overflow-hidden bg-black px-0 pb-0 pt-10 text-white md:pt-16 font-sans">
      <div className="absolute inset-0 z-0 bg-black pointer-events-none">
        <FluidBackground />
      </div>
      
      {/* Extra dimming layer to ensure readability if FluidBackground is bright */}
      <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />

      <div className="relative z-10 mx-auto overflow-hidden h-screen max-h-[800px] flex flex-col justify-between">
        <div className="flex-1 w-full px-8 md:px-16 pt-8 md:pt-12">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(200px,auto)_minmax(200px,auto)]">
            <div className="flex flex-col items-start leading-[0.85] font-display uppercase">
              <h2 className="text-[10vw] md:text-[8vw] lg:text-[5.5vw] whitespace-nowrap text-white">
                AVAILABLE FOR
              </h2>
              <h2 className="text-[10vw] md:text-[8vw] lg:text-[5.5vw] whitespace-nowrap text-white font-light">
                SELECT
              </h2>
              <h2 className="text-[10vw] md:text-[8vw] lg:text-[5.5vw] whitespace-nowrap text-white font-bold">
                PROJECTS
              </h2>
              <div className="mt-10 md:mt-12 flex flex-wrap gap-x-8 gap-y-2 text-xs font-medium uppercase tracking-widest text-[#f4f1e8]/80 font-sans">
                <span>&copy; {year} WEBSTAR.STUDIO</span>
                <span>RECIFE, BRAZIL</span>
              </div>
            </div>

            <div className="hidden lg:block">
              <p className="mb-6 text-[0.65rem] uppercase tracking-[0.2em] text-[#f4f1e8]/50">Menu</p>
              <div className="space-y-3">
                {footerNavItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="block text-lg tracking-tight text-[#f4f1e8] transition-colors duration-300 hover:text-neon-lime"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <p className="mb-6 text-[0.65rem] uppercase tracking-[0.2em] text-[#f4f1e8]/50">Social</p>
              <div className="space-y-3">
                {socialItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="block text-lg tracking-tight text-[#f4f1e8] transition-colors duration-300 hover:text-neon-lime"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/* Massive Bottom Logo Graphic */}
        <div className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none flex justify-center items-end">
          <img src="/webstar-logo.svg" alt="Webstar" className="relative w-[115%] max-w-none h-auto [transform:translate3d(0,44%,0)_scaleY(0.45)] md:[transform:translate3d(0,48%,0)_scaleY(0.55)] opacity-90 mix-blend-screen" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

