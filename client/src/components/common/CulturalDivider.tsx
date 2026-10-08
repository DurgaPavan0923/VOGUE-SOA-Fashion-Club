import React from 'react';
import { motion } from 'framer-motion';
import ANIMATION_CONFIG from '../../animations/config';

interface CulturalDividerProps {
  variant?: 'mandala' | 'paisley' | 'simple';
  className?: string;
}

export const CulturalDivider: React.FC<CulturalDividerProps> = ({
  variant = 'mandala',
  className = '',
}) => {
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  if (variant === 'simple') {
    return (
      <div className={`py-12 flex items-center justify-center ${className}`}>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-vogue-gold/60" />
        <div className="mx-4 w-2 h-2 rotate-45 border border-vogue-gold bg-vogue-black" />
        <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-vogue-gold/60" />
      </div>
    );
  }

  return (
    <div className={`py-16 flex flex-col items-center justify-center relative overflow-hidden ${className}`}>
      <div className="flex items-center justify-center w-full max-w-xl px-4">
        {/* Left Filigree Line */}
        <motion.div
          initial={{ scaleX: isReduced ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-vogue-gold/40 to-vogue-gold origin-left"
        />

        {/* Central Mandala SVG with Stroke Draw */}
        <motion.div
          initial={{ scale: isReduced ? 1 : 0.6, rotate: isReduced ? 0 : -45, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="mx-6 relative w-12 h-12 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-vogue-gold"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Diamond */}
            <motion.polygon
              points="50,5 95,50 50,95 5,50"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              initial={{ pathLength: isReduced ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
            {/* Inner Ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="24"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            {/* Center Monogram Star */}
            <motion.circle
              cx="50"
              cy="50"
              r="8"
              fill="currentColor"
              className="opacity-80"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
          </svg>
        </motion.div>

        {/* Right Filigree Line */}
        <motion.div
          initial={{ scaleX: isReduced ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-vogue-gold/40 to-vogue-gold origin-right"
        />
      </div>

      <span className="text-[9px] uppercase tracking-[0.3em] text-vogue-gold/60 font-sans mt-3">
        Vogue SOA Couture
      </span>
    </div>
  );
};

export default CulturalDivider;
