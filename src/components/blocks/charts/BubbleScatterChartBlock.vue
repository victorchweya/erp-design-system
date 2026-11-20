<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const data = computed(() => ({
  datasets: [
    {
      label: 'Customer orders',
      data: [
        { x: 8, y: 42, r: 8 },
        { x: 15, y: 68, r: 12 },
        { x: 24, y: 91, r: 16 },
        { x: 32, y: 73, r: 10 },
        { x: 41, y: 118, r: 18 },
      ],
      backgroundColor: `${theme.value.carrot}99`,
      borderColor: theme.value.carrot,
      borderWidth: 2,
    },
  ],
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      title: { display: true, text: 'Items per order', color: theme.value.muted },
      ticks: { color: theme.value.muted },
      grid: { color: theme.value.border },
    },
    y: {
      title: { display: true, text: 'Order value (Ksh thousands)', color: theme.value.muted },
      ticks: { color: theme.value.muted },
      grid: { color: theme.value.border },
    },
  },
}))
</script>

<template>
  <Card>
    <template #title><h3 class="text-lg font-medium">Order value distribution</h3></template>
    <template #subtitle>Items, order value, and relative customer volume</template>
    <template #content>
      <Chart
        type="bubble"
        :data="data"
        :options="options"
        :canvasProps="{
          role: 'img',
          'aria-label':
            'Bubble chart comparing items per order with order value for five customer groups.',
        }"
        class="h-72"
      />
      <p class="sr-only">
        The plotted groups range from 8 items and Ksh 42,000 to 41 items and Ksh 118,000.
      </p>
    </template>
  </Card>
</template>
