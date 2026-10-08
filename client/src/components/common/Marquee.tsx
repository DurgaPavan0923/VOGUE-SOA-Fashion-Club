import React from 'react';

interface MarqueeProps {
  items?: string[];
  speed?: 'normal' | 'slow';
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items = [
    'CREATIVITY',
    'CONFIDENCE',
    'COUTURE',
    'MORE THAN FASHION. A MOVEMENT.',
    'VOGUE SOA',
    'ANANTARA',
    'RAJ GHRANA',
    'INDO-WESTERN',
    'EVOLUTION OVER ROYAL FASHION',
  ],
  speed = 'normal',
  className = '',
}) => {
  const displayList = [...items, ...items];

  return (
    <div className={`relative w-full overflow-hidden bg-vogue-dark/80 border-y border-vogue-gold/20 py-3 select-none backdrop-blur-sm ${className}`}>
      <div
        className={`flex whitespace-nowrap will-change-transform ${
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'
        }`}
      >
        {displayList.map((item, index) => (
          <div key={index} className="flex items-center mx-6">
            <span className="font-serif text-xs sm:text-sm tracking-[0.25em] text-vogue-champagne/70 uppercase font-medium hover:text-vogue-gold transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-vogue-gold/50 mx-6 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
