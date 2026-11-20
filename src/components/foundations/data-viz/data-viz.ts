export interface DataVizSwatch {
  label: string
  token: string
  className: string
  detail: string
}

export interface ChartGuideRow {
  question: string
  chart: string
  note: string
  blocks: readonly { label: string; to: string }[]
}

// Series order used by the chart blocks through useChartTheme.
export const categoricalSwatches: readonly DataVizSwatch[] = [
  {
    label: '1 · Primary',
    token: 'theme.primary',
    className: 'bg-primary',
    detail: '--p-primary-color · green 500, green 300 in dark mode',
  },
  {
    label: '2 · Secondary',
    token: 'theme.secondary',
    className: 'bg-ftf-indigo-400',
    detail: '--p-ftf-indigo-400',
  },
  {
    label: '3 · Secondary warm',
    token: 'theme.secondaryWarm',
    className: 'bg-ftf-orange-400',
    detail: '--p-ftf-orange-400',
  },
]

// Recommendations from palette.ts; not yet exposed by useChartTheme.
export const extendedSwatches: readonly DataVizSwatch[] = [
  {
    label: '4 · Violet',
    token: '--p-ftf-violet-500',
    className: 'bg-ftf-violet-500',
    detail: 'At least 3:1 on light and dark surfaces',
  },
  {
    label: '5 · Brown',
    token: '--p-ftf-brown-500',
    className: 'bg-ftf-brown-500',
    detail: 'At least 3:1 on light and dark surfaces',
  },
]

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
