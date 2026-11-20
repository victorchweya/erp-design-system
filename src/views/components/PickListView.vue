<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/PickListExample.vue'
import code from '@/components/docs/examples/PickListExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Assign suppliers to a route. The source reorder buttons are hidden because the order of available suppliers has no meaning, and the transfer buttons are named for the task.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'any[][]',
    default: '[[], []]',
    description: 'The two lists as [source, target]. Use v-model to receive both after a move.',
  },
  {
    name: 'dataKey',
    type: 'string | Function',
    default: '-',
    description: 'Field that uniquely identifies each item.',
  },
  {
    name: 'selection',
    type: 'any[][]',
    default: '[[], []]',
    description: 'Selected items in each list as [source, target]. Use with v-model:selection.',
  },
  {
    name: 'showSourceControls',
    type: 'boolean',
    default: 'true',
    description:
      'Shows the reorder buttons beside the source list. Turn off when the source order has no meaning.',
  },
  {
    name: 'showTargetControls',
    type: 'boolean',
    default: 'true',
    description: 'Shows the reorder buttons beside the target list.',
  },
  {
    name: 'moveToTargetProps',
    type: 'object',
    default: '-',
    description:
      'Attributes for the move-to-target button, such as an aria-label that names the task. moveAllToTargetProps, moveToSourceProps and moveAllToSourceProps do the same for the other buttons.',
  },
  {
    name: 'filterBy',
    type: 'string',
    default: '-',
    description: 'Fields to search. Setting it adds a filter input above each list.',
  },
  {
    name: 'breakpoint',
    type: 'string',
    default: '960px',
    description: 'Width below which the lists and buttons stack vertically.',
  },
]
const accessibility = [
  'PickList has no prop for naming its lists, so this example sets aria-label on each listbox through pt. Match the names to the visible headers.',
  'The transfer buttons are labelled Move to Target, Move All to Target, Move to Source and Move All to Source by default. Replace these with task names, such as Assign selected suppliers, through the move button props.',
  'Arrow keys move focus within a list, Space or Enter selects, and Tab moves between the lists and the buttons. There is no drag and drop, so every move uses the buttons.',
]
</script>

<template>
  <ComponentDoc
    title="PickList"
    componentName="PickList"
    category="Data"
    description="Move items between an available list and a chosen list, such as assigning suppliers to a route."
    usage="binds a pair of arrays with v-model: the source list followed by the target list. People select items, then use the transfer buttons. For long lists, add filterBy so people can search both lists."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/picklist"
  />
</template>
