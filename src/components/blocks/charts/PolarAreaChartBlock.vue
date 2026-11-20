<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const data = computed(() => ({
  labels: ['Quality', 'Speed', 'Accuracy', 'Capacity'],
  datasets: [
    {
      data: [88, 74, 92, 81],
      backgroundColor: [
        `${theme.value.kale}CC`,
        `${theme.value.carrot}CC`,
        `${theme.value.lime}CC`,
        `${theme.value.tamarind}CC`,
      ],
      borderColor: [theme.value.kale, theme.value.carrot, theme.value.lime, theme.value.tamarind],
      borderWidth: 2,
    },
  ],
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { color: theme.value.text, usePointStyle: true } },
  },
  scales: { r: { ticks: { display: false }, grid: { color: theme.value.border } } },
}))
</script>

<template>
  <Card class="max-w-2xl">
    <template #title><h3 class="text-lg font-medium">Warehouse performance</h3></template>
    <template #subtitle>Relative score across four operational measures</template>
    <template #content>
      <Chart
        type="polarArea"
        :data="data"
        :options="options"
        :canvasProps="{
          role: 'img',
          'aria-label': 'Polar area chart with quality 88, speed 74, accuracy 92, and capacity 81.',
        }"
        class="h-80"
      />
      <p class="sr-only">Quality 88, speed 74, accuracy 92, and capacity 81.</p>
    </template>
  </Card>
</template>
