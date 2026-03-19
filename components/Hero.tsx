'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Create a master timeline linked to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // Fade out bottom bar upon scroll
    if (bottomBarRef.current) {
      tl.to(bottomBarRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      }, 0);
    }

    // 1. Text fades out and moves slightly horizontally
    const textRefs = [text1Ref.current, text2Ref.current, text3Ref.current];
    tl.to(textRefs.filter(Boolean), {
      x: '-10vw',
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut',
    }, 0);

    if (paragraphRef.current) {
      tl.to(paragraphRef.current, {
        x: '10vw',
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
      }, 0);
    }

    // Initial Reveal Animation
    const allChars = [
      ...(text1Ref.current?.querySelectorAll('.char') || []),
      ...(text2Ref.current?.querySelectorAll('.char') || []),
      ...(text3Ref.current?.querySelectorAll('.char') || []),
    ];

    if (allChars.length > 0) {
      gsap.fromTo(allChars, {
        y: 50,
        opacity: 0,
        rotationX: -45,
      }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        stagger: 0.03,
        ease: 'expo.out',
      });
    }

  }, { scope: containerRef });

  // Helper to split text into chars for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="relative h-screen bg-transparent text-white overflow-hidden flex flex-col items-center justify-center font-sans" style={{ perspective: '1000px' }}>

      {/* Foreground UI and Typography */}
      <div
        ref={textContainerRef}
        className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-32 lg:px-40 pointer-events-none mt-10 md:mt-16"
      >
        {/* Left Typography */}
        <div className="flex flex-col items-start w-full lg:w-[60%] leading-[0.85] font-display uppercase">
          <h1
            ref={text1Ref}
            className="text-[12vw] lg:text-[7.5vw] whitespace-nowrap text-white"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {splitText('WE SHAPE')}
          </h1>
          <h1
            ref={text2Ref}
            className="text-[12vw] lg:text-[7.5vw] whitespace-nowrap text-white/20 font-light"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {splitText('THE DIGITAL')}
          </h1>
          <h1
            ref={text3Ref}
            className="text-[12vw] lg:text-[7.5vw] whitespace-nowrap text-white font-bold"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {splitText('TOMORROW')}
          </h1>
        </div>

        {/* Right Paragraph */}
        <div className="mt-12 lg:mt-0 flex flex-col items-start lg:items-end w-full lg:w-[35%] text-left lg:translate-y-12">
          <p ref={paragraphRef} className="text-white/50 text-[14px] md:text-[16px] leading-[1.6] font-light max-w-sm lg:max-w-xs font-sans">
            We architect digital ecosystems with strategy, applied AI, and design precision so ambitious companies can grow with more clarity, speed, and technical depth.
          </p>
        </div>
      </div>

      {/* Bottom Bar: Scroll indicator & Border Line */}
      <div ref={bottomBarRef} className="absolute bottom-0 left-0 w-full z-10 bg-transparent">
        <div className="h-20 lg:h-24 mx-6 md:mx-32 lg:mx-40 border-t border-white/10 flex items-center justify-between">
          <span className="text-white/30 text-[9px] tracking-[0.3em] font-medium uppercase font-sans">
            SCROLL TO DISCOVER
          </span>
          <span className="text-white/30 text-sm font-extralight animate-bounce">↓</span>
        </div>
      </div>

    </section>
  );
};

export default Hero;
