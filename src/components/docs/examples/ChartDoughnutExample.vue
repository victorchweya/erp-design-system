<script setup lang="ts">
import { computed } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
const labels = ['Delivered', 'In transit', 'Cancelled']
const values = [412, 86, 18]
const data = computed(() => ({
  labels,
  datasets: [
    {
      data: values,
      backgroundColor: [theme.value.primary, theme.value.secondary, theme.value.secondaryWarm],
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
  <div>
    <Chart
      type="doughnut"
      :data="data"
      :options="options"
      :canvasProps="{
        role: 'img',
        'aria-label':
          'Of 516 orders this month, 412 were delivered, 86 are in transit, and 18 were cancelled.',
      }"
      class="mx-auto h-72 max-w-sm"
    />
    <table class="sr-only">
      <caption>
        Orders by status, November 2026
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
