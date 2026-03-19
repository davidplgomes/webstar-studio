import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react';

import { CITIES } from '../constants';

const VelocityMarquee: React.FC = () => {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((t, delta) => {
    let moveBy = 2 * (delta / 16); // Base speed

    // Add scroll velocity influence
    const vel = velocityFactor.get();
    if (vel !== 0) {
      moveBy += moveBy * Math.abs(vel);
    }

    baseX.current -= moveBy;

    // Hard wrap logic at -50% (assuming 2 copies of content)
    if (baseX.current <= -50) {
      baseX.current = 0;
    }

    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${baseX.current}%)`;
    }
  });

  return (
    <div className="py-8 border-b border-white/5 whitespace-nowrap overflow-hidden flex w-full">
      <div ref={containerRef} className="flex gap-12 w-fit">
        {/* Duplicate content enough times to ensure seamless loop */}
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            {CITIES.map((city) => (
              <span key={city} className="text-6xl md:text-8xl font-display font-bold text-transparent stroke-text opacity-20">
                {city}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] text-soft-white overflow-hidden border-t border-white/5">
      <VelocityMarquee />

      <div className="grid grid-cols-1 gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr_0.8fr_0.8fr] md:px-12">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neon-lime">{t('footer.companyLabel')}</p>
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-white md:text-5xl">{t('footer.statement')}</h2>
          <p className="mt-5 max-w-xl text-white/55">{t('footer.newsletter')}</p>
        </div>

        <div>
          <h4 className="mb-6 text-xs uppercase tracking-widest text-neon-lime">{t('footer.address_label')}</h4>
          <div className="space-y-6 text-sm leading-relaxed text-white/48">
            <div>
              <p className="text-white/75">{t('footer.offices.brazil.label')}</p>
              <p>{t('footer.offices.brazil.value')}</p>
            </div>
            <div>
              <p className="text-white/75">{t('footer.offices.ireland.label')}</p>
              <p>{t('footer.offices.ireland.value')}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-6 text-xs uppercase tracking-widest text-neon-lime">{t('footer.contact_label')}</h4>
          <div className="space-y-3 text-sm text-white/48">
            <p>{t('footer.email')}</p>
            <p>{t('footer.legalName')}</p>
            <p>{t('footer.cnpj')}</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-neon-lime mb-6">{t('footer.socialLabel')}</h4>
          <div className="mb-8 flex gap-4 text-white/40">
            <Link href="https://instagram.com/weare.webstar" target="_blank" rel="noreferrer" className="transition-colors hover:text-neon-lime">
              <Instagram size={18} />
            </Link>
            <Link href="https://linkedin.com/company/webstarstudio" target="_blank" rel="noreferrer" className="transition-colors hover:text-neon-lime">
              <Linkedin size={18} />
            </Link>
          </div>

          <h4 className="text-xs uppercase tracking-widest text-neon-lime mb-6">{t('footer.legalLabel')}</h4>
          <ul className="space-y-4 font-light text-white/40">
            <li className="hover:text-neon-lime transition-colors cursor-pointer">
              <Link href="/services">{t('nav.services')}</Link>
            </li>
            <li className="hover:text-neon-lime transition-colors cursor-pointer">
              <Link href="/portfolio">{t('nav.portfolio')}</Link>
            </li>
            <li className="hover:text-neon-lime transition-colors cursor-pointer">
              <Link href="/contact">{t('nav.contact')}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-6 md:px-12 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/10 tracking-widest uppercase">
        <p>{t('footer.copyright', { year })}</p>
        <p>{t('footer.established')}</p>
      </div>
    </footer>
  );
};

export default Footer;
