/** @type {import('tailwindcss').Config} */
import primeui from 'tailwindcss-primeui'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* --- Vraj Interior palette: deep emerald + porcelain + brushed gold --- */
        ink: {
          DEFAULT: '#0A2E27',
          950: '#04170F',
          900: '#06231E',
          800: '#0A2E27',
          700: '#0F4A3E',
        },
        emerald: {
          DEFAULT: '#0F4A3E',
          light: '#1B5645',
          mid: '#2F6B57',
          pale: '#BBD2C6',
        },
        forest: {
          50: '#EEF5F1',
          100: '#DCE8E1',
          200: '#BBD2C6',
          300: '#8FB3A2',
          400: '#5C8B78',
          500: '#2F6B57',
          600: '#1B5645',
          700: '#0F4A3E',
          800: '#0A2E27',
          900: '#06231E',
        },
        gold: {
          DEFAULT: '#C3A15A',
          light: '#E0C88C',
          deep: '#9A7B36',
        },
        porcelain: '#F7F8F5',
        mist: '#EDF1EC',
        sage: '#DBE4DD',
        graphite: '#15201D',
        stone: '#6B7A74',
        cloud: '#FBFAF7',
      },
      fontFamily: {
        display: ['Marcellus', 'Georgia', 'serif'],
        sans: ['"Jost Variable"', 'Jost', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.035em',
        label: '0.3em',
        wider2: '0.18em',
      },
      fontSize: {
        '2xs': ['0.66rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        soft: '0 24px 60px -32px rgba(6, 35, 30, 0.35)',
        lift: '0 42px 90px -48px rgba(6, 35, 30, 0.55)',
        ring: '0 0 0 1px rgba(10, 46, 39, 0.08)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'marquee-x': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'marquee-x-rev': {
          from: { transform: 'translate3d(-50%,0,0)' },
          to: { transform: 'translate3d(0,0,0)' },
        },
        breathe: {
          '0%,100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.35)' },
        },
        'slow-zoom': {
          from: { transform: 'scale(1.02)' },
          to: { transform: 'scale(1.14)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'marquee-x': 'marquee-x linear infinite',
        'marquee-x-rev': 'marquee-x-rev linear infinite',
        breathe: 'breathe 2.6s ease-in-out infinite',
        'slow-zoom': 'slow-zoom 14s ease-out forwards',
        spin: 'spin 9s linear infinite',
      },
    },
  },
  plugins: [primeui],
}
