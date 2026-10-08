import React from 'react';
import { Link } from 'react-router-dom';

interface GoldButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'plum';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  children,
  to,
  href,
  onClick,
  variant = 'solid',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden group select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    solid:
      'bg-vogue-gold text-vogue-black hover:bg-vogue-gold-light hover:shadow-lg hover:shadow-vogue-gold/20 border border-vogue-gold',
    outline:
      'bg-transparent text-vogue-champagne hover:text-vogue-black hover:bg-vogue-gold border border-vogue-gold/70',
    plum:
      'bg-vogue-plum text-vogue-ivory hover:bg-vogue-plum-dark border border-vogue-gold/40 hover:border-vogue-gold',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedStyles}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedStyles}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
