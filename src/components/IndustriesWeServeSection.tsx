import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Layers,
  Zap,
  Warehouse,
  FlaskConical,
  Pill,
  Wheat,
  Car,
  Cog,
  Factory,
  Workflow,
  ChevronRight,
} from 'lucide-react';
import { IndustriesEngineeringBackground } from './IndustriesEngineeringBackground';

interface IndustryItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const industriesList: IndustryItem[] = [
  {
    id: 'industry-steel-plants',
    name: 'Steel Plants',
    icon: Layers,
  },
  {
    id: 'industry-power-plants',
    name: 'Power Plants',
    icon: Zap,
  },
  {
    id: 'industry-cement-industries',
    name: 'Cement Industries',
    icon: Warehouse,
  },
  {
    id: 'industry-chemical-industries',
    name: 'Chemical Industries',
    icon: FlaskConical,
  },
  {
    id: 'industry-pharmaceutical-industries',
    name: 'Pharmaceutical Industries',
    icon: Pill,
  },
  {
    id: 'industry-food-processing',
    name: 'Food Processing Industries',
    icon: Wheat,
  },
  {
    id: 'industry-automotive-industries',
    name: 'Automotive Industries',
    icon: Car,
  },
  {
    id: 'industry-engineering-industries',
    name: 'Engineering Industries',
    icon: Cog,
  },
  {
    id: 'industry-manufacturing-facilities',
    name: 'Manufacturing Facilities',
    icon: Factory,
  },
  {
    id: 'industry-process-industries',
    name: 'Process Industries',
    icon: Workflow,
  },
];

export const IndustriesWeServeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="relative z-20 w-full bg-[#F7FAFD] py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-10 xl:px-14 border-t border-[#E3EAF2] overflow-hidden"
    >
      {/* Layered Engineering Background (Blueprint grid, flow curves, nodes, plant silhouettes, ambient glow) */}
      <IndustriesEngineeringBackground />

      <div className="relative z-10 w-[94%] max-w-[1620px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
          {/* ========================================================= */}
          {/* LEFT SIDE: Approximately 40% (lg:col-span-5)              */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            {/* Left Content Header */}
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-7 h-[2.5px] rounded-full bg-[#FF7900]"
                  aria-hidden="true"
                />
                <span className="font-heading text-[13px] sm:text-[14px] font-bold text-[#FF7900] tracking-[0.2em] uppercase">
                  INDUSTRIES WE SERVE
                </span>
              </div>

              {/* Main Heading */}
              <h2
                id="industries-heading"
                className="font-heading text-[32px] sm:text-[40px] lg:text-[45px] xl:text-[48px] font-bold text-[#062B52] leading-[1.14] tracking-tight mb-5"
              >
                Engineering Solutions Across{' '}
                <span className="text-[#1688E8]">Diverse Industrial Sectors</span>
              </h2>

              {/* Factual Introduction from Company Profile */}
              <p className="font-heading font-semibold text-[17px] sm:text-[18px] text-[#062B52] mb-3">
                We provide customized solutions for:
              </p>

              {/* Factual Supporting Statement */}
              <p className="font-body text-[15px] sm:text-[16px] text-[#5F6F82] leading-[1.65] mb-8">
                Customized fuel gas infrastructure, combustion systems, and
                utility solutions engineered to meet the operational demands and
                safety standards of core industrial sectors.
              </p>
            </motion.div>

            {/* Left Industrial Visual: Representative Industrial Infrastructure */}
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }
              }
              className="relative w-full rounded-[20px] overflow-hidden border border-[#E3EAF2] shadow-[0_8px_30px_rgba(6,43,82,0.06)] bg-[#062B52] group"
            >
              <div className="relative h-[240px] sm:h-[280px] lg:h-[310px] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80"
                  alt="Industrial manufacturing and process plant infrastructure"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Deep Navy Technical Overlay with Subtle Atmosphere */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#062B52] via-[#062B52]/60 to-[#041A35]/70 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Subtle Orange Accent Line on Top */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF7900] via-[#FF7900]/70 to-transparent"
                  aria-hidden="true"
                />

                {/* Technical Aesthetic Corner Tag */}
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white/90 pointer-events-none">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full bg-[#FF7900] animate-pulse"
                      aria-hidden="true"
                    />
                    <span className="font-heading text-[12.5px] tracking-wider uppercase font-semibold text-white/90">
                      Industrial Sector Coverage
                    </span>
                  </div>
                  <span className="font-heading text-[12px] text-white/60 tracking-widest font-mono">
                    10 SECTORS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: Approximately 60% (lg:col-span-7)             */}
          {/* 2 COLUMNS × 5 ROWS GRID (EXACTLY 10 INDUSTRIES)          */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-4.5">
              {industriesList.map((industry, index) => {
                const Icon = industry.icon;
                const staggerDelay = index * 0.06; // Smooth staggered reveal

                return (
                  <motion.div
                    key={industry.id}
                    id={industry.id}
                    initial={
                      shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                            delay: staggerDelay,
                          }
                    }
                    className="group relative flex items-center justify-between gap-3 p-4 sm:p-4.5 lg:p-5 rounded-[14px] bg-white/95 backdrop-blur-[2px] border border-[#E2E8F0] shadow-[0_3px_14px_rgba(6,43,82,0.035)] hover:border-[#FF7900]/45 hover:shadow-[0_12px_28px_rgba(6,43,82,0.09)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-default min-h-[72px]"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      {/* Icon Container (36-44px with line icon) */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F0F6FC] group-hover:bg-[#FF7900]/10 flex items-center justify-center text-[#1688E8] group-hover:text-[#FF7900] transition-colors duration-300 ease-out shrink-0">
                        <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={1.8} />
                      </div>

                      {/* Industry Title */}
                      <h3 className="font-heading font-semibold sm:font-bold text-[15.5px] sm:text-[16.5px] text-[#062B52] group-hover:text-[#062B52] transition-colors duration-300 ease-out leading-[1.3]">
                        {industry.name}
                      </h3>
                    </div>

                    {/* Subtle Transition Arrow */}
                    <ChevronRight
                      className="w-4 h-4 text-[#8FA3BC]/50 group-hover:text-[#FF7900] group-hover:translate-x-1 transition-all duration-300 ease-out shrink-0"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
