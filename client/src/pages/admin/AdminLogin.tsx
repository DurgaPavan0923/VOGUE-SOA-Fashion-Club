import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, User, Sparkles, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { GoldButton } from '../../components/common/GoldButton';

const loginSchema = z.object({
  username: z.string().min(3, 'Please enter your username or email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginValues = z.infer<typeof loginSchema>;

export const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginValues) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await api.login(data);
      login(response.token, response.user);
      navigate('/admin/dashboard');
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        'Authentication failed. Please verify your credentials.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setValue('username', 'vogue_admin');
    setValue('password', 'VogueSOA@2026!Master');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-vogue-black px-4 py-12 relative overflow-hidden">
      {/* Background Jaali Watermark */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'url(/motifs/jaali-pattern.svg)', backgroundRepeat: 'repeat' }}
      />

      <div className="max-w-md w-full relative z-10">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-vogue-champagne/80 hover:text-vogue-gold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-vogue-dark/95 border border-vogue-gold/40 p-8 sm:p-10 rounded-sm shadow-2xl relative">
          {/* Filigree Borders */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-vogue-gold" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-vogue-gold" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-vogue-gold" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-vogue-gold" />

          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full border border-vogue-gold p-0.5 flex items-center justify-center mx-auto mb-3 bg-vogue-black overflow-hidden shadow-xl shadow-vogue-gold/10">
              <img src="/images/vogue-logo.png" alt="VOGUE" className="w-full h-full object-cover rounded-full" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-vogue-ivory uppercase">
              Admin Portal
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-vogue-gold font-sans font-semibold mt-1">
              VOGUE SOA Executive Management
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 rounded bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-vogue-gold/60">
                  <User className="w-4 h-4" />
                </div>
                <input
                  {...register('username')}
                  type="text"
                  placeholder="vogue_admin"
                  className="w-full bg-vogue-black border border-vogue-gold/30 rounded-none pl-10 pr-4 py-3 text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50"
                />
              </div>
              {errors.username && (
                <span className="text-[11px] text-red-400 mt-1 block font-sans">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-vogue-champagne font-semibold mb-2">
                Secret Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-vogue-gold/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-vogue-black border border-vogue-gold/30 rounded-none pl-10 pr-4 py-3 text-sm text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans placeholder-vogue-muted/50"
                />
              </div>
              {errors.password && (
                <span className="text-[11px] text-red-400 mt-1 block font-sans">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="pt-2">
              <GoldButton
                type="submit"
                variant="solid"
                disabled={isSubmitting}
                className="w-full py-3.5 text-xs font-bold"
              >
                <Lock className="w-3.5 h-3.5" />
                {isSubmitting ? 'Authenticating...' : 'Sign In to Executive Console'}
              </GoldButton>
            </div>
          </form>

          {/* Quick Demo Autofill Notice */}
          <div className="mt-8 pt-6 border-t border-vogue-gold/15 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 text-xs text-vogue-champagne hover:text-vogue-gold transition-colors font-mono"
            >
              <KeyRound className="w-3.5 h-3.5 text-vogue-gold" />
              <span>Autofill Default Admin Credentials</span>
            </button>
            <p className="text-[10px] text-vogue-muted mt-1">
              Default: <code className="text-vogue-champagne">vogue_admin</code> / <code className="text-vogue-champagne">VogueSOA@2026!Master</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
