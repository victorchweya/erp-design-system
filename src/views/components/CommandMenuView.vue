<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/CommandMenuExample.vue'
import code from '@/components/docs/examples/CommandMenuExample.vue?raw'
import DialogExample from '@/components/docs/examples/CommandMenuDialogExample.vue'
import dialogCode from '@/components/docs/examples/CommandMenuDialogExample.vue?raw'

const examples = [
  {
    id: 'command-menu-basic',
    title: 'Inline list',
    description:
      'Group commands under short headings. Typing filters the list, and Enter runs the highlighted command.',
    component: Example,
    code: code,
  },
  {
    id: 'command-menu-dialog',
    title: 'Command palette',
    description:
      'Put the menu in a modal Dialog and open it with Ctrl+K or Cmd+K, as well as a visible button. Keywords let people find a command by another name, such as po for purchase order.',
    component: DialogExample,
    code: dialogCode,
  },
]
const api = [
  {
    name: 'model',
    type: 'CommandMenuItem[]',
    default: '—',
    description:
      'Commands, grouped as items with nested items. Leaf items take label, command, disabled and keywords.',
  },
  {
    name: 'search',
    type: 'string',
    default: '—',
    description: 'Current search text. Use v-model:search to read, reset or prefill it.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: '—',
    description: 'Placeholder for the search field. It does not replace an accessible name.',
  },
  {
    name: 'filter',
    type: '(item, search) => number',
    default: '—',
    description:
      'Custom scoring. Return a higher number for a better match, or 0 to hide the item.',
  },
  {
    name: 'emptyFilterMessage',
    type: 'string',
    default: 'locale',
    description: 'Text shown when no command matches the search.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: 'Accessible name for the results list.',
  },
  {
    name: 'select',
    type: 'event',
    default: '—',
    description: 'Emitted after a command runs. Use it to close the surrounding dialog.',
  },
]
const accessibility = [
  'The search field is a combobox and the results are a menu. Name the field through pt.input and the list with ariaLabel; the placeholder is not a label.',
  'Up and Down Arrow, Home and End move through results while focus stays in the field. Enter runs the highlighted command.',
  'Offer a visible button as well as the keyboard shortcut, and expose the shortcut with aria-keyshortcuts.',
  'In a dialog, give the dialog an aria-label when its header is hidden, and put autofocus on the search field.',
]
</script>

<template>
  <ComponentDoc
    title="CommandMenu"
    componentName="CommandMenu"
    category="Menu"
    description="Search for a command or page and run it from one list."
    usage="accepts grouped menu items and filters them as the user types. Use it inline, or in a Dialog as an app-wide command palette."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/commandmenu"
  />
</template>
