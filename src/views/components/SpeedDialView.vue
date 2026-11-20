<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import SpeedDialExample from '@/components/docs/examples/SpeedDialExample.vue'
import code0 from '@/components/docs/examples/SpeedDialExample.vue?raw'
const examples = [
  {
    id: 'speed-dial-0',
    title: 'Floating actions',
    description:
      'The trigger opens three order actions. Hover an action to see its label; the status line reports the selected command.',
    component: SpeedDialExample,
    code: code0,
  },
]
const api = [
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '—',
    description: 'Actions, each with a label, icon, and command.',
  },
  {
    name: 'direction',
    type: "'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right'",
    default: 'up',
    description: 'Direction in which the actions open.',
  },
  {
    name: 'type',
    type: "'linear' | 'circle' | 'semi-circle' | 'quarter-circle'",
    default: 'linear',
    description: 'Layout of the actions. Circular types also need radius.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: 'Accessible name of the trigger button.',
  },
  {
    name: 'tooltipOptions',
    type: 'SpeedDialTooltipOptions',
    default: '—',
    description: 'Shows each action label in a tooltip, for example { position, event }.',
  },
  {
    name: 'buttonProps',
    type: 'object',
    default: '{ rounded: true }',
    description: 'Button props for the trigger.',
  },
  {
    name: 'hideOnClickOutside',
    type: 'boolean',
    default: 'true',
    description: 'Close the actions when the user clicks elsewhere.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the trigger and every action.',
  },
]
const accessibility = [
  'Name the trigger with ariaLabel. Each action button takes its accessible name from the item label, but the label is not visible unless you set tooltipOptions.',
  'Enter, Space, or an arrow key opens the actions. Arrow keys move between actions, Enter runs the focused action, and Escape closes the list and returns focus to the trigger.',
  'Icons alone are hard to recognise. Keep the set small and do not hide essential or destructive actions in a SpeedDial.',
]
</script>

<template>
  <ComponentDoc
    title="SpeedDial"
    category="Button"
    description="Reveal a small set of related actions from one floating trigger."
    usage="Supply a model with a label, icon, and command for each item, and name the trigger with ariaLabel. Reserve space for the expanded actions. Use Toolbar or a SplitButton when actions should always be visible or labelled."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/speeddial"
  />
</template>
