<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import ProportionChartBlock from '@/components/blocks/charts/ProportionChartBlock.vue'
import code from '@/components/blocks/charts/ProportionChartBlock.vue?raw'
const examples = [
  {
    id: 'doughnut-pie',
    title: 'Doughnut chart',
    description: 'Show a small number of categories as parts of a whole.',
    component: ProportionChartBlock,
    code,
    mobilePreview: true,
  },
]
</script>
<template>
  <BlockDoc
    title="Doughnut & pie"
    description="Part-to-whole comparisons for a small number of categories."
    :usage="[
      'Use no more than five slices and display the total or percentages nearby.',
      'Use bars when differences between slices are small or precise comparison matters.',
    ]"
    :examples="examples"
  />
</template>
