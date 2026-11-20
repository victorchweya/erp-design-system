<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/MenubarExample.vue'
import code from '@/components/docs/examples/MenubarExample.vue?raw'

const examples = [
  {
    id: 'menubar-basic',
    title: 'Module navigation',
    description:
      'Group pages under a few top-level modules, and put the main page action in the end slot. Below the breakpoint, the items collapse behind a menu button.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '—',
    description: 'Top-level items and their submenus. Use label, icon, command, url and items.',
  },
  {
    name: 'breakpoint',
    type: 'string',
    default: "'960px'",
    description: 'Viewport width below which the menubar collapses behind a menu button.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: 'Accessible name for the menubar.',
  },
  {
    name: 'buttonProps',
    type: 'ButtonHTMLAttributes',
    default: '—',
    description: 'Attributes for the mobile menu button, such as a more specific aria-label.',
  },
  {
    name: 'start / end',
    type: 'slot',
    default: '—',
    description: 'Content before and after the items, such as a logo or a primary action.',
  },
]
const accessibility = [
  'Menubar uses the menubar role. Name it with aria-label.',
  'Tab moves into the menubar as one stop. Left and Right Arrow move between top-level items, Down Arrow or Enter opens a submenu, and Escape closes it.',
  'Controls in the start and end slots are outside the menubar and are reached with Tab.',
  'Keep top-level labels to one or two words, and avoid more than two levels.',
]
</script>

<template>
  <ComponentDoc
    title="Menubar"
    componentName="Menubar"
    category="Menu"
    description="Show a horizontal bar of modules with dropdown submenus."
    usage="accepts a model of top-level items with nested items. Use the end slot for a primary action. Replace the preview commands with real handlers or router links when copying."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/menubar"
  />
</template>
