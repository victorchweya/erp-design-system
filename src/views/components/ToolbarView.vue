<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import ToolbarExample from '@/components/docs/examples/ToolbarExample.vue'
import code0 from '@/components/docs/examples/ToolbarExample.vue?raw'
const examples = [
  {
    id: 'toolbar-0',
    title: 'Grouped actions',
    description: 'These actions only update the local preview.',
    component: ToolbarExample,
    code: code0,
  },
]
const api = [
  {
    name: 'start slot',
    type: 'VNode[]',
    default: '—',
    description: 'Content aligned to the start, usually the primary action.',
  },
  {
    name: 'center slot',
    type: 'VNode[]',
    default: '—',
    description: 'Content in the middle, such as a search field.',
  },
  {
    name: 'end slot',
    type: 'VNode[]',
    default: '—',
    description: 'Content aligned to the end, usually supporting actions with primary outlined buttons.',
  },
  {
    name: 'ariaLabelledby',
    type: 'string',
    default: '—',
    description:
      'Id of a visible heading that names the toolbar. Use aria-label when there is none.',
  },
]
const accessibility = [
  'Toolbar renders role="toolbar". Name it with aria-label or ariaLabelledby so people know which content the actions affect.',
  'Toolbar does not add arrow-key navigation. Each control stays in the normal Tab order, so keep labels clear and focus visible.',
]
</script>

<template>
  <ComponentDoc
    title="Toolbar"
    category="Panel"
    description="Keep related actions together above the content they affect."
    usage="Toolbar arranges actions in start, center, and end slots. Keep the number of actions small and let groups wrap on narrow screens."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/toolbar"
  />
</template>
