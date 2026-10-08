import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sound from '../../utils/audio';

interface SectionTarget {
  id: string;
  number: string;
  name: string;
}

const SECTIONS: SectionTarget[] = [
  { id: 'editorial-intro', number: '01', name: 'MANIFESTO' },
  { id: 'about', number: '02', name: 'PILLARS' },
  { id: 'themes', number: '03', name: 'THEMES' },
  { id: 'achievements', number: '04', name: 'TROPHIES' },
  { id: 'achieve-moments', number: '05', name: 'MOMENTS' },
  { id: 'experience', number: '06', name: 'MODULES' },
  { id: 'members', number: '07', name: 'ROSTER' },
  { id: 'faculty', number: '08', name: 'FACULTY' },
  { id: 'gallery', number: '09', name: 'LOOKBOOK' },
  { id: 'events', number: '10', name: 'CALENDAR' },
  { id: 'join-section', number: '11', name: 'JOIN' },
];

export const ScrollHUD: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('editorial-intro');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollHUD = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 350);

      const viewportMiddle = scrollY + window.innerHeight * 0.35;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const item = SECTIONS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= viewportMiddle) {
          setActiveSection(item.id);
          break;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollHUD);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end space-y-3 pointer-events-auto select-none">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group flex items-center gap-2.5 text-right transition-all focus:outline-none cursor-pointer"
            aria-label={`Scroll to ${section.name}`}
          >
            {/* Label reveals on hover or active */}
            <span
              className={`text-[9px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                isActive
                  ? 'text-vogue-gold opacity-100 font-bold translate-x-0'
                  : 'text-vogue-champagne/40 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
              }`}
            >
              {section.number} {section.name}
            </span>

            {/* Indicator Dot / Ring */}
            <div className="relative flex items-center justify-center w-3.5 h-3.5">
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2 h-2 bg-vogue-gold shadow-[0_0_10px_#D4AF37] scale-125'
                    : 'w-1 h-1 bg-vogue-gold/30 group-hover:bg-vogue-gold/80 group-hover:scale-125'
                }`}
              />
              {isActive && (
                <motion.span
                  layoutId="active-hud-ring"
                  className="absolute inset-0 rounded-full border border-vogue-gold/60"
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ScrollHUD;
