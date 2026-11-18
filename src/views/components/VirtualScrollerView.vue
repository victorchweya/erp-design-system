<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/VirtualScrollerExample.vue'
import code from '@/components/docs/examples/VirtualScrollerExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Render a small visible window into a long list.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'class', type: 'any', default: '-', description: 'Style class of the component.' },
  {
    name: 'items',
    type: 'null | any[] | any[][]',
    default: '-',
    description: 'An array of objects to display.',
  },
  {
    name: 'itemSize',
    type: 'number | number[]',
    default: '-',
    description: 'The height/width of item according to orientation.',
  },
]
const accessibility = [
  'Give the scroll region a name and keyboard focus. Prefer pagination when users need to search or browse every record with assistive technology.',
]
</script>

<template>
  <ComponentDoc
    title="VirtualScroller"
    componentName="VirtualScroller"
    category="Data"
    description="Render a small visible window into a long list."
    usage="requires itemSize to match the actual row height. This example contains 1,000 local rows."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/virtualscroller"
  />
</template>
