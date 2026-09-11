import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin } from 'lucide-react';
import {
  MetalsaLogo,
  SuryaAlloysLogo,
  PaliralLogo,
  RajCeramicsLogo,
  RanchiRefractoriesLogo,
  DadheechiFoodsLogo,
} from './CustomerLogos';

export interface CustomerItem {
  id: string;
  name: string;
  location: string;
  logoComponent: React.ComponentType<{ className?: string }>;
  logoAlt: string;
  initials: string;
}

// STRICTLY THE EXACT 6 SPECIFIED CUSTOMERS IN FACTUAL ORDER
export const CUSTOMERS_DATA: CustomerItem[] = [
  {
    id: 'customer-metalsa',
    name: 'METALSA INDIA PRIVATE LIMITED',
    location: 'Jamshedpur, Jharkhand',
    logoComponent: MetalsaLogo,
    logoAlt: 'Metalsa India Private Limited logo',
    initials: 'MIPL',
  },
  {
    id: 'customer-surya-alloys',
    name: 'SURYA ALLOYS INDUSTRIES LIMITED',
    location: 'Durgapur, West Bengal',
    logoComponent: SuryaAlloysLogo,
    logoAlt: 'Surya Alloys Industries Limited logo',
    initials: 'SAIL',
  },
  {
    id: 'customer-paliral',
    name: 'PALIRAL INDUSTRIES',
    location: 'Ranchi, Jharkhand',
    logoComponent: PaliralLogo,
    logoAlt: 'Paliral Industries logo',
    initials: 'PIL',
  },
  {
    id: 'customer-raj-ceramics',
    name: 'RAJ CERAMICS',
    location: 'Ranchi, Jharkhand',
    logoComponent: RajCeramicsLogo,
    logoAlt: 'Raj Ceramics logo',
    initials: 'RC',
  },
  {
    id: 'customer-ranchi-refractories',
    name: 'RANCHI REFRACTORIES',
    location: 'Ranchi, Jharkhand',
    logoComponent: RanchiRefractoriesLogo,
    logoAlt: 'Ranchi Refractories logo',
    initials: 'RR',
  },
  {
    id: 'customer-dadheechi-foods',
    name: 'DADHEECHI FOODS',
    location: 'Ranchi, Jharkhand',
    logoComponent: DadheechiFoodsLogo,
    logoAlt: 'Dadheechi Foods logo',
    initials: 'DF',
  },
];

export const OurCustomersSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Container & track refs
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // State for interactive indicators
  const [activePaginationDot, setActivePaginationDot] = useState(0);

  // Animation control refs (avoiding React re-renders during 60fps linear slide)
  const offsetRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isTouchingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchLastXRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  const cardStepRef = useRef(330);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Four cloned sets of the 6 customers ensure a truly seamless infinite loop
  const quadCustomers = [
    ...CUSTOMERS_DATA,
    ...CUSTOMERS_DATA,
    ...CUSTOMERS_DATA,
    ...CUSTOMERS_DATA,
  ];

  // Measure card and set widths dynamically for responsive accuracy
  const updateDimensions = useCallback(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector<HTMLElement>('[data-card-index="0"]');
    if (firstCard) {
      const cardRect = firstCard.getBoundingClientRect();
      const gap = 24; // gap-6 is 24px
      const step = cardRect.width + gap;
      cardStepRef.current = step;
      singleSetWidthRef.current = step * CUSTOMERS_DATA.length;
    }
  }, []);

  // Set up resize listener
  useEffect(() => {
    updateDimensions();
    const handleResize = () => {
      updateDimensions();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateDimensions]);

  // Infinite auto-slide loop using requestAnimationFrame
  useEffect(() => {
    if (shouldReduceMotion) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    // Speed: ~40 seconds for one complete cycle of 6 cards
    // 6 cards * ~330px = 1980px -> ~49.5px/sec -> ~0.825px per 60fps frame
    const baseSpeed = 0.8;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Only advance when not hovered or actively touched
      if (!isHoveredRef.current && !isTouchingRef.current) {
        const stepDelta = baseSpeed * (deltaTime / 16.67);
        offsetRef.current += stepDelta;

        const singleSetWidth = singleSetWidthRef.current;
        if (singleSetWidth > 0) {
          // Seamless loop wrap: when offset exceeds one full set, subtract one set width
          if (offsetRef.current >= singleSetWidth * 2) {
            offsetRef.current -= singleSetWidth;
          }
        }
      }

      // Apply transform directly to GPU-accelerated layer
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      // Update pagination dot (grouped into 3 views)
      if (singleSetWidthRef.current > 0) {
        const normalized = (offsetRef.current % singleSetWidthRef.current) / singleSetWidthRef.current;
        const dotIndex = Math.min(2, Math.floor(normalized * 3));
        setActivePaginationDot(dotIndex);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  // Manual Arrow Navigation: Step Left / Right
  const handleManualStep = (direction: 'left' | 'right') => {
    isHoveredRef.current = true;
    const step = cardStepRef.current || 330;
    const singleSetWidth = singleSetWidthRef.current || step * 6;

    if (direction === 'right') {
      offsetRef.current += step;
      if (offsetRef.current >= singleSetWidth * 2) {
        offsetRef.current -= singleSetWidth;
      }
    } else {
      offsetRef.current -= step;
      if (offsetRef.current < singleSetWidth * 0.5) {
        offsetRef.current += singleSetWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }

    // Temporarily pause auto-slide, then smoothly resume after user stops clicking
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isHoveredRef.current = false;
    }, 3000);
  };

  // Pagination Dot Click
  const handlePaginationClick = (dotIndex: number) => {
    isHoveredRef.current = true;
    const singleSetWidth = singleSetWidthRef.current || (cardStepRef.current * 6);
    const targetWithinSet = (dotIndex / 3) * singleSetWidth;
    offsetRef.current = singleSetWidth + targetWithinSet;

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }
    setActivePaginationDot(dotIndex);

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isHoveredRef.current = false;
    }, 3000);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    isTouchingRef.current = true;
    touchStartXRef.current = e.touches[0].clientX;
    touchLastXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchingRef.current) return;
    const currentX = e.touches[0].clientX;
    const deltaX = touchLastXRef.current - currentX;
    touchLastXRef.current = currentX;

    offsetRef.current += deltaX;

    const singleSetWidth = singleSetWidthRef.current;
    if (singleSetWidth > 0) {
      if (offsetRef.current >= singleSetWidth * 2) {
        offsetRef.current -= singleSetWidth;
      } else if (offsetRef.current < singleSetWidth * 0.5) {
        offsetRef.current += singleSetWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isTouchingRef.current = false;
    }, 2000);
  };

  // CTA Smooth Scroll to #contact
  const handlePartnerWithUsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="customers"
      aria-labelledby="customers-heading"
      className="relative z-20 w-full bg-gradient-to-b from-[#F7FAFD] via-white to-[#F4F8FC] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 xl:px-14 border-t border-[#E3EAF2] overflow-hidden"
    >
      {/* ========================================================= */}
      {/* SUBTLE INDUSTRIAL ENGINEERING BACKGROUND LINE-ART & GRID  */}
      {/* ========================================================= */}
      {/* Technical coordinate grid with very faint opacity (0.028) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.028]"
        style={{
          backgroundImage: `linear-gradient(#062B52 1px, transparent 1px), linear-gradient(to right, #062B52 1px, transparent 1px)`,
          backgroundSize: '54px 54px',
        }}
        aria-hidden="true"
      />

      {/* Industrial plant and pipeline engineering silhouette blueprint line-art */}
      <svg
        className="absolute right-[-20px] bottom-[-20px] w-[580px] h-[360px] pointer-events-none opacity-[0.035] text-[#062B52]"
        viewBox="0 0 620 380"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        {/* Pipeline routes */}
        <path d="M40 320 H 220 V 140 H 420 V 240 H 600" />
        <path d="M60 345 H 245 V 165 H 445 V 265 H 600" />
        {/* Valves and flanges */}
        <circle cx="220" cy="140" r="9" fill="currentColor" fillOpacity="0.12" />
        <circle cx="420" cy="140" r="9" fill="currentColor" fillOpacity="0.12" />
        <circle cx="420" cy="240" r="9" fill="currentColor" fillOpacity="0.12" />
        {/* Chimney / plant structure tower lines */}
        <path d="M120 320 V 270 M 150 320 V 250 M 320 140 V 90 M 350 140 V 70 M 520 240 V 190" strokeDasharray="3 3" />
        {/* Distillation column sketch */}
        <rect x="500" y="80" width="45" height="160" rx="6" stroke="currentColor" strokeWidth="1.2" />
        <line x1="500" y1="120" x2="545" y2="120" stroke="currentColor" />
        <line x1="500" y1="160" x2="545" y2="160" stroke="currentColor" />
        <line x1="500" y1="200" x2="545" y2="200" stroke="currentColor" />
      </svg>

      <div className="relative w-[94%] max-w-[1600px] mx-auto">
        {/* ========================================================= */}
        {/* SECTION HEADER & DECORATIVE ELEMENT                       */}
        {/* ========================================================= */}
        <div className="relative mb-12 sm:mb-14 lg:mb-16">
          {/* Subtle Decorative Phrase toward upper/right side */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex items-center gap-2.5 absolute right-0 top-1 text-[#1688E8] opacity-80 pointer-events-none"
          >
            <span className="w-6 h-[1.5px] bg-[#FF7900] rounded-full" aria-hidden="true" />
            <span className="font-heading italic font-semibold text-[13px] tracking-wider text-[#062B52]/70">
              Building Stronger Partnerships
            </span>
          </motion.div>

          <div className="flex flex-col items-center text-center max-w-[940px] mx-auto">
            {/* 1. Eyebrow */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-3.5"
            >
              <span className="w-7 h-[2.5px] rounded-full bg-[#FF7900]" aria-hidden="true" />
              <span className="font-heading text-[13px] sm:text-[14px] font-bold text-[#1688E8] tracking-[0.2em] uppercase">
                OUR CUSTOMERS
              </span>
              <span className="w-7 h-[2.5px] rounded-full bg-[#FF7900]" aria-hidden="true" />
            </motion.div>

            {/* 2. Main Heading: “Trusted by” in Deep Navy, “Leading Industries” in Engineering Blue */}
            <motion.h2
              id="customers-heading"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-heading text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-[#062B52] leading-[1.18] tracking-tight mb-4"
            >
              Trusted by <span className="text-[#1688E8]">Leading Industries</span>
            </motion.h2>

            {/* 3. Supporting Text */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-body text-[15px] sm:text-[16px] lg:text-[16.5px] text-[#5F6F82] leading-[1.65] max-w-[820px]"
            >
              We are privileged to serve leading industrial organizations across
              India by delivering innovative engineering, combustion, and
              industrial gas infrastructure solutions.
            </motion.p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CAROUSEL — GENUINELY HORIZONTALLY AUTO-SLIDING MARQUEE   */}
        {/* ========================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="relative w-full"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
        >
          {/* Navigation Arrow Left (Desktop & Tablet) */}
          <button
            type="button"
            onClick={() => handleManualStep('left')}
            aria-label="Previous customers"
            className="hidden sm:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white border border-[#E3EAF2] text-[#062B52] hover:text-[#FF7900] hover:border-[#FF7900]/50 shadow-[0_4px_16px_rgba(6,43,82,0.08)] hover:shadow-[0_6px_20px_rgba(255,121,0,0.22)] hover:scale-105 active:scale-95 items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900]"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.4} />
          </button>

          {/* Navigation Arrow Right (Desktop & Tablet) */}
          <button
            type="button"
            onClick={() => handleManualStep('right')}
            aria-label="Next customers"
            className="hidden sm:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white border border-[#E3EAF2] text-[#062B52] hover:text-[#FF7900] hover:border-[#FF7900]/50 shadow-[0_4px_16px_rgba(6,43,82,0.08)] hover:shadow-[0_6px_20px_rgba(255,121,0,0.22)] hover:scale-105 active:scale-95 items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900]"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.4} />
          </button>

          {/* Soft Edge Vignettes for Seamless Entry / Exit on Large Screens */}
          <div
            className="hidden md:block absolute left-0 top-0 bottom-0 w-14 lg:w-24 bg-gradient-to-r from-[#F7FAFD] via-[#F7FAFD]/80 to-transparent z-20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="hidden md:block absolute right-0 top-0 bottom-0 w-14 lg:w-24 bg-gradient-to-l from-[#F4F8FC] via-[#F4F8FC]/80 to-transparent z-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Viewport for Continuous Sliding Track */}
          <div
            ref={viewportRef}
            className="w-full overflow-hidden py-4 px-1 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* The Continuously Translated Track */}
            <div
              ref={trackRef}
              className="flex items-stretch gap-6 will-change-transform"
              style={{
                width: 'max-content',
              }}
            >
              {quadCustomers.map((customer, idx) => {
                const Logo = customer.logoComponent;
                const originalIndex = idx % CUSTOMERS_DATA.length;

                return (
                  <div
                    key={`${customer.id}-${idx}`}
                    data-card-index={originalIndex}
                    className="group relative flex flex-col justify-between items-center text-center p-6 sm:p-7 rounded-[16px] bg-white border border-[#E3EAF2] shadow-[0_4px_20px_rgba(6,43,82,0.05)] hover:border-[#1688E8]/40 hover:shadow-[0_12px_28px_rgba(6,43,82,0.09)] hover:-translate-y-1.5 transition-all duration-300 ease-out shrink-0 w-[285px] sm:w-[310px] lg:w-[325px] min-h-[265px]"
                  >
                    {/* Subtle top indicator bar */}
                    <div
                      className="absolute top-0 left-8 right-8 h-[2.5px] bg-transparent group-hover:bg-[#1688E8] transition-colors duration-300 rounded-b-full"
                      aria-hidden="true"
                    />

                    {/* 1. Logo Area: Fixed height (90–120px desktop), object-fit contain, normalized height */}
                    <div className="w-full h-[100px] flex items-center justify-center mb-1 overflow-hidden px-2">
                      <div className="transition-transform duration-300 ease-out group-hover:scale-[1.03] flex items-center justify-center w-full h-full">
                        <Logo />
                      </div>
                    </div>

                    {/* 2. Thin Subtle Divider */}
                    <div className="w-full h-px bg-[#E8EEF5] my-3.5 group-hover:bg-[#DCE7F3] transition-colors duration-300" />

                    {/* 3. Company Name & Location Area */}
                    <div className="w-full flex-1 flex flex-col justify-center items-center">
                      {/* Company Name in Deep Navy, Medium/Semibold, Center aligned */}
                      <h3 className="font-heading font-semibold text-[15px] sm:text-[16px] text-[#062B52] group-hover:text-[#1688E8] transition-colors duration-300 leading-[1.38] mb-2.5 px-1 min-h-[44px] flex items-center justify-center">
                        {customer.name}
                      </h3>

                      {/* 4. Location with small location-pin icon */}
                      <div className="flex items-center justify-center gap-1.5 text-[12px] sm:text-[12.5px] font-medium text-[#6B7C93]">
                        <MapPin className="w-3.5 h-3.5 text-[#1688E8] shrink-0" />
                        <span>{customer.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subtle Pagination Dots */}
          <div
            className="flex items-center justify-center gap-2.5 mt-8"
            aria-label="Carousel pagination"
          >
            {[0, 1, 2].map((dotIdx) => {
              const isActive = dotIdx === activePaginationDot;
              return (
                <button
                  key={`dot-${dotIdx}`}
                  type="button"
                  onClick={() => handlePaginationClick(dotIdx)}
                  aria-label={`Go to customer view ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] ${
                    isActive
                      ? 'w-7 bg-[#FF7900]'
                      : 'w-2 bg-[#D0DFEE] hover:bg-[#A8C7E6]'
                  }`}
                />
              );
            })}
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* 4. CTA & 5. BOTTOM TRUST STATEMENT                       */}
        {/* ========================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-12 sm:mt-14 lg:mt-16 flex flex-col items-center text-center"
        >
          {/* Centered CTA: PARTNER WITH US → */}
          <a
            id="partner-with-us-cta"
            href="#contact"
            onClick={handlePartnerWithUsClick}
            className="inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-[8px] bg-[#062B52] hover:bg-[#FF7900] text-white font-heading font-semibold text-[14.5px] sm:text-[15px] tracking-wider uppercase shadow-[0_4px_16px_rgba(6,43,82,0.12)] hover:shadow-[0_8px_24px_rgba(255,121,0,0.24)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] mb-5"
          >
            <span>PARTNER WITH US</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </a>

          {/* Understated Centered Trust Statement */}
          <p className="font-heading text-[11.5px] sm:text-[12.5px] font-bold text-[#6B7C93] tracking-[0.22em] uppercase max-w-[700px] leading-relaxed">
            BUILDING LONG-TERM PARTNERSHIPS THROUGH TECHNICAL EXCELLENCE
          </p>
        </motion.div>
      </div>
    </section>
  );
};
