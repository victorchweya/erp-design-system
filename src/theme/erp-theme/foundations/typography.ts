// Tailwind's default scale, kept local so the standalone preset needs no Tailwind runtime.
export const fontSizes = {
  xs: ['0.75rem', '1rem'],
  sm: ['0.875rem', '1.25rem'],
  base: ['1rem', '1.5rem'],
  lg: ['1.125rem', '1.75rem'],
  xl: ['1.25rem', '1.75rem'],
  '2xl': ['1.5rem', '2rem'],
  '3xl': ['1.875rem', '2.25rem'],
  '4xl': ['2.25rem', '2.5rem'],
  '5xl': ['3rem', '1'],
  '6xl': ['3.75rem', '1'],
  '7xl': ['4.5rem', '1'],
  '8xl': ['6rem', '1'],
  '9xl': ['8rem', '1'],
} as const

export const fontWeights = { normal: '400', medium: '500', semibold: '600', bold: '700' } as const
export const fontFamily = "'Rubik', system-ui, sans-serif"

export const fontTokens = {
  size: Object.fromEntries(Object.entries(fontSizes).map(([name, [size]]) => [name, size])),
  weight: fontWeights,
}
