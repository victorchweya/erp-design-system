<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import MetricCardBlock from '@/components/blocks/metrics/MetricCardBlock.vue'
import code from '@/components/blocks/metrics/MetricCardBlock.vue?raw'

const examples = [
  {
    id: 'metric-card',
    title: 'Metric card',
    description: 'Add trend and update context when the value needs interpretation.',
    component: MetricCardBlock,
    code,
  },
]
</script>

<template>
  <BlockDoc
    eyebrow="Components"
    title="Metric card"
    description="A measured value with comparison, explanation, or freshness context."
    :usage="[
      'State what the comparison covers and pair direction with text or an icon, not colour alone.',
      'Show freshness only when the value can become stale or is updated independently.',
    ]"
    :examples="examples"
  />
</template>
