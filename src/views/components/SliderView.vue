<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import SliderExample from '@/components/docs/examples/SliderExample.vue'
import code0 from '@/components/docs/examples/SliderExample.vue?raw'
import SliderStatesExample from '@/components/docs/examples/SliderStatesExample.vue'
import code1 from '@/components/docs/examples/SliderStatesExample.vue?raw'
const examples = [
  {
    id: 'slider-0',
    title: 'Value and range',
    description: 'The numeric input and slider share one value and the same limits.',
    component: SliderExample,
    code: code0,
  },
  {
    id: 'slider-1',
    title: 'Invalid and disabled',
    description: 'Pair invalid styling with a message that explains the allowed range.',
    component: SliderStatesExample,
    code: code1,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'number | number[]',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    description: 'Minimum allowed value.',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'Maximum allowed value.',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    description: 'Amount added or removed per step.',
  },
  {
    name: 'range',
    type: 'boolean',
    default: 'false',
    description: 'Select two bounds rather than one value.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Show the error state.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
  },
]
const accessibility = [
  'Name each slider and display its current value and units.',
  'Arrow keys adjust values; Home and End move to limits. Offer a typed alternative for precision.',
]
</script>

<template>
  <ComponentDoc
    title="Slider"
    category="Forms"
    description="Adjust a value or range within known limits."
    usage="Set min, max, and step. Provide a numeric input alongside a slider when users need to enter a precise value."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/slider"
  />
</template>
