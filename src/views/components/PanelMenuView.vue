<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import PanelMenuExample from '@/components/docs/examples/PanelMenuExample.vue'
import code0 from '@/components/docs/examples/PanelMenuExample.vue?raw'
import PanelMenuMultipleExample from '@/components/docs/examples/PanelMenuMultipleExample.vue'
import code1 from '@/components/docs/examples/PanelMenuMultipleExample.vue?raw'
import PanelMenuControlledExample from '@/components/docs/examples/PanelMenuControlledExample.vue'
import code2 from '@/components/docs/examples/PanelMenuControlledExample.vue?raw'
import PanelMenuRouterExample from '@/components/docs/examples/PanelMenuRouterExample.vue'
import code3 from '@/components/docs/examples/PanelMenuRouterExample.vue?raw'

const examples = [
  {
    id: 'panel-menu-0',
    title: 'Module navigation',
    description:
      'Group ERP pages under their module. By default, opening one module closes the one that was open.',
    component: PanelMenuExample,
    code: code0,
  },
  {
    id: 'panel-menu-1',
    title: 'Multiple expansion',
    description:
      'Enable multiple when people move between modules often and need several lists open at once.',
    component: PanelMenuMultipleExample,
    code: code1,
  },
  {
    id: 'panel-menu-2',
    title: 'Controlled expansion',
    description:
      'Bind expandedKeys to open modules from code, such as restoring the module for the current page. Each item needs a unique key.',
    component: PanelMenuControlledExample,
    code: code2,
  },
  {
    id: 'panel-menu-3',
    title: 'Router links',
    description:
      'Use the item slot with RouterLink so pages render as real links. This preview pauses navigation and shows the target instead.',
    component: PanelMenuRouterExample,
    code: code3,
  },
]
const api = [
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '—',
    description: 'Modules and their pages. Use label, icon, items, command, url, and key.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: 'Allows more than one root module to stay open.',
  },
  {
    name: 'expandedKeys',
    type: 'PanelMenuExpandedKeys',
    default: '—',
    description: 'Map of item keys to true for open items. Use with v-model:expandedKeys.',
  },
]
const accessibility = [
  'Module headers are buttons with aria-expanded. Enter or Space opens a module; Up and Down Arrow move between headers.',
  'Pages inside a module form a tree. Arrow keys move between pages, Right and Left Arrow open and close nested groups, and Enter activates a page.',
  'Keep labels short and unique within a module. Icons are decorative; the label carries the meaning.',
  'In a custom item template, keep the anchor out of the tab order with tabindex -1 and let the menu manage focus.',
]
</script>

<template>
  <ComponentDoc
    title="PanelMenu"
    componentName="PanelMenu"
    category="Menu"
    description="Navigate ERP modules and their pages in a collapsible, accordion-style menu."
    usage="takes a model of modules with nested pages. Keep it to two levels, give each module an icon, and use RouterLink in the item slot for in-app navigation."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/panelmenu"
  />
</template>
