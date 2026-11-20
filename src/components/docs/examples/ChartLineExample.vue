<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'
import { formatCurrency } from '@/utils/format'

const theme = useChartTheme()
const labels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
const values = [12_400_000, 14_800_000, 13_900_000, 17_200_000, 18_600_000, 21_400_000]
const data = computed(() => ({
  labels,
  datasets: [
    {
      label: 'Revenue',
      data: values,
      borderColor: theme.value.kale,
      backgroundColor: theme.value.kale,
      tension: 0.35,
      pointRadius: 3,
      pointHoverRadius: 5,
    },
  ],
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: { label: ({ parsed }: { parsed: { y: number } }) => formatCurrency(parsed.y) },
    },
  },
  scales: {
    x: { ticks: { color: theme.value.muted }, grid: { display: false } },
    y: {
      beginAtZero: true,
      ticks: {
        color: theme.value.muted,
        callback: (value: string | number) => `${Number(value) / 1_000_000}M`,
      },
      grid: { color: theme.value.border },
    },
  },
}))
</script>

<template>
  <div>
    <Chart
      type="line"
      :data="data"
      :options="options"
      :canvasProps="{
        role: 'img',
        'aria-label':
          'Monthly revenue rose from Ksh 12.4 million in June to Ksh 21.4 million in November.',
      }"
      class="h-72"
    />
    <table class="sr-only">
      <caption>
        Monthly revenue, June to November 2026
      </caption>
      <tbody>
        <tr v-for="(label, index) in labels" :key="label">
          <th scope="row">{{ label }}</th>
          <td>{{ formatCurrency(values[index]) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
