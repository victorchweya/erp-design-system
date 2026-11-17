import PrimeUI from 'tailwindcss-primeui'
import { brandTokenReferences, primitives } from './src/theme/erp-theme/foundations/palette.ts'
import { semanticColors } from './src/theme/erp-theme/foundations/color-tokens.ts'
import { fontFamily } from './src/theme/erp-theme/foundations/typography.ts'
import { wideContainerMaxWidth } from './src/theme/erp-theme/foundations/spacing.ts'

const themeColor = (token) =>
  `color-mix(in srgb, var(--p-${token}) calc(100% * <alpha-value>), transparent)`

const pairedColors = (group, names) =>
  Object.fromEntries(
    names.map((name) => [
      name,
      {
        DEFAULT: themeColor(`${group}-${name}-background`),
        contrast: themeColor(`${group}-${name}-color`),
      },
    ]),
  )

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '.app-dark'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', '!./src/theme/aura-reference/**'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': wideContainerMaxWidth,
      },
      colors: {
        status: pairedColors('status', ['success', 'warning', 'error', 'info']),
        ftf: Object.fromEntries(
          Object.entries(primitives).map(([family, shades]) => [
            family,
            Object.fromEntries(
              Object.keys(shades).map((shade) => [shade, themeColor(`ftf-${family}-${shade}`)]),
            ),
          ]),
        ),
        ...Object.fromEntries(
          Object.keys(brandTokenReferences).map((name) => [name, themeColor(`ftf-${name}`)]),
        ),
      },
      textColor: {
        ...Object.fromEntries(
          semanticColors
            .filter(({ name }) => name !== 'secondary')
            .map(({ name }) => [name, themeColor(`severity-${name}-color`)]),
        ),
        ...Object.fromEntries(
          semanticColors.map(({ name }) => [
            `${name}-contrast`,
            themeColor(`severity-${name}-contrast-color`),
          ]),
        ),
        primary: themeColor('primary-color'),
        'primary-contrast': themeColor('primary-contrast-color'),
        muted: themeColor('text-muted-color'),
        surface: themeColor('content-background'),
      },
      backgroundColor: {
        ...Object.fromEntries(
          semanticColors.map(({ name }) => [name, themeColor(`severity-${name}-background`)]),
        ),
        primary: themeColor('primary-color'),
        surface: themeColor('content-background'),
      },
      fontFamily: {
        sans: [`var(--p-typography-font-family, ${fontFamily})`],
      },
    },
  },
  plugins: [PrimeUI],
}
