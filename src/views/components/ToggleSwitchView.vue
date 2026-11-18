<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import ToggleSwitchExample from '@/components/docs/examples/ToggleSwitchExample.vue'
import code0 from '@/components/docs/examples/ToggleSwitchExample.vue?raw'
import ToggleSwitchStatesExample from '@/components/docs/examples/ToggleSwitchStatesExample.vue'
import code1 from '@/components/docs/examples/ToggleSwitchStatesExample.vue?raw'
const examples = [
  {
    id: 'toggle-switch-0',
    title: 'Boolean setting',
    description: 'Toggling this setting only affects the preview.',
    component: ToggleSwitchExample,
    code: code0,
  },
  {
    id: 'toggle-switch-1',
    title: 'Invalid and disabled',
    description: 'Use disabled when a setting cannot currently be changed.',
    component: ToggleSwitchStatesExample,
    code: code1,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'string | boolean',
    default: 'false',
    description: 'Bound value. Use v-model.',
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
  'Provide a visible label with inputId. Keep the label consistent in both states.',
  'Tab focuses the switch and Space changes it.',
]
</script>

<template>
  <ComponentDoc
    title="ToggleSwitch"
    category="Form"
    description="Turn a setting on or off with an immediate toggle."
    usage="Bind a boolean model and keep its label stable. Use Checkbox for a choice that is submitted as part of a form."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/toggleswitch"
  />
</template>
