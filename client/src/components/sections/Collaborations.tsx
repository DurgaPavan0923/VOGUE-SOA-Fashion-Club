import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Handshake, Building2, Sparkles, Send, CheckCircle2, Mail, Phone } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { GoldButton } from '../common/GoldButton';
import sound from '../../utils/audio';

export const Collaborations: React.FC = () => {
  const [partnerType, setPartnerType] = useState('BRAND');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    contactPerson: '',
    email: '',
    proposal: '',
  });

  const partnerCategories = [
    { id: 'BRAND', label: 'Fashion & Apparel Brands', desc: 'Sponsorship segments, capsule apparel showcases, and lifestyle brand ambassadorship.' },
    { id: 'COLLEGE', label: 'Colleges & Universities', desc: 'Inter-collegiate runway fest invites, guest jury exchanges, and fashion society tie-ups.' },
    { id: 'CREATOR', label: 'Photographers & Designers', desc: 'Editorial magazine collaborations, masterclasses, and creative styling shoots.' },
    { id: 'COMMUNITY', label: 'Cultural Organizations', desc: 'State handloom showcases, sustainable fashion initiatives, and heritage showcases.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    setIsSubmitted(true);
  };

  return (
    <section id="collaborations" className="py-24 sm:py-32 bg-vogue-black relative overflow-hidden border-t border-vogue-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="Industry Partnerships &amp; Alliances"
          title="Collaborate With VOGUE"
          subtitle="Partner with Eastern India's premier collegiate fashion society. Open for brand sponsorships, runway invites, editorial productions, and designer showcases."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mt-12 max-w-6xl mx-auto">
          
          {/* Left Column: Partnership Categories */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-vogue-gold font-mono font-bold block">
              Who We Collaborate With:
            </span>

            {partnerCategories.map((cat) => {
              const isSelected = partnerType === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setPartnerType(cat.id);
                  }}
                  className={`p-5 rounded-sm border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-vogue-gold bg-vogue-dark/95 shadow-xl shadow-vogue-gold/10'
                      : 'border-vogue-gold/20 bg-vogue-dark/40 hover:border-vogue-gold/60'
                  }`}
                >
                  <h4 className="font-serif text-lg font-bold text-vogue-ivory">
                    {cat.label}
                  </h4>
                  <p className="mt-1 text-xs text-vogue-champagne/75 font-sans leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              );
            })}

            {/* Ecosystem Partners Card */}
            <div className="p-5 rounded-sm border border-vogue-gold/30 bg-vogue-dark/80 space-y-3 mt-6">
              <span className="text-[10px] uppercase tracking-widest text-vogue-gold font-bold block">
                Technical &amp; Academic Ecosystem
              </span>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2.5 p-2 rounded bg-vogue-black/70 border border-vogue-gold/20">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-white p-0.5 shrink-0 border border-vogue-gold/30">
                    <img src="/images/gdgoc-iter-logo.png" alt="GDGoC ITER" className="w-full h-full object-contain" />
                  </div>
                  <div className="leading-tight">
                    <span className="text-[10px] font-bold text-vogue-ivory block font-sans">GDGoC ITER</span>
                    <span className="text-[8px] text-vogue-gold uppercase tracking-wider block font-mono">Tech Partner</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded bg-vogue-black/70 border border-vogue-gold/20">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-white p-0.5 shrink-0 border border-vogue-gold/30">
                    <img src="/images/soa-university-logo.png" alt="SOA University" className="w-full h-full object-contain" />
                  </div>
                  <div className="leading-tight">
                    <span className="text-[10px] font-bold text-vogue-ivory block font-sans">SOA University</span>
                    <span className="text-[8px] text-vogue-gold uppercase tracking-wider block font-mono">Institution</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect Card */}
            <div className="p-5 rounded-sm border border-vogue-gold/30 bg-vogue-dark/80 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-vogue-gold font-bold block">
                Direct Partnership Inquiry
              </span>
              <div className="text-xs text-vogue-champagne/90 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-vogue-gold" />
                <span>vogue@soa.ac.in</span>
              </div>
              <div className="text-xs text-vogue-champagne/90 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-vogue-gold" />
                <span>ITER SOA University Campus, Bhubaneswar</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Collaboration Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-sm border border-vogue-gold/40 bg-vogue-dark/90 shadow-2xl relative h-full flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="my-auto text-center space-y-4 py-12"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-vogue-gold/20 border border-vogue-gold flex items-center justify-center text-vogue-gold">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-vogue-ivory uppercase">
                      Proposal Received
                    </h3>
                    <p className="text-xs sm:text-sm text-vogue-champagne/80 font-sans max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out to VOGUE – SOA Fashion Club. Our creative director and faculty coordinator will review your proposal and respond promptly.
                    </p>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsSubmitted(false);
                      }}
                      className="px-5 py-2 border border-vogue-gold text-xs font-bold uppercase tracking-widest text-vogue-gold hover:bg-vogue-gold hover:text-vogue-black transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-vogue-gold font-bold">
                        Proposal Submission
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-vogue-ivory uppercase">
                        Initiate A Partnership
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-widest text-vogue-champagne font-bold block">
                          Organization / Label Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.orgName}
                          onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                          placeholder="e.g. Zara, KIIT University, Vogue India"
                          className="w-full px-4 py-2.5 bg-vogue-black border border-vogue-gold/30 text-vogue-ivory text-xs focus:border-vogue-gold focus:outline-none rounded-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-widest text-vogue-champagne font-bold block">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                          placeholder="Full Name"
                          className="w-full px-4 py-2.5 bg-vogue-black border border-vogue-gold/30 text-vogue-ivory text-xs focus:border-vogue-gold focus:outline-none rounded-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-widest text-vogue-champagne font-bold block">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@brand.com"
                        className="w-full px-4 py-2.5 bg-vogue-black border border-vogue-gold/30 text-vogue-ivory text-xs focus:border-vogue-gold focus:outline-none rounded-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-widest text-vogue-champagne font-bold block">
                        Collaboration Proposal Summary *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.proposal}
                        onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                        placeholder="Describe the opportunity, event date, venue, or sponsorship deliverables..."
                        className="w-full px-4 py-2.5 bg-vogue-black border border-vogue-gold/30 text-vogue-ivory text-xs focus:border-vogue-gold focus:outline-none rounded-sm resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <GoldButton type="submit" variant="solid" className="w-full">
                        <Send className="w-3.5 h-3.5" />
                        Submit Collaboration Proposal
                      </GoldButton>
                    </div>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Collaborations;
