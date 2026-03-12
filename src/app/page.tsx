'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SiteShell from '@/components/layout/SiteShell';
import Preloader from '../../components/Preloader';
import Hero from '../../components/Hero';
import GlobeSection from '@/components/GlobeSection';
import Intro from '../../components/Intro';
import SolutionsSection from '@/components/SolutionsSection';
import Expertise from '../../components/Expertise';
import HorizontalScroll from '../../components/HorizontalScroll';
import Projects from '../../components/Projects';
import Logos from '../../components/Logos';
import Footer from '../../components/Footer';
import HomeRouteBand from '@/components/pages/HomeRouteBand';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <SiteShell withBackground withCursor>
      <Preloader />

      <div className="relative z-10 w-full overflow-x-hidden font-sans">
        <Hero />
        <GlobeSection />
        <Intro />

        <div className="pointer-events-none relative z-10 h-[50vh] w-full bg-gradient-to-b from-[#000000] to-transparent" />

        <SolutionsSection />
        <Expertise />
        <HorizontalScroll />
        <Projects />
        <Logos />

        <HomeRouteBand />
        <Footer />
      </div>
    </SiteShell>
  );
}
