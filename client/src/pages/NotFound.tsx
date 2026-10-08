import React from 'react';
import { Link } from 'react-router-dom';
import { GoldButton } from '../components/common/GoldButton';
import { Sparkles, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-vogue-black text-center px-4 pt-20">
      <div className="max-w-md space-y-6">
        <span className="font-script text-4xl text-vogue-gold block">Page Not Found</span>
        <h1 className="font-serif text-8xl font-bold text-vogue-ivory">404</h1>
        <p className="text-sm text-vogue-champagne/80 font-sans leading-relaxed">
          The runway look you are searching for is currently off-stage or does not exist.
        </p>
        <div className="pt-4">
          <GoldButton to="/" variant="solid">
            <Home className="w-4 h-4" />
            Return to Front Row
          </GoldButton>
        </div>
      </div>
    </div>
  );
};
