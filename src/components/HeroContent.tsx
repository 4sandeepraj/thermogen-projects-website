import React from 'react';
import { motion } from 'motion/react';
import { HeroButtons } from './HeroButtons';
import { brandColors, animationTokens } from '../tokens';

export const HeroContent: React.FC = () => {
  return (
    <div
      id="hero-text-content"
      className="relative z-20 flex flex-col justify-center w-full max-w-[700px] xl:max-w-[750px] text-left select-text"
    >
      {/* 1. Small Eyebrow - left-aligned with small horizontal line beside it */}
      <motion.div
        id="hero-eyebrow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: animationTokens.duration,
          delay: animationTokens.stagger.eyebrow,
          ease: animationTokens.ease,
        }}
        className="flex items-center gap-3.5 mb-4 sm:mb-5"
      >
        <span
          className="font-body text-[15px] sm:text-[16px] lg:text-[17px] font-bold uppercase tracking-[3px]"
          style={{ color: brandColors.brandOrange }}
        >
          ENGINEERING EXCELLENCE
        </span>
        <span
          className="w-8 sm:w-10 h-[2px] rounded-full shrink-0"
          style={{ backgroundColor: brandColors.brandOrange }}
          aria-hidden="true"
        />
      </motion.div>

      {/* 2. Main Heading - Exact 2 lines on desktop, Title Case, Engineering Blue second line */}
      <motion.h1
        id="hero-main-heading"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: animationTokens.duration,
          delay: animationTokens.stagger.heading,
          ease: animationTokens.ease,
        }}
        className="font-heading font-extrabold text-[34px] sm:text-[40px] md:text-[46px] lg:text-[50px] xl:text-[54px] leading-[1.08] tracking-[-1px] mb-6 sm:mb-7"
        style={{
          fontWeight: 800,
        }}
      >
        <span className="block whitespace-normal lg:whitespace-nowrap text-white">
          Engineering Tomorrow’s
        </span>
        <span
          className="block whitespace-normal lg:whitespace-nowrap"
          style={{ color: '#1688E8' }}
        >
          Energy Infrastructure
        </span>
      </motion.h1>

      {/* 3. Description - Exact mandated text, 17-19px desktop, line-height 1.6, 650-700px max width */}
      <motion.p
        id="hero-description"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: animationTokens.duration,
          delay: animationTokens.stagger.description,
          ease: animationTokens.ease,
        }}
        className="font-body text-[16px] sm:text-[17px] lg:text-[18px] xl:text-[19px] text-[#D8E4EE] leading-[1.6] max-w-[650px] lg:max-w-[680px] xl:max-w-[700px] mb-7 sm:mb-8 font-normal"
      >
        Delivering innovation, safe and reliable engineering, procurement,
        installation and commissioning solutions for PNG, CNG, LNG, LPG and
        Industrial Fuel Gas Systems across India.
      </motion.p>

      {/* 4. Action Buttons */}
      <motion.div
        id="hero-buttons-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: animationTokens.duration,
          delay: animationTokens.stagger.buttons,
          ease: animationTokens.ease,
        }}
      >
        <HeroButtons />
      </motion.div>
    </div>
  );
};
