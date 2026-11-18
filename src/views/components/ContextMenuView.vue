<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ContextMenuExample.vue'
import code from '@/components/docs/examples/ContextMenuExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Open record actions by pointer or keyboard.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'model', type: 'MenuItem[]', default: '-', description: 'An array of menuitems.' },
]
const accessibility = [
  'Provide a visible button so context actions are available without a mouse or a right-click gesture.',
]
</script>

<template>
  <ComponentDoc
    title="ContextMenu"
    componentName="ContextMenu"
    category="Menu"
    description="Open record actions by pointer or keyboard."
    usage="calls show with the context-menu event or toggle from a visible action button."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/contextmenu"
  />
</template>
