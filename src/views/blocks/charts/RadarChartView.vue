<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import RadarChartBlock from '@/components/blocks/charts/RadarChartBlock.vue'
import code from '@/components/blocks/charts/RadarChartBlock.vue?raw'
const examples = [
  {
    id: 'radar',
    title: 'Radar chart',
    description: 'Compare profiles across several measures with the same scale.',
    component: RadarChartBlock,
    code,
    mobilePreview: true,
  },
]
</script>
<template>
  <BlockDoc
    title="Radar Chart"
    description="Multi-measure profiles for scorecards and target comparisons."
    :usage="[
      'Keep every axis on the same scale and limit the number of profiles.',
      'Provide the individual scores outside the chart when decisions require exact values.',
    ]"
    :examples="examples"
  />
</template>
