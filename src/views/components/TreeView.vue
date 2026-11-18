<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/TreeExample.vue'
import code from '@/components/docs/examples/TreeExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Browse and select a produce category.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'value', type: 'TreeNode[]', default: '-', description: 'An array of treenodes.' },
  {
    name: 'selectionKeys',
    type: 'TreeSelectionKeys',
    default: '-',
    description: 'A map of keys to control the selection state.',
  },
  { name: 'selectionMode', type: 'any', default: '-', description: 'Defines the selection mode.' },
]
const accessibility = [
  'Use arrows to navigate and expand nodes; Enter or Space selects the focused node.',
]
</script>

<template>
  <ComponentDoc
    title="Tree"
    componentName="Tree"
    category="Data"
    description="Browse and select a produce category."
    usage="accepts keyed nodes and supports selectionKeys and filtering."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/tree"
  />
</template>
