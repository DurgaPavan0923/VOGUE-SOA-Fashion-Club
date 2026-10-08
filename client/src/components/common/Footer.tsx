import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Sparkles, ArrowUp, Phone, Shield } from 'lucide-react';
import sound from '../../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const campusInquiries = [
    {
      name: 'Samir Rout',
      campus: 'Campus 1 (ITER)',
      phone: '+91 78734 88182',
      href: 'tel:+917873488182',
    },
    {
      name: 'Pratichee Panigrahi',
      campus: 'Campus 1 (ITER)',
      phone: '+91 79084 03195',
      href: 'tel:+917908403195',
    },
    {
      name: 'Asmi Routray',
      campus: 'Campus 2 & 4',
      phone: '+91 93481 54798',
      href: 'tel:+919348154798',
    },
    {
      name: 'Ritika Das',
      campus: 'Campus 3 (IMS & SUM)',
      phone: '+91 70022 90609',
      href: 'tel:+917002290609',
    },
  ];

  return (
    <footer className="bg-vogue-black border-t border-vogue-gold/30 pt-20 pb-12 relative overflow-hidden text-vogue-ivory">
      {/* Background Jaali Watermark & Ambient Gold Halo */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: 'url(/motifs/jaali-pattern.svg)', backgroundRepeat: 'repeat' }}
      />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-t from-vogue-gold/15 via-vogue-plum/20 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Collab Banner */}
        <div className="mb-14 pb-10 border-b border-vogue-gold/20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-vogue-gold font-bold">
              BUILT IN COLLABORATION WITH
            </span>
            <div className="flex items-center gap-3">
              <div className="h-8 px-3 rounded-full bg-white/95 border border-vogue-gold/40 flex items-center justify-center shadow-lg">
                <img src="/images/gdgoc-iter-logo.png" alt="GDGoC ITER" className="h-5 w-auto object-contain" />
              </div>
              <span className="text-vogue-gold text-xs font-mono font-bold">×</span>
              <div className="h-8 px-3 rounded-full bg-vogue-dark border border-vogue-gold/60 flex items-center justify-center shadow-lg">
                <img src="/images/vogue-logo.png" alt="VOGUE" className="h-5 w-auto object-contain" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-vogue-champagne font-mono font-semibold">
            <span>Creativity</span>
            <span className="text-vogue-gold">•</span>
            <span>Confidence</span>
            <span className="text-vogue-gold">•</span>
            <span>Couture</span>
          </div>
        </div>

        {/* 4-Column Luxury Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-vogue-gold/20">
          
          {/* Column 1: Brand & Philosophy (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              {/* VOGUE Crest */}
              <div className="w-12 h-12 rounded-full border-2 border-vogue-gold p-0.5 flex items-center justify-center bg-vogue-black overflow-hidden shadow-xl shadow-vogue-gold/15 shrink-0">
                <img src="/images/vogue-logo.png" alt="VOGUE SOA Logo" className="w-full h-full object-cover rounded-full" />
              </div>

              {/* SOA University Seal */}
              <div className="w-12 h-12 rounded-full border border-vogue-gold/60 p-0.5 flex items-center justify-center bg-white overflow-hidden shadow-xl shrink-0">
                <img src="/images/soa-university-logo.png" alt="SOA University Seal" className="w-full h-full object-contain" />
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-vogue-ivory">
                  VOGUE
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-vogue-gold font-sans font-semibold">
                  SOA Fashion Club
                </span>
              </div>
            </div>

            <p className="font-script text-3xl text-vogue-gold text-glow-gold">
              More Than Fashion. A Movement.
            </p>

            <p className="text-xs sm:text-sm text-vogue-champagne/85 leading-relaxed font-sans max-w-sm">
              The premier collegiate fashion and runway society of Siksha &apos;O&apos; Anusandhan University. Elevating contemporary couture, theatrical runway walks, and empowering self-expression since inception.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/VOGUE_SOA_FASHION_CLUB"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="w-10 h-10 rounded-full border border-vogue-gold/50 flex items-center justify-center text-vogue-champagne hover:text-vogue-gold hover:border-vogue-gold hover:scale-110 transition-all shadow-md shadow-vogue-gold/10"
                aria-label="Instagram Handle VOGUE_SOA_FASHION_CLUB"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:vogue@soa.ac.in"
                onClick={() => sound.playClick()}
                className="w-10 h-10 rounded-full border border-vogue-gold/50 flex items-center justify-center text-vogue-champagne hover:text-vogue-gold hover:border-vogue-gold hover:scale-110 transition-all shadow-md shadow-vogue-gold/10"
                aria-label="Email Vogue SOA"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-vogue-gold font-sans border-b border-vogue-gold/20 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-vogue-champagne/90">
              <li>
                <a href="/#experience" onClick={() => sound.playClick()} className="hover:text-vogue-gold transition-colors block py-0.5">
                  Showcase
                </a>
              </li>
              <li>
                <a href="/#about" onClick={() => sound.playClick()} className="hover:text-vogue-gold transition-colors block py-0.5">
                  About Movement
                </a>
              </li>
              <li>
                <a href="/#members" onClick={() => sound.playClick()} className="hover:text-vogue-gold transition-colors block py-0.5">
                  Members &amp; Family
                </a>
              </li>
              <li>
                <a href="/#achievements" onClick={() => sound.playClick()} className="hover:text-vogue-gold transition-colors block py-0.5">
                  Achievements
                </a>
              </li>
              <li>
                <a href="/#achieve-moments" onClick={() => sound.playClick()} className="hover:text-vogue-gold transition-colors block py-0.5">
                  Archival Moments
                </a>
              </li>
              <li>
                <a href="/#faculty" onClick={() => sound.playClick()} className="hover:text-vogue-gold transition-colors block py-0.5">
                  Faculty Coordinator
                </a>
              </li>
              <li>
                <a href="/#events" onClick={() => sound.playClick()} className="hover:text-vogue-gold transition-colors block py-0.5">
                  Events &amp; Notices
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Campus Inquiries (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-vogue-gold font-sans border-b border-vogue-gold/20 pb-2">
              Campus Inquiries
            </h4>
            <div className="space-y-3">
              {campusInquiries.map((inq) => (
                <a
                  key={inq.name}
                  href={inq.href}
                  onClick={() => sound.playClick()}
                  className="block p-2.5 rounded-sm bg-vogue-dark/80 border border-vogue-gold/25 hover:border-vogue-gold transition-all group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-vogue-ivory group-hover:text-vogue-gold transition-colors">
                      {inq.name}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-vogue-gold/80">
                      {inq.campus}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-vogue-champagne/85 font-mono mt-1">
                    <Phone className="w-3 h-3 text-vogue-gold shrink-0" />
                    <span>{inq.phone}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Connect & Sanctuary (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-vogue-gold font-sans border-b border-vogue-gold/20 pb-2">
              Connect &amp; Sanctuary
            </h4>
            
            <div className="space-y-3 text-xs text-vogue-champagne/85 font-sans leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-vogue-gold shrink-0 mt-0.5" />
                <span>
                  Siksha &apos;O&apos; Anusandhan (Deemed to be University), Khandagiri Square, Bhubaneswar, Odisha, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-vogue-gold shrink-0" />
                <a href="mailto:vogue@soa.ac.in" className="hover:text-vogue-gold underline transition-colors">
                  vogue@soa.ac.in
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-vogue-gold shrink-0" />
                <a
                  href="https://instagram.com/VOGUE_SOA_FASHION_CLUB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-vogue-gold underline transition-colors"
                >
                  @vogue_soa (Official Instagram)
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/apply"
                onClick={() => sound.playClick()}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-vogue-gold text-vogue-black hover:bg-vogue-gold-light transition-all text-xs font-bold tracking-widest uppercase shadow-lg shadow-vogue-gold/20 rounded-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Audition / Join VOGUE</span>
              </Link>
            </div>

            <div className="pt-2">
              <Link
                to="/admin"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-1.5 text-xs text-vogue-muted hover:text-vogue-gold uppercase tracking-widest font-semibold transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Staff Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Mandatory GDGoC ITER Credit with Shimmer + Back to Summit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs font-sans text-vogue-muted">
          <div className="text-center sm:text-left text-vogue-champagne/70">
            <span>© 2026 Team VOGUE — SOA Fashion Club. All rights reserved.</span>
          </div>

          {/* Persistent Credit Badge with Shimmer & Official GDG ITER Chapter Logo */}
          <div className="relative group flex items-center gap-3 px-6 py-2.5 rounded-full border border-vogue-gold/40 bg-vogue-dark/95 shadow-2xl shadow-black/90 overflow-hidden">
            {/* Shimmer Light Sweep Overlay */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut', repeatDelay: 1.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-vogue-gold/25 to-transparent skew-x-12 pointer-events-none"
            />

            <div className="w-6 h-6 rounded-full overflow-hidden bg-white p-0.5 flex items-center justify-center shrink-0 border border-vogue-gold/30">
              <img src="/images/gdgoc-iter-logo.png" alt="Google Developer Group @SOA, ITER Chapter" className="w-full h-full object-contain" />
            </div>
            <span className="text-vogue-champagne text-xs font-medium tracking-wide">
              Website crafted by <strong className="text-vogue-gold font-bold">GDGoC ITER</strong>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-vogue-champagne/80 hover:text-vogue-gold transition-all duration-300 text-xs uppercase tracking-widest group cursor-pointer"
          >
            <span>Back to Summit</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
