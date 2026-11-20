<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/MenuExample.vue'
import code from '@/components/docs/examples/MenuExample.vue?raw'
import PopupExample from '@/components/docs/examples/MenuPopupExample.vue'
import popupCode from '@/components/docs/examples/MenuPopupExample.vue?raw'

const examples = [
  {
    id: 'menu-groups',
    title: 'Grouped menu',
    description:
      'Items with nested items become labelled groups. Use separators between groups and disable actions that are not available yet.',
    component: Example,
    code: code,
  },
  {
    id: 'menu-popup',
    title: 'Popup actions',
    description:
      'Set popup and call toggle from a button to show record actions on demand. Enter, Space and Escape close the menu and return focus to the button.',
    component: PopupExample,
    code: popupCode,
  },
]
const api = [
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '—',
    description:
      'Items. Use label, icon, command, url, disabled and separator. Nest items one level to make groups.',
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
    description:
      'Opens or closes a popup menu next to event.currentTarget. show and hide also exist.',
  },
  {
    name: 'appendTo',
    type: "'body' | 'self' | HTMLElement",
    default: "'body'",
    description: 'Where a popup menu is attached in the DOM.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: 'Accessible name for the menu.',
  },
]
const accessibility = [
  'Menu uses the menu role, and groups use the group role labelled by their heading. Name the menu with aria-label.',
  'Tab moves into the menu, Up and Down Arrow move between items, and Enter or Space runs an item. Disabled items are announced as unavailable.',
  'A popup menu returns focus to its trigger when it closes. It does not set aria-expanded on the trigger, so update it from the show and hide events.',
  'Use Menu for actions or a short list of links. Use PanelMenu or Sidebar for app navigation.',
]
</script>

<template>
  <ComponentDoc
    title="Menu"
    componentName="Menu"
    category="Menu"
    description="List actions or links, inline or in a popup opened from a button."
    usage="Menu accepts a model of labelled items. Add popup and call toggle from a button for a More actions menu. Replace the preview commands with real handlers or router links when copying."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/menu"
  />
</template>
