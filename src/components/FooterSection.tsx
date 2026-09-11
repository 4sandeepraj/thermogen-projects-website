import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { ThermogenLogo } from './ThermogenLogo';

export const FooterSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  // Smooth scroll helper for single-page navigation
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback for #contact if clicking inside footer
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const quickLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'OUR TEAM', href: '#team' },
    { name: 'INDUSTRIES', href: '#industries' },
    { name: 'FUELS & UTILITIES', href: '#fuels' },
    { name: 'CUSTOMERS', href: '#customers' },
    { name: 'WHY US', href: '#why-us' },
    { name: 'CONTACT', href: '#contact' },
  ];

  // Strictly the 6 homepage services in exact wording
  const homepageServices = [
    'Combustion System Solutions',
    'Techno-Commercial Feasibility Reports',
    'Engineering Consultancy',
    'Facility Development',
    'High Pressure Gas Decanting Facilities',
    'Industrial Pipeline Works',
  ];

  return (
    <footer
      id="footer"
      aria-label="Footer and Contact Information"
      className="relative z-20 w-full bg-[#031B35] bg-gradient-to-b from-[#041E3A] via-[#031B35] to-[#021428] text-white pt-16 sm:pt-20 lg:pt-24 pb-8 border-t border-white/[0.08] overflow-hidden"
    >
      {/* ========================================================= */}
      {/* SUBTLE INDUSTRIAL ENGINEERING LINE-ART & PIPELINE PATTERN */}
      {/* ========================================================= */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1688E8 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Industrial pipeline schematic watermark */}
      <svg
        className="absolute left-[-40px] bottom-0 w-[540px] h-[320px] pointer-events-none opacity-[0.035] text-[#1688E8]"
        viewBox="0 0 600 360"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M0 280 H 220 V 120 H 420 V 220 H 600" />
        <path d="M0 305 H 245 V 145 H 445 V 245 H 600" />
        <circle cx="220" cy="120" r="10" fill="currentColor" fillOpacity="0.15" />
        <circle cx="420" cy="120" r="10" fill="currentColor" fillOpacity="0.15" />
        <circle cx="420" cy="220" r="10" fill="currentColor" fillOpacity="0.15" />
        <line x1="120" y1="280" x2="120" y2="230" strokeDasharray="3 3" />
        <line x1="320" y1="120" x2="320" y2="70" strokeDasharray="3 3" />
      </svg>

      <div className="relative w-[94%] max-w-[1600px] mx-auto">
        {/* ========================================================= */}
        {/* 4-COLUMN MAIN DESKTOP GRID LAYOUT                         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 xl:gap-12 mb-16 sm:mb-20">
          {/* COLUMN 01 — COMPANY (lg:col-span-4) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-4"
          >
            {/* Official Thermogen Logo */}
            <div className="mb-5 max-w-[220px] sm:max-w-[240px]">
              <ThermogenLogo size="md" />
            </div>

            {/* Concise company positioning */}
            <p className="font-body text-[14.5px] sm:text-[15px] text-white/80 leading-[1.68] mb-5 max-w-[360px]">
              Engineering, Procurement, Installation & Commissioning solutions
              for industrial fuel gas and combustion systems.
            </p>

            {/* Subtle engineering line */}
            <div className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] font-heading font-medium text-[#1688E8] tracking-wide mb-6">
              <span className="w-4 h-[1.5px] bg-[#FF7900]" aria-hidden="true" />
              <span>Engineering Tomorrow’s Energy Infrastructure</span>
            </div>

            {/* Quick Contact Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-white/[0.04] border border-white/10 text-[12.5px] font-medium text-white/70">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" aria-hidden="true" />
              <span>Industrial EPC Excellence Across India</span>
            </div>
          </motion.div>

          {/* COLUMN 02 — QUICK LINKS (lg:col-span-2) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-2 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FF7900]" aria-hidden="true" />
              <h3 className="font-heading text-[15px] font-bold text-white tracking-[0.14em] uppercase">
                QUICK LINKS
              </h3>
            </div>

            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="inline-flex items-center gap-1.5 font-body text-[13.5px] font-medium text-white/75 hover:text-[#1688E8] transition-colors duration-200 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] rounded-sm group"
                  >
                    <span className="text-white/30 group-hover:text-[#FF7900] transition-colors duration-200">
                      ›
                    </span>
                    <span className="tracking-wider">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 03 — OUR SERVICES (lg:col-span-3) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-3 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FF7900]" aria-hidden="true" />
              <h3 className="font-heading text-[15px] font-bold text-white tracking-[0.14em] uppercase">
                OUR SERVICES
              </h3>
            </div>

            <ul className="space-y-2.5">
              {homepageServices.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => handleScrollTo(e, '#services')}
                    className="inline-flex items-start gap-2 font-body text-[13.5px] text-white/75 hover:text-[#1688E8] transition-colors duration-200 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] rounded-sm group leading-snug"
                  >
                    <span className="text-white/30 group-hover:text-[#FF7900] transition-colors duration-200 mt-0.5">
                      ›
                    </span>
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 04 — CONTACT US (lg:col-span-3) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:col-span-3 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FF7900]" aria-hidden="true" />
              <h3 className="font-heading text-[15px] font-bold text-white tracking-[0.14em] uppercase">
                CONTACT US
              </h3>
            </div>

            {/* Company Legal Title */}
            <p className="font-heading font-semibold text-[14px] text-white tracking-wide mb-3">
              THERMOGEN PROJECTS PRIVATE LIMITED
            </p>

            {/* Registered Office with Location Pin */}
            <div className="flex items-start gap-3 text-[13.5px] text-white/75 leading-relaxed mb-4">
              <MapPin className="w-4 h-4 text-[#FF7900] shrink-0 mt-1" aria-hidden="true" />
              <div>
                <span className="block text-[12px] uppercase font-semibold text-white/50 tracking-wider mb-0.5">
                  Registered Office:
                </span>
                <span>
                  Plot No. 802, Bari Co-operative,
                  <br />
                  Bokaro, Jharkhand – 827012
                </span>
              </div>
            </div>

            {/* Official Clickable Email */}
            <div className="flex items-center gap-3 text-[13.5px] mb-3">
              <Mail className="w-4 h-4 text-[#1688E8] shrink-0" aria-hidden="true" />
              <div className="flex flex-col">
                <a
                  href="mailto:info@thermogenprojects.com"
                  className="text-white/80 hover:text-[#1688E8] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7900] rounded-sm"
                >
                  info@thermogenprojects.com
                </a>
              </div>
            </div>

            {/* Official Clickable Phone */}
            <div className="flex items-center gap-3 text-[13.5px]">
              <Phone className="w-4 h-4 text-[#1688E8] shrink-0" aria-hidden="true" />
              <a
                href="tel:+918210775670"
                className="text-white/80 hover:text-[#FF7900] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7900] rounded-sm font-medium"
              >
                +91 82107 75670
              </a>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM CTA — COMPACT INDUSTRIAL BANNER                    */}
        {/* ========================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[14px] sm:rounded-[16px] bg-gradient-to-r from-[#062B52] via-[#052242] to-[#041A33] border border-white/10 p-6 sm:p-8 lg:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.3)] mb-12 sm:mb-14 overflow-hidden"
        >
          {/* Subtle accent glow */}
          <div
            className="absolute -right-20 -top-20 w-64 h-64 bg-[#1688E8]/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
            <div className="max-w-[780px]">
              <h4 className="font-heading font-extrabold text-[18px] sm:text-[21px] lg:text-[23px] text-white tracking-tight leading-snug mb-2">
                LET’S BUILD THE RIGHT ENGINEERING SOLUTION FOR YOUR INDUSTRY
              </h4>
              <p className="font-body text-[14px] sm:text-[15px] text-white/75 leading-relaxed">
                Connect with our team to discuss your industrial fuel gas and
                engineering requirements.
              </p>
            </div>

            {/* GET IN TOUCH CTA Button */}
            <div className="shrink-0 w-full sm:w-auto">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-[6px] sm:rounded-[8px] bg-[#FF7900] hover:bg-[#e06b00] text-white font-heading font-semibold text-[13.5px] sm:text-[14px] tracking-wider uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(255,121,0,0.28)] hover:shadow-[0_6px_22px_rgba(255,121,0,0.38)] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white group"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* THIN HORIZONTAL DIVIDER                                   */}
        {/* ========================================================= */}
        <div className="w-full h-px bg-white/[0.08] mb-7" aria-hidden="true" />

        {/* ========================================================= */}
        {/* BOTTOM COPYRIGHT & LEGAL BAR                              */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] sm:text-[13px] text-white/60 font-body">
          {/* Left: Dynamic Current Year Copyright */}
          <div className="text-center sm:text-left">
            <span>
              © {currentYear} THERMOGEN PROJECTS PRIVATE LIMITED. All Rights Reserved.
            </span>
          </div>

          {/* Right: Clean text legal items (no fake URLs) */}
          <div className="flex items-center gap-6">
            <span className="hover:text-white/90 transition-colors duration-200 cursor-default">
              Privacy Policy
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
            <span className="hover:text-white/90 transition-colors duration-200 cursor-default">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
