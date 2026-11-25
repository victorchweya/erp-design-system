<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/SidebarExample.vue'
import code from '@/components/docs/examples/SidebarExample.vue?raw'
import VariantsExample from '@/components/docs/examples/SidebarVariantsExample.vue'
import variantsCode from '@/components/docs/examples/SidebarVariantsExample.vue?raw'
import MenuExample from '@/components/docs/examples/SidebarMenuExample.vue'
import menuCode from '@/components/docs/examples/SidebarMenuExample.vue?raw'
import ResponsiveExample from '@/components/docs/examples/SidebarResponsiveExample.vue'
import responsiveCode from '@/components/docs/examples/SidebarResponsiveExample.vue?raw'
import DualExample from '@/components/docs/examples/SidebarDualExample.vue'
import dualCode from '@/components/docs/examples/SidebarDualExample.vue?raw'
import MultiExample from '@/components/docs/examples/SidebarMultiExample.vue'
import multiCode from '@/components/docs/examples/SidebarMultiExample.vue?raw'
import NestedExample from '@/components/docs/examples/SidebarNestedExample.vue'
import nestedCode from '@/components/docs/examples/SidebarNestedExample.vue?raw'
import ChatExample from '@/components/docs/examples/SidebarChatExample.vue'
import chatCode from '@/components/docs/examples/SidebarChatExample.vue?raw'

const examples = [
  {
    id: 'sidebar-icon',
    title: 'Grouped navigation with icon collapse',
    description:
      'Group pages under module labels and keep settings in the footer. Show the full FTF logo when expanded and the symbol when collapsed to icons. This preview is contained in its box and does not replace the documentation sidebar.',
    component: Example,
    code: code,
  },
  {
    id: 'sidebar-variants',
    title: 'Variants',
    description:
      'Try sidebar, floating, and inset variants, icon and offcanvas collapse, either side, overlays, hover expansion, and a backdrop.',
    component: VariantsExample,
    code: variantsCode,
  },
  {
    id: 'sidebar-menu',
    title: 'With menu',
    description:
      'A workspace switcher in the header, grouped navigation, and an account menu in the footer.',
    component: MenuExample,
    code: menuCode,
  },
  {
    id: 'sidebar-responsive',
    title: 'Responsive',
    description:
      'Below 1024px the navigation becomes an offcanvas overlay. Resize the browser to try the mobile layout.',
    component: ResponsiveExample,
    code: responsiveCode,
  },
  {
    id: 'sidebar-dual',
    title: 'Dual sidebar',
    description:
      'Navigation on the left and an optional assistant panel on the right, each with its own trigger.',
    component: DualExample,
    code: dualCode,
  },
  {
    id: 'sidebar-multi',
    title: 'Multi sidebar',
    description:
      'A narrow module rail that expands on hover beside a second panel for contextual navigation.',
    component: MultiExample,
    code: multiCode,
  },
  {
    id: 'sidebar-nested',
    title: 'Nested menu',
    description:
      'Expand and collapse several levels of navigation with SidebarMenuItem and SidebarMenuSub.',
    component: NestedExample,
    code: nestedCode,
  },
  {
    id: 'sidebar-chat',
    title: 'Chat application',
    description:
      'Conversation history grouped by date with pinned shortcuts and actions shown on hover. The conversations are sample content.',
    component: ChatExample,
    code: chatCode,
  },
]
const api = [
  {
    name: 'variant',
    type: "'sidebar' | 'floating' | 'inset'",
    default: "'sidebar'",
    description: 'Visual treatment of the panel and main content.',
  },
  {
    name: 'openOnHover',
    type: 'boolean',
    default: 'false',
    description: 'Expand the panel on hover and collapse it when the pointer leaves.',
  },
  {
    name: 'hoverOpenDelay / hoverCloseDelay',
    type: 'number',
    default: '50 / 100',
    description: 'Delay in milliseconds before the hover state changes.',
  },
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
  'Right Arrow expands a collapsed group or enters its children. Left Arrow collapses a group or returns to its parent. Home and End move to the first and last visible entries.',
]
</script>

<template>
  <ComponentDoc
    title="Sidebar"
    componentName="Sidebar"
    category="Menu"
    description="Build the app's main navigation as a panel that collapses to icons or slides away."
    usage="Sidebar is a set of parts: SidebarLayout holds a Sidebar and SidebarMain, and the Sidebar holds the panel with its header, groups and footer. Give the Sidebar an id and point SidebarTrigger at it."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/sidebar"
  />
</template>
