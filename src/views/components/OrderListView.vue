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
  {
    name: 'modelValue',
    type: 'any[]',
    default: '-',
    description: 'Items in their current order. Use v-model to receive the reordered array.',
  },
  {
    name: 'dataKey',
    type: 'string | Function',
    default: '-',
    description: 'Field that uniquely identifies each item.',
  },
  {
    name: 'selection',
    type: 'any[]',
    default: '-',
    description: 'Selected items that the move buttons act on. Use with v-model:selection.',
  },
  {
    name: 'metaKeySelection',
    type: 'boolean',
    default: 'false',
    description:
      'When true, Ctrl or Cmd is needed to add to a selection. Keep the default so each click toggles one item.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '-',
    description:
      'Accessible name for the list. Use ariaLabelledby to point at a visible heading instead.',
  },
  {
    name: 'breakpoint',
    type: 'string',
    default: '960px',
    description: 'Width below which the move buttons stack above the list.',
  },
  {
    name: 'scrollHeight',
    type: 'string',
    default: '14rem',
    description: 'Height of the list before it scrolls.',
  },
]
const accessibility = [
  'Name the list with aria-label or aria-labelledby. The name goes on the listbox, not the wrapper.',
  'Up and Down Arrow move focus, Space or Enter selects, and Shift with an arrow extends the selection. Tab then reaches the move buttons, which take their labels (Move Up, Move Top, Move Down, Move Bottom) from the PrimeVue locale.',
  'Show the position in text, such as a number before each item, so the order is clear without seeing the layout.',
]
</script>

<template>
  <ComponentDoc
    title="OrderList"
    componentName="OrderList"
    category="Data"
    description="Let people put a short list of items in order, such as delivery stops or approval steps."
    usage="OrderList binds the array with v-model and returns it in the new order. People select one or more items, then use the move buttons. Save the order explicitly; OrderList does not persist it."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/orderlist"
  />
</template>
