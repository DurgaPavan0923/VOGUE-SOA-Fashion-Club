import confetti from 'canvas-confetti';
import ANIMATION_CONFIG from './config';
import sound from '../utils/audio';

interface ConfettiOptions {
  origin?: { x: number; y: number };
  particleCount?: number;
  spread?: number;
  playSound?: boolean;
}

export const fireConfetti = (options: ConfettiOptions = {}) => {
  if (ANIMATION_CONFIG.isReducedMotion()) return;

  const {
    origin = { x: 0.5, y: 0.6 },
    particleCount = 60,
    spread = 70,
    playSound = true,
  } = options;

  if (playSound) {
    sound.playChime();
  }

  // Multi-tier luxury burst
  confetti({
    particleCount,
    spread,
    origin,
    colors: ANIMATION_CONFIG.confettiColors,
    startVelocity: 35,
    gravity: 0.9,
    ticks: 200,
    shapes: ['square', 'circle'],
    scalar: 1.1,
    zIndex: 99999,
  });

  // Secondary delayed side spray for couture feel
  setTimeout(() => {
    confetti({
      particleCount: Math.floor(particleCount * 0.4),
      angle: 60,
      spread: 55,
      origin: { x: Math.max(0.1, origin.x - 0.2), y: origin.y },
      colors: ANIMATION_CONFIG.confettiColors,
      zIndex: 99999,
    });
    confetti({
      particleCount: Math.floor(particleCount * 0.4),
      angle: 120,
      spread: 55,
      origin: { x: Math.min(0.9, origin.x + 0.2), y: origin.y },
      colors: ANIMATION_CONFIG.confettiColors,
      zIndex: 99999,
    });
  }, 150);
};

export default fireConfetti;
