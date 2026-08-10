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
          // Theme-aware interaction states. The numbered shades below are raw
          // palette literals with no dark counterpart, so `hover:bg-primary-600`
          // inverted the hover direction in dark mode — use these instead.
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          active: 'rgb(var(--color-primary-active) / <alpha-value>)',
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
        // Status accents. These carry the TEXT/border value for each status and
        // are per-theme, because a single literal hex cannot be legible on both
        // a white and a #1E293B surface. Pair a solid fill with `on-status`, and
        // use the `-soft` tokens for the tinted banner surfaces — `bg-error/10`
        // was calibrated for white and went grey over the dark surface.
        success: {
          DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
          soft: 'rgb(var(--color-success-soft) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
          soft: 'rgb(var(--color-warning-soft) / <alpha-value>)',
        },
        error: {
          DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
          soft: 'rgb(var(--color-error-soft) / <alpha-value>)',
        },
        // Informational accent (bg-info / text-info / bg-info-soft).
        info: {
          DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
          soft: 'rgb(var(--color-info-soft) / <alpha-value>)',
        },
        // Legible foreground for a solid status fill, in both themes.
        'on-status': 'rgb(var(--color-on-status) / <alpha-value>)',
        // Always-dark media surface and its foreground (bg-stage /
        // text-on-stage / text-on-stage-muted). Same value in both themes.
        stage: 'rgb(var(--color-stage) / <alpha-value>)',
        'on-stage': 'rgb(var(--color-on-stage) / <alpha-value>)',
        'on-stage-muted': 'rgb(var(--color-on-stage-muted) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-hover': 'rgb(var(--color-surface-hover) / <alpha-value>)',
        subtle: 'rgb(var(--color-subtle) / <alpha-value>)',
        'brand-soft': 'rgb(var(--color-brand-soft) / <alpha-value>)',
        'on-brand-soft': 'rgb(var(--color-on-brand-soft) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'border-strong': 'rgb(var(--color-border-strong) / <alpha-value>)',
        track: 'rgb(var(--color-track) / <alpha-value>)',
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
        // Driven by variables so `.dark` can swap a no-op drop shadow for a
        // visible ring (see globals.css).
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
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
