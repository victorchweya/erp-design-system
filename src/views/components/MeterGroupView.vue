<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/MeterGroupExample.vue'
import code from '@/components/docs/examples/MeterGroupExample.vue?raw'
import MeterGroupUnitsExample from '@/components/docs/examples/MeterGroupUnitsExample.vue'
import unitsCode from '@/components/docs/examples/MeterGroupUnitsExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Values are percentages of the default 0–100 range. The start slot adds a visible name and total, and the meter is labelled by that name.',
    component: Example,
    code: code,
  },
  {
    id: 'units',
    title: 'Units and custom labels',
    description:
      'Set max to the real capacity and keep values in their own unit. The label slot shows kilograms instead of the default percentages.',
    component: MeterGroupUnitsExample,
    code: unitsCode,
  },
]
const api = [
  {
    name: 'value',
    type: 'MeterItem[]',
    default: '—',
    description: 'Items with label, value, color, and an optional icon.',
  },
  { name: 'min', type: 'number', default: '0', description: 'Minimum boundary value.' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum boundary value.' },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: 'horizontal',
    description: 'Direction of the meter bar.',
  },
  {
    name: 'labelPosition',
    type: "'start' | 'end'",
    default: 'end',
    description: 'Places the label list before or after the meters.',
  },
  {
    name: 'labelOrientation',
    type: "'horizontal' | 'vertical'",
    default: 'horizontal',
    description: 'Lays out the label list in a row or a column.',
  },
]
const accessibility = [
  'MeterGroup has a meter role with aria-valuemin, aria-valuemax, and aria-valuenow set to the total percentage. Name it with aria-labelledby pointing to visible text.',
  'When max is not 100, aria-valuenow is still a percentage while aria-valuemax is the raw maximum. Add aria-valuetext with the real amount, as in the units example.',
  'Keep every label and value visible as text. Colour alone must not identify each segment.',
  'MeterGroup is not interactive and has no keyboard behaviour.',
]
</script>

<template>
  <ComponentDoc
    title="MeterGroup"
    componentName="MeterGroup"
    category="Misc"
    description="Show how several values contribute to a total within a known range."
    usage="takes an array of labelled values and a known min and max. Use it for capacity and allocation. Use ProgressBar for the progress of a single task."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/metergroup"
  />
</template>
