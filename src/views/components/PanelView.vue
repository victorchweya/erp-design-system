<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/PanelExample.vue'
import code from '@/components/docs/examples/PanelExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'A titled container with collapsible content.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'header', type: 'string', default: '-', description: 'Header text of the panel.' },
  {
    name: 'toggleable',
    type: 'boolean',
    default: 'false',
    description: 'Defines if content of panel can be expanded and collapsed.',
  },
]
const accessibility = [
  'Choose a descriptive header and retain the toggle button\u2019s accessible name.',
]
</script>

<template>
  <ComponentDoc
    title="Panel"
    componentName="Panel"
    category="Panel"
    description="A titled container with collapsible content."
    usage="uses header for its title and toggleable for optional collapse controls."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/panel"
  />
</template>
