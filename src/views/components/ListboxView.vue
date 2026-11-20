<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import ListboxExample from '@/components/docs/examples/ListboxExample.vue'
import code0 from '@/components/docs/examples/ListboxExample.vue?raw'
import ListboxStatesExample from '@/components/docs/examples/ListboxStatesExample.vue'
import code1 from '@/components/docs/examples/ListboxStatesExample.vue?raw'
const examples = [
  {
    id: 'listbox-0',
    title: 'Single and multiple selection',
    description: 'A visible list works well when there is room to scan the choices.',
    component: ListboxExample,
    code: code0,
  },
  {
    id: 'listbox-1',
    title: 'Invalid and disabled',
    description:
      'Link the error to the list itself. A disabled list keeps the current value readable.',
    component: ListboxStatesExample,
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
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: 'Allow more than one selection.',
  },
  {
    name: 'metaKeySelection',
    type: 'boolean',
    default: 'false',
    description: 'Require Ctrl or Cmd to add to a multiple selection.',
  },
  {
    name: 'optionLabel',
    type: 'string | Function',
    default: '—',
    description: 'Field or function used for the visible option label.',
  },
  {
    name: 'filter',
    type: 'boolean',
    default: 'false',
    description: 'Show a search field for the options.',
  },
]
const accessibility = [
  'Name each list with aria-labelledby or aria-label. Arrow keys move through options and Space selects.',
  'Attributes such as aria-describedby set on Listbox go to the wrapper. Pass them to the list element with pt.list so the error message is announced.',
  'For multiple selection, explain whether users need a modifier key, or set metaKeySelection to false so each click toggles an item.',
]
</script>

<template>
  <ComponentDoc
    title="Listbox"
    category="Form"
    description="Keep selectable options visible without opening a popup."
    usage="Use a single value by default or an array with multiple. Turn off metaKeySelection when each item should toggle independently."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/listbox"
  />
</template>
