/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vogue: {
          black: '#0C0A0B',
          dark: '#171415',
          card: '#1C181A',
          gold: '#B89B5E',
          'gold-light': '#D4AF37',
          'gold-hover': '#9E824A',
          plum: '#561C47',
          'plum-dark': '#380E2E',
          espresso: '#5A4738',
          champagne: '#EADBC4',
          cream: '#F3E8D6',
          ivory: '#FDFBF7',
          muted: '#A3988E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'shake': 'shake 0.4s ease-in-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #B89B5E 50%, #9E824A 100%)',
        'plum-gradient': 'linear-gradient(135deg, #561C47 0%, #171415 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0C0A0B 0%, #171415 100%)',
      }
    },
  },
  plugins: [],
}
