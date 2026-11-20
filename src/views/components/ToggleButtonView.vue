<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import ToggleButtonExample from '@/components/docs/examples/ToggleButtonExample.vue'
import code0 from '@/components/docs/examples/ToggleButtonExample.vue?raw'
const examples = [
  {
    id: 'toggle-button-0',
    title: 'Pressed and disabled states',
    description:
      'Keep the same label in both states and let the pressed styling, an icon and aria-pressed show the state.',
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
    name: 'onLabel',
    type: 'string',
    default: 'yes',
    description: 'Label shown when pressed.',
  },
  {
    name: 'offLabel',
    type: 'string',
    default: 'no',
    description: 'Label shown when not pressed.',
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
    type: '"small" | "large"',
    default: '—',
    description: 'Control size; omit for the default.',
  },
]
const accessibility = [
  'Set onLabel and offLabel to the same text. A label that changes with the state, such as Save and Saved, makes the pressed state ambiguous and breaks voice control.',
  'The component sets aria-pressed. Tab focuses it, and Space or Enter toggles it. Mark decorative icons in the icon slot with aria-hidden.',
]
</script>

<template>
  <ComponentDoc
    title="ToggleButton"
    category="Form"
    description="Represent a persistent on or off choice as a button."
    usage="Bind a boolean value. onLabel and offLabel default to yes and no, so always set both. Use the icon slot to show the state, and a normal Button for one-time actions."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/togglebutton"
  />
</template>
