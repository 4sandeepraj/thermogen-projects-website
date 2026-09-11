import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ShieldCheck,
  Leaf,
  Activity,
  Award,
  ArrowRight,
  Handshake,
  Wrench,
} from 'lucide-react';

interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const pillars: Pillar[] = [
  {
    id: 'pillar-innovative',
    title: 'Innovative Engineering',
    description:
      'Applying modern design methodologies to optimize thermal performance and fuel distribution across plants.',
    icon: Wrench,
  },
  {
    id: 'pillar-safety',
    title: 'Safety & Regulatory Adherence',
    description:
      'Uncompromising adherence to statutory codes and safety protocols governing high-pressure industrial gases.',
    icon: ShieldCheck,
  },
  {
    id: 'pillar-sustainability',
    title: 'Sustainability & Cleaner Fuels',
    description:
      'Enabling seamless industrial transition to cleaner energy vectors including Natural Gas, CNG, and Hydrogen.',
    icon: Leaf,
  },
  {
    id: 'pillar-performance',
    title: 'Long-Term Reliability',
    description:
      'Building durable utility infrastructure and establishing collaborative partnerships for sustained operational uptime.',
    icon: Handshake,
  },
];

export const CommitmentCtaSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactElement = document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="commitment"
      aria-labelledby="commitment-heading"
      className="relative z-20 w-full bg-[#031B35] bg-gradient-to-b from-[#041E3A] via-[#031B35] to-[#041B3A] text-white py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 xl:px-14 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Background Subtle Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#1688E8 1px, transparent 1px), linear-gradient(to right, #1688E8 1px, transparent 1px)`,
          backgroundSize: '54px 54px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-[94%] max-w-[1540px] mx-auto">
        {/* Top Header */}
        <div className="flex flex-col items-center text-center max-w-[860px] mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-3.5"
          >
            <span className="w-7 h-[2px] rounded-full bg-[#FF7900]" aria-hidden="true" />
            <span className="font-heading text-[13px] sm:text-[14px] font-bold text-[#FF7900] tracking-[0.2em] uppercase">
              OUR COMMITMENT
            </span>
            <span className="w-7 h-[2px] rounded-full bg-[#FF7900]" aria-hidden="true" />
          </motion.div>

          <motion.h2
            id="commitment-heading"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-heading text-[30px] sm:text-[36px] lg:text-[44px] font-bold text-white leading-[1.16] tracking-tight mb-4"
          >
            Delivering Reliability, Safety &amp;{' '}
            <span className="text-[#1688E8]">Long-Term Engineering Excellence</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-body text-[15.5px] sm:text-[16.5px] text-[#D8E4EE] leading-[1.65] max-w-[740px]"
          >
            At Thermogen Projects, our mission is to deliver innovative engineering solutions that
            enhance plant efficiency, lower environmental emissions, and maintain uncompromised
            operational reliability through long-term client partnerships.
          </motion.p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.08,
                }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-[16px] bg-white/[0.04] border border-white/10 hover:border-[#1688E8]/50 hover:bg-white/[0.06] transition-all duration-300 ease-out min-h-[220px]"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#1688E8]/15 text-[#1688E8] group-hover:bg-[#FF7900]/20 group-hover:text-[#FF7900] flex items-center justify-center mb-5 transition-colors duration-300 shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>

                  <h3 className="font-heading font-bold text-[18px] text-white leading-snug mb-2">
                    {pillar.title}
                  </h3>

                  <p className="font-body text-[14px] text-white/75 leading-[1.6]">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center gap-2 text-[12px] font-semibold text-[#1688E8] group-hover:text-[#FF7900] transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
                  <span className="tracking-wider uppercase">CORE VALUE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Seamless Visual Transition Banner to Contact Section */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[18px] bg-gradient-to-r from-[#062B52] via-[#07386C] to-[#062B52] border border-[#1688E8]/30 p-8 sm:p-10 shadow-[0_16px_48px_rgba(0,0,0,0.35)] overflow-hidden"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
            <div className="max-w-[800px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[12px] font-semibold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Single Point Engineering Solution</span>
              </div>
              <h3 className="font-heading font-extrabold text-[22px] sm:text-[26px] lg:text-[28px] text-white tracking-tight leading-snug mb-2">
                Ready to Discuss Your Fuel Gas Infrastructure Requirements?
              </h3>
              <p className="font-body text-[14.5px] sm:text-[15.5px] text-[#D8E4EE] leading-relaxed">
                Connect with our technical leadership to explore combustion systems, techno-commercial
                feasibility studies, or EPC pipeline installation.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href="#contact"
                onClick={handleScrollToContact}
                id="commitment-cta-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[8px] bg-[#FF7900] hover:bg-[#E06B00] text-white font-heading font-semibold text-[14px] tracking-wider uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(255,121,0,0.35)] hover:shadow-[0_8px_24px_rgba(255,121,0,0.45)] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white group"
              >
                <span>CONNECT WITH OUR TEAM</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
