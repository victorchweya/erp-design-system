<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import DividerExample from '@/components/docs/examples/DividerExample.vue'
import code0 from '@/components/docs/examples/DividerExample.vue?raw'
import DividerVerticalExample from '@/components/docs/examples/DividerVerticalExample.vue'
import code1 from '@/components/docs/examples/DividerVerticalExample.vue?raw'
const examples = [
  {
    id: 'divider-0',
    title: 'Types and labels',
    description:
      'Solid is the default. Dashed and dotted are available; add short divider text only when useful.',
    component: DividerExample,
    code: code0,
  },
  {
    id: 'divider-1',
    title: 'Vertical',
    description: 'Use a vertical divider inside a flex row.',
    component: DividerVerticalExample,
    code: code1,
  },
]
const api = [
  {
    name: 'align',
    type: 'any',
    default: '—',
    description: 'Position of the divider content.',
  },
  {
    name: 'layout',
    type: 'any',
    default: 'horizontal',
    description: 'Horizontal or vertical.',
  },
  {
    name: 'type',
    type: 'any',
    default: 'solid',
    description: 'Solid, dashed, or dotted border.',
  },
]
const accessibility = [
  'Divider includes a separator role and orientation.',
  'Use headings to structure the page; a divider alone does not communicate section names.',
]
</script>

<template>
  <ComponentDoc
    title="Divider"
    category="Panel"
    description="Separate related groups of content with a quiet rule."
    usage="Use the default horizontal divider between sections. Set layout to vertical between items in a row."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/divider"
  />
</template>
