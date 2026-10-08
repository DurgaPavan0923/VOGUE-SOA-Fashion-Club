import { useEffect, useRef } from 'react';
import ANIMATION_CONFIG from '../animations/config';

interface MagneticOptions {
  strength?: number;
  damping?: number;
}

export const useMagnetic = <T extends HTMLElement = HTMLDivElement>(options: MagneticOptions = {}) => {
  const ref = useRef<T | null>(null);
  const strength = options.strength ?? ANIMATION_CONFIG.magnetic.strength;

  useEffect(() => {
    const el = ref.current;
    if (!el || ANIMATION_CONFIG.isReducedMotion() || ANIMATION_CONFIG.isTouchDevice()) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      targetX = distanceX * strength;
      targetY = distanceY * strength;
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (el) {
        el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
      if (el) {
        el.style.transform = 'translate3d(0, 0, 0)';
      }
    };
  }, [strength]);

  return ref;
};

export default useMagnetic;
