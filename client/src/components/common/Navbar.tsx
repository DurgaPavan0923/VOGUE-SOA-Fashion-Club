import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, Shield, Instagram, Sparkles } from 'lucide-react';
import { SoundToggle } from './SoundToggle';
import sound from '../../utils/audio';

interface NavbarProps {
  onOpenNoticeBoard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNoticeBoard }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'EXPERIENCE', href: '/#experience' },
    { label: 'ABOUT', href: '/#about' },
    { label: 'ACHIEVEMENTS', href: '/#achievements' },
    { label: 'MOMENTS', href: '/#achieve-moments' },
    { label: 'MEMBERS', href: '/#members' },
    { label: 'FACULTY', href: '/#faculty' },
    { label: 'EVENTS', href: '/#events' },
  ];

  const handleLinkClick = () => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  const handleNoticeClick = () => {
    sound.playClick();
    if (onOpenNoticeBoard) {
      onOpenNoticeBoard();
    } else {
      const event = new CustomEvent('open-notice-board');
      window.dispatchEvent(event);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b border-vogue-gold/20 py-2.5 sm:py-3 shadow-2xl shadow-black/90'
          : 'bg-gradient-to-b from-[#080808]/95 via-[#080808]/60 to-transparent py-3 sm:py-4 md:py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between">
        
        {/* Brand Lockup (VOGUE + SOA Logos with proper right margin) */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="group flex items-center shrink-0 mr-4 sm:mr-6 lg:mr-8 xl:mr-10"
        >
          <img
            src="/images/vogue-logo.png"
            alt="VOGUE"
            className="h-7 sm:h-8 md:h-9 w-auto object-contain shrink-0 group-hover:opacity-90 transition-opacity"
          />
          <div className="mx-2 sm:mx-2.5 h-5 sm:h-6 w-[1px] bg-white/25 shrink-0" />
          <img
            src="/images/soa-logo.png"
            alt="SOA University"
            className="h-6 sm:h-7 md:h-8 w-auto object-contain shrink-0 group-hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop Nav Links with optimal responsive spacing */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8 shrink min-w-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sound.playClick()}
              className="text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.16em] xl:tracking-[0.2em] text-white/80 hover:text-vogue-gold transition-colors font-medium relative group py-1 whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-vogue-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions: Notice Board, Join, Sound, Instagram, Admin */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 ml-3 lg:ml-6">
          
          {/* Notice Board Golden Bell Button */}
          <button
            onClick={handleNoticeClick}
            className="relative px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-vogue-gold text-vogue-black hover:bg-vogue-gold-light hover:shadow-[0_0_18px_rgba(184,155,94,0.5)] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            aria-label="Open Notice Board"
          >
            <Bell className="w-3.5 h-3.5 animate-pulse text-vogue-black" />
            <span className="hidden sm:inline whitespace-nowrap">NOTICE BOARD</span>
            <span className="sm:hidden whitespace-nowrap">NOTICES</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-vogue-black animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-vogue-black" />
          </button>

          {/* JOIN CTA (Desktop) */}
          <Link
            to="/apply"
            onClick={() => sound.playClick()}
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-vogue-gold/60 text-vogue-gold hover:bg-vogue-gold hover:text-vogue-black text-[10px] xl:text-[11px] font-bold uppercase tracking-wider transition-all rounded-xs shrink-0"
          >
            <Sparkles className="w-3 h-3" />
            <span>JOIN</span>
          </Link>

          <div className="hidden md:flex items-center gap-1.5 shrink-0">
            <SoundToggle />

            <a
              href="https://instagram.com/VOGUE_SOA_FASHION_CLUB"
              target="_blank"
              rel="noopener noreferrer"
              title="VOGUE SOA Instagram"
              onClick={() => sound.playClick()}
              className="p-1.5 text-vogue-champagne/70 hover:text-vogue-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>

            <Link
              to="/admin"
              title="Club Admin Portal"
              onClick={() => sound.playClick()}
              className="p-1.5 text-vogue-champagne/60 hover:text-vogue-gold transition-colors"
              aria-label="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="flex items-center gap-1 lg:hidden">
            <div className="sm:hidden">
              <SoundToggle />
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-white hover:text-vogue-gold focus:outline-none rounded-sm border border-white/10 bg-vogue-dark/80"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="lg:hidden bg-[#080808]/98 backdrop-blur-xl border-b border-vogue-gold/30 px-6 py-6 space-y-4 overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-xs uppercase tracking-widest text-vogue-champagne hover:text-vogue-gold py-2.5 border-b border-white/5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-vogue-gold font-mono">→</span>
                </a>
              ))}
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNoticeClick();
                }}
                className="w-full text-center py-3 bg-vogue-gold text-vogue-black text-xs font-bold uppercase tracking-widest hover:bg-vogue-gold-light transition-colors flex items-center justify-center gap-2"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>OPEN NOTICE BOARD</span>
              </button>

              <Link
                to="/apply"
                onClick={handleLinkClick}
                className="w-full text-center py-3 border border-vogue-gold text-vogue-gold text-xs font-bold uppercase tracking-widest hover:bg-vogue-gold hover:text-vogue-black transition-colors"
              >
                JOIN VOGUE (Auditions)
              </Link>

              <div className="flex items-center justify-between pt-2">
                <a
                  href="https://instagram.com/VOGUE_SOA_FASHION_CLUB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-vogue-champagne hover:text-vogue-gold flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@VOGUE_SOA_FASHION_CLUB</span>
                </a>
                <Link
                  to="/admin"
                  onClick={handleLinkClick}
                  className="text-xs text-vogue-muted hover:text-vogue-gold"
                >
                  Admin Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
