import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { PORTFOLIO_ENTRIES } from '../src/data/portfolio';
import { pickLocalized } from '../src/lib/locale';

const PROJECT_VISUALS: Record<string, string> = {
  'fox-delivery': 'https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?q=80&w=2400&auto=format&fit=crop',
  daton: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2400&auto=format&fit=crop',
  'rankey-ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2400&auto=format&fit=crop',
  'cpb-advocacia': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2400&auto=format&fit=crop',
  'affordable-granite-florida': 'https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?q=80&w=2400&auto=format&fit=crop',
  ciranda: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2400&auto=format&fit=crop',
  'lisheen-springs-golf-club': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2400&auto=format&fit=crop',
  'veranne-brand': 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2400&auto=format&fit=crop',
};

type ProjectsProps = {
  showViewAll?: boolean;
};

const Projects: React.FC<ProjectsProps> = ({ showViewAll = true }) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const translatedTitle = t('projects.title') || 'SELECTED WORKS';
  const titleWords = translatedTitle.split(' ');
  const firstWord = titleWords.length > 0 ? titleWords[0] : '';
  const remainingWords = titleWords.length > 1 ? titleWords.slice(1).join(' ') : '';
  const projects = PORTFOLIO_ENTRIES.slice(0, 4);

  const cardVariants: Variants = {
    inactive: { scale: 0.985, opacity: 0.82 },
    active: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const curtainVariants = {
    inactive: { scaleY: 1, originY: 1 },
    active: { scaleY: 0, originY: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const imageVariants = {
    inactive: { scale: 1.08, filter: 'brightness(0.72)' },
    active: { scale: 1, filter: 'brightness(1)', transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const textVariants = {
    inactive: { y: 20, opacity: 0 },
    active: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.35 } },
  };

  return (
    <section id="projects" className="overflow-hidden border-y border-white/10 bg-black/92 py-24 md:py-32">
      <div className="px-6 md:px-12 lg:px-16">
        <div className="mb-16 flex items-end justify-between md:mb-24">
          <h2 className="font-display text-[12vw] font-bold leading-none text-white/85">
            {firstWord}
            {remainingWords ? (
              <>
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.82)' }}>
                  {remainingWords}
                </span>
              </>
            ) : null}
          </h2>

          {showViewAll ? (
            <Link
              href="/portfolio"
              className="hidden items-center gap-2 rounded-full border border-neon-lime px-6 py-3 text-xs uppercase tracking-widest text-neon-lime transition-all duration-300 hover:bg-neon-lime hover:text-black md:flex"
            >
              {t('projects.view_all')} <ArrowUpRight size={16} />
            </Link>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              className="group relative aspect-[4/3] overflow-hidden border border-white/10"
              initial="inactive"
              whileInView="active"
              viewport={{ once: false, amount: 0.4 }}
              variants={cardVariants}
            >
              <motion.div className="absolute inset-0 z-20 origin-bottom bg-black" variants={curtainVariants} />

              <motion.div className="relative h-full w-full" variants={imageVariants}>
                <Image
                  src={PROJECT_VISUALS[project.slug] ?? project.image}
                  alt={pickLocalized(project.title, locale)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
              </motion.div>

              <div className="absolute inset-0 z-30 flex flex-col justify-between bg-gradient-to-t from-black/82 via-black/18 to-black/8 p-8">
                <div className="flex items-start justify-between">
                  <span className="text-xs tracking-widest text-white/60">0{index + 1}</span>
                  <Link href={project.website} target="_blank" rel="noreferrer" className="opacity-85 transition-opacity hover:opacity-100">
                    <motion.div variants={textVariants}>
                      <ArrowUpRight className="text-neon-lime" />
                    </motion.div>
                  </Link>
                </div>

                <div className="max-w-[82%]">
                  <motion.h3
                    variants={textVariants}
                    className="font-display text-3xl uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-5xl"
                  >
                    {pickLocalized(project.title, locale)}
                  </motion.h3>
                  <motion.p variants={textVariants} className="mt-3 text-[10px] uppercase tracking-[0.22em] text-neon-lime">
                    {pickLocalized(project.sector, locale)} / {project.country}
                  </motion.p>
                  <motion.p variants={textVariants} className="mt-4 max-w-xl text-sm leading-relaxed text-white/68 md:text-base">
                    {pickLocalized(project.summary, locale)}
                  </motion.p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {showViewAll ? (
          <div className="mt-12 flex justify-center md:hidden">
            <Link
              href="/portfolio"
              className="flex items-center gap-2 rounded-full border border-neon-lime px-8 py-4 text-xs uppercase tracking-widest text-neon-lime transition-all duration-300 hover:bg-neon-lime hover:text-black"
            >
              {t('projects.view_all')} <ArrowUpRight size={16} />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Projects;
