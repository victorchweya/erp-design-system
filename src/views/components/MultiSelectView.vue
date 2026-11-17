<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import MultiSelectExample from '@/components/docs/examples/MultiSelectExample.vue'
import code0 from '@/components/docs/examples/MultiSelectExample.vue?raw'
import MultiSelectStatesExample from '@/components/docs/examples/MultiSelectStatesExample.vue'
import code1 from '@/components/docs/examples/MultiSelectStatesExample.vue?raw'
const examples = [
  {
    id: 'multi-select-0',
    title: 'Multiple selections',
    description: 'Users can select, filter, and remove several produce items.',
    component: MultiSelectExample,
    code: code0,
  },
  {
    id: 'multi-select-1',
    title: 'Invalid and disabled',
    description: 'An invalid border should always be accompanied by a reason.',
    component: MultiSelectStatesExample,
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
    name: 'fluid',
    type: 'boolean',
    default: 'null',
    description: 'Fill the available width.',
  },
  {
    name: 'filter',
    type: 'boolean',
    default: 'false',
    description: 'Show a search field for the options.',
  },
]
const accessibility = [
  'Give every field a visible label. Match label for to id on native inputs or inputId on composite controls.',
  'Use help text for expected values and an associated error message for invalid fields. Keep the theme\u2019s visible focus and native keyboard behavior.',
  'Keep the selected count available. Use the native keyboard selection and popup behavior.',
]
</script>

<template>
  <ComponentDoc
    title="MultiSelect"
    category="Forms"
    description="Choose several items from a dropdown list."
    usage="Bind an array with v-model. Display selected values as chips and use filter for larger lists."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/multiselect"
  />
</template>
