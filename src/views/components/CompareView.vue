<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/CompareExample.vue'
import code from '@/components/docs/examples/CompareExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Drag the handle, or focus it and use the arrow keys, to reveal more of the before or after view.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'number',
    default: '(min + max) / 2',
    description: 'Position of the divider. Use v-model to read or set it.',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    description: 'Value when the divider is at the start.',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'Value when the divider is at the end.',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    description: 'Amount each arrow key press moves the divider.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: 'horizontal',
    description: 'Whether the divider moves left and right or up and down.',
  },
  {
    name: 'slideOnHover',
    type: 'boolean',
    default: 'false',
    description:
      'Moves the divider with the pointer without dragging. Keyboard and touch still work.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '-',
    description:
      'Accessible name for the slider. Use ariaLabelledby to point at a visible heading instead.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Stops the divider from moving and removes it from the tab order.',
  },
]
const accessibility = [
  'CompareIndicator contains a visually hidden range input, which is what keyboard and screen reader users operate. Always include CompareIndicator, and name the comparison with aria-label or aria-labelledby on Compare.',
  'Arrow keys move the divider one step at a time, Page Up and Page Down move it further, and Home and End jump to either edge.',
  'The slider announces a number, not what is visible. Label each side in text, as the example does, and describe any difference that matters in nearby text.',
]
</script>

<template>
  <ComponentDoc
    title="Compare"
    componentName="Compare"
    category="Media"
    description="Compare two versions of the same view by moving a divider between them, such as photos before and after packing."
    usage="is built from parts: two CompareItem elements with position before and after, a CompareHandle for the divider line, and a CompareIndicator that holds the keyboard control. Both items must be the same size."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/compare"
  />
</template>
