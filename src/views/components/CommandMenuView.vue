<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/CommandMenuExample.vue'
import code from '@/components/docs/examples/CommandMenuExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Search and run a command from one list.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'model',
    type: 'null | CommandMenuItem[]',
    default: '-',
    description:
      'Menu items to display. Leaf items support  `command` ,  `disabled` ,  `keywords`  and any custom fields.\nGroups are expressed as items with nested  `items` .',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: '-',
    description: 'Placeholder for the search input.',
  },
]
const accessibility = [
  'Give both the search field and results an accessible name. Arrow keys navigate results and Enter runs a command.',
]
</script>

<template>
  <ComponentDoc
    title="CommandMenu"
    componentName="CommandMenu"
    category="Menu"
    description="Search and run a command from one list."
    usage="accepts grouped menu items and filters them as the user types."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/commandmenu"
  />
</template>
