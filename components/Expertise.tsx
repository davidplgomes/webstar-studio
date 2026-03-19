'use client';

import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseItem {
  title: string;
  label: string;
  desc: string;
}

const Expertise: React.FC = () => {
  const { t } = useTranslation();
  const services = t('expertise.items', { returnObjects: true }) as ExpertiseItem[];

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !pinContainerRef.current || services.length === 0) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: pinContainerRef.current,
      start: 'top top',
      end: `+=${services.length * 100}%`,
      // Smooth the scrub so wheel movement feels more deliberate and less jittery.
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;

        const newIndex = Math.min(
          services.length - 1,
          Math.max(0, Math.floor(progress * services.length)),
        );

        setActiveIndex(newIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, { dependencies: [services.length] });

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative w-full bg-transparent font-sans text-white pointer-events-none"
    >
      <div className="pointer-events-none absolute left-1/2 top-[12vh] hidden h-[72vh] w-px -translate-x-px bg-gradient-to-b from-transparent via-white/6 to-transparent md:block" />

      <div ref={pinContainerRef} className="flex h-screen w-full flex-col md:flex-row">
        {/* Left side: Empty and totally transparent for the globe */}
        <div className="relative hidden h-full w-full bg-transparent md:block md:w-1/2" />

        {/* Frosted right panel that separates the editorial list from the live 3D background. */}
        <div className="relative flex h-full w-full flex-col bg-black/20 px-6 pt-[22vh] pointer-events-auto backdrop-blur-[12px] md:w-1/2 md:px-12 lg:px-20">
          <div className="flex w-full max-w-2xl flex-col">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              const indexLabel = String(index + 1).padStart(2, '0');

              return (
                <article
                  key={service.title}
                  className="relative"
                >
                  <div
                    className={`flex items-start gap-6 py-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:gap-8 md:py-4 ${
                      isActive ? 'opacity-100' : 'opacity-25 hover:opacity-50'
                    }`}
                  >
                    <span className="mt-3 text-[10px] font-semibold tracking-[0.3em] text-neon-lime md:mt-4">
                      [{indexLabel}]
                    </span>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-[2.5rem] font-black uppercase leading-[0.9] tracking-tighter md:text-[3.5rem] lg:text-[4.2rem]">
                        {service.title}
                      </h2>

                      <div
                        className={`grid transition-[grid-template-rows,opacity,margin-top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive ? 'mt-5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="space-y-6 pb-4">
                            <p className="max-w-md text-sm font-light leading-relaxed tracking-wide text-white/60 md:text-base">
                              {service.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
