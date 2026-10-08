import { Variants } from 'framer-motion';

// Luxury Editorial Animation Variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const imageReveal: Variants = {
  hidden: {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    scale: 1.15,
  },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    scale: 1,
    transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
  },
};

export const hoverLift: Variants = {
  rest: { y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  hover: { y: -6, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const cardGlow: Variants = {
  rest: {
    borderColor: 'rgba(184, 155, 94, 0.25)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  },
  hover: {
    borderColor: 'rgba(184, 155, 94, 0.8)',
    boxShadow: '0 10px 30px rgba(184, 155, 94, 0.2)',
    transition: { duration: 0.35 },
  },
};
