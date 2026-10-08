import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Layers, Eye, Maximize2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
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
    tagline: 'National Champions — 1st Place Trophy',
    tag: 'National Champion',
    image: '/images/achievements/bgu-spectra-2026.jpg',
    category: 'Championship',
  },
  {
    id: 'm2',
    year: 2026,
    title: 'ASBM IGNITE 2026',
    tagline: 'Champions — Best Haute Couture Ensemble',
    tag: 'Championship',
    image: '/images/achievements/asbm-2026.png',
    category: 'Championship',
  },
  {
    id: 'm3',
    year: 2026,
    title: 'IDA / KIIT FEST 2026',
    tagline: 'Excellence in Fashion Choreography & Ensemble',
    tag: 'Gold Award',
    image: '/images/achievements/ida-2026.jpg',
    category: 'Championship',
  },
  {
    id: 'm4',
    year: 2026,
    title: 'GENESIS 2026',
    tagline: 'Best Runway Presentation & Styling',
    tag: 'Best Styling',
    image: '/images/achievements/genesis-2026.jpg',
    category: 'Championship',
  },
  {
    id: 'm5',
    year: 2026,
    title: 'RCM FEST 2026',
    tagline: '1st Place Champions — Glamour & Couture',
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
    title: 'Editorial Runway Silhouette',
    tagline: 'Couture Gala Session',
    tag: 'Editorial',
    image: '/images/shoots/shoot-20260403-sd0-8440.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm10',
    year: 2026,
    title: 'Avant-Garde Drape & Poise',
    tagline: 'Bespoke Costume Styling',
    tag: 'Styling',
    image: '/images/runway/runway-vol1-dsc-0004.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm11',
    year: 2026,
    title: 'Royal Velvet Walk',
    tagline: 'Anantara Runway Series',
    tag: 'Runway',
    image: '/images/shoots/shoot-20260403-sd0-8461.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm12',
    year: 2026,
    title: 'Backstage Synchrony',
    tagline: 'Quick-Change Precision',
    tag: 'Backstage',
    image: '/images/workshops/workshop-dsc02769.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm13',
    year: 2026,
    title: 'Dramatic Ramp Exit',
    tagline: 'Choreographed Synchrony',
    tag: 'Runway',
    image: '/images/runway/runway-vol2-dsc-0004.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm14',
    year: 2026,
    title: 'Gold Brocade Movement',
    tagline: 'Raj Ghrana Imperial Walk',
    tag: 'Heritage',
    image: '/images/shoots/shoot-20260403-sd0-8497.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm15',
    year: 2026,
    title: 'Couture Formation',
    tagline: 'National Circuit Grand Finale',
    tag: 'Runway',
    image: '/images/runway/runway-vol1-dsc-0010.jpg',
    category: 'Lookbook',
  },
  {
    id: 'm16',
    year: 2026,
    title: 'Poise & Silhouette',
    tagline: 'High-Fashion Magazine Shoot',
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
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

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
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-vogue-gold/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-vogue-gold/35 bg-vogue-dark/90 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(216,181,106,0.15)]">
            <Trophy className="w-3.5 h-3.5 text-vogue-gold" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-vogue-gold font-bold">
              Archival Lookbook • Photo Booth Gallery
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase tracking-[0.16em] font-bold text-vogue-ivory">
            Achieve <span className="text-transparent bg-clip-text bg-gradient-to-r from-vogue-gold via-vogue-champagne to-vogue-gold">Moments</span>
          </h2>
          <p className="text-xs sm:text-sm text-vogue-champagne/80 font-sans tracking-wider mt-3 max-w-xl mx-auto">
            Interactive lookbook and 3D fanned deck archiving all official moments, championship walks, and high-fashion galas of Team VOGUE SOA.
          </p>

          {/* Mode Controls */}
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
                <span>3D Fan Deck ({MOMENTS_DATA.length})</span>
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
                Landscape Type
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
                Portrait (9:16)
              </button>
            </div>
          </div>

          <p className="text-[11px] font-mono text-vogue-gold/70 mt-4 uppercase tracking-wider">
            Hover to expand 3D depth • Use left &amp; right arrows or keyboard to cycle all moments
          </p>
        </div>

        {/* ─── Mode 1: 3D Interactive Fan Deck ─── */}
        {viewMode === 'fan' ? (
          <div className="relative my-8 sm:my-14 min-h-[420px] sm:min-h-[500px] flex items-center justify-center">
            
            {/* Previous Arrow Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-40 p-3 rounded-full border border-vogue-gold/40 bg-vogue-dark/90 text-vogue-gold hover:bg-vogue-gold hover:text-vogue-black transition-all shadow-xl"
              aria-label="Previous Moment"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Arrow Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-40 p-3 rounded-full border border-vogue-gold/40 bg-vogue-dark/90 text-vogue-gold hover:bg-vogue-gold hover:text-vogue-black transition-all shadow-xl"
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
                      aspectFormat === 'landscape'
                        ? 'w-[300px] sm:w-[460px] aspect-[16/10]'
                        : 'w-[220px] sm:w-[320px] aspect-[3/4]'
                    } ${
                      isActive
                        ? 'border-vogue-gold shadow-[0_0_35px_rgba(216,181,106,0.35)]'
                        : 'border-vogue-gold/30 hover:border-vogue-gold/70'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover filter contrast-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-vogue-black/40 to-transparent p-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded bg-vogue-black/90 border border-vogue-gold/50 text-[9px] uppercase font-bold text-vogue-gold font-mono">
                          {item.year} • {item.tag}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-vogue-black/80 border border-vogue-gold/40 flex items-center justify-center text-vogue-gold">
                          <Maximize2 className="w-3 h-3" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-serif text-base sm:text-xl font-bold uppercase tracking-wider text-vogue-ivory">
                          {item.title}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-vogue-champagne/85 font-sans mt-0.5 line-clamp-1">
                          {item.tagline}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ─── Mode 2: Lookbook Grid ─── */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {MOMENTS_DATA.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(idx)}
                className="group relative rounded-sm overflow-hidden bg-vogue-dark border border-vogue-gold/30 shadow-lg cursor-pointer flex flex-col hover:border-vogue-gold transition-all duration-300"
              >
                <div
                  className={`relative w-full overflow-hidden bg-black ${
                    aspectFormat === 'landscape' ? 'aspect-[16/10]' : 'aspect-[3/4]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vogue-black/85 via-transparent to-transparent opacity-70" />
                  
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-vogue-gold/40 text-vogue-gold text-[9px] font-mono">
                    {item.year}
                  </div>

                  <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/70 border border-vogue-gold/40 text-vogue-gold flex items-center justify-center">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>

                <div className="p-3 bg-vogue-dark">
                  <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-vogue-ivory truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-vogue-gold/80 uppercase tracking-widest truncate mt-0.5 font-sans">
                    {item.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Indicator Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6">
          <div className="px-3.5 py-1.5 rounded-full bg-vogue-dark border border-vogue-gold/30 text-[11px] uppercase tracking-[0.25em] text-vogue-gold font-mono font-semibold shadow-inner">
            {activeIndex + 1} <span className="text-white/40">/</span> {MOMENTS_DATA.length}
          </div>

          <div className="flex items-center gap-1.5 max-w-[280px] sm:max-w-md overflow-x-auto py-1 scrollbar-none">
            {MOMENTS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  sound.playClick();
                  setActiveIndex(i);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === i
                    ? 'w-5 h-2 bg-vogue-gold shadow-[0_0_8px_rgba(216,181,106,0.8)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Jump to moment ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        <Lightbox
          items={lightboxItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />

      </div>
    </section>
  );
};

export default AchieveMoments;
