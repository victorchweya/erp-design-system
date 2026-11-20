<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const delivered = [42, 38, 51, 47, 55, 36]
const planned = [45, 40, 50, 50, 54, 40]
const data = computed(() => ({
  labels,
  datasets: [
    { label: 'Delivered', data: delivered, backgroundColor: theme.value.primary, borderRadius: 4 },
    { label: 'Planned', data: planned, backgroundColor: theme.value.secondary, borderRadius: 4 },
  ],
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  plugins: { legend: { labels: { color: theme.value.text, usePointStyle: true } } },
  scales: {
    x: { ticks: { color: theme.value.muted }, grid: { display: false } },
    y: {
      beginAtZero: true,
      ticks: { color: theme.value.muted, precision: 0 },
      grid: { color: theme.value.border },
    },
  },
}))
</script>

<template>
  <Card>
    <template #title><h3 class="text-lg font-medium">Crates delivered</h3></template>
    <template #subtitle>Delivered against planned · week of 16 November 2026</template>
    <template #content>
      <Chart
        type="bar"
        :data="data"
        :options="options"
        :canvasProps="{
          role: 'img',
          'aria-label':
            'Delivered crates were close to plan all week, from 36 on Saturday to 55 on Friday.',
        }"
        class="h-64"
      >
        <table class="sr-only">
          <caption>
            Crates delivered and planned by day
          </caption>
          <thead>
            <tr>
              <th>Day</th>
              <th>Delivered</th>
              <th>Planned</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(label, index) in labels" :key="label">
              <th scope="row">{{ label }}</th>
              <td>{{ delivered[index] }}</td>
              <td>{{ planned[index] }}</td>
            </tr>
          </tbody>
        </table>
      </Chart>
    </template>
  </Card>
</template>
