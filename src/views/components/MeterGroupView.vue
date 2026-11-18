<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/MeterGroupExample.vue'
import code from '@/components/docs/examples/MeterGroupExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Show how several values contribute to a total.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'MeterItem[]',
    default: '-',
    description: 'Current value of the metergroup.',
  },
  { name: 'max', type: 'number', default: '100', description: 'Maximum boundary value.' },
]
const accessibility = [
  'Keep values and labels visible. Colour alone must not identify each measurement.',
]
</script>

<template>
  <ComponentDoc
    title="MeterGroup"
    componentName="MeterGroup"
    category="Misc"
    description="Show how several values contribute to a total."
    usage="accepts labelled measurements and a known maximum."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/metergroup"
  />
</template>
