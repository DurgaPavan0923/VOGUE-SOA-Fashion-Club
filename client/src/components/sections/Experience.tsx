import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { EXPERIENCE_DATA } from '../../data/experienceData';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

export const Experience: React.FC = () => {
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();
  const activeExp = EXPERIENCE_DATA[activeExpIndex];

  // Automatic module rotation
  useEffect(() => {
    if (isReduced || isHovered) return;
    const interval = setInterval(() => {
      setActiveExpIndex((prev) => (prev + 1) % EXPERIENCE_DATA.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isReduced, isHovered]);

  const handleSelect = (idx: number) => {
    sound.playClick();
    setActiveExpIndex(idx);
  };

  return (
    <section id="experience" className="py-24 sm:py-32 bg-vogue-dark relative overflow-hidden">
      <div id="showcase" className="absolute -top-24" />
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-vogue-plum/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="The Experience"
          title="The VOGUE Experience"
          subtitle="An interactive 3D portfolio drum. At rest, collections sit in a ring around the VOGUE seal. Swipe or drag to browse through curated fashion presentations."
        />

        <div className="text-center -mt-6 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-vogue-gold/75">
            Scroll wheel or drag vertically to rotate
          </span>
        </div>

        {/* ─── Desktop Magazine Editorial Layout with Automatic Rotation ─── */}
        <div
          className="hidden lg:grid grid-cols-12 gap-8 items-stretch mt-12 mb-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Left Column: 8 Categorized Interactive Rows */}
          <div className="col-span-5 space-y-2 overflow-y-auto max-h-[620px] pr-2 scrollbar-none">
            {EXPERIENCE_DATA.map((exp, idx) => {
              const isActive = activeExpIndex === idx;

              return (
                <div
                  key={exp.id}
                  onClick={() => handleSelect(idx)}
                  data-cursor="explore"
                  className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'border-vogue-gold bg-vogue-black text-vogue-ivory shadow-lg shadow-vogue-gold/10 scale-[1.02]'
                      : 'border-vogue-gold/20 bg-vogue-black/40 text-vogue-champagne/70 hover:border-vogue-gold/50 hover:text-vogue-ivory'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-vogue-gold' : 'text-vogue-muted'}`}>
                      {exp.number}
                    </span>
                    <div>
                      <h4 className="font-serif text-sm font-bold uppercase tracking-wide">
                        {exp.title}
                      </h4>
                      <span className="text-[9px] uppercase tracking-widest text-vogue-gold font-sans block">
                        {exp.category}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-vogue-gold rotate-90' : 'text-vogue-muted'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Editorial Focus Preview */}
          <div className="col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-sm border border-vogue-gold/40 bg-vogue-black/90 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Top Eyebrow & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-[1px] bg-vogue-gold" />
                      <span className="text-xs uppercase tracking-[0.2em] text-vogue-gold font-bold font-mono">
                        Module {activeExp.number} • {activeExp.category}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-vogue-gold/15 border border-vogue-gold/40 text-[10px] uppercase font-bold text-vogue-gold rounded-full">
                      {activeExp.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-3xl font-bold text-vogue-ivory uppercase">
                      {activeExp.title}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-vogue-champagne font-semibold mt-1">
                      {activeExp.tagline}
                    </p>
                  </div>

                  {/* Image Preview */}
                  <div className="relative h-64 rounded-sm overflow-hidden border border-vogue-gold/30 group">
                    <img
                      src={activeExp.image}
                      alt={activeExp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-transparent to-transparent opacity-60" />
                  </div>

                  <p className="text-sm text-vogue-champagne/85 font-sans leading-relaxed">
                    {activeExp.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="space-y-2 pt-2 border-t border-vogue-gold/15">
                    <span className="text-[10px] uppercase tracking-widest text-vogue-gold font-bold block">
                      Curriculum Highlights
                    </span>
                    <ul className="grid grid-cols-2 gap-2 text-xs text-vogue-champagne/90 font-sans">
                      {activeExp.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-vogue-gold shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <a
                    href="/apply"
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-vogue-gold hover:text-vogue-ivory transition-colors"
                  >
                    <span>Train In This Discipline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-xs text-vogue-muted font-mono">
                    {activeExpIndex + 1} of {EXPERIENCE_DATA.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ─── Mobile Vertical Cards ─── */}
        <div className="lg:hidden space-y-6 mt-10">
          {EXPERIENCE_DATA.map((exp) => (
            <div
              key={exp.id}
              className="rounded-sm border border-vogue-gold/30 bg-vogue-black/90 p-6 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-vogue-gold">
                  {exp.number} • {exp.category}
                </span>
                <span className="px-2.5 py-0.5 bg-vogue-gold/15 border border-vogue-gold/40 text-[9px] uppercase font-bold text-vogue-gold rounded-full">
                  {exp.badge}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-vogue-ivory uppercase">
                {exp.title}
              </h3>

              <div className="h-48 rounded-sm overflow-hidden border border-vogue-gold/30">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs text-vogue-champagne/85 leading-relaxed font-sans">
                {exp.description}
              </p>

              <div className="space-y-1 pt-2 border-t border-vogue-gold/15">
                <span className="text-[10px] uppercase tracking-widest text-vogue-gold font-bold block">
                  Highlights
                </span>
                <ul className="space-y-1 text-xs text-vogue-champagne/90 font-sans">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-vogue-gold shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
