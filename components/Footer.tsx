import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
            {["PARIS", "NEW YORK", "TOKYO", "LONDON", "BERLIN", "SEOUL", "AMSTERDAM"].map((city) => (
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

  return (
    <footer className="bg-[#000000] text-soft-white overflow-hidden border-t border-white/5">
      {/* City Marquee with Velocity */}
      <VelocityMarquee />

      <div className="px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold tracking-widest mb-8 font-display text-neon-lime">WEBSTAR STUDIO</h2>
          <p className="text-3xl font-editorial italic text-white/40 max-w-md leading-tight group">
            "Crafting digital experiences that <span className="group-hover:text-neon-lime transition-colors">transcend boundaries</span> and redefine perception."
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="text-xs uppercase tracking-widest text-neon-lime mb-6">{t('footer.social')}</h4>
          <ul className="space-y-4 font-light text-white/40">
            <li className="hover:text-neon-lime transition-colors cursor-pointer">Instagram</li>
            <li className="hover:text-neon-lime transition-colors cursor-pointer">Twitter</li>
            <li className="hover:text-neon-lime transition-colors cursor-pointer">LinkedIn</li>
            <li className="hover:text-neon-lime transition-colors cursor-pointer">Behance</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="text-xs uppercase tracking-widest text-neon-lime mb-6">{t('footer.legal')}</h4>
          <ul className="space-y-4 font-light text-white/40">
            <li className="hover:text-neon-lime transition-colors cursor-pointer">{t('footer.privacy')}</li>
            <li className="hover:text-neon-lime transition-colors cursor-pointer">{t('footer.terms')}</li>
          </ul>
        </div>
      </div>

      <div className="px-6 md:px-12 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/10 tracking-widest uppercase">
        <p>{t('footer.copyright')}</p>
        <p>EST. 2024</p>
      </div>
    </footer>
  );
};

export default Footer;