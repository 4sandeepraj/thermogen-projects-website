import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Award,
  ChevronDown,
  ChevronUp,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  User,
  Quote,
  Camera,
  Upload,
} from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  badge?: string;
  isDirector?: boolean;
  altText: string;
  monogram?: string;
  photoUrl?: string;
  defaultFileName?: string;
  photoCandidateUrls?: string[];
  objectPosition?: string;
  profile: string;
  expertiseTitle: string;
  expertise: string[];
}

// Exactly the 5 verified team members from the Thermogen Projects Company Profile
const teamMembers: TeamMember[] = [
  {
    id: 'kuldeep-raj',
    name: 'Mr. Kuldeep Raj',
    designation: 'Director',
    badge: 'DIRECTOR',
    isDirector: true,
    altText: 'Mr. Kuldeep Raj – Director, Thermogen Projects Private Limited',
    photoUrl: '/kuldeep%20Raj.png',
    defaultFileName: 'kuldeep Raj.png',
    photoCandidateUrls: [
      '/kuldeep%20Raj.png',
      '/kuldeep-raj.png',
      '/kuldeep Raj.png',
      '/KULDEEP%20RAJ.png',
      '/KULDEEP RAJ.png',
    ],
    objectPosition: 'center 15%',
    profile:
      'Mr. Kuldeep Raj is the Director of THERMOGEN PROJECTS PRIVATE LIMITED and an alumnus of XLRI Jamshedpur. He brings over 7 years of extensive experience in the natural gas and industrial energy sector, with expertise spanning project execution, combustion systems, industrial gas infrastructure, and business strategy.',
    expertiseTitle: 'Core Expertise',
    expertise: [
      'Project Planning, Enhancement & Optimization',
      'Techno-Commercial Feasibility Studies',
      'Energy Audit & Sustainability Solutions',
      'Industrial Combustion Systems',
      'Natural Gas & Alternative Fuel Infrastructure',
      'Commercial Strategy & Business Development',
      'Turnkey Project Execution',
      'Cost Optimization & Operational Excellence',
    ],
  },
  {
    id: 'hn-roy',
    name: 'Mr. H. N. Roy',
    designation: 'Senior Technical Advisor',
    altText: 'Mr. H. N. Roy – Senior Technical Advisor, Thermogen Projects Private Limited',
    photoUrl: '/H%20N%20ROY.png',
    defaultFileName: 'H N ROY.png',
    photoCandidateUrls: [
      '/H%20N%20ROY.png',
      '/h-n-roy.png',
      '/H N ROY.png',
      '/h%20n%20roy.png',
      '/H-N-ROY.png',
      '/HN%20ROY.png',
    ],
    objectPosition: 'center 15%',
    profile:
      'Mr. H. N. Roy serves as the Senior Technical Advisor to TPPL. He is the Proprietor of M/s H. N. Roy and a Partner at G S Alternate Energy, bringing more than 30 years of rich industry experience in the development of natural gas infrastructure and alternative fuel projects.',
    expertiseTitle: 'Areas of Expertise',
    expertise: [
      'CNG Mother Station Development',
      'CBM Infrastructure Development',
      'Industrial Gas Marketing',
      'Fuel Infrastructure Planning',
      'Strategic Technical Advisory',
    ],
  },
  {
    id: 'sandeep-raj',
    name: 'Mr. Sandeep Raj',
    designation: 'Head – Logistics & Supply Chain',
    altText: 'Mr. Sandeep Raj – Head – Logistics & Supply Chain, Thermogen Projects Private Limited',
    photoUrl: '/SANDEEP%20RAJ.png',
    defaultFileName: 'SANDEEP RAJ.png',
    photoCandidateUrls: [
      '/SANDEEP%20RAJ.png',
      '/sandeep-raj.png',
      '/SANDEEP RAJ.png',
      '/sandeep%20raj.png',
      '/SANDEEP-RAJ.png',
    ],
    objectPosition: 'center 15%',
    profile:
      'Mr. Sandeep Raj heads the Logistics and Supply Chain operations at TPPL. With extensive experience in transportation management, he owns and operates a fleet of more than 30 Heavy Commercial Vehicles (HCVs).',
    expertiseTitle: 'Core Expertise',
    expertise: [
      'Fleet Management',
      'Industrial Logistics',
      'LPG Transportation',
      'Supply Chain Planning',
      'Transport Operations',
    ],
  },
  {
    id: 'raj-singh',
    name: 'Mr. Raj Singh',
    designation: 'Head – Sales & Marketing',
    altText: 'Mr. Raj Singh – Head – Sales & Marketing, Thermogen Projects Private Limited',
    photoUrl: '/RAJ%20SINGH.png',
    defaultFileName: 'RAJ SINGH.png',
    photoCandidateUrls: [
      '/RAJ%20SINGH.png',
      '/raj-singh.png',
      '/RAJ SINGH.png',
      '/raj%20singh.png',
      '/RAJ-SINGH.png',
    ],
    objectPosition: 'center 12%',
    profile:
      "Based in Delhi NCR, Mr. Raj Singh leads TPPL's Sales and Marketing division. He is responsible for business development, customer relationship management, strategic partnerships, and market expansion across India.",
    expertiseTitle: 'Core Expertise',
    expertise: [
      'Business Development',
      'Sales Strategy',
      'Customer Relationship Management',
      'Industrial Marketing',
      'Market Expansion',
    ],
  },
  {
    id: 'kiran-singh',
    name: 'Ms. Kiran Singh',
    designation: 'Head – Quality Assurance & Testing',
    altText: 'Ms. Kiran Singh – Head – Quality Assurance & Testing, Thermogen Projects Private Limited',
    photoUrl: '/KIRAN%20SINGH.png',
    defaultFileName: 'KIRAN SINGH.png',
    photoCandidateUrls: [
      '/KIRAN%20SINGH.png',
      '/kiran-singh.png',
      '/KIRAN SINGH.png',
      '/kiran%20singh.png',
      '/KIRAN-SINGH.png',
    ],
    objectPosition: 'center 15%',
    profile:
      'Based in Delhi NCR, Ms. Kiran Singh leads the Quality Assurance and Testing Department. She oversees quality control processes, inspection protocols, testing procedures, and compliance with applicable engineering and safety standards.',
    expertiseTitle: 'Core Expertise',
    expertise: [
      'Quality Assurance',
      'Inspection & Testing',
      'Engineering Documentation',
      'Process Compliance',
      'Continuous Quality Improvement',
    ],
  },
];

const getMemberFallbackSvg = (member: TeamMember) => {
  const isDirector = member.id === 'kuldeep-raj';
  const isRoy = member.id === 'hn-roy';
  const isSandeep = member.id === 'sandeep-raj';
  const isRaj = member.id === 'raj-singh';
  const isKiran = member.id === 'kiran-singh';

  const tieColor = isDirector ? '#1E6CB0' : isRoy ? '#D97706' : isSandeep ? '#0284C7' : isRaj ? '#E11D48' : '#0D9488';
  const hairColor = isRoy ? '#4B5563' : '#1C1816';
  const hairHighlight = isRoy ? '#9CA3AF' : '#2D2825';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
    <defs>
      <linearGradient id="bg_${member.id}" x1="0%" y1="0%" x2="0%" y2="1">
        <stop offset="0%" stop-color="#07264A"/>
        <stop offset="60%" stop-color="#041B36"/>
        <stop offset="100%" stop-color="#021024"/>
      </linearGradient>
      <linearGradient id="suit_${member.id}" x1="0%" y1="0%" x2="0%" y2="1">
        <stop offset="0%" stop-color="#0A2240"/>
        <stop offset="100%" stop-color="#051528"/>
      </linearGradient>
      <linearGradient id="accent_${member.id}" x1="0%" y1="0%" x2="0%" y2="1">
        <stop offset="0%" stop-color="${tieColor}"/>
        <stop offset="100%" stop-color="#07264A"/>
      </linearGradient>
      <radialGradient id="glow_${member.id}" cx="70%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#FF7900" stop-opacity="0.22"/>
        <stop offset="60%" stop-color="#1688E8" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="#041B36" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="500" fill="url(#bg_${member.id})"/>
    <rect width="400" height="500" fill="url(#glow_${member.id})"/>
    
    <!-- Technical Blueprint Schematic Overlay -->
    <g opacity="0.30">
      <rect x="290" y="80" width="16" height="420" fill="#1688E8"/>
      <rect x="330" y="140" width="12" height="360" fill="#1688E8"/>
      <line x1="270" y1="120" x2="360" y2="120" stroke="#1688E8" stroke-width="1.5"/>
      <line x1="270" y1="180" x2="360" y2="180" stroke="#1688E8" stroke-width="1.5"/>
      <line x1="270" y1="240" x2="360" y2="240" stroke="#1688E8" stroke-width="1.5"/>
      <circle cx="298" cy="82" r="3" fill="#FF7900"/>
      <circle cx="336" cy="142" r="3" fill="#FFB800"/>
      <rect x="45" y="190" width="18" height="310" fill="#1688E8" opacity="0.5"/>
      <line x1="35" y1="230" x2="85" y2="230" stroke="#1688E8" stroke-width="1.5"/>
    </g>

    <!-- Professional Executive Attire -->
    <path d="M 60 500 L 90 380 Q 140 330 200 330 Q 260 330 310 380 L 340 500 Z" fill="url(#suit_${member.id})"/>
    
    ${
      isKiran
        ? `<!-- Executive Blazer & Inner Blouse for Kiran Singh -->
           <polygon points="170,332 200,395 230,332 215,330 200,365 185,330" fill="#F8FAFC"/>
           <polygon points="192,360 208,360 200,430" fill="url(#accent_${member.id})"/>`
        : `<!-- Executive Shirt & Tie -->
           <polygon points="172,332 200,385 228,332 215,330 200,355 185,330" fill="#FFFFFF"/>
           <polygon points="194,360 206,360 210,460 200,480 190,460" fill="url(#accent_${member.id})"/>
           <circle cx="200" cy="385" r="1.5" fill="#FFFFFF" opacity="0.7"/>
           <circle cx="200" cy="415" r="1.5" fill="#FFFFFF" opacity="0.7"/>
           <circle cx="200" cy="445" r="1.5" fill="#FFFFFF" opacity="0.7"/>`
    }

    <!-- Neck & Face -->
    <rect x="182" y="275" width="36" height="60" rx="6" fill="#DDB89A"/>
    <ellipse cx="200" cy="235" rx="54" ry="64" fill="#E8C4A7"/>

    <!-- Hair & Styling -->
    ${
      isKiran
        ? `<!-- Professional Women Styling for Kiran Singh -->
           <path d="M 136 240 C 134 160, 266 160, 264 240 C 264 195, 230 170, 200 170 C 170 170, 136 195, 136 240 Z" fill="${hairColor}"/>
           <path d="M 136 240 C 130 290, 145 340, 155 350 C 150 330, 146 290, 146 250 Z" fill="${hairColor}"/>
           <path d="M 264 240 C 270 290, 255 340, 245 350 C 250 330, 254 290, 254 250 Z" fill="${hairColor}"/>`
        : `<!-- Short Executive Men Hair -->
           <path d="M 144 225 C 142 165, 258 165, 256 225 C 256 185, 144 185, 144 225 Z" fill="${hairColor}"/>
           <path d="M 152 205 Q 200 175 248 205 Q 200 185 152 205 Z" fill="${hairHighlight}"/>`
    }

    ${
      !isKiran
        ? `<!-- Mustache / Facial Grooming -->
           <path d="M 176 256 Q 200 252 224 256 Q 200 262 176 256 Z" fill="${hairColor}"/>`
        : ''
    }

    <!-- Glasses for Mr. Kuldeep Raj and Mr. H. N. Roy -->
    ${
      isDirector || isRoy
        ? `<rect x="162" y="214" width="30" height="20" rx="4" fill="none" stroke="#1A202C" stroke-width="3"/>
           <rect x="208" y="214" width="30" height="20" rx="4" fill="none" stroke="#1A202C" stroke-width="3"/>
           <line x1="192" y1="222" x2="208" y2="222" stroke="#1A202C" stroke-width="3"/>`
        : ''
    }

    <!-- Eyes & Eyebrows -->
    <circle cx="177" cy="224" r="3" fill="#2D3748"/>
    <circle cx="223" cy="224" r="3" fill="#2D3748"/>
    <path d="M 163 210 Q 177 207 191 211" stroke="${hairColor}" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M 209 211 Q 223 207 237 210" stroke="${hairColor}" stroke-width="3" stroke-linecap="round" fill="none"/>

    <!-- Bottom Executive Nameplate Badge -->
    <rect x="25" y="445" width="350" height="42" rx="8" fill="#041E3A" fill-opacity="0.90" stroke="#1688E8" stroke-opacity="0.35"/>
    <text x="200" y="463" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" letter-spacing="1.2">${member.name.toUpperCase()}</text>
    <text x="200" y="477" text-anchor="middle" fill="#FF7900" font-family="system-ui, sans-serif" font-size="9.5" font-weight="600" letter-spacing="0.8">${member.designation.toUpperCase()}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
};

interface PortraitPhotoProps {
  member: TeamMember;
  isLarge?: boolean;
}

const PortraitPhoto: React.FC<PortraitPhotoProps> = ({ member, isLarge = false }) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [useFallbackSvg, setUseFallbackSvg] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [customPhoto, setCustomPhoto] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('tppl_member_photo_' + member.id);
      } catch {
        return null;
      }
    }
    return null;
  });

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setCustomPhoto(result);
          setUseFallbackSvg(false);
          try {
            localStorage.setItem('tppl_member_photo_' + member.id, result);
          } catch {
            // ignore
          }
          fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name || member.defaultFileName || `${member.name}.png`,
              dataUrl: result,
            }),
          }).catch(() => {});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const candidateUrls =
    member.photoCandidateUrls && member.photoCandidateUrls.length > 0
      ? member.photoCandidateUrls
      : member.photoUrl
      ? [member.photoUrl]
      : [];

  const rawUrl =
    customPhoto ||
    (useFallbackSvg
      ? getMemberFallbackSvg(member)
      : candidateUrls[candidateIndex] || member.photoUrl || '');

  const currentUrl =
    rawUrl.startsWith('data:')
      ? rawUrl
      : encodeURI(decodeURI(rawUrl));

  return (
    <div
      className={`group/photo relative w-full h-full overflow-hidden bg-[#041E3A] ${
        isLarge ? 'rounded-[18px]' : 'rounded-[14px]'
      } ${isDragging ? 'ring-2 ring-[#FF7900]' : ''}`}
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

      <img
        src={currentUrl}
        alt={member.altText}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        style={{ objectPosition: member.objectPosition || 'center 15%' }}
        referrerPolicy="no-referrer"
        loading="eager"
        onError={() => {
          if (candidateIndex + 1 < candidateUrls.length) {
            setCandidateIndex((prev) => prev + 1);
          } else {
            setUseFallbackSvg(true);
          }
        }}
      />
      {/* Subtle executive inner border */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />

      {/* Upload button to easily pick/update member photograph or drag & drop directly */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        title={`Click to select photograph (${member.defaultFileName || member.name + '.png'}) or drag & drop directly`}
        className={`absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white font-medium opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200 hover:bg-[#1688E8] hover:border-[#1688E8] cursor-pointer shadow-lg ${
          isLarge ? 'px-2.5 py-1.5 text-[11px]' : 'px-2 py-1 text-[10px]'
        }`}
      >
        <Camera className={`${isLarge ? 'w-3.5 h-3.5' : 'w-3 h-3'} text-[#FF7900]`} />
        <span>{isLarge ? 'Upload / Change Photo' : 'Upload Photo'}</span>
      </button>
    </div>
  );
};

export const OurTeamSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [directorExpanded, setDirectorExpanded] = useState(false);

  const director = teamMembers[0];
  const otherMembers = teamMembers.slice(1);

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative z-20 w-full bg-[#F7FAFD] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 xl:px-14 border-t border-[#E3EAF2] overflow-hidden"
    >
      {/* Background Subtle Blueprint Grid & Pipeline Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#062B52 1px, transparent 1px), linear-gradient(to right, #062B52 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Subtle Slow Motion Pipeline Curve Wave in Background */}
      <svg
        className="absolute -right-20 top-1/4 w-[600px] h-[600px] pointer-events-none opacity-[0.03] text-[#1688E8]"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 50 100 C 150 100, 200 300, 350 300"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="8 8"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  strokeDashoffset: [0, -100],
                }
          }
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M 50 200 C 180 200, 220 100, 350 100"
          stroke="currentColor"
          strokeWidth="2"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  strokeDashoffset: [0, 80],
                }
          }
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      <div className="relative z-10 w-[94%] max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[840px] mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-3.5"
          >
            <span className="w-7 h-[2px] rounded-full bg-[#FF7900]" aria-hidden="true" />
            <span className="font-heading text-[13px] sm:text-[14px] font-bold text-[#FF7900] tracking-[0.2em] uppercase">
              OUR TEAM
            </span>
            <span className="w-7 h-[2px] rounded-full bg-[#FF7900]" aria-hidden="true" />
          </motion.div>

          <motion.h2
            id="team-heading"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-heading text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-[#062B52] leading-[1.18] tracking-tight mb-4"
          >
            Experts Behind <span className="text-[#1688E8]">Our Success</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-body text-[15.5px] sm:text-[16.5px] text-[#5F6F82] leading-[1.65] max-w-[740px]"
          >
            Our strength lies in our people, combining technical expertise, industry knowledge,
            strategic management, and operational excellence to deliver reliable engineering
            solutions.
          </motion.p>
        </div>

        {/* 1. DIRECTOR - FEATURED LEADERSHIP CARD */}
        <motion.div
          id={director.id}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="group relative w-full bg-white rounded-[20px] border border-[#E6EBF2] shadow-[0_4px_24px_rgba(6,43,82,0.05)] hover:border-[#1688E8]/40 hover:shadow-[0_12px_36px_rgba(6,43,82,0.09)] transition-all duration-300 ease-out mb-10 sm:mb-12 overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          {/* Subtle decorative edge gradient */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF7900] via-[#1688E8] to-[#062B52]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: 4:5 Portrait Frame (Desktop: 4 cols) */}
            <div className="lg:col-span-4 xl:col-span-4 flex justify-center">
              <div className="w-full max-w-[320px] aspect-[4/5] rounded-[18px] shadow-[0_6px_20px_rgba(6,43,82,0.12)]">
                <PortraitPhoto member={director} isLarge={true} />
              </div>
            </div>

            {/* Right: Leadership Details & Full Documented Bio (Desktop: 8 cols) */}
            <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-center">
              {/* Badge & Designation Header */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF7900]/10 border border-[#FF7900]/30 text-[#FF7900] text-[11.5px] font-heading font-bold tracking-[0.12em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
                  {director.badge}
                </span>
                <span className="text-[12px] font-semibold text-[#8AA2BC] tracking-wider uppercase">
                  THERMOGEN PROJECTS LEADERSHIP
                </span>
              </div>

              {/* Director Name */}
              <h3 className="font-heading font-extrabold text-[26px] sm:text-[30px] lg:text-[32px] text-[#062B52] leading-[1.2] mb-1.5">
                {director.name}
              </h3>

              {/* Director Designation */}
              <span className="font-heading text-[16px] sm:text-[17px] font-semibold text-[#1688E8] tracking-wide mb-4 block">
                {director.designation}
              </span>

              {/* Exact Documented Profile */}
              <p className="font-body text-[15px] sm:text-[15.5px] text-[#5F6F82] leading-[1.65] mb-6">
                {director.profile}
              </p>

              {/* Core Expertise Section */}
              <div className="pt-5 border-t border-[#F0F4F8]">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#FF7900]" />
                    <h4 className="font-heading font-bold text-[13.5px] text-[#062B52] uppercase tracking-wider">
                      {director.expertiseTitle}
                    </h4>
                  </div>
                  {director.expertise.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setDirectorExpanded(!directorExpanded)}
                      className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#1688E8] hover:text-[#FF7900] transition-colors duration-200 cursor-pointer focus:outline-none"
                      aria-expanded={directorExpanded}
                    >
                      <span>
                        {directorExpanded
                          ? 'Show Less'
                          : `View All Expertise (${director.expertise.length})`}
                      </span>
                      {directorExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Primary Visible Expertise Tags (4 visible, expandable to all 8) */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {(directorExpanded
                    ? director.expertise
                    : director.expertise.slice(0, 4)
                  ).map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F8FB] border border-[#E6EBF2] text-[#062B52] text-[12.5px] sm:text-[13px] font-medium transition-colors duration-200 hover:border-[#1688E8]/30 hover:bg-[#F0F6FC]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1688E8] shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. OTHER FOUR TEAM CARDS (Consistent 4-column desktop, 2x2 tablet, 1-col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 mb-14 sm:mb-16">
          {otherMembers.map((member, index) => {
            return (
              <motion.div
                key={member.id}
                id={member.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.08,
                }}
                className="group relative flex flex-col justify-between p-6 rounded-[18px] bg-white border border-[#E6EBF2] shadow-[0_2px_12px_rgba(6,43,82,0.03)] hover:border-[#1688E8]/50 hover:shadow-[0_12px_32px_rgba(6,43,82,0.08)] hover:-translate-y-1.5 transition-all duration-300 ease-out"
              >
                <div>
                  {/* Photo Container: 4:5 ratio */}
                  <div className="w-full aspect-[4/5] rounded-[14px] overflow-hidden mb-5 shadow-[0_4px_14px_rgba(6,43,82,0.08)]">
                    <PortraitPhoto member={member} isLarge={false} />
                  </div>

                  {/* Name */}
                  <h3 className="font-heading font-bold text-[19px] sm:text-[20px] text-[#062B52] group-hover:text-[#062B52] transition-colors duration-200 leading-[1.25] mb-1">
                    {member.name}
                  </h3>

                  {/* Designation */}
                  <span className="font-heading text-[13.5px] font-semibold text-[#1688E8] tracking-wide mb-3 block min-h-[38px] flex items-center">
                    {member.designation}
                  </span>

                  {/* Short Profile */}
                  <p className="font-body text-[13.5px] sm:text-[14px] text-[#5F6F82] leading-[1.6] mb-5 line-clamp-5">
                    {member.profile}
                  </p>
                </div>

                {/* Core Expertise Section */}
                <div className="pt-4 border-t border-[#F0F4F8]">
                  <h4 className="font-heading font-bold text-[11.5px] text-[#062B52] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF7900]" />
                    <span>{member.expertiseTitle}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {member.expertise.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-[12px] text-[#5F6F82] leading-snug"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1688E8] shrink-0 mt-1.5" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3. LEADERSHIP PHILOSOPHY CLOSING STATEMENT */}
        <motion.div
          id="leadership-philosophy"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[18px] bg-white border border-[#E6EBF2] p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(6,43,82,0.04)] overflow-hidden"
        >
          {/* Subtle left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF7900]" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#F0F6FC] text-[#1688E8] flex items-center justify-center shrink-0">
              <Quote className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-heading text-[12px] font-bold text-[#FF7900] tracking-[0.16em] uppercase">
                  OUR LEADERSHIP PHILOSOPHY
                </span>
              </div>
              <p className="font-body text-[14.5px] sm:text-[15.5px] text-[#062B52] leading-[1.65] font-medium">
                “At THERMOGEN PROJECTS PRIVATE LIMITED, our leadership team combines decades of
                technical expertise, strategic management, operational excellence, and industry
                knowledge. Together, they are committed to delivering innovative engineering
                solutions, sustainable energy infrastructure, and exceptional value to clients
                while fostering long-term partnerships built on trust, quality, and reliability.”
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
