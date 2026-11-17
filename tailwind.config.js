import PrimeUI from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '.app-dark'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', '!./src/theme/aura-reference/**'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--p-typography-font-family, 'Rubik', system-ui, sans-serif)"],
      },
    },
  },
  plugins: [PrimeUI],
}
