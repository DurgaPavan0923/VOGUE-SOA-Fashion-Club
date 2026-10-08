import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, AlertCircle, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { GoldButton } from '../common/GoldButton';
import { api } from '../../services/api';
import fireConfetti from '../../animations/ConfettiBurst';
import sound from '../../utils/audio';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  regNumber: z.string().min(4, 'Valid SOA registration number is required'),
  email: z.string().email('Please enter a valid student email'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  branchYear: z.string().min(2, 'Please enter Branch & Year (e.g. CSE - 2nd Year, ITER)'),
  category: z.enum(['RUNWAY_MODEL', 'STYLING', 'PR_BTS', 'DESIGN'], {
    errorMap: () => ({ message: 'Please select a role' }),
  }),
  heightFeet: z.string().optional(),
  instagramHandle: z.string().optional(),
  portfolioUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  auditionSlot: z.string().min(2, 'Please select an audition slot'),
});

type FormValues = z.infer<typeof formSchema>;

export const JoinForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeField, setShakeField] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: 'RUNWAY_MODEL',
      auditionSlot: 'Slot A: Saturday 2:00 PM - ITER Main Auditorium',
    },
  });

  const selectedCategory = watch('category');
  const values = watch();

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(['fullName', 'regNumber', 'email', 'phone']);
    } else if (step === 2) {
      isValid = await trigger(['branchYear', 'category', 'portfolioUrl']);
    }

    if (isValid) {
      sound.playSwoosh();
      setStep((prev) => prev + 1);
    } else {
      sound.playClick();
      setShakeField(true);
      setTimeout(() => setShakeField(false), 500);
    }
  };

  const handlePrevStep = () => {
    sound.playClick();
    setStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      await api.submitApplication(data);
      setSubmitted(true);
      fireConfetti({ particleCount: 100 });
      reset();
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error?.message ||
        'Unable to submit application. Please check your network or credentials.';
      setServerError(errorMsg);
      setShakeField(true);
      setTimeout(() => setShakeField(false), 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="join" className="py-24 bg-vogue-dark relative overflow-hidden">
      <div id="join-vogue" className="absolute -top-24" />
      {/* Background Subtle Jaali Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url(/motifs/jaali-pattern.svg)', backgroundRepeat: 'repeat' }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="The Spotlight Awaits"
          title="Are You Ready To Own The Runway?"
          subtitle="Whether you envision yourself striding under the spotlights, curating haute couture garments, or orchestrating runway rhythms — VOGUE is your platform."
        />

        <div className="bg-vogue-black/95 border border-vogue-gold/40 p-6 sm:p-10 rounded-sm shadow-2xl relative backdrop-blur-xl">
          {/* Subtle Filigree Corner Accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-vogue-gold" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-vogue-gold" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-vogue-gold" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-vogue-gold" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-5"
            >
              <div className="w-16 h-16 rounded-full border-2 border-vogue-gold bg-vogue-dark flex items-center justify-center mx-auto text-vogue-gold shadow-[0_0_25px_rgba(184,155,94,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-vogue-ivory">
                Application Received!
              </h3>
              <p className="text-sm text-vogue-champagne/90 font-sans max-w-md mx-auto leading-relaxed">
                Thank you for applying to VOGUE – SOA Fashion Club. Our team will review your submission and contact you via WhatsApp / Email with audition slot instructions.
              </p>
              <div className="pt-4">
                <GoldButton
                  onClick={() => {
                    sound.playClick();
                    setSubmitted(false);
                    setStep(1);
                  }}
                  variant="outline"
                >
                  Submit Another Application
                </GoldButton>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* 3-Step Stepper Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between max-w-md mx-auto relative mb-4">
                  {/* Background Progress Track */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-vogue-dark border border-vogue-gold/20 -z-0" />
                  
                  {/* Step 1 Circle */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono z-10 transition-all ${
                    step >= 1 ? 'bg-vogue-gold text-vogue-black shadow-md shadow-vogue-gold/20' : 'bg-vogue-dark text-vogue-champagne border border-vogue-gold/30'
                  }`}>
                    01
                  </div>

                  {/* Step 2 Circle */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono z-10 transition-all ${
                    step >= 2 ? 'bg-vogue-gold text-vogue-black shadow-md shadow-vogue-gold/20' : 'bg-vogue-dark text-vogue-champagne border border-vogue-gold/30'
                  }`}>
                    02
                  </div>

                  {/* Step 3 Circle */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono z-10 transition-all ${
                    step >= 3 ? 'bg-vogue-gold text-vogue-black shadow-md shadow-vogue-gold/20' : 'bg-vogue-dark text-vogue-champagne border border-vogue-gold/30'
                  }`}>
                    03
                  </div>
                </div>

                <div className="flex justify-between text-[10px] sm:text-xs uppercase tracking-widest text-vogue-champagne text-center">
                  <span className={step === 1 ? 'text-vogue-gold font-bold' : ''}>Personal Info</span>
                  <span className={step === 2 ? 'text-vogue-gold font-bold' : ''}>Role &amp; Background</span>
                  <span className={step === 3 ? 'text-vogue-gold font-bold' : ''}>Slot &amp; Submit</span>
                </div>
              </div>

              {serverError && (
                <div className="mb-6 p-4 rounded bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 1: Personal Details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`space-y-6 ${shakeField ? 'animate-shake' : ''}`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                          Full Name *
                        </label>
                        <input
                          {...register('fullName')}
                          type="text"
                          placeholder="e.g. Priya Samal"
                          className="w-full bg-vogue-dark border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50 transition-colors"
                        />
                        {errors.fullName && (
                          <span className="text-[11px] text-red-400 mt-1 block font-sans">
                            {errors.fullName.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                          SOA Registration Number *
                        </label>
                        <input
                          {...register('regNumber')}
                          type="text"
                          placeholder="e.g. 2341012345"
                          className="w-full bg-vogue-dark border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50 transition-colors"
                        />
                        {errors.regNumber && (
                          <span className="text-[11px] text-red-400 mt-1 block font-sans">
                            {errors.regNumber.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                          Student Email Address *
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="student@soa.ac.in"
                          className="w-full bg-vogue-dark border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50 transition-colors"
                        />
                        {errors.email && (
                          <span className="text-[11px] text-red-400 mt-1 block font-sans">
                            {errors.email.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                          WhatsApp / Phone Number *
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          placeholder="10-digit mobile number"
                          className="w-full bg-vogue-dark border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50 transition-colors"
                        />
                        {errors.phone && (
                          <span className="text-[11px] text-red-400 mt-1 block font-sans">
                            {errors.phone.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-vogue-gold text-vogue-black text-xs font-bold uppercase tracking-widest hover:bg-vogue-gold-light transition-all shadow-md shadow-vogue-gold/10"
                      >
                        <span>Continue to Role Selection</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Role & Background */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`space-y-6 ${shakeField ? 'animate-shake' : ''}`}
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                        Branch, Department &amp; Academic Year *
                      </label>
                      <input
                        {...register('branchYear')}
                        type="text"
                        placeholder="e.g. B.Tech CSE (ITER) - 2nd Year / BBA (IBCS) - 1st Year"
                        className="w-full bg-vogue-dark border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50"
                      />
                      {errors.branchYear && (
                        <span className="text-[11px] text-red-400 mt-1 block font-sans">
                          {errors.branchYear.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                        Role You are Auditioning For *
                      </label>
                      <select
                        {...register('category')}
                        className="w-full bg-vogue-dark border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans cursor-pointer"
                      >
                        <option value="RUNWAY_MODEL">Runway Model (Fashion Walk &amp; Ramp Staging)</option>
                        <option value="STYLING">Creative Stylist &amp; Makeup Artist</option>
                        <option value="PR_BTS">Media, Photography &amp; BTS Operations</option>
                        <option value="DESIGN">Apparel &amp; Fashion Illustrator</option>
                      </select>
                    </div>

                    {selectedCategory === 'RUNWAY_MODEL' && (
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                          Height (Optional / for Runway Category)
                        </label>
                        <input
                          {...register('heightFeet')}
                          type="text"
                          placeholder="e.g. 5'8&quot; or 173 cm"
                          className="w-full bg-vogue-dark border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                          Instagram Handle (Optional)
                        </label>
                        <input
                          {...register('instagramHandle')}
                          type="text"
                          placeholder="@yourhandle"
                          className="w-full bg-vogue-dark border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                          Portfolio / Drive Link (Optional)
                        </label>
                        <input
                          {...register('portfolioUrl')}
                          type="url"
                          placeholder="https://drive.google.com/..."
                          className="w-full bg-vogue-dark border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-2 px-5 py-3 border border-vogue-gold/30 text-vogue-champagne text-xs font-semibold uppercase tracking-widest hover:border-vogue-gold hover:text-vogue-gold transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-vogue-gold text-vogue-black text-xs font-bold uppercase tracking-widest hover:bg-vogue-gold-light transition-all shadow-md shadow-vogue-gold/10"
                      >
                        <span>Choose Slot</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Audition Slot & Confirmation */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`space-y-6 ${shakeField ? 'animate-shake' : ''}`}
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                        Select Audition Time Slot *
                      </label>
                      <select
                        {...register('auditionSlot')}
                        className="w-full bg-vogue-dark border border-vogue-gold/30 rounded-none px-4 py-3 text-base sm:text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans cursor-pointer"
                      >
                        <option value="Slot A: Saturday 2:00 PM - ITER Main Auditorium">
                          Slot A: Saturday 2:00 PM – ITER Main Auditorium
                        </option>
                        <option value="Slot B: Saturday 4:30 PM - ITER Main Auditorium">
                          Slot B: Saturday 4:30 PM – ITER Main Auditorium
                        </option>
                        <option value="Slot C: Sunday 11:00 AM - Campus 1 Studio">
                          Slot C: Sunday 11:00 AM – Campus 1 Creative Studio
                        </option>
                        <option value="Slot D: Sunday 3:00 PM - Campus 1 Studio">
                          Slot D: Sunday 3:00 PM – Campus 1 Creative Studio
                        </option>
                      </select>
                    </div>

                    {/* Summary Review Card */}
                    <div className="p-4 bg-vogue-dark/80 border border-vogue-gold/20 rounded-sm space-y-2 text-xs font-sans text-vogue-champagne/90">
                      <span className="text-[10px] uppercase tracking-widest text-vogue-gold font-bold block mb-1">
                        Application Overview
                      </span>
                      <div className="flex justify-between">
                        <span className="text-vogue-muted">Applicant:</span>
                        <span className="font-semibold">{values.fullName || '—'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-vogue-muted">Registration No:</span>
                        <span className="font-mono">{values.regNumber || '—'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-vogue-muted">Selected Role:</span>
                        <span className="font-semibold text-vogue-gold">{values.category}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-2 px-5 py-3 border border-vogue-gold/30 text-vogue-champagne text-xs font-semibold uppercase tracking-widest hover:border-vogue-gold hover:text-vogue-gold transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <GoldButton
                        type="submit"
                        variant="solid"
                        disabled={isSubmitting}
                        className="px-8 py-3.5 text-xs shadow-[0_0_20px_rgba(184,155,94,0.3)]"
                      >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? 'Transmitting Registration...' : 'Submit Audition Registration'}
                      </GoldButton>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
