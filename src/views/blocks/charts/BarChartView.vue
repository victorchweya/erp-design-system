<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import ComparisonChartBlock from '@/components/blocks/charts/ComparisonChartBlock.vue'
import code from '@/components/blocks/charts/ComparisonChartBlock.vue?raw'
const examples = [
  {
    id: 'bar',
    title: 'Bar chart',
    description: 'Compare vertical, horizontal, grouped, and stacked bar variants.',
    component: ComparisonChartBlock,
    code,
    mobilePreview: true,
  },
]
</script>
<template>
  <BlockDoc
    title="Bar chart"
    description="Category comparisons using proportional bar lengths."
    :usage="[
      'Start bar scales at zero and sort categories when rank matters.',
      'Use horizontal bars for long category labels and stacked bars only when both totals and composition matter.',
    ]"
    :examples="examples"
  />
</template>
