<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const data = computed(() => ({
  labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  datasets: [
    {
      type: 'bar' as const,
      label: 'Orders',
      data: [82, 96, 104, 118, 126, 143],
      backgroundColor: theme.value.carrot,
      borderRadius: 5,
    },
    {
      type: 'line' as const,
      label: 'On-time delivery',
      data: [91, 93, 92, 95, 94, 96],
      borderColor: theme.value.kale,
      backgroundColor: theme.value.kale,
      yAxisID: 'percentage',
      tension: 0.35,
    },
  ],
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  plugins: { legend: { labels: { color: theme.value.text, usePointStyle: true } } },
  scales: {
    x: { ticks: { color: theme.value.muted }, grid: { display: false } },
    y: {
      beginAtZero: true,
      ticks: { color: theme.value.muted },
      grid: { color: theme.value.border },
    },
    percentage: {
      position: 'right' as const,
      min: 80,
      max: 100,
      ticks: { color: theme.value.muted, callback: (value: string | number) => `${value}%` },
      grid: { drawOnChartArea: false },
    },
  },
}))
</script>

<template>
  <Card>
    <template #title><h3 class="text-lg font-medium">Orders and delivery performance</h3></template>
    <template #subtitle>Volume and rate shown on separate axes</template>
    <template #content>
      <Chart
        type="bar"
        :data="data"
        :options="options"
        :canvasProps="{
          role: 'img',
          'aria-label':
            'Combined bar and line chart showing rising monthly orders and on-time delivery between 91 and 96 percent.',
        }"
        class="h-72"
      />
      <p class="sr-only">
        Orders increased from 82 in June to 143 in November while on-time delivery ranged from 91 to
        96 percent.
      </p>
    </template>
  </Card>
</template>
