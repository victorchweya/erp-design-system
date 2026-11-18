// Sizes use the existing Tailwind type/spacing scale. Heights include two 1px borders.
export const controlSizes = [
  { key: 'sm', label: 'Small', size: 'small', font: 'sm', x: 2, y: 1 },
  { key: 'md', label: 'Default', size: undefined, font: 'sm', x: 2.5, y: 1.5 },
  { key: 'lg', label: 'Large', size: 'large', font: 'base', x: 3, y: 2 },
] as const

export const controlTokens = Object.fromEntries(
  controlSizes.map(({ key, font, x, y }) => [
    key,
    {
      fontSize: `{font.size.${font}}`,
      paddingX: `{spacing.${x}}`,
      paddingY: `{spacing.${y}}`,
      height: `calc({font.size.${font}} * {typography.line.height} + {spacing.${y}} * 2 + 2px)`,
    },
  ]),
)
