import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, AlertCircle, Bell } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { EVENTS_DATA, EventItem } from '../../data/eventsData';
import { GoldButton } from '../common/GoldButton';
import sound from '../../utils/audio';

export const EventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'COMPLETED' | 'ALL'>('UPCOMING');

  const upcomingEvents = EVENTS_DATA.filter((e) => e.status === 'UPCOMING' || e.status === 'LIVE');
  const completedEvents = EVENTS_DATA.filter((e) => e.status === 'COMPLETED');

  const displayedEvents =
    activeTab === 'UPCOMING'
      ? upcomingEvents
      : activeTab === 'COMPLETED'
      ? completedEvents
      : EVENTS_DATA;

  const handleTab = (tab: 'UPCOMING' | 'COMPLETED' | 'ALL') => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <section id="events" className="py-24 sm:py-32 bg-vogue-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="The Calendar"
          title="Upcoming Runway &amp; Events"
          subtitle="Auditions, national festival galas, and bespoke styling workshops. Register to participate or attend live as an audience guest."
        />

        {/* ─── Club Notice Board Banner ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 p-4 sm:p-5 rounded-sm bg-vogue-black/90 border border-vogue-gold/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-vogue-gold/15 border border-vogue-gold/40 flex items-center justify-center text-vogue-gold shrink-0">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-vogue-gold font-bold block">
                Club Notice Board
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-vogue-ivory">
                Auditions 2026 Registration Form Released
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs font-mono text-vogue-champagne/70">
              2026-10-02
            </span>
            <a
              href="/apply"
              onClick={() => sound.playClick()}
              className="px-4 py-2 bg-vogue-gold text-vogue-black text-xs font-bold uppercase tracking-wider hover:bg-vogue-gold-light transition-all rounded-xs shadow-md shadow-vogue-gold/20 flex items-center gap-1.5"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Status Filter Tabs */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            onClick={() => handleTab('UPCOMING')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all border ${
              activeTab === 'UPCOMING'
                ? 'bg-vogue-gold text-vogue-black border-vogue-gold shadow-md shadow-vogue-gold/20'
                : 'bg-vogue-black/60 text-vogue-champagne/80 border-vogue-gold/30 hover:border-vogue-gold'
            }`}
          >
            Upcoming Events ({upcomingEvents.length})
          </button>
          <button
            onClick={() => handleTab('COMPLETED')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all border ${
              activeTab === 'COMPLETED'
                ? 'bg-vogue-gold text-vogue-black border-vogue-gold shadow-md shadow-vogue-gold/20'
                : 'bg-vogue-black/60 text-vogue-champagne/80 border-vogue-gold/30 hover:border-vogue-gold'
            }`}
          >
            Past Highlights ({completedEvents.length})
          </button>
          <button
            onClick={() => handleTab('ALL')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all border ${
              activeTab === 'ALL'
                ? 'bg-vogue-gold text-vogue-black border-vogue-gold shadow-md shadow-vogue-gold/20'
                : 'bg-vogue-black/60 text-vogue-champagne/80 border-vogue-gold/30 hover:border-vogue-gold'
            }`}
          >
            All Events
          </button>
        </div>

        {/* Event Cards Grid */}
        {displayedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {displayedEvents.map((evt) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-vogue-black/85 border border-vogue-gold/30 rounded-sm overflow-hidden flex flex-col justify-between shadow-xl hover:border-vogue-gold transition-all duration-300 group"
              >
                <div>
                  {/* Event Poster Image */}
                  <div className="relative h-56 overflow-hidden border-b border-vogue-gold/20">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-transparent to-transparent opacity-80" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-vogue-black/90 border border-vogue-gold text-[10px] uppercase font-bold tracking-widest text-vogue-gold rounded-full">
                        {evt.categoryLabel || evt.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 text-[10px] uppercase font-bold tracking-widest rounded-full">
                        {evt.audienceTag || 'Open to SOA'}
                      </span>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-vogue-gold font-semibold mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{evt.date} • {evt.time}</span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-vogue-ivory">
                        {evt.title}
                      </h3>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-vogue-champagne/85 font-sans">
                      <MapPin className="w-4 h-4 text-vogue-gold shrink-0 mt-0.5" />
                      <span>{evt.location}</span>
                    </div>

                    <p className="text-xs text-vogue-champagne/75 font-sans leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Highlights */}
                    <div className="pt-2 border-t border-vogue-gold/15">
                      <ul className="space-y-1.5 text-xs text-vogue-champagne/90 font-sans">
                        {evt.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-vogue-gold shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-6 pt-0 border-t border-vogue-gold/15 mt-4">
                  {evt.status === 'UPCOMING' && evt.registrationUrl ? (
                    <GoldButton to={evt.registrationUrl} variant="solid" className="w-full text-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Register Now</span>
                    </GoldButton>
                  ) : (
                    <div className="text-center py-2 text-xs font-mono uppercase tracking-widest text-vogue-muted">
                      Event Concluded • Archived in Portfolio
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ─── Premium Editorial Empty State ─── */
          <div className="max-w-2xl mx-auto p-10 bg-vogue-black/90 border border-vogue-gold/40 text-center space-y-6 rounded-sm shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full border border-vogue-gold/60 flex items-center justify-center bg-vogue-dark text-vogue-gold">
              <Clock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-vogue-gold font-bold">
                Runway Calendar Notice
              </span>
              <h3 className="font-serif text-3xl font-bold text-vogue-ivory uppercase mt-2">
                The Next Chapter Is Loading.
              </h3>
              <p className="text-xs sm:text-sm text-vogue-champagne/80 font-sans max-w-md mx-auto mt-2 leading-relaxed">
                Audition schedules and workshop registrations are being finalized with the university council. Stay tuned or submit your portfolio early.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <GoldButton to="/apply" variant="solid">
                <Sparkles className="w-4 h-4" />
                Pre-Register For Auditions
              </GoldButton>
              <button
                onClick={() => handleTab('COMPLETED')}
                className="px-5 py-2.5 border border-vogue-gold/40 text-xs font-bold uppercase tracking-widest text-vogue-champagne hover:border-vogue-gold hover:text-vogue-gold transition-colors"
              >
                View Previous Milestones
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default EventsSection;
