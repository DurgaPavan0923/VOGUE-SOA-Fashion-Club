import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ANIMATION_CONFIG from '../animations/config';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  opacity?: number;
  scale?: number;
  start?: string;
  stagger?: number;
}

export const useReveal = <T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (ANIMATION_CONFIG.isReducedMotion()) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const {
      y = 30,
      x = 0,
      duration = ANIMATION_CONFIG.transitions.fadeDuration,
      delay = 0,
      opacity = 0,
      scale = 1,
      start = 'top 85%',
      stagger = 0,
    } = options;

    const ctx = gsap.context(() => {
      const targets = stagger > 0 && el.children.length > 0 ? el.children : el;

      gsap.fromTo(
        targets,
        {
          y,
          x,
          opacity,
          scale: scale < 1 ? scale : 1,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : undefined,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options]);

  return ref;
};

export default useReveal;
