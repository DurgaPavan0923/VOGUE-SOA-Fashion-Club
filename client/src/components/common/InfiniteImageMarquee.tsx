import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Play, Sparkles } from 'lucide-react';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

export interface RunwayPhoto {
  id: string;
  url: string;
  title: string;
  collection: string;
  tag?: string;
  isVideo?: boolean;
}

export const DEFAULT_RUNWAY_PHOTOS: RunwayPhoto[] = [
  {
    id: 'rp-1',
    url: '/images/runway/runway-vol1-dsc-0004.jpg',
    title: 'Spectra Gold Runway Stride',
    collection: 'Spectra Championship 2026',
    tag: 'Gold Champion',
  },
  {
    id: 'rp-2',
    url: '/images/shoots/shoot-20260403-sd0-8440.jpg',
    title: 'Anantara Royal Organza',
    collection: 'Anantara Signature',
    tag: 'Imperial',
  },
  {
    id: 'rp-3',
    url: '/images/runway/runway-vol1-dsc-0010.jpg',
    title: 'Raj Ghrana Gold Brocade',
    collection: 'Raj Ghrana 2026',
    tag: 'Heritage Walk',
  },
  {
    id: 'rp-4',
    url: '/images/shoots/shoot-20260403-sd0-8461.jpg',
    title: 'Indo-Western Avant-Garde',
    collection: 'Advita 2026 Runners Up',
    tag: 'Silver Trophy',
  },
  {
    id: 'rp-5',
    url: '/images/runway/runway-vol2-dsc-0004.jpg',
    title: 'Golden Hour Haute Couture',
    collection: 'Brahmāstra Winner',
    tag: '1st Place',
  },
  {
    id: 'rp-6',
    url: '/images/shoots/shoot-20260403-sd0-8531.jpg',
    title: 'Spectra Runway Synchrony',
    collection: 'Spectra Grand Winner',
    tag: 'Grand Champion',
  },
];

export const EDITORIAL_LOOKBOOK_PHOTOS: RunwayPhoto[] = [
  {
    id: 'elp-1',
    url: '/images/shoots/shoot-20260403-sd0-8497.jpg',
    title: 'Vintage Metamorphosis Lookbook',
    collection: 'Evolution Over Royal',
    tag: 'Haute Couture',
  },
  {
    id: 'elp-2',
    url: '/images/achievements/bgu-spectra-2026.jpg',
    title: 'Chiasma National Gold Stride',
    collection: 'Chiasma AIIMS Podium',
    tag: 'Gold Award',
  },
  {
    id: 'elp-3',
    url: '/images/workshops/workshop-dsc02769.jpg',
    title: 'Runway Glow & Sculpting Masterclass',
    collection: 'HD Styling Lab',
    tag: 'Editorial',
  },
  {
    id: 'elp-4',
    url: '/images/runway/runway-vol1-dsc-0018.jpg',
    title: 'Couture Fabric Draping Lab',
    collection: 'Vogue Workshop Series',
    tag: 'Design Studio',
  },
  {
    id: 'elp-5',
    url: '/images/achievements/genesis-2026.jpg',
    title: 'Celestia National Champion Walk',
    collection: 'Celestia SSU Winner',
    tag: '1st Place Trophy',
  },
  {
    id: 'elp-6',
    url: '/images/workshops/workshop-dsc02772.jpg',
    title: 'Anantara Golden Velvet Drape',
    collection: 'Anantara Signature',
    tag: 'National Podium',
  },
];

interface InfiniteImageMarqueeProps {
  photos?: RunwayPhoto[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'ltr' | 'rtl';
  eyebrow?: string;
  onPhotoClick?: (photo: RunwayPhoto, index: number) => void;
  className?: string;
}

export const InfiniteImageMarquee: React.FC<InfiniteImageMarqueeProps> = ({
  photos = DEFAULT_RUNWAY_PHOTOS,
  speed = 'normal',
  direction = 'rtl',
  eyebrow = 'LIVE RUNWAY PHOTO STREAM • CONTINUOUS MOTION',
  onPhotoClick,
  className = '',
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  // Speed durations in seconds
  const duration = speed === 'slow' ? 45 : speed === 'fast' ? 22 : 32;

  // Duplicate items array 3 times to ensure infinite smooth marquee loop
  const duplicatedPhotos = [...photos, ...photos, ...photos];

  const handleCardClick = (photo: RunwayPhoto, idx: number) => {
    sound.playClick();
    onPhotoClick?.(photo, idx % photos.length);
  };

  const xAnimation =
    direction === 'ltr'
      ? ['-33.333%', '0%']
      : ['0%', '-33.333%'];

  return (
    <div
      className={`relative w-full overflow-hidden py-6 select-none bg-vogue-black/95 border-y border-vogue-gold/20 group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-cursor="view"
    >
      {/* Editorial Eyebrow Tag */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between text-xs text-vogue-gold/80">
        <div className="flex items-center gap-2 uppercase tracking-[0.25em] font-mono text-[10px]">
          <span className="w-2 h-2 rounded-full bg-vogue-gold animate-pulse" />
          <span>{eyebrow}</span>
        </div>
        <span className="hidden sm:inline-block text-[10px] text-vogue-champagne/60 font-sans tracking-widest uppercase">
          Hover to pause & inspect look
        </span>
      </div>

      {/* Left and Right Luxury Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-vogue-black via-vogue-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-vogue-black via-vogue-black/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Moving Runway Strip */}
      <motion.div
        className="flex gap-4 sm:gap-6 items-center w-max will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0)' }}
        animate={
          isReduced
            ? {}
            : {
                x: isPaused ? undefined : xAnimation,
              }
        }
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: duration,
            ease: 'linear',
          },
        }}
      >
        {duplicatedPhotos.map((photo, idx) => (
          <div
            key={`${photo.id}-${idx}`}
            onClick={() => handleCardClick(photo, idx)}
            className="relative shrink-0 w-52 sm:w-64 aspect-[3/4] rounded-sm overflow-hidden border border-vogue-gold/30 bg-vogue-dark group/card cursor-pointer transition-all duration-300 hover:border-vogue-gold hover:shadow-[0_0_25px_rgba(184,155,94,0.35)] hover:-translate-y-1.5"
          >
            {/* Runway Image with hover zoom */}
            <img
              src={photo.url}
              alt={photo.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-108"
            />

            {/* Tag Badge */}
            {photo.tag && (
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-0.5 bg-vogue-black/90 border border-vogue-gold/60 text-vogue-gold text-[9px] uppercase font-bold tracking-widest rounded-sm backdrop-blur-sm">
                  {photo.tag}
                </span>
              </div>
            )}

            {/* Overlay Reveal */}
            <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-vogue-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
              <span className="text-[9px] uppercase tracking-widest text-vogue-gold font-mono font-bold">
                {photo.collection}
              </span>
              <h4 className="font-serif text-sm font-bold text-vogue-ivory uppercase line-clamp-1">
                {photo.title}
              </h4>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-vogue-champagne font-sans">
                <Maximize2 className="w-3 h-3 text-vogue-gold" />
                <span>View Full Look</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteImageMarquee;
