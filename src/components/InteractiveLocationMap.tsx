import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  LocateFixed,
  ArrowUpRight,
  MapPin,
  Compass,
} from 'lucide-react';

interface InteractiveLocationMapProps {
  reducedMotion?: boolean;
}

// Verified official coordinates for Bari Co-operative Colony, Bokaro, Jharkhand 827012
const BOKARO_COORDS: [number, number] = [23.6394, 86.1197];
const DEFAULT_ZOOM = 14;

export const InteractiveLocationMap: React.FC<InteractiveLocationMapProps> = ({
  reducedMotion = false,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any (for clean re-mounts)
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: BOKARO_COORDS,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false, // Prevent wheel scroll hijacking
      doubleClickZoom: true,
      dragging: true,
      fadeAnimation: true,
    });

    mapInstanceRef.current = map;

    // CartoDB Positron: High-precision, clean, light technical basemap
    const tileLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 6,
      }
    );

    // If primary tile fails, seamlessly fallback to OpenStreetMap
    tileLayer.on('tileerror', () => {
      if (!map.hasLayer(tileLayer)) return;
      map.removeLayer(tileLayer);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 5,
      }).addTo(map);
    });

    tileLayer.addTo(map);

    // Custom Location Marker Icon
    // Engineering Blue circular marker + white location-pin icon + thin orange outer accent + subtle animated pulse
    const pulseStyle = reducedMotion
      ? ''
      : `
        <div class="absolute -inset-3 rounded-full bg-[#1688E8] opacity-25 animate-ping duration-[3000ms] pointer-events-none"></div>
        <div class="absolute -inset-1.5 rounded-full border border-[#1688E8]/40 animate-pulse pointer-events-none"></div>
      `;

    const markerHtml = `
      <div class="relative flex items-center justify-center w-12 h-12">
        ${pulseStyle}
        <!-- Thin orange outer accent ring -->
        <div class="absolute w-8 h-8 rounded-full border border-[#FF7A00] bg-[#F0F7FE] shadow-sm pointer-events-none"></div>
        <!-- Engineering Blue circular core with white pin icon -->
        <div class="relative z-10 w-7 h-7 rounded-full bg-[#1688E8] border-2 border-white shadow-[0_3px_10px_rgba(8,46,87,0.35)] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform duration-200">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      </div>
    `;

    const customIcon = L.divIcon({
      html: markerHtml,
      className: 'thermogen-map-marker-container',
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -26],
    });

    const marker = L.marker(BOKARO_COORDS, {
      icon: customIcon,
      title: 'THERMOGEN PROJECTS PRIVATE LIMITED - Registered Office',
      alt: 'Thermogen Projects Bokaro Office Location',
    }).addTo(map);

    // Corporate Leaflet Popup
    const popupContent = document.createElement('div');
    popupContent.className = 'font-sans p-1 text-[#082E57]';
    popupContent.innerHTML = `
      <div style="font-family: Montserrat, sans-serif; font-weight: 700; font-size: 13px; color: #082E57; margin-bottom: 2px;">
        THERMOGEN PROJECTS PVT. LTD.
      </div>
      <div style="font-size: 11px; font-weight: 600; color: #FF7A00; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 3px;">
        Registered Office
      </div>
      <div style="font-size: 11.5px; color: #5F6F82; line-height: 1.4;">
        Plot No. 802, Bari Co-operative,<br/>Bokaro, Jharkhand – 827012
      </div>
    `;
    marker.bindPopup(popupContent, {
      className: 'thermogen-custom-popup',
      closeButton: false,
    });

    // Technical Infrastructure Route Motif (Clean CAD-like connection line)
    const routeCoords: [number, number][] = [
      [23.665, 86.088],
      [23.655, 86.102],
      [23.646, 86.113],
      [23.6394, 86.1197], // Destination
    ];

    L.polyline(routeCoords, {
      color: '#1688E8',
      weight: 2.5,
      opacity: 0.5,
      dashArray: '5, 8',
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    routeCoords.slice(0, -1).forEach((coord, idx) => {
      L.circleMarker(coord, {
        radius: idx === 0 ? 3.5 : 2.5,
        color: idx === 0 ? '#FF7A00' : '#1688E8',
        fillColor: '#FFFFFF',
        fillOpacity: 1,
        weight: 1.5,
      }).addTo(map);
    });

    setIsLoaded(true);

    // Call invalidateSize immediately, at 100ms, and 300ms to guarantee correct tile coverage
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 400);

    // ResizeObserver ensures that any container flex/grid resize updates Leaflet instantly
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [reducedMotion]);

  // Controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(BOKARO_COORDS, DEFAULT_ZOOM, {
        animate: !reducedMotion,
        duration: 1.2,
      });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => {
      const next = !prev;
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
          mapInstanceRef.current.setView(BOKARO_COORDS, DEFAULT_ZOOM);
        }
      }, 120);
      return next;
    });
  };

  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Plot+No.+802,+Bari+Co-operative,+Bokaro,+Jharkhand+827012';

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-300 ease-out ${
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen bg-white rounded-none p-3 sm:p-5'
          : 'rounded-[20px] border border-[#DCE7F2] shadow-[0_4px_20px_rgba(8,46,87,0.06)] h-[280px] sm:h-[320px] lg:h-[350px] bg-[#F7FAFD]'
      }`}
    >
      {/* Primary Leaflet Map Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-10 outline-none"
        tabIndex={0}
        aria-label="Interactive Location Map of Thermogen Projects Registered Office in Bokaro, Jharkhand"
      />

      {/* Engineering CAD Grid Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#082E57 1px, transparent 1px), linear-gradient(to right, #082E57 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Floating Header Badge: Technical Coordinates (Top-Left) */}
      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-30 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#DCE7F2] shadow-[0_2px_8px_rgba(8,46,87,0.06)] text-[11px] font-mono text-[#082E57]">
        <Compass className="w-3.5 h-3.5 text-[#1688E8]" />
        <span className="font-semibold tracking-wider">23°38'22"N • 86°07'11"E</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
        <span className="text-[#5F6F82]">Bokaro Hub</span>
      </div>

      {/* Minimal Engineering Map Controls (Top-Right) */}
      <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 flex items-center gap-1 bg-white/95 backdrop-blur-sm p-1 rounded-xl border border-[#DCE7F2] shadow-[0_2px_12px_rgba(8,46,87,0.08)]">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom In"
          aria-label="Zoom in map"
          className="w-7.5 h-7.5 rounded-lg flex items-center justify-center text-[#082E57] hover:text-[#1688E8] hover:bg-[#F0F7FE] transition-colors duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom Out"
          aria-label="Zoom out map"
          className="w-7.5 h-7.5 rounded-lg flex items-center justify-center text-[#082E57] hover:text-[#1688E8] hover:bg-[#F0F7FE] transition-colors duration-150 cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-[1px] h-4.5 bg-[#E2E8F0] mx-0.5" aria-hidden="true" />
        <button
          type="button"
          onClick={handleRecenter}
          title="Focus Registered Office"
          aria-label="Recenter Bokaro Office"
          className="w-7.5 h-7.5 rounded-lg flex items-center justify-center text-[#082E57] hover:text-[#1688E8] hover:bg-[#F0F7FE] transition-colors duration-150 cursor-pointer"
        >
          <LocateFixed className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          aria-label={isFullscreen ? 'Exit fullscreen map' : 'Expand map fullscreen'}
          className="w-7.5 h-7.5 rounded-lg flex items-center justify-center text-[#082E57] hover:text-[#1688E8] hover:bg-[#F0F7FE] transition-colors duration-150 cursor-pointer"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-[#FF7A00]" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Floating Location Card (Bottom-Left) */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-30 max-w-[calc(100%-24px)] sm:max-w-[330px] bg-white/98 backdrop-blur-md p-3 sm:p-3.5 rounded-[14px] border border-[#DCE7F2] shadow-[0_4px_18px_rgba(8,46,87,0.08)]">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F0F7FE] text-[#1688E8] flex items-center justify-center shrink-0 border border-[#DCE7F2]/60 mt-0.5">
            <MapPin className="w-4 h-4 text-[#1688E8]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-mono text-[10px] font-bold text-[#FF7A00] tracking-wider uppercase">
                Registered Office
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" title="Active Office" />
            </div>
            <h4 className="font-heading font-bold text-[13px] text-[#082E57] leading-tight truncate">
              THERMOGEN PROJECTS PRIVATE LIMITED
            </h4>
            <p className="font-body text-[11.5px] text-[#5F6F82] leading-[1.35] mt-0.5">
              Plot No. 802, Bari Co-operative, Bokaro, Jharkhand – 827012
            </p>
          </div>
        </div>
      </div>

      {/* Map Action Button: "OPEN IN MAPS →" (Bottom-Right) */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 hover:bg-[#082E57] text-[#082E57] hover:text-white border border-[#DCE7F2] shadow-[0_2px_10px_rgba(8,46,87,0.08)] hover:shadow-[0_4px_16px_rgba(8,46,87,0.18)] transition-all duration-200 text-[12px] font-heading font-semibold group cursor-pointer"
        >
          <span>OPEN IN MAPS</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#1688E8] group-hover:text-white transition-colors duration-200" />
        </a>
      </div>
    </div>
  );
};
