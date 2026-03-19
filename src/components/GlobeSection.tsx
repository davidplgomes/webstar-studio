'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=100%', // Pin for 1 extra screen height
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="globe-trigger" className="relative w-full h-screen bg-transparent font-sans">

      {/* HTML UI Layer Overlay */}
      <div className="h-screen w-full flex items-center justify-between container mx-auto px-6 pointer-events-none z-10">

        {/* Left Column: Title */}
        <div className="w-full md:w-1/2 mb-16 md:mb-0">
          <h2 className="text-6xl md:text-8xl font-light text-white tracking-tighter leading-[1.1]">
            Built to launch. Designed to scale.
          </h2>
        </div>

        {/* Right Column: Chat Widgets */}
        <div className="w-full md:w-1/2 flex flex-col items-end pointer-events-auto">
          <div className="flex flex-col gap-4 max-w-md w-full">

            {/* Bubble 1 */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <p className="text-white/80 text-sm leading-relaxed">
                Hello 👋 We’re Web Star Studio, a sophisticated digital studio shaping the next era of digital brands.
              </p>
            </div>

            {/* Bubble 2 */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-xl ml-8">
              <p className="text-white/80 text-sm leading-relaxed">
                Feel free to contact us and connect with the Web Star team. From strategy and applied AI to design and engineering, we build scalable ecosystems that help ambitious brands launch faster and grow with confidence.
              </p>
            </div>

            {/* Action Button */}
            <button className="mt-4 self-start bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-white/80 hover:scale-[1.02] transition-all duration-300">
              Contact us
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default GlobeSection;
