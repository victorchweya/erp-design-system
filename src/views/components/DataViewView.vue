<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/DataViewExample.vue'
import code from '@/components/docs/examples/DataViewExample.vue?raw'
import LayoutExample from '@/components/docs/examples/DataViewLayoutExample.vue'
import layoutCode from '@/components/docs/examples/DataViewLayoutExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Render the current page of records through the list slot.',
    component: Example,
    code: code,
  },
  {
    id: 'layout',
    title: 'List and grid layouts',
    description:
      'Let people switch a product catalogue between a list and a grid with a SelectButton. Search filters the records, and the empty slot explains when nothing matches.',
    component: LayoutExample,
    code: layoutCode,
  },
]
const api = [
  {
    name: 'value',
    type: 'null | T[]',
    default: '-',
    description: 'Records to display.',
  },
  {
    name: 'layout',
    type: "'list' | 'grid'",
    default: 'list',
    description:
      'Which slot renders the records. Provide both list and grid slots when people can switch.',
  },
  {
    name: 'dataKey',
    type: 'string',
    default: '-',
    description: 'Field that uniquely identifies each record.',
  },
  {
    name: 'paginator',
    type: 'boolean',
    default: 'false',
    description: 'Shows a paginator under the records.',
  },
  {
    name: 'rows',
    type: 'number',
    default: '0',
    description: 'Records per page.',
  },
  {
    name: 'first',
    type: 'number',
    default: '0',
    description:
      'Index of the first record on the page. Use v-model:first to reset paging when filters change.',
  },
  {
    name: 'lazy',
    type: 'boolean',
    default: 'false',
    description:
      'Leaves paging to the server. Load each page from the page event and set totalRecords.',
  },
]
const accessibility = [
  'DataView adds no roles to your content. Render records as a list with ul and li, and use headings that fit the surrounding page.',
  'Build the layout switch from a SelectButton with visible text or an aria-label on each option. SelectButton reports the chosen layout with aria-pressed.',
  'Keep the same information in both layouts. Grid cards must not drop details that the list shows.',
  'The paginator buttons are labelled from the PrimeVue locale. See Paginator for its keyboard support.',
]
</script>

<template>
  <ComponentDoc
    title="DataView"
    componentName="DataView"
    category="Data"
    description="Show a paged collection of records with your own list or grid layout."
    usage="DataView binds records with value and renders each page through the list or grid slot. Use it for cards and catalogues; use DataTable when people need to compare values across columns."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/dataview"
  />
</template>
