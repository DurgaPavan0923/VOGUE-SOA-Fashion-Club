import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

export interface CarouselSlide {
  url: string;
  title?: string;
  subtitle?: string;
  tag?: string;
}

interface AutoPhotoCarouselProps {
  slides: CarouselSlide[];
  interval?: number; // Time in ms per slide
  transitionDuration?: number; // Transition duration in seconds
  autoplay?: boolean;
  pauseOnHover?: boolean;
  showIndicators?: boolean;
  aspectRatio?: string;
  className?: string;
  imageClassName?: string;
  onSlideClick?: (index: number) => void;
}

export const AutoPhotoCarousel: React.FC<AutoPhotoCarouselProps> = ({
  slides,
  interval = 5000,
  transitionDuration = 2.0,
  autoplay = true,
  pauseOnHover = true,
  showIndicators = true,
  aspectRatio = 'aspect-[3/4]',
  className = '',
  imageClassName = '',
  onSlideClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-slide loop with pause-on-hover
  useEffect(() => {
    if (!autoplay || isReduced || (pauseOnHover && isHovered) || slides.length <= 1) {
      return;
    }

    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, autoplay, isHovered, interval, isReduced, slides.length]);

  const goToSlide = (idx: number) => {
    sound.playClick();
    setCurrentIndex(idx);
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      sound.playClick();
      if (diff > 0) {
        // Swiped left -> next
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      } else {
        // Swiped right -> prev
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    touchStartXRef.current = null;
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div
      className={`relative overflow-hidden group select-none ${aspectRatio} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => onSlideClick?.(currentIndex)}
    >
      {/* Cinematic Ken Burns Crossfade Image Track */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isReduced ? 0.3 : transitionDuration, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.img
            src={currentSlide.url}
            alt={currentSlide.title || 'VOGUE Fashion Visual'}
            initial={{ scale: 1.0, x: 0 }}
            animate={
              isReduced
                ? { scale: 1 }
                : {
                    scale: 1.08,
                    x: currentIndex % 2 === 0 ? 8 : -8,
                  }
            }
            transition={{
              duration: interval / 1000 + transitionDuration,
              ease: 'linear',
            }}
            className={`w-full h-full object-cover object-center ${imageClassName}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle Dark Bottom Gradient Fog for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-vogue-black/20 to-transparent opacity-70 pointer-events-none" />

      {/* Slide Information Overlay */}
      {(currentSlide.title || currentSlide.tag) && (
        <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10">
          {currentSlide.tag && (
            <span className="text-[9px] uppercase tracking-[0.2em] text-vogue-gold font-bold font-mono px-2 py-0.5 bg-vogue-black/80 rounded inline-block mb-1">
              {currentSlide.tag}
            </span>
          )}
          {currentSlide.title && (
            <h4 className="font-serif text-sm sm:text-base font-bold text-vogue-ivory uppercase line-clamp-1 drop-shadow-md">
              {currentSlide.title}
            </h4>
          )}
          {currentSlide.subtitle && (
            <p className="text-[10px] text-vogue-champagne/80 font-sans line-clamp-1">
              {currentSlide.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Filmstrip Progress / Dot Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-vogue-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-vogue-gold/30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-5 bg-vogue-gold shadow-[0_0_8px_#D4AF37]'
                  : 'w-1.5 bg-vogue-champagne/40 hover:bg-vogue-gold/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoPhotoCarousel;
