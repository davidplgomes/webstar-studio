'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const StatementBridge: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full bg-gradient-to-b from-[#000000] to-transparent px-6 py-20 text-white md:px-12 md:py-28">
      <div className="mx-auto flex w-full max-w-7xl justify-end">
        <p className="max-w-4xl text-right text-3xl font-medium leading-[1.02] tracking-[-0.03em] text-white/88 md:text-5xl lg:text-6xl">
          {t('footer.statement')}
        </p>
      </div>
    </section>
  );
};

export default StatementBridge;
