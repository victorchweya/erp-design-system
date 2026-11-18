<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/DockExample.vue'
import code from '@/components/docs/examples/DockExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'A compact row of icon-based actions.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '-',
    description: 'MenuModel instance to define the action items.',
  },
  { name: 'position', type: 'any', default: 'bottom', description: 'Position of element.' },
  { name: 'class', type: 'any', default: '-', description: 'Style class of the element.' },
]
const accessibility = ['Each icon action needs a text label in the model and keyboard access.']
</script>

<template>
  <ComponentDoc
    title="Dock"
    componentName="Dock"
    category="Menus"
    description="A compact row of icon-based actions."
    usage="accepts a menu model and a custom itemicon slot."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/dock"
  />
</template>
