/**
 * prime-preset.js
 * ---------------------------------------------------------------
 * Re-skins PrimeVue's Aura preset in the studio's own palette so
 * form controls, the accordion and the lightbox dialog feel native
 * to the site instead of looking like dropped-in components.
 */
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const VrajPreset = definePreset(Aura, {
  semantic: {
    transitionDuration: '0.4s',
    primary: {
      50: '#FAF6EF',
      100: '#F2E9D8',
      200: '#E5D3B1',
      300: '#D8BD8A',
      400: '#C6A46E',
      500: '#B08D57',
      600: '#97753F',
      700: '#7A5C31',
      800: '#5E4626',
      900: '#43331C',
      950: '#241B0F'
    },
    formField: {
      paddingX: '0.95rem',
      paddingY: '0.8rem',
      borderRadius: '2px',
      focusRing: { width: '1px', style: 'solid', color: '#B08D57', offset: '0' },
      transitionDuration: '0.35s'
    },
    content: {
      background: '{surface.0}',
      borderColor: '#DBCFBC'
    },
    colorScheme: {
      light: {
        surface: {
          0: '#FFFFFF',
          50: '#FAF7F1',
          100: '#F3EDE3',
          200: '#E9E0D1',
          300: '#DBCFBC',
          400: '#C0B4A3',
          500: '#A89C8E',
          600: '#8B7F71',
          700: '#6E5B45',
          800: '#4A3B2C',
          900: '#33291F',
          950: '#1F1811'
        },
        primary: {
          color: '#B08D57',
          contrastColor: '#FFFFFF',
          hoverColor: '#8F6F3E',
          activeColor: '#7A5C31'
        },
        text: {
          color: '#4A3B2C',
          mutedColor: '#8B7F71'
        },
        borderRadius: { none: '0', xs: '1px', sm: '2px', md: '3px', lg: '4px', xl: '6px' }
      }
    }
  },
  components: {
    button: {
      root: {
        borderRadius: '999px',
        paddingX: '1.6rem',
        paddingY: '0.8rem',
        label: { fontWeight: '500', fontSize: '0.72rem' },
        transitionDuration: '0.45s'
      }
    },
    inputtext: {
      root: { background: 'transparent', borderColor: '#DBCFBC', fontSize: '0.95rem' }
    },
    textarea: {
      root: { background: 'transparent', borderColor: '#DBCFBC', fontSize: '0.95rem' }
    },
    select: {
      root: { background: 'transparent', borderColor: '#DBCFBC', fontSize: '0.95rem' }
    },
    accordion: {
      header: { background: 'transparent', borderColor: '#DBCFBC' },
      content: { borderColor: '#DBCFBC' }
    },
    dialog: {
      root: { background: '#FAF7F1', border: 'none' },
      header: { background: '#FAF7F1', padding: '1.1rem 1.4rem' },
      content: { padding: '0' }
    }
  }
})
