<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import TrendChartBlock from '@/components/blocks/charts/TrendChartBlock.vue'
import code from '@/components/blocks/charts/TrendChartBlock.vue?raw'
const examples = [
  {
    id: 'area',
    title: 'Area chart',
    description: 'Compare basic, gradient, stepped, and smooth area treatments.',
    component: TrendChartBlock,
    code,
    mobilePreview: true,
  },
]
</script>
<template>
  <BlockDoc
    title="Area chart"
    description="Filled trend charts that emphasise change over time."
    :usage="[
      'Use area charts for continuous time series where the magnitude matters.',
      'Keep overlapping filled series to a minimum and label the unit clearly.',
    ]"
    :examples="examples"
  />
</template>
