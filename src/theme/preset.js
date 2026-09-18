/**
 * PrimeVue theme preset for Vraj Interior.
 * Built on the Aura base preset and re-tuned to the studio palette:
 * deep emerald greens, porcelain neutrals and a brushed-gold focus ring.
 */
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const emerald = {
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
  950: '#04170F',
}

const porcelain = {
  0: '#FFFFFF',
  50: '#F7F8F5',
  100: '#EDF1EC',
  200: '#DFE6E0',
  300: '#C8D3CB',
  400: '#9BA9A1',
  500: '#6B7A74',
  600: '#4E5C56',
  700: '#3A4641',
  800: '#26302C',
  900: '#15201D',
  950: '#0B1210',
}

export const VrajPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '18px',
    },
  },
  semantic: {
    primary: emerald,
    surface: porcelain,
    colorScheme: {
      light: {
        primary: {
          color: '{primary.700}',
          contrastColor: '#F7F8F5',
          hoverColor: '{primary.800}',
          activeColor: '{primary.900}',
        },
        surface: {
          0: '#FFFFFF',
          50: '{surface.50}',
          100: '{surface.100}',
          200: '{surface.200}',
          300: '{surface.300}',
          400: '{surface.400}',
          500: '{surface.500}',
          600: '{surface.600}',
          700: '{surface.700}',
          800: '{surface.800}',
          900: '{surface.900}',
          950: '{surface.950}',
        },
        content: {
          background: '#FFFFFF',
          hoverBackground: '{surface.50}',
          borderColor: '#E4EAE4',
          color: '{surface.900}',
          hoverColor: '{surface.950}',
        },
        text: {
          color: '{surface.900}',
          hoverColor: '{surface.950}',
          mutedColor: '{surface.500}',
          hoverMutedColor: '{surface.700}',
        },
        formField: {
          background: '#FFFFFF',
          disabledBackground: '{surface.100}',
          filledBackground: '{surface.50}',
          borderColor: '#DDE4DE',
          hoverBorderColor: '{primary.300}',
          focusBorderColor: '{primary.700}',
          invalidBorderColor: '#B4483C',
          color: '{surface.900}',
          disabledColor: '{surface.500}',
          placeholderColor: '{surface.400}',
          floatLabelColor: '{surface.500}',
          floatLabelFocusColor: '{primary.700}',
          floatLabelInvalidColor: '#B4483C',
          shadow: 'none',
        },
        focusRing: {
          width: '1px',
          style: 'solid',
          color: '#C3A15A',
          offset: '3px',
          shadow: 'none',
        },
      },
    },
  },
  components: {
    button: {
      root: {
        borderRadius: '999px',
        paddingX: '1.5rem',
        paddingY: '0.85rem',
        gap: '0.6rem',
        label: { fontWeight: '500', fontSize: '0.9rem' },
      },
      colorScheme: {
        light: {
          root: {
            secondary: {
              background: '#FFFFFF',
              hoverBackground: '{surface.50}',
              borderColor: '#DDE4DE',
              hoverBorderColor: '{primary.700}',
              color: '{primary.900}',
              hoverColor: '{primary.900}',
            },
          },
        },
      },
    },
    inputtext: {
      root: {
        borderRadius: '8px',
        paddingX: '1rem',
        paddingY: '0.85rem',
      },
    },
    textarea: {
      root: {
        borderRadius: '8px',
        paddingX: '1rem',
        paddingY: '0.85rem',
      },
    },
    select: {
      root: { borderRadius: '8px', paddingX: '1rem', paddingY: '0.85rem' },
      overlay: { borderRadius: '10px', shadow: '0 30px 70px -40px rgba(6,35,30,.45)' },
    },
    dialog: {
      root: { borderRadius: '16px' },
      header: { padding: '1.5rem 1.5rem 0 1.5rem' },
      content: { padding: '1rem 1.5rem 1.5rem 1.5rem' },
    },
    galleria: {
      root: { borderWidth: '0' },
      thumbnailContent: { borderWidth: '2px', borderRadius: '4px' },
    },
    toast: {
      root: { borderRadius: '10px', width: '22rem' },
    },
    selectbutton: {
      root: { borderRadius: '999px' },
    },
    tag: {
      root: { borderRadius: '999px', padding: '0.25rem 0.7rem' },
    },
    accordion: {
      header: { padding: '1.15rem 0' },
      content: { padding: '0 0 1.15rem 0' },
      panel: { borderWidth: '0 0 1px 0', borderColor: '#E4EAE4' },
      headerTitle: { fontWeight: '500', fontSize: '1.02rem' },
    },
  },
})

export default VrajPreset
