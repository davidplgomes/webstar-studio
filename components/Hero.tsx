import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { WebLogo, StarLogo } from './WebstarLogo';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth springs for high-end feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 1. Text Merging Phase (Progress: 0 -> 0.6)
  const leftX = useTransform(smoothProgress, [0, 0.6], ['-12vw', '0vw']);
  const rightX = useTransform(smoothProgress, [0, 0.6], ['12vw', '0vw']);

  // 2. Main Title Scale/Impact
  const logoScale = useTransform(smoothProgress, [0, 0.6], [1.3, 1]);
  const logoOpacity = useTransform(smoothProgress, [0.7, 0.95], [1, 0]);

  // 3. Tilted Glass Slab (Restored with Lime Palette) - Parallax/Scale back on scroll
  const glassY = useTransform(smoothProgress, [0, 1], ['0vh', '40vh']);
  const glassScale = useTransform(smoothProgress, [0.6, 1], [1, 0.8]);
  const glassOpacity = useTransform(smoothProgress, [0.8, 0.95], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#000000]">
      {/* 
        Sticky Container 
        Keeps the Hero pinned to the viewport during the 250vh scroll duration 
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Dark underlay */}
        <div className="absolute inset-0 bg-[#000000] z-0" />



        {/* 
          Foreground Pinned Dynamic Typography
          Wireframe segments merging over the new Lime Slab.
        */}
        <div className="relative z-20 w-full max-w-[1800px] mx-auto flex items-center justify-center pointer-events-none px-6">
          <motion.div
            style={{
              x: leftX,
              scale: logoScale,
              opacity: logoOpacity
            }}
            className="flex-shrink-0"
          >
            <WebLogo className="w-[35vw] md:w-[28vw] text-soft-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
          </motion.div>

          <motion.div
            style={{
              x: rightX,
              scale: logoScale,
              opacity: logoOpacity
            }}
            className="flex-shrink-0"
          >
            <StarLogo className="w-[41vw] md:w-[33vw] text-soft-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default Hero;