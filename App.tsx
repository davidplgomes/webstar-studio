import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Logos from './components/Logos';
import News from './components/News';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import TechnicalBackground from './components/TechnicalBackground';

import Lenis from 'lenis';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-transparent min-h-screen selection:bg-neon-lime selection:text-deep-space cursor-none relative">
      <TechnicalBackground />

      <div id="main-scroll-container" className="relative z-10 w-full"> {/* Content Wrapper */}
        <Preloader />
        <CustomCursor />

        <Header
          isMenuOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        <Navigation
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />

        <main className="text-white">
          <Hero />
          <Intro />
          <Expertise />
          <Projects />
          <Logos />
          <News />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;