import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { animationTokens } from '../tokens';

export const HeroEquipment: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [imgLoadFailed, setImgLoadFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      id="hero-equipment-container"
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: 50, scale: 0.96 }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, x: 0, scale: 1 }
      }
      transition={{
        duration: animationTokens.duration,
        delay: animationTokens.stagger.equipment,
        ease: animationTokens.ease,
      }}
      className="relative z-20 w-full flex items-center justify-center lg:justify-end"
    >
      {/* Floating wrapper for extremely subtle continuous 2-4px movement */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : { y: [-2, 2, -2] }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full max-w-[760px] xl:max-w-[840px] 2xl:max-w-[920px] transition-all"
      >
        {/* Subtle Ambient Depth Glow around Equipment */}
        <div
          className="absolute -inset-4 sm:-inset-8 rounded-2xl filter blur-2xl opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(7, 89, 168, 0.35) 0%, rgba(255, 121, 0, 0.08) 70%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Primary Attempt: Load local PRS IMAGE.png if provided */}
        {!imgLoadFailed && (
          <div className="relative w-full overflow-hidden rounded-lg">
            <img
              src="/PRS IMAGE.png"
              alt="Industrial Gas Pressure Regulating Skid (PRS Skid) with stainless steel piping, precision regulators, valves, and skid frame engineered by Thermogen Projects"
              className={`w-full h-auto object-contain transition-opacity duration-500 drop-shadow-[0_20px_40px_rgba(1,14,30,0.85)] ${
                imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoadFailed(true)}
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* High-Resolution Engineering SVG Composite of Industrial PRS Skid
            Guarantees zero broken images and pristine technical presentation */}
        {(!imgLoaded || imgLoadFailed) && (
          <div className="relative w-full filter drop-shadow-[0_24px_48px_rgba(1,14,30,0.9)]">
            <svg
              viewBox="0 0 1000 640"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto select-none"
              aria-label="High-resolution visual representation of an industrial PRS Skid engineered by Thermogen Projects"
            >
              <defs>
                {/* Yellow Gas Pipeline Gradients */}
                <linearGradient id="yellow-pipe-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFC83B" />
                  <stop offset="35%" stopColor="#FFA000" />
                  <stop offset="85%" stopColor="#D47600" />
                  <stop offset="100%" stopColor="#9C5200" />
                </linearGradient>
                <linearGradient id="yellow-pipe-vert" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D47600" />
                  <stop offset="40%" stopColor="#FFA000" />
                  <stop offset="80%" stopColor="#FFC83B" />
                  <stop offset="100%" stopColor="#B36200" />
                </linearGradient>

                {/* Stainless Steel Piping Gradients */}
                <linearGradient id="steel-pipe-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#E0E6ED" />
                  <stop offset="65%" stopColor="#9BAAB8" />
                  <stop offset="100%" stopColor="#637280" />
                </linearGradient>
                <linearGradient id="steel-pipe-vert" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#637280" />
                  <stop offset="30%" stopColor="#DCE3EB" />
                  <stop offset="65%" stopColor="#F5F8FB" />
                  <stop offset="100%" stopColor="#8191A0" />
                </linearGradient>

                {/* Skid Base Structural Steel Gradients */}
                <linearGradient id="skid-frame-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7E8B99" />
                  <stop offset="45%" stopColor="#5B6875" />
                  <stop offset="100%" stopColor="#3C4652" />
                </linearGradient>
                <linearGradient id="skid-base-top" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4D5864" />
                  <stop offset="50%" stopColor="#8D9AA8" />
                  <stop offset="100%" stopColor="#4A5561" />
                </linearGradient>

                {/* Valve Actuator Orange Gradient */}
                <linearGradient id="valve-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA336" />
                  <stop offset="60%" stopColor="#FF7900" />
                  <stop offset="100%" stopColor="#C45600" />
                </linearGradient>

                {/* Dial Gauge Radial Reflection */}
                <radialGradient id="gauge-dial-grad" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="75%" stopColor="#EEF3F8" />
                  <stop offset="100%" stopColor="#CAD5E0" />
                </radialGradient>

                {/* Floor Shadow Filter */}
                <filter id="skid-shadow" x="-5%" y="-10%" width="110%" height="140%">
                  <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#010A14" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* FLOOR REFLECTIVE BASELINE (Polished industrial floor reflection) */}
              <ellipse cx="500" cy="580" rx="460" ry="32" fill="#021020" opacity="0.9" />
              <ellipse cx="500" cy="580" rx="380" ry="18" fill="#010811" opacity="0.95" />

              {/* 1. HEAVY-DUTY STRUCTURAL STEEL SKID FRAME (Base) */}
              <g id="skid-base-assembly" filter="url(#skid-shadow)">
                {/* Bottom Main Skid Base I-Beam Flanges */}
                <rect x="110" y="520" width="780" height="42" rx="3" fill="url(#skid-frame-grad)" />
                <rect x="110" y="520" width="780" height="7" fill="url(#skid-base-top)" />
                <rect x="110" y="555" width="780" height="7" fill="#2E3742" />

                {/* Skid Base Structural Cross Members & Lift Lugs */}
                <rect x="140" y="515" width="24" height="48" rx="2" fill="#4B5663" stroke="#2B343F" strokeWidth="1" />
                <circle cx="152" cy="539" r="6" fill="#1C242D" />

                <rect x="488" y="515" width="24" height="48" rx="2" fill="#4B5663" stroke="#2B343F" strokeWidth="1" />
                <circle cx="500" cy="539" r="6" fill="#1C242D" />

                <rect x="836" y="515" width="24" height="48" rx="2" fill="#4B5663" stroke="#2B343F" strokeWidth="1" />
                <circle cx="848" cy="539" r="6" fill="#1C242D" />

                {/* Skid Support Vertical Columns */}
                <rect x="180" y="420" width="20" height="100" fill="url(#skid-frame-grad)" />
                <rect x="360" y="420" width="20" height="100" fill="url(#skid-frame-grad)" />
                <rect x="580" y="380" width="24" height="140" fill="url(#skid-frame-grad)" />
                <rect x="760" y="380" width="22" height="140" fill="url(#skid-frame-grad)" />
                <rect x="850" y="240" width="26" height="280" fill="url(#skid-frame-grad)" />
                <rect x="850" y="235" width="26" height="8" fill="url(#skid-base-top)" />
              </g>

              {/* 2. LOWER PRIMARY YELLOW GAS DISTRIBUTION HEADER PIPELINE */}
              <g id="lower-yellow-header">
                {/* Main Horizontal Run */}
                <rect x="130" y="442" width="730" height="34" rx="2" fill="url(#yellow-pipe-grad)" />
                {/* Flanges along Lower Pipe */}
                <rect x="220" y="434" width="14" height="50" rx="2" fill="#D47600" />
                <rect x="234" y="434" width="14" height="50" rx="2" fill="#FFA000" />
                {/* Flange Bolts */}
                <circle cx="227" cy="440" r="2.5" fill="#2B1A00" />
                <circle cx="227" cy="478" r="2.5" fill="#2B1A00" />
                <circle cx="241" cy="440" r="2.5" fill="#2B1A00" />
                <circle cx="241" cy="478" r="2.5" fill="#2B1A00" />

                <rect x="440" y="434" width="14" height="50" rx="2" fill="#D47600" />
                <rect x="454" y="434" width="14" height="50" rx="2" fill="#FFA000" />
                <circle cx="447" cy="440" r="2.5" fill="#2B1A00" />
                <circle cx="447" cy="478" r="2.5" fill="#2B1A00" />
                <circle cx="461" cy="440" r="2.5" fill="#2B1A00" />
                <circle cx="461" cy="478" r="2.5" fill="#2B1A00" />

                <rect x="680" y="434" width="14" height="50" rx="2" fill="#D47600" />
                <rect x="694" y="434" width="14" height="50" rx="2" fill="#FFA000" />
                <circle cx="687" cy="440" r="2.5" fill="#2B1A00" />
                <circle cx="687" cy="478" r="2.5" fill="#2B1A00" />
                <circle cx="701" cy="440" r="2.5" fill="#2B1A00" />
                <circle cx="701" cy="478" r="2.5" fill="#2B1A00" />

                {/* Right U-Turn Riser Connection */}
                <path
                  d="M 860 459 L 910 459 Q 930 459 930 439 L 930 330 Q 930 310 910 310 L 860 310"
                  stroke="url(#yellow-pipe-grad)"
                  strokeWidth="32"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>

              {/* 3. UPPER SECONDARY / REDUNDANT STREAM YELLOW PIPELINE */}
              <g id="upper-yellow-header">
                <rect x="260" y="325" width="460" height="28" rx="2" fill="url(#yellow-pipe-grad)" />
                {/* Flanges */}
                <rect x="330" y="318" width="12" height="42" rx="2" fill="#D47600" />
                <rect x="342" y="318" width="12" height="42" rx="2" fill="#FFA000" />
                <rect x="540" y="318" width="12" height="42" rx="2" fill="#D47600" />
                <rect x="552" y="318" width="12" height="42" rx="2" fill="#FFA000" />
              </g>

              {/* 4. VERTICAL STAINLESS STEEL PRESSURE REGULATORS & FILTER SEPARATORS */}
              <g id="vertical-regulators">
                {/* Central High-Pressure Separator Column */}
                <rect x="500" y="110" width="46" height="340" rx="4" fill="url(#steel-pipe-vert)" stroke="#4E5D6B" strokeWidth="1.5" />
                {/* Flanged Cap Top */}
                <rect x="492" y="98" width="62" height="14" rx="2" fill="#A8B8C7" stroke="#4E5D6B" strokeWidth="1" />
                <rect x="497" y="85" width="52" height="14" rx="2" fill="url(#steel-pipe-vert)" />
                <circle cx="523" cy="78" r="6" fill="#8898A7" />

                {/* Intermediate Section Rings */}
                <rect x="496" y="220" width="54" height="10" rx="1" fill="#7D8D9D" />
                <rect x="496" y="310" width="54" height="10" rx="1" fill="#7D8D9D" />

                {/* Left Secondary Regulator Column */}
                <rect x="420" y="190" width="30" height="255" rx="3" fill="url(#steel-pipe-vert)" stroke="#4E5D6B" strokeWidth="1" />
                <rect x="413" y="180" width="44" height="12" rx="2" fill="#A8B8C7" />
                
                {/* Left Stream Riser Column */}
                <rect x="280" y="220" width="28" height="225" rx="3" fill="url(#steel-pipe-vert)" stroke="#4E5D6B" strokeWidth="1" />
                <rect x="274" y="210" width="40" height="12" rx="2" fill="#A8B8C7" />
              </g>

              {/* 5. INDUSTRIAL CONTROL VALVES & SLAM-SHUT MECHANISMS */}
              <g id="control-valves">
                {/* Main Gate/Ball Valve 1 (Left) */}
                <rect x="170" y="426" width="34" height="66" rx="4" fill="#4B5663" stroke="#2B3540" strokeWidth="1.5" />
                {/* Valve Handwheel / Actuator */}
                <rect x="183" y="380" width="8" height="48" fill="#DCE3EB" />
                <ellipse cx="187" cy="378" rx="22" ry="7" fill="url(#valve-orange-grad)" stroke="#C45600" strokeWidth="1.5" />

                {/* Main Flanged Control Valve 2 (Center-Right) */}
                <rect x="635" y="420" width="46" height="78" rx="4" fill="#4B5663" stroke="#2B3540" strokeWidth="2" />
                <ellipse cx="658" cy="459" rx="16" ry="24" fill="#3B4652" />
                <rect x="653" y="375" width="10" height="46" fill="#DCE3EB" />
                <ellipse cx="658" cy="370" rx="26" ry="8" fill="url(#valve-orange-grad)" stroke="#C45600" strokeWidth="1.5" />

                {/* Safety Relief Valve (Top Right) */}
                <rect x="740" y="240" width="26" height="180" rx="3" fill="url(#steel-pipe-vert)" stroke="#4E5D6B" strokeWidth="1" />
                <rect x="734" y="230" width="38" height="12" rx="2" fill="#A8B8C7" />
                <path d="M 753 230 L 753 190 L 775 190" stroke="url(#steel-pipe-grad)" strokeWidth="14" fill="none" strokeLinecap="round" />
              </g>

              {/* 6. ANALOG PRESSURE GAUGES WITH CALIBRATED DIALS */}
              <g id="pressure-gauges">
                {/* Gauge 1 (Far Left Inlet) */}
                <g transform="translate(280, 160)">
                  <circle cx="14" cy="14" r="20" fill="#2E3842" stroke="#6F7E8C" strokeWidth="2" />
                  <circle cx="14" cy="14" r="16.5" fill="url(#gauge-dial-grad)" />
                  {/* Gauge Markings */}
                  <line x1="14" y1="2" x2="14" y2="6" stroke="#2E3842" strokeWidth="1.2" />
                  <line x1="26" y1="14" x2="22" y2="14" stroke="#2E3842" strokeWidth="1.2" />
                  <line x1="2" y1="14" x2="6" y2="14" stroke="#2E3842" strokeWidth="1.2" />
                  {/* Needle */}
                  <line x1="14" y1="14" x2="22" y2="8" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="14" cy="14" r="2.5" fill="#2E3842" />
                  {/* Stem Connection to Pipe */}
                  <rect x="11.5" y="34" width="5" height="18" fill="#DCE3EB" />
                </g>

                {/* Gauge 2 (Intermediate Station) */}
                <g transform="translate(420, 140)">
                  <circle cx="14" cy="14" r="18" fill="#2E3842" stroke="#6F7E8C" strokeWidth="2" />
                  <circle cx="14" cy="14" r="14.5" fill="url(#gauge-dial-grad)" />
                  <line x1="14" y1="14" x2="19" y2="6" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="14" cy="14" r="2" fill="#2E3842" />
                  <rect x="11.5" y="32" width="5" height="12" fill="#DCE3EB" />
                </g>

                {/* Gauge 3 (Large Differential Output Gauge - Prominent) */}
                <g transform="translate(685, 255)">
                  <circle cx="28" cy="28" r="34" fill="#2E3842" stroke="#FFA000" strokeWidth="3" />
                  <circle cx="28" cy="28" r="29" fill="url(#gauge-dial-grad)" />
                  {/* Calibrated Ticks */}
                  <circle cx="28" cy="28" r="23" stroke="#8A9BA8" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
                  {/* Dial Needle pointing to nominal 4.5 bar operating zone */}
                  <line x1="28" y1="28" x2="42" y2="18" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="28" cy="28" r="4" fill="#1C242D" />
                  {/* Stainless Mounting Stem */}
                  <rect x="25" y="62" width="6" height="30" fill="#DCE3EB" />
                  <rect x="21" y="90" width="14" height="8" rx="1" fill="#7D8D9D" />
                </g>
              </g>

              {/* 7. EXPLOSION-PROOF CONTROL / JUNCTION PANEL */}
              <g id="control-panel" transform="translate(568, 320)">
                <rect x="0" y="0" width="54" height="62" rx="3" fill="#D3DDE6" stroke="#5B6875" strokeWidth="1.5" />
                {/* Latch hinges */}
                <rect x="-2" y="8" width="4" height="8" fill="#4B5663" />
                <rect x="-2" y="44" width="4" height="8" fill="#4B5663" />
                {/* Indicator LEDs */}
                <circle cx="14" cy="16" r="3.5" fill="#4CAF50" stroke="#2E7D32" strokeWidth="0.8" />
                <circle cx="27" cy="16" r="3.5" fill="#FF7900" stroke="#D46000" strokeWidth="0.8" />
                <circle cx="40" cy="16" r="3.5" fill="#2196F3" stroke="#0D47A1" strokeWidth="0.8" />
                {/* Switches and Dial */}
                <circle cx="27" cy="34" r="5" fill="#3B4652" />
                <line x1="27" y1="34" x2="31" y2="34" stroke="#FFFFFF" strokeWidth="1.5" />
                {/* Terminal Glands at bottom */}
                <rect x="10" y="62" width="8" height="8" fill="#4B5663" />
                <rect x="36" y="62" width="8" height="8" fill="#4B5663" />
                {/* Flexible conduit cable to skid */}
                <path d="M 14 70 L 14 90 L 22 90" stroke="#2B343F" strokeWidth="3" fill="none" />
                <path d="M 40 70 L 40 90 L 32 90" stroke="#2B343F" strokeWidth="3" fill="none" />
              </g>

              {/* 8. STAINLESS STEEL IMPULSE & BYPASS TUBING */}
              <g id="impulse-tubing" opacity="0.9">
                <path
                  d="M 280 340 L 250 340 L 250 280 L 340 280"
                  stroke="url(#steel-pipe-grad)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 450 330 L 475 330 L 475 270 L 500 270"
                  stroke="url(#steel-pipe-grad)"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 546 250 L 600 250 L 600 300 L 635 300"
                  stroke="url(#steel-pipe-grad)"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Micro Tube Clamps */}
                <rect x="247" y="305" width="6" height="8" fill="#4B5663" />
                <rect x="472" y="295" width="6" height="8" fill="#4B5663" />
              </g>

              {/* 9. SUBTLE METALLIC HIGHLIGHT REFLECTIONS */}
              <g id="metallic-highlights" opacity="0.65" mix-blend-mode="screen">
                <line x1="140" y1="446" x2="850" y2="446" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.75" />
                <line x1="270" y1="329" x2="710" y2="329" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.7" />
                <line x1="510" y1="120" x2="510" y2="440" stroke="#FFFFFF" strokeWidth="3.5" strokeOpacity="0.6" />
                <line x1="426" y1="200" x2="426" y2="440" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.5" />
              </g>
            </svg>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
