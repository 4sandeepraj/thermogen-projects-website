import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  Users,
  Compass,
  TrendingDown,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
} from 'lucide-react';

interface ReasonItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tag: string;
}

// Strictly the approved seven points from the verified Thermogen profile
const reasonsList: ReasonItem[] = [
  {
    id: 'why-single-point',
    title: 'Single Point Engineering Solution',
    description:
      'Seamless end-to-end management spanning design, engineering, procurement, installation, and commissioning under one roof.',
    icon: Sparkles,
    tag: 'Turnkey EPC',
  },
  {
    id: 'why-experienced-team',
    title: 'Experienced Technical Team',
    description:
      'Specialized engineers and project managers with deep domain expertise in combustion systems, gas handling, and industrial pipelines.',
    icon: Users,
    tag: 'Engineering Talent',
  },
  {
    id: 'why-customized-designs',
    title: 'Customized Engineering Designs',
    description:
      'Tailored engineering layouts and technical designs adapted to specific process parameters, plant layouts, and utility needs.',
    icon: Compass,
    tag: 'Custom Engineering',
  },
  {
    id: 'why-cost-effective',
    title: 'Cost-Effective Project Execution',
    description:
      'Value engineering and optimized procurement strategies that maximize thermal efficiency while controlling project capital outlay.',
    icon: TrendingDown,
    tag: 'Value Engineering',
  },
  {
    id: 'why-safety-compliance',
    title: 'Focus on Safety & Compliance',
    description:
      'Strict adherence to industrial gas safety codes, statutory regulations, and industry-standard operating protocols at every stage.',
    icon: ShieldCheck,
    tag: 'Zero-Compromise Safety',
  },
  {
    id: 'why-timely-delivery',
    title: 'Timely Project Delivery',
    description:
      'Rigorous project management schedules and milestone tracking ensure on-schedule installation and seamless plant handover.',
    icon: Clock,
    tag: 'Milestone Execution',
  },
  {
    id: 'why-quality-assurance',
    title: 'Quality Assurance',
    description:
      'Stringent material testing, certified welding, hydrostatic pressure validation, and multi-stage quality inspections.',
    icon: Award,
    tag: 'Certified Quality',
  },
];

export const WhyChooseUsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="relative z-20 w-full bg-[#F5F8FB] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 xl:px-14 border-t border-[#E3EAF2] overflow-hidden"
    >
      {/* Subtle background industrial pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #062B52 1px, transparent 0)`,
          backgroundSize: '40px 40px',
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
              WHY CHOOSE US
            </span>
            <span className="w-7 h-[2px] rounded-full bg-[#FF7900]" aria-hidden="true" />
          </motion.div>

          <motion.h2
            id="why-us-heading"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-heading text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-[#062B52] leading-[1.18] tracking-tight mb-4"
          >
            Built on Technical Rigor, Safety &amp;{' '}
            <span className="text-[#1688E8]">Proven Execution</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-body text-[15.5px] sm:text-[16.5px] text-[#5F6F82] leading-[1.65] max-w-[720px]"
          >
            Thermogen Projects delivers single-point responsibility for complex fuel gas infrastructure,
            combining rigorous engineering standards with cost-effective, dependable execution.
          </motion.p>
        </div>

        {/* 7 Reasons Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {reasonsList.map((reason, index) => {
            const Icon = reason.icon;
            const isFeatured = index === 0;

            return (
              <motion.div
                key={reason.id}
                id={reason.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.06,
                }}
                className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-[18px] transition-all duration-300 ease-out cursor-default ${
                  isFeatured
                    ? 'bg-gradient-to-br from-[#062B52] to-[#041E3A] text-white border border-[#062B52] shadow-[0_12px_36px_rgba(6,43,82,0.18)] xl:col-span-2'
                    : 'bg-white border border-[#E6EBF2] shadow-[0_2px_12px_rgba(6,43,82,0.03)] hover:border-[#FF7900]/40 hover:shadow-[0_10px_28px_rgba(6,43,82,0.07)] hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Top Bar: Tag & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase ${
                        isFeatured
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-[#F0F6FC] text-[#0759A8] border border-[#1688E8]/20'
                      }`}
                    >
                      {reason.tag}
                    </span>

                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isFeatured
                          ? 'bg-[#1688E8]/20 text-[#1688E8] group-hover:bg-[#FF7900]/20 group-hover:text-[#FF7900]'
                          : 'bg-[#F0F6FC] text-[#1688E8] group-hover:bg-[#FF7900]/10 group-hover:text-[#FF7900]'
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-heading font-bold text-[19px] sm:text-[20px] leading-[1.25] mb-2.5 transition-colors duration-300 ${
                      isFeatured ? 'text-white' : 'text-[#062B52] group-hover:text-[#062B52]'
                    }`}
                  >
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`font-body text-[14px] sm:text-[14.5px] leading-[1.6] ${
                      isFeatured ? 'text-white/80' : 'text-[#5F6F82]'
                    }`}
                  >
                    {reason.description}
                  </p>
                </div>

                {/* Verification Point Indicator */}
                <div
                  className={`mt-6 pt-4 border-t flex items-center gap-2 text-[12.5px] font-semibold ${
                    isFeatured
                      ? 'border-white/10 text-[#FF7900]'
                      : 'border-[#F0F4F8] text-[#0759A8] group-hover:text-[#FF7900]'
                  } transition-colors duration-300`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="tracking-wide">VERIFIED COMMITMENT</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
