import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { EXPERTISE, fadeInUp, staggerContainer } from '../constants';

const Expertise: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="services" className="py-24 md:py-32 bg-transparent text-soft-white border-t border-white/5 relative z-10">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-sm tracking-[0.3em] uppercase mb-16 font-display text-neon-lime">
            {t('expertise.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {EXPERTISE.map((item, index) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="group p-8 glass-technical transition-all duration-500"
              >
                <span className="block text-4xl font-light mb-6 text-neon-lime/40 font-display transition-colors group-hover:text-neon-lime">0{index + 1}</span>
                <h3 className="text-xl tracking-widest mb-6 font-display group-hover:text-neon-lime transition-colors">
                  {t(`expertise.list.e${index + 1}.title`)}
                </h3>
                <ul className="space-y-3">
                  {(t(`expertise.list.e${index + 1}.points`, { returnObjects: true }) as string[]).map((point, i) => (
                    <li key={i} className="text-sm font-light text-white/50 tracking-wide group-hover:text-soft-white transition-colors">
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;