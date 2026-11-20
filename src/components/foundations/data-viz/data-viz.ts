import { chartSeries, chartSeriesVariable } from '@/theme/erp-theme/foundations/chart-series'
import { colorValue, contrastRatio, roleByName } from '@/theme/erp-theme/foundations/color-tokens'

export interface DataVizSwatch {
  label: string
  token: string
  /** Utility class for the swatch fill. Use `color` when the fill is derived. */
  className?: string
  /** CSS colour for the swatch fill. */
  color?: string
  detail: string
}

export interface ChartGuideRow {
  question: string
  chart: string
  note: string
  blocks: readonly { label: string; to: string }[]
}

// Charts sit on content.background (Card) in both modes.
const chartSurface = roleByName('content.background')
const ratioOnSurface = (light: string, dark = light) => {
  const ratio = (color: string, background: string) =>
    contrastRatio(colorValue(color).value, background).toFixed(2)
  return `${ratio(light, chartSurface.light.background.value)}:1 light · ${ratio(dark, chartSurface.dark.background.value)}:1 dark`
}

// Series order used by the chart blocks through useChartTheme.
export const categoricalSwatches: readonly DataVizSwatch[] = chartSeries.map((series, index) => ({
  label: `${index + 1} · ${series.label}`,
  token: `theme.${series.key}`,
  color: `var(${chartSeriesVariable(series.key)})`,
  detail: `${chartSeriesVariable(series.key)} · ${
    series.light === series.dark ? series.light : `${series.light}, ${series.dark} in dark mode`
  } · ${ratioOnSurface(series.light, series.dark)}`,
}))

// Recommended single-hue ramp from the green (Kale) palette.
export const sequentialSwatches: readonly DataVizSwatch[] = [
  { label: 'Lowest', token: '--p-ftf-green-100', className: 'bg-ftf-green-100', detail: '100' },
  { label: '', token: '--p-ftf-green-300', className: 'bg-ftf-green-300', detail: '300' },
  { label: '', token: '--p-ftf-green-400', className: 'bg-ftf-green-400', detail: '400' },
  { label: '', token: '--p-ftf-green-500', className: 'bg-ftf-green-500', detail: '500' },
  { label: 'Highest', token: '--p-ftf-green-700', className: 'bg-ftf-green-700', detail: '700' },
]

export const statusSwatches: readonly DataVizSwatch[] = [
  {
    label: 'Success',
    token: '--p-severity-success-background',
    className: 'bg-success',
    detail: 'On time, within target',
  },
  {
    label: 'Warn',
    token: '--p-severity-warn-background',
    className: 'bg-warn',
    detail: 'At risk, needs review',
  },
  {
    label: 'Danger',
    token: '--p-severity-danger-background',
    className: 'bg-danger',
    detail: 'Late, failed, or over limit',
  },
]

export const chartGuide: readonly ChartGuideRow[] = [
  {
    question: 'How does a value change over time?',
    chart: 'Line or area',
    note: 'Use area for a single series where the total matters.',
    blocks: [
      { label: 'Line', to: '/ui-blocks/charts/line' },
      { label: 'Area', to: '/ui-blocks/charts/area' },
    ],
  },
  {
    question: 'How do categories compare?',
    chart: 'Bar',
    note: 'Use horizontal bars for long category names.',
    blocks: [{ label: 'Bar', to: '/ui-blocks/charts/bar' }],
  },
  {
    question: 'What makes up a total over time?',
    chart: 'Stacked bar',
    note: 'Keep to two or three segments.',
    blocks: [{ label: 'Stacked', to: '/ui-blocks/charts/stacked' }],
  },
  {
    question: 'What share does each part have?',
    chart: 'Doughnut, sparingly',
    note: 'Up to five slices. Use bars when differences are small.',
    blocks: [{ label: 'Doughnut & pie', to: '/ui-blocks/charts/doughnut-pie' }],
  },
  {
    question: 'How do two measures with different units relate?',
    chart: 'Composed bar and line',
    note: 'Label both axes with their units.',
    blocks: [{ label: 'Composed', to: '/ui-blocks/charts/composed' }],
  },
  {
    question: 'Is there a relationship between two measures?',
    chart: 'Scatter or bubble',
    note: 'Explain what bubble size represents.',
    blocks: [{ label: 'Bubble & scatter', to: '/ui-blocks/charts/bubble-scatter' }],
  },
  {
    question: 'How does a profile compare across several attributes?',
    chart: 'Radar or polar area, rarely',
    note: 'Prefer bars unless the shape itself is meaningful.',
    blocks: [
      { label: 'Radar', to: '/ui-blocks/charts/radar' },
      { label: 'Polar area', to: '/ui-blocks/charts/polar-area' },
    ],
  },
]
