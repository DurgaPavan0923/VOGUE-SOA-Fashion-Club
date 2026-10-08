import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Eye, Play } from 'lucide-react';
import { GoldButton } from '../common/GoldButton';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

export const RunwaySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax and clip-path scale transforms on scroll
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.02, 1.12]);
  const imageX = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={containerRef}
      id="runway"
      className="py-24 sm:py-36 bg-vogue-black relative overflow-hidden border-t border-b border-vogue-gold/30 select-none"
    >
      {/* Background Subtle Jaali Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url(/motifs/jaali-pattern.svg)', backgroundRepeat: 'repeat' }}
      />
      <div className="absolute inset-0 bg-radial-vogue opacity-70 pointer-events-none" />

      {/* Decorative Gold Filigree Corner Accents */}
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-vogue-gold/50 pointer-events-none hidden sm:block" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-vogue-gold/50 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-vogue-gold/50 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-vogue-gold/50 pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Eyebrow Tag */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-vogue-gold/40 bg-vogue-dark/90 backdrop-blur-md mb-3 shadow-lg shadow-vogue-gold/10">
            <span className="w-2 h-2 rounded-full bg-vogue-gold animate-pulse" />
            <span className="font-script text-2xl sm:text-3xl text-vogue-gold font-normal">
              The Runway
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-vogue-ivory">
            Where Poise Meets <br className="hidden sm:inline" />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-vogue-gold via-vogue-champagne to-vogue-gold">
              Stage Authority.
            </span>
          </h2>
        </div>

        {/* Full-Bleed Runway Editorial Visual Stage with Scroll Expansion */}
        <div className="relative rounded-sm overflow-hidden border border-vogue-gold/40 shadow-2xl bg-vogue-dark group">
          
          {/* Main Cinematic Full-Width Image with Parallax & Ken Burns motion */}
          <div className="relative h-[420px] sm:h-[560px] md:h-[640px] overflow-hidden">
            <motion.img
              src="/images/runway/runway-vol1-dsc-0004.jpg"
              alt="VOGUE Runway Stage"
              style={{
                scale: isReduced ? 1 : imageScale,
                x: isReduced ? 0 : imageX,
              }}
              className="w-full h-full object-cover filter contrast-115 brightness-95 transition-transform duration-700 will-change-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/shoots/shoot-20260403-sd0-8440.jpg';
              }}
            />

            {/* Dark Cinematic Vignette & Studio Lighting Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-vogue-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-vogue-black/80 via-transparent to-vogue-black/80" />

            {/* Floating Editorial Magazine Headings Overlay */}
            <motion.div
              style={{ y: isReduced ? 0 : textY }}
              className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-16 pointer-events-none"
            >
              {/* Top Bar of Stage */}
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded bg-vogue-black/90 border border-vogue-gold/60 text-vogue-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] font-bold backdrop-blur-md">
                  Issue 04 • Spectra Gold
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-vogue-champagne/80 font-sans hidden sm:inline-block">
                  Siksha 'O' Anusandhan
                </span>
              </div>

              {/* Central Giant Typography Spread */}
              <div className="space-y-2 pointer-events-auto">
                <span className="font-script text-3xl sm:text-4xl md:text-5xl text-vogue-gold block drop-shadow-md">
                  Vogue Couture Runway
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl md:text-7xl font-black text-vogue-ivory uppercase tracking-tight leading-none drop-shadow-2xl">
                  CONFIDENCE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-vogue-gold via-vogue-champagne to-vogue-gold">
                    IN MOTION.
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-vogue-champagne/90 font-sans max-w-md pt-2 leading-relaxed drop-shadow">
                  Every step is choreographed with precision. Transforming collegiate models into commanding runway forces with poise, posture, and presence.
                </p>
              </div>

              {/* Bottom Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-auto pt-4 border-t border-vogue-gold/30">
                <div className="flex items-center gap-4 text-xs font-sans text-vogue-champagne/90">
                  <span className="flex items-center gap-1.5 text-vogue-gold font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>State #1 Ranked Podium</span>
                  </span>
                  <span>•</span>
                  <span>10+ Inter-University Championships</span>
                </div>

                <div className="flex items-center gap-3">
                  <GoldButton
                    to="/apply"
                    variant="solid"
                    className="text-xs py-2.5 px-6 shadow-[0_0_20px_rgba(184,155,94,0.35)]"
                  >
                    <span>Audition for Runway</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </GoldButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RunwaySection;
