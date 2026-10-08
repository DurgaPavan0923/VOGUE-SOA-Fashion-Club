import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import sound from '../../utils/audio';

export const SoundToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());

  useEffect(() => {
    const handleSoundChange = (e: any) => {
      setIsMuted(e.detail.isMuted);
    };

    window.addEventListener('vogue-sound-change', handleSoundChange);
    return () => window.removeEventListener('vogue-sound-change', handleSoundChange);
  }, []);

  const handleToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full border border-vogue-gold/40 bg-vogue-dark/80 text-vogue-champagne hover:text-vogue-gold hover:border-vogue-gold transition-all duration-300 relative group flex items-center justify-center shadow-md shadow-vogue-gold/5"
      title={isMuted ? 'Enable Runway Audio' : 'Mute Runway Audio'}
      aria-label={isMuted ? 'Enable Runway Audio' : 'Mute Runway Audio'}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 text-vogue-champagne/60 group-hover:text-vogue-gold" />
      ) : (
        <Volume2 className="w-4 h-4 text-vogue-gold animate-pulse" />
      )}
      
      {/* Tooltip */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-vogue-black text-[9px] uppercase tracking-widest text-vogue-champagne opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-vogue-gold/30">
        {isMuted ? 'Sound Off' : 'Sound On'}
      </span>
    </button>
  );
};

export default SoundToggle;
