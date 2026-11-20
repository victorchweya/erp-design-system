<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/TieredMenuExample.vue'
import code from '@/components/docs/examples/TieredMenuExample.vue?raw'

const examples = [
  {
    id: 'tiered-menu-popup',
    title: 'Popup with a submenu',
    description:
      'Open the menu from a button with popup and toggle. Items with nested items open a submenu to the side. Keep it to two levels.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '—',
    description: 'Items. Nested items open as a submenu. Use label, icon, command and disabled.',
  },
  {
    name: 'popup',
    type: 'boolean',
    default: 'false',
    description: 'Shows the menu as an overlay next to its trigger. Open it with toggle(event).',
  },
  {
    name: 'toggle(event)',
    type: 'method',
    default: '—',
    description: 'Opens or closes a popup menu next to event.currentTarget.',
  },
  {
    name: 'breakpoint',
    type: 'string',
    default: "'960px'",
    description: 'Viewport width below which submenus stack inside the menu.',
  },
  {
    name: 'appendTo',
    type: "'body' | 'self' | HTMLElement",
    default: "'body'",
    description: 'Where a popup menu is attached in the DOM.',
  },
]
const accessibility = [
  'TieredMenu uses the menubar role with vertical orientation. Name it with aria-label.',
  'Up and Down Arrow move between items. Right Arrow or Enter opens a submenu and Left Arrow closes it. Escape closes the menu and returns focus to the trigger.',
  'The menu does not set aria-expanded on its trigger, so update it from the show and hide events.',
  'Deep submenus are hard to use with a pointer and a keyboard. Prefer two levels; use a Dialog when people need to choose from many options.',
]
</script>

<template>
  <ComponentDoc
    title="TieredMenu"
    componentName="TieredMenu"
    category="Menu"
    description="Show actions with submenus, usually in a popup opened from a button."
    usage="accepts a model of items with nested items. Add popup and call toggle from a button. Replace the preview commands with real handlers or router links when copying."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/tieredmenu"
  />
</template>
