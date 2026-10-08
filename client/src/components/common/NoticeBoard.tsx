import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Sparkles, ExternalLink, Calendar, Megaphone, ArrowRight, ShieldCheck } from 'lucide-react';
import sound from '../../utils/audio';

interface NoticeItem {
  id: string;
  title: string;
  category: 'AUDITIONS' | 'TECH_COLLAB' | 'CHAMPIONSHIP' | 'CAMPUS_UPDATE';
  date: string;
  badge: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
  isExternal?: boolean;
}

interface NoticeBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ isOpen, onClose }) => {
  const notices: NoticeItem[] = [
    {
      id: 'n1',
      title: 'Auditions 2026 Registration Form Released',
      category: 'AUDITIONS',
      date: '2026-10-02',
      badge: 'URGENT',
      description:
        'Official auditions for Team VOGUE runway model lineup, bespoke fashion styling, and choreography wings are currently active across all SOA University campuses (ITER, SNC, IDS, SNIL). Submit your profile today.',
      actionLabel: 'View Details →',
      actionUrl: '/apply',
    },
    {
      id: 'n2',
      title: 'GDGoC ITER x VOGUE Digital Platform Launch',
      category: 'TECH_COLLAB',
      date: 'Official Release',
      badge: 'COLLAB',
      description:
        'The cinematic luxury web platform of VOGUE — SOA Fashion Club has been designed and engineered in collaboration with Google Developer Groups On Campus (GDGoC ITER).',
      actionLabel: 'Explore GDGoC ITER',
      actionUrl: 'https://gdg.community.dev',
      isExternal: true,
    },
    {
      id: 'n3',
      title: 'National Championship Fest Tour Schedule',
      category: 'CHAMPIONSHIP',
      date: 'Season 2025–2026',
      badge: 'CIRCUIT',
      description:
        'Lineup synchronization and rehearsals for inter-university competitions at BGU Spectra, AIIMS Bhubaneswar Chiasma, and KIIT IDA have officially commenced.',
      actionLabel: 'View Verified Timeline',
      actionUrl: '/#achievements',
    },
    {
      id: 'n4',
      title: 'Multi-Campus Rehearsal & Workshop Schedule',
      category: 'CAMPUS_UPDATE',
      date: 'Weekly Clinics',
      badge: 'ACADEMY',
      description:
        'Masterclasses in posture mechanics, HD styling, and sync walks are conducted weekly under the mentorship of faculty coordinator Dr. Mitali Madhusmita Nayak.',
      actionLabel: 'Explore Curriculum',
      actionUrl: '/#experience',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-vogue-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.94, y: 25, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 25, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full max-h-[88vh] overflow-y-auto bg-vogue-dark border border-vogue-gold/60 p-6 sm:p-8 rounded-sm shadow-2xl relative scrollbar-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-vogue-gold/25 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-vogue-gold/15 border border-vogue-gold/50 flex items-center justify-center text-vogue-gold">
                  <Bell className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wide text-vogue-ivory">
                    Official Notice Board
                  </h3>
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-vogue-gold font-semibold">
                    VOGUE • SOA University Bulletins
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="p-2 rounded-full border border-vogue-gold/30 text-vogue-champagne hover:text-vogue-gold hover:border-vogue-gold transition-colors"
                aria-label="Close notice board"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="p-5 rounded-sm border border-vogue-gold/25 bg-vogue-black/85 hover:border-vogue-gold/70 transition-all space-y-2.5 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[9px] uppercase font-bold font-mono tracking-widest bg-vogue-gold/15 text-vogue-gold border border-vogue-gold/30">
                      {n.badge}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-vogue-muted">
                      {n.date}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-vogue-ivory group-hover:text-vogue-gold transition-colors">
                    {n.title}
                  </h4>

                  <p className="text-xs text-vogue-champagne/80 font-sans leading-relaxed">
                    {n.description}
                  </p>

                  {n.actionLabel && (
                    <div className="pt-2">
                      <a
                        href={n.actionUrl}
                        target={n.isExternal ? '_blank' : undefined}
                        rel={n.isExternal ? 'noopener noreferrer' : undefined}
                        onClick={() => {
                          sound.playClick();
                          if (!n.isExternal) onClose();
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-vogue-gold hover:text-vogue-gold-light transition-colors"
                      >
                        <span>{n.actionLabel}</span>
                        {n.isExternal ? (
                          <ExternalLink className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer Sign-off */}
            <div className="mt-6 pt-4 border-t border-vogue-gold/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-vogue-muted font-mono">
              <span className="flex items-center gap-1 text-vogue-champagne/70">
                <ShieldCheck className="w-3.5 h-3.5 text-vogue-gold" />
                <span>Verified by Directorate of Student Affairs, SOA</span>
              </span>
              <span>Website crafted by GDGoC ITER</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoticeBoard;
