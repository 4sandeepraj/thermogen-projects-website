import React from 'react';
import { brandColors } from '../tokens';

export const HeroBackground: React.FC = () => {
  return (
    <div
      id="hero-background-wrapper"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Deep Dominant Navy Gradient Base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 75% 45%, #072e5a 0%, #031B35 55%, #010E1E 100%),
            linear-gradient(180deg, #021429 0%, #031B35 40%, #010D1B 100%)
          `,
        }}
      />

      {/* 2. Technical Engineering Coordinate Grid & Crosshairs */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(7, 89, 168, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(7, 89, 168, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 85%)',
        }}
      />

      {/* 3. Subtle CAD Isometric Cross-hatch Accents */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="technical-dots" width="96" height="96" patternUnits="userSpaceOnUse">
            {/* Fine coordinate crosshairs */}
            <path
              d="M 48 44 L 48 52 M 44 48 L 52 48"
              stroke="#0759A8"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            <circle cx="48" cy="48" r="1" fill="#0759A8" fillOpacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#technical-dots)" />
      </svg>

      {/* 4. Midground Industrial Refinery & Infrastructure Architecture Silhouette */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[65%] opacity-20 filter blur-[1.5px] mix-blend-lighten">
        <svg
          viewBox="0 0 1000 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Vertical Columns and High-Bay Crane Trusses */}
          <line x1="200" y1="0" x2="200" y2="700" stroke="#0759A8" strokeWidth="6" strokeOpacity="0.4" />
          <line x1="500" y1="0" x2="500" y2="700" stroke="#0759A8" strokeWidth="7" strokeOpacity="0.5" />
          <line x1="820" y1="0" x2="820" y2="700" stroke="#0759A8" strokeWidth="6" strokeOpacity="0.4" />
          
          {/* Overhead Horizontal Pipe Racks & Walkways */}
          <line x1="0" y1="120" x2="1000" y2="120" stroke="#0759A8" strokeWidth="4" strokeOpacity="0.3" />
          <line x1="0" y1="145" x2="1000" y2="145" stroke="#0759A8" strokeWidth="3" strokeOpacity="0.25" />
          <line x1="100" y1="260" x2="1000" y2="260" stroke="#062B52" strokeWidth="4" strokeOpacity="0.4" />

          {/* Diagonal Structural Bracing */}
          <line x1="200" y1="0" x2="500" y2="120" stroke="#0759A8" strokeWidth="2" strokeOpacity="0.2" />
          <line x1="500" y1="0" x2="200" y2="120" stroke="#0759A8" strokeWidth="2" strokeOpacity="0.2" />
          <line x1="500" y1="0" x2="820" y2="120" stroke="#0759A8" strokeWidth="2" strokeOpacity="0.2" />
          <line x1="820" y1="0" x2="500" y2="120" stroke="#0759A8" strokeWidth="2" strokeOpacity="0.2" />

          {/* Background Industrial Pipe Loops */}
          <path
            d="M 620 700 L 620 380 Q 620 340 660 340 L 780 340 Q 820 340 820 380 L 820 700"
            stroke="#0759A8"
            strokeWidth="12"
            strokeOpacity="0.3"
            fill="none"
          />
          <path
            d="M 420 700 L 420 220 Q 420 180 460 180 L 560 180 Q 600 180 600 220 L 600 700"
            stroke="#0759A8"
            strokeWidth="10"
            strokeOpacity="0.25"
            fill="none"
          />
        </svg>
      </div>

      {/* 5. Volumetric Engineering Blue Glow (Atmospheric Depth behind equipment) */}
      <div
        className="absolute top-[20%] right-[10%] w-[580px] h-[580px] rounded-full filter blur-[110px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(7, 89, 168, 0.40) 0%, rgba(6, 43, 82, 0.20) 50%, transparent 75%)',
        }}
      />

      {/* 6. Subtle Orange Atmospheric Reflection (Connecting with Brand Orange) */}
      <div
        className="absolute top-[12%] right-[28%] w-[260px] h-[260px] rounded-full filter blur-[85px] opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 121, 0, 0.30) 0%, rgba(255, 121, 0, 0.08) 55%, transparent 80%)',
        }}
      />

      {/* 7. Bottom Edge Blend to prevent harsh cutoffs */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#010D1B] to-transparent opacity-85" />
    </div>
  );
};
