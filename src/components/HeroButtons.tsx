import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroButtonsProps {
  onProjectsClick?: () => void;
  onContactClick?: () => void;
}

export const HeroButtons: React.FC<HeroButtonsProps> = ({
  onProjectsClick,
  onContactClick,
}) => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="hero-cta-buttons"
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 sm:gap-6 pt-1"
    >
      {/* Primary CTA: EXPLORE OUR SERVICES → */}
      <motion.a
        href="#services"
        id="hero-primary-cta"
        onClick={(e) => {
          if (onProjectsClick) {
            e.preventDefault();
            onProjectsClick();
          } else {
            handleSmoothScroll(e, '#services');
          }
        }}
        whileHover={{ y: -3 }}
        whileTap={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 h-[56px] rounded-[6px] bg-[#FF7900] text-white font-body text-[14px] sm:text-[15px] font-semibold tracking-[0.06em] uppercase shadow-[0_4px_14px_rgba(255,121,0,0.30)] hover:shadow-[0_8px_24px_rgba(255,121,0,0.45)] transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#031B35]"
      >
        <span className="whitespace-nowrap">OUR SERVICES</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </motion.a>

      {/* Secondary CTA: CONTACT US */}
      <motion.a
        href="#contact"
        id="hero-secondary-cta"
        onClick={(e) => {
          if (onContactClick) {
            e.preventDefault();
            onContactClick();
          } else {
            handleSmoothScroll(e, '#contact');
          }
        }}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        className="group relative inline-flex items-center justify-center px-7 sm:px-8 h-[56px] rounded-[6px] border border-[#8AA2BC]/45 hover:border-white/90 bg-[#031B35]/60 hover:bg-white/[0.08] text-white font-body text-[14px] sm:text-[15px] font-medium tracking-[0.06em] uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900]"
      >
        <span className="whitespace-nowrap">CONTACT US</span>
      </motion.a>
    </div>
  );
};
