import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ProgressBar: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[9998] pointer-events-none bg-vogue-dark/30">
      <div
        className="h-full bg-gradient-to-r from-vogue-plum via-vogue-gold to-vogue-gold-light transition-all duration-75 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        {/* Shimmering Leading Edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-vogue-gold-light shadow-[0_0_12px_#D4AF37] blur-[1px]" />
      </div>
    </div>
  );
};

export default ProgressBar;
