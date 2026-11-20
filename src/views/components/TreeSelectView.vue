<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import TreeSelectExample from '@/components/docs/examples/TreeSelectExample.vue'
import code0 from '@/components/docs/examples/TreeSelectExample.vue?raw'
import TreeSelectStatesExample from '@/components/docs/examples/TreeSelectStatesExample.vue'
import code1 from '@/components/docs/examples/TreeSelectStatesExample.vue?raw'
const examples = [
  {
    id: 'tree-select-0',
    title: 'Multiple tree selections',
    description:
      'Group headings are not selectable in this example; select individual produce items.',
    component: TreeSelectExample,
    code: code0,
  },
  {
    id: 'tree-select-1',
    title: 'Invalid and disabled',
    description:
      'Pass the error link and aria-invalid through inputProps; the invalid prop only changes the styling.',
    component: TreeSelectStatesExample,
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
    type: 'TreeNode[]',
    default: '—',
    description: 'Available choices.',
  },
  {
    name: 'showClear',
    type: 'boolean',
    default: 'false',
    description: 'Show a control to clear the value.',
  },
  {
    name: 'selectionMode',
    type: '"single" | "multiple" | "checkbox"',
    default: 'single',
    description: 'Single, multiple, or checkbox selection.',
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
  'TreeSelect focuses a hidden input with the combobox role. Name it with a label whose for matches inputId, or with aria-labelledby.',
  'TreeSelect does not set aria-invalid. Pass aria-invalid and aria-describedby with inputProps so the error is announced.',
  'Arrow keys move between nodes and expand or collapse branches. Space selects and Escape closes the popup.',
]
</script>

<template>
  <ComponentDoc
    title="TreeSelect"
    category="Form"
    description="Select from an expandable tree of related items."
    usage="Give each node a stable key and label. Choose single, multiple, or checkbox selection for the task, and use filter for larger trees."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/treeselect"
  />
</template>
