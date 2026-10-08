import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ANIMATION_CONFIG from '../../animations/config';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // Parallax offset in px (e.g., 30-60)
  className?: string;
  imageClassName?: string;
  aspectRatio?: string;
  children?: React.ReactNode;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  speed = 40,
  className = '',
  imageClassName = '',
  aspectRatio = 'aspect-[3/4]',
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isReduced = ANIMATION_CONFIG.isReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.08]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          y: isReduced ? 0 : y,
          scale: isReduced ? 1 : scale,
        }}
        className={`w-full h-full object-cover transition-transform duration-500 ${imageClassName}`}
      />
      {children}
    </div>
  );
};

export default ParallaxImage;
