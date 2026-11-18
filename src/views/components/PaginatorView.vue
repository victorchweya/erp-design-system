<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/PaginatorExample.vue'
import code from '@/components/docs/examples/PaginatorExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Move between pages and change the page size.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'totalRecords', type: 'number', default: '0', description: 'Number of total records.' },
  { name: 'rows', type: 'number', default: '0', description: 'Data count to display per page.' },
  {
    name: 'first',
    type: 'number',
    default: '0',
    description: 'Zero-relative number of the first row to be displayed.',
  },
  {
    name: 'rowsPerPageOptions',
    type: 'number[]',
    default: '-',
    description: 'Array of integer values to display inside rows per page dropdown.',
  },
]
const accessibility = [
  'Keep the paginator near the content it controls. Native controls expose their labels and current page.',
]
</script>

<template>
  <ComponentDoc
    title="Paginator"
    componentName="Paginator"
    category="Data"
    description="Move between pages and change the page size."
    usage="uses a zero-based first record index. Slice local data or fetch the requested page in your application."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/paginator"
  />
</template>
