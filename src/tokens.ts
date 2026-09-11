/**
 * Thermogen Projects Pvt. Ltd. Design System Tokens
 * Centralized design tokens for colors, typography, spacing, and animations
 * for consistent reuse across the website.
 */

export const brandColors = {
  // Dominant colors
  navyDeep: '#031B35',
  navyPrimary: '#062B52',
  engineeringBlue: '#0759A8',
  brightEngineeringBlue: '#1688E8',
  brandOrange: '#FF7900',
  white: '#FFFFFF',
  lightBg: '#F5F8FB',

  // Semantic transparencies & accents
  navyGlow: 'rgba(7, 89, 168, 0.28)',
  orangeGlow: 'rgba(255, 121, 0, 0.25)',
  textBodyMuted: 'rgba(255, 255, 255, 0.88)',
  buttonSecondaryBorder: 'rgba(255, 255, 255, 0.45)',
  buttonSecondaryHoverBg: 'rgba(255, 255, 255, 0.12)',
  buttonSecondaryHoverBorder: 'rgba(255, 255, 255, 0.85)',
  gridLine: 'rgba(7, 89, 168, 0.08)',
  divider: 'rgba(255, 255, 255, 0.10)',
} as const;

export const brandTypography = {
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Poppins', sans-serif",
  },
  weights: {
    heading: 800,
    subheading: 700,
    body: 400,
    bodyMedium: 500,
    nav: 500,
    navActive: 600,
  },
  eyebrow: {
    fontSize: '16px',
    fontWeight: 700,
    letterSpacing: '3px',
    textTransform: 'uppercase' as const,
    color: brandColors.brandOrange,
  },
  heading: {
    desktopSize: 'clamp(48px, 3.8vw, 56px)',
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: '-1px',
    highlightColor: brandColors.brightEngineeringBlue,
  },
  description: {
    desktopSize: '18px',
    lineHeight: 1.6,
    maxWidth: '680px',
  },
} as const;

export const heroDimensions = {
  desktop: {
    minHeight: '720px',
    maxHeight: '820px',
    paddingX: 'clamp(32px, 5vw, 100px)',
  },
  tablet: {
    minHeight: '700px',
    paddingX: '32px',
  },
  mobile: {
    minHeight: '720px',
    paddingX: '20px',
  },
} as const;

export const buttonTokens = {
  primary: {
    bg: brandColors.brandOrange,
    text: brandColors.white,
    height: '56px',
    borderRadius: '6px',
    hoverLift: '-3px',
    hoverShadow: '0 8px 24px rgba(255, 121, 0, 0.35)',
  },
  secondary: {
    bg: 'transparent',
    text: brandColors.white,
    border: brandColors.buttonSecondaryBorder,
    height: '56px',
    borderRadius: '6px',
  },
} as const;

export const animationTokens = {
  duration: 0.75,
  ease: [0.16, 1, 0.3, 1], // Cubic-bezier ease-out
  stagger: {
    eyebrow: 0.08,
    heading: 0.2,
    description: 0.35,
    buttons: 0.5,
    equipment: 0.25,
  },
  equipmentFloat: {
    y: [-2, 2, -2],
    duration: 6,
  },
} as const;
