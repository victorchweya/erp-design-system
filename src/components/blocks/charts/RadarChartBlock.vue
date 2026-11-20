<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const data = computed(() => ({
  labels: ['Availability', 'Quality', 'Price', 'Lead time', 'Reliability'],
  datasets: [
    {
      label: 'Current supplier',
      data: [82, 91, 74, 68, 88],
      borderColor: theme.value.kale,
      backgroundColor: `${theme.value.kale}30`,
      pointBackgroundColor: theme.value.kale,
    },
    {
      label: 'Target',
      data: [90, 90, 85, 80, 90],
      borderColor: theme.value.carrot,
      backgroundColor: `${theme.value.carrot}18`,
      pointBackgroundColor: theme.value.carrot,
    },
  ],
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { color: theme.value.text, usePointStyle: true } },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: { display: false },
      pointLabels: { color: theme.value.muted },
      grid: { color: theme.value.border },
      angleLines: { color: theme.value.border },
    },
  },
}))
</script>

<template>
  <Card class="max-w-2xl">
    <template #title><h3 class="text-lg font-medium">Supplier scorecard</h3></template>
    <template #subtitle>Current supplier performance compared with target</template>
    <template #content>
      <Chart
        type="radar"
        :data="data"
        :options="options"
        :canvasProps="{
          role: 'img',
          'aria-label':
            'Radar chart comparing current supplier scores with targets across five measures.',
        }"
        class="h-80"
      />
      <p class="sr-only">
        The supplier is below target in availability, price, lead time, and reliability, and above
        target in quality.
      </p>
    </template>
  </Card>
</template>
