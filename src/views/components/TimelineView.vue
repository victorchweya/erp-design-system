<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/TimelineExample.vue'
import code from '@/components/docs/examples/TimelineExample.vue?raw'
import StatusHistoryExample from '@/components/docs/examples/TimelineStatusHistoryExample.vue'
import statusHistoryCode from '@/components/docs/examples/TimelineStatusHistoryExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Track a delivery from order to dispatch. The content slot shows each status and the opposite slot shows its time.',
    component: Example,
    code: code,
  },
  {
    id: 'status-history',
    title: 'Order status history',
    description:
      'Show who changed a purchase order and when, newest first. The marker slot gives each step an icon, and the next step is marked Pending in text as well as with a dashed marker.',
    component: StatusHistoryExample,
    code: statusHistoryCode,
  },
]
const api = [
  {
    name: 'value',
    type: 'any[]',
    default: '-',
    description: 'Events to display, in the order they should appear.',
  },
  {
    name: 'dataKey',
    type: 'string',
    default: '-',
    description: 'Field that uniquely identifies each event. Used as the list key.',
  },
  {
    name: 'align',
    type: "'left' | 'right' | 'alternate' | 'top' | 'bottom'",
    default: 'left',
    description:
      'Side of the line that holds the content. Use left or right for vertical timelines and top or bottom for horizontal ones.',
  },
  {
    name: 'layout',
    type: "'vertical' | 'horizontal'",
    default: 'vertical',
    description: 'Direction of the line. Horizontal suits a short, fixed set of steps.',
  },
]
const accessibility = [
  'Timeline renders an ordered list. Name it with aria-label when the page has more than one, such as Purchase order PO-2318 status history.',
  'Write the status, time and person as text. Marker colours and icons are decorative, so hide icons with aria-hidden and add a text label such as Pending for steps that have not happened.',
  'Use a time element with a datetime attribute so the exact time is available to assistive technology and browser tools.',
  'Timeline has no interactive parts. Put any links or buttons inside the content slot.',
]
</script>

<template>
  <ComponentDoc
    title="Timeline"
    componentName="Timeline"
    category="Data"
    description="Show a sequence of events, such as the status history of an order or delivery."
    usage="takes an array of events and renders each one through the content slot. Use opposite for dates or times and marker for custom icons. For a process people move through step by step, use Stepper instead."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/timeline"
  />
</template>
