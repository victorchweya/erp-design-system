<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/StepperExample.vue'
import code from '@/components/docs/examples/StepperExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Guide users through a short delivery workflow.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'string | number',
    default: 'null',
    description: 'Active value of stepper.',
  },
]
const accessibility = [
  'Keep steps in a logical order. Validate required fields before advancing in a real form.',
]
</script>

<template>
  <ComponentDoc
    title="Stepper"
    componentName="Stepper"
    category="Panel"
    description="Guide users through a short delivery workflow."
    usage="connects Step and StepPanel with matching values. Next and Back call the panel\u2019s activateCallback."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/stepper"
  />
</template>
