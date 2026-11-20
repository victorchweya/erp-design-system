<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/StepperExample.vue'
import code from '@/components/docs/examples/StepperExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Linear purchase order',
    description:
      'With linear, people move only with Next and Back. Keep Next disabled until the step is valid, and move focus to the new step’s heading.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'string | number',
    default: 'null',
    description: 'Active step. Use v-model:value to read or set it.',
  },
  {
    name: 'linear',
    type: 'boolean',
    default: 'false',
    description:
      'Disables the step headers, so people can only move with your Next and Back buttons.',
  },
  {
    name: 'Step value / StepPanel value',
    type: 'string | number',
    default: '—',
    description: 'Links a step header to its panel.',
  },
  {
    name: 'Step disabled',
    type: 'boolean',
    default: 'false',
    description: 'Stops people from opening a step that is not available yet.',
  },
  {
    name: 'StepPanel activateCallback',
    type: '(value: string | number) => void',
    default: '—',
    description: 'Slot function that moves to another step. Call it from Next and Back.',
  },
]
const accessibility = [
  'Step headers are buttons with role="tab" and aria-current on the active step; panels have role="tabpanel".',
  'Keep steps few and in a logical order. Validate a step before moving on and show errors next to the fields, not only on the last step.',
  'Stepper does not move focus when the step changes, and the button that was pressed disappears. Focus the new step’s heading, as the example does.',
]
</script>

<template>
  <ComponentDoc
    title="Stepper"
    componentName="Stepper"
    category="Panel"
    description="Guide people through a short task split into ordered steps."
    usage="Stepper connects Step and StepPanel with matching values inside StepList and StepPanels. Next and Back call the panel’s activateCallback. Use it for three to five steps, such as creating a purchase order."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/stepper"
  />
</template>
