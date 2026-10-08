import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, RotateCw, Eye, Maximize2, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { GoldButton } from '../common/GoldButton';
import { useTilt } from '../../hooks/useTilt';
import ANIMATION_CONFIG from '../../animations/config';
import sound from '../../utils/audio';

export const Themes: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [expandedCollection, setExpandedCollection] = useState<any | null>(null);
  const tiltCardRef = useTilt<HTMLDivElement>({ maxTilt: 8, scale: 1.02 });
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  const signatureThemes = [
    {
      id: 'anantara',
      title: 'Anantara',
      tagline: 'Timeless Elegance & Infinite Heritage',
      narrative:
        'A celebration of primordial Indian textile artistry merged with fluid royal draping. Anantara represents the eternal continuum of couture—where traditional motifs meet contemporary runway poise.',
      palette: ['#561C47', '#B89B5E', '#EADBC4', '#171415'],
      paletteNames: ['Deep Plum', 'Antique Gold', 'Champagne', 'Near-Black'],
      images: [
        '/images/shoots/shoot-20260403-sd0-8461.jpg',
        '/images/shoots/shoot-20260403-sd0-8462.jpg',
        '/images/runway/runway-vol1-dsc-0014.jpg',
      ],
      motif: 'Mandala & Romanesque Royal Arch',
      badge: 'Spectra Gold Champion Theme',
      bgGlow: 'from-[#561C47]/40 via-vogue-dark to-vogue-black',
      conceptSpecs: [
        'Fabric: Pure Raw Silk, Tissue Organza, and Gold Zari Weaves',
        'Draping: Imperial Royal Pallu with Cascading Symmetrical Trails',
        'Inspiration: Odishan Temple Architecture & Vedic Geometry',
        'Accents: Antique Kundan Embroidery & Matte Brass Chokers',
      ],
    },
    {
      id: 'evolution',
      title: 'Evolution Over Royal Fashion',
      tagline: 'Regal Metamorphosis & Modern Lineage',
      narrative:
        'Deconstructing vintage imperial silhouettes into sharp, structured tailoring. A dialogue between the opulent past and sustainable, minimalist future of high fashion.',
      palette: ['#5A4738', '#B89B5E', '#0C0A0B', '#F3E8D6'],
      paletteNames: ['Espresso', 'Antique Gold', 'Slate Noir', 'Cream'],
      images: [
        '/images/shoots/shoot-20260403-sd0-8497.jpg',
        '/images/shoots/shoot-20260403-sd0-8500.jpg',
        '/images/runway/runway-vol2-dsc-0015.jpg',
      ],
      motif: 'Geometric Linear Structure',
      badge: 'State Finalist Lookbook',
      bgGlow: 'from-[#5A4738]/40 via-vogue-dark to-vogue-black',
      conceptSpecs: [
        'Fabric: Structured Matka Wool, Recycled Cotton, and Slate Linen',
        'Draping: Razor-Sharp Asymmetrical Lapels and Minimalist Trench Cuts',
        'Inspiration: Bauhaus Architecture & Royal Metamorphosis',
        'Accents: Monolithic Titanium Cufflinks & Raw Edge Piping',
      ],
    },
    {
      id: 'raj-ghrana',
      title: 'Raj Ghrana',
      tagline: 'Imperial Aristocracy & Handcrafted Splendor',
      narrative:
        'An homage to majestic courtyards, opulent brocades, jaali lattice patterns, and regal poise. Every garment is an architectural homage to Indian royal dynasties.',
      palette: ['#4A123C', '#D4AF37', '#B89B5E', '#0C0A0B'],
      paletteNames: ['Imperial Plum', 'Bright Gold', 'Antique Gold', 'Near-Black'],
      images: [
        '/images/shoots/shoot-20260403-sd0-8440.jpg',
        '/images/shoots/shoot-20260403-sd0-8441.jpg',
        '/images/runway/runway-vol1-dsc-0025.jpg',
      ],
      motif: 'Jaali Geometric Lattice & Brocade',
      badge: 'Chiasma & Advita Podium Theme',
      bgGlow: 'from-[#4A123C]/50 via-vogue-dark to-vogue-black',
      conceptSpecs: [
        'Fabric: Heavy Banarasi Brocade, Velvet, and Resham Threadwork',
        'Draping: Royal Angrakha Silhouette with Flared Kalidar Panels',
        'Inspiration: Mughal & Rajput Imperial Palaces & Jaali Screens',
        'Accents: Intricate Filigree Borders & Hand-Beaded Zardozi',
      ],
    },
    {
      id: 'indo-western',
      title: 'Indo-Western',
      tagline: 'Contemporary Fusion & Avant-Garde Draping',
      narrative:
        'Bridging Eastern heritage drapes with structured Western cuts. High-octane contrast, asymmetrical cuts, and fearless styling redefine the collegiate runway.',
      palette: ['#EADBC4', '#C5A059', '#561C47', '#0C0A0B'],
      paletteNames: ['Champagne', 'Electric Gold', 'Plum Accent', 'Noir'],
      images: [
        '/images/shoots/shoot-20260403-sd0-8531.jpg',
        '/images/shoots/shoot-20260403-sd0-8532.jpg',
        '/images/runway/runway-vol2-dsc-0040.jpg',
      ],
      motif: 'Asymmetrical Draped Contours',
      badge: 'Brahmastra Winner Theme',
      bgGlow: 'from-[#B89B5E]/25 via-vogue-dark to-vogue-black',
      conceptSpecs: [
        'Fabric: Modal Satin, Spun Georgette, and Structured Neoprene',
        'Draping: Cowled Dhoti Trousers paired with Sculpted Corset Tops',
        'Inspiration: Global Street Runway & Indian Classical Draping',
        'Accents: High-Gloss Metallic Belts & Asymmetric Zipper Details',
      ],
    },
  ];

  const current = signatureThemes[activeTheme];

  // Automatic collection photography rotation
  useEffect(() => {
    if (isReduced || isFlipped) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % current.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [current, isFlipped, isReduced]);

  const handleTabChange = (idx: number) => {
    sound.playClick();
    sound.playSwoosh();
    setActiveTheme(idx);
    setActiveSlideIndex(0);
    setIsFlipped(false);
  };

  const handleFlipCard = () => {
    sound.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleOpenExpansion = () => {
    sound.playClick();
    setExpandedCollection(current);
  };

  return (
    <section id="themes" className="py-24 bg-vogue-dark relative overflow-hidden select-none">
      {/* Dynamic Background Tone and Motif Morph */}
      <div className={`absolute inset-0 bg-gradient-to-b ${current.bgGlow} opacity-60 transition-all duration-700 pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="The Collections"
          title="Thematic Runway Universe"
          subtitle="Explore the four core conceptual themes that define VOGUE's award-winning runway collections."
        />

        {/* Thematic Tabs Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {signatureThemes.map((theme, idx) => (
            <button
              key={theme.id}
              onClick={() => handleTabChange(idx)}
              className={`px-5 py-3 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
                activeTheme === idx
                  ? 'bg-vogue-gold text-vogue-black border-vogue-gold shadow-lg shadow-vogue-gold/20 scale-105'
                  : 'bg-vogue-black/60 text-vogue-champagne border-vogue-gold/30 hover:border-vogue-gold hover:text-vogue-ivory'
              }`}
            >
              {theme.title}
            </button>
          ))}
        </div>

        {/* Active Theme Spotlight Card with 3D Tilt, Auto Photo Rotation and Flip Feature */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-vogue-black/85 border border-vogue-gold/30 p-6 sm:p-10 backdrop-blur-xl relative shadow-2xl"
          >
            {/* Corner Decorative Filigree Elements */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-vogue-gold" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-vogue-gold" />

            {/* Left Column: 3D Tilt Card with Auto-cycling Slides & Flip */}
            <div className="lg:col-span-5 relative" data-cursor="drag">
              <div
                ref={tiltCardRef}
                className="relative w-full h-[380px] sm:h-[460px] cursor-pointer perspective-1000 group"
                onClick={handleFlipCard}
                title="Click to flip lookbook specification card"
              >
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front Face: Auto-Rotating Visual Artwork */}
                  <div
                    className="absolute inset-0 w-full h-full border border-vogue-gold/40 overflow-hidden bg-vogue-dark rounded-sm shadow-xl"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <AnimatePresence mode="sync">
                      <motion.img
                        key={activeSlideIndex}
                        src={current.images[activeSlideIndex]}
                        alt={current.title}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-vogue-black/85 border border-vogue-gold text-[10px] uppercase font-bold tracking-widest text-vogue-gold backdrop-blur-sm">
                        {current.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-vogue-black/80 border border-vogue-gold/40 text-[10px] uppercase font-semibold text-vogue-champagne rounded-full backdrop-blur-sm">
                      <RotateCw className="w-3 h-3 text-vogue-gold" />
                      <span>Flip Details</span>
                    </div>

                    {/* Slide Dots Indicator */}
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5">
                      {current.images.map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activeSlideIndex === dotIdx ? 'bg-vogue-gold w-4' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Back Face: Runway Lookbook Specs */}
                  <div
                    className="absolute inset-0 w-full h-full border border-vogue-gold/60 bg-gradient-to-b from-vogue-dark via-vogue-black to-vogue-dark p-6 flex flex-col justify-between rounded-sm shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-vogue-gold block mb-1 font-mono">
                        Couture Technical Specs
                      </span>
                      <h4 className="font-serif text-xl font-bold text-vogue-ivory uppercase mb-4">
                        {current.title} Spec Sheet
                      </h4>
                      <ul className="space-y-3 text-xs font-sans text-vogue-champagne/90">
                        {current.conceptSpecs.map((spec: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 border-b border-vogue-gold/15 pb-2">
                            <span className="text-vogue-gold font-bold">▪</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-center pt-4 border-t border-vogue-gold/20 flex items-center justify-between text-[11px] text-vogue-gold">
                      <span>Click anywhere to flip back</span>
                      <RotateCw className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Concept Narrative, Palette & Motif */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-script text-3xl text-vogue-gold block mb-1">
                  Collection #{activeTheme + 1}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-vogue-ivory uppercase">
                  {current.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-vogue-champagne font-semibold mt-1">
                  {current.tagline}
                </p>
              </div>

              <p className="text-sm md:text-base text-vogue-champagne/80 font-sans leading-relaxed">
                {current.narrative}
              </p>

              {/* Color Palette Tokens */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-vogue-muted font-bold block">
                  Curated Theme Palette
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {current.palette.map((hex: string, i: number) => (
                    <div key={hex} className="flex items-center gap-2 bg-vogue-dark/80 px-3 py-1.5 border border-vogue-gold/20">
                      <div
                        className="w-4 h-4 rounded-full border border-vogue-ivory/20 shadow"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-[10px] font-sans text-vogue-champagne font-mono">
                        {hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Motif Accent Tag */}
              <div className="flex items-center gap-2 text-xs text-vogue-muted font-sans pt-2">
                <Layers className="w-4 h-4 text-vogue-gold" />
                <span>Cultural Motif: <strong className="text-vogue-champagne">{current.motif}</strong></span>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <GoldButton to="/apply" variant="solid">
                  <Sparkles className="w-4 h-4" />
                  Audition for this Runway
                </GoldButton>
                <button
                  onClick={handleOpenExpansion}
                  className="px-6 py-3 border border-vogue-gold/40 text-xs font-bold uppercase tracking-widest text-vogue-champagne hover:border-vogue-gold hover:text-vogue-gold transition-all duration-300 flex items-center gap-2 bg-vogue-black/60"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Full Moodboard</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ─── Full-Screen Immersive Collection Expansion Modal ─── */}
        <AnimatePresence>
          {expandedCollection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-vogue-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
            >
              {/* Top Action Bar */}
              <div className="flex items-center justify-between border-b border-vogue-gold/30 pb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-vogue-gold text-vogue-black text-[10px] uppercase font-bold tracking-widest">
                    Couture Lookbook Spread
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-vogue-ivory uppercase">
                    {expandedCollection.title}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setExpandedCollection(null);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-vogue-gold text-xs font-bold uppercase tracking-widest text-vogue-gold hover:bg-vogue-gold hover:text-vogue-black transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK TO COLLECTIONS</span>
                </button>
              </div>

              {/* Moodboard 3-Photo Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                {expandedCollection.images.map((img: string, i: number) => (
                  <div key={i} className="relative h-80 sm:h-96 rounded-sm overflow-hidden border border-vogue-gold/40 group">
                    <img
                      src={img}
                      alt={`${expandedCollection.title} ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vogue-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-3 left-3 text-[10px] font-mono text-vogue-gold uppercase tracking-widest">
                      Plate 0{i + 1} • {expandedCollection.title}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Narrative & Specs Spread */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-vogue-gold/20 pt-6 text-xs text-vogue-champagne/90">
                <div>
                  <h4 className="font-serif text-xl font-bold text-vogue-ivory uppercase mb-2">
                    Curatorial Statement
                  </h4>
                  <p className="leading-relaxed text-vogue-champagne/80">
                    {expandedCollection.narrative}
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-xl font-bold text-vogue-ivory uppercase mb-2">
                    Fabrication &amp; Draping Details
                  </h4>
                  <ul className="space-y-1.5">
                    {expandedCollection.conceptSpecs.map((spec: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-vogue-gold" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Themes;

