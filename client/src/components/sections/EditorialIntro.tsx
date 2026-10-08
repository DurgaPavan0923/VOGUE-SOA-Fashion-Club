import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

export const EditorialIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 35%'],
  });

  const statementWords = [
    'Fashion',
    'is',
    'only',
    'the',
    'beginning.',
    'At',
    'VOGUE',
    'SOA,',
    'we',
    'transform',
    'the',
    'runway',
    'into',
    'a',
    'canvas',
    'for',
    'fearless',
    'self-expression,',
    'cultural',
    'lineage,',
    'and',
    'championship-level',
    'storytelling.',
  ];

  return (
    <section
      ref={containerRef}
      id="editorial-intro"
      className="py-24 sm:py-32 bg-vogue-dark relative overflow-hidden border-t border-b border-vogue-gold/20"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-vogue-plum/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Gold Filigree Corner Accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-vogue-gold/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-vogue-gold/40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Magazine Statement Eyebrow & Scroll Text Fill */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-vogue-gold">01 /</span>
              <span className="font-script text-2xl sm:text-3xl text-vogue-gold font-normal">
                The Movement
              </span>
              <span className="w-8 h-[1px] bg-vogue-gold/60" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-vogue-ivory leading-[1.08]">
              Fashion Is Only <br className="hidden sm:inline" />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-vogue-gold via-vogue-champagne to-vogue-gold">
                The Beginning.
              </span>
            </h2>

            {/* Scroll-Linked Word Fill Editorial Statement */}
            <div className="border-l-2 border-vogue-gold/50 pl-5 sm:pl-7 py-2">
              <p className="font-serif text-lg sm:text-xl md:text-2xl italic leading-relaxed flex flex-wrap gap-x-2 gap-y-1">
                {statementWords.map((word, idx) => {
                  const start = idx / statementWords.length;
                  const end = start + 1 / statementWords.length;
                  const opacity = isReduced ? 1 : useTransform(scrollYProgress, [start, end], [0.35, 1]);
                  const color = isReduced
                    ? '#FAF7F2'
                    : useTransform(scrollYProgress, [start, end], ['#8E8279', '#FAF7F2']);

                  return (
                    <motion.span
                      key={idx}
                      style={{ opacity, color }}
                      className="transition-colors duration-150 inline-block"
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-vogue-champagne/80 font-sans leading-relaxed max-w-2xl">
              Established at Siksha 'O' Anusandhan (SOA University, Bhubaneswar), VOGUE unites multidisciplinary student creators—from engineers to medical scholars—fostering confidence, stage authority, and state-podium dominance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#experience"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-vogue-gold hover:text-vogue-ivory transition-colors group"
              >
                <span>Discover The VOGUE Experience</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Fashion Detail Spread Card */}
          <div className="lg:col-span-4 relative">
            <div className="relative mx-auto max-w-xs sm:max-w-sm group">
              <div className="relative rounded-t-[120px] overflow-hidden border border-vogue-gold/40 bg-vogue-black p-2 shadow-2xl">
                <img
                  src="/images/shoots/shoot-20260403-sd0-8458.jpg"
                  alt="VOGUE Editorial Movement"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-80 sm:h-96 object-cover object-top rounded-t-[110px] transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/shoots/shoot-20260403-sd0-8440.jpg';
                  }}
                />
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-vogue-black/90 border border-vogue-gold/60 px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest text-vogue-gold">
                  Official Issue
                </div>

                <div className="p-4 text-center bg-vogue-dark/95 border-t border-vogue-gold/20">
                  <span className="font-serif text-base font-bold text-vogue-ivory block">
                    Couture Discipline
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-vogue-gold font-sans font-semibold">
                    State #1 Collegiate Runway
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EditorialIntro;
