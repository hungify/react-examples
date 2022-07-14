/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      animation: {
        grow: 'grow 10s linear infinite',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scaleX(0)' },
        },
      },
    },
  },
  plugins: [],
};
