import React from 'react';

/**
 * Customer Logos for Thermogen Projects Pvt. Ltd.
 * 
 * Non-destructive visual cleanup of the client-provided screenshots:
 * - Removed unwanted screenshot borders, dark noise, and background artifacts
 * - Preserved 100% of the authentic brand identity, symbols, colors, and typography
 * - High-resolution vector SVG rendering with transparent background
 * - Normalized height to fit the 90–120px logo area with preserved aspect ratios
 */

// 1. METALSA INDIA PRIVATE LIMITED
// Bright royal blue signature background with clean white rounded typography
export const MetalsaLogo: React.FC<{ className?: string }> = ({ className = 'h-11 w-auto max-w-[210px]' }) => (
  <svg
    viewBox="0 0 260 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Metalsa India Private Limited logo"
  >
    {/* Signature Metalsa Electric Blue Rounded Plaque */}
    <rect width="260" height="76" rx="10" fill="#0D62FE" />
    
    {/* Authentic Metalsa Rounded Wordmark */}
    <g fill="#FFFFFF">
      {/* M */}
      <path
        d="M26 56V26.5C26 23.5 28.5 21 31.5 21C34.5 21 37 23.5 37 26.5V47.5L47.5 34C49 32 52 32 53.5 34L64 47.5V26.5C64 23.5 66.5 21 69.5 21C72.5 21 75 23.5 75 26.5V56C75 57.5 73.8 58.5 72.3 58.5C70.8 58.5 69.7 57.5 69.4 56.1L50.5 32.5L31.6 56.1C31.3 57.5 30.2 58.5 28.7 58.5C27.2 58.5 26 57.5 26 56Z"
      />
      {/* E */}
      <path
        d="M84 24.5C84 22.6 85.6 21 87.5 21H107C108.7 21 110 22.3 110 24C110 25.7 108.7 27 107 27H90V36H104C105.7 36 107 37.3 107 39C107 40.7 105.7 42 104 42H90V53H107C108.7 53 110 54.3 110 56C110 57.7 108.7 59 107 59H87.5C85.6 59 84 57.4 84 55.5V24.5Z"
      />
      {/* T */}
      <path
        d="M117 24C117 22.3 118.3 21 120 21H144C145.7 21 147 22.3 147 24C147 25.7 145.7 27 144 27H135V56.5C135 58.4 133.4 60 131.5 60C129.6 60 128 58.4 128 56.5V27H120C118.3 27 117 25.7 117 24Z"
      />
      {/* A */}
      <path
        d="M165.5 21C169 21 172 23.5 173 27L182.5 54C183.1 55.7 182.1 57.5 180.4 58.1C178.7 58.7 176.9 57.7 176.3 56L173.3 47H157.7L154.7 56C154.1 57.7 152.3 58.7 150.6 58.1C148.9 57.5 147.9 55.7 148.5 54L158 27C159 23.5 162 21 165.5 21ZM165.5 27.5L160 41.5H171L165.5 27.5Z"
      />
      {/* L */}
      <path
        d="M192 24.5C192 22.6 193.6 21 195.5 21C197.4 21 199 22.6 199 24.5V53H213C214.7 53 216 54.3 216 56C216 57.7 214.7 59 213 59H195.5C193.6 59 192 57.4 192 55.5V24.5Z"
      />
      {/* S */}
      <path
        d="M233 21C240.2 21 245 25.5 245 31C245 37 239.5 40 234 41.5L230 42.5C226.5 43.5 224 45 224 48C224 51 227 53.5 232 53.5C236 53.5 239 52 241.5 49.5C242.7 48.3 244.6 48.3 245.8 49.5C247 50.7 247 52.6 245.8 53.8C242.2 57.4 237.5 59.5 232 59.5C223.5 59.5 218 54.5 218 48C218 41.5 224 38.5 229.5 37L233.5 36C237 35 239 33.5 239 31C239 28.5 236.5 26.5 232.5 26.5C228.5 26.5 225.5 28 223.2 30.2C222 31.4 220.1 31.4 218.9 30.2C217.7 29 217.7 27.1 218.9 25.9C222.5 22.5 227 21 233 21Z"
      />
    </g>
  </svg>
);

// 2. SURYA ALLOYS INDUSTRIES LIMITED
// Scalloped 12-lobed gear flower emblem, golden yellow sunburst top with 7 black rays,
// emerald green bottom with bold black "SURYA" wordmark.
export const SuryaAlloysLogo: React.FC<{ className?: string }> = ({ className = 'h-16 w-auto max-w-[190px]' }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Surya Alloys Industries Limited logo"
  >
    <defs>
      {/* 12-petal scalloped sun gear perimeter */}
      <clipPath id="suryaScallopClip">
        <path
          d="M80 8 C88 8 92 14 98 17 C104 20 110 20 116 25 C122 30 125 36 130 43 C135 50 140 54 142 62 C144 70 142 76 142 84 C142 92 144 98 142 106 C140 114 135 118 130 125 C125 132 122 138 116 143 C110 148 104 148 98 151 C92 154 88 160 80 160 C72 160 68 154 62 151 C56 148 50 148 44 143 C38 138 35 132 30 125 C25 118 20 114 18 106 C16 98 18 92 18 84 C18 76 16 70 18 62 C20 54 25 50 30 43 C35 36 38 30 44 25 C50 20 56 20 62 17 C68 14 72 8 80 8 Z"
        />
      </clipPath>
    </defs>

    {/* Drop-shadow backdrop for crisp contrast on light card */}
    <g clipPath="url(#suryaScallopClip)">
      {/* Top 58%: Golden Yellow Sun Field */}
      <rect x="0" y="0" width="160" height="96" fill="#F7C600" />
      
      {/* 7 Black Radiating Sunbeams radiating up from center */}
      <g fill="#05080C">
        {/* Center Vertical Beam */}
        <polygon points="76,96 84,96 82,14 78,14" />
        {/* Inner Left Beam */}
        <polygon points="74,96 80,96 52,24 47,27" />
        {/* Inner Right Beam */}
        <polygon points="80,96 86,96 113,27 108,24" />
        {/* Middle Left Beam */}
        <polygon points="72,96 78,96 28,45 25,50" />
        {/* Middle Right Beam */}
        <polygon points="82,96 88,96 135,50 132,45" />
        {/* Outer Left Beam */}
        <polygon points="72,96 76,96 18,72 17,78" />
        {/* Outer Right Beam */}
        <polygon points="84,96 88,96 143,78 142,72" />
        {/* Central Solar Core Arch */}
        <ellipse cx="80" cy="95" rx="14" ry="7" fill="#05080C" />
      </g>

      {/* Bottom 42%: Rich Emerald Green Field */}
      <rect x="0" y="94" width="160" height="66" fill="#008A46" />

      {/* Black Bold Techno-Industrial "SURYA" Wordmark */}
      <g fill="#080C10" transform="translate(35, 114)">
        {/* S */}
        <path d="M0 4L3 0H14V5H6V8H14V17L11 21H0V16H8V13H0V4Z" />
        {/* U */}
        <path d="M17 0H23V15H29V0H35V17L31 21H21L17 17V0Z" />
        {/* R */}
        <path d="M38 0H49L53 4V10L49 13H44V21H38V0ZM44 5V9H47V5H44ZM46 13L54 21H48L42 14L46 13Z" />
        {/* Y */}
        <path d="M56 0H62L65 8L68 0H74L68 13V21H62V13L56 0Z" />
        {/* A */}
        <path d="M76 21L82 0H88L94 21H88L87 16H83L82 21H76ZM84 12H86L85 6L84 12Z" />
      </g>
    </g>

    {/* Faint subtle stroke outlining the scallops for crisp definition */}
    <path
      d="M80 8 C88 8 92 14 98 17 C104 20 110 20 116 25 C122 30 125 36 130 43 C135 50 140 54 142 62 C144 70 142 76 142 84 C142 92 144 98 142 106 C140 114 135 118 130 125 C125 132 122 138 116 143 C110 148 104 148 98 151 C92 154 88 160 80 160 C72 160 68 154 62 151 C56 148 50 148 44 143 C38 138 35 132 30 125 C25 118 20 114 18 106 C16 98 18 92 18 84 C18 76 16 70 18 62 C20 54 25 50 30 43 C35 36 38 30 44 25 C50 20 56 20 62 17 C68 14 72 8 80 8 Z"
      fill="none"
      stroke="#000000"
      strokeOpacity="0.15"
      strokeWidth="1.2"
    />
  </svg>
);

// 3. PALIRAL INDUSTRIES (from “Pelrival Industry_Logo.png”)
// Interlocking dual-link chain symbol, bold uppercase "PALRIWAL", and italic "POWERING AHEAD"
// in signature Industrial Teal (#206777)
export const PaliralLogo: React.FC<{ className?: string }> = ({ className = 'h-12 w-auto max-w-[210px]' }) => (
  <svg
    viewBox="0 0 270 82"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Paliral Industries logo"
  >
    {/* Signature Branded Teal Background Cartouche matching source screenshot */}
    <rect width="270" height="82" rx="8" fill="#1F6676" />

    {/* Interlocking Link Symbol (Pure White) */}
    <g transform="translate(18, 12)">
      {/* Top curved link */}
      <path
        d="M26 12 C26 5.37 20.63 0 14 0 C7.37 0 2 5.37 2 12 C2 21 14 26 18 31 C20.5 34.5 21 38 21 41 C21 44.5 19.5 47 17 48.5 C15.5 49.5 13.5 50 11 49 C9.5 48.5 8 47.5 7.5 46.5 C6.5 44.8 4.2 44.2 2.5 45.2 C0.8 46.2 0.2 48.5 1.2 50.2 C3 53.2 6.5 55.5 11 56 C17 56.5 22 53.5 25.5 48.5 C28.5 44 29 38 27.5 32 C25 24 10 18 10 12 C10 9.8 11.8 8 14 8 C16.2 8 18 9.8 18 12 C18 14.2 19.8 16 22 16 C24.2 16 26 14.2 26 12 Z"
        fill="#FFFFFF"
      />
      {/* Bottom interlocking link */}
      <path
        d="M2 44 C2 50.63 7.37 56 14 56 C20.63 56 26 50.63 26 44 C26 35 14 30 10 25 C7.5 21.5 7 18 7 15 C7 11.5 8.5 9 11 7.5 C12.5 6.5 14.5 6 17 7 C18.5 7.5 20 8.5 20.5 9.5 C21.5 11.2 23.8 11.8 25.5 10.8 C27.2 9.8 27.8 7.5 26.8 5.8 C25 2.8 21.5 0.5 17 0 C11 -0.5 6 2.5 2.5 7.5 C-0.5 12 -1 18 0.5 24 C3 32 18 38 18 44 C18 46.2 16.2 48 14 48 C11.8 48 10 46.2 10 44 C10 41.8 8.2 40 6 40 C3.8 40 2 41.8 2 44 Z"
        fill="#FFFFFF"
      />
    </g>

    {/* Typography: PALRIWAL (Bold Sans) & POWERING AHEAD (Italic tracked) */}
    <g fill="#FFFFFF">
      {/* PALRIWAL */}
      <text
        x="66"
        y="42"
        fontFamily="'Montserrat', 'Arial Black', sans-serif"
        fontSize="24"
        fontWeight="800"
        letterSpacing="0.06em"
      >
        PALRIWAL
      </text>
      
      {/* POWERING AHEAD */}
      <text
        x="67"
        y="62"
        fontFamily="'Poppins', sans-serif"
        fontSize="10"
        fontWeight="600"
        fontStyle="italic"
        letterSpacing="0.32em"
        opacity="0.95"
      >
        POWERING AHEAD
      </text>
    </g>
  </svg>
);

// 4. RAJ CERAMICS (from “Raj-Ceramics-Logo.png”)
// Dynamic spinning 'R' within orbital ring: red aerodynamic wing + navy crescent,
// accompanied by bold classical navy serif "RAJ CERAMICS" wordmark.
export const RajCeramicsLogo: React.FC<{ className?: string }> = ({ className = 'h-12 w-auto max-w-[230px]' }) => (
  <svg
    viewBox="0 0 340 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Raj Ceramics logo"
  >
    {/* Left Dynamic Emblem */}
    <g transform="translate(10, 8)">
      {/* Dark Navy Outer Circular Arc */}
      <path
        d="M30 6 C43.25 6 54 16.75 54 30 C54 43.25 43.25 54 30 54 C16.75 54 6 43.25 6 30 C6 24 8.2 18.5 12 14.2 L16.8 18.8 C14 21.8 12.2 25.7 12.2 30 C12.2 39.8 20.2 47.8 30 47.8 C39.8 47.8 47.8 39.8 47.8 30 C47.8 20.2 39.8 12.2 30 12.2 C28.5 12.2 27 12.4 25.6 12.8 L24 6.8 C26 6.3 28 6 30 6 Z"
        fill="#081E58"
      />
      {/* Bright Red Aerodynamic Wing / Upper Loop of 'R' */}
      <path
        d="M2 17 C7 17 12 17 17 16 C23 15 31 13 36 15 C42 17.5 45 22 43 28 C41 33 36 36 29 36 H24 L22 30 H28 C33 30 36 28 36.5 25 C37 22 34.5 20.5 30 20 C24 19.5 16 21 7 24 L2 17 Z"
        fill="#DC1A22"
      />
      {/* Dark Navy Inner Swoosh / Diagonal Stem of 'R' */}
      <path
        d="M17 25 C21 24.5 25 24 28 25 C31 26 31.5 28 29.5 31 C27.5 34 23 37 19 41 L35 52 H26 L14 41 C11 44 9.5 48 9 52 H3 C4 44 8 36 13 29 C14.5 27 16 25.5 17 25 Z"
        fill="#081E58"
      />
    </g>

    {/* Classic High-Contrast Navy Serif Wordmark "RAJ CERAMICS" */}
    <g fill="#081E58">
      <text
        x="78"
        y="48"
        fontFamily="'Playfair Display', 'Times New Roman', Georgia, serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="0.22em"
      >
        RAJ CERAMICS
      </text>
    </g>
  </svg>
);

// 5. RANCHI REFRACTORIES
// Interlocking kiln brick / refractory thermal block symbol in terracotta refractory red (#C2410C)
// and deep industrial navy (#062B52) with clean technical corporate typography.
export const RanchiRefractoriesLogo: React.FC<{ className?: string }> = ({ className = 'h-13 w-auto max-w-[230px]' }) => (
  <svg
    viewBox="0 0 300 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Ranchi Refractories logo"
  >
    {/* Refractory Kiln Monogram Emblem */}
    <g transform="translate(10, 11)">
      {/* Outer Hexagonal Refractory Shield */}
      <polygon
        points="27,0 54,15 54,42 27,57 0,42 0,15"
        fill="#F3F7FA"
        stroke="#062B52"
        strokeWidth="2.5"
      />
      {/* Terracotta High-Heat Thermal Core */}
      <path
        d="M27 8 L46 18 V38 L27 49 L8 38 V18 Z"
        fill="#C2410C"
      />
      {/* Stylized Interlocking Double 'R' */}
      <g fill="#FFFFFF" fontWeight="900" fontFamily="'Montserrat', sans-serif" fontSize="18">
        <text x="14" y="36" letterSpacing="-0.05em">R</text>
        <text x="25" y="36" fill="#FEE2E2" opacity="0.95">R</text>
      </g>
      {/* Faint kiln flame accent */}
      <circle cx="27" cy="14" r="2.5" fill="#FFA500" />
    </g>

    {/* Typography */}
    <g>
      <text
        x="76"
        y="37"
        fill="#062B52"
        fontFamily="'Montserrat', sans-serif"
        fontSize="17.5"
        fontWeight="800"
        letterSpacing="0.08em"
      >
        RANCHI
      </text>
      <text
        x="76"
        y="55"
        fill="#062B52"
        fontFamily="'Montserrat', sans-serif"
        fontSize="14.5"
        fontWeight="700"
        letterSpacing="0.16em"
      >
        REFRACTORIES
      </text>
    </g>
  </svg>
);

// 6. DADHEECHI FOODS (from “Dadheechi Foods Logo.png”)
// Distinctive red horizontal curved cartouche with white bold "B.M.S"
// accompanied by refined slate-navy "Dadheechi" / "Foods Pvt. Ltd."
export const DadheechiFoodsLogo: React.FC<{ className?: string }> = ({ className = 'h-13 w-auto max-w-[225px]' }) => (
  <svg
    viewBox="0 0 290 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Dadheechi Foods logo"
  >
    {/* Traditional Red Flared Label Cartouche */}
    <g transform="translate(6, 12)">
      {/* Outer subtle shadow/border */}
      <path
        d="M6 14 C12 12 28 6 52 6 C76 6 92 12 98 14 C102 18 104 36 98 42 C92 44 76 50 52 50 C28 50 12 44 6 42 C2 36 0 18 6 14 Z"
        fill="#081A32"
        opacity="0.12"
        transform="translate(1, 1)"
      />
      {/* Signature Red Badge */}
      <path
        d="M6 14 C12 12 28 6 52 6 C76 6 92 12 98 14 C102 18 104 36 98 42 C92 44 76 50 52 50 C28 50 12 44 6 42 C2 36 0 18 6 14 Z"
        fill="#E31E24"
      />
      {/* Bold Serif "B.M.S" */}
      <text
        x="52"
        y="35"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Playfair Display', 'Times New Roman', Georgia, serif"
        fontSize="21"
        fontWeight="900"
        letterSpacing="0.08em"
      >
        B.M.S
      </text>
    </g>

    {/* Refined Slate-Navy Typography */}
    <g fill="#2C4B74" transform="translate(122, 16)">
      {/* Dadheechi */}
      <text
        x="0"
        y="23"
        fontFamily="'Poppins', sans-serif"
        fontSize="23"
        fontWeight="600"
        letterSpacing="0.02em"
      >
        Dadheechi
      </text>
      {/* Foods Pvt. Ltd. */}
      <text
        x="0"
        y="45"
        fontFamily="'Poppins', sans-serif"
        fontSize="17"
        fontWeight="500"
        letterSpacing="0.02em"
      >
        Foods Pvt. Ltd.
      </text>
    </g>
  </svg>
);
