import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { getAssetUrl } from '../utils/assetPath';
import {
  Flame,
  FileSearch,
  Compass,
  Factory,
  Gauge,
  Container,
  Workflow,
  Zap,
  PlayCircle,
  Settings,
  ArrowRight,
} from 'lucide-react';

interface ExpertiseItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const expertiseList: ExpertiseItem[] = [
  {
    id: 'exp-combustion',
    title: 'Industrial Combustion Systems',
    icon: Flame,
  },
  {
    id: 'exp-feasibility',
    title: 'Techno-Commercial Feasibility Studies',
    icon: FileSearch,
  },
  {
    id: 'exp-consultancy',
    title: 'Engineering Consultancy',
    icon: Compass,
  },
  {
    id: 'exp-facility',
    title: 'Facility Development',
    icon: Factory,
  },
  {
    id: 'exp-gas-handling',
    title: 'High Pressure Gas Handling Systems',
    icon: Gauge,
  },
  {
    id: 'exp-decanting',
    title: 'Decanting Facilities',
    icon: Container,
  },
  {
    id: 'exp-pipeline',
    title: 'Pipeline Design & Installation',
    icon: Workflow,
  },
  {
    id: 'exp-utility',
    title: 'Utility Engineering',
    icon: Zap,
  },
  {
    id: 'exp-commissioning',
    title: 'Commissioning & Start-up Support',
    icon: PlayCircle,
  },
  {
    id: 'exp-maintenance',
    title: 'Operation & Maintenance Assistance',
    icon: Settings,
  },
];

export const WhoWeAreSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [imgLoadError, setImgLoadError] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="who-we-are-heading"
      className="relative z-20 w-full bg-white py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 xl:px-14 border-t border-[#E6EBF2]"
    >
      <div className="w-[94%] max-w-[1620px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-stretch">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Industrial Engineering Visual (~42-45% on lg)*/}
          {/* ========================================================= */}
          <motion.div
            id="who-we-are-visual-column"
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
            }
            className="order-1 lg:col-span-5 xl:col-span-5 w-full flex flex-col justify-center"
          >
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[470px] xl:min-h-[490px] rounded-[24px] overflow-hidden border border-[#E6EBF2] bg-[#F4F7FA] shadow-[0_12px_36px_-8px_rgba(6,43,82,0.1)] group">
              {/* Representative Industrial Fuel Gas & Combustion Engineering Equipment Visual */}
              {!imgLoadError ? (
                <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[470px] xl:min-h-[490px] overflow-hidden">
                  <img
                    src={getAssetUrl('Images/ChatGPT Image Sep 9, 2026, 02_24_24 PM.png')}
                    alt="Thermogen combustion engineering solutions and industrial gas facilities"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('who-we-are-chatgpt')) {
                        target.src = getAssetUrl('Images/who-we-are-chatgpt.png');
                      } else if (!target.src.includes('who-we-are-engineers')) {
                        target.src = getAssetUrl('Images/who-we-are-engineers.jpg');
                      } else {
                        setImgLoadError(true);
                      }
                    }}
                  />
                  {/* Subtle technical gradient overlay to integrate with engineering theme */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#062B52]/20 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                /* Pure Technical Architectural SVG Fallback if remote image is blocked */
                <div className="relative w-full h-full min-h-[380px] bg-gradient-to-br from-[#062B52] to-[#041A35] p-8 flex flex-col justify-center items-center text-white">
                  <div className="w-16 h-16 rounded-2xl bg-[#1688E8]/20 border border-[#1688E8]/40 flex items-center justify-center text-[#1688E8] mb-4">
                    <Factory className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white mb-2 text-center">
                    Industrial Fuel Gas Infrastructure
                  </h4>
                  <p className="font-body text-xs text-[#8AA2BC] text-center max-w-[280px]">
                    Combustion engineering, high-pressure gas handling, and industrial utility installations.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Content + Documented Expertise (~55-58% on lg) */}
          {/* ========================================================= */}
          <div className="order-2 lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* Section Eyebrow */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }
              }
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-7 h-[2.5px] rounded-full bg-[#FF7900]" aria-hidden="true" />
              <span className="font-heading text-[13px] sm:text-[14px] font-bold text-[#FF7900] tracking-[0.2em] uppercase">
                WHO WE ARE
              </span>
            </motion.div>

            {/* Main Section Heading */}
            <motion.h2
              id="who-we-are-heading"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }
              }
              className="font-heading text-[32px] sm:text-[38px] lg:text-[44px] xl:text-[46px] font-bold text-[#062B52] leading-[1.15] tracking-tight mb-6"
            >
              Engineering Solutions for{' '}
              <span className="text-[#1688E8]">
                Industrial Fuel Gas & Combustion Systems
              </span>
            </motion.h2>

            {/* Three Paragraphs Strictly From Official Company Profile */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.25 }
              }
              className="space-y-4 font-body text-[15.5px] sm:text-[16.5px] lg:text-[17px] text-[#5F6F82] leading-[1.65] max-w-[780px]"
            >
              <p>
                <strong className="text-[#062B52] font-semibold">
                  THERMOGEN PROJECTS PRIVATE LIMITED (TPPL)
                </strong>{' '}
                is a specialized engineering company providing end-to-end solutions for
                industrial fuel gas and combustion systems. We serve as a single-point
                solution provider for industries seeking reliable, efficient, and
                sustainable fuel infrastructure.
              </p>

              <p>
                With extensive expertise in combustion engineering, gas handling
                systems, and industrial utility development, we deliver complete
                engineering, consultancy, procurement, installation, commissioning,
                and project management services.
              </p>

              <p>
                Our solutions are designed to improve operational efficiency, ensure
                safety, optimize fuel consumption, and support industries in adopting
                cleaner energy alternatives.
              </p>
            </motion.div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* ENGINEERING CAPABILITY MATRIX: "OUR EXPERTISE" (5x2 Grid Desktop)   */}
        {/* Strictly 5 columns x 2 rows on desktop (Max 1400px)                 */}
        {/* =================================================================== */}
        <div
          id="our-expertise-section"
          className="relative w-full max-w-[1400px] mx-auto mt-14 sm:mt-16 pt-14 sm:pt-16 pb-12 sm:pb-14 border-t border-[#DCE7F2]"
        >
          {/* Subtle Technical Engineering Blueprint Grid Background (3-4% opacity) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #1688E8 1px, transparent 1px),
                linear-gradient(to bottom, #1688E8 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #082E57 1.5px, transparent 1.5px),
                linear-gradient(to bottom, #082E57 1.5px, transparent 1.5px)
              `,
              backgroundSize: '96px 96px',
            }}
            aria-hidden="true"
          />

          {/* Centered Heading Area */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
            className="relative flex flex-col items-center text-center mb-7 sm:mb-8"
          >
            {/* Small Eyebrow: OUR EXPERTISE with Orange Engineering Accent Lines */}
            <div className="flex items-center gap-2.5 mb-2 sm:mb-2.5">
              <span className="w-5 h-[2px] rounded-full bg-[#FF7A00]" aria-hidden="true" />
              <span className="font-heading text-[12px] sm:text-[12.5px] font-bold text-[#FF7A00] tracking-[0.2em] uppercase">
                OUR EXPERTISE
              </span>
              <span className="w-5 h-[2px] rounded-full bg-[#FF7A00]" aria-hidden="true" />
            </div>

            {/* Main Heading: 34-40px Desktop, Deep Navy #082E57 with #1688E8 Highlight */}
            <h3 className="font-heading text-[26px] sm:text-[32px] lg:text-[36px] xl:text-[38px] font-bold text-[#082E57] tracking-tight leading-[1.2] max-w-[880px] mx-auto mb-2 sm:mb-2.5">
              Engineering Expertise Across{' '}
              <span className="text-[#1688E8]">Industrial Gas & Combustion Systems</span>
            </h3>

            {/* Subheading: 10 CORE ENGINEERING DISCIPLINES */}
            <p className="font-heading text-[11.5px] sm:text-[12px] font-semibold text-[#6B8299] tracking-[0.2em] uppercase">
              10 CORE ENGINEERING DISCIPLINES
            </p>
          </motion.div>

          {/* 5-Column x 2-Row Capability Matrix on Desktop (>= 1024px / 1200px) */}
          <div
            id="expertise-capability-matrix"
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 xl:gap-4 expertise-5-col-grid"
          >
            {expertiseList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  id={item.id}
                  initial={
                    shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                          delay: idx * 0.03,
                        }
                  }
                  className="group flex items-center gap-3.5 p-4 sm:p-5 xl:p-[21px] rounded-[14px] bg-white border border-[#DCE7F2] shadow-[0_2px_8px_rgba(8,46,87,0.03)] hover:border-[#1688E8]/50 hover:shadow-[0_6px_18px_rgba(22,136,232,0.12)] hover:-translate-y-[2px] transition-all duration-200 ease-out cursor-default h-[108px] sm:h-[110px] xl:h-[112px]"
                >
                  {/* Left: Compact Icon Container 42-44px, Background #F0F7FE, Icon #1688E8 */}
                  <div className="w-[42px] h-[42px] xl:w-[44px] xl:h-[44px] rounded-[10px] bg-[#F0F7FE] group-hover:bg-[#1688E8]/12 flex items-center justify-center shrink-0 text-[#1688E8] transition-colors duration-200 ease-out">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>

                  {/* Right: Title in Deep Navy #082E57, Weight 650-700, Max 2 Lines */}
                  <span className="font-heading text-[14.5px] sm:text-[15px] xl:text-[15.5px] font-bold text-[#082E57] leading-[1.25] flex-1 line-clamp-2">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Compact Integrated Horizontal Footer Row: [ Single Point Engineering Solution ] [ EXPLORE OUR SERVICES → ] */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 }
            }
            className="relative mt-7 sm:mt-8 pt-6 sm:pt-7 border-t border-[#DCE7F2] flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
          >
            {/* Left: Small premium pill */}
            <div
              id="single-point-engineering-highlight"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F0F7FE] border border-[#DCE7F2] text-[#082E57] text-[13px] sm:text-[13.5px] font-semibold tracking-wide"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF7A00]" aria-hidden="true" />
              <span>Single Point Engineering Solution</span>
            </div>

            {/* Right: Dark navy CTA button */}
            <a
              id="who-we-are-cta"
              href="#services"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-[#082E57] hover:bg-[#1688E8] text-white font-heading font-semibold text-[13.5px] sm:text-[14px] tracking-wide shadow-sm hover:shadow-[0_4px_16px_rgba(22,136,232,0.25)] hover:-translate-y-0.5 transition-all duration-200 ease-out group"
            >
              <span>EXPLORE OUR SERVICES</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
