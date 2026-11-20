<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/DockExample.vue'
import code from '@/components/docs/examples/DockExample.vue?raw'

const examples = [
  {
    id: 'dock-basic',
    title: 'Quick actions',
    description:
      'A row of icon actions pinned to the edge of its container. Each item has a label, which names it for screen readers and appears as a tooltip on hover.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '—',
    description: 'Actions. Every item needs a label, an icon and a command or url.',
  },
  {
    name: 'position',
    type: "'bottom' | 'top' | 'left' | 'right'",
    default: "'bottom'",
    description: 'Edge of the container the dock sits on. left and right stack items vertically.',
  },
  {
    name: 'tooltipOptions',
    type: 'DockTooltipOptions',
    default: '—',
    description:
      'Shows each item label as a tooltip. Set position and event, plus any Tooltip option.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: 'Accessible name for the menu.',
  },
  {
    name: 'itemicon',
    type: 'slot',
    default: '—',
    description: 'Custom icon. Receives the item; mark the icon aria-hidden.',
  },
]
const accessibility = [
  'Dock uses the menu role. Name it with aria-label. Each item is a menuitem named by its label, so never leave the label empty.',
  'Tab moves into the dock, arrow keys move between items, and Enter or Space runs the focused item.',
  'Icons alone are hard to recognise. Show labels as tooltips, and prefer Menubar or a Toolbar with text buttons for core ERP navigation.',
]
</script>

<template>
  <ComponentDoc
    title="Dock"
    componentName="Dock"
    category="Menu"
    description="Show a small set of frequent actions as icons along the edge of a screen or panel."
    usage="Dock accepts a menu model and an itemicon slot. Its parent needs position: relative and a height. Keep it to five or six actions."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/dock"
  />
</template>
