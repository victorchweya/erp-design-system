<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/OrderListExample.vue'
import code from '@/components/docs/examples/OrderListExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Select and reorder delivery priorities.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'modelValue', type: 'any[]', default: '-', description: 'Value of the component.' },
  {
    name: 'dataKey',
    type: 'string | Function',
    default: '-',
    description: 'Property name or getter function that uniquely identifies a record in the data.',
  },
  { name: 'selection', type: 'any[]', default: '-', description: 'Selected items in the list.' },
  {
    name: 'metaKeySelection',
    type: 'boolean',
    default: 'false',
    description:
      'Defines whether metaKey is required or not for the selection.\nWhen true metaKey needs to be pressed to select or unselect an item and\nwhen set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.',
  },
  {
    name: 'autoOptionFocus',
    type: 'boolean',
    default: 'true',
    description: 'Whether to focus on the first visible or selected element.',
  },
  {
    name: 'focusOnHover',
    type: 'boolean',
    default: 'true',
    description: 'When enabled, the focus is placed on the hovered option.',
  },
  {
    name: 'listStyle',
    type: 'any',
    default: '-',
    description: 'Inline style of the the list element.',
  },
  {
    name: 'responsive',
    type: 'boolean',
    default: 'true',
    description: 'Whether the list optimizes layout based on screen size.',
  },
]
const accessibility = [
  'Use arrow keys to navigate options and Space to select. Move controls also work without dragging.',
]
</script>

<template>
  <ComponentDoc
    title="OrderList"
    componentName="OrderList"
    category="Data"
    description="Select and reorder delivery priorities."
    usage="binds the reordered array with v-model. Select items before using the move controls."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/orderlist"
  />
</template>
