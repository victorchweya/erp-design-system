<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import SelectButtonExample from '@/components/docs/examples/SelectButtonExample.vue'
import code0 from '@/components/docs/examples/SelectButtonExample.vue?raw'
import SelectButtonStatesExample from '@/components/docs/examples/SelectButtonStatesExample.vue'
import code1 from '@/components/docs/examples/SelectButtonStatesExample.vue?raw'
const examples = [
  {
    id: 'select-button-0',
    title: 'Single and multiple selection',
    description: 'Keep option labels short enough to fit the available width.',
    component: SelectButtonExample,
    code: code0,
  },
  {
    id: 'select-button-1',
    title: 'Invalid and disabled',
    description: 'Use a Select dropdown when the number of choices becomes too large.',
    component: SelectButtonStatesExample,
    code: code1,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'any',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'options',
    type: 'any[]',
    default: '—',
    description: 'Available choices.',
  },
  {
    name: 'optionLabel',
    type: 'string | Function',
    default: '—',
    description: 'Field or function used for the visible option label.',
  },
  {
    name: 'optionValue',
    type: 'string | Function',
    default: '—',
    description: 'Field or function used for the stored value.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: 'Allow more than one selection.',
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
  'Name the group with aria-labelledby and keep readable text for each option.',
  'Each option announces its pressed state. Tab and Space operate the buttons.',
]
</script>

<template>
  <ComponentDoc
    title="SelectButton"
    category="Form"
    description="Choose between a small number of visible alternatives."
    usage="Use one model value for exclusive selection or an array with multiple. Set allowEmpty to false when one choice must remain selected."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/selectbutton"
  />
</template>
