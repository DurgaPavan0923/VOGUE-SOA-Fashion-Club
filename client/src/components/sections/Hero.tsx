import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, ShieldCheck, Trophy, Layers, Award } from 'lucide-react';
import { GoldButton } from '../common/GoldButton';
import { AnimatedCounter } from '../common/AnimatedCounter';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

// Real authentic VOGUE SOA photography for full-screen hero slideshow
const REAL_HERO_SLIDES = [
  {
    url: '/images/shoots/shoot-20260403-sd0-8440.jpg',
    tag: 'Haute Couture Editorial',
    title: 'Anantara Imperial Stride',
    theme: 'Heritage Couture',
  },
  {
    url: '/images/runway/runway-vol1-dsc-0004.jpg',
    tag: 'National Championship',
    title: 'Spectra Gold Grand Finale',
    theme: 'Runway Showcase',
  },
  {
    url: '/images/shoots/shoot-20260403-sd0-8461.jpg',
    tag: 'Editorial Studio',
    title: 'Silk Organza Silhouette',
    theme: 'Fluid Tailoring',
  },
  {
    url: '/images/runway/runway-vol2-dsc-0004.jpg',
    tag: 'Stage Discipline',
    title: 'Spotlight Cadence & Poise',
    theme: 'High Fashion',
  },
  {
    url: '/images/shoots/shoot-20260403-sd0-8497.jpg',
    tag: 'Avant-Garde Structure',
    title: 'Evolution Noir Lookbook',
    theme: 'Contemporary Couture',
  },
  {
    url: '/images/workshops/workshop-dsc02769.jpg',
    tag: 'Runway Masterclass',
    title: 'Virtual Showreel & Grooming',
    theme: 'Stagecraft & Poise',
  },
  {
    url: '/images/shoots/shoot-20260403-sd0-8531.jpg',
    tag: 'Indo-Western Fusion',
    title: 'Global Modern Draping',
    theme: 'Couture Movement',
  },
];

export const Hero: React.FC = () => {
  const isReduced = ANIMATION_CONFIG.isReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slideshow interval (5.2s per slide, 1.8s crossfade)
  useEffect(() => {
    if (isReduced) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % REAL_HERO_SLIDES.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [isReduced]);

  // Smart Preload next hero slide image
  useEffect(() => {
    const nextIdx = (currentSlide + 1) % REAL_HERO_SLIDES.length;
    const preloadImg = new Image();
    preloadImg.src = REAL_HERO_SLIDES[nextIdx].url;
  }, [currentSlide]);

  const vogueLetters = ['V', 'O', 'G', 'U', 'E'];

  const scrollToNext = () => {
    sound.playClick();
    const target = document.getElementById('editorial-intro') || document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#080808] pt-24 pb-8 select-none">
      
      {/* ─── LAYER 1: Full-Screen Real Photo Slideshow with Ken Burns Motion ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.42 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.img
              src={REAL_HERO_SLIDES[currentSlide].url}
              alt={REAL_HERO_SLIDES[currentSlide].title}
              initial={{
                scale: 1.0,
                x: currentSlide % 2 === 0 ? 0 : -20,
              }}
              animate={
                isReduced
                  ? { scale: 1, x: 0 }
                  : {
                      scale: 1.08,
                      x: currentSlide % 2 === 0 ? -20 : 20,
                    }
              }
              transition={{ duration: 6.5, ease: 'linear' }}
              className="w-full h-full object-cover filter brightness-90 contrast-110"
              onError={(e) => {
                // Fallback to primary photo if path error occurs
                (e.target as HTMLImageElement).src = '/images/shoots/shoot-20260403-sd0-8440.jpg';
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ─── LAYER 2: Cinematic Dark Vignette & Gradient Overlays ─── */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(8,8,8,0.3)_0%,_rgba(8,8,8,0.85)_80%,_#080808_100%)]" />
      </div>

      {/* ─── LAYER 3: Moving Soft Studio Light Beam (Left -> Center -> Right) ─── */}
      <motion.div
        animate={
          isReduced
            ? {}
            : {
                x: ['-40%', '40%', '-40%'],
                opacity: [0.2, 0.35, 0.2],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-vogue-gold/15 via-[#561C47]/20 to-vogue-gold/15 rounded-full blur-[140px] pointer-events-none z-0"
      />

      {/* ─── LAYER 4: Subtle Jaali Cultural Motif Breathing (28s Cycle) ─── */}
      <motion.div
        animate={
          isReduced
            ? {}
            : {
                opacity: [0.03, 0.06, 0.03],
                scale: [1, 1.02, 1],
              }
        }
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none z-0 opacity-4"
        style={{
          backgroundImage: 'radial-gradient(rgba(216, 181, 106, 0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ─── LAYER 5: Editorial Gold Filigree Corner Frames ─── */}
      <div className="absolute top-24 sm:top-28 bottom-6 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 border border-vogue-gold/15 pointer-events-none z-10 hidden sm:block">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-vogue-gold/60" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-vogue-gold/60" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-vogue-gold/60" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-vogue-gold/60" />
      </div>

      {/* ─── LAYER 6: Editorial Side Metadata (Fashion Publication Style) ─── */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-start gap-4 text-[9px] uppercase tracking-[0.3em] font-mono text-vogue-gold/70 z-20 pointer-events-none">
        <span className="w-8 h-[1px] bg-vogue-gold/50" />
        <div className="space-y-1">
          <span className="block text-vogue-champagne font-bold">VOGUE / SOA</span>
          <span className="block text-vogue-muted">BHUBANESWAR</span>
        </div>
        <span className="w-4 h-[1px] bg-vogue-gold/30" />
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-4 text-[9px] uppercase tracking-[0.3em] font-mono text-vogue-gold/70 z-20 pointer-events-none text-right">
        <span className="w-8 h-[1px] bg-vogue-gold/50" />
        <div className="space-y-1">
          <span className="block text-vogue-champagne font-bold">EST. 2022</span>
          <span className="block text-vogue-muted">COUTURE MOVEMENT</span>
        </div>
        <span className="w-4 h-[1px] bg-vogue-gold/30" />
      </div>

      {/* ─── LAYER 7: Main Hero Content & Staggered Brand Hierarchy ─── */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center my-auto">
        
        {/* Top Affiliation Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 rounded-full border border-vogue-gold/40 bg-vogue-dark/95 backdrop-blur-md mb-4 shadow-xl shadow-vogue-gold/10"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden border border-vogue-gold/50 p-0.5 bg-white shrink-0">
            <img src="/images/soa-logo.png" alt="SOA Crest" className="w-full h-full object-contain" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.25em] text-vogue-gold font-bold">
            SIKSHA &apos;O&apos; ANUSANDHAN • OFFICIAL FASHION SOCIETY
          </span>
        </motion.div>

        {/* 1. VOGUE BRAND TITLE (Dominates with Letter Stagger Reveal) */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-1 overflow-hidden">
          {vogueLetters.map((letter, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-vogue-ivory via-vogue-gold to-vogue-champagne leading-none drop-shadow-[0_10px_35px_rgba(184,155,94,0.3)]"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* 2. SOA FASHION CLUB Sub-Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-3 my-2"
        >
          <span className="h-[1px] w-8 sm:w-16 bg-vogue-gold/50" />
          <h1 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.4em] font-sans font-bold text-vogue-gold">
            SOA FASHION CLUB
          </h1>
          <span className="h-[1px] w-8 sm:w-16 bg-vogue-gold/50" />
        </motion.div>

        {/* 3. Primary Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-vogue-ivory italic tracking-wide mt-1"
        >
          More Than Fashion. A Movement.
        </motion.p>

        {/* 4. Brand Triad: Creativity · Confidence · Couture */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-sans tracking-[0.28em] uppercase text-vogue-champagne/90 my-3"
        >
          <span className="hover:text-vogue-gold transition-colors font-semibold">Creativity</span>
          <span className="w-1.5 h-1.5 rounded-full bg-vogue-gold" />
          <span className="hover:text-vogue-gold transition-colors font-semibold">Confidence</span>
          <span className="w-1.5 h-1.5 rounded-full bg-vogue-gold" />
          <span className="hover:text-vogue-gold transition-colors font-semibold">Couture</span>
        </motion.div>

        {/* 5. Supporting Bio / Mission */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-xs sm:text-sm text-vogue-champagne/75 font-sans leading-relaxed max-w-xl mx-auto mb-6"
        >
          The premier collegiate runway platform where Indian heritage, bespoke haute couture, disciplined stage choreography, and unapologetic self-expression unite.
        </motion.p>

        {/* 6. Dual Editorial CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md"
        >
          <GoldButton
            href="#about"
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE THE MOVEMENT</span>
          </GoldButton>

          <GoldButton
            to="/apply"
            variant="solid"
            className="w-full sm:w-auto shadow-[0_0_25px_rgba(184,155,94,0.4)]"
          >
            <Sparkles className="w-4 h-4" />
            <span>JOIN VOGUE</span>
          </GoldButton>
        </motion.div>

        {/* 7. Quick Highlights Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25 }}
          className="mt-8 grid grid-cols-3 gap-4 sm:gap-8 py-3 px-6 sm:px-10 rounded-sm bg-[#111111]/90 border border-vogue-gold/25 backdrop-blur-md shadow-2xl"
        >
          <div className="flex flex-col items-center">
            <AnimatedCounter
              value={10}
              suffix="+"
              className="font-serif text-lg sm:text-2xl font-bold text-vogue-gold"
            />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-vogue-champagne/80 font-sans">
              Championships
            </span>
          </div>
          <div className="flex flex-col items-center">
            <AnimatedCounter
              value={4}
              className="font-serif text-lg sm:text-2xl font-bold text-vogue-gold"
            />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-vogue-champagne/80 font-sans">
              Signature Themes
            </span>
          </div>
          <div className="flex flex-col items-center">
            <AnimatedCounter
              value={1}
              prefix="#"
              className="font-serif text-lg sm:text-2xl font-bold text-vogue-gold"
            />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-vogue-champagne/80 font-sans">
              State Fashion Society
            </span>
          </div>
        </motion.div>

        {/* ─── LAYER 8: Animated Vertical Scroll Indicator ─── */}
        <motion.div
          onClick={scrollToNext}
          className="mt-6 flex flex-col items-center gap-2 cursor-pointer group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-vogue-gold/80 font-mono group-hover:text-vogue-gold transition-colors">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1.5px] h-8 bg-vogue-gold/25 relative overflow-hidden rounded-full">
            <motion.div
              animate={
                isReduced
                  ? {}
                  : {
                      y: ['-100%', '200%'],
                    }
              }
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-1/2 bg-gradient-to-b from-transparent via-vogue-gold to-transparent shadow-[0_0_8px_#D4AF37]"
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
