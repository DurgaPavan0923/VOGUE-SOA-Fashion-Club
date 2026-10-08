import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, Compass, Scissors, Users, Film } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { MEMBERS_DATA, CAMPUS_TABS, WING_FILTERS, MemberItem } from '../../data/membersData';
import sound from '../../utils/audio';

const WING_ICONS: Record<string, React.ReactNode> = {
  Runway: <Sparkles className="w-3.5 h-3.5 text-vogue-gold" />,
  'Design & Styling': <Scissors className="w-3.5 h-3.5 text-vogue-gold" />,
  Choreography: <Users className="w-3.5 h-3.5 text-vogue-gold" />,
  'Media & Production': <Film className="w-3.5 h-3.5 text-vogue-gold" />,
};

export const MembersSection: React.FC = () => {
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [selectedWing, setSelectedWing] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return MEMBERS_DATA.filter((m) => {
      const matchCampus = selectedCampus === 'all' || m.campus === selectedCampus;
      const matchWing = selectedWing === 'all' || m.wing === selectedWing;
      return matchCampus && matchWing;
    });
  }, [selectedCampus, selectedWing]);

  // Counts per campus
  const campusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MEMBERS_DATA.length };
    MEMBERS_DATA.forEach((m) => {
      counts[m.campus] = (counts[m.campus] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section id="members" className="py-24 sm:py-32 bg-[#080808] relative overflow-hidden border-t border-vogue-gold/15">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vogue-gold/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-vogue-gold/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="The People"
          title="The Faces of VOGUE"
          subtitle="Meet the visionary designers, lead groomers, runway models, choreographers, and production managers driving excellence across Siksha 'O' Anusandhan."
        />

        {/* ─── Campus Tabs ─── */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {CAMPUS_TABS.map((tab) => {
            const isActive = selectedCampus === tab.id;
            const count = campusCounts[tab.id] || 0;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCampus(tab.id);
                }}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? 'bg-vogue-gold text-vogue-black border-vogue-gold shadow-[0_0_20px_rgba(184,155,94,0.4)] font-bold'
                    : 'bg-vogue-dark/80 text-vogue-ivory/70 border-vogue-gold/20 hover:border-vogue-gold/50 hover:text-vogue-gold'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-vogue-black text-vogue-gold font-bold'
                      : 'bg-vogue-black/60 text-vogue-champagne/70 border border-vogue-gold/20'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── Wing / Department Sub-Filters ─── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {WING_FILTERS.map((wing) => {
            const isActive = selectedWing === wing.id;
            return (
              <button
                key={wing.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedWing(wing.id);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'border-vogue-gold text-vogue-gold bg-vogue-gold/10 font-bold shadow-[0_0_12px_rgba(184,155,94,0.2)]'
                    : 'border-white/10 text-vogue-champagne/60 hover:text-vogue-ivory hover:border-vogue-gold/30'
                }`}
              >
                {wing.label}
              </button>
            );
          })}
        </div>

        {/* ─── Active Filter Status ─── */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-vogue-gold/15 text-xs text-vogue-champagne/60 font-mono">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-vogue-gold" />
            <span>
              Showing {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
            </span>
          </div>
          <span className="text-[11px] tracking-wider uppercase text-vogue-gold/80">
            Official Siksha 'O' Anusandhan Roster
          </span>
        </div>

        {/* ─── Members Grid ─── */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredMembers.map((member, idx) => (
              <motion.div
                layout
                key={member.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  sound.playClick();
                  setSelectedMember(member);
                }}
                className="group relative bg-[#111111]/80 border border-vogue-gold/25 hover:border-vogue-gold rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_12px_30px_rgba(184,155,94,0.2)] flex flex-col justify-between cursor-pointer"
              >
                {/* Image Container with 3:4 Aspect Ratio */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-vogue-black">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                    onError={(e) => {
                      // Fallback placeholder with authentic photo
                      (e.target as HTMLImageElement).src = '/images/shoots/shoot-20260403-sd0-8440.jpg';
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 rounded-xs bg-black/85 border border-vogue-gold/50 text-[9px] font-mono font-bold tracking-widest text-vogue-gold uppercase backdrop-blur-sm">
                      {member.campusName}
                    </span>
                    <span className="p-1 rounded-full bg-black/85 border border-vogue-gold/40 text-vogue-gold backdrop-blur-sm">
                      {WING_ICONS[member.wing] || <Sparkles className="w-3 h-3" />}
                    </span>
                  </div>

                  {/* Hover Quick Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-vogue-gold/90 text-vogue-black flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Member Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#111111]/90 border-t border-vogue-gold/15">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-vogue-ivory group-hover:text-vogue-gold transition-colors line-clamp-1">
                      {member.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider text-vogue-champagne/85 font-sans font-semibold mt-0.5">
                      {member.role}
                    </p>
                    <span className="text-[10px] text-vogue-gold/75 font-mono block mt-1">
                      {member.wing}
                    </span>
                  </div>

                  {/* Quote / Statement */}
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-xs italic text-vogue-champagne/70 font-serif leading-relaxed line-clamp-2">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── Member Expanded Modal / Lightbox ─── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#111111] border border-vogue-gold/50 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(184,155,94,0.3)] grid grid-cols-1 md:grid-cols-2"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/80 border border-vogue-gold/50 text-vogue-gold hover:bg-vogue-gold hover:text-vogue-black transition-all flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo Frame */}
              <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-vogue-black overflow-hidden border-b md:border-b-0 md:border-r border-vogue-gold/20">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
              </div>

              {/* Information Panel */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xs bg-vogue-gold/15 border border-vogue-gold/40 text-[10px] font-mono font-bold tracking-widest text-vogue-gold uppercase">
                      {selectedMember.campusName}
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-vogue-champagne/80 uppercase">
                      {selectedMember.wing}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vogue-ivory">
                      {selectedMember.name}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-vogue-gold font-semibold mt-1">
                      {selectedMember.role}
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-vogue-black/60 border border-vogue-gold/20">
                    <p className="text-xs sm:text-sm italic text-vogue-champagne font-serif leading-relaxed">
                      &ldquo;{selectedMember.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-vogue-gold/15 flex items-center justify-between text-[11px] text-vogue-champagne/60 font-mono">
                  <span>TEAM VOGUE SOA</span>
                  <span className="text-vogue-gold">CREATIVITY · CONFIDENCE · COUTURE</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MembersSection;
