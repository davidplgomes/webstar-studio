import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const translatedTitle = t('projects.title') || 'SELECTED WORKS';
  const titleWords = translatedTitle.split(' ');
  const firstWord = titleWords.length > 0 ? titleWords[0] : '';
  const remainingWords = titleWords.length > 1 ? titleWords.slice(1).join(' ') : '';

  // Motion Variants
  const cardVariants: Variants = {
    inactive: { scale: 0.95, opacity: 0.8 },
    active: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const curtainVariants = {
    inactive: { scaleY: 1, originY: 1 }, // Covers the image (starts from bottom)
    active: { scaleY: 0, originY: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } } // Shrinks down to reveal
  };

  const imageVariants = {
    inactive: { scale: 1.25, filter: 'grayscale(1) brightness(0.5) blur(12px)' },
    active: { scale: 1, filter: 'grayscale(0) brightness(1) blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const overlayVariants = {
    inactive: { opacity: 0 },
    active: { opacity: 0, transition: { duration: 0.5, delay: 0.3 } }
  };

  const textVariants = {
    inactive: { y: 20, opacity: 0 },
    active: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.4 } }
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#000000] overflow-hidden">
      <div className="px-6 md:px-12">
        <div className="flex justify-between items-end mb-16 md:mb-24">
          <h2 className="text-[12vw] leading-none font-bold font-display text-soft-white opacity-80 mix-blend-difference">
            {firstWord}
            {remainingWords && (
              <>
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                  {remainingWords}
                </span>
              </>
            )}
          </h2>
          <Link href="/portfolio" className="hidden md:flex items-center gap-2 border border-neon-lime text-neon-lime px-6 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-neon-lime hover:text-[#000000] transition-all duration-300">
            {t('projects.view_all')} <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {PROJECTS.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer border border-white/10 rounded-[4px]"
                initial="inactive"
                whileInView="active"
                viewport={{ once: false, amount: 0.4 }} // Trigger when 40% visible
                variants={cardVariants}
              >
                {/* Reveal Curtain - Expands/Shrinks to reveal content */}
                <motion.div
                  className="absolute inset-0 bg-[#000000] z-20 origin-bottom"
                  variants={curtainVariants}
                />

                <motion.div className="w-full h-full" variants={imageVariants}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </motion.div>

                <div
                  className="absolute inset-0 bg-[#000000]/40 flex flex-col justify-between p-8 z-30 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-xl transition-all duration-500 rounded-[4px]"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs tracking-widest text-white/60">0{index + 1}</span>
                    <motion.div variants={textVariants}>
                      <ArrowUpRight className="text-neon-lime" />
                    </motion.div>
                  </div>
                  <div>
                    <motion.h3 variants={textVariants} className="text-3xl md:text-5xl font-light mb-2 font-display text-neon-lime">
                      {project.title}
                    </motion.h3>
                    <motion.p variants={textVariants} className="text-sm tracking-widest text-white/40 uppercase">
                      {project.category}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
          <Link href="/portfolio" className="flex items-center gap-2 border border-neon-lime text-neon-lime px-8 py-4 rounded-full text-xs tracking-widest uppercase hover:bg-neon-lime hover:text-[#000000] transition-all duration-300">
            {t('projects.view_all')} <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
