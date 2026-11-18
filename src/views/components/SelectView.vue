<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import SelectExample from '@/components/docs/examples/SelectExample.vue'
import code0 from '@/components/docs/examples/SelectExample.vue?raw'
import SelectStatesExample from '@/components/docs/examples/SelectStatesExample.vue'
import code1 from '@/components/docs/examples/SelectStatesExample.vue?raw'
const examples = [
  {
    id: 'select-0',
    title: 'Filter and clear',
    description: 'The model stores the option value while the label remains readable.',
    component: SelectExample,
    code: code0,
  },
  {
    id: 'select-1',
    title: 'Invalid and disabled',
    description:
      'Use disabled for unavailable controls and invalid for a value that needs correction.',
    component: SelectStatesExample,
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
    name: 'fluid',
    type: 'boolean',
    default: '—',
    description: 'Fill the available width.',
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
    name: 'filter',
    type: 'boolean',
    default: 'false',
    description: 'Show a search field for the options.',
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
    name: 'showClear',
    type: 'boolean',
    default: 'false',
    description: 'Show a control to clear the value.',
  },
]
const accessibility = [
  'Give every field a visible label. Match label for to id on native inputs or inputId on composite controls.',
  'Use help text for expected values and an associated error message for invalid fields. Keep the theme\u2019s visible focus and native keyboard behavior.',
  'Arrow keys move through options, Enter selects, and Escape closes the list.',
]
</script>

<template>
  <ComponentDoc
    title="Select"
    category="Form"
    description="Choose one item from a list of options."
    usage="Bind a single value with v-model. Use optionLabel and optionValue for objects, filter for longer lists, and showClear when the selection is optional."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/select"
  />
</template>
