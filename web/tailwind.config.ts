import type { Config } from 'tailwindcss'

/**
 * Design tokens mirrored from the Optima LMS Design System v1.0 (Figma),
 * as implemented in the Flutter app: mobile/lib/core/utils/app_colors.dart
 * + app_text_styles.dart + app_theme.dart.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens driven by CSS variables (see globals.css) so the
        // same class works in light and dark mode.
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
          800: '#312e81',
          900: '#1e1b4b',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        success: { DEFAULT: '#22c55e', 500: '#22c55e' },
        warning: { DEFAULT: '#f59e0b', 500: '#f59e0b' },
        error: { DEFAULT: '#ef4444', 500: '#ef4444' },
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-hover': 'rgb(var(--color-surface-hover) / <alpha-value>)',
        subtle: 'rgb(var(--color-subtle) / <alpha-value>)',
        'brand-soft': 'rgb(var(--color-brand-soft) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'border-strong': 'rgb(var(--color-border-strong) / <alpha-value>)',
        content: {
          DEFAULT: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        sans: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      fontSize: {
        // Mapped from TextStyles (mobile) — display / title / body / label
        'display-lg': ['2.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        'title-lg': ['2rem', { lineHeight: '1.4', fontWeight: '700' }],
        'title-md': ['1.5rem', { lineHeight: '1.4', fontWeight: '700' }],
        'title-sm': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        // button 12, input 14, card 20 (mobile app_theme.dart)
        btn: '1rem',
        input: '0.875rem',
        card: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)',
        'card-hover': '0 4px 12px -2px rgb(79 70 229 / 0.12)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.25s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
