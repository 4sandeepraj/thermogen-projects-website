import React from 'react';
import { brandColors } from '../tokens';

interface ThermogenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const ThermogenLogo: React.FC<ThermogenLogoProps> = ({
  className = '',
  size = 'md',
  onClick,
}) => {
  // Dimensions based on size
  const iconSizes = {
    sm: { w: 36, h: 36 },
    md: { w: 44, h: 44 },
    lg: { w: 56, h: 56 },
  };

  const { w, h } = iconSizes[size];

  // Mathematical SVG Paths strictly derived from Logo.png on 1000x1000 grid
  // Blue Piece 1: Top Umbrella 'T' with Center Stem
  const pathT =
    'M 166 148 H 834 A 18 18 0 0 1 852 166 V 242 A 18 18 0 0 1 834 260 H 542 V 822 A 14 14 0 0 1 528 836 H 472 A 14 14 0 0 1 458 822 V 260 H 166 A 18 18 0 0 1 148 242 V 166 A 18 18 0 0 1 166 148 Z';

  // Blue Piece 2: Middle-Left Inverted-L Shape
  const pathL =
    'M 166 296 H 416 A 18 18 0 0 1 434 314 V 822 A 14 14 0 0 1 420 836 H 364 A 14 14 0 0 1 350 822 V 418 A 10 10 0 0 0 340 408 H 166 A 18 18 0 0 1 148 390 V 314 A 18 18 0 0 1 166 296 Z';

  // Blue Piece 3: Leftmost Vertical Pillar
  const pathP =
    'M 256 440 H 312 A 14 14 0 0 1 326 454 V 822 A 14 14 0 0 1 312 836 H 256 A 14 14 0 0 1 242 822 V 454 A 14 14 0 0 1 256 440 Z';

  // Orange Piece 1: Upper and Left Body of G
  const pathG1 =
    'M 584 296 H 834 A 18 18 0 0 1 852 314 V 390 A 18 18 0 0 1 834 408 H 660 A 10 10 0 0 0 650 418 V 574 A 10 10 0 0 1 660 584 H 744 A 14 14 0 0 1 758 598 V 822 A 14 14 0 0 1 744 836 H 580 A 14 14 0 0 1 566 822 V 314 A 18 18 0 0 1 584 296 Z';

  // Orange Piece 2: Crossbar and Right Spur of G
  const pathG2 =
    'M 688 432 H 834 A 18 18 0 0 1 852 450 V 822 A 14 14 0 0 1 838 836 H 796 A 14 14 0 0 1 782 822 V 570 A 10 10 0 0 0 772 560 H 688 A 14 14 0 0 1 674 546 V 446 A 14 14 0 0 1 688 432 Z';

  return (
    <a
      href="#home"
      id="brand-logo-link"
      onClick={onClick}
      className={`group flex items-center gap-3 select-none no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] rounded-sm ${className}`}
      aria-label="Thermogen Projects Pvt. Ltd. - Home"
    >
      {/* Brand Icon — 3D Vector TG Monogram matching Logo.png */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={w}
          height={h}
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
          aria-label="Thermogen TG 3D Symbol"
        >
          <defs>
            {/* Blue Front Face Gradient */}
            <linearGradient id="tg-blue-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0096FF" />
              <stop offset="45%" stopColor="#007EE5" />
              <stop offset="100%" stopColor="#0066D6" />
            </linearGradient>

            {/* Blue Chamfer / Bevel Inset Highlight */}
            <linearGradient id="tg-blue-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#80C8FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#005CB8" stopOpacity="0.4" />
            </linearGradient>

            {/* Orange Front Face Gradient */}
            <linearGradient id="tg-orange-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA126" />
              <stop offset="40%" stopColor="#FF7E00" />
              <stop offset="100%" stopColor="#E65800" />
            </linearGradient>

            {/* Orange Chamfer / Bevel Inset Highlight */}
            <linearGradient id="tg-orange-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD38A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#BD4000" stopOpacity="0.4" />
            </linearGradient>

            {/* Ambient Occlusion & Base Shadow */}
            <filter id="tg-depth-shadow" x="-10%" y="-10%" width="125%" height="125%">
              <feDropShadow dx="6" dy="14" stdDeviation="12" floodColor="#010D1A" floodOpacity="0.45" />
            </filter>
          </defs>

          <g filter="url(#tg-depth-shadow)">
            {/* 3D Extrusion Depth Layers (Blue & Orange side depth) */}
            {/* Layer 3 (deepest) */}
            <g transform="translate(12, 18)">
              <path d={pathT} fill="#00356E" />
              <path d={pathL} fill="#00356E" />
              <path d={pathP} fill="#00356E" />
              <path d={pathG1} fill="#7A2800" />
              <path d={pathG2} fill="#7A2800" />
            </g>
            {/* Layer 2 (mid depth) */}
            <g transform="translate(8, 12)">
              <path d={pathT} fill="#00448C" />
              <path d={pathL} fill="#00448C" />
              <path d={pathP} fill="#00448C" />
              <path d={pathG1} fill="#943300" />
              <path d={pathG2} fill="#943300" />
            </g>
            {/* Layer 1 (near depth) */}
            <g transform="translate(4, 6)">
              <path d={pathT} fill="#0054AB" />
              <path d={pathL} fill="#0054AB" />
              <path d={pathP} fill="#0054AB" />
              <path d={pathG1} fill="#B33E00" />
              <path d={pathG2} fill="#B33E00" />
            </g>

            {/* BLUE FRONT FACES (T Components) */}
            <g
              fill="url(#tg-blue-front)"
              stroke="url(#tg-blue-highlight)"
              strokeWidth="4"
              strokeLinejoin="round"
            >
              <path d={pathT} />
              <path d={pathL} />
              <path d={pathP} />
            </g>

            {/* ORANGE FRONT FACES (G Components) */}
            <g
              fill="url(#tg-orange-front)"
              stroke="url(#tg-orange-highlight)"
              strokeWidth="4"
              strokeLinejoin="round"
            >
              <path d={pathG1} />
              <path d={pathG2} />
            </g>
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className="font-heading tracking-[0.04em] font-extrabold text-white text-[16px] sm:text-[18px] lg:text-[19px] uppercase"
            style={{ fontWeight: 800 }}
          >
            Thermogen
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: brandColors.brandOrange }}
            aria-hidden="true"
          />
        </div>
        <span
          className="font-body text-[9.5px] sm:text-[10.5px] tracking-[0.2em] font-medium text-white/70 uppercase"
          style={{ letterSpacing: '0.2em' }}
        >
          Projects Pvt. Ltd.
        </span>
      </div>
    </a>
  );
};
