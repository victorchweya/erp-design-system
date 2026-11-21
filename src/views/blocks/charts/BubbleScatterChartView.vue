<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import BubbleScatterChartBlock from '@/components/blocks/charts/BubbleScatterChartBlock.vue'
import code from '@/components/blocks/charts/BubbleScatterChartBlock.vue?raw'
const examples = [
  {
    id: 'bubble-scatter',
    title: 'Bubble and scatter chart',
    description:
      'Show relationships between two measures and optionally encode a third with bubble size.',
    component: BubbleScatterChartBlock,
    code,
    mobilePreview: true,
  },
]
</script>
<template>
  <BlockDoc
    title="Bubble & scatter"
    description="Relationships, clusters, and outliers across quantitative measures."
    :usage="[
      'Label both axes with units and explain what bubble size represents.',
      'Use a table or list when users need exact values for every point.',
    ]"
    :examples="examples"
  />
</template>
