<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/SidebarExample.vue'
import code from '@/components/docs/examples/SidebarExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'A collapsible navigation panel contained within this preview.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'id',
    type: 'string',
    default: '-',
    description:
      'Unique identifier; required when nested in a SidebarLayout to participate in registry. Rendered on the root element so a SidebarTrigger can reference it with  `aria-controls` .',
  },
  {
    name: 'collapsible',
    type: '"none" | "offcanvas" | "icon"',
    default: "'icon'",
    description: 'Collapse behavior.',
  },
  {
    name: 'open',
    type: 'boolean',
    default: '-',
    description: 'Controlled open state. Use with  `v-model:open`  or  `@update:open` .',
  },
]
const accessibility = [
  'Keep icon-only navigation named in the collapsed state and expose the trigger\u2019s expanded state.',
]
</script>

<template>
  <ComponentDoc
    title="Sidebar"
    componentName="Sidebar"
    category="Menus"
    description="A collapsible navigation panel contained within this preview."
    usage="composes SidebarLayout, Sidebar, its panel sections, and SidebarMain. This example does not replace the documentation sidebar."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/sidebar"
  />
</template>
