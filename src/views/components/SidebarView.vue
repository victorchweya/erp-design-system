<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/SidebarExample.vue'
import code from '@/components/docs/examples/SidebarExample.vue?raw'

const examples = [
  {
    id: 'sidebar-icon',
    title: 'Grouped navigation with icon collapse',
    description:
      'Group pages under module labels and keep settings in the footer. The trigger collapses the panel to icons. This preview is contained in its box and does not replace the documentation sidebar.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'id',
    type: 'string',
    default: '—',
    description:
      'Required inside SidebarLayout. SidebarTrigger uses it for target and aria-controls.',
  },
  {
    name: 'open',
    type: 'boolean',
    default: '—',
    description: 'Whether the panel is expanded. Use v-model:open.',
  },
  {
    name: 'collapsible',
    type: "'icon' | 'offcanvas' | 'none'",
    default: "'icon'",
    description:
      'What happens when the panel closes: shrink to icons, slide out of view, or stay open.',
  },
  {
    name: 'overlay',
    type: 'boolean',
    default: 'false',
    description:
      'Float the panel over the page instead of pushing it. Use with offcanvas on small screens.',
  },
  {
    name: 'side',
    type: "'left' | 'right'",
    default: "'left'",
    description: 'Edge the panel is anchored to.',
  },
  {
    name: 'width / iconWidth',
    type: 'string',
    default: "'16rem' / '3rem'",
    description: 'Width when expanded and when collapsed to icons.',
  },
  {
    name: 'isActive',
    type: 'boolean',
    default: 'false',
    description:
      'SidebarMenuButton prop that styles the current page. Add aria-current="page" as well.',
  },
  {
    name: 'target',
    type: 'string',
    default: '—',
    description: 'SidebarTrigger prop. The id of the sidebar it toggles.',
  },
]
const accessibility = [
  'Sidebar has no landmark role. Render SidebarAside as nav and give it an aria-label.',
  'Labels are hidden in icon mode, so give each SidebarMenuButton an aria-label. Mark the current page with aria-current="page"; isActive only changes the style.',
  'SidebarTrigger sets aria-expanded and aria-controls for you. Give it an aria-label, since it usually shows only an icon.',
  'Up and Down Arrow move between menu buttons across groups, and every button also stays in the Tab order.',
]
</script>

<template>
  <ComponentDoc
    title="Sidebar"
    componentName="Sidebar"
    category="Menu"
    description="Build the app's main navigation as a panel that collapses to icons or slides away."
    usage="is a set of parts: SidebarLayout holds a Sidebar and SidebarMain, and the Sidebar holds the panel with its header, groups and footer. Give the Sidebar an id and point SidebarTrigger at it."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/sidebar"
  />
</template>
