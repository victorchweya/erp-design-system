<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import MetricGroupBlock from '@/components/blocks/metrics/MetricGroupBlock.vue'
import code from '@/components/blocks/metrics/MetricGroupBlock.vue?raw'

const examples = [
  {
    id: 'metric-group',
    title: 'Metric group',
    description: 'A titled section for metrics that share one subject and reporting period.',
    component: MetricGroupBlock,
    code,
    mobilePreview: true,
  },
]
</script>

<template>
  <BlockDoc
    title="Metric group"
    description="A dashboard section that gives related metrics shared context."
    :usage="[
      'Name the subject once in the section header instead of repeating it in every card.',
      'Place shared filters in the section header when the group needs its own reporting scope.',
    ]"
    :examples="examples"
  />
</template>
