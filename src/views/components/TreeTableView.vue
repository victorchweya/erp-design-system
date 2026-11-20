<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/TreeTableExample.vue'
import code from '@/components/docs/examples/TreeTableExample.vue?raw'
import SelectionExample from '@/components/docs/examples/TreeTableSelectionExample.vue'
import selectionCode from '@/components/docs/examples/TreeTableSelectionExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Expand a category to see the quantity of each product in it.',
    component: Example,
    code: code,
  },
  {
    id: 'checkbox-selection',
    title: 'Checkbox selection',
    description:
      'Choose stock for a transfer. Ticking a location ticks every product in it, and the total updates as the selection changes.',
    component: SelectionExample,
    code: selectionCode,
  },
]
const api = [
  {
    name: 'value',
    type: 'TreeNode[]',
    default: '-',
    description:
      'Root nodes. Each node needs a unique key, a data object for the columns and optional children.',
  },
  {
    name: 'selectionMode',
    type: "'single' | 'multiple' | 'checkbox'",
    default: '-',
    description: 'How rows are selected. Checkbox mode adds a checkbox to the expander column.',
  },
  {
    name: 'selectionKeys',
    type: 'TreeTableSelectionKeys',
    default: '-',
    description:
      'Selected rows keyed by node key. Checkbox mode stores { checked, partialChecked } for each node. Use with v-model:selectionKeys.',
  },
  {
    name: 'expandedKeys',
    type: 'TreeTableExpandedKeys',
    default: '-',
    description: 'Expanded rows keyed by node key. Use with v-model:expandedKeys.',
  },
  {
    name: 'lazy',
    type: 'boolean',
    default: 'false',
    description:
      'Leaves paging, sorting and loading children to the server through the page, sort and node-expand events.',
  },
  {
    name: 'tableProps',
    type: 'object',
    default: '-',
    description:
      "Attributes for the table element. Use it to give the table an accessible name with 'aria-label'.",
  },
  {
    name: 'size',
    type: "'small' | 'large'",
    default: '-',
    description: 'Row density. Use small for dense ERP views.',
  },
]
const accessibility = [
  "The table has role treegrid. Name it with tableProps, for example { 'aria-label': 'Inventory by category' }. Rows report aria-level, aria-expanded and, when selectable, aria-selected or aria-checked.",
  'Rows take focus. Up and Down Arrow move between rows, Right Arrow expands, Left Arrow collapses or moves to the parent, and Enter or Space selects or ticks the row.',
  'Mark exactly one column as expander, usually the name column, so the hierarchy has a clear anchor.',
  'Show a summary of the selection in text, as in the checkbox example, so people can check what they picked before acting on it.',
]
</script>

<template>
  <ComponentDoc
    title="TreeTable"
    componentName="TreeTable"
    category="Data"
    description="Show hierarchical records in columns, such as stock grouped by location or category."
    usage="TreeTable combines keyed tree nodes with Column definitions. Put each row's values in node.data and mark the name column as expander. Use DataTable with row grouping when the hierarchy has only one level."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/treetable"
  />
</template>
