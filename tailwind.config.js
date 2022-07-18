/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      backgroundImage: {
        password: "url('https://images.unsplash.com/photo-1556745757-8d76bdb6984b')",
      },
      animation: {
        grow: 'grow 10s linear infinite',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scaleX(0)' },
        },
        clicked: {
          to: {
            transform: 'translate(-50%, -50%) scale(10);',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
