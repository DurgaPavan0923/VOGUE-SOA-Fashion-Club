import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ANIMATION_CONFIG from '../animations/config';

gsap.registerPlugin(ScrollTrigger);

let globalLenisInstance: Lenis | null = null;

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable Lenis on touch devices, small screens, or if reduced motion is requested
    // Native high-refresh rate momentum physics runs at 120Hz on mobile devices
    if (
      ANIMATION_CONFIG.isReducedMotion() ||
      ANIMATION_CONFIG.isTouchDevice() ||
      window.innerWidth < 1024
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
      infinite: false,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    globalLenisInstance = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // Standard lag smoothing to absorb momentary frame delays without stuttering
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      globalLenisInstance = null;
    };
  }, []);

  return lenisRef;
};

export const pauseLenis = () => {
  if (globalLenisInstance) {
    globalLenisInstance.stop();
  }
};

export const resumeLenis = () => {
  if (globalLenisInstance) {
    globalLenisInstance.start();
  }
};

export default useLenis;
