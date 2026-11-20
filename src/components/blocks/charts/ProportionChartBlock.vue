<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const labels = ['Confirmed', 'Pending', 'Cancelled']
const values = [68, 24, 8]
const data = computed(() => ({
  labels,
  datasets: [
    {
      data: values,
      backgroundColor: [theme.value.kale, theme.value.carrot, theme.value.lime],
      borderWidth: 0,
    },
  ],
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  cutout: '68%',
  plugins: {
    legend: { position: 'bottom', labels: { color: theme.value.text, usePointStyle: true } },
  },
}))
</script>

<template>
  <Card class="max-w-xl">
    <template #title><h3 class="text-lg font-medium">Order status</h3></template>
    <template #subtitle>Share of orders in November 2026</template>
    <template #content>
      <Chart
        type="doughnut"
        :data="data"
        :options="options"
        :canvasProps="{
          role: 'img',
          'aria-label':
            '68 percent of orders were confirmed, 24 percent pending, and 8 percent cancelled.',
        }"
        class="h-72"
      />
      <table class="sr-only">
        <caption>
          Order status share
        </caption>
        <tbody>
          <tr v-for="(label, index) in labels" :key="label">
            <th scope="row">{{ label }}</th>
            <td>{{ values[index] }}%</td>
          </tr>
        </tbody>
      </table>
    </template>
  </Card>
</template>
