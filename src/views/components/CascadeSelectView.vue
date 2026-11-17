<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import CascadeSelectExample from '@/components/docs/examples/CascadeSelectExample.vue'
import code0 from '@/components/docs/examples/CascadeSelectExample.vue?raw'
import CascadeSelectStatesExample from '@/components/docs/examples/CascadeSelectStatesExample.vue'
import code1 from '@/components/docs/examples/CascadeSelectStatesExample.vue?raw'
const examples = [
  {
    id: 'cascade-select-0',
    title: 'Nested choices',
    description: 'Choose a category, type, then produce item.',
    component: CascadeSelectExample,
    code: code0,
  },
  {
    id: 'cascade-select-1',
    title: 'Invalid and disabled',
    description: 'Keep the hierarchy short enough to navigate comfortably.',
    component: CascadeSelectStatesExample,
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
    name: 'optionGroupLabel',
    type: 'string | Function',
    default: '—',
    description: 'Field or function used for group headings.',
  },
  {
    name: 'optionGroupChildren',
    type: 'string | string[] | Function',
    default: '—',
    description: 'Child-array keys from outer to inner group.',
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
  {
    name: 'fluid',
    type: 'boolean',
    default: 'null',
    description: 'Fill the available width.',
  },
]
const accessibility = [
  'Give every field a visible label. Match label for to id on native inputs or inputId on composite controls.',
  'Use help text for expected values and an associated error message for invalid fields. Keep the theme\u2019s visible focus and native keyboard behavior.',
  'Arrow keys navigate and expand groups; Escape closes the menu. Use meaningful labels at every level.',
]
</script>

<template>
  <ComponentDoc
    title="CascadeSelect"
    category="Forms"
    description="Choose a final item from a small, ordered hierarchy."
    usage="Set optionGroupChildren in hierarchy order. Group labels describe each level; optionLabel describes the selectable leaf."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/cascadeselect"
  />
</template>
