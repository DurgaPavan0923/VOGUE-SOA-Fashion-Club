import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Sparkles, ArrowDown } from 'lucide-react';
import sound from '../../utils/audio';

export const AchievementHighlight: React.FC = () => {
  return (
    <section className="py-24 bg-vogue-black relative overflow-hidden border-t border-b border-vogue-gold/30">
      {/* Dramatic Radiant Backdrop */}
      <div className="absolute inset-0 bg-radial-vogue opacity-90 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-vogue-plum/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Gold Borders */}
      <div className="absolute inset-6 sm:inset-10 border border-vogue-gold/20 pointer-events-none hidden sm:block">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-vogue-gold" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-vogue-gold" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-vogue-gold" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-vogue-gold" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-vogue-gold/50 bg-vogue-dark/95 backdrop-blur-md mb-6 shadow-xl shadow-vogue-gold/15"
        >
          <Trophy className="w-4 h-4 text-vogue-gold" />
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.25em] text-vogue-champagne font-bold">
            Flagship Podium Victory
          </span>
        </motion.div>

        {/* Massive Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-3"
        >
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-vogue-ivory leading-none">
            National <br className="sm:hidden" />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-vogue-gold via-vogue-champagne to-vogue-gold">
              Champions
            </span>
          </h2>

          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-widest text-vogue-champagne">
            Spectra Runway 2025 &amp; 2023
          </h3>

          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-vogue-gold font-mono font-semibold">
            Birla Global University (BGU) • Consecutive Gold Victories
          </p>
        </motion.div>

        {/* Narrative & Visual Spread */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left bg-vogue-dark/85 border border-vogue-gold/30 p-6 sm:p-10 rounded-sm shadow-2xl backdrop-blur-md">
          
          <div className="md:col-span-7 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-vogue-gold font-bold block">
              Official Jury Citation
            </span>
            <p className="font-serif text-lg sm:text-xl text-vogue-ivory italic leading-relaxed">
              "VOGUE SOA delivered an impeccably staged runway tour de force—unifying heritage Odishan temple motifs with cutting-edge haute couture draping and flawless cadence."
            </p>
            <p className="text-xs sm:text-sm text-vogue-champagne/85 font-sans leading-relaxed">
              Facing premier collegiate teams across India, VOGUE clinched the prestigious 1st Place National Championship trophy back-to-back, establishing SOA University as the definitive benchmark of collegiate runway excellence.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-vogue-black border border-vogue-gold/40 text-vogue-champagne text-[10px] font-mono uppercase">
                Collection: Anantara
              </span>
              <span className="px-3 py-1 bg-vogue-black border border-vogue-gold/40 text-vogue-champagne text-[10px] font-mono uppercase">
                Trophy: Gold Podium Winner
              </span>
            </div>
          </div>

          <div className="md:col-span-5 relative group rounded-sm overflow-hidden border border-vogue-gold/40">
            <img
              src="/images/achievements/bgu-spectra-2026.jpg"
              alt="Spectra Runway National Championship"
              className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-vogue-gold font-bold">
              <span>National Gold Award</span>
              <Award className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AchievementHighlight;
