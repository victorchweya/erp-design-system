<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/PickListExample.vue'
import code from '@/components/docs/examples/PickListExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Move suppliers between available and assigned lists.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'any[][]',
    default: '-',
    description: 'Value of the component as a multidimensional array.',
  },
  {
    name: 'selection',
    type: 'any[][]',
    default: '-',
    description: 'Selected items in the list as a multidimensional array.',
  },
  {
    name: 'dataKey',
    type: 'string | Function',
    default: '-',
    description: 'Property name or getter function that uniquely identifies a record in the data.',
  },
  {
    name: 'metaKeySelection',
    type: 'boolean',
    default: 'false',
    description:
      'Defines whether metaKey is requred or not for the selection.\nWhen true metaKey needs to be pressed to select or unselect an item and\nwhen set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.',
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
  'Label both lists and retain the native transfer buttons so dragging is optional.',
]
</script>

<template>
  <ComponentDoc
    title="PickList"
    componentName="PickList"
    category="Data"
    description="Move suppliers between available and assigned lists."
    usage="binds a pair of arrays with v-model: the source list followed by the target list."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/picklist"
  />
</template>
