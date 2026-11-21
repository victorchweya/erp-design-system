<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import ComposedChartBlock from '@/components/blocks/charts/ComposedChartBlock.vue'
import code from '@/components/blocks/charts/ComposedChartBlock.vue?raw'
const examples = [
  {
    id: 'composed',
    title: 'Composed chart',
    description: 'Combine bars and lines when related measures need different visual encodings.',
    component: ComposedChartBlock,
    code,
    mobilePreview: true,
  },
]
</script>
<template>
  <BlockDoc
    title="Composed chart"
    description="Related measures combined in one coordinated chart."
    :usage="[
      'Limit composed charts to measures with a clear relationship.',
      'Label separate axes and keep series colours consistent with other charts.',
    ]"
    :examples="examples"
  />
</template>
