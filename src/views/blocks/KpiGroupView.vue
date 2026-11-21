<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import KpiGroupBlock from '@/components/blocks/metrics/KpiGroupBlock.vue'
import code from '@/components/blocks/metrics/KpiGroupBlock.vue?raw'

const examples = [
  {
    id: 'kpi-group',
    title: 'KPI group',
    description: 'A responsive set of related values for quick comparison.',
    component: KpiGroupBlock,
    code,
    mobilePreview: true,
  },
]
</script>

<template>
  <BlockDoc
    title="KPI group"
    description="Related operational values arranged for scanning and comparison."
    :usage="[
      'Keep all values in a group within the same scope and time period.',
      'Use two columns where space allows and let cards stack in narrow containers.',
    ]"
    :examples="examples"
  />
</template>
