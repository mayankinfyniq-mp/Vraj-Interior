/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F1',
        porcelain: '#F3EDE3',
        sand: '#E9E0D1',
        linen: '#DBCFBC',
        taupe: '#A89C8E',
        stone: '#8B7F71',
        umber: '#6E5B45',
        walnut: '#4A3B2C',
        espresso: '#33291F',
        brass: {
          DEFAULT: '#B08D57',
          soft: '#D2B68A',
          deep: '#8F6F3E'
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      fontSize: {
        'display-sm': ['clamp(1.75rem, 3.2vw, 2.4rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2.1rem, 4.6vw, 3.1rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.6rem, 6.2vw, 4.6rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        eyebrow: ['0.7rem', { lineHeight: '1', letterSpacing: '0.24em' }],
        micro: ['0.65rem', { lineHeight: '1', letterSpacing: '0.2em' }]
      },
      letterSpacing: {
        wider2: '0.18em',
        widest2: '0.3em'
      },
      maxWidth: {
        shell: '1440px',
        prose2: '62ch'
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
        velvet: 'cubic-bezier(0.65, 0, 0.35, 1)'
      },
      screens: {
        xs: '460px'
      }
    }
  },
  plugins: []
}
