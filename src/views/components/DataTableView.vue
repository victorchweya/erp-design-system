<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/DataTableExample.vue'
import code from '@/components/docs/examples/DataTableExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Sort and page through a collection of produce.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'null | readonly T[]',
    default: '-',
    description: 'An array of objects to display.',
  },
  {
    name: 'dataKey',
    type: 'keyof T | Function',
    default: '-',
    description: 'Name of the field that uniquely identifies the a record in the data.',
  },
  {
    name: 'rows',
    type: 'number',
    default: '0',
    description: 'Number of rows to display per page.',
  },
  {
    name: 'paginator',
    type: 'boolean',
    default: 'false',
    description: 'When specified as true, enables the pagination.',
  },
]
const accessibility = [
  'Give the table an accessible name and use meaningful column headers.',
  'Use the native sorting and pagination controls with the keyboard.',
]
</script>

<template>
  <ComponentDoc
    title="DataTable"
    componentName="DataTable"
    category="Data"
    description="Sort and page through a collection of produce."
    usage="binds rows with value and defines cells with Column. Use small sizing and gridlines for reference tables."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/datatable"
  />
</template>
