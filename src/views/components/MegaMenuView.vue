<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/MegaMenuExample.vue'
import code from '@/components/docs/examples/MegaMenuExample.vue?raw'

const examples = [
  {
    id: 'megamenu-basic',
    title: 'Module columns',
    description:
      'Each module opens a panel of columns, and each column holds labelled groups of pages. Use it when a module has more pages than a simple dropdown can show clearly.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '—',
    description:
      'Top-level items. Their items is an array of columns, and each column is an array of groups with their own items.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Lay the top-level items out in a row or a column.',
  },
  {
    name: 'breakpoint',
    type: 'string',
    default: "'960px'",
    description: 'Viewport width below which the menu collapses behind a menu button.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: 'Accessible name for the menubar.',
  },
  {
    name: 'start / end',
    type: 'slot',
    default: '—',
    description: 'Content before and after the items, such as a logo or a search field.',
  },
]
const accessibility = [
  'MegaMenu uses the menubar role. Name it with aria-label.',
  'Left and Right Arrow move between modules, and Down Arrow or Enter opens a panel. Inside a panel, Up and Down Arrow move between pages, Left and Right Arrow jump between groups, and Escape closes the panel.',
  'Group labels are not menu items, so screen readers may skip them as people move between pages. Make each page label make sense on its own.',
]
</script>

<template>
  <ComponentDoc
    title="MegaMenu"
    componentName="MegaMenu"
    category="Menu"
    description="Show a module's pages in columns of labelled groups."
    usage="accepts top-level items whose items are arrays of columns. Each column holds groups of pages. Replace the preview commands with router links when copying."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/megamenu"
  />
</template>
