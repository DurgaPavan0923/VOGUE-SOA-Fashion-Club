import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import fireConfetti from './ConfettiBurst';

export const SpotlightOverlay: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let keyBuffer = '';
    const secret = 'vogue';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in form inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'Escape' && isActive) {
        setIsActive(false);
        return;
      }

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.slice(-10);
      }

      if (keyBuffer.includes(secret)) {
        setIsActive((prev) => {
          if (!prev) {
            fireConfetti({ particleCount: 100 });
          }
          return !prev;
        });
        keyBuffer = '';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-[99990] overflow-hidden">
        {/* Dynamic Runway Spotlight Gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(184, 155, 94, 0.18) 0%, rgba(86, 28, 71, 0.25) 40%, rgba(12, 10, 11, 0.75) 85%)`,
          }}
        />

        {/* Floating Runway Spotlight HUD Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-auto px-6 py-2.5 rounded-full bg-vogue-black/90 border border-vogue-gold shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs tracking-widest uppercase font-sans text-vogue-gold"
        >
          <Sparkles className="w-4 h-4 text-vogue-gold animate-spin" />
          <span>Runway Spotlight Mode Activated (Type 'VOGUE' or press Esc)</span>
          <button
            onClick={() => setIsActive(false)}
            className="p-1 hover:text-white transition-colors"
            title="Close Spotlight Mode"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SpotlightOverlay;
