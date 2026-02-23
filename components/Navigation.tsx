import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Instagram, Linkedin, Twitter } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const menuVariants = {
    closed: {
      x: "100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    },
    open: {
      x: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    }
  };

  const linkVariants = {
    closed: { x: 80, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.3 + (i * 0.1), duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-[48px] saturate-[180%] text-white flex flex-col md:flex-row border border-white/[0.08] overflow-hidden"
        >
          {/* Ambient Glowing Diagonal Beam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] md:w-[50vw] h-[150vh] rotate-[32deg] bg-gradient-to-br from-[#cfff28]/15 via-[#345c59]/15 to-transparent blur-[120px] pointer-events-none -z-10" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-50 p-2 hover:text-neon-lime transition-all duration-500 hover:rotate-90"
          >
            <X size={28} strokeWidth={1} />
          </button>

          {/* Left Panel - Info */}
          <div className="hidden md:flex w-1/3 h-full flex-col justify-between p-16 border-r border-white/[0.08]">
            <div>
              <h2 className="text-xs tracking-[0.3em] uppercase mb-8 font-display text-neon-lime">CONTACT</h2>
              <p className="text-white/40 font-light leading-relaxed text-sm">
                12 Rue de la Paix<br />
                75002 Paris, France<br />
                +33 1 42 68 53 00<br />
                <span className="text-white/60 hover:text-neon-lime transition-colors cursor-pointer">hello@webstar-studio.com</span>
              </p>
            </div>
            <div className="flex gap-6">
              <Instagram size={20} className="cursor-pointer text-white/40 hover:text-neon-lime transition-colors duration-300" />
              <Linkedin size={20} className="cursor-pointer text-white/40 hover:text-neon-lime transition-colors duration-300" />
              <Twitter size={20} className="cursor-pointer text-white/40 hover:text-neon-lime transition-colors duration-300" />
            </div>
          </div>

          {/* Right Panel - Navigation */}
          <div className="flex-1 h-full flex flex-col justify-center px-8 md:px-24">
            <nav className="flex flex-col gap-4 md:gap-6">
              <motion.a
                href="#projects"
                custom={0}
                variants={linkVariants}
                onClick={onClose}
                className="text-4xl md:text-7xl font-light tracking-wide uppercase text-white/60 hover:text-neon-lime transition-colors duration-300 font-display hover:translate-x-4 transform"
              >
                {t('nav.projects')}
              </motion.a>
              <motion.a
                href="#expertise"
                custom={1}
                variants={linkVariants}
                onClick={onClose}
                className="text-4xl md:text-7xl font-light tracking-wide uppercase text-white/60 hover:text-neon-lime transition-colors duration-300 font-display hover:translate-x-4 transform"
              >
                {t('nav.expertise')}
              </motion.a>
              <motion.a
                href="#agency"
                custom={2}
                variants={linkVariants}
                onClick={onClose}
                className="text-4xl md:text-7xl font-light tracking-wide uppercase text-white/60 hover:text-neon-lime transition-colors duration-300 font-display hover:translate-x-4 transform"
              >
                {t('nav.agency')}
              </motion.a>
              <motion.a
                href="#contact"
                custom={3}
                variants={linkVariants}
                onClick={onClose}
                className="text-4xl md:text-7xl font-light tracking-wide uppercase text-white/60 hover:text-neon-lime transition-colors duration-300 font-display hover:translate-x-4 transform"
              >
                {t('nav.contact')}
              </motion.a>
            </nav>

            <motion.div
              variants={linkVariants}
              custom={5}
              className="mt-16 flex gap-6 text-xs tracking-[0.3em]"
            >
              <button onClick={() => i18n.changeLanguage('en')} className={`${i18n.language.startsWith('en') ? 'border-b border-neon-lime text-neon-lime' : 'text-white/30 hover:text-white/60'} transition-colors pb-1`}>EN</button>
              <button onClick={() => i18n.changeLanguage('pt')} className={`${i18n.language.startsWith('pt') ? 'border-b border-neon-lime text-neon-lime' : 'text-white/30 hover:text-white/60'} transition-colors pb-1`}>PT</button>
              <button onClick={() => i18n.changeLanguage('es')} className={`${i18n.language.startsWith('es') ? 'border-b border-neon-lime text-neon-lime' : 'text-white/30 hover:text-white/60'} transition-colors pb-1`}>ES</button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;