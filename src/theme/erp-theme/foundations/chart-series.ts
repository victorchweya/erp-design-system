// Categorical chart series built from the core FTF colours, in assignment order.
// Each step reaches at least 3:1 on content.background in its mode. The steps were
// chosen to keep the four series apart, including under simulated colour-vision
// deficiency. Light mode needs darker Lime and Carrot steps to stay legible on white.
export const chartSeries = [
  { key: 'kale', label: 'Kale', light: 'green.500', dark: 'green.300' },
  { key: 'carrot', label: 'Carrot', light: 'orange.600', dark: 'orange.600' },
  { key: 'lime', label: 'Lime', light: 'olive.700', dark: 'olive.300' },
  { key: 'tamarind', label: 'Tamarind', light: 'brown.400', dark: 'brown.500' },
] as const

export type ChartSeriesKey = (typeof chartSeries)[number]['key']

/** CSS variable for a series; it switches with the colour mode. */
export const chartSeriesVariable = (key: ChartSeriesKey) => `--p-chart-${key}`
