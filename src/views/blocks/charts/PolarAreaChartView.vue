<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import PolarAreaChartBlock from '@/components/blocks/charts/PolarAreaChartBlock.vue'
import code from '@/components/blocks/charts/PolarAreaChartBlock.vue?raw'
const examples = [
  {
    id: 'polar-area',
    title: 'Polar area chart',
    description: 'Compare a small set of values by radial length.',
    component: PolarAreaChartBlock,
    code,
    mobilePreview: true,
  },
]
</script>
<template>
  <BlockDoc
    title="Polar area"
    description="Radial comparison for a compact set of similarly scaled measures."
    :usage="[
      'Use measures that share a comparable scale.',
      'Prefer bars when precise comparison or long labels matter.',
    ]"
    :examples="examples"
  />
</template>
