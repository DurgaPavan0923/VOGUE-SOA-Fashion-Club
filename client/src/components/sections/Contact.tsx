import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Instagram, CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { GoldButton } from '../common/GoldButton';
import { api } from '../../services/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  queryType: z.enum(['GENERAL', 'SPONSORSHIP', 'INVITATION']),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      queryType: 'GENERAL',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      await api.submitContact(data);
      setSubmitted(true);
      reset();
    } catch (err: any) {
      const msg = err.response?.data?.error?.message || 'Error transmitting message. Please try again.';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-vogue-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="Get in Touch"
          title="Contact &amp; Collaborations"
          subtitle="Interested in brand sponsorships, runway invitations, or joining as an affiliate? Connect with our executive coordinators."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-8 bg-vogue-dark/80 p-8 border border-vogue-gold/30 rounded-sm">
            <div>
              <span className="font-script text-3xl text-vogue-gold block mb-1">Official Society</span>
              <h3 className="font-serif text-2xl font-bold text-vogue-ivory">
                VOGUE – SOA Fashion Club
              </h3>
              <p className="text-xs text-vogue-champagne/80 font-sans mt-2 leading-relaxed">
                Siksha 'O' Anusandhan (Deemed to be University), Bhubaneswar, Odisha.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-vogue-gold/15 text-xs sm:text-sm font-sans">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-vogue-gold/40 flex items-center justify-center bg-vogue-black text-vogue-gold shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-vogue-champagne font-bold">
                    Campus Address
                  </h4>
                  <p className="text-vogue-muted mt-1 leading-relaxed">
                    ITER SOA Campus, Jagamohan Nagar, Khandagiri, Bhubaneswar, Odisha 751030
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-vogue-gold/40 flex items-center justify-center bg-vogue-black text-vogue-gold shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-vogue-champagne font-bold">
                    Official Instagram
                  </h4>
                  <a
                    href="https://instagram.com/VOGUE_SOA_FASHION_CLUB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vogue-gold hover:underline mt-1 block font-semibold"
                  >
                    @VOGUE_SOA_FASHION_CLUB
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-vogue-gold/40 flex items-center justify-center bg-vogue-black text-vogue-gold shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-vogue-champagne font-bold">
                    Email Desk
                  </h4>
                  <a href="mailto:vogue@soa.ac.in" className="text-vogue-gold hover:underline mt-1 block font-semibold">
                    vogue@soa.ac.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-vogue-dark/80 p-8 sm:p-10 border border-vogue-gold/30 rounded-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full border border-vogue-gold bg-vogue-black flex items-center justify-center mx-auto text-vogue-gold">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-vogue-ivory">
                  Message Transmitted!
                </h3>
                <p className="text-sm text-vogue-champagne/80 font-sans max-w-md mx-auto">
                  Thank you for contacting VOGUE SOA. Our public relations and coordinator team will respond promptly.
                </p>
                <div className="pt-4">
                  <GoldButton onClick={() => setSubmitted(false)} variant="outline">
                    Send Another Message
                  </GoldButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {serverError && (
                  <div className="p-4 rounded bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                      Your Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="e.g. Rohan Das"
                      className="w-full bg-vogue-black border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50"
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-400 mt-1 block font-sans">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="rohan@example.com"
                      className="w-full bg-vogue-black border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400 mt-1 block font-sans">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    {...register('queryType')}
                    className="w-full bg-vogue-black border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans cursor-pointer"
                  >
                    <option value="GENERAL">General Information &amp; Audition Inquiry</option>
                    <option value="SPONSORSHIP">Brand Collaboration &amp; Sponsorship</option>
                    <option value="INVITATION">Inter-Collegiate Fest / Runway Invitation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                    Subject (Optional)
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    placeholder="e.g. Invitation for Spring Fest Runway Showcase 2026"
                    className="w-full bg-vogue-black border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                    Message Details *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Please specify your query or proposal details..."
                    className="w-full bg-vogue-black border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50 resize-none"
                  />
                  {errors.message && (
                    <span className="text-[11px] text-red-400 mt-1 block font-sans">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <div className="pt-2">
                  <GoldButton
                    type="submit"
                    variant="solid"
                    disabled={isSubmitting}
                    className="w-full py-4 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Transmitting...' : 'Send Inquiry to Vogue SOA'}
                  </GoldButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
