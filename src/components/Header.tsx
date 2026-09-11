import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThermogenLogo } from './ThermogenLogo';

interface NavItem {
  name: string;
  href: string;
}

// Simplified Desktop Navigation: Exactly 7 items
const DESKTOP_NAV_ITEMS: NavItem[] = [
  { name: 'ABOUT', href: '#about' },
  { name: 'SERVICES', href: '#services' },
  { name: 'OUR TEAM', href: '#team' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'INDUSTRIES', href: '#industries' },
  { name: 'CUSTOMERS', href: '#customers' },
  { name: 'WHY US', href: '#why-us' },
];

// Complete Mobile Navigation: Retains FUELS & UTILITIES for comprehensive access
const MOBILE_NAV_ITEMS: NavItem[] = [
  { name: 'ABOUT', href: '#about' },
  { name: 'SERVICES', href: '#services' },
  { name: 'OUR TEAM', href: '#team' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'INDUSTRIES', href: '#industries' },
  { name: 'FUELS & UTILITIES', href: '#fuels' },
  { name: 'CUSTOMERS', href: '#customers' },
  { name: 'WHY US', href: '#why-us' },
];

// All page sections monitored by ScrollSpy
const TRACKED_SECTIONS: { id: string; name: string }[] = [
  { id: '#about', name: 'ABOUT' },
  { id: '#services', name: 'SERVICES' },
  { id: '#team', name: 'OUR TEAM' },
  { id: '#projects', name: 'PROJECTS' },
  { id: '#industries', name: 'INDUSTRIES' },
  { id: '#fuels', name: 'FUELS & UTILITIES' },
  { id: '#customers', name: 'CUSTOMERS' },
  { id: '#why-us', name: 'WHY US' },
  { id: '#contact', name: 'CONTACT' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // In top hero / home area: no primary text nav item active
      if (window.scrollY < 180) {
        setActiveItem('');
        return;
      }

      const scrollPosition = window.scrollY + 130;
      for (let i = TRACKED_SECTIONS.length - 1; i >= 0; i--) {
        const item = TRACKED_SECTIONS[i];
        const element = document.querySelector(item.id) as HTMLElement | null;
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveItem(item.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    setActiveItem(name);
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveItem('');
    setMobileMenuOpen(false);
    const heroElement = document.querySelector('#home');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out border-b border-white/[0.08] ${
        isScrolled
          ? 'bg-[#061F38]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.30)] h-[76px] xl:h-[82px]'
          : 'bg-[#061F38] h-[88px] xl:h-[94px]'
      }`}
    >
      {/* Centered Max-Width Container: approx 1760px, padding 32–40px desktop */}
      <div className="w-full max-w-[1760px] h-full mx-auto px-6 sm:px-8 xl:px-10 flex items-center justify-between">
        {/* ======================================================= */}
        {/* LEFT: TPPL Logo (Click scrolls smoothly to Home/Top)    */}
        {/* ======================================================= */}
        <div className="shrink-0 flex items-center">
          <ThermogenLogo size="md" onClick={handleLogoClick} />
        </div>

        {/* ======================================================= */}
        {/* CENTER: Primary Desktop Navigation (7 items only)       */}
        {/* ======================================================= */}
        <nav
          id="desktop-navigation"
          aria-label="Primary Navigation"
          className="hidden min-[1150px]:flex flex-1 items-center justify-center pl-14 pr-8 xl:pl-16 xl:pr-10"
        >
          <div className="flex items-center justify-center gap-5 min-[1280px]:gap-6 min-[1440px]:gap-7 min-[1600px]:gap-8 2xl:gap-[34px] flex-nowrap">
            {DESKTOP_NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  id={`nav-link-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  onClick={(e) => handleNavClick(e, item.href, item.name)}
                  className={`group relative py-2 font-body text-[14.5px] min-[1380px]:text-[15px] 2xl:text-[16px] font-semibold tracking-[1px] uppercase whitespace-nowrap transition-colors duration-200 ease-out flex flex-col items-center ${
                    isActive
                      ? 'text-[#FF7A00] font-bold'
                      : 'text-white/85 hover:text-[#FF7A00]'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] rounded-full bg-[#FF7A00]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  ) : (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] rounded-full bg-[#FF7A00] opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* ======================================================= */}
        {/* RIGHT: GET IN TOUCH CTA (Primary Contact Navigation)    */}
        {/* ======================================================= */}
        <div className="hidden min-[1150px]:flex items-center justify-end shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact', 'CONTACT')}
            id="header-get-in-touch-btn"
            className={`group relative flex items-center justify-center w-[138px] 2xl:w-[146px] h-[54px] 2xl:h-[58px] rounded-[7px] border font-body text-[13px] 2xl:text-[13.5px] tracking-[1.3px] font-bold uppercase transition-all duration-200 ease-out hover:shadow-[0_4px_16px_rgba(255,122,0,0.22)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00] whitespace-nowrap select-none ${
              activeItem === 'CONTACT'
                ? 'border-[#FF7A00] text-[#FF7A00] bg-[#FF7A00]/10 shadow-[0_0_12px_rgba(255,122,0,0.25)]'
                : 'border-white/25 hover:border-[#FF7A00] bg-[#0E2B4B] hover:bg-[#FF7A00]/10 text-white hover:text-[#FF7A00]'
            }`}
          >
            <span>GET IN TOUCH</span>
          </a>
        </div>

        {/* ======================================================= */}
        {/* TABLET / MOBILE: Premium Hamburger + "MENU" Label       */}
        {/* ======================================================= */}
        <div className="flex min-[1150px]:hidden items-center">
          <button
            type="button"
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-[6px] border border-white/20 text-white/90 hover:text-[#FF7A00] hover:border-[#FF7A00] hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-5 h-5 text-[#FF7A00]" />
                <span className="font-body text-[12px] font-bold tracking-[1.2px] uppercase text-[#FF7A00]">
                  CLOSE
                </span>
              </>
            ) : (
              <>
                <Menu className="w-5 h-5" />
                <span className="font-body text-[12px] font-bold tracking-[1.2px] uppercase">
                  MENU
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ======================================================= */}
      {/* MOBILE NAVIGATION DRAWER                                */}
      {/* ======================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="min-[1150px]:hidden border-b border-white/10 bg-[#061F38]/98 backdrop-blur-xl overflow-hidden px-6 py-5 shadow-2xl"
          >
            <nav className="flex flex-col space-y-1.5 max-w-md mx-auto">
              {MOBILE_NAV_ITEMS.map((item) => {
                const isActive = activeItem === item.name;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.name)}
                    className={`flex items-center min-h-[46px] py-2.5 px-3.5 rounded-[6px] text-[14px] tracking-[1.2px] uppercase font-body transition-colors ${
                      isActive
                        ? 'text-[#FF7A00] bg-white/[0.06] font-bold border-l-2 border-[#FF7A00]'
                        : 'text-white/85 hover:text-[#FF7A00] hover:bg-white/[0.03] font-medium'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="pt-3 border-t border-white/10 mt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact', 'CONTACT')}
                  className="w-full flex items-center justify-center gap-2 min-h-[48px] py-3.5 rounded-[6px] border border-[#FF7A00]/40 bg-[#0E2B4B] hover:bg-[#FF7A00] text-white font-body text-[13px] tracking-[1.3px] font-bold uppercase transition-all duration-200 group"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FF7A00] group-hover:text-white" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


