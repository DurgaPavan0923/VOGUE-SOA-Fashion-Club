import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Scissors, Palette, Camera, Briefcase, ChevronDown } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { GoldButton } from '../common/GoldButton';
import sound from '../../utils/audio';

export const Activities: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const activitiesList = [
    {
      icon: <Sparkles className="w-6 h-6 text-vogue-gold" />,
      title: 'Fashion Walks & Ramp Shows',
      category: 'RUNWAY SHOWCASES',
      description:
        'Choreographed stage showcases across state and national cultural fests, presenting curated theme collections with synchronized music, lighting, and stage geometry.',
      image: '/images/runway/runway-vol1-dsc-0004.jpg',
      badge: 'Championship Circuit',
      details: ['Choreographed ramp walks', 'National fest competitions', 'State podium representations'],
    },
    {
      icon: <Scissors className="w-6 h-6 text-vogue-gold" />,
      title: 'Theme Styling Competitions',
      category: 'DESIGN & UPCYCLING',
      description:
        'High-intensity creative design contests challenging members to style looks around Retro, Vintage 90s, Sustainable Fashion, and Avant-Garde fusion.',
      image: '/images/shoots/shoot-20260403-sd0-8440.jpg',
      badge: 'Zero-Waste Innovation',
      details: ['Retro & Vintage 90s styling', 'Sustainable zero-waste couture', 'Rapid ideation runway challenges'],
    },
    {
      icon: <Palette className="w-6 h-6 text-vogue-gold" />,
      title: 'Skill & Grooming Workshops',
      category: 'MASTERCLASSES',
      description:
        'Hands-on interactive masterclasses in high-definition makeup, personal styling, facial poise, walk posture, and couture fashion sketching.',
      image: '/images/workshops/workshop-dsc02769.jpg',
      badge: 'Industry Mentorship',
      details: ['HD Runway makeup masterclasses', 'Posture & poise clinics', 'Fashion illustration & sketching'],
    },
    {
      icon: <Camera className="w-6 h-6 text-vogue-gold" />,
      title: 'Photoshoots & Lookbook Magazines',
      category: 'EDITORIAL MEDIA',
      description:
        'Studio and outdoor fashion photography sessions creating magazine-grade portfolio lookbooks and dynamic social campaigns.',
      image: '/images/shoots/shoot-20260403-sd0-8461.jpg',
      badge: 'High-Fashion Media',
      details: ['Editorial portfolio shoots', 'Digital magazine spreads', 'Behind-the-scenes video reels'],
    },
    {
      icon: <Briefcase className="w-6 h-6 text-vogue-gold" />,
      title: 'Designer & Brand Collaborations',
      category: 'INDUSTRY TIE-UPS',
      description:
        'Partnerships with regional and national fashion labels, indie boutique designers, and campus lifestyle brands for exclusive apparel showcases.',
      image: '/images/shoots/shoot-20260403-sd0-8497.jpg',
      badge: 'Brand Partnerships',
      details: ['Designer capsule collections', 'Sponsorship runway segments', 'Boutique label collaborations'],
    },
  ];

  const handleToggle = (idx: number) => {
    sound.playClick();
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="activities" className="py-24 bg-vogue-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="What We Do"
          title="Club Activities &amp; Events"
          subtitle="From national runway championships to creative editorial productions, discover the full scope of VOGUE initiatives."
        />

        {/* Interactive Hover/Click Expanding Accordion */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {activitiesList.map((activity, idx) => {
            const isOpen = expandedIndex === idx;

            return (
              <motion.div
                key={activity.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`border transition-all duration-300 rounded-sm overflow-hidden ${
                  isOpen
                    ? 'border-vogue-gold bg-vogue-dark/95 shadow-2xl shadow-vogue-gold/15'
                    : 'border-vogue-gold/25 bg-vogue-dark/60 hover:border-vogue-gold/60'
                }`}
              >
                {/* Accordion Header Bar */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 rounded-full border border-vogue-gold/40 flex items-center justify-center bg-vogue-black text-vogue-gold shrink-0">
                      {activity.icon}
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-vogue-gold font-bold block mb-1">
                        {activity.category}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-vogue-ivory">
                        {activity.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block px-3 py-1 bg-vogue-black/80 border border-vogue-gold/40 text-[10px] uppercase font-bold tracking-widest text-vogue-champagne">
                      {activity.badge}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-1 rounded-full text-vogue-gold"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Content Drawer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="px-6 sm:px-8 pb-8 pt-2 border-t border-vogue-gold/15"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
                        <div className="md:col-span-7 space-y-4">
                          <p className="text-sm sm:text-base text-vogue-champagne/90 font-sans leading-relaxed">
                            {activity.description}
                          </p>

                          <div className="space-y-2 pt-2">
                            <span className="text-[11px] uppercase tracking-widest text-vogue-gold font-bold block">
                              Key Highlights
                            </span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-vogue-champagne/85 font-sans">
                              {activity.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-vogue-gold shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-3">
                            <GoldButton to="/apply" variant="solid" className="text-xs">
                              Participate in Next Session
                            </GoldButton>
                          </div>
                        </div>

                        {/* Gold Duotone Graded Image Container */}
                        <div className="md:col-span-5 relative group overflow-hidden border border-vogue-gold/40 rounded-sm shadow-xl bg-vogue-black">
                          <img
                            src={activity.image}
                            alt={activity.title}
                            className="w-full h-52 sm:h-60 object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.25] contrast-[1.08] brightness-[0.92]"
                          />
                          {/* Warm Gold/Plum Duotone Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-vogue-plum/20 to-transparent mix-blend-multiply pointer-events-none" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Activities;
