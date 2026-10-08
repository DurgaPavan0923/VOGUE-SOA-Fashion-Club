import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Check, Heart, Compass, Crown, Layers } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { GoldButton } from '../common/GoldButton';
import fireConfetti from '../../animations/ConfettiBurst';
import sound from '../../utils/audio';

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    theme: 'anantara' | 'evolution' | 'raj-ghrana' | 'indo-western';
    icon: string;
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which color palette captures your fashion soul?',
    subtitle: 'Choose the visual resonance of your runway presence.',
    options: [
      {
        label: 'Deep Plum & Antique Gold',
        description: 'Imperial royalty meets timeless temple silhouettes.',
        theme: 'anantara',
        icon: '👑',
      },
      {
        label: 'Espresso, Noir & Slate Gold',
        description: 'Sharp, structured minimalism with high-fashion restraint.',
        theme: 'evolution',
        icon: '⚡',
      },
      {
        label: 'Imperial Crimson & Brocade Gold',
        description: 'Grand courtyard opulence with ornate heritage textures.',
        theme: 'raj-ghrana',
        icon: '🏛️',
      },
      {
        label: 'Champagne, Electric Gold & Plum',
        description: 'Fearless contemporary fusion and avant-garde drape lines.',
        theme: 'indo-western',
        icon: '✨',
      },
    ],
  },
  {
    id: 2,
    question: 'What is your signature runway silhouette?',
    subtitle: 'How do you command the catwalk geometry?',
    options: [
      {
        label: 'Flowing Draped Royal Capes',
        description: 'Cascading fabrics with fluid elegance and poise.',
        theme: 'anantara',
        icon: '🕊️',
      },
      {
        label: 'Architectural Tailored Blazers',
        description: 'Crisp shoulder lines and deconstructed collars.',
        theme: 'evolution',
        icon: '📐',
      },
      {
        label: 'Heavy Brocade Lehengas & Sherwanis',
        description: 'Intricate jaali embroidery and heritage volume.',
        theme: 'raj-ghrana',
        icon: '⚜️',
      },
      {
        label: 'Asymmetric Dhoti-Suits & Corsets',
        description: 'East-meets-West bold high-fashion contrast.',
        theme: 'indo-western',
        icon: '🔥',
      },
    ],
  },
  {
    id: 3,
    question: 'What inspires your personal style storytelling?',
    subtitle: 'The artistic engine behind your fashion expression.',
    options: [
      {
        label: 'Eternal Indian Mythology & Poetry',
        description: 'Ancient verses translated into modern silk drapes.',
        theme: 'anantara',
        icon: '📜',
      },
      {
        label: 'Futuristic Metamorphosis & Bauhaus',
        description: 'Evolutionary shifts and progressive sustainable craft.',
        theme: 'evolution',
        icon: '🚀',
      },
      {
        label: 'Royal Dynasties & Palace Architecture',
        description: 'Echoes of majestic kings, queens, and court artisans.',
        theme: 'raj-ghrana',
        icon: '🏰',
      },
      {
        label: 'Global Streetwear & Indie Runway Crossovers',
        description: 'Breaking cultural borders with unapologetic individuality.',
        theme: 'indo-western',
        icon: '🌐',
      },
    ],
  },
  {
    id: 4,
    question: 'Choose your runway walking soundtrack tempo:',
    subtitle: 'The rhythm that powers your stride on the ramp.',
    options: [
      {
        label: 'Haunting Sitar & Ambient Orchestral Beats',
        description: 'Slow, regal pacing that turns heads in complete awe.',
        theme: 'anantara',
        icon: '🎵',
      },
      {
        label: 'Deep Techno & Industrial Minimalist Bass',
        description: 'Laser-precise walking mechanics with razor-sharp gaze.',
        theme: 'evolution',
        icon: '🎛️',
      },
      {
        label: 'Majestic Shehnai & Thunderous Dholak Crescendos',
        description: 'Grand theatrical entrance with aristocratic authority.',
        theme: 'raj-ghrana',
        icon: '🥁',
      },
      {
        label: 'High-Octane Synthwave & EDM Fusion',
        description: 'Dynamic runway energy that electrifies the stadium.',
        theme: 'indo-western',
        icon: '⚡',
      },
    ],
  },
  {
    id: 5,
    question: 'Your ultimate statement accessory is:',
    subtitle: 'The finishing touch that defines your aesthetic presence.',
    options: [
      {
        label: 'Antique Kundan Headpiece & Filigree Cuff',
        description: 'Handcrafted heirlooms with timeless aura.',
        theme: 'anantara',
        icon: '💎',
      },
      {
        label: 'Monolithic Geometric Titanium Ear-Cuffs',
        description: 'Sleek metallic accents celebrating the modern era.',
        theme: 'evolution',
        icon: '🪐',
      },
      {
        label: 'Embroidered Royal Zari Stole & Jeweled Brooch',
        description: 'Imperial insignia fit for coronation.',
        theme: 'raj-ghrana',
        icon: '🎖️',
      },
      {
        label: 'Sculpted Leather Harness over Silk Kurta',
        description: 'Boundary-pushing hybrid rebel chic.',
        theme: 'indo-western',
        icon: '🗡️',
      },
    ],
  },
];

const THEME_PROFILES = {
  anantara: {
    title: 'Anantara: The Infinite Muse',
    tagline: 'Timeless Elegance & Infinite Heritage',
    palette: ['#561C47', '#B89B5E', '#EADBC4', '#171415'],
    paletteNames: ['Deep Plum', 'Antique Gold', 'Champagne', 'Near-Black'],
    description:
      'Your style identity is rooted in grace, fluid royal draping, and poetic storytelling. You possess a regal stage presence that radiates eternal elegance.',
    badge: 'Spectra Gold Champion Persona',
    image: '/images/shoots/shoot-20260403-sd0-8461.jpg',
  },
  evolution: {
    title: 'Evolution Over Royal Fashion: The Futurist',
    tagline: 'Regal Metamorphosis & Modern Lineage',
    palette: ['#5A4738', '#B89B5E', '#0C0A0B', '#F3E8D6'],
    paletteNames: ['Espresso', 'Antique Gold', 'Slate Noir', 'Cream'],
    description:
      'You are structured, architectural, and fiercely forward-looking. You deconstruct traditional rules into sleek, sustainable, high-fashion silhouettes.',
    badge: 'State Finalist Lookbook Persona',
    image: '/images/shoots/shoot-20260403-sd0-8497.jpg',
  },
  'raj-ghrana': {
    title: 'Raj Ghrana: The Imperial Aristocrat',
    tagline: 'Imperial Aristocracy & Handcrafted Splendor',
    palette: ['#4A123C', '#D4AF37', '#B89B5E', '#0C0A0B'],
    paletteNames: ['Imperial Plum', 'Bright Gold', 'Antique Gold', 'Near-Black'],
    description:
      'You command the room with unapologetic grandeur, rich brocades, and intricate jaali motifs. You embody the majestic courts of Indian heritage.',
    badge: 'Chiasma & Advita Podium Persona',
    image: '/images/shoots/shoot-20260403-sd0-8440.jpg',
  },
  'indo-western': {
    title: 'Indo-Western: The Avant-Garde Rebel',
    tagline: 'Contemporary Fusion & Fearless Draping',
    palette: ['#EADBC4', '#C5A059', '#561C47', '#0C0A0B'],
    paletteNames: ['Champagne', 'Electric Gold', 'Plum Accent', 'Noir'],
    description:
      'You fearlessly bridge ancient drapes with modern streetwear and sharp cuts. Your style is dynamic, high-voltage, and completely original.',
    badge: 'Brahmastra Winner Persona',
    image: '/images/shoots/shoot-20260403-sd0-8531.jpg',
  },
};

export const StyleQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<keyof typeof THEME_PROFILES | null>(null);

  const handleSelectOption = (theme: string) => {
    sound.playClick();
    const updatedAnswers = [...answers, theme];
    setAnswers(updatedAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      sound.playSwoosh();
    } else {
      // Calculate winning theme
      const counts: Record<string, number> = {};
      updatedAnswers.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });

      let topTheme: keyof typeof THEME_PROFILES = 'anantara';
      let maxCount = 0;
      Object.entries(counts).forEach(([t, count]) => {
        if (count > maxCount) {
          maxCount = count;
          topTheme = t as keyof typeof THEME_PROFILES;
        }
      });

      setResult(topTheme);
      fireConfetti({ particleCount: 90 });
    }
  };

  const handleReset = () => {
    sound.playClick();
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const progressPercent = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const q = QUESTIONS[currentQuestion];

  return (
    <section id="style-quiz" className="py-24 bg-vogue-dark relative overflow-hidden">
      {/* Background Jaali Watermark */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url(/motifs/jaali-pattern.svg)', backgroundRepeat: 'repeat' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="Interactive Experience"
          title="Find Your Runway Persona"
          subtitle="Discover which signature VOGUE collection matches your fashion sensibility and stage aura."
        />

        <div className="bg-vogue-black/90 border border-vogue-gold/30 p-6 sm:p-10 rounded-sm shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Filigree Corner Accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-vogue-gold" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-vogue-gold" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-vogue-gold" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-vogue-gold" />

          {!result ? (
            <div>
              {/* Progress Header */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-sans uppercase tracking-widest text-vogue-champagne mb-2">
                  <span>Question 0{currentQuestion + 1} of 0{QUESTIONS.length}</span>
                  <span className="text-vogue-gold font-mono">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-vogue-dark border border-vogue-gold/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-vogue-plum via-vogue-gold to-vogue-gold-light"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Animated Question Body */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="mb-8 text-center sm:text-left">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-vogue-ivory">
                      {q.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-vogue-muted font-sans mt-1">
                      {q.subtitle}
                    </p>
                  </div>

                  {/* 4 Interactive Choice Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {q.options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelectOption(opt.theme)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-5 rounded-sm bg-vogue-dark/80 border border-vogue-gold/25 hover:border-vogue-gold text-left transition-all duration-300 group flex items-start gap-4 hover:shadow-lg hover:shadow-vogue-gold/10"
                      >
                        <span className="text-2xl shrink-0 p-2 rounded bg-vogue-black border border-vogue-gold/30 group-hover:scale-110 transition-transform">
                          {opt.icon}
                        </span>
                        <div>
                          <h4 className="font-serif text-base sm:text-lg font-bold text-vogue-ivory group-hover:text-vogue-gold transition-colors">
                            {opt.label}
                          </h4>
                          <p className="text-xs text-vogue-muted font-sans mt-1 leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            /* Result Reveal View */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-vogue-gold bg-vogue-dark text-[11px] font-sans uppercase tracking-widest text-vogue-gold shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  Your Runway Persona Match
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-vogue-ivory uppercase">
                  {THEME_PROFILES[result].title}
                </h3>

                <p className="font-script text-2xl text-vogue-gold">
                  {THEME_PROFILES[result].tagline}
                </p>

                <p className="text-sm sm:text-base text-vogue-champagne/90 font-sans max-w-xl mx-auto leading-relaxed">
                  {THEME_PROFILES[result].description}
                </p>

                {/* Persona Palette Chips */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  {THEME_PROFILES[result].palette.map((hex, i) => (
                    <div key={hex} className="flex items-center gap-2 bg-vogue-dark px-3 py-1.5 border border-vogue-gold/20">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-vogue-ivory/20"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-[10px] text-vogue-champagne font-mono">
                        {THEME_PROFILES[result].paletteNames[i]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Call to Action Buttons */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <GoldButton to="/apply" variant="solid" className="w-full sm:w-auto">
                    <Sparkles className="w-4 h-4" />
                    Audition as {THEME_PROFILES[result].title.split(':')[0]}
                  </GoldButton>
                  
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-3 border border-vogue-gold/30 text-vogue-champagne hover:text-vogue-gold hover:border-vogue-gold text-xs font-semibold uppercase tracking-widest transition-colors w-full sm:w-auto justify-center"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

export default StyleQuiz;
