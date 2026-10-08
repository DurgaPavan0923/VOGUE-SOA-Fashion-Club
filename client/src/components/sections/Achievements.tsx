import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Trophy, Award, Calendar, ExternalLink, X, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { ACHIEVEMENTS_DATA, AchievementItem } from '../../data/achievementsData';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { fireConfetti } from '../../animations/ConfettiBurst';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

export const Achievements: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [activeModalItem, setActiveModalItem] = useState<AchievementItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 85%'],
  });

  const spineScaleY = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  const years = ['ALL', '2026', '2025', '2024', '2023', '2022'];

  const filteredAchievements =
    selectedYear === 'ALL'
      ? ACHIEVEMENTS_DATA
      : ACHIEVEMENTS_DATA.filter((a) => a.year.toString() === selectedYear);

  const handleYearChange = (year: string) => {
    sound.playClick();
    setSelectedYear(year);
  };

  const handleCardClick = (item: AchievementItem) => {
    sound.playClick();
    if (item.isNationalChampion) {
      fireConfetti();
    }
    setActiveModalItem(item);
  };

  return (
    <section
      ref={containerRef}
      id="achievements"
      className="py-24 sm:py-32 bg-vogue-dark relative overflow-hidden"
    >
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-radial-vogue opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="The Legacy"
          title="Championship Timeline"
          subtitle="Explore the verified national runway championships, fest podium finishes, and state pageant milestones earned by VOGUE – SOA Fashion Club."
        />

        {/* ─── Timeline Metric Statistics Bar with Animated Counters ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          <div className="p-4 rounded-sm border border-vogue-gold/30 bg-vogue-black/80 text-center shadow-lg">
            <AnimatedCounter
              value={12}
              suffix="+"
              className="font-serif text-2xl sm:text-3xl font-bold text-vogue-gold block"
            />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-vogue-champagne font-sans font-medium">
              Verified Podiums
            </span>
          </div>
          <div className="p-4 rounded-sm border border-vogue-gold/30 bg-vogue-black/80 text-center shadow-lg">
            <AnimatedCounter
              value={3}
              className="font-serif text-2xl sm:text-3xl font-bold text-vogue-gold block"
            />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-vogue-champagne font-sans font-medium">
              National Championships
            </span>
          </div>
          <div className="p-4 rounded-sm border border-vogue-gold/30 bg-vogue-black/80 text-center shadow-lg">
            <AnimatedCounter
              value={5}
              prefix="Top "
              className="font-serif text-2xl sm:text-3xl font-bold text-vogue-gold block"
            />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-vogue-champagne font-sans font-medium">
              Miss Universe Track
            </span>
          </div>
          <div className="p-4 rounded-sm border border-vogue-gold/30 bg-vogue-black/80 text-center shadow-lg">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-vogue-gold block">
              2022–26
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-vogue-champagne font-sans font-medium">
              Active Reign
            </span>
          </div>
        </div>

        {/* ─── Year Filter Bar ─── */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-vogue-gold mr-2 hidden sm:flex">
            <Filter className="w-3.5 h-3.5" />
            <span>Timeline Year:</span>
          </div>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 border ${
                selectedYear === year
                  ? 'bg-vogue-gold text-vogue-black border-vogue-gold shadow-md shadow-vogue-gold/20 scale-105'
                  : 'bg-vogue-black/60 text-vogue-champagne/80 border-vogue-gold/30 hover:border-vogue-gold hover:text-vogue-ivory'
              }`}
            >
              {year === 'ALL' ? 'All Milestones' : year}
            </button>
          ))}
        </div>

        {/* ─── Timeline Cards Container with Self-Drawing Spine Indicator ─── */}
        <div className="relative">
          {/* Central / Side Self-Drawing Gold Timeline Spine */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-vogue-gold/15 hidden lg:block pointer-events-none" />
          <motion.div
            style={{
              scaleY: isReduced ? 1 : spineScaleY,
              transformOrigin: 'top',
            }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-vogue-gold via-vogue-champagne to-vogue-gold hidden lg:block pointer-events-none shadow-[0_0_12px_#D4AF37] z-0"
          />

          {/* Timeline Cards Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <AnimatePresence>
              {filteredAchievements.map((item, index) => {
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleCardClick(item)}
                    className={`p-6 rounded-sm border bg-vogue-black/85 cursor-pointer transition-all duration-300 flex flex-col justify-between relative group shadow-xl ${
                      item.isNationalChampion
                        ? 'border-vogue-gold shadow-vogue-gold/10'
                        : 'border-vogue-gold/25 hover:border-vogue-gold/70'
                    }`}
                    data-cursor="open"
                  >
                    {/* Top Bar: Year & Position Badge */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-vogue-dark border border-vogue-gold/40 text-vogue-gold">
                          {item.year}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                            item.isNationalChampion
                              ? 'bg-vogue-gold text-vogue-black border-vogue-gold'
                              : 'bg-vogue-dark/80 text-vogue-champagne border-vogue-gold/30'
                          }`}
                        >
                          {item.position}
                        </span>
                      </div>

                      {/* Event Photo Thumbnail Preview */}
                      {item.image && (
                        <div className="relative h-44 rounded-sm overflow-hidden border border-vogue-gold/30 my-3 group/img">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-transparent to-transparent opacity-60" />
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 bg-vogue-black/85 border border-vogue-gold/50 text-[9px] uppercase font-bold text-vogue-gold rounded">
                              {item.category.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      )}

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-vogue-ivory group-hover:text-vogue-gold transition-colors">
                        {item.title}
                      </h3>

                      <span className="text-xs uppercase tracking-wider text-vogue-champagne/80 font-sans block mt-1">
                        {item.institution}
                      </span>

                      <p className="mt-2 text-xs text-vogue-champagne/70 font-sans leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer: Category & Open Detail CTA */}
                    <div className="pt-3 mt-3 border-t border-vogue-gold/15 flex items-center justify-between text-xs">
                      <span className="text-[9px] uppercase tracking-widest text-vogue-muted font-mono">
                        Milestone {item.year}
                      </span>
                      <span className="text-vogue-gold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px] font-semibold">
                        <span>View Full Citation</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ─── Expandable Detail Citation Modal ─── */}
        <AnimatePresence>
          {activeModalItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-vogue-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none"
              onClick={() => setActiveModalItem(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-vogue-dark border border-vogue-gold/60 p-6 sm:p-8 rounded-sm shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveModalItem(null);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full text-vogue-champagne hover:text-vogue-gold border border-vogue-gold/30 hover:border-vogue-gold"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-vogue-gold" />
                    <span className="font-mono text-xs font-bold text-vogue-gold uppercase tracking-widest">
                      Year {activeModalItem.year} • {activeModalItem.position}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-vogue-ivory uppercase">
                    {activeModalItem.event}
                  </h3>

                  <p className="text-xs uppercase tracking-widest text-vogue-champagne font-semibold">
                    Host Institution: {activeModalItem.institution}
                  </p>

                  {/* Image Preview if available */}
                  {activeModalItem.image && (
                    <div className="h-48 rounded-sm overflow-hidden border border-vogue-gold/30">
                      <img
                        src={activeModalItem.image}
                        alt={activeModalItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <p className="text-sm text-vogue-champagne/90 font-sans leading-relaxed">
                    {activeModalItem.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-vogue-gold/20">
                    <span className="text-[10px] uppercase tracking-widest text-vogue-gold font-bold block">
                      Achievement Highlights
                    </span>
                    <ul className="space-y-1 text-xs text-vogue-champagne/90 font-sans">
                      {activeModalItem.highlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-vogue-gold shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeModalItem.proofNote && (
                    <div className="pt-2 text-[10px] text-vogue-muted font-mono italic">
                      Record: {activeModalItem.proofNote}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Achievements;
