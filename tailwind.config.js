/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#D4622A',
          hover: '#C05520',
          muted: 'rgba(212,98,42,0.14)',
          border: 'rgba(212,98,42,0.3)',
        },
        surface: {
          DEFAULT: '#111113',
          elevated: '#18181B',
        },
      },
      backgroundImage: {
        'grid-subtle': `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid-80': '80px 80px',
      },
    },
  },
  plugins: [],
}
