import React from 'react';
import { motion, Variants } from 'framer-motion';
import ANIMATION_CONFIG from './config';

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  by?: 'word' | 'char';
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  by = 'word',
}) => {
  if (ANIMATION_CONFIG.isReducedMotion()) {
    return <span className={className}>{text}</span>;
  }

  const items = by === 'word' ? text.split(' ') : text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
      rotateX: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.span
      className={`inline-block overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      aria-label={text}
    >
      {items.map((item, index) => (
        <span key={index} className="inline-block whitespace-nowrap overflow-hidden">
          <motion.span
            variants={child}
            className={`inline-block ${wordClassName}`}
            style={{ transformOrigin: 'bottom' }}
          >
            {item}
            {by === 'word' && index < items.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default SplitText;
