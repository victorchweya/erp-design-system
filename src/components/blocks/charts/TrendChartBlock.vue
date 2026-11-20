<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import type { ScriptableContext } from 'chart.js'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
type AreaVariant = 'Basic' | 'Gradient' | 'Step' | 'Smooth'
const variants: AreaVariant[] = ['Basic', 'Gradient', 'Step', 'Smooth']
const variant = shallowRef<AreaVariant>('Gradient')
const labels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
const values = [12.4, 14.8, 13.9, 17.2, 18.6, 21.4]
const background = (context: ScriptableContext<'line'>) => {
  if (variant.value !== 'Gradient' || !context.chart.chartArea) return `${theme.value.kale}20`
  const gradient = context.chart.ctx.createLinearGradient(
    0,
    context.chart.chartArea.top,
    0,
    context.chart.chartArea.bottom,
  )
  gradient.addColorStop(0, `${theme.value.kale}55`)
  gradient.addColorStop(1, `${theme.value.kale}00`)
  return gradient
}
const data = computed(() => ({
  labels,
  datasets: [
    {
      label: 'Revenue',
      data: values,
      borderColor: theme.value.kale,
      backgroundColor: background,
      fill: true,
      stepped: variant.value === 'Step',
      tension: variant.value === 'Smooth' || variant.value === 'Gradient' ? 0.35 : 0,
      pointRadius: 3,
      pointHoverRadius: 5,
    },
  ],
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: ({ raw }: { raw: unknown }) => `Ksh ${raw}M` } },
  },
  scales: {
    x: { ticks: { color: theme.value.muted }, grid: { display: false } },
    y: {
      beginAtZero: true,
      ticks: { color: theme.value.muted, callback: (value: string | number) => `${value}M` },
      grid: { color: theme.value.border },
    },
  },
}))
</script>

<template>
  <Card>
    <template #title><h3 class="text-lg font-medium">Revenue trend</h3></template>
    <template #subtitle>Monthly revenue · June–November 2026</template>
    <template #content>
      <SelectButton
        v-model="variant"
        :options="variants"
        :allowEmpty="false"
        size="small"
        aria-label="Area chart variant"
        class="mb-4"
      />
      <Chart
        type="line"
        :data="data"
        :options="options"
        :canvasProps="{
          role: 'img',
          'aria-label':
            'Monthly revenue increased from Ksh 12.4 million in June to Ksh 21.4 million in November.',
        }"
        class="h-72"
      />
      <table class="sr-only">
        <caption>
          Monthly revenue in millions of Kenyan shillings
        </caption>
        <tbody>
          <tr v-for="(label, index) in labels" :key="label">
            <th scope="row">{{ label }}</th>
            <td>{{ values[index] }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </Card>
</template>
