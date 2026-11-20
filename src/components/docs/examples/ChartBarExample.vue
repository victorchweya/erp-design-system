<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const values = [142, 168, 155, 181, 196, 124, 38]
const data = computed(() => ({
  labels,
  datasets: [
    { label: 'Orders', data: values, backgroundColor: theme.value.kale, borderRadius: 6 },
  ],
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
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
  <div>
    <Chart
      type="bar"
      :data="data"
      :options="options"
      :canvasProps="{
        role: 'img',
        'aria-label':
          'Orders peaked at 196 on Friday and dropped to 38 on Sunday, for 1,004 orders that week.',
      }"
      class="h-72"
    />
    <table class="sr-only">
      <caption>
        Orders per day, week of 9 November 2026
      </caption>
      <tbody>
        <tr v-for="(label, index) in labels" :key="label">
          <th scope="row">{{ label }}</th>
          <td>{{ values[index] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
