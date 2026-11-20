<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/BreadcrumbExample.vue'
import code from '@/components/docs/examples/BreadcrumbExample.vue?raw'

const examples = [
  {
    id: 'breadcrumb-router',
    title: 'Router links',
    description:
      'Render each parent page as a RouterLink in the item slot, and the current page as plain text with aria-current. This preview pauses navigation and shows the target instead.',
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
      'Pages from the top level down to the current page. Use label, icon, url or a custom route field.',
  },
  {
    name: 'home',
    type: 'MenuItem',
    default: '—',
    description: 'First item, usually the dashboard. Give it a label even when it shows an icon.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: 'Names the nav landmark, for example Breadcrumb.',
  },
  {
    name: 'item',
    type: 'slot',
    default: '—',
    description:
      'Custom item. Receives item, label, icon and props; bind props.action to the link to keep theme styles.',
  },
]
const accessibility = [
  'Breadcrumb renders a nav element with an ordered list. Name it with aria-label so it is distinct from the main navigation.',
  'Separators are hidden from screen readers.',
  'Mark the current page with aria-current="page". PrimeVue does this only when an item url matches the browser path, so set it yourself in a custom item template.',
  'Every item is a normal link in the tab order. No extra keyboard handling is needed.',
]
</script>

<template>
  <ComponentDoc
    title="Breadcrumb"
    componentName="Breadcrumb"
    category="Menu"
    description="Show where the current page sits in the module hierarchy and link back to its parents."
    usage="accepts a home item and a model of pages. Use the item slot with RouterLink for in-app navigation. Show it on detail pages that are two or more levels deep."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/breadcrumb"
  />
</template>
