<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/FluidExample.vue'
import code from '@/components/docs/examples/FluidExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Make supported controls fill the available width.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Keep visible labels connected to inputs; full-width sizing does not change their accessible names.',
]
</script>

<template>
  <ComponentDoc
    title="Fluid"
    componentName="Fluid"
    category="Misc"
    description="Make supported controls fill the available width."
    usage="provides a fluid context for its child inputs and buttons."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/fluid"
  />
</template>
