<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import SpeedDialExample from '@/components/docs/examples/SpeedDialExample.vue'
import code0 from '@/components/docs/examples/SpeedDialExample.vue?raw'
const examples = [
  {
    id: 'speed-dial-0',
    title: 'Floating actions',
    description: 'The trigger opens three local actions without changing an order.',
    component: SpeedDialExample,
    code: code0,
  },
]
const api = [
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '—',
    description: 'Menu items with labels and commands.',
  },
  {
    name: 'direction',
    type: 'any',
    default: 'up',
    description: 'Direction in which actions expand.',
  },
  {
    name: 'type',
    type: 'any',
    default: 'linear',
    description: 'Solid, dashed, or dotted border.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
  },
  {
    name: 'buttonProps',
    type: 'object',
    default: '—',
    description: 'Properties for the main button.',
  },
]
const accessibility = [
  'Give the trigger an accessible name through buttonProps and provide a label for every action.',
  'Arrow keys navigate actions; Escape closes the menu and returns focus. Avoid using SpeedDial for essential navigation.',
]
</script>

<template>
  <ComponentDoc
    title="SpeedDial"
    category="Button"
    description="Reveal a small set of related actions from one floating trigger."
    usage="Supply a model with a label and command for each item. Reserve enough space for the expanded menu. Use Toolbar when actions should always be visible."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/speeddial"
  />
</template>
