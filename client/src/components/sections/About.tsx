import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Compass, Layers, Users, ArrowUpRight, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { CulturalDivider } from '../common/CulturalDivider';
import { PILLARS_DATA } from '../../data/pillarsData';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

export const About: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();
  const activePillar = PILLARS_DATA[activePillarIndex];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxImageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Automatic pillar rotation
  useEffect(() => {
    if (isReduced || isHovered) return;
    const interval = setInterval(() => {
      setActivePillarIndex((prev) => (prev + 1) % PILLARS_DATA.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isReduced, isHovered]);

  const pillarIcons = [
    <Sparkles className="w-5 h-5" />,
    <Compass className="w-5 h-5" />,
    <Layers className="w-5 h-5" />,
    <Users className="w-5 h-5" />,
  ];

  const handlePillarClick = (idx: number) => {
    sound.playClick();
    setActivePillarIndex(idx);
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 sm:py-32 bg-vogue-black relative overflow-hidden"
    >
      {/* Background Jaali Watermark with slow breathing */}
      <motion.div
        animate={
          isReduced
            ? {}
            : {
                scale: [1, 1.02, 1],
                opacity: [0.025, 0.04, 0.025],
              }
        }
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'url(/motifs/jaali-pattern.svg)', backgroundRepeat: 'repeat' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Manifesto Eyebrow Badge & Main Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-vogue-gold/40 bg-vogue-dark/90 backdrop-blur-md mb-3 shadow-lg shadow-vogue-gold/10">
            <span className="font-script text-2xl sm:text-3xl text-vogue-gold font-normal">
              The Manifesto
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-vogue-ivory">
            About SOA Fashion Club <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-vogue-gold via-vogue-champagne to-vogue-gold">
              More Than Fashion. A Movement.
            </span>
          </h2>

          <div className="mt-6 p-6 sm:p-8 bg-vogue-dark/80 border border-vogue-gold/25 rounded-sm shadow-2xl text-left space-y-4">
            <p className="text-sm sm:text-base text-vogue-champagne/90 leading-relaxed font-sans">
              Founded within <strong>Siksha &apos;O&apos; Anusandhan University</strong>, VOGUE is an avant-garde creative collective that challenges the boundaries of traditional campus fashion. We believe fashion is neither superficial nor fleeting — it is an intimate dialect of identity, individuality, and boundless storytelling.
            </p>
            <p className="text-sm sm:text-base text-vogue-champagne/90 leading-relaxed font-sans">
              Through disciplined runway rehearsals, experimental garment construction, and thematic performances across national inter-university stages, VOGUE transforms personal fear into runway majesty. Here, every step is a statement of defiance, elegance, and unapologetic authenticity.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-vogue-gold/15">
              <a
                href="#experience"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-vogue-gold hover:text-vogue-ivory transition-colors group"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-vogue-champagne/75">
                <span>Track the journey, not just the days.</span>
                <span className="text-vogue-gold">•</span>
                <span className="text-vogue-gold font-bold">Creativity • Confidence • Couture</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Desktop Interactive Editorial 4 Pillars Layout with Automatic Rotation ─── */}
        <div
          className="hidden lg:grid grid-cols-12 gap-8 items-stretch mt-12 mb-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Left Column: Interactive Pillar Navigation Buttons */}
          <div className="col-span-5 flex flex-col justify-between space-y-3">
            {PILLARS_DATA.map((pillar, idx) => {
              const isActive = activePillarIndex === idx;

              return (
                <motion.div
                  key={pillar.id}
                  onClick={() => handlePillarClick(idx)}
                  whileHover={{ x: 6 }}
                  className={`p-5 rounded-sm border cursor-pointer transition-all duration-300 relative ${
                    isActive
                      ? 'border-vogue-gold bg-vogue-dark/95 shadow-xl shadow-vogue-gold/10'
                      : 'border-vogue-gold/20 bg-vogue-dark/40 hover:border-vogue-gold/60 hover:bg-vogue-dark/70'
                  }`}
                >
                  {/* Left Gold Active Indicator Bar with Drawing Animation */}
                  {isActive && (
                    <motion.div
                      layoutId="pillar-active-bar"
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-vogue-gold via-vogue-gold-light to-vogue-gold shadow-[0_0_8px_#D4AF37]"
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-vogue-gold">
                        {pillar.number}
                      </span>
                      <span className={`text-vogue-gold ${isActive ? 'scale-110' : 'opacity-70'} transition-transform`}>
                        {pillarIcons[idx]}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-vogue-ivory uppercase tracking-wide">
                        {pillar.title}
                      </h3>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive ? 'text-vogue-gold rotate-45 scale-110' : 'text-vogue-muted opacity-40'
                      }`}
                    />
                  </div>

                  <p className="mt-2 text-xs text-vogue-champagne/75 line-clamp-2 pl-7 font-sans">
                    {pillar.headline}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Active Pillar Editorial Focus View with Parallax */}
          <div className="col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-sm border border-vogue-gold/30 bg-vogue-dark/90 p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl"
              >
                {/* Background Visual Watermark with Parallax Drift */}
                <motion.div
                  style={{ y: isReduced ? 0 : parallaxImageY }}
                  className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none overflow-hidden"
                >
                  <img
                    src={activePillar.image}
                    alt={activePillar.title}
                    className="w-full h-full object-cover filter grayscale contrast-125 scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-vogue-dark via-vogue-dark/80 to-transparent" />
                </motion.div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-vogue-gold/15 border border-vogue-gold/40 text-vogue-gold text-[10px] font-bold uppercase tracking-widest font-mono">
                      Pillar {activePillar.number}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-vogue-muted font-semibold font-sans">
                      Core Movement Value
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-vogue-ivory uppercase">
                    {activePillar.title}
                  </h3>

                  <p className="text-sm md:text-base text-vogue-champagne/90 leading-relaxed font-sans max-w-xl">
                    {activePillar.headline}
                  </p>

                  <div className="pt-2 border-l-2 border-vogue-gold pl-4 italic text-vogue-gold/90 text-sm font-serif">
                    &ldquo;{activePillar.quote}&rdquo;
                  </div>
                </div>

                {/* Keywords Tag Badges */}
                <div className="relative z-10 pt-6 border-t border-vogue-gold/15 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-vogue-muted font-bold mr-2">
                    Key Focus:
                  </span>
                  {activePillar.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 bg-vogue-black/80 border border-vogue-gold/30 text-vogue-champagne text-[10px] font-semibold tracking-wider uppercase rounded-sm"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ─── Mobile Vertical Sequence View ─── */}
        <div className="lg:hidden space-y-6 mt-10">
          {PILLARS_DATA.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="p-6 rounded-sm border border-vogue-gold/30 bg-vogue-dark/90 space-y-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-vogue-gold">
                  {pillar.number}
                </span>
                <span className="text-vogue-gold">
                  {pillarIcons[idx]}
                </span>
                <h3 className="font-serif text-xl font-bold text-vogue-ivory uppercase">
                  {pillar.title}
                </h3>
              </div>

              <h4 className="font-serif text-sm font-bold text-vogue-gold uppercase">
                {pillar.headline}
              </h4>

              <p className="text-xs text-vogue-champagne/85 leading-relaxed font-sans">
                {pillar.description}
              </p>

              <div className="border-l-2 border-vogue-gold pl-3 text-xs italic text-vogue-gold font-serif">
                &ldquo;{pillar.quote}&rdquo;
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-vogue-gold/80">
            Scroll for 3D Runway Timeline ↓
          </span>
        </div>

        <CulturalDivider variant="mandala" />
      </div>
    </section>
  );
};

export default About;
