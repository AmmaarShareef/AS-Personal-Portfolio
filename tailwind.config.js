/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        head: ['Oswald', 'sans-serif'],
        hud: ['Rajdhani', 'Oswald', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#06070a',
          900: '#0a0c12',
          800: '#0f1218',
          700: '#161a23',
          600: '#1f2532',
          500: '#2a3142',
        },
        gold: {
          50: '#fff7d6',
          100: '#fdecae',
          200: '#fadf7c',
          300: '#f5d061',
          400: '#e7b73d',
          500: '#c69423',
          600: '#8e6916',
        },
        cyan2: {
          300: '#7df3ff',
          400: '#5ee9ff',
          500: '#22d3ee',
        },
        rose2: {
          400: '#ff4d6d',
          500: '#e4324f',
        },
      },
      boxShadow: {
        'glow-gold': '0 0 30px rgba(245, 208, 97, 0.35), 0 0 80px rgba(245, 208, 97, 0.15)',
        'glow-gold-lg': '0 0 60px rgba(245, 208, 97, 0.45), 0 0 140px rgba(245, 208, 97, 0.2)',
        'glow-cyan': '0 0 30px rgba(94, 233, 255, 0.35), 0 0 80px rgba(94, 233, 255, 0.15)',
        'inset-hud': 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'fut-gold': 'linear-gradient(155deg,#fff3b8 0%, #f5d061 22%, #c69423 55%, #f5d061 80%, #fff3b8 100%)',
        'fut-icon': 'linear-gradient(155deg,#dff7ff 0%, #5ee9ff 25%, #1d6f8a 55%, #5ee9ff 80%, #dff7ff 100%)',
        'pitch-grad': 'radial-gradient(ellipse at 50% 0%, rgba(245,208,97,0.10), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(94,233,255,0.06), transparent 60%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(120%)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: 0.45 },
          '50%': { opacity: 0.85 },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        slideUp: 'slideUp 0.7s ease-out both',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        scan: 'scan 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
      letterSpacing: {
        widestPlus: '0.32em',
      },
    },
  },
  plugins: [],
}
