<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/TreeTableExample.vue'
import code from '@/components/docs/examples/TreeTableExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Expand categories to see inventory quantities.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'value', type: 'TreeNode[]', default: '-', description: 'An array of treenodes.' },
]
const accessibility = ['Keep the expander column labelled and retain native keyboard navigation.']
</script>

<template>
  <ComponentDoc
    title="TreeTable"
    componentName="TreeTable"
    category="Data"
    description="Expand categories to see inventory quantities."
    usage="combines keyed tree nodes with Column definitions. Mark the tree column as expander."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/treetable"
  />
</template>
