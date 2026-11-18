<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/OrganizationChartExample.vue'
import code from '@/components/docs/examples/OrganizationChartExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Show how operational teams relate to each other.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'OrganizationChartNode | OrganizationChartNode[]',
    default: '-',
    description: 'Value of the component. Accepts a single root node or an array of root nodes.',
  },
]
const accessibility = [
  'Keep labels concise and provide an alternative text outline for complex hierarchies.',
]
</script>

<template>
  <ComponentDoc
    title="OrganizationChart"
    componentName="OrganizationChart"
    category="Data"
    description="Show how operational teams relate to each other."
    usage="accepts a tree of nodes with labels and children."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/organizationchart"
  />
</template>
