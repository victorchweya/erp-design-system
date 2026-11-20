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
    description:
      'An invalid border should always be accompanied by a reason that is linked to the field.',
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
    name: 'optionValue',
    type: 'string | Function',
    default: '—',
    description: 'Field or function used for the stored values.',
  },
  {
    name: 'display',
    type: '"comma" | "chip"',
    default: 'comma',
    description: 'Show selected items as text or as removable chips.',
  },
  {
    name: 'maxSelectedLabels',
    type: 'number',
    default: '—',
    description: 'Collapse the label to a count after this many selections.',
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
  'MultiSelect focuses a hidden input with the combobox role. Name it with a label whose for matches inputId, or with aria-labelledby.',
  'Attributes such as aria-describedby set on MultiSelect go to the wrapper. Pass them to the combobox with pt.hiddenInput so the error message is announced.',
  'Enter or Down arrow opens the list. Space toggles the focused option, and Escape closes the list. Each chip has its own remove control.',
]
</script>

<template>
  <ComponentDoc
    title="MultiSelect"
    category="Form"
    description="Choose several items from a dropdown list."
    usage="Bind an array with v-model. Display selected values as chips and use filter for larger lists."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/multiselect"
  />
</template>
