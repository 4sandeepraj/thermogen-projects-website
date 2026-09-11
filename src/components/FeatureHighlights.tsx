import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, Users, Handshake } from 'lucide-react';

/**
 * Crossed Wrench & Screwdriver engineering tool icon
 * Precision-crafted with standard 24x24 viewBox and 1.75 stroke-width
 * to match Lucide engineering line icon styling.
 */
const CrossedToolsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Screwdriver crossing along top-left to bottom-right diagonal */}
    <path d="m4.5 7.5 3-3" />
    <path d="M3 6a1.5 1.5 0 0 1 1.5-1.5L6 3a1.5 1.5 0 0 1 2 2l-1.5 1.5" />
    <path d="m7 7 3.5 3.5" />
    <path d="m13.5 13.5 4 4" />
    <path d="m17 18 2 2" />

    {/* Wrench crossing along top-right to bottom-left diagonal */}
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: FeatureItem[] = [
  {
    id: 'feature-engineering-excellence',
    title: 'Engineering Excellence',
    description: 'Reliable engineering solutions tailored to industrial fuel gas infrastructure.',
    icon: CrossedToolsIcon,
  },
  {
    id: 'feature-safety-first',
    title: 'Safety First',
    description: 'Safety Integrated Into Every Solution',
    icon: ShieldCheck,
  },
  {
    id: 'feature-experienced-team',
    title: 'Experienced Team',
    description: 'Expert engineers and skilled professionals delivering excellence with every project.',
    icon: Users,
  },
  {
    id: 'feature-end-to-end-solutions',
    title: 'End-to-End Solutions',
    description: 'Complete EPC solutions from concept, design, procurement, installation, to commissioning',
    icon: Handshake,
  },
];

export const FeatureHighlights: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      aria-label="Core Engineering Capabilities"
      className="relative z-30 w-full bg-white py-10 sm:py-12 lg:py-14 px-3 sm:px-6 lg:px-8"
    >
      {/* Spacious 92-96% Width Container with Max 1620px */}
      <div className="w-[94%] max-w-[1620px] mx-auto">
        {/* White Industrial Feature Panel */}
        <motion.div
          id="feature-highlights-panel"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
          className="relative w-full rounded-[22px] sm:rounded-[24px] bg-white border border-[#E6EBF2] shadow-[0_12px_40px_-10px_rgba(6,43,82,0.08),0_2px_12px_rgba(6,43,82,0.03)] py-7 sm:py-8 lg:py-8 px-5 sm:px-7 lg:px-8 xl:px-10"
        >
          {/* 4 Feature Items Grid - Equal 25% Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0">
            {features.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={item.id}
                  id={item.id}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay: index * 0.1, // 0ms, 100ms, 200ms, 300ms stagger
                        }
                  }
                  className={`group relative flex items-start gap-4 lg:gap-4.5 p-3.5 sm:p-4 rounded-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#FF7900]/[0.025] cursor-default ${
                    // Desktop (lg) vertical separators and horizontal spacing
                    index !== features.length - 1
                      ? 'lg:border-r lg:border-[#E6EBF2] lg:pr-6 xl:pr-8'
                      : ''
                  } ${
                    index !== 0 ? 'lg:pl-6 xl:pl-8' : ''
                  } ${
                    // Tablet (md) 2x2 grid separators
                    index === 0
                      ? 'md:border-r md:border-b md:border-[#E6EBF2] md:pr-6 md:pb-6'
                      : index === 1
                      ? 'md:border-b md:border-[#E6EBF2] md:pl-6 md:pb-6'
                      : index === 2
                      ? 'md:border-r md:border-[#E6EBF2] md:pr-6 md:pt-6'
                      : 'md:pl-6 md:pt-6'
                  } ${
                    // Reset borders on large screens where desktop rules apply
                    'lg:border-b-0 lg:pb-0 lg:pt-0'
                  }`}
                >
                  {/* Icon on Left with hover color shift, glow, and accent line */}
                  <div className="relative shrink-0 text-[#1688E8] group-hover:text-[#FF7900] transition-colors duration-300 ease-out pt-0.5">
                    <div className="w-[42px] h-[42px] lg:w-[46px] lg:h-[46px] flex items-center justify-center">
                      <IconComponent className="w-full h-full transition-all duration-300 ease-out group-hover:drop-shadow-[0_0_12px_rgba(255,121,0,0.4)]" />
                    </div>
                    {/* Subtle Orange Accent Glow Line Underneath Icon */}
                    <span
                      className="block mx-auto mt-2 w-0 h-[2px] rounded-full bg-[#FF7900] opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-300 ease-out"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Text on Right */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-[18px] lg:text-[19px] xl:text-[20px] text-[#062B52] leading-[1.25] mb-2 transition-colors duration-300 ease-out group-hover:text-[#FF7900] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-body text-[14px] lg:text-[14.5px] xl:text-[15px] text-[#66758A] leading-[1.5] transition-colors duration-300 ease-out group-hover:text-[#25384D] font-normal">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
