import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { NEWS, fadeInUp, staggerContainer } from '../constants';

const News: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="insights" className="py-24 md:py-32 bg-[#000000] text-soft-white border-t border-white/5">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-sm tracking-[0.3em] uppercase font-display text-neon-lime">{t('news.title')}</h2>
          <a href="#" className="flex items-center gap-2 text-xs tracking-widest uppercase hover:text-neon-lime transition-colors">
            {t('news.read_all')} <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer ios-glass rounded-3xl p-6"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-80 grayscale group-hover:grayscale-0 brightness-50 group-hover:brightness-100"
                  loading="lazy"
                />
              </div>
              <span className="text-xs tracking-widest text-neon-lime/60 mb-2 block group-hover:text-neon-lime transition-colors">{item.date}</span>
              <h3 className="text-xl font-light font-display group-hover:text-neon-lime transition-colors leading-relaxed">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
