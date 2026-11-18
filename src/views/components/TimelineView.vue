<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/TimelineExample.vue'
import code from '@/components/docs/examples/TimelineExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Track an order from placement to delivery.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'value', type: 'any[]', default: '-', description: 'An array of events to display.' },
]
const accessibility = [
  'Include status names and times in text rather than relying on marker colours.',
]
</script>

<template>
  <ComponentDoc
    title="Timeline"
    componentName="Timeline"
    category="Data"
    description="Track an order from placement to delivery."
    usage="renders the event list through the content slot."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/timeline"
  />
</template>
