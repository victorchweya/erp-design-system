<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const labels = ['Aug', 'Sep', 'Oct', 'Nov']
const delivery = [62, 71, 84, 96]
const pickup = [34, 38, 41, 47]
const data = computed(() => ({
  labels,
  datasets: [
    { label: 'Delivery', data: delivery, backgroundColor: theme.value.kale, borderRadius: 4 },
    { label: 'Pickup', data: pickup, backgroundColor: theme.value.carrot, borderRadius: 4 },
  ],
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
    <template #title><h3 class="text-lg font-medium">Orders by fulfilment type</h3></template>
    <template #subtitle>Delivery and pickup order composition</template>
    <template #content>
      <Chart
        type="bar"
        :data="data"
        :options="options"
        :canvasProps="{
          role: 'img',
          'aria-label':
            'Stacked monthly orders split between delivery and pickup from August to November.',
        }"
        class="h-72"
      />
      <table class="sr-only">
        <caption>
          Orders by fulfilment type
        </caption>
        <thead>
          <tr>
            <th>Month</th>
            <th>Delivery</th>
            <th>Pickup</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(label, index) in labels" :key="label">
            <th scope="row">{{ label }}</th>
            <td>{{ delivery[index] }}</td>
            <td>{{ pickup[index] }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </Card>
</template>
