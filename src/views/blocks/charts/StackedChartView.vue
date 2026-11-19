<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import CompositionChartBlock from '@/components/blocks/charts/CompositionChartBlock.vue'
import code from '@/components/blocks/charts/CompositionChartBlock.vue?raw'
const examples = [
  {
    id: 'stacked',
    title: 'Stacked chart',
    description: 'Compare totals while showing how each total is composed.',
    component: CompositionChartBlock,
    code,
    mobilePreview: true,
  },
]
</script>
<template>
  <BlockDoc
    title="Stacked Chart"
    description="Composition and total change across categories or time."
    :usage="[
      'Keep stack order and colours consistent across every bar.',
      'Use a 100% stack only when proportion matters more than the total.',
    ]"
    :examples="examples"
  />
</template>
