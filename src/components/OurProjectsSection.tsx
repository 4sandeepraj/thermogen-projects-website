import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Maximize2,
  X,
  MapPin,
} from 'lucide-react';
import { MetalsaLogo, PaliralLogo } from './CustomerLogos';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  client?: string;
  location?: string;
  details?: string;
  defaultFileName: string;
  photoCandidateUrls: string[];
  logoComponent?: React.ComponentType<{ className?: string }>;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'cbm-dehydration-compressor',
    number: '01',
    title: 'DEVELOPMENT OF DEHYDRATION UNIT & COMPRESSOR FACILITY OF 2000 SCMD CBM',
    client: 'Coal Bed Methane (CBM) Exploration & Production',
    location: 'Field Gas Processing Facility',
    details:
      'Turnkey engineering and development of a 2000 SCMD Coal Bed Methane (CBM) gas dehydration unit and gas compressor facility engineered for conditioning, moisture removal, and high-pressure transmission.',
    defaultFileName: 'DEHYDRATION UNIT.png',
    photoCandidateUrls: [
      '/Images/DEHYDRATION UNIT.png',
      '/Images/DEHYDRATION%20UNIT.png',
      '/DEHYDRATION UNIT.png',
      '/DEHYDRATION%20UNIT.png',
    ],
  },
  {
    id: 'metalsa-decanting-facility',
    number: '02',
    title: 'METALSA INDIA – DECANTING FACILITY',
    client: 'METALSA INDIA PRIVATE LIMITED',
    location: 'Jamshedpur, Jharkhand',
    details:
      'Turnkey engineering, installation, safety relief skids, and commissioning of dedicated fuel decanting and high-pressure manifold piping infrastructure at Metalsa India Private Limited.',
    defaultFileName: 'TPPL_METALSA_DECANTING FACILITY.png',
    logoComponent: MetalsaLogo,
    photoCandidateUrls: [
      '/Images/TPPL_METALSA_DECANTING FACILITY.png',
      '/Images/TPPL_METALSA_DECANTING%20FACILITY.png',
      '/TPPL_METALSA_DECANTING FACILITY.png',
      '/TPPL_METALSA_DECANTING%20FACILITY.png',
    ],
  },
  {
    id: 'palriwal-mrs-png',
    number: '03',
    title: 'PALRIWAL INDUSTRIES – MRS FOR PIPED NATURAL GAS',
    client: 'PALRIWAL INDUSTRIES PVT. LTD.',
    location: 'Ranchi, Jharkhand',
    details:
      'Turnkey design, fabrication, safety shut-off valves, filtration, and pressure regulation skid with fiscal flow metering for piped natural gas supply at Palriwal Industries Pvt. Ltd.',
    defaultFileName: 'TPPL_PALRIWAL_MRS SUPPLY.png',
    logoComponent: PaliralLogo,
    photoCandidateUrls: [
      '/Images/TPPL_PALRIWAL_MRS SUPPLY.png',
      '/Images/TPPL_PALRIWAL_MRS%20SUPPLY.png',
      '/TPPL_PALRIWAL_MRS SUPPLY.png',
      '/TPPL_PALRIWAL_MRS%20SUPPLY.png',
    ],
  },
  {
    id: 'cng-mother-station',
    number: '04',
    title: 'CNG MOTHER STATION',
    client: 'City Gas Distribution (CGD) Infrastructure',
    location: 'CGD Operational Network',
    details:
      'Complete engineering, piping manifolds, priority panel sequencing, high-pressure gas compression, and multi-bay mobile cascade filling station installation.',
    defaultFileName: 'TPPL_CNG_MOTHER STATION.png',
    photoCandidateUrls: [
      '/Images/TPPL_CNG_MOTHER STATION.png',
      '/Images/TPPL_CNG_MOTHER%20STATION.png',
      '/TPPL_CNG_MOTHER STATION.png',
      '/TPPL_CNG_MOTHER%20STATION.png',
    ],
  },
  {
    id: 'gas-pressure-regulators',
    number: '05',
    title: 'GAS PRESSURE REGULATING SKIDS & INDUSTRIAL REGULATORS',
    client: 'Industrial Gas & Energy Utility',
    location: 'Field Regulating & Metering Facility',
    details:
      'Turnkey engineering, fabrication, safety relief, active-monitor regulation lines, and commissioning of dual-stream industrial gas pressure regulating skids (PRS) and precision regulator assemblies.',
    defaultFileName: 'TPPL_REGULATORS (2).png',
    photoCandidateUrls: [
      '/Images/TPPL_REGULATORS (2).png',
      '/Images/TPPL_REGULATORS%20(2).png',
      '/Images/TPPL_REGULATORS%20%282%29.png',
      '/Images/TPPL_REGULATORS.png',
      '/TPPL_REGULATORS (2).png',
      '/TPPL_REGULATORS%20(2).png',
      '/TPPL_REGULATORS%20%282%29.png',
      '/TPPL_REGULATORS.png',
    ],
  },
];

/**
 * Generates an authentic, high-definition 16:9 executive presentation slide SVG
 * for each project with technical blueprint schematics, instrumentation diagrams,
 * and high-contrast typography, ensuring no broken image states.
 */
export const getProjectFallbackSlideSvg = (project: ProjectItem) => {
  const isCBM = project.id === 'cbm-dehydration-compressor';
  const isMetalsa = project.id === 'metalsa-decanting-facility';
  const isPalriwal = project.id === 'palriwal-mrs-png';
  const isCNG = project.id === 'cng-mother-station';
  const isRegulators = project.id === 'gas-pressure-regulators';

  const accentColor = isCBM
    ? '#FF7900'
    : isMetalsa
    ? '#1688E8'
    : isPalriwal
    ? '#10B981'
    : isCNG
    ? '#F59E0B'
    : isRegulators
    ? '#0EA5E9'
    : '#1688E8';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <linearGradient id="bgGrad_${project.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#051C35"/>
        <stop offset="60%" stop-color="#04162B"/>
        <stop offset="100%" stop-color="#020E1E"/>
      </linearGradient>
      <linearGradient id="cardGrad_${project.id}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0A2A4E" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#041B34" stop-opacity="0.95"/>
      </linearGradient>
      <radialGradient id="glow_${project.id}" cx="80%" cy="20%" r="50%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.2"/>
        <stop offset="60%" stop-color="#1688E8" stop-opacity="0.06"/>
        <stop offset="100%" stop-color="#04162B" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid_${project.id}" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1688E8" stroke-opacity="0.08" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Canvas Background -->
    <rect width="1280" height="720" fill="url(#bgGrad_${project.id})"/>
    <rect width="1280" height="720" fill="url(#grid_${project.id})"/>
    <rect width="1280" height="720" fill="url(#glow_${project.id})"/>

    <!-- Corporate Top Header Bar -->
    <rect x="50" y="40" width="1180" height="56" rx="6" fill="#07223F" stroke="#1688E8" stroke-opacity="0.25"/>
    <circle cx="78" cy="68" r="12" fill="${accentColor}"/>
    <text x="78" y="73" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="12" font-weight="800">T</text>
    <text x="104" y="73" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="1.2">THERMOGEN PROJECTS PRIVATE LIMITED</text>
    
    <rect x="990" y="52" width="220" height="32" rx="4" fill="#04182E" stroke="${accentColor}" stroke-opacity="0.4"/>
    <text x="1100" y="72" text-anchor="middle" fill="${accentColor}" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1">PROJECT INSTALLATION</text>

    <!-- Main Schematic / Visual Canvas Area -->
    <g transform="translate(60, 125)">
      <!-- Left Blueprint / Schematic Panel -->
      <rect x="0" y="0" width="700" height="520" rx="12" fill="url(#cardGrad_${project.id})" stroke="#1688E8" stroke-opacity="0.3"/>
      
      <!-- Coordinate Crosses & Engineering Blueprint Details -->
      <g stroke="#1688E8" stroke-opacity="0.25" stroke-width="1">
        <line x1="20" y1="20" x2="40" y2="20"/><line x1="30" y1="10" x2="30" y2="30"/>
        <line x1="660" y1="20" x2="680" y2="20"/><line x1="670" y1="10" x2="670" y2="30"/>
        <line x1="20" y1="500" x2="40" y2="500"/><line x1="30" y1="490" x2="30" y2="510"/>
        <line x1="660" y1="500" x2="680" y2="500"/><line x1="670" y1="490" x2="670" y2="510"/>
      </g>

      <!-- Technical Diagram Elements -->
      <g transform="translate(40, 60)">
        <!-- Process Flow Pipelines -->
        <path d="M 40 220 L 160 220 L 160 140 L 320 140 L 320 220 L 480 220 L 480 320 L 600 320" fill="none" stroke="#1688E8" stroke-width="6" stroke-linecap="round"/>
        <path d="M 40 220 L 160 220 L 160 140 L 320 140 L 320 220 L 480 220 L 480 320 L 600 320" fill="none" stroke="${accentColor}" stroke-width="2" stroke-dasharray="10 8"/>

        <!-- Unit 1 Vessel / Compressor Skid -->
        <rect x="110" y="90" width="100" height="120" rx="8" fill="#072B52" stroke="#1688E8" stroke-width="2"/>
        <text x="160" y="145" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="11" font-weight="700">${isCBM ? 'DEHYDRATION' : isMetalsa ? 'DECANTING' : isPalriwal ? 'INLET REG' : 'COMPRESSION'}</text>
        <text x="160" y="165" text-anchor="middle" fill="${accentColor}" font-family="system-ui, sans-serif" font-size="9" font-weight="600">UNIT SKID</text>

        <!-- High-Pressure Flow Valve 1 -->
        <polygon points="230,130 250,150 230,150 250,130" fill="${accentColor}"/>
        <line x1="240" y1="130" x2="240" y2="120" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="240" cy="116" r="4" fill="#FFFFFF"/>

        <!-- Unit 2 Gas Processing / Regulating Skid -->
        <rect x="270" y="170" width="110" height="130" rx="8" fill="#072B52" stroke="#1688E8" stroke-width="2"/>
        <text x="325" y="225" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="11" font-weight="700">${isCBM ? 'GAS COMPRESSOR' : isMetalsa ? 'HP MANIFOLD' : isPalriwal ? 'MRS REGULATOR' : 'PRIORITY PANEL'}</text>
        <text x="325" y="245" text-anchor="middle" fill="${accentColor}" font-family="system-ui, sans-serif" font-size="9" font-weight="600">FACILITY</text>

        <!-- High-Pressure Flow Valve 2 -->
        <polygon points="410,210 430,230 410,230 430,210" fill="${accentColor}"/>
        <line x1="420" y1="210" x2="420" y2="200" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="420" cy="196" r="4" fill="#FFFFFF"/>

        <!-- Unit 3 Dispenser / Custody Transfer Metering -->
        <rect x="430" y="260" width="110" height="110" rx="8" fill="#072B52" stroke="#1688E8" stroke-width="2"/>
        <text x="485" y="310" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="11" font-weight="700">${isCBM ? 'HIGH PRESSURE' : isMetalsa ? 'UNLOADING BAY' : isPalriwal ? 'FISCAL METER' : 'CASCADE FILL'}</text>
        <text x="485" y="330" text-anchor="middle" fill="${accentColor}" font-family="system-ui, sans-serif" font-size="9" font-weight="600">SYSTEM</text>
      </g>
    </g>

    <!-- Right Side Information Overlay in Fallback Slide -->
    <g transform="translate(800, 125)">
      <rect x="0" y="0" width="430" height="520" rx="12" fill="#041B34" stroke="#1688E8" stroke-opacity="0.3"/>
      
      <rect x="35" y="35" width="80" height="26" rx="4" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-opacity="0.4"/>
      <text x="75" y="52" text-anchor="middle" fill="${accentColor}" font-family="system-ui, sans-serif" font-size="11" font-weight="700">CASE STUDY</text>
      
      <text x="130" y="52" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="600">PROJECT ${project.number} / 05</text>

      <!-- Project Title -->
      <text x="35" y="96" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="17" font-weight="800">${project.title.slice(0, 36)}</text>
      ${
        project.title.length > 36
          ? `<text x="35" y="122" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="17" font-weight="800">${project.title.slice(36, 70)}</text>`
          : ''
      }
      ${
        project.title.length > 70
          ? `<text x="35" y="148" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="17" font-weight="800">${project.title.slice(70)}</text>`
          : ''
      }

      <line x1="35" y1="175" x2="395" y2="175" stroke="#1688E8" stroke-opacity="0.25" stroke-width="1.5"/>

      <!-- Client Metadata -->
      ${
        project.client
          ? `<text x="35" y="215" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">CLIENT</text>
             <text x="35" y="238" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="700">${project.client}</text>`
          : ''
      }

      <!-- Location Metadata -->
      ${
        project.location
          ? `<text x="35" y="285" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="1">LOCATION</text>
             <text x="35" y="308" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">${project.location}</text>`
          : ''
      }

      <!-- Bottom Verification Seal -->
      <g transform="translate(35, 420)">
        <rect x="0" y="0" width="360" height="60" rx="8" fill="#051E39" stroke="#1688E8" stroke-opacity="0.3"/>
        <circle cx="30" cy="30" r="14" fill="${accentColor}" fill-opacity="0.2"/>
        <polyline points="24,30 28,34 36,26" fill="none" stroke="${accentColor}" stroke-width="2.5" stroke-linecap="round"/>
        <text x="56" y="26" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="11" font-weight="700">COMMISSIONED &amp; OPERATIONAL</text>
        <text x="56" y="44" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="10" font-weight="500">Thermogen Engineering Execution</text>
      </g>
    </g>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
};

interface ProjectSlideViewerProps {
  project: ProjectItem;
  onOpenModal: () => void;
  loading?: 'lazy' | 'eager';
}

const ProjectSlideViewer: React.FC<ProjectSlideViewerProps> = ({
  project,
  onOpenModal,
  loading = 'lazy',
}) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [useFallbackSvg, setUseFallbackSvg] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [customSlide, setCustomSlide] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tppl_project_slide_' + project.id);
        if (saved && saved.startsWith('data:image/')) {
          return saved;
        }
      } catch {
        return null;
      }
    }
    return null;
  });

  // Reset fallback and index when project changes
  useEffect(() => {
    setCandidateIndex(0);
    setUseFallbackSvg(false);
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tppl_project_slide_' + project.id);
        if (saved && saved.startsWith('data:image/')) {
          setCustomSlide(saved);
        } else {
          setCustomSlide(null);
        }
      } catch {
        // ignore
      }
    }
  }, [project.id]);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setCustomSlide(result);
          setUseFallbackSvg(false);
          try {
            localStorage.setItem('tppl_project_slide_' + project.id, result);
          } catch {
            // ignore
          }
          fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name || project.defaultFileName || `${project.id}.png`,
              dataUrl: result,
            }),
          }).catch(() => {});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const candidateUrls =
    project.photoCandidateUrls && project.photoCandidateUrls.length > 0
      ? project.photoCandidateUrls
      : [project.defaultFileName];

  const rawUrl =
    customSlide ||
    (useFallbackSvg
      ? getProjectFallbackSlideSvg(project)
      : candidateUrls[candidateIndex] || getProjectFallbackSlideSvg(project));

  const currentUrl =
    rawUrl.startsWith('data:')
      ? rawUrl
      : encodeURI(decodeURI(rawUrl));

  return (
    <div
      className={`group relative w-full aspect-[16/9] bg-white rounded-[16px] sm:rounded-[20px] overflow-hidden border border-[#E2E8F0] shadow-[0_12px_32px_rgba(4,30,58,0.08)] transition-all duration-300 flex items-center justify-center ${
        isDragging ? 'ring-2 ring-[#FF7900]' : ''
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Complete, uncropped slide presentation with contain fit on clean white background */}
      <img
        src={currentUrl}
        alt={`Thermogen Projects installation – ${project.title}`}
        className="w-full h-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-[1.01] cursor-pointer bg-white"
        onClick={onOpenModal}
        referrerPolicy="no-referrer"
        loading={loading}
        decoding="async"
        onError={() => {
          if (customSlide) {
            setCustomSlide(null);
            try {
              localStorage.removeItem('tppl_project_slide_' + project.id);
            } catch {}
            return;
          }
          if (candidateIndex + 1 < candidateUrls.length) {
            setCandidateIndex((prev) => prev + 1);
          } else {
            setUseFallbackSvg(true);
          }
        }}
      />

      {/* Subtle frame highlight */}
      <div className="absolute inset-0 ring-1 ring-inset ring-[#041E3A]/5 pointer-events-none rounded-[16px] sm:rounded-[20px]" />

      {/* Refined enlarge cue on hover */}
      <button
        type="button"
        onClick={onOpenModal}
        title="View full slide presentation"
        className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#041E3A]/85 backdrop-blur-sm text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#FF7900] shadow-md cursor-pointer"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Enlarge</span>
      </button>
    </div>
  );
};

export const OurProjectsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInteractedUntil, setUserInteractedUntil] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const totalProjects = PROJECTS_DATA.length;
  const currentProject = PROJECTS_DATA[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
    setUserInteractedUntil(Date.now() + 10000); // pause auto-slide for 10s after manual click
  }, [totalProjects]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    setUserInteractedUntil(Date.now() + 10000);
  }, [totalProjects]);

  // Robust mouseenter and mouseleave event listeners to pause and resume auto-slide
  useEffect(() => {
    const container = carouselContainerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setUserInteractedUntil(Date.now() + 4000);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Auto-Slide: Advances every 6 seconds unless paused by hover, modal open, or reduced motion
  useEffect(() => {
    if (shouldReduceMotion || isHovered || isModalOpen) {
      return;
    }

    const interval = setInterval(() => {
      if (Date.now() > userInteractedUntil) {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalProjects);
      }
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [shouldReduceMotion, isHovered, isModalOpen, userInteractedUntil, totalProjects]);

  // Keyboard navigation & ESC handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
        }
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleNext, handlePrev]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative z-20 w-full bg-[#FAFCFF] py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 xl:px-14 border-t border-[#E2E8F0] overflow-hidden"
    >
      {/* Extremely subtle engineering grid watermark (opacity 0.025) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#041E3A 1px, transparent 1px), linear-gradient(to right, #041E3A 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        {/* ========================================================= */}
        {/* 2. SECTION HEADER (Clean, corporate, restrained)          */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
            <span className="text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF7900]">
              OUR PROJECTS
            </span>
          </div>

          {/* Main Heading */}
          <h2
            id="projects-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#041E3A] tracking-tight leading-tight mb-4"
          >
            Selected Project Installations
          </h2>

          {/* Supporting Text */}
          <p className="font-body text-base sm:text-lg text-[#475569] leading-relaxed">
            Selected project installations showcasing our engineering and execution capabilities.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 3. IMAGE-FIRST PROJECT SHOWCASE CAROUSEL                  */}
        {/* ========================================================= */}
        <div
          ref={carouselContainerRef}
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setUserInteractedUntil(Date.now() + 4000);
          }}
          onFocusCapture={() => setIsHovered(true)}
          onBlurCapture={() => {
            setIsHovered(false);
            setUserInteractedUntil(Date.now() + 4000);
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Off-screen Project Images with Native Lazy Loading */}
          <div className="sr-only" aria-hidden="true">
            {PROJECTS_DATA.map((proj, idx) => {
              if (idx === currentIndex) return null;
              const offscreenUrl =
                (typeof window !== 'undefined' &&
                  localStorage.getItem('tppl_project_slide_' + proj.id)) ||
                proj.photoCandidateUrls[0] ||
                getProjectFallbackSlideSvg(proj);
              return (
                <img
                  key={proj.id}
                  src={offscreenUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              );
            })}
          </div>

          {/* Main Content: Large Project Image (65–70%) + Compact Info (30–35%) */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentProject.id}
              custom={direction}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, x: direction > 0 ? 30 : -30 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? -30 : 30 }
              }
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center"
            >
              {/* ===================================================== */}
              {/* LEFT: Dominant Project Presentation Slide (~67%)      */}
              {/* ===================================================== */}
              <div className="lg:col-span-8 w-full">
                <ProjectSlideViewer
                  project={currentProject}
                  onOpenModal={() => setIsModalOpen(true)}
                  loading={currentIndex === 0 ? 'eager' : 'lazy'}
                />
              </div>

              {/* ===================================================== */}
              {/* RIGHT: Compact Editorial Project Information (~33%)   */}
              {/* ===================================================== */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full pt-2 lg:pt-0">
                <div>
                  {/* Minimal Editorial Eyebrow & Numbering */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#FF7900] uppercase">
                      PROJECT {currentProject.number}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#64748B]">
                      {currentProject.number} / {String(totalProjects).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display text-xl sm:text-2xl lg:text-[24px] xl:text-[26px] font-extrabold text-[#041E3A] tracking-tight leading-snug mb-5">
                    {currentProject.title}
                  </h3>

                  {/* Subtle Divider */}
                  <div className="w-full h-px bg-[#E2E8F0] mb-5" />

                  {/* Client Metadata */}
                  {currentProject.client && (
                    <div className="mb-4">
                      <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                        CLIENT
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-[15px] font-bold text-[#041E3A] leading-tight">
                          {currentProject.client}
                        </span>
                        {currentProject.logoComponent && (
                          <currentProject.logoComponent className="h-4 w-auto max-w-[70px] opacity-80" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Location Metadata */}
                  {currentProject.location && (
                    <div className="mb-4">
                      <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                        LOCATION
                      </span>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-[#1E293B]">
                        <MapPin className="w-3.5 h-3.5 text-[#FF7900] flex-shrink-0" />
                        <span>{currentProject.location}</span>
                      </div>
                    </div>
                  )}

                  {/* Short Supporting Description */}
                  {currentProject.details && (
                    <p className="text-[13.5px] text-[#475569] leading-relaxed mb-6 font-normal">
                      {currentProject.details}
                    </p>
                  )}

                  {/* VIEW PROJECT DETAILS Editorial CTA */}
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#041E3A] hover:text-[#FF7900] transition-colors duration-200 group/cta py-1.5 border-b border-transparent hover:border-[#FF7900] cursor-pointer"
                    >
                      <span>VIEW PROJECT DETAILS</span>
                      <ArrowRight className="w-4 h-4 text-[#FF7900] group-hover/cta:translate-x-1.5 transition-transform duration-200" />
                    </button>
                  </div>
                </div>

                {/* Carousel Navigation Controls & Indicator */}
                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  {/* Slide Indicator: 01 ── 05 minimal style */}
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#041E3A]">
                      {currentProject.number}
                    </span>
                    <div className="w-10 h-[2px] bg-[#E2E8F0] relative overflow-hidden rounded-full">
                      <div
                        className="absolute top-0 left-0 bottom-0 bg-[#FF7900] transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / totalProjects) * 100}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs font-medium text-[#94A3B8]">
                      {String(totalProjects).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Previous / Next minimal circular buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous project installation"
                      className="w-9 h-9 rounded-full bg-white border border-[#CBD5E1] text-[#041E3A] flex items-center justify-center hover:bg-[#FF7900] hover:border-[#FF7900] hover:text-white transition-all duration-200 shadow-sm cursor-pointer group/nav"
                    >
                      <ChevronLeft className="w-4 h-4 group-hover/nav:-translate-x-0.5 transition-transform duration-200" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next project installation"
                      className="w-9 h-9 rounded-full bg-white border border-[#CBD5E1] text-[#041E3A] flex items-center justify-center hover:bg-[#FF7900] hover:border-[#FF7900] hover:text-white transition-all duration-200 shadow-sm cursor-pointer group/nav"
                    >
                      <ChevronRight className="w-4 h-4 group-hover/nav:translate-x-0.5 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 19. PROJECT DETAILS LIGHTBOX MODAL                            */}
      {/* ============================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#020E1E]/90 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl bg-[#041E3A] rounded-[18px] border border-white/15 shadow-2xl overflow-hidden flex flex-col p-4 sm:p-6 text-white my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF7900]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                    PROJECT {currentProject.number} / {String(totalProjects).padStart(2, '0')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF7900] text-white flex items-center justify-center transition-colors duration-150 cursor-pointer"
                  aria-label="Close project modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Complete, Uncropped Presentation Slide */}
              <div className="w-full aspect-[16/9] max-h-[70vh] bg-white rounded-xl overflow-hidden border border-white/20 mb-4 relative flex items-center justify-center shadow-lg">
                <img
                  src={
                    (typeof window !== 'undefined' &&
                      localStorage.getItem('tppl_project_slide_' + currentProject.id)?.startsWith('data:image/') &&
                      localStorage.getItem('tppl_project_slide_' + currentProject.id)) ||
                    encodeURI(decodeURI(currentProject.photoCandidateUrls[0])) ||
                    getProjectFallbackSlideSvg(currentProject)
                  }
                  alt={`Full slide: ${currentProject.title}`}
                  className="w-full h-full object-contain bg-white"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = getProjectFallbackSlideSvg(currentProject);
                  }}
                />
              </div>

              {/* Modal Footer Information */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4
                    id="modal-project-title"
                    className="font-display text-sm sm:text-base font-bold text-white tracking-tight"
                  >
                    {currentProject.title}
                  </h4>
                  {(currentProject.client || currentProject.location) && (
                    <p className="text-white/70 mt-0.5">
                      {currentProject.client}
                      {currentProject.client && currentProject.location ? ' • ' : ''}
                      {currentProject.location}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="self-end sm:self-center px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
