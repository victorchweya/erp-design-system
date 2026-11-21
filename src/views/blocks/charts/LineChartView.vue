<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import LineChartBlock from '@/components/blocks/charts/LineChartBlock.vue'
import code from '@/components/blocks/charts/LineChartBlock.vue?raw'
const examples = [
  {
    id: 'line',
    title: 'Line chart',
    description: 'Compare one or more measures across a continuous time scale.',
    component: LineChartBlock,
    code,
    mobilePreview: true,
  },
]
</script>
<template>
  <BlockDoc
    title="Line chart"
    description="Time-series trends without an area fill."
    :usage="[
      'Use consistent intervals and avoid more series than the legend can explain quickly.',
      'Do not smooth lines when interpolation could hide meaningful changes.',
    ]"
    :examples="examples"
  />
</template>
