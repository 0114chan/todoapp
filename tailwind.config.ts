// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          800: '#1E293B',
          900: '#0F172A',
        },
        violet: {
          100: '#EDE9FE',
          600: '#7C3AED',
        },
        rose: {
          500: '#F43F5E',
        },
        lime: {
          300: '#BEF264',
        },
        amber: {
          800: '#92400E',
        },
      },
    },
  },
  plugins: [],
}