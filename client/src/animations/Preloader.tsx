import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ANIMATION_CONFIG from './config';
import sound from '../utils/audio';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    sessionStorage.setItem('vogue_preloader_seen', 'true');
    setIsVisible(false);
    onComplete?.();
  };

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('vogue_preloader_seen');
    if (hasSeen === 'true' || ANIMATION_CONFIG.isReducedMotion()) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Phase 1: Thin gold line expands (0ms)
    // Phase 2: VOGUE wordmark reveals (400ms)
    const t2 = setTimeout(() => setPhase(2), 400);

    // Phase 3: SOA FASHION CLUB reveals with vertical slide (900ms)
    const t3 = setTimeout(() => setPhase(3), 900);

    // Phase 4: More Than Fashion. A Movement. (1400ms)
    const t4 = setTimeout(() => setPhase(4), 1400);

    // Phase 5: Smooth curtain expand into Hero (2000ms)
    const t5 = setTimeout(() => {
      setPhase(5);
      setTimeout(() => {
        handleDismiss();
      }, 700);
    }, 2000);

    // Global keyboard skip
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  const vogueLetters = ['V', 'O', 'G', 'U', 'E'];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-vogue-black cursor-pointer select-none"
        onClick={handleDismiss}
        title="Click anywhere to skip intro"
      >
        {/* Subtle Background Jaali Pattern & Vignette */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: 'url(/motifs/jaali-pattern.svg)', backgroundRepeat: 'repeat' }}
        />
        <div className="absolute inset-0 bg-radial-vogue opacity-80 pointer-events-none" />

        {/* Central 5-Phase Cinematic Reveal Container */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 5 ? 0 : 1, scale: phase === 5 ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-20 flex flex-col items-center justify-center text-center px-6 space-y-4 max-w-xl w-full"
        >
          {/* Phase 1: Expanding Thin Gold Line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 140, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-[1.5px] bg-gradient-to-r from-transparent via-vogue-gold to-transparent shadow-[0_0_12px_rgba(212,175,55,0.6)] mb-2"
          />

          {/* Phase 2: Staggered VOGUE Wordmark Expansion */}
          {phase >= 2 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
              className="flex items-center justify-center gap-2 sm:gap-4 overflow-hidden"
            >
              {vogueLetters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 25, scale: 0.94 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
                    },
                  }}
                  className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.2em] text-vogue-ivory uppercase inline-block drop-shadow-[0_2px_15px_rgba(184,155,94,0.35)]"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Phase 3: SOA FASHION CLUB Reveal with Vertical Slide */}
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex items-center gap-3 pt-1"
            >
              <span className="w-6 h-[1px] bg-vogue-gold/60" />
              <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.35em] text-vogue-gold font-bold">
                SOA FASHION CLUB
              </span>
              <span className="w-6 h-[1px] bg-vogue-gold/60" />
            </motion.div>
          )}

          {/* Phase 4: Movement Tagline Reveal */}
          {phase >= 4 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-script text-2xl sm:text-3xl text-vogue-champagne pt-2 text-glow-gold"
            >
              More Than Fashion. A Movement.
            </motion.p>
          )}

          {/* Skip Instruction Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
            className="pt-6 text-[9px] uppercase tracking-[0.25em] text-vogue-muted font-mono"
          >
            Click anywhere or press Space to enter
          </motion.div>
        </motion.div>

        {/* Phase 5: Left & Right Gold Curtain Expand */}
        {phase === 5 && (
          <>
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: '-100%' }}
              transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 bg-vogue-black border-r border-vogue-gold/40 z-30"
            />
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 bg-vogue-black border-l border-vogue-gold/40 z-30"
            />
          </>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Preloader;
