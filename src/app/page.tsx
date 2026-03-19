'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SiteShell from '@/components/layout/SiteShell';
import Preloader from '../../components/Preloader';
import Hero from '../../components/Hero';
import GlobeSection from '@/components/GlobeSection';
import Intro from '../../components/Intro';
import SolutionsSection from '@/components/SolutionsSection';
import StatementBridge from '../../components/StatementBridge';
import Expertise from '../../components/Expertise';
import HorizontalScroll from '../../components/HorizontalScroll';
import Logos from '../../components/Logos';
import Footer from '../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <SiteShell withBackground withCursor>
      <Preloader />

      <div className="relative z-10 w-full overflow-x-hidden font-sans">
        <Hero />
        <GlobeSection />
        <Intro />
        <StatementBridge />
        <SolutionsSection />
        <Expertise />
        <HorizontalScroll />
        <Logos />
        <Footer />
      </div>
    </SiteShell>
  );
}
