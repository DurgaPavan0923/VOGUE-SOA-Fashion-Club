import { useEffect, useRef } from 'react';
import ANIMATION_CONFIG from '../animations/config';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

export const useTilt = <T extends HTMLElement = HTMLDivElement>(options: TiltOptions = {}) => {
  const ref = useRef<T | null>(null);
  const maxTilt = options.maxTilt ?? ANIMATION_CONFIG.tilt.maxTilt;
  const perspective = options.perspective ?? ANIMATION_CONFIG.tilt.perspective;
  const scale = options.scale ?? ANIMATION_CONFIG.tilt.scale;

  useEffect(() => {
    const el = ref.current;
    if (!el || ANIMATION_CONFIG.isReducedMotion() || ANIMATION_CONFIG.isTouchDevice()) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isHovering = false;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      isHovering = true;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) * 2 - 1; // -1 to 1
      const percentY = (y / rect.height) * 2 - 1; // -1 to 1

      targetRotX = -percentY * maxTilt;
      targetRotY = percentX * maxTilt;
    };

    const onMouseLeave = () => {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
    };

    const animate = () => {
      currentRotX += (targetRotX - currentRotX) * 0.12;
      currentRotY += (targetRotY - currentRotY) * 0.12;

      const currentScale = isHovering ? scale : 1;

      if (el) {
        el.style.transform = `perspective(${perspective}px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale3d(${currentScale}, ${currentScale}, 1)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    el.style.transition = 'transform 0.1s ease-out';
    el.style.transformStyle = 'preserve-3d';
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
      if (el) {
        el.style.transform = 'none';
      }
    };
  }, [maxTilt, perspective, scale]);

  return ref;
};

export default useTilt;
