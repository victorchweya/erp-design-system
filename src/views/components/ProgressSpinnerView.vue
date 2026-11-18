<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ProgressSpinnerExample.vue'
import code from '@/components/docs/examples/ProgressSpinnerExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'A compact indicator for work in progress.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'null | number',
    default: 'null',
    description: 'Current progress value. When null, the component is in indeterminate mode.',
  },
]
const accessibility = ['Give the spinner an accessible name and retain visible status text.']
</script>

<template>
  <ComponentDoc
    title="ProgressSpinner"
    componentName="ProgressSpinner"
    category="Misc"
    description="A compact indicator for work in progress."
    usage="supports indeterminate loading and a determinate value."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/progressspinner"
  />
</template>
