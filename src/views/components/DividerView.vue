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
    name: 'layout',
    type: "'horizontal' | 'vertical'",
    default: 'horizontal',
    description: 'Orientation. Vertical dividers need a flex parent with a height.',
  },
  {
    name: 'type',
    type: "'solid' | 'dashed' | 'dotted'",
    default: 'solid',
    description: 'Border style.',
  },
  {
    name: 'align',
    type: "'left' | 'center' | 'right' | 'top' | 'bottom'",
    default: '—',
    description:
      'Position of the divider content: left, center, or right when horizontal; top, center, or bottom when vertical. Content is centred when omitted.',
  },
]
const accessibility = [
  'Divider renders role="separator" with aria-orientation, so screen readers announce a break.',
  'Text inside a divider is read as part of the separator. Keep it short and do not use it as a section heading.',
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
