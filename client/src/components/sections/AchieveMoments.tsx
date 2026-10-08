import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Layers, Eye, Maximize2, ChevronLeft, ChevronRight, Sparkles, Play, Pause } from 'lucide-react';
import { Lightbox } from '../common/Lightbox';
import { GalleryItem } from '../../types';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

export interface MomentItem {
  id: string;
  year: number;
  title: string;
  tagline: string;
  tag: string;
  image: string;
  category: string;
}

export const MOMENTS_DATA: MomentItem[] = [
  {
    id: 'm1',
    year: 2026,
    title: 'BGU SPECTRA 2026',
    tagline: 'National Champions — 1st Place Gold Trophy',
    tag: 'National Champion',
    image: '/images/achievements/bgu-spectra-2026.jpg',
    category: 'Championship',
  },
  {
    id: 'm2',
    year: 2026,
    title: 'ASBM IGNITE 2026',
    tagline: '1st Runners Up — Best Haute Couture Ensemble',
    tag: 'Championship',
    image: '/images/achievements/asbm-2026.png',
    category: 'Championship',
  },
  {
    id: 'm3',
    year: 2026,
    title: 'IDA / KIIT FEST 2026',
    tagline: 'Excellence in Runway Choreography & Stage Sync',
    tag: 'Gold Award',
    image: '/images/achievements/ida-2026.jpg',
    category: 'Championship',
  },
  {
    id: 'm4',
    year: 2026,
    title: 'GENESIS 2026',
    tagline: '1st Place Winners — Grand Styling & Ramp Cadence',
    tag: 'Best Styling',
    image: '/images/achievements/genesis-2026.jpg',
    category: 'Championship',
  },
  {
    id: 'm5',
    year: 2026,
    title: 'RCM FEST 2026',
    tagline: '1st Place Champions — Glamour & Couture Podium',
    tag: '1st Prize',
    image: '/images/achievements/rcm-2026.jpg',
    category: 'Championship',
  },
  {
    id: 'm6',
    year: 2026,
    title: 'BRAHMĀSTRA CHAMPIONS',
    tagline: 'Overall National Champions — Gold Trophy Showcase',
    tag: 'National Trophy',
    image: '/images/achievements/achievement-trophy.png',
    category: 'Championship',
  },
  {
    id: 'm7',
    year: 2025,
    title: 'AIIMS BBSR — CHIASMA',
    tagline: 'National Fashion Trophy Winners',
    tag: '1st Place',
    image: '/images/achievements/aiims-bbsr.png',
    category: 'Archival Glory',
  },
  {
    id: 'm8',
    year: 2025,
    title: 'BGU RUNWAY 2025',
    tagline: 'Runway Champions & Best Theme Presentation',
    tag: 'Winners',
    image: '/images/achievements/bgu-2025.png',
    category: 'Archival Glory',
  },
  {
    id: 'm9',
    year: 2026,
    title: 'Anantara Imperial Brocade Stride',
    tagline: 'Spectra Gold Grand Finale Walk',
    tag: 'Runway',
    image: '/images/runway/runway-vol1-dsc-0004.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm10',
    year: 2026,
    title: 'Haute Couture Studio Portrait',
    tagline: 'Bespoke Zari Weave & Statement Styling',
    tag: 'Editorial',
    image: '/images/shoots/shoot-20260403-sd0-8440.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm11',
    year: 2026,
    title: 'Sculptural Royal Arch Drape',
    tagline: 'Contemporary Heritage Silhouette',
    tag: 'Editorial',
    image: '/images/shoots/shoot-20260403-sd0-8461.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm12',
    year: 2026,
    title: 'Backstage Formations & Drills',
    tagline: 'Runway Masterclass & Synchrony Clinic',
    tag: 'Masterclass',
    image: '/images/workshops/workshop-dsc02769.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm13',
    year: 2026,
    title: 'Spotlight Synchronized Formations',
    tagline: 'Stage Authority & Precision Strides',
    tag: 'Runway',
    image: '/images/runway/runway-vol2-dsc-0004.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm14',
    year: 2026,
    title: 'Evolution Noir Contemporary Cut',
    tagline: 'High-Fashion Magazine Studio Lookbook',
    tag: 'Editorial',
    image: '/images/shoots/shoot-20260403-sd0-8497.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm15',
    year: 2026,
    title: 'Imperial Raj Ghrana Grand Walk',
    tagline: 'National Circuit Golden Brocade Series',
    tag: 'Runway',
    image: '/images/runway/runway-vol1-dsc-0010.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm16',
    year: 2026,
    title: 'Neo-Western Metallic Fusion',
    tagline: 'Avant-Garde Architectural Draping',
    tag: 'Editorial',
    image: '/images/shoots/shoot-20260403-sd0-8531.jpg',
    category: 'Lookbook',
  },
];

export const AchieveMoments: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'fan' | 'grid'>('fan');
  const [aspectFormat, setAspectFormat] = useState<'landscape' | 'portrait'>('landscape');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  // Automatic Smooth Motion Loop (moves every 3.5 seconds)
  useEffect(() => {
    if (isReduced || !isAutoPlaying || isHovered || viewMode !== 'fan') return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOMENTS_DATA.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isReduced, isAutoPlaying, isHovered, viewMode]);

  const handleNext = () => {
    sound.playClick();
    setActiveIndex((prev) => (prev + 1) % MOMENTS_DATA.length);
  };

  const handlePrev = () => {
    sound.playClick();
    setActiveIndex((prev) => (prev - 1 + MOMENTS_DATA.length) % MOMENTS_DATA.length);
  };

  const handleCardClick = (idx: number) => {
    sound.playClick();
    if (viewMode === 'fan' && idx !== activeIndex) {
      setActiveIndex(idx);
    } else {
      setLightboxIndex(idx);
    }
  };

  // Touch Swipe Navigation for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Convert to Lightbox gallery format
  const lightboxItems: GalleryItem[] = MOMENTS_DATA.map((m, idx) => ({
    id: m.id,
    title: m.title,
    category: 'EDITORIAL' as const,
    imageUrl: m.image,
    aspectRatio: (aspectFormat === 'landscape' ? '16:9' : '3:4') as '16:9' | '3:4',
    isFeatured: true,
    displayOrder: idx + 1,
  }));

  return (
    <section
      id="achieve-moments"
      className="py-24 sm:py-32 bg-vogue-black relative overflow-hidden border-t border-vogue-gold/20 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-vogue-gold/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Eyebrow with Running Script */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-vogue-gold/35 bg-vogue-dark/90 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(216,181,106,0.15)]">
            <Trophy className="w-3.5 h-3.5 text-vogue-gold" />
            <span className="font-script text-2xl sm:text-3xl text-vogue-gold font-normal">
              Archival Moments
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase tracking-[0.16em] font-bold text-vogue-ivory">
            Achieve <span className="text-transparent bg-clip-text bg-gradient-to-r from-vogue-gold via-vogue-champagne to-vogue-gold">Moments</span>
          </h2>
          <p className="text-xs sm:text-sm text-vogue-champagne/80 font-sans tracking-wider mt-3 max-w-xl mx-auto">
            Interactive lookbook and automatic 3D fanned deck archiving all official championship walks, trophies, and couture galas of Team VOGUE SOA.
          </p>

          {/* Mode & Auto-Motion Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-vogue-dark border border-vogue-gold/25 shadow-lg">
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode('fan');
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all cursor-pointer ${
                  viewMode === 'fan'
                    ? 'bg-vogue-gold text-vogue-black shadow-[0_0_15px_rgba(216,181,106,0.4)]'
                    : 'text-vogue-champagne hover:text-vogue-gold'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Auto Deck ({MOMENTS_DATA.length})</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode('grid');
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-vogue-gold text-vogue-black shadow-[0_0_15px_rgba(216,181,106,0.4)]'
                    : 'text-vogue-champagne hover:text-vogue-gold'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lookbook Grid</span>
              </button>
            </div>

            {/* Auto-Play Toggle */}
            {viewMode === 'fan' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setIsAutoPlaying(!isAutoPlaying);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all border cursor-pointer ${
                  isAutoPlaying
                    ? 'border-vogue-gold bg-vogue-gold/15 text-vogue-gold shadow-[0_0_12px_rgba(184,155,94,0.25)]'
                    : 'border-white/20 text-vogue-champagne/60 hover:text-vogue-champagne'
                }`}
              >
                {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isAutoPlaying ? 'Auto-Moving' : 'Paused'}</span>
              </button>
            )}

            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-vogue-dark border border-vogue-gold/25 shadow-lg">
              <span className="text-[10px] uppercase tracking-widest text-vogue-gold/75 pl-3 pr-1.5 font-bold">
                Format:
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setAspectFormat('landscape');
                }}
                className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  aspectFormat === 'landscape'
                    ? 'bg-vogue-gold text-vogue-black shadow-md'
                    : 'text-vogue-champagne/75 hover:text-vogue-champagne'
                }`}
              >
                Landscape
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setAspectFormat('portrait');
                }}
                className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  aspectFormat === 'portrait'
                    ? 'bg-vogue-gold text-vogue-black shadow-md'
                    : 'text-vogue-champagne/75 hover:text-vogue-champagne'
                }`}
              >
                Portrait
              </button>
            </div>
          </div>

          <p className="text-[11px] font-mono text-vogue-gold/70 mt-4 uppercase tracking-wider">
            Auto-moving continuous 3D deck • Hover to inspect or click any card for full view
          </p>
        </div>

        {/* ─── Mode 1: 3D Interactive Fan Deck with Auto Movement ─── */}
        {viewMode === 'fan' ? (
          <div className="relative my-8 sm:my-14 min-h-[420px] sm:min-h-[500px] flex items-center justify-center">
            
            {/* Previous Arrow Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-40 p-3 rounded-full border border-vogue-gold/40 bg-vogue-dark/90 text-vogue-gold hover:bg-vogue-gold hover:text-vogue-black transition-all shadow-xl cursor-pointer"
              aria-label="Previous Moment"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Arrow Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-40 p-3 rounded-full border border-vogue-gold/40 bg-vogue-dark/90 text-vogue-gold hover:bg-vogue-gold hover:text-vogue-black transition-all shadow-xl cursor-pointer"
              aria-label="Next Moment"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Centered 3D Card Fan Display */}
            <div className="relative w-full max-w-2xl h-[340px] sm:h-[420px] flex items-center justify-center">
              {MOMENTS_DATA.map((item, idx) => {
                const offset = (idx - activeIndex + MOMENTS_DATA.length) % MOMENTS_DATA.length;
                const normalizedOffset = offset > MOMENTS_DATA.length / 2 ? offset - MOMENTS_DATA.length : offset;
                const isVisible = Math.abs(normalizedOffset) <= 3;
                if (!isVisible) return null;

                const isActive = normalizedOffset === 0;
                const rotateZ = normalizedOffset * 7;
                const translateX = normalizedOffset * 65;
                const translateY = Math.abs(normalizedOffset) * 12;
                const scale = 1 - Math.abs(normalizedOffset) * 0.1;
                const zIndex = 30 - Math.abs(normalizedOffset);

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => handleCardClick(idx)}
                    animate={{
                      rotateZ: isReduced ? 0 : rotateZ,
                      x: isReduced ? 0 : translateX,
                      y: isReduced ? 0 : translateY,
                      scale: isActive ? 1 : scale,
                      opacity: Math.abs(normalizedOffset) <= 2 ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ zIndex }}
                    className={`absolute cursor-pointer rounded-sm overflow-hidden border bg-vogue-dark shadow-2xl transition-all duration-300 ${
                      isActive
                        ? 'border-vogue-gold shadow-[0_0_35px_rgba(216,181,106,0.35)] w-[290px] sm:w-[380px] md:w-[440px]'
                        : 'border-vogue-gold/30 hover:border-vogue-gold/70 w-[260px] sm:w-[340px] md:w-[390px]'
                    } ${aspectFormat === 'landscape' ? 'aspect-[16/10]' : 'aspect-[3/4]'}`}
                  >
                    <div className="relative w-full h-full overflow-hidden group">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isActive ? 'group-hover:scale-105' : 'brightness-75'
                        }`}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-vogue-black/40 to-transparent pointer-events-none" />

                      {/* Floating Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-vogue-black/90 border border-vogue-gold/80 text-vogue-gold text-[9px] uppercase font-bold tracking-widest backdrop-blur-sm">
                          {item.tag}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-vogue-black/80 border border-white/20 text-vogue-ivory text-[9px] font-mono font-bold">
                          {item.year}
                        </span>
                      </div>

                      {/* Card Bottom Meta */}
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between">
                        <div>
                          <h4 className="font-serif text-base sm:text-xl font-bold uppercase tracking-wide text-vogue-ivory">
                            {item.title}
                          </h4>
                          <p className="text-[10px] sm:text-xs text-vogue-champagne/90 font-sans line-clamp-1 mt-0.5">
                            {item.tagline}
                          </p>
                        </div>
                        <div className="p-2 rounded-full bg-vogue-gold/20 text-vogue-gold border border-vogue-gold/50 shrink-0">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Dot Navigator Pips */}
            <div className="absolute bottom-0 flex items-center justify-center gap-1.5">
              {MOMENTS_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sound.playClick();
                    setActiveIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i
                      ? 'w-6 bg-vogue-gold shadow-[0_0_8px_rgba(216,181,106,0.6)]'
                      : 'w-1.5 bg-vogue-gold/30 hover:bg-vogue-gold/60'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

          </div>
        ) : (
          /* ─── Mode 2: Lookbook Masonry Grid ─── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-10">
            {MOMENTS_DATA.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setLightboxIndex(idx)}
                className={`relative rounded-sm overflow-hidden border border-vogue-gold/30 bg-vogue-dark group cursor-pointer hover:border-vogue-gold hover:shadow-2xl transition-all duration-300 ${
                  aspectFormat === 'landscape' ? 'aspect-[16/10]' : 'aspect-[3/4]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-vogue-black/90 border border-vogue-gold/70 text-vogue-gold text-[8px] uppercase font-bold tracking-widest">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold uppercase tracking-wide text-vogue-ivory">
                      {item.title}
                    </h4>
                    <span className="text-[9px] text-vogue-champagne/80 block font-sans">
                      {item.tagline}
                    </span>
                  </div>
                  <Maximize2 className="w-3.5 h-3.5 text-vogue-gold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </section>
  );
};

export default AchieveMoments;
