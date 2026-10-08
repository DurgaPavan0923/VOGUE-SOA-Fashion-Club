import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Sparkles } from 'lucide-react';
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
    url: '/images/shoots/shoot-20260403-sd0-8453.jpg',
    title: 'Anantara Royal Organza',
    collection: 'Anantara Signature',
    tag: 'Imperial',
  },
  {
    id: 'rp-3',
    url: '/images/runway/runway-vol1-dsc-0009.jpg',
    title: 'Raj Ghrana Gold Brocade',
    collection: 'Raj Ghrana 2026',
    tag: 'Heritage Walk',
  },
  {
    id: 'rp-4',
    url: '/images/shoots/shoot-20260403-sd0-8455.jpg',
    title: 'Indo-Western Avant-Garde',
    collection: 'Advita 2026 Runners Up',
    tag: 'Silver Trophy',
  },
  {
    id: 'rp-5',
    url: '/images/runway/runway-vol2-dsc-0004.jpg',
    title: 'Synchronized Ramp Strides',
    collection: 'Brahmāstra Winner',
    tag: '1st Place',
  },
  {
    id: 'rp-6',
    url: '/images/shoots/shoot-20260403-sd0-8456.jpg',
    title: 'Spectra Runway Synchrony',
    collection: 'Spectra Grand Winner',
    tag: 'Grand Champion',
  },
  {
    id: 'rp-7',
    url: '/images/runway/runway-vol1-dsc-0014.jpg',
    title: 'National Podium Final Walk',
    collection: 'National Circuit',
    tag: 'Gold Medal',
  },
  {
    id: 'rp-8',
    url: '/images/shoots/shoot-20260403-sd0-8478.jpg',
    title: 'Haute Couture Evening Gala',
    collection: 'Annual Showcase',
    tag: 'Couture',
  },
  {
    id: 'rp-9',
    url: '/images/runway/runway-vol2-dsc-0020.jpg',
    title: 'Dramatic Stage Lighting Walk',
    collection: 'Chakravyuh Series',
    tag: 'Stage Sync',
  },
  {
    id: 'rp-10',
    url: '/images/shoots/shoot-20260403-sd0-8487.jpg',
    title: 'Contemporary Editorial Portrait',
    collection: 'Vogue Studio 2026',
    tag: 'Lookbook',
  },
];

export const EDITORIAL_LOOKBOOK_PHOTOS: RunwayPhoto[] = [
  {
    id: 'elp-1',
    url: '/images/shoots/shoot-20260403-sd0-8494.jpg',
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
    url: '/images/workshops/workshop-dsc02770.jpg',
    title: 'Runway Glow & Sculpting Masterclass',
    collection: 'HD Styling Lab',
    tag: 'Editorial',
  },
  {
    id: 'elp-4',
    url: '/images/runway/runway-vol1-dsc-0019.jpg',
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
    url: '/images/workshops/workshop-dsc02776.jpg',
    title: 'Anantara Golden Velvet Drape',
    collection: 'Anantara Signature',
    tag: 'National Podium',
  },
  {
    id: 'elp-7',
    url: '/images/shoots/shoot-20260403-sd0-8503.jpg',
    title: 'Architectural Tailoring Spread',
    collection: 'Evolution Collection',
    tag: 'Bespoke',
  },
  {
    id: 'elp-8',
    url: '/images/runway/runway-vol2-dsc-0045.jpg',
    title: 'Grand Finale Group Exit',
    collection: 'National Fest Tour',
    tag: 'Runway Winner',
  },
  {
    id: 'elp-9',
    url: '/images/workshops/workshop-dsc02779.jpg',
    title: 'Precision Pacing & Posture Drills',
    collection: 'Masterclass Series',
    tag: 'Grooming',
  },
  {
    id: 'elp-10',
    url: '/images/shoots/shoot-20260403-sd0-8514.jpg',
    title: 'Midnight Fusion Organza',
    collection: 'Indo-Western Vol 2',
    tag: 'Editorial',
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
  eyebrow = 'Live Runway Photo Stream',
  onPhotoClick,
  className = '',
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  // Speed durations in seconds
  const duration = speed === 'slow' ? 45 : speed === 'fast' ? 22 : 32;

  // Duplicate items array 3 times to ensure infinite smooth marquee loop
  const duplicatedPhotos = [...photos, ...photos, ...photos];

  return (
    <div
      className={`relative w-full overflow-hidden bg-vogue-black py-4 select-none border-y border-vogue-gold/15 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Eyebrow running script label */}
      {eyebrow && (
        <div className="text-center mb-3 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-vogue-gold" />
          <span className="font-script text-xl sm:text-2xl text-vogue-gold font-normal">
            {eyebrow}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-vogue-gold" />
        </div>
      )}

      {/* Left/Right Edge Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-vogue-black via-vogue-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-vogue-black via-vogue-black/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Moving Track */}
      <div className="flex w-max overflow-hidden">
        <motion.div
          className="flex gap-4 sm:gap-6 items-stretch will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
          animate={
            isReduced
              ? {}
              : {
                  x: direction === 'rtl' ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
                }
          }
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: isPaused ? duration * 3 : duration,
              ease: 'linear',
            },
          }}
        >
          {duplicatedPhotos.map((photo, idx) => (
            <div
              key={`${photo.id}-${idx}`}
              onClick={() => {
                sound.playClick();
                onPhotoClick?.(photo, idx % photos.length);
              }}
              className="relative shrink-0 w-48 sm:w-56 md:w-64 aspect-[3/4] rounded-sm overflow-hidden border border-vogue-gold/25 bg-vogue-dark group cursor-pointer hover:border-vogue-gold hover:shadow-[0_0_20px_rgba(184,155,94,0.3)] transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-vogue-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Tag Badge */}
              {photo.tag && (
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-vogue-black/90 border border-vogue-gold/60 text-vogue-gold text-[8px] uppercase font-bold tracking-widest backdrop-blur-sm">
                    {photo.tag}
                  </span>
                </div>
              )}

              {/* Bottom Caption on Hover */}
              <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col justify-end">
                <span className="text-[8px] uppercase tracking-[0.2em] text-vogue-gold font-mono font-bold block">
                  {photo.collection}
                </span>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-vogue-ivory uppercase line-clamp-1">
                  {photo.title}
                </h4>
              </div>

              {/* Full view icon */}
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-vogue-black/80 text-vogue-gold opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteImageMarquee;
