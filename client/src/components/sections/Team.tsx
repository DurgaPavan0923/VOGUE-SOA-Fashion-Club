import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { FOUNDERS_DATA, CORE_TEAM_DATA } from '../../data/teamData';
import sound from '../../utils/audio';

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 sm:py-32 bg-vogue-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="Visionaries &amp; Creative Directors"
          title="Founders &amp; Leadership"
          subtitle="Meet the founding directors and creative leads who built VOGUE SOA into a nationally recognized fashion movement."
        />

        {/* ─── Founders Magazine Triple Spread ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {FOUNDERS_DATA.map((founder, idx) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ y: -6 }}
              className="bg-vogue-dark/90 border border-vogue-gold/30 rounded-sm overflow-hidden group hover:border-vogue-gold hover:shadow-2xl hover:shadow-vogue-gold/15 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              data-cursor="profile"
            >
              {/* Portrait Frame with Royal Arch Styling */}
              <div className="relative overflow-hidden bg-vogue-black border-b border-vogue-gold/20 p-6 flex items-center justify-center">
                <div className="relative overflow-hidden rounded-t-full border-2 border-vogue-gold/50 max-w-[260px] w-full group-hover:border-vogue-gold group-hover:shadow-[0_0_20px_rgba(184,155,94,0.3)] transition-all duration-500">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-72 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-vogue-black/90 border border-vogue-gold text-[10px] uppercase font-bold tracking-widest text-vogue-gold">
                    Co-Founder
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 text-center space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-vogue-ivory group-hover:text-vogue-gold transition-colors relative inline-block">
                    {founder.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-vogue-gold transition-all duration-300 group-hover:w-full" />
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-vogue-champagne font-semibold mt-1">
                    {founder.role}
                  </p>
                  <p className="text-xs text-vogue-champagne/75 font-sans mt-3 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>

                {/* Social Connect */}
                <div className="pt-4 border-t border-vogue-gold/15 flex items-center justify-center gap-4">
                  <a
                    href={founder.social.instagram || 'https://instagram.com/VOGUE_SOA_FASHION_CLUB'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-2 rounded-full border border-vogue-gold/30 text-vogue-champagne hover:text-vogue-gold hover:border-vogue-gold hover:scale-110 transition-all"
                    aria-label={`Instagram for ${founder.name}`}
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Core Coordinators Grid ─── */}
        <div className="border-t border-vogue-gold/20 pt-12">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-vogue-gold font-mono font-bold">
              Creative Wings &amp; Coordination
            </span>
            <h3 className="font-serif text-2xl font-bold text-vogue-ivory uppercase mt-1">
              Core Department Leads
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CORE_TEAM_DATA.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-5 rounded-sm border border-vogue-gold/20 bg-vogue-dark/70 text-center space-y-3 hover:border-vogue-gold/60 transition-all shadow-lg"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border border-vogue-gold/40 p-0.5 bg-vogue-black">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-vogue-ivory">
                    {member.name}
                  </h4>
                  <span className="text-[10px] uppercase tracking-widest text-vogue-gold font-sans font-semibold block mt-0.5">
                    {member.role}
                  </span>
                </div>

                <p className="text-xs text-vogue-champagne/70 font-sans leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Team;
