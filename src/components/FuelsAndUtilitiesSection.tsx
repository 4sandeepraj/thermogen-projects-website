import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Flame,
  Gauge,
  Atom,
  Wind,
  Container,
  Pipette,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface FuelItem {
  id: string;
  name: string;
  abbreviation?: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  category: string;
}

// Exactly the 7 verified fuels & utilities from the company profile
const fuelsList: FuelItem[] = [
  {
    id: 'fuel-natural-gas',
    name: 'Natural Gas',
    abbreviation: 'NG / PNG',
    description:
      'High-volume pipeline and industrial supply infrastructure for thermal processing, boilers, and heating systems.',
    icon: Flame,
    category: 'Primary Fuel Gas',
  },
  {
    id: 'fuel-cng',
    name: 'Compressed Natural Gas',
    abbreviation: 'CNG',
    description:
      'High-pressure daughter station decanting, cascade manifold systems, and dedicated plant gas distribution.',
    icon: Gauge,
    category: 'High-Pressure Gas',
  },
  {
    id: 'fuel-hydrogen',
    name: 'Hydrogen',
    abbreviation: 'H2',
    description:
      'Engineered pipeline distribution, blending systems, and safety-compliant gas trains for clean energy adoption.',
    icon: Atom,
    category: 'Next-Gen Fuel',
  },
  {
    id: 'fuel-nitrogen',
    name: 'Nitrogen',
    abbreviation: 'N2',
    description:
      'High-integrity utility piping for industrial purging, inerting, pressure testing, and blanketing applications.',
    icon: Wind,
    category: 'Utility Gas',
  },
  {
    id: 'fuel-lpg',
    name: 'LPG',
    abbreviation: 'Liquefied Petroleum Gas',
    description:
      'Storage bullet piping, vaporizers, pressure reduction skids, and consumption manifolds for factory utilities.',
    icon: Container,
    category: 'Thermal Utility',
  },
  {
    id: 'fuel-industrial-gases',
    name: 'Industrial Fuel Gases',
    abbreviation: 'Process Fuels',
    description:
      'Engineered networks for specialized fuel gas blends, synthetic gases, and custom combustion utilities.',
    icon: Pipette,
    category: 'Process Engineering',
  },
  {
    id: 'fuel-high-pressure',
    name: 'High Pressure Gas Systems',
    abbreviation: 'PRS / MRS',
    description:
      'Comprehensive pressure regulation skids, metering stations, decanting facilities, and safety valve manifolds.',
    icon: Layers,
    category: 'Critical Infrastructure',
  },
];

export const FuelsAndUtilitiesSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="fuels"
      aria-labelledby="fuels-heading"
      className="relative z-20 w-full bg-white py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 xl:px-14 border-t border-[#E6EBF2] overflow-hidden"
    >
      {/* Subtle blueprint grid watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#062B52 1px, transparent 1px), linear-gradient(to right, #062B52 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-[94%] max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[840px] mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-3.5"
          >
            <span className="w-7 h-[2px] rounded-full bg-[#FF7900]" aria-hidden="true" />
            <span className="font-heading text-[13px] sm:text-[14px] font-bold text-[#FF7900] tracking-[0.2em] uppercase">
              FUELS &amp; UTILITIES WE HANDLE
            </span>
            <span className="w-7 h-[2px] rounded-full bg-[#FF7900]" aria-hidden="true" />
          </motion.div>

          <motion.h2
            id="fuels-heading"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-heading text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-[#062B52] leading-[1.18] tracking-tight mb-4"
          >
            Comprehensive Fuel Gas &amp;{' '}
            <span className="text-[#1688E8]">High-Pressure Utility Infrastructure</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-body text-[15.5px] sm:text-[16.5px] text-[#5F6F82] leading-[1.65] max-w-[720px]"
          >
            Delivering safe, certified, and efficient engineering solutions across the full
            spectrum of industrial energy gases, utility piping, and pressure regulation systems.
          </motion.p>
        </div>

        {/* Responsive Grid: 4 items top row, 3 items centered bottom row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {fuelsList.map((fuel, index) => {
            const Icon = fuel.icon;
            const isLastThree = index >= 4;

            return (
              <motion.div
                key={fuel.id}
                id={fuel.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.07,
                }}
                className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-[18px] bg-white border border-[#E6EBF2] shadow-[0_2px_12px_rgba(6,43,82,0.03)] hover:border-[#FF7900]/40 hover:shadow-[0_12px_32px_rgba(6,43,82,0.08)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-default min-h-[240px] ${
                  // On 4-column desktop, center the final 3 cards nicely
                  index === 4 ? 'lg:col-start-1 xl:col-start-1' : ''
                }`}
              >
                {/* Top Row: Category Tag & Icon */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F0F6FC] border border-[#1688E8]/20 text-[#0759A8] text-[11.5px] font-semibold tracking-wider uppercase">
                      {fuel.category}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#F0F6FC] group-hover:bg-[#FF7900]/10 flex items-center justify-center text-[#1688E8] group-hover:text-[#FF7900] transition-colors duration-300 ease-out shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Title and Sub-abbreviation */}
                  <h3 className="font-heading font-bold text-[19px] sm:text-[20px] text-[#062B52] group-hover:text-[#062B52] transition-colors duration-300 ease-out leading-[1.25] mb-1">
                    {fuel.name}
                  </h3>
                  {fuel.abbreviation && (
                    <span className="block font-body text-[12.5px] font-semibold text-[#8AA2BC] tracking-wider uppercase mb-3">
                      {fuel.abbreviation}
                    </span>
                  )}

                  {/* Description */}
                  <p className="font-body text-[14px] sm:text-[14.5px] text-[#5F6F82] leading-[1.58] mb-4">
                    {fuel.description}
                  </p>
                </div>

                {/* Bottom Border Accent Indicator */}
                <div className="pt-3 border-t border-[#F0F4F8] flex items-center justify-between text-[12.5px] font-semibold text-[#0759A8] group-hover:text-[#FF7900] transition-colors duration-300">
                  <span className="tracking-wide">ENGINEERED SPECIFICATION</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
