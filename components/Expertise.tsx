'use client';

import React from 'react';
import { Layers, PenTool, Code2, Rocket, ShieldCheck, ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Strategy',
    label: 'BUSINESS & PRODUCT',
    desc: 'Analyzing markets and defining digital roadmaps that align creative vision with measurable business outcomes.',
    Icon: Layers,
  },
  {
    id: 2,
    title: 'Design',
    label: 'DIGITAL EXPERIENCES',
    desc: 'Crafting interfaces that merge Design Thinking with cutting-edge aesthetics — every pixel is intentional.',
    Icon: PenTool,
  },
  {
    id: 3,
    title: 'Engineering',
    label: 'FULL-STACK DEVELOPMENT',
    desc: 'Building performant, scalable architectures using modern frameworks and cloud-native infrastructure.',
    Icon: Code2,
  },
  {
    id: 4,
    title: 'Growth',
    label: 'PERFORMANCE & SCALE',
    desc: 'Deploying data-driven acquisition strategies and conversion optimization to accelerate digital traction.',
    Icon: Rocket,
  },
  {
    id: 5,
    title: 'Security',
    label: 'CYBER & COMPLIANCE',
    desc: 'Implementing enterprise-grade protection frameworks and ensuring regulatory compliance across all touchpoints.',
    Icon: ShieldCheck,
  },
];

const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="relative w-full flex font-sans">

      {/* LEFT PANEL: Sticky & Transparent — globe shows through */}
      <div className="hidden md:flex w-1/2 sticky top-0 h-screen flex-col justify-center items-center bg-transparent">
          <span className="text-[10px] tracking-[0.5em] font-mono text-white/15 uppercase">
          SERVICES
        </span>
      </div>

      {/* RIGHT PANEL: Individual glass cards over transparent background */}
      <div className="w-full md:w-1/2 relative flex flex-col gap-6 px-6 pt-6 pb-0 md:pl-0 overflow-x-clip">
        
        {/* Ambient Glowing Diagonal Beam (same as menu) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[80%] h-[150%] rotate-[32deg] bg-gradient-to-br from-[#cfff28]/10 via-[#345c59]/10 to-transparent blur-[120px]" />
        </div>

        {/* Cards */}
        {services.map((service, index) => (
          <div
            key={service.id}
            className="relative w-full min-h-screen ios-glass rounded-[22px] p-12 md:p-16 lg:p-20 flex flex-col justify-between group"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start w-full">
              <p className="max-w-xs text-base md:text-lg font-light leading-relaxed text-white/40">
                {service.desc}
              </p>
              <div className="p-3 rounded-full border border-white/[0.08] group-hover:bg-neon-lime group-hover:border-neon-lime transition-all duration-300 cursor-pointer shrink-0 ml-8">
                <ArrowUpRight
                  size={18}
                  className="text-white/30 group-hover:text-black group-hover:rotate-45 transition-all duration-300"
                />
              </div>
            </div>

            {/* Bottom Row: Diagonal Balance */}
            <div className="flex justify-between items-end w-full">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/20 uppercase">
                {service.label}
              </span>
              <h2
                className="font-black tracking-tighter leading-[0.85] text-right text-white/80"
                style={{ fontSize: 'clamp(4rem, 8vw, 10rem)' }}
              >
                {service.title}
              </h2>
            </div>

            {/* Card Index */}
            <span className="absolute top-12 right-16 text-[10px] font-mono text-white/10 tracking-widest">
              0{index + 1}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Expertise;
