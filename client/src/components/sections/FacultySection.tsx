import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, CheckCircle2, ShieldCheck, Instagram } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { CAMPUS_FACULTY_LIST, FOUNDERS_DATA } from '../../data/facultyData';
import sound from '../../utils/audio';

export const FacultySection: React.FC = () => {
  const [activeCampusId, setActiveCampusId] = useState<string>('campus-01');

  const currentFaculty =
    CAMPUS_FACULTY_LIST.find((c) => c.id === activeCampusId) || CAMPUS_FACULTY_LIST[0];

  return (
    <section id="faculty" className="py-24 sm:py-32 bg-[#0C0A0B] relative overflow-hidden border-t border-vogue-gold/20">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-vogue-gold/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="The Leadership"
          title="Faculty Coordinators"
          subtitle="Guiding artistic discipline, conceptual depth, and student excellence across all campuses of SOA."
        />

        {/* ─── Multi-Campus Selector Tabs ─── */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CAMPUS_FACULTY_LIST.map((campus) => {
            const isActive = activeCampusId === campus.id;
            return (
              <button
                key={campus.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCampusId(campus.id);
                }}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? 'bg-vogue-gold text-vogue-black border-vogue-gold shadow-[0_0_20px_rgba(184,155,94,0.4)] font-bold'
                    : 'bg-vogue-dark/80 text-vogue-ivory/70 border-vogue-gold/20 hover:border-vogue-gold/50 hover:text-vogue-gold'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{campus.roleBadge || `${campus.campusCode} · ${campus.label}`}</span>
              </button>
            );
          })}
        </div>

        {/* ─── Faculty Mentor Showcase Card ─── */}
        <div className="mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFaculty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#111111]/90 border border-vogue-gold/30 p-6 sm:p-10 lg:p-12 rounded-sm shadow-2xl backdrop-blur-md relative"
            >
              {/* Corner Filigree */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-vogue-gold" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-vogue-gold" />

              {/* Portrait Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group max-w-[280px] sm:max-w-xs w-full">
                  <div className="rounded-t-full overflow-hidden border-2 border-vogue-gold/60 bg-vogue-black shadow-2xl group-hover:border-vogue-gold group-hover:shadow-[0_0_30px_rgba(184,155,94,0.35)] transition-all duration-500">
                    <img
                      src={currentFaculty.coordinator.image}
                      alt={currentFaculty.coordinator.name}
                      className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/faculty/dr-mitali-nayak.jpg';
                      }}
                    />
                  </div>

                  <div className="absolute top-4 right-2 px-3 py-1 bg-vogue-black/90 border border-vogue-gold text-[9px] uppercase font-bold tracking-widest text-vogue-gold rounded-full shadow-lg">
                    {currentFaculty.roleBadge}
                  </div>
                </div>
              </div>

              {/* Faculty Content */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 text-vogue-gold text-xs uppercase tracking-widest font-mono font-bold">
                  <ShieldCheck className="w-4 h-4 text-vogue-gold" />
                  <span>{currentFaculty.subtitle}</span>
                </div>

                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-vogue-ivory">
                    {currentFaculty.coordinator.name}
                  </h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-vogue-gold font-semibold font-sans mt-1">
                    {currentFaculty.coordinator.department || currentFaculty.coordinator.designation}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-vogue-champagne/90 font-serif italic leading-relaxed bg-black/40 p-4 sm:p-5 border-l-2 border-vogue-gold rounded-r-sm">
                  &ldquo;{currentFaculty.coordinator.description}&rdquo;
                </p>

                {/* Mentorship Directives */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-vogue-gold/80 block font-bold">
                    Mentorship Directives
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentFaculty.coordinator.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-vogue-champagne/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-vogue-gold shrink-0 mt-0.5" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-vogue-gold/20 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-vogue-gold/50 p-0.5 bg-white shrink-0 shadow-md">
                      <img
                        src="/images/soa-logo.png"
                        alt="Siksha 'O' Anusandhan"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-vogue-gold block font-mono font-bold">
                        Official University Governance
                      </span>
                      <span className="text-xs font-serif text-vogue-ivory font-bold block">
                        Siksha &apos;O&apos; Anusandhan (Deemed to be University)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── The Genesis & The Founders Legacy Spread ─── */}
        <div className="border-t border-vogue-gold/20 pt-16">
          <div className="text-center mb-10">
            <span className="font-script text-2xl sm:text-3xl text-vogue-gold font-normal block mb-1">
              The Genesis
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-vogue-ivory uppercase mt-1">
              The Founders
            </h3>
            <p className="text-xs sm:text-sm text-vogue-champagne/70 max-w-xl mx-auto mt-2">
              The visionary minds who established VOGUE SOA as an avant-garde collegiate couture society.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {FOUNDERS_DATA.map((founder, idx) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -6 }}
                className="bg-[#111111]/90 border border-vogue-gold/30 rounded-sm overflow-hidden group hover:border-vogue-gold hover:shadow-2xl hover:shadow-vogue-gold/15 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Portrait Frame with Arch Styling */}
                <div className="relative overflow-hidden bg-vogue-black border-b border-vogue-gold/20 p-6 flex items-center justify-center">
                  <div className="relative overflow-hidden rounded-t-full border-2 border-vogue-gold/50 max-w-[240px] w-full group-hover:border-vogue-gold group-hover:shadow-[0_0_20px_rgba(184,155,94,0.3)] transition-all duration-500">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-72 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          '/images/faculty/dr-mitali-nayak.jpg';
                      }}
                    />
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-vogue-black/90 border border-vogue-gold text-[10px] uppercase font-bold tracking-widest text-vogue-gold rounded-full">
                      Co-Founder
                    </span>
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="p-6 text-center space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-vogue-ivory group-hover:text-vogue-gold transition-colors relative inline-block">
                      {founder.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-vogue-gold transition-all duration-300 group-hover:w-full" />
                    </h4>
                    <p className="text-xs uppercase tracking-[0.2em] text-vogue-champagne font-semibold mt-1">
                      {founder.role}
                    </p>
                    <p className="text-xs sm:text-sm text-vogue-champagne/80 font-sans mt-3 leading-relaxed">
                      {founder.brief}
                    </p>
                  </div>

                  {founder.instagram && (
                    <div className="pt-4 border-t border-vogue-gold/15 flex items-center justify-center">
                      <a
                        href={founder.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-vogue-gold hover:text-vogue-ivory transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
