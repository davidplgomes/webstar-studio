import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Asterisk3D from './Asterisk3D';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline linked to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // Scroll for 3x viewport height
          pin: true,     // Pin the entire hero section
          scrub: 1,      // Smooth scrubbing
        }
      });

      // 1. Tag fades out and moves up
      tl.to(tagRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: 'power2.out',
      }, 0);

      // 2. Text scales down slightly and moves apart
      tl.to(text1Ref.current, {
        x: '-30vw',
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
      }, 0);

      tl.to(text2Ref.current, {
        x: '30vw',
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
      }, 0);

      // 3. 3D Asterisk Scales up and fades
      tl.to('.asterisk-container', {
        scale: 2,
        opacity: 0,
        y: '20vh',
        duration: 1,
        ease: 'power2.inOut',
      }, 0.2); // Start slightly after the text starts moving out

      // Initial Reveal Animation
      const chars1 = text1Ref.current?.querySelectorAll('.char');
      const chars2 = text2Ref.current?.querySelectorAll('.char');

      if (chars1 && chars2) {
        gsap.fromTo([...chars1, ...chars2], {
          y: 100,
          opacity: 0,
          rotationX: -90,
        }, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: 'expo.out',
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text into chars for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">{char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="relative h-screen bg-[#000000] text-white overflow-hidden flex flex-col items-center justify-center font-sans" style={{ perspective: '1000px' }}>

      {/* 3D Centerpiece */}
      <Asterisk3D />

      {/* Foreground UI and Typography */}
      <div
        ref={textContainerRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none px-4"
      >
        <div
          ref={tagRef}
          className="absolute top-[20%] md:top-[25%] px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-white/30 text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase font-mono bg-black/40 backdrop-blur-md text-white/90"
        >
          [ 2026—DIGITAL AGENCY ]
        </div>

        <div className="flex flex-col items-center justify-center w-full leading-[0.8] font-black uppercase tracking-tighter mix-blend-difference mt-20">
          <h1
            ref={text1Ref}
            className="text-[20vw] md:text-[18vw] whitespace-nowrap text-white"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {splitText('WEBSTAR')}
          </h1>
          <h1
            ref={text2Ref}
            className="text-[20vw] md:text-[18vw] whitespace-nowrap text-transparent flex"
            style={{ WebkitTextStroke: '2px white', transformStyle: 'preserve-3d' as any }}
          >
            {splitText('STUDIO')}
          </h1>
        </div>
      </div>

    </section>
  );
};

export default Hero;