import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:         '#132C47',
          panel:        '#294C63',
          teal:         '#78AEAD',
          'teal-light': '#D4ECE9',
          coral:        '#D86350',
          amber:        '#FBAE54',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-rajdhani)', 'sans-serif'],
      },
    },
  },
} satisfies Config
