import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

const Intro: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  // 1. Scroll Tracking for Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Velocity-driven rotation for technical crosshairs
  const crosshairRotate = useTransform(smoothVelocity, [-1000, 1000], [-180, 180]);

  // Parallax layers
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const glassPanelY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const textContentY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%']);

  // Fade-in variants for staggered text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section ref={containerRef} id="about" className="relative py-32 md:py-64 overflow-hidden z-10">

      {/* 2. Oversized Background Typography (Parallax) */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-20 whitespace-nowrap z-0"
      >
        <h2 className="text-[15vw] font-display font-bold text-transparent tracking-tighter"
          style={{ WebkitTextStroke: '2px rgba(207, 255, 40, 0.15)' }}>
          MANIFESTO
        </h2>
      </motion.div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">

          {/* 3. Parallax Glass Panel (Left Side - Headline) */}
          <motion.div
            style={{ y: glassPanelY }}
            className="md:col-span-7 glass-technical p-10 md:p-16 relative group"
          >
            {/* Technical Micro-interactions: Rotating Crosshairs */}
            <motion.div style={{ rotate: crosshairRotate }} className="absolute top-6 left-6 text-neon-lime/40 group-hover:text-neon-lime transition-colors">
              <Plus size={16} strokeWidth={1} />
            </motion.div>
            <motion.div style={{ rotate: crosshairRotate }} className="absolute top-6 right-6 text-neon-lime/40 group-hover:text-neon-lime transition-colors">
              <Plus size={16} strokeWidth={1} />
            </motion.div>
            <motion.div style={{ rotate: crosshairRotate }} className="absolute bottom-6 left-6 text-neon-lime/40 group-hover:text-neon-lime transition-colors">
              <Plus size={16} strokeWidth={1} />
            </motion.div>
            <motion.div style={{ rotate: crosshairRotate }} className="absolute bottom-6 right-6 text-neon-lime/40 group-hover:text-neon-lime transition-colors">
              <Plus size={16} strokeWidth={1} />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              className="mt-4"
            >
              {/* Split headline into mask-revealed lines */}
              <div className="overflow-hidden pb-4">
                <motion.h2 variants={lineVariants} className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight font-display text-white">
                  {t('intro.line1')}
                </motion.h2>
              </div>
              <div className="overflow-hidden pb-4">
                <motion.h2 variants={lineVariants} className="text-5xl md:text-7xl leading-[0.95] tracking-tight text-neon-lime font-editorial italic font-light">
                  {t('intro.line2')}
                </motion.h2>
              </div>
            </motion.div>
          </motion.div>

          {/* 4. Independent Parallax Text (Right Side - Description) */}
          <motion.div
            style={{ y: textContentY }}
            className="md:col-span-5 md:pl-8"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
            >
              <div className="overflow-hidden pb-2 mb-8">
                <motion.p variants={lineVariants} className="text-2xl md:text-3xl font-light leading-relaxed text-white font-editorial">
                  {t('intro.desc1')}
                </motion.p>
              </div>

              <div className="w-12 h-[1px] bg-neon-lime/30 mb-8" />

              <div className="overflow-hidden pb-2">
                <motion.p variants={lineVariants} className="text-lg md:text-xl font-light leading-relaxed text-white/50">
                  {t('intro.desc2')}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Intro;