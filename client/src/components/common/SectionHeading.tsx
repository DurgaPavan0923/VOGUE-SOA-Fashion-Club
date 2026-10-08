import React from 'react';
import { motion } from 'framer-motion';
import ANIMATION_CONFIG from '../../animations/config';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  return (
    <motion.div
      initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl mb-14 ${alignment} ${className}`}
    >
      {kicker && (
        <motion.span
          initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-script text-2xl md:text-3xl text-vogue-gold block mb-1 drop-shadow-sm"
        >
          {kicker}
        </motion.span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-vogue-ivory uppercase leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm md:text-base text-vogue-champagne/80 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
      <motion.div
        initial={isReduced ? { width: 96 } : { width: 0, opacity: 0 }}
        whileInView={{ width: 96, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
        className={`h-[1px] bg-gradient-to-r from-transparent via-vogue-gold/70 to-transparent mt-4 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </motion.div>
  );
};

export default SectionHeading;
