/** @type {import('tailwindcss').Config} */
/** +5px on type sizes; spacing scale stays at 16px root so layout does not zoom. */
const TYPE_BUMP = '0.375rem'

const fontSize = {
  xs: [`calc(0.75rem + ${TYPE_BUMP})`, { lineHeight: '1.3' }],
  sm: [`calc(0.875rem + ${TYPE_BUMP})`, { lineHeight: '1.4' }],
  base: [`calc(1rem + ${TYPE_BUMP})`, { lineHeight: '1.5' }],
  lg: [`calc(1.125rem + ${TYPE_BUMP})`, { lineHeight: '1.5' }],
  xl: [`calc(1.25rem + ${TYPE_BUMP})`, { lineHeight: '1.45' }],
  '2xl': [`calc(1.5rem + ${TYPE_BUMP})`, { lineHeight: '1.35' }],
  '3xl': [`calc(1.875rem + ${TYPE_BUMP})`, { lineHeight: '1.25' }],
  '4xl': [`calc(2.25rem + ${TYPE_BUMP})`, { lineHeight: '1.2' }],
  '5xl': [`calc(3rem + ${TYPE_BUMP})`, { lineHeight: '1.08' }],
  '6xl': [`calc(3.75rem + ${TYPE_BUMP})`, { lineHeight: '1.05' }],
  '7xl': [`calc(4.5rem + ${TYPE_BUMP})`, { lineHeight: '1.05' }],
  '8xl': [`calc(6rem + ${TYPE_BUMP})`, { lineHeight: '1' }],
  '9xl': [`calc(8rem + ${TYPE_BUMP})`, { lineHeight: '1' }],
}

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontSize,
    fontFamily: {
      sans: ['Burbank Big Condensed', 'system-ui', 'sans-serif'],
      display: ['Burbank Big Condensed', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        /** Same token as --ink-rgb in global.css (not #fff) */
        white: 'rgb(var(--ink-rgb) / <alpha-value>)',
        z: {
          bg: '#08060f',
          elevated: '#0c0a1a',
          band: '#100c1a',
          card: '#14101f',
          hover: '#1a1529',
          ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
          accent: '#b040fb',
          soft: '#a78bfa',
          deep: '#7c3aed',
          success: '#c084fc',
          /** Matches Dota 2 wordmark red in navbar logo */
          'dota-red': '#ff0000',
        },
      },
      fontWeight: {
        normal: '700',
        medium: '700',
        semibold: '700',
        bold: '700',
      },
    },
  },
  plugins: [],
}
