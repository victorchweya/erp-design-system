<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import ToggleButtonExample from '@/components/docs/examples/ToggleButtonExample.vue'
import code0 from '@/components/docs/examples/ToggleButtonExample.vue?raw'
const examples = [
  {
    id: 'toggle-button-0',
    title: 'Pressed and disabled states',
    description:
      'The accessible name stays stable while the visual label changes with the pressed state.',
    component: ToggleButtonExample,
    code: code0,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'boolean',
    default: 'false',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'offLabel',
    type: 'string',
    default: 'no',
    description: 'Label shown when unselected.',
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
  {
    name: 'size',
    type: 'any',
    default: '—',
    description: 'Control size; omit for the default.',
  },
]
const accessibility = [
  'Provide a stable aria-label or aria-labelledby so changing visual labels does not obscure the control\u2019s purpose.',
  'The component announces aria-pressed. Tab focuses it and Space toggles it.',
]
</script>

<template>
  <ComponentDoc
    title="ToggleButton"
    category="Forms"
    description="Represent a persistent on or off choice as a button."
    usage="Bind a boolean value and provide labels for both states. Use a normal Button for one-time actions."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/togglebutton"
  />
</template>
