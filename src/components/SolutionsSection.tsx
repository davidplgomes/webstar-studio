'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FluidBackground from './FluidBackground';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const slides = [
  {
    title: "Solutions",
    text: "Empowering your enterprise with comprehensive cyber solutions tailored to defend against the most complex, modern digital attacks while maintaining seamless operational continuity."
  },
  {
    title: "Centralized platform",
    text: "Gain complete visibility across your infrastructure. Our centralized platform unifies threat intelligence, proactive monitoring, and incident response into a single pane of glass."
  },
  {
    title: "Expertises",
    text: "Leverage decades of collective experience from our top-tier security analysts, penetration testers, and compliance specialists to safeguard your most valuable assets."
  }
];

const SolutionsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);

  const bgRef = useRef<HTMLDivElement>(null);

  // useGSAP scope
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Safety check: ensure arrays are fully populated before running GSAP logic
    if (slidesRef.current.length < 3 || !slidesRef.current[0] || !slidesRef.current[1] || !slidesRef.current[2]) {
      return;
    }
    
    // 1. FORÇAR ESTADO INICIAL DA MÁSCARA (YPercent é mais suave que Y)
    const title0 = slidesRef.current[0].querySelectorAll('.slide-title-inner, .slide-text-inner');
    if (title0.length) gsap.set(title0, { yPercent: 0, opacity: 1 });
    
    gsap.set([slidesRef.current[1], slidesRef.current[2]], { opacity: 1 }); // O container absoluto fica visível
    
    const title1 = slidesRef.current[1].querySelectorAll('.slide-title-inner, .slide-text-inner');
    if (title1.length) gsap.set(title1, { yPercent: 100, opacity: 0 });
    
    const title2 = slidesRef.current[2].querySelectorAll('.slide-title-inner, .slide-text-inner');
    if (title2.length) gsap.set(title2, { yPercent: 100, opacity: 0 });
    
    // Trims Iniciais
    gsap.set([track1Ref.current, track2Ref.current], { clipPath: "inset(0% 100% 0% 0%)" });

    // 2. CRIAR A TIMELINE DE SCROLL
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", // Cria 3 ecrãs de scroll virtual para a animação acontecer
        pin: true,     // Trava a secção na ecrã
        scrub: 0.5,    // Mudei para 0.5 para o "tight" scroll feel
        anticipatePin: 1
      }
    });

    // FASE 1: Slide 1 sai (sobe), Slide 2 entra (revela de baixo)
    tl.addLabel("fase1")
      .to(track1Ref.current, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }, "fase1")
      // Slide 1 Sai (Sobe para -100%)
      .to(slidesRef.current[0]?.querySelector('.slide-title-inner') || null, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power3.inOut" }, "fase1")
      .to(slidesRef.current[0]?.querySelector('.slide-text-inner') || null, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power3.inOut" }, "fase1+=0.1")
      // Slide 2 Entra (Sobe de 100% para 0%)
      .to(slidesRef.current[1]?.querySelector('.slide-title-inner') || null, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "fase1+=0.4")
      .to(slidesRef.current[1]?.querySelector('.slide-text-inner') || null, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "fase1+=0.5")
      .to(num2Ref.current, { color: "#ffffff", duration: 0.1 }, "fase1+=0.9");

    // FASE 2: Slide 2 sai (sobe), Slide 3 entra (revela de baixo)
    tl.addLabel("fase2")
      .to(track2Ref.current, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }, "fase2")
      // Slide 2 Sai
      .to(slidesRef.current[1]?.querySelector('.slide-title-inner') || null, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power3.inOut" }, "fase2")
      .to(slidesRef.current[1]?.querySelector('.slide-text-inner') || null, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power3.inOut" }, "fase2+=0.1")
      // Slide 3 Entra
      .to(slidesRef.current[2]?.querySelector('.slide-title-inner') || null, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "fase2+=0.4")
      .to(slidesRef.current[2]?.querySelector('.slide-text-inner') || null, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "fase2+=0.5")
      .to(num3Ref.current, { color: "#ffffff", duration: 0.1 }, "fase2+=0.9");

  }, { scope: sectionRef });

  return (
    <section id="services-overview" ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden font-sans">
      
      {/* Background Layer - Always active and covering the section */}
      <div className="absolute inset-0 z-0 bg-black pointer-events-none">
        <FluidBackground />
      </div>

      <div className="relative w-full h-full flex flex-col justify-between pt-20 pb-12 z-10">
        {/* Top Space / Header Spacer */}
        <div className="w-full px-8 md:px-24">
          <h3 className="text-white/40 uppercase tracking-[0.2em] text-sm">Solutions Flow</h3>
        </div>

        {/* Content Layer */}
        <div className="relative w-full flex-grow flex items-center px-8 md:px-24">
          <div className="relative w-full h-64 md:h-80">
            {slides.map((slide, index) => (
              <div 
                key={index}
                ref={(el) => { slidesRef.current[index] = el; }}
                className="absolute inset-0 w-full h-full flex items-center justify-between"
              >
                {/* Esquerda: Título */}
                <div className="w-1/2 pr-8 overflow-hidden">
                  <div className="slide-title-inner">
                    <h2 className="text-4xl md:text-6xl font-medium text-white">{slide.title}</h2>
                  </div>
                </div>
                {/* Direita: Texto */}
                <div className="w-1/2 pl-8 flex flex-col items-start overflow-hidden">
                  <div className="slide-text-inner">
                    <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed max-w-md">
                      {slide.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar Footer Layer */}
        <div className="relative z-10 w-full pb-12 px-8 md:px-24 flex items-center gap-4">
          {/* Num 1 */}
          <span ref={num1Ref} className="text-sm tracking-widest font-mono text-white">01</span>
          
          {/* Trilha 1 (Entre 01 e 02) */}
          <div className="relative flex-grow h-[1px] mx-4">
            <div className="absolute inset-0 border-b border-dashed border-white/20"></div>
            <div 
              ref={track1Ref} 
              className="absolute inset-0 border-b border-dashed border-[#cfff28]" 
              style={{ clipPath: 'inset(0% 100% 0% 0%)' }} 
            ></div>
          </div>

          {/* Num 2 */}
          <span ref={num2Ref} className="text-sm tracking-widest font-mono text-white">02</span>

          {/* Trilha 2 (Entre 02 e 03) */}
          <div className="relative flex-grow h-[1px] mx-4">
            <div className="absolute inset-0 border-b border-dashed border-white/20"></div>
            <div 
              ref={track2Ref} 
              className="absolute inset-0 border-b border-dashed border-[#cfff28]" 
              style={{ clipPath: 'inset(0% 100% 0% 0%)' }} 
            ></div>
          </div>

          {/* Num 3 */}
          <span ref={num3Ref} className="text-sm tracking-widest font-mono text-white">03</span>
        </div>

      </div>
    </section>
  );
};

export default SolutionsSection;
