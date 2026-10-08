import React, { useEffect, useRef, useState } from 'react';
import ANIMATION_CONFIG from '../../animations/config';

type CursorType = 'default' | 'pointer' | 'view' | 'drag' | 'explore' | 'open' | 'profile' | 'play';

export const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Disable on touch devices, small screens, or reduced-motion to guarantee 60-120 FPS
    if (
      ANIMATION_CONFIG.isTouchDevice() ||
      ANIMATION_CONFIG.isReducedMotion() ||
      window.innerWidth < 1024
    ) {
      return;
    }

    setIsEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const customCursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorType | null;

      if (customCursorAttr && ['view', 'drag', 'explore', 'open', 'profile', 'play'].includes(customCursorAttr)) {
        setCursorType(customCursorAttr);
      } else if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth RAF render loop without triggering React component re-renders
    const render = () => {
      // Lerp for trailing smooth ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isEnabled) return null;

  const isLabeled = ['view', 'drag', 'explore', 'open', 'profile', 'play'].includes(cursorType);
  const isPointer = cursorType === 'pointer';

  const cursorLabels: Record<string, string> = {
    view: 'VIEW',
    drag: 'DRAG',
    explore: 'EXPLORE',
    open: 'OPEN',
    profile: 'PROFILE',
    play: 'PLAY',
  };
  const labelText = cursorLabels[cursorType] || '';

  const ringDimensions = isLabeled
    ? labelText.length > 5
      ? 'w-20 h-20'
      : 'w-16 h-16'
    : isPointer
    ? 'w-12 h-12'
    : 'w-8 h-8';

  return (
    <>
      {/* Outer Floating Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border border-vogue-gold/80 hidden lg:flex items-center justify-center text-center overflow-hidden transition-[width,height,background-color] duration-200 shadow-[0_0_15px_rgba(184,155,94,0.3)] will-change-transform ${ringDimensions} ${
          isLabeled
            ? 'bg-vogue-dark/95 border-vogue-gold shadow-lg shadow-vogue-gold/20'
            : isPointer
            ? 'bg-vogue-gold/15 border-vogue-gold'
            : 'bg-black/30'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {isLabeled && (
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-vogue-gold font-sans select-none animate-fadeIn">
            {labelText}
          </span>
        )}
      </div>

      {/* Center Precision Dot */}
      {!isLabeled && (
        <div
          ref={dotRef}
          className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-vogue-gold hidden lg:block shadow-[0_0_8px_#D4AF37] will-change-transform ${
            isPointer ? 'w-2 h-2' : 'w-1.5 h-1.5'
          }`}
          style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        />
      )}
    </>
  );
};

export default CustomCursor;
