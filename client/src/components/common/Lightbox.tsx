import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../../types';
import { pauseLenis, resumeLenis } from '../../hooks/useLenis';
import sound from '../../utils/audio';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && items[currentIndex] !== undefined;
  const currentItem = isOpen ? items[currentIndex!] : null;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      pauseLenis();
      sound.playSwoosh();
    } else {
      resumeLenis();
    }

    return () => {
      resumeLenis();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
      if (e.key === 'ArrowRight') {
        sound.playClick();
        onNavigate((currentIndex! + 1) % items.length);
      }
      if (e.key === 'ArrowLeft') {
        sound.playClick();
        onNavigate((currentIndex! - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // Swipe Left -> Next
      sound.playSwoosh();
      onNavigate((currentIndex! + 1) % items.length);
    } else if (diff < -50) {
      // Swipe Right -> Prev
      sound.playSwoosh();
      onNavigate((currentIndex! - 1 + items.length) % items.length);
    }
    touchStartX.current = null;
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-vogue-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 select-none"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label={currentItem.title}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-vogue-dark/80 border border-vogue-gold/40 text-vogue-champagne hover:text-vogue-gold hover:border-vogue-gold hover:scale-105 transition-all shadow-lg shadow-black/80"
          aria-label="Close Lightbox (Esc)"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onNavigate((currentIndex! - 1 + items.length) % items.length);
          }}
          className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-vogue-dark/80 border border-vogue-gold/40 text-vogue-champagne hover:text-vogue-gold hover:border-vogue-gold hover:scale-105 transition-all shadow-lg shadow-black/80 hidden sm:flex items-center justify-center"
          aria-label="Previous Image (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onNavigate((currentIndex! + 1) % items.length);
          }}
          className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-vogue-dark/80 border border-vogue-gold/40 text-vogue-champagne hover:text-vogue-gold hover:border-vogue-gold hover:scale-105 transition-all shadow-lg shadow-black/80 hidden sm:flex items-center justify-center"
          aria-label="Next Image (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content Showcase */}
        <div
          className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentItem.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative border border-vogue-gold/40 p-2 bg-vogue-dark/90 rounded-sm shadow-2xl overflow-hidden flex items-center justify-center max-w-full"
          >
            {currentItem.videoUrl || currentItem.isVideo ? (
              <video
                src={currentItem.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-golden-dress-on-a-dark-stage-41481-large.mp4'}
                poster={currentItem.imageUrl}
                controls
                autoPlay
                playsInline
                loop
                className="max-h-[72vh] max-w-full object-contain rounded-sm shadow-inner"
              />
            ) : (
              <img
                src={currentItem.imageUrl}
                alt={currentItem.title}
                className="max-h-[72vh] max-w-full object-contain rounded-sm"
              />
            )}
          </motion.div>

          {/* Caption & Category Metadata */}
          <div className="mt-4 text-center">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-vogue-ivory">
              {currentItem.title}
            </h3>
            <div className="flex items-center justify-center gap-3 mt-1.5 text-xs text-vogue-champagne/80 font-sans tracking-widest uppercase">
              <span className="text-vogue-gold font-semibold">{currentItem.category}</span>
              {(currentItem.videoUrl || currentItem.isVideo) && (
                <span className="px-2 py-0.5 rounded bg-vogue-gold/20 text-vogue-gold font-bold text-[10px]">
                  4K FASHION FILM
                </span>
              )}
              {currentItem.theme && <span>• {currentItem.theme.name}</span>}
              <span>• {currentIndex! + 1} of {items.length}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
