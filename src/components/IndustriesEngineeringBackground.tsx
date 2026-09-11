import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const IndustriesEngineeringBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Base Background Color & Soft Radial Atmospheric Glows */}
      <div className="absolute inset-0 bg-[#F7FAFD]" />

      {/* Upper-right soft atmospheric glow */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.7 }
            : {
                opacity: [0.6, 0.85, 0.6],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1688E8]/[0.08] via-[#1688E8]/[0.03] to-transparent blur-3xl"
      />

      {/* Lower-left atmospheric engineering glow */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.6 }
            : {
                opacity: [0.5, 0.75, 0.5],
                scale: [1, 1.06, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute -bottom-28 -left-20 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#062B52]/[0.06] via-[#1688E8]/[0.03] to-transparent blur-3xl"
      />

      {/* Center-right soft glow (underneath right column cards) */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-[#1688E8]/[0.025] blur-[100px]" />

      {/* 2. Technical Engineering Grid (3-5% opacity, 54px pitch) */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1688E8 1px, transparent 1px),
            linear-gradient(to bottom, #1688E8 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />

      {/* Subtle Coordinate Intersections / Crosshair Marks (Large 224px spacing) */}
      <div
        className="absolute inset-0 opacity-[0.06] hidden md:block"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0px 0px, #1688E8 1.5px, transparent 1.5px)
          `,
          backgroundSize: '168px 168px',
        }}
      />

      {/* 3. Industrial Blueprint Plant Silhouettes (far-left and far-right, away from main text) */}
      {/* Far-Left Vertical Process Vessel & Manifold Lattice (opacity 4-6%) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -left-10 bottom-0 w-[380px] h-[520px] opacity-[0.05] lg:opacity-[0.065] hidden sm:block pointer-events-none"
      >
        <svg
          viewBox="0 0 380 520"
          fill="none"
          stroke="#1688E8"
          strokeWidth="1.2"
          className="w-full h-full"
        >
          {/* Vertical Distillation Column */}
          <rect x="40" y="80" width="90" height="380" rx="45" />
          {/* Column Internal Trays / Levels */}
          <line x1="40" y1="140" x2="130" y2="140" strokeDasharray="3 3" />
          <line x1="40" y1="190" x2="130" y2="190" strokeDasharray="3 3" />
          <line x1="40" y1="240" x2="130" y2="240" strokeDasharray="3 3" />
          <line x1="40" y1="290" x2="130" y2="290" strokeDasharray="3 3" />
          <line x1="40" y1="340" x2="130" y2="340" strokeDasharray="3 3" />
          <line x1="40" y1="390" x2="130" y2="390" strokeDasharray="3 3" />
          {/* Top Vent Pipe & Valve */}
          <path d="M 85 80 V 30 H 160 V 90" />
          <polygon points="120,25 130,35 120,35 130,25" fill="#1688E8" opacity="0.4" />
          {/* Side Process Manifold Run */}
          <path d="M 130 160 H 220 V 460" />
          <path d="M 130 260 H 260 V 460" />
          <path d="M 130 360 H 300 V 460" />
          {/* Structural Truss Tower Girder */}
          <line x1="310" y1="60" x2="310" y2="480" strokeWidth="1.5" />
          <line x1="360" y1="60" x2="360" y2="480" strokeWidth="1.5" />
          <line x1="310" y1="90" x2="360" y2="130" />
          <line x1="360" y1="90" x2="310" y2="130" />
          <line x1="310" y1="130" x2="360" y2="170" />
          <line x1="360" y1="130" x2="310" y2="170" />
          <line x1="310" y1="170" x2="360" y2="210" />
          <line x1="360" y1="170" x2="310" y2="210" />
          <line x1="310" y1="210" x2="360" y2="250" />
          <line x1="360" y1="210" x2="310" y2="250" />
          <line x1="310" y1="250" x2="360" y2="290" />
          <line x1="360" y1="250" x2="310" y2="290" />
        </svg>
      </motion.div>

      {/* Far-Right Industrial Tank & Piping System Line-Art */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, 6, 0],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute -right-16 top-10 w-[420px] h-[550px] opacity-[0.04] lg:opacity-[0.055] hidden sm:block pointer-events-none"
      >
        <svg
          viewBox="0 0 420 550"
          fill="none"
          stroke="#1688E8"
          strokeWidth="1.2"
          className="w-full h-full"
        >
          {/* Horizontal Pressure Bullet Vessel */}
          <rect x="60" y="80" width="280" height="110" rx="55" />
          <line x1="120" y1="80" x2="120" y2="190" strokeDasharray="3 3" />
          <line x1="280" y1="80" x2="280" y2="190" strokeDasharray="3 3" />
          {/* Vessel Support Saddles */}
          <polygon points="100,190 140,190 150,220 90,220" />
          <polygon points="260,190 300,190 310,220 250,220" />
          {/* Overhead Gas Header Pipeline */}
          <path d="M 200 80 V 30 H 30 V 420 H 120" />
          <circle cx="200" cy="55" r="5" />
          <circle cx="115" cy="30" r="4" />
          {/* Flow Indicator Arrows */}
          <polygon points="75,27 85,30 75,33" fill="#1688E8" opacity="0.6" />
          <polygon points="27,240 30,250 33,240" fill="#1688E8" opacity="0.6" />
          {/* Spherical Gas Storage Buffer (Partial) */}
          <circle cx="340" cy="360" r="95" strokeDasharray="4 4" />
          <circle cx="340" cy="360" r="85" />
          <line x1="340" y1="275" x2="340" y2="445" />
          <line x1="255" y1="360" x2="420" y2="360" />
        </svg>
      </motion.div>

      {/* 4. Flowing Pipeline Curves & Technical Process Loops (Full Width SVG) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Subtle Gradient for Pipeline 1 */}
          <linearGradient id="pipeGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1688E8" stopOpacity="0.03" />
            <stop offset="35%" stopColor="#1688E8" stopOpacity="0.10" />
            <stop offset="70%" stopColor="#1688E8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1688E8" stopOpacity="0.02" />
          </linearGradient>

          {/* Pipeline 2 with subtle Orange Accent Transition */}
          <linearGradient id="pipeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1688E8" stopOpacity="0.02" />
            <stop offset="48%" stopColor="#1688E8" stopOpacity="0.08" />
            <stop offset="68%" stopColor="#FF7900" stopOpacity="0.14" />
            <stop offset="85%" stopColor="#1688E8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#1688E8" stopOpacity="0.02" />
          </linearGradient>

          {/* Node Glow Filters */}
          <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#1688E8" floodOpacity="0.5" />
          </filter>
          <filter id="orangeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FF7900" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Primary Flow Line 1 — Upper Sweeping Energy/Gas Curve */}
        <motion.path
          d="M -50 160 C 280 120, 520 280, 880 210 S 1240 110, 1500 180"
          stroke="url(#pipeGradient1)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="12 10"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  strokeDashoffset: [0, -176],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Primary Flow Line 2 — Mid-section Process Distribution Line */}
        <motion.path
          d="M -40 440 C 320 480, 560 360, 920 420 S 1280 510, 1490 460"
          stroke="url(#pipeGradient2)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="16 12"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  strokeDashoffset: [0, -224],
                }
          }
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Primary Flow Line 3 — Lower Interconnecting Circuit with Engineering 90-degree Chamfers */}
        <path
          d="M 120 780 H 420 L 460 740 H 840 L 880 780 H 1380"
          stroke="#1688E8"
          strokeOpacity="0.05"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Line 4 — Diagonal Feed line */}
        <path
          d="M 280 900 L 460 720 V 580"
          stroke="#1688E8"
          strokeOpacity="0.04"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
      </svg>

      {/* 5. Small Technical Nodes (Pulsing gently along lines with staggered durations) */}
      {/* Node 1 (Blue, Top Left) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.35 }
            : {
                opacity: [0.25, 0.65, 0.25],
                scale: [0.9, 1.2, 0.9],
              }
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[16%] left-[18%] w-2 h-2 rounded-full bg-[#1688E8] shadow-[0_0_8px_rgba(22,136,232,0.6)]"
      >
        <span className="absolute -inset-1 rounded-full border border-[#1688E8]/30 animate-ping opacity-40" />
      </motion.div>

      {/* Node 2 (Orange, Mid-Upper Accent) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.45 }
            : {
                opacity: [0.28, 0.75, 0.28],
                scale: [0.95, 1.25, 0.95],
              }
        }
        transition={{
          duration: 5.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
        className="absolute top-[23%] left-[58%] w-2 h-2 rounded-full bg-[#FF7900] shadow-[0_0_9px_rgba(255,121,0,0.65)]"
      >
        <span className="absolute -inset-1.5 rounded-full border border-[#FF7900]/30" />
      </motion.div>

      {/* Node 3 (Blue, Right Column Background Accent) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.3 }
            : {
                opacity: [0.2, 0.6, 0.2],
                scale: [0.9, 1.15, 0.9],
              }
        }
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
        className="absolute top-[46%] right-[14%] w-2 h-2 rounded-full bg-[#1688E8] shadow-[0_0_8px_rgba(22,136,232,0.5)] hidden sm:block"
      />

      {/* Node 4 (Orange, Lower Right Micro Accent) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.35 }
            : {
                opacity: [0.22, 0.68, 0.22],
                scale: [0.9, 1.2, 0.9],
              }
        }
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3.4,
        }}
        className="absolute bottom-[22%] right-[28%] w-1.5 h-1.5 rounded-full bg-[#FF7900] shadow-[0_0_7px_rgba(255,121,0,0.6)] hidden md:block"
      />

      {/* Node 5 (Blue, Lower Left Line intersection) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.3 }
            : {
                opacity: [0.2, 0.55, 0.2],
                scale: [0.85, 1.15, 0.85],
              }
        }
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
        className="absolute bottom-[24%] left-[29%] w-2 h-2 rounded-full bg-[#1688E8] shadow-[0_0_8px_rgba(22,136,232,0.45)]"
      />
    </div>
  );
};
