/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        cream: '#f7efdf',
        sand: '#e9dcc3',
        mocha: '#a87d54',
        emerald: {
          DEFAULT: '#0f3d2e',
          soft: '#1c5240',
        },
        gold: '#c9a34e',
        terracotta: '#b5613f',
        ink: '#2a2620',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.2em',
      },
    },
  },
  plugins: [],
};
