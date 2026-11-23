<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import KpiBlock from '@/components/blocks/metrics/KpiBlock.vue'
import code from '@/components/blocks/metrics/KpiBlock.vue?raw'

const examples = [
  {
    id: 'kpi',
    title: 'KPI',
    description: 'Use one compact value when it can stand alone without comparison.',
    component: KpiBlock,
    code,
  },
]
</script>

<template>
  <BlockDoc
    eyebrow="Components"
    title="KPI"
    description="A compact summary of one operational value."
    :usage="[
      'Use a short label, a formatted value, and one line of context. Keep the unit with the value.',
      'Use a metric card when change, status, or supporting explanation is part of the meaning.',
    ]"
    :examples="examples"
  />
</template>
