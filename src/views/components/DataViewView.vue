<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/DataViewExample.vue'
import code from '@/components/docs/examples/DataViewExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'A paginated list with custom item content.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'null | T[]',
    default: '-',
    description: 'An array of objects to display.',
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
  'Use list markup for collections and headings that fit the surrounding page.',
]
</script>

<template>
  <ComponentDoc
    title="DataView"
    componentName="DataView"
    category="Data"
    description="A paginated list with custom item content."
    usage="uses the list slot to render the current page of items."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/dataview"
  />
</template>
