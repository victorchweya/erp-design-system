<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import KnobExample from '@/components/docs/examples/KnobExample.vue'
import code0 from '@/components/docs/examples/KnobExample.vue?raw'
const examples = [
  {
    id: 'knob-0',
    title: 'Adjustable and read-only values',
    description: 'Both the Knob and the buttons enforce the same 0\u2013100 range.',
    component: KnobExample,
    code: code0,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'number',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'size',
    type: 'number',
    default: '100',
    description: 'Diameter in pixels.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    default: 'false',
    description: 'Display the value without allowing edits.',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    description: 'Amount added or removed per step.',
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
]
const accessibility = [
  'Give the control a visible label and include units.',
  'Arrow keys adjust the value. Use readonly for display-only data and disabled for an unavailable control.',
]
</script>

<template>
  <ComponentDoc
    title="Knob"
    category="Forms"
    description="Adjust or display one bounded numeric value in a circular control."
    usage="Use min, max, and step for the range. Keep explicit increment actions when they make the value easier to adjust."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/knob"
  />
</template>
