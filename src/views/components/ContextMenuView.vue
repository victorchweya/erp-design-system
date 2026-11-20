<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ContextMenuExample.vue'
import code from '@/components/docs/examples/ContextMenuExample.vue?raw'

const examples = [
  {
    id: 'context-menu-rows',
    title: 'Row actions with a visible fallback',
    description:
      'Right-click opens a ContextMenu at the pointer. Each row also has an actions button that opens a popup Menu with the same model, so the actions work from the keyboard and on touch screens.',
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
      'Actions. Use label, icon, command, disabled and separator. disabled can be a function.',
  },
  {
    name: 'show(event)',
    type: 'method',
    default: '—',
    description: 'Opens the menu at the pointer position of a contextmenu event. hide() closes it.',
  },
  {
    name: 'global',
    type: 'boolean',
    default: 'false',
    description:
      'Opens the menu on right-click anywhere in the document. Avoid it; it replaces the browser menu everywhere.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: 'Accessible name for the menu.',
  },
  {
    name: 'breakpoint',
    type: 'string',
    default: "'960px'",
    description: 'Viewport width below which submenus stack inside the menu.',
  },
]
const accessibility = [
  'Right-click is not available to many keyboard and touch users. Always offer the same actions from a visible button.',
  'Do not open ContextMenu from a button click. It positions at the pointer, so a click made with the keyboard places it in the corner of the page. Use a popup Menu instead.',
  'Arrow keys move between items, Enter or Space runs an item and Escape closes the menu.',
  'Name each row actions button with the record, such as Actions for PO-2024-0183.',
]
</script>

<template>
  <ComponentDoc
    title="ContextMenu"
    componentName="ContextMenu"
    category="Menu"
    description="Offer record actions on right-click, as a shortcut to actions that are also available elsewhere."
    usage="is opened with its show method from a contextmenu event. Track which record was clicked before showing the menu, and reuse the same model in a popup Menu for keyboard and touch users."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/contextmenu"
  />
</template>
