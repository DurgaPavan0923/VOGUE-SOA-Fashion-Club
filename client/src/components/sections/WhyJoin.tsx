import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Palette, Award, Users } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { GoldButton } from '../common/GoldButton';

export const WhyJoin: React.FC = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-vogue-gold" />,
      title: 'Build Confidence & Stage Presence',
      description:
        'Transform your stage fear into magnetic authority. Learn runway walking mechanics, posture alignment, and poise that commands any auditorium.',
    },
    {
      icon: <Palette className="w-6 h-6 text-vogue-gold" />,
      title: 'Learn Styling, Grooming & Coordination',
      description:
        'Master the nuances of color theory, fabric draping, hair and makeup styling, and show choreography under experienced mentors.',
    },
    {
      icon: <Award className="w-6 h-6 text-vogue-gold" />,
      title: 'Exposure to Pageants & National Shows',
      description:
        'Compete on elite inter-university circuits (IITs, AIIMS, KIIT, SSU) and receive pathways to state/national beauty pageants like Miss Universe tracks.',
    },
    {
      icon: <Users className="w-6 h-6 text-vogue-gold" />,
      title: 'Network with Enthusiasts & Influencers',
      description:
        'Collaborate with photographers, boutique designers, lifestyle brands, models, and industry professionals across Eastern India.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-vogue-gold" />,
      title: 'Platform to Express Yourself & Shine',
      description:
        'A supportive, inclusive creative haven where your individuality is celebrated, and your unique style narrative finds its spotlight.',
    },
  ];

  return (
    <section id="why-join" className="py-24 bg-vogue-dark relative overflow-hidden">
      {/* Background Subtle Jaali Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url(/motifs/jaali-pattern.svg)', backgroundRepeat: 'repeat' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="Why Join"
          title="Why Join VOGUE SOA"
          subtitle="Discover how becoming a part of our fashion collective elevates your personal grooming, stage presence, and career network."
        />

        {/* Bento Grid Structure with Micro-Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`p-8 rounded-sm bg-vogue-black border border-vogue-gold/25 hover:border-vogue-gold transition-all duration-300 group flex flex-col justify-between shadow-xl hover:shadow-vogue-gold/15 ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-r from-vogue-dark to-vogue-black' : ''
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-full border border-vogue-gold/40 flex items-center justify-center bg-vogue-dark mb-6 group-hover:scale-110 group-hover:border-vogue-gold group-hover:shadow-[0_0_15px_rgba(184,155,94,0.3)] transition-all">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold text-vogue-ivory mb-3 group-hover:text-vogue-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-vogue-champagne/80 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-vogue-gold/15 flex items-center justify-between text-[11px] font-sans text-vogue-muted uppercase tracking-widest">
                <span>VOGUE Advantage</span>
                <span className="text-vogue-gold font-bold font-mono">0{idx + 1}</span>
              </div>
            </motion.div>
          ))}

          {/* Quick Auditions Open Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-sm bg-gradient-to-br from-vogue-plum/80 via-vogue-dark to-vogue-black border border-vogue-gold/40 flex flex-col justify-between shadow-xl hover:shadow-[0_0_25px_rgba(184,155,94,0.25)]"
          >
            <div>
              <span className="font-script text-3xl text-vogue-gold block mb-2">Auditions Open</span>
              <h3 className="font-serif text-2xl font-bold text-vogue-ivory mb-2">
                Ready for the Stage?
              </h3>
              <p className="text-xs text-vogue-champagne/90 font-sans leading-relaxed">
                Take the first step toward the runway. Fill out our online audition application in under 3 minutes.
              </p>
            </div>

            <div className="pt-6">
              <GoldButton to="/apply" variant="solid" className="w-full">
                Apply for Auditions
              </GoldButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
