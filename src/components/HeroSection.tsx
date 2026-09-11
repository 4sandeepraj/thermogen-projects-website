import React from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroEquipment } from './HeroEquipment';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      aria-label="Thermogen Projects Hero"
      className="relative w-full min-h-[680px] lg:min-h-[720px] xl:h-[780px] flex flex-col justify-between overflow-hidden bg-[#031B35]"
    >
      {/* Background Ambience Layer */}
      <HeroBackground />

      {/* Main Hero Viewport Area */}
      <div className="relative z-10 w-full flex-1 flex items-center">
        <div className="w-full max-w-[1540px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6 xl:gap-8">
            {/* Left Column: 46-47% on Desktop */}
            <div className="w-full lg:w-[47%] xl:w-[46%] shrink-0">
              <HeroContent />
            </div>

            {/* Right Column: 53-54% on Desktop */}
            <div className="w-full lg:w-[53%] xl:w-[54%] mt-8 lg:mt-0 flex items-center justify-center lg:justify-end">
              <HeroEquipment />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Technical Specification Strip / Anchor */}
      <div
        id="hero-bottom-accent-bar"
        className="relative z-20 w-full border-t border-white/[0.08] bg-[#021326]/60 backdrop-blur-sm py-2.5 px-5 sm:px-8 lg:px-16 hidden sm:flex items-center justify-between text-white/50 text-[11px] lg:text-[12px] font-body tracking-[0.15em] uppercase select-none"
      >
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
            INDUSTRIAL FUEL GAS &amp; COMBUSTION SYSTEMS
          </span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline">ENGINEERING &bull; PROCUREMENT &bull; COMMISSIONING</span>
        </div>
        <div className="flex items-center gap-4 text-white/40">
          <span>GAS SKIDS &bull; PRS &bull; MRS &bull; GAS TRAINS</span>
        </div>
      </div>
    </section>
  );
};
