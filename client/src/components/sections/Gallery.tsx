import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Sparkles, LayoutGrid, Sliders, Play, Film } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Lightbox } from '../common/Lightbox';
import { api } from '../../services/api';
import { GalleryItem } from '../../types';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

import { GALLERY_DATA } from '../../data/galleryData';

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_DATA);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'stream' | 'grid'>('stream');
  const [isRow1Paused, setIsRow1Paused] = useState<boolean>(false);
  const [isRow2Paused, setIsRow2Paused] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await api.getGallery();
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(GALLERY_DATA);
        }
      } catch {
        setItems(GALLERY_DATA);
      }
    };
    fetchGallery();
  }, []);

  const categories = [
    { id: 'ALL', label: 'All Looks' },
    { id: 'RUNWAY', label: 'Runway Shows' },
    { id: 'EDITORIAL', label: 'Editorial Magazine' },
    { id: 'BTS', label: 'Behind The Scenes' },
    { id: 'WORKSHOP', label: 'Workshops' },
  ];

  const filteredItems =
    activeCategory === 'ALL'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const handleCategoryChange = (catId: string) => {
    sound.playClick();
    setActiveCategory(catId);
  };

  const handleImageClick = (item: GalleryItem) => {
    sound.playClick();
    const idx = filteredItems.findIndex((i) => i.id === item.id);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  // Split items for dual-row motion
  const row1Base = filteredItems.filter((_, i) => i % 2 === 0);
  const row2Base = filteredItems.filter((_, i) => i % 2 !== 0);
  
  // Ensure non-empty rows
  const finalRow1 = row1Base.length > 0 ? row1Base : filteredItems;
  const finalRow2 = row2Base.length > 0 ? row2Base : filteredItems;

  const duplicatedRow1 = [...finalRow1, ...finalRow1, ...finalRow1];
  const duplicatedRow2 = [...finalRow2, ...finalRow2, ...finalRow2];

  return (
    <section id="gallery" className="py-24 bg-vogue-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="The Gallery"
          title="Editorial Gallery &amp; Fashion Film"
          subtitle="Explore behind-the-scenes moments, championship runway walks, high-definition styling reels, and editorial magazines moving automatically."
        />

        {/* View Mode Switcher and Category Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 border ${
                  activeCategory === cat.id
                    ? 'bg-vogue-gold text-vogue-black border-vogue-gold shadow-md shadow-vogue-gold/20 scale-105'
                    : 'bg-vogue-black/60 text-vogue-champagne/80 border-vogue-gold/30 hover:border-vogue-gold hover:text-vogue-ivory'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Continuous Auto-Motion Stream vs Grid Switcher */}
          <div className="flex items-center gap-2 bg-vogue-black/80 border border-vogue-gold/30 p-1 rounded-sm">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('stream');
              }}
              className={`p-2 rounded-sm transition-colors flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider ${
                viewMode === 'stream' ? 'bg-vogue-gold text-vogue-black' : 'text-vogue-champagne hover:text-vogue-gold'
              }`}
              title="Dual-Row Continuous Auto-Motion Stream"
            >
              <Sliders className="w-4 h-4 rotate-90" />
              <span className="hidden sm:inline">Dual Auto Stream</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('grid');
              }}
              className={`p-2 rounded-sm transition-colors flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider ${
                viewMode === 'grid' ? 'bg-vogue-gold text-vogue-black' : 'text-vogue-champagne hover:text-vogue-gold'
              }`}
              title="Masonry Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

        {/* ─── Mode 1: Dual-Row Automatic Filmstrip Stream (Row 1: RTL, Row 2: LTR) ─── */}
        {viewMode === 'stream' ? (
          <div className="space-y-6 select-none relative">
            {/* Left and Right Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-vogue-dark via-vogue-dark/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-vogue-dark via-vogue-dark/80 to-transparent z-20 pointer-events-none" />

            {/* Row 1: Right to Left Motion */}
            <div
              className="relative w-full overflow-hidden py-1 group/row1"
              onMouseEnter={() => setIsRow1Paused(true)}
              onMouseLeave={() => setIsRow1Paused(false)}
              data-cursor="view"
            >
              <motion.div
                className="flex gap-4 sm:gap-6 items-stretch w-max will-change-transform"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                animate={
                  isReduced
                    ? {}
                    : {
                        x: isRow1Paused ? undefined : ['0%', '-33.333%'],
                      }
                }
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 36,
                    ease: 'linear',
                  },
                }}
              >
                {duplicatedRow1.map((item, index) => {
                  const isVideoItem = item.isVideo || !!item.videoUrl;

                  return (
                    <div
                      key={`r1-${item.id}-${index}`}
                      onClick={() => handleImageClick(item)}
                      className="relative shrink-0 w-60 sm:w-72 md:w-80 aspect-[3/4] rounded-sm overflow-hidden border border-vogue-gold/30 bg-vogue-black group/card cursor-pointer transition-all duration-300 hover:border-vogue-gold hover:shadow-[0_0_25px_rgba(184,155,94,0.3)] hover:-translate-y-1"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-108"
                      />

                      {isVideoItem && (
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-vogue-black/90 border border-vogue-gold/80 text-vogue-gold text-[9px] sm:text-[10px] uppercase font-bold tracking-widest rounded-full shadow-lg backdrop-blur-sm">
                          <Play className="w-3 h-3 fill-vogue-gold text-vogue-gold animate-pulse" />
                          <span>4K Fashion Film</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-vogue-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-vogue-gold font-bold font-mono block mb-1">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-vogue-ivory uppercase line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-vogue-champagne font-sans font-semibold">
                          <Maximize2 className="w-3.5 h-3.5 text-vogue-gold" />
                          <span>{isVideoItem ? 'Play 4K Reel in Lightbox' : 'View In Lightbox'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Row 2: Left to Right Motion */}
            <div
              className="relative w-full overflow-hidden py-1 group/row2"
              onMouseEnter={() => setIsRow2Paused(true)}
              onMouseLeave={() => setIsRow2Paused(false)}
              data-cursor="view"
            >
              <motion.div
                className="flex gap-4 sm:gap-6 items-stretch w-max will-change-transform"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                animate={
                  isReduced
                    ? {}
                    : {
                        x: isRow2Paused ? undefined : ['-33.333%', '0%'],
                      }
                }
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 42,
                    ease: 'linear',
                  },
                }}
              >
                {duplicatedRow2.map((item, index) => {
                  const isVideoItem = item.isVideo || !!item.videoUrl;

                  return (
                    <div
                      key={`r2-${item.id}-${index}`}
                      onClick={() => handleImageClick(item)}
                      className="relative shrink-0 w-60 sm:w-72 md:w-80 aspect-[3/4] rounded-sm overflow-hidden border border-vogue-gold/30 bg-vogue-black group/card cursor-pointer transition-all duration-300 hover:border-vogue-gold hover:shadow-[0_0_25px_rgba(184,155,94,0.3)] hover:-translate-y-1"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-108"
                      />

                      {isVideoItem && (
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-vogue-black/90 border border-vogue-gold/80 text-vogue-gold text-[9px] sm:text-[10px] uppercase font-bold tracking-widest rounded-full shadow-lg backdrop-blur-sm">
                          <Play className="w-3 h-3 fill-vogue-gold text-vogue-gold animate-pulse" />
                          <span>4K Fashion Film</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-vogue-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-vogue-gold font-bold font-mono block mb-1">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-vogue-ivory uppercase line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-vogue-champagne font-sans font-semibold">
                          <Maximize2 className="w-3.5 h-3.5 text-vogue-gold" />
                          <span>{isVideoItem ? 'Play 4K Reel in Lightbox' : 'View In Lightbox'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        ) : (
          /* ─── Mode 2: Masonry Grid View ─── */
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map((item, index) => {
                const isVideoItem = item.isVideo || !!item.videoUrl;

                return (
                  <motion.div
                    key={item.id || index}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: index * 0.02 }}
                    className="relative group cursor-pointer overflow-hidden border border-vogue-gold/25 bg-vogue-black rounded-sm shadow-xl hover:border-vogue-gold transition-all duration-300"
                    data-cursor={isVideoItem ? 'play' : 'view'}
                    onClick={() => handleImageClick(item)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />

                      {/* Video Indicator Badge */}
                      {isVideoItem && (
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 bg-vogue-black/90 border border-vogue-gold/80 text-vogue-gold text-[10px] uppercase font-bold tracking-widest rounded-full shadow-lg backdrop-blur-sm">
                          <Play className="w-3 h-3 fill-vogue-gold text-vogue-gold" />
                          <span>4K Video Reel</span>
                        </div>
                      )}

                      {/* Dark Gradient Overlay on Hover with Slide-Up */}
                      <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-vogue-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-vogue-gold font-bold">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-vogue-ivory">
                          {item.title}
                        </h4>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-vogue-champagne font-sans font-semibold">
                          <Maximize2 className="w-3.5 h-3.5 text-vogue-gold" />
                          <span>{isVideoItem ? 'Watch Full 4K Reel' : 'View Fullscreen'}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lightbox Modal with full video player, keyboard, touch swipe & Lenis sync */}
        <Lightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      </div>
    </section>
  );
};

export default Gallery;
