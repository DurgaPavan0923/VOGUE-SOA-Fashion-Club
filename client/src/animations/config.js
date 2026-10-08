/**
 * VOGUE – SOA Fashion Club
 * Central Animation & Motion Design System Master Configuration
 * All motion speeds, easings, counts, and triggers can be fine-tuned here.
 */

export const ANIMATION_CONFIG = {
  // Global Transition Timings & Easings
  transitions: {
    // Custom cubic-bezier for luxury fashion editorial transitions
    luxuryEase: [0.25, 1, 0.5, 1],
    smoothOut: [0.16, 1, 0.3, 1],
    snappy: [0.4, 0, 0.2, 1],
    springBouncy: { type: 'spring', damping: 15, stiffness: 200 },
    springSmooth: { type: 'spring', damping: 25, stiffness: 300, mass: 0.5 },
    fadeDuration: 0.7,
    staggerDelay: 0.12,
  },

  // Lenis Smooth Scroll Configuration
  lenis: {
    duration: 1.2,
    lerp: 0.08,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
    smoothTouch: false,
  },

  // Custom Cursor Tuning
  cursor: {
    ringDamping: 25,
    ringStiffness: 300,
    dotDamping: 40,
    dotStiffness: 600,
    hoverScale: 1.8,
    textLabelScale: 2.4,
  },

  // Color Palette Constants
  colors: {
    black: '#0C0A0B',
    dark: '#171415',
    gold: '#B89B5E',
    goldLight: '#D4AF37',
    plum: '#561C47',
    espresso: '#5A4738',
    champagne: '#EADBC4',
    cream: '#F3E8D6',
    ivory: '#FAF7F2',
  },

  // Confetti Color Palette
  confettiColors: ['#B89B5E', '#D4AF37', '#EADBC4', '#561C47', '#FAF7F2'],

  // Particle Settings
  particles: {
    count: 35,
    mobileCount: 15,
    speed: 0.6,
    maxSize: 3.5,
    minSize: 1,
    opacity: 0.55,
    interactivityRadius: 120,
  },

  // 3D Tilt Settings
  tilt: {
    maxTilt: 12, // max degrees tilt
    perspective: 1000,
    scale: 1.02,
    speed: 500,
  },

  // Magnetic Pull Settings
  magnetic: {
    strength: 0.35, // 0 to 1 pull strength
    damping: 0.8,
  },

  // Preloader Timings (ms)
  preloader: {
    curtainOpenDuration: 1.2,
    counterSpeed: 20, // step interval in ms
    totalDurationMs: 2200,
  },

  // Check prefers-reduced-motion
  isReducedMotion: () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Check touch / mobile device
  isTouchDevice: () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
};

export default ANIMATION_CONFIG;
