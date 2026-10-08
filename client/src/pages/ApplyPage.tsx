import React from 'react';
import { JoinForm } from '../components/sections/JoinForm';
import { WhyJoin } from '../components/sections/WhyJoin';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ApplyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-vogue-black text-vogue-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-vogue-champagne/80 hover:text-vogue-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Runway Overview</span>
        </Link>
      </div>

      <JoinForm />
      <WhyJoin />
    </div>
  );
};
