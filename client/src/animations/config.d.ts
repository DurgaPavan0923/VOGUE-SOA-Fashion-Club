export interface AnimationConfigType {
  transitions: {
    luxuryEase: [number, number, number, number];
    smoothOut: [number, number, number, number];
    snappy: [number, number, number, number];
    springBouncy: { type: string; damping: number; stiffness: number };
    springSmooth: { type: string; damping: number; stiffness: number; mass: number };
    fadeDuration: number;
    staggerDelay: number;
  };
  lenis: {
    duration: number;
    lerp: number;
    wheelMultiplier: number;
    touchMultiplier: number;
    infinite: boolean;
    smoothTouch: boolean;
  };
  cursor: {
    ringDamping: number;
    ringStiffness: number;
    dotDamping: number;
    dotStiffness: number;
    hoverScale: number;
    textLabelScale: number;
  };
  colors: {
    black: string;
    dark: string;
    gold: string;
    goldLight: string;
    plum: string;
    espresso: string;
    champagne: string;
    cream: string;
    ivory: string;
  };
  confettiColors: string[];
  particles: {
    count: number;
    mobileCount: number;
    speed: number;
    maxSize: number;
    minSize: number;
    opacity: number;
    interactivityRadius: number;
  };
  tilt: {
    maxTilt: number;
    perspective: number;
    scale: number;
    speed: number;
  };
  magnetic: {
    strength: number;
    damping: number;
  };
  preloader: {
    curtainOpenDuration: number;
    counterSpeed: number;
    totalDurationMs: number;
  };
  isReducedMotion: () => boolean;
  isTouchDevice: () => boolean;
}

export declare const ANIMATION_CONFIG: AnimationConfigType;
export default ANIMATION_CONFIG;
