<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import ChartBarExample from '@/components/docs/examples/ChartBarExample.vue'
import code0 from '@/components/docs/examples/ChartBarExample.vue?raw'
import ChartLineExample from '@/components/docs/examples/ChartLineExample.vue'
import code1 from '@/components/docs/examples/ChartLineExample.vue?raw'
import ChartDoughnutExample from '@/components/docs/examples/ChartDoughnutExample.vue'
import code2 from '@/components/docs/examples/ChartDoughnutExample.vue?raw'

const examples = [
  {
    id: 'chart-0',
    title: 'Bar',
    description: 'Compare counts across categories or days, such as orders received each day.',
    component: ChartBarExample,
    code: code0,
  },
  {
    id: 'chart-1',
    title: 'Line',
    description:
      'Show a trend over time. Format tooltip values with formatCurrency and keep axis labels short.',
    component: ChartLineExample,
    code: code1,
  },
  {
    id: 'chart-2',
    title: 'Doughnut',
    description: 'Show parts of a whole with up to five segments, such as orders by status.',
    component: ChartDoughnutExample,
    code: code2,
  },
]
const api = [
  {
    name: 'type',
    type: 'string',
    default: '—',
    description: 'bar, line, doughnut, pie, polarArea, radar, bubble, or scatter.',
  },
  {
    name: 'data',
    type: 'object',
    default: '—',
    description: 'Chart.js labels and datasets.',
  },
  {
    name: 'options',
    type: 'object',
    default: '—',
    description:
      'Chart.js options. Set maintainAspectRatio to false and size the chart with a class.',
  },
  {
    name: 'canvasProps',
    type: 'CanvasHTMLAttributes',
    default: '—',
    description: 'Attributes for the canvas, such as role and aria-label.',
  },
  {
    name: 'plugins',
    type: 'any[]',
    default: '—',
    description: 'Inline Chart.js plugins for this chart.',
  },
]
const accessibility = [
  'A canvas has no text of its own. Set role="img" and an aria-label that states the main finding, not just the chart type.',
  'Place a visually hidden table of the values next to the Chart. In PrimeVue 5.0.5, content inside Chart is not rendered, so a table placed there never reaches screen readers.',
  'Take colours from useChartTheme so charts follow light and dark mode. Do not rely on colour alone; use labels, a legend, or direct values.',
]
</script>

<template>
  <ComponentDoc
    title="Chart"
    componentName="Chart"
    category="Data"
    description="Plot business data with Chart.js using FTF theme colours."
    usage="takes a type, data, and options. Read colours from useChartTheme and add a summary and data table for every chart. For dashboards, start from the ready-made blocks in UI blocks › Charts, such as Bar, Line, Area, and Doughnut & Pie."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/chart"
  />
</template>
