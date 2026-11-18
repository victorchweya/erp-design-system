<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import RadioButtonExample from '@/components/docs/examples/RadioButtonExample.vue'
import code0 from '@/components/docs/examples/RadioButtonExample.vue?raw'
import RadioButtonStatesExample from '@/components/docs/examples/RadioButtonStatesExample.vue'
import code1 from '@/components/docs/examples/RadioButtonStatesExample.vue?raw'
const examples = [
  {
    id: 'radio-button-0',
    title: 'Exclusive selection',
    description: 'Choosing another delivery method replaces the previous selection.',
    component: RadioButtonExample,
    code: code0,
  },
  {
    id: 'radio-button-1',
    title: 'Invalid and disabled',
    description: 'Use one error message for the group when a selection is required.',
    component: RadioButtonStatesExample,
    code: code1,
  },
]
const api = [
  {
    name: 'value',
    type: 'any',
    default: '—',
    description: 'Value represented by this item.',
  },
  {
    name: 'modelValue',
    type: 'any',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'name',
    type: 'string',
    default: '—',
    description: 'Field name used by the form.',
  },
  {
    name: 'size',
    type: 'any',
    default: '—',
    description: 'Control size; omit for the default.',
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
  'Link every radio button to its own visible label.',
  'Tab enters the group. Arrow keys move between options and Space selects.',
]
</script>

<template>
  <ComponentDoc
    title="RadioButton"
    category="Form"
    description="Choose exactly one option from a visible group."
    usage="Give every option the same model and name, a distinct value, and a distinct inputId. Use a fieldset and legend to describe the decision."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/radiobutton"
  />
</template>
