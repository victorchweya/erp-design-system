<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useChartTheme } from '@/composables/useChartTheme'

const theme = useChartTheme()
type BarVariant = 'Vertical' | 'Horizontal' | 'Grouped' | 'Stacked'
const variants: BarVariant[] = ['Vertical', 'Horizontal', 'Grouped', 'Stacked']
const variant = shallowRef<BarVariant>('Vertical')
const labels = ['Vegetables', 'Fruit', 'Herbs', 'Dry goods']
const values = [184, 132, 76, 98]
const data = computed(() => ({
  labels,
  datasets: [
    { label: 'Orders', data: values, backgroundColor: theme.value.secondary, borderRadius: 6 },
    ...(variant.value === 'Grouped' || variant.value === 'Stacked'
      ? [
          {
            label: 'Prior period',
            data: [156, 118, 69, 91],
            backgroundColor: theme.value.primary,
            borderRadius: 6,
          },
        ]
      : []),
  ],
}))
const options = computed(() => ({
  maintainAspectRatio: false,
  indexAxis: variant.value === 'Horizontal' ? ('y' as const) : ('x' as const),
  plugins: {
    legend: {
      display: variant.value === 'Grouped' || variant.value === 'Stacked',
      labels: { color: theme.value.text, usePointStyle: true },
    },
  },
  scales: {
    x: {
      stacked: variant.value === 'Stacked',
      ticks: { color: theme.value.muted },
      grid: { display: false },
    },
    y: {
      stacked: variant.value === 'Stacked',
      beginAtZero: true,
      ticks: { color: theme.value.muted, precision: 0 },
      grid: { color: theme.value.border },
    },
  },
}))
</script>

<template>
  <Card>
    <template #title><h3 class="text-lg font-medium">Orders by category</h3></template>
    <template #subtitle>Confirmed orders in November 2026</template>
    <template #content>
      <SelectButton
        v-model="variant"
        :options="variants"
        :allowEmpty="false"
        size="small"
        aria-label="Bar chart variant"
        class="mb-4"
      />
      <Chart
        type="bar"
        :data="data"
        :options="options"
        :canvasProps="{
          role: 'img',
          'aria-label': 'Vegetables had 184 orders, fruit 132, herbs 76, and dry goods 98.',
        }"
        class="h-72"
      >
        <table class="sr-only">
          <caption>
            Confirmed orders by category
          </caption>
          <tbody>
            <tr v-for="(label, index) in labels" :key="label">
              <th scope="row">{{ label }}</th>
              <td>{{ values[index] }}</td>
            </tr>
          </tbody>
        </table>
      </Chart>
    </template>
  </Card>
</template>
