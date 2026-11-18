<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/StyleClassExample.vue'
import code from '@/components/docs/examples/StyleClassExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Toggle a class on a nearby element.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Synchronise aria-expanded with the visible state and connect the trigger to the controlled region.',
]
</script>

<template>
  <ComponentDoc
    title="StyleClass"
    componentName="StyleClass"
    category="Misc"
    description="Toggle a class on a nearby element."
    usage="is a directive for DOM class changes. Prefer Vue state and v-show when visibility also affects application logic."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/styleclass"
  />
</template>
