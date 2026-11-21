<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const {
  title = 'Orders by fulfilment type',
  subtitle = 'Delivery and pickup order composition',
  categoryLabel = 'Month',
  labels = ['Aug', 'Sep', 'Oct', 'Nov'],
  series = [
    { label: 'Delivery', values: [62, 71, 84, 96] },
    { label: 'Pickup', values: [34, 38, 41, 47] },
  ],
  summary = 'Stacked monthly orders split between delivery and pickup from August to November.',
  caption = 'Orders by fulfilment type',
} = defineProps<{
  title?: string
  subtitle?: string
  /** Header for the category column in the text alternative. */
  categoryLabel?: string
  labels?: string[]
  /** Stacked series in colour assignment order; up to four. */
  series?: { label: string; values: number[] }[]
  /** Canvas label describing the composition. */
  summary?: string
  caption?: string
}>()
const seriesColors = computed(() => [
  theme.value.kale,
  theme.value.carrot,
  theme.value.lime,
  theme.value.tamarind,
])
const data = computed(() => ({
  labels,
  datasets: series.map(({ label, values }, index) => ({
    label,
    data: values,
    backgroundColor: seriesColors.value[index % seriesColors.value.length],
    borderRadius: 4,
  })),
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  plugins: { legend: { labels: { color: theme.value.text, usePointStyle: true } } },
  scales: {
    x: {
      stacked: true,
      ticks: { color: theme.value.muted },
      grid: { display: false },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: { color: theme.value.muted, precision: 0 },
      grid: { color: theme.value.border },
    },
  },
}))
</script>

<template>
  <Card>
    <template #title
      ><h3 class="text-lg font-medium">{{ title }}</h3></template
    >
    <template #subtitle>{{ subtitle }}</template>
    <template #content>
      <Chart
        type="bar"
        :data="data"
        :options="options"
        :canvasProps="{ role: 'img', 'aria-label': summary }"
        class="h-72"
      />
      <table class="sr-only">
        <caption>
          {{
            caption
          }}
        </caption>
        <thead>
          <tr>
            <th scope="col">{{ categoryLabel }}</th>
            <th v-for="item in series" :key="item.label" scope="col">{{ item.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(label, index) in labels" :key="label">
            <th scope="row">{{ label }}</th>
            <td v-for="item in series" :key="item.label">{{ item.values[index] }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </Card>
</template>
