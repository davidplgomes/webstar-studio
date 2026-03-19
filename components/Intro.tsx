import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Intro: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const invertedLayerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%', // Scroll duration
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // 1. Massive Scale Shift for the background text
    tl.to(bgTextRef.current, {
      scale: 5,
      opacity: 0,
      duration: 2,
      ease: 'power2.inOut',
    }, 0);

    // 2. Elite-Level Inverted Mask Reveal
    tl.fromTo(invertedLayerRef.current, {
      clipPath: 'inset(100% 0% 0% 0%)', // Start fully clipped from the bottom
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',   // Wipe up to fully reveal
      duration: 1.5,
      ease: 'power2.inOut',
    }, 0.2); // Start revealing alongside background text scale

    // 3. Fade in paragraph delayed
    tl.fromTo(paragraphRef.current, {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, 1);

    // 4. Cinematic Fade Out Transition
    const foregroundContent = containerRef.current.querySelector('.z-10') as HTMLElement;
    if (foregroundContent) {
      tl.to(foregroundContent, {
        opacity: 0,
        filter: "blur(10px)",
        y: -50,
        duration: 1,
        ease: "power2.inOut"
      }, 2.5); // Starts half a second after the paragraph appears
    }

  }, { scope: containerRef });

  const giantText = t('intro.backgroundWord');
  const revealHeadline = `${t('intro.line1')} ${t('intro.line2')}`;
  const description = t('intro.desc1');

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative h-screen bg-[#000000] text-soft-white overflow-hidden flex items-center justify-center font-sans"
    >

      {/* 1. Giant Background Text that Scales out */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2
          ref={bgTextRef}
          className="text-[25vw] font-black uppercase tracking-tighter mix-blend-difference text-white/5 whitespace-nowrap"
          style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)' }}
        >
          {giantText}
        </h2>
      </div>

      {/* 2. Foreground Content that Reveals via Inverted Mask */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center h-full">

        <div className="relative w-full max-w-4xl">
          {/* Base Layer (Dim/Faded Text) */}
          <h3 className="text-[6vw] md:text-[5vw] font-black uppercase tracking-tighter leading-[0.9] text-white/20">
            {revealHeadline.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>

          {/* Inverted Top Layer (Bright/Colored Text) */}
          <div
            ref={invertedLayerRef}
            className="absolute inset-0 w-full h-full text-neon-lime"
          >
            <h3 className="text-[6vw] md:text-[5vw] font-black uppercase tracking-tighter leading-[0.9]">
              {revealHeadline.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h3>
          </div>
        </div>

        <div className="mt-12 flex md:justify-end w-full">
          <p
            ref={paragraphRef}
            className="text-lg md:text-xl font-light text-white/60 max-w-md"
          >
            {description}
          </p>
        </div>

      </div>

    </section>
  );
};

export default Intro;
