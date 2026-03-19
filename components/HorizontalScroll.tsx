import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "NEON VERSE",
        category: "Immersive Experience",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        year: "2024"
    },
    {
        id: 2,
        title: "AERO DYNAMICS",
        category: "3D Motion",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        year: "2023"
    },
    {
        id: 3,
        title: "VOID WALKER",
        category: "Game Design",
        image: "https://images.unsplash.com/photo-1614730341194-75c60740a2d3?q=80&w=2674&auto=format&fit=crop",
        year: "2024"
    },
    {
        id: 4,
        title: "CYBER CORE",
        category: "WebGL Platform",
        image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2487&auto=format&fit=crop",
        year: "2023"
    }
];

const HorizontalScroll: React.FC = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (sectionRef.current && triggerRef.current) {
                const scrollDistance = sectionRef.current.scrollWidth - window.innerWidth;
                const textHighlightDuration = window.innerHeight * 0.4; // Reduced distance for faster 'load-in' feel

                // Create a single master timeline for the pinned section
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: () => `+=${scrollDistance + textHighlightDuration}`,
                        scrub: 0.6, // Slightly less scrub lag for snappier feel
                        pin: true,
                        invalidateOnRefresh: true,
                    }
                });

                if (overlayRef.current) {
                    tl.to(overlayRef.current, {
                        opacity: 0,
                        duration: 0.22,
                        ease: "power2.out"
                    }, 0);
                }

                // Phase 1: Staggered highlight animation for "REALITIES"
                const bgs = gsap.utils.toArray('.bg-layer');
                const texts = gsap.utils.toArray('.text-layer');

                // Add text highlight
                tl.to(bgs, {
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "power2.out"
                }, 0);

                tl.to(texts, {
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "power2.out"
                }, 0);

                // Phase 2: Main horizontal scroll animation
                tl.to(sectionRef.current, {
                    x: () => -scrollDistance,
                    ease: "none",
                    duration: scrollDistance / textHighlightDuration
                }, 0.8); // Starts slightly sooner relative to highlight completion for a fluid blend
            }
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="relative h-screen w-full overflow-hidden bg-transparent text-white z-20">
            <div ref={overlayRef} className="pointer-events-none absolute inset-0">
                <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-black/20 backdrop-blur-[12px] md:block" />
                <div className="absolute inset-y-0 right-0 w-full bg-black/20 backdrop-blur-[12px] md:hidden" />
            </div>
            <div className="absolute top-12 left-12 z-10 flex gap-4 items-center">
                <span className="h-px w-12 bg-white/40" />
                <h2 className="text-sm font-bold tracking-widest uppercase text-white/60">{t('projects.title')}</h2>
            </div>

            <div
                ref={sectionRef}
                className="absolute top-0 left-0 h-full flex items-center px-[20vw] gap-32 md:gap-48"
            >
                {/* Intro Text */}
                <div className="min-w-[40vw]">
                    <h3 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] text-white/90 mb-8">
                        DIGITAL <br />
                        <span className="inline-flex pt-2">
                            {"REALITIES".split('').map((char, index) => (
                                <span key={index} className="relative inline-block">
                                    <span className="bg-layer absolute top-0 bottom-0 bg-neon-lime -z-10 opacity-0" style={{ left: '-0.05em', right: '-0.05em' }} />
                                    <span className="relative z-10 inline-block">
                                        <span className="text-transparent stroke-text">{char}</span>
                                        <span className="text-layer absolute top-0 left-0 text-white opacity-0" style={{ WebkitTextStroke: '0px' }}>{char}</span>
                                    </span>
                                </span>
                            ))}
                        </span>
                    </h3>
                    <p className="text-xl md:text-2xl font-light text-white/40 max-w-md ml-24 font-editorial italic">
                        Exploring the boundaries between physical space and digital perception.
                    </p>
                </div>

                {/* Project Cards */}
                {projects.map((project, index) => (
                    <div key={project.id} className="relative w-[80vw] md:w-[60vw] h-[60vh] md:h-[70vh] group cursor-pointer flex-shrink-0">
                        <div className="w-full h-full overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 80vw, 60vw"
                                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        <div className="absolute -bottom-16 left-0">
                            <span className="text-xs font-bold tracking-widest block mb-2">0{index + 1} / {project.year}</span>
                            <h4 className="text-4xl md:text-6xl font-display font-bold uppercase">{project.title}</h4>
                        </div>

                        <div className="absolute -top-12 right-0">
                            <p className="text-sm font-light tracking-wider italic font-editorial">{project.category}</p>
                        </div>
                    </div>
                ))}

                {/* End Spacer */}
                <div className="min-w-[20vw] h-full flex items-center justify-center">
                    <a href="#" className="flex gap-4 items-center group">
                        <span className="text-4xl font-display font-bold text-white/80 group-hover:text-neon-lime transition-colors">VIEW ALL</span>
                        <div className="p-4 rounded-full border border-white/20 group-hover:bg-neon-lime group-hover:border-neon-lime transition-all duration-300">
                            <ArrowUpRight className="text-white/60 group-hover:text-black group-hover:rotate-45 transition-all duration-300" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HorizontalScroll;
