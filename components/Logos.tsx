import React from 'react';
import { CLIENT_LOGOS } from '../constants';

const Logos: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-16 md:gap-32 items-center">
          {/* Double the list for seamless loop */}
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
            <span
              key={idx}
              className="text-3xl md:text-5xl font-serif text-white/20 uppercase select-none hover:text-neon-lime transition-colors duration-300 cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* Styles for animation */}
      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Logos;
