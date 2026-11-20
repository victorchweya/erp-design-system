<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const data = computed(() => ({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Received',
      data: [2.8, 3.4, 3.1, 4.2, 4.6, 3.8, 4.9],
      borderColor: theme.value.kale,
      backgroundColor: theme.value.kale,
      tension: 0.35,
    },
    {
      label: 'Dispatched',
      data: [2.4, 3.0, 2.9, 3.7, 4.1, 3.5, 4.4],
      borderColor: theme.value.carrot,
      backgroundColor: theme.value.carrot,
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
      ticks: { color: theme.value.muted, callback: (value: string | number) => `${value}t` },
      grid: { color: theme.value.border },
    },
  },
}))
</script>

<template>
  <Card>
    <template #title><h3 class="text-lg font-medium">Warehouse throughput</h3></template>
    <template #subtitle>Tonnes received and dispatched this week</template>
    <template #content>
      <Chart
        type="line"
        :data="data"
        :options="options"
        :canvasProps="{
          role: 'img',
          'aria-label':
            'Two-line chart comparing tonnes received and dispatched from Monday to Sunday.',
        }"
        class="h-72"
      />
      <p class="sr-only">Received volume remained above dispatched volume throughout the week.</p>
    </template>
  </Card>
</template>
