import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Network,
  Gauge,
  Factory,
  Compass,
  Container,
  SlidersHorizontal,
  ArrowRight,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  image: string;
  fallbackSvg: string;
}

const serviceFallbackSvg = (title: string, accentHex: string) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23041A35"/><stop offset="100%" stop-color="%23020E1E"/></linearGradient><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="%231688E8" stroke-opacity="0.1" stroke-width="1"/></pattern></defs><rect width="900" height="500" fill="url(%23bg)"/><rect width="900" height="500" fill="url(%23grid)"/><circle cx="450" cy="220" r="110" fill="none" stroke="${accentHex}" stroke-width="2" stroke-opacity="0.4"/><line x1="200" y1="220" x2="700" y2="220" stroke="%231688E8" stroke-width="3" stroke-opacity="0.5"/><text x="450" y="380" fill="%23FFFFFF" font-family="system-ui, sans-serif" font-size="18" font-weight="700" letter-spacing="1.5" text-anchor="middle">${title}</text></svg>`;

export const servicesList: ServiceItem[] = [
  {
    id: 'service-pipeline-works',
    title: 'Industrial Pipeline Works',
    description:
      'Design, fabrication, installation, testing and commissioning of industrial fuel gas pipelines and utility networks.',
    icon: Network,
    image: 'Images/INDUSTRIAL PIPELINE WORKS.png',
    fallbackSvg: serviceFallbackSvg('INDUSTRIAL PIPELINE WORKS', '%23FF7900'),
  },
  {
    id: 'service-decanting-facilities',
    title: 'High-Pressure Gas Decanting Facilities',
    description:
      'Design and execution of high-pressure gas decanting facilities with focus on safety, reliability and operational requirements.',
    icon: Gauge,
    image: 'Images/HIGH-PRESSURE GAS DECANTING FACILITIES.png',
    fallbackSvg: serviceFallbackSvg('HIGH-PRESSURE GAS DECANTING', '%231688E8'),
  },
  {
    id: 'service-facility-development',
    title: 'Industrial Facility Development',
    description:
      'End-to-end development of industrial gas facilities covering engineering, procurement, installation and commissioning.',
    icon: Factory,
    image: 'Images/INDUSTRIAL FACILITY DEVELOPMENT.png',
    fallbackSvg: serviceFallbackSvg('INDUSTRIAL FACILITY DEVELOPMENT', '%23FF7900'),
  },
  {
    id: 'service-consultancy-om',
    title: 'Engineering Consultancy & O&M Assistance',
    description:
      'Engineering consultancy for fuel gas infrastructure, utility systems and process integration, along with operation and maintenance assistance.',
    icon: Compass,
    image: 'Images/ENGINEERING CONSULTANCY & O&M ASSISTANCE.png',
    fallbackSvg: serviceFallbackSvg('ENGINEERING CONSULTANCY & O%26M', '%231688E8'),
  },
  {
    id: 'service-cascade-transportation',
    title: 'Gas Cascade Transportation Solutions',
    description:
      'Solutions for handling and transportation of compressed gas through cascade systems for industrial applications.',
    icon: Container,
    image: 'Images/Gas Cascade Transportation Solutions.png',
    fallbackSvg: serviceFallbackSvg('GAS CASCADE TRANSPORTATION', '%23FF7900'),
  },
  {
    id: 'service-commissioning-startup',
    title: 'Commissioning & Start-up Support',
    description:
      'Technical support for commissioning, system start-up and smooth transition to operational readiness.',
    icon: SlidersHorizontal,
    image: 'Images/Commissioning & Start-up Support.png',
    fallbackSvg: serviceFallbackSvg('COMMISSIONING & START-UP SUPPORT', '%231688E8'),
  },
];

export const OurServicesSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="our-services-heading"
      className="relative z-20 w-full bg-[#F5F8FB] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 xl:px-14 border-t border-[#E2E8F0] overflow-hidden"
    >
      {/* Subtle Technical Engineering Blueprint Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#041E3A 1px, transparent 1px), linear-gradient(to right, #041E3A 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative w-[94%] max-w-[1620px] mx-auto">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }
          className="flex flex-col items-center text-center max-w-[940px] mx-auto mb-14 sm:mb-16 lg:mb-18"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-3.5">
            <span className="w-7 h-[2.5px] rounded-full bg-[#FF7900]" aria-hidden="true" />
            <span className="font-heading text-[13px] sm:text-[14px] font-bold text-[#FF7900] tracking-[0.2em] uppercase">
              OUR SERVICES
            </span>
            <span className="w-7 h-[2.5px] rounded-full bg-[#FF7900]" aria-hidden="true" />
          </div>

          {/* Main Heading */}
          <h2
            id="our-services-heading"
            className="font-heading text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#041E3A] leading-[1.2] tracking-tight mb-4"
          >
            Engineering Services for Industrial Fuel Gas Infrastructure
          </h2>

          {/* Concise Supporting Line */}
          <p className="font-body text-[15.5px] sm:text-[16.5px] text-[#526071] leading-[1.65] max-w-[780px]">
            Comprehensive turnkey solutions spanning engineering, procurement,
            installation, and lifecycle operational support for industrial gas systems.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* 3-COLUMN × 2-ROW BALANCED SERVICE CARDS GRID (6 CARDS)     */}
        {/* Row 1: [ Pipeline Works ] [ Decanting ] [ Facility Dev ]  */}
        {/* Row 2: [ Consultancy/O&M] [ Cascade ]   [ Commissioning ] */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {servicesList.map((service, idx) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                        delay: idx * 0.08,
                      }
                }
                className="group flex flex-col justify-between rounded-[16px] bg-white border border-[#E2E8F0] shadow-[0_4px_20px_rgba(6,43,82,0.05)] hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(6,43,82,0.11)] hover:border-[#FF7900]/30 transition-all duration-350 ease-out overflow-hidden h-full"
              >
                <div>
                  {/* Visual Area at Top: 195px height with subtle Deep Navy overlay */}
                  <div className="relative w-full h-[195px] sm:h-[205px] overflow-hidden bg-[#041E3A]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center transition-transform duration-350 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const srcWithSlash = service.image.startsWith('/')
                          ? service.image
                          : `/${service.image}`;
                        if (!target.dataset.triedSlash) {
                          target.dataset.triedSlash = 'true';
                          target.src = srcWithSlash;
                        } else if (!target.dataset.triedEncoded) {
                          target.dataset.triedEncoded = 'true';
                          target.src = encodeURI(srcWithSlash);
                        } else {
                          target.onerror = null;
                          target.src = service.fallbackSvg;
                        }
                      }}
                    />

                    {/* Subtle Deep Navy technical overlay - keeping photograph clearly visible */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#041E3A]/70 via-[#041E3A]/25 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-[#041E3A]/60"
                      aria-hidden="true"
                    />

                    {/* Technical Line Icon Badge: Minimal, professional, Engineering Orange */}
                    <div
                      className="absolute bottom-4 left-6 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-sm border border-[#E2E8F0] shadow-md flex items-center justify-center text-[#FF7900] group-hover:border-[#FF7900]/50 group-hover:scale-105 transition-all duration-350 ease-out"
                      aria-hidden="true"
                    >
                      <Icon className="w-5 h-5 text-[#FF7900]" strokeWidth={1.9} />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    {/* Service Title: Deep Navy, Bold, 20-23px, clean typography */}
                    <h3 className="font-heading font-bold text-[20px] sm:text-[21px] lg:text-[22px] text-[#041E3A] group-hover:text-[#1688E8] transition-colors duration-300 leading-[1.3] mb-3 min-h-[56px] flex items-start">
                      {service.title}
                    </h3>

                    {/* Short Description: Muted dark gray, 15-16px, comfortable line height */}
                    <p className="font-body text-[15px] sm:text-[15.5px] text-[#526071] leading-[1.65]">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Minimal "EXPLORE SERVICE →" link at bottom with touch-friendly target */}
                <div className="px-6 sm:px-7 pb-6 pt-0">
                  <div className="pt-4 border-t border-[#F1F5F9] flex items-center">
                    <a
                      href="#contact"
                      className="group/link inline-flex items-center gap-2 py-2 text-[13px] sm:text-[13.5px] font-bold text-[#041E3A] tracking-wider uppercase group-hover:text-[#FF7900] transition-colors duration-300 min-h-[44px]"
                      aria-label={`Explore service: ${service.title}`}
                    >
                      <span>EXPLORE SERVICE</span>
                      <ArrowRight className="w-4 h-4 text-[#FF7900] transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* BOTTOM SECTION CTA                                        */}
        {/* ========================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }
          }
          className="mt-14 sm:mt-16 flex justify-center"
        >
          <a
            id="our-services-cta"
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#041E3A] hover:bg-[#FF7900] text-white font-heading font-semibold text-[15px] tracking-wide shadow-[0_6px_20px_rgba(4,30,58,0.12)] hover:shadow-[0_8px_24px_rgba(255,121,0,0.22)] hover:-translate-y-0.5 transition-all duration-300 ease-out group"
          >
            <span>DISCUSS YOUR PROJECT REQUIREMENTS</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
