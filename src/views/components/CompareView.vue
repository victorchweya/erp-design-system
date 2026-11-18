<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/CompareExample.vue'
import code from '@/components/docs/examples/CompareExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Reveal two versions with an adjustable comparison handle.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Name the comparison and keep the native range input available for keyboard adjustment.',
]
</script>

<template>
  <ComponentDoc
    title="Compare"
    componentName="Compare"
    category="Media"
    description="Reveal two versions with an adjustable comparison handle."
    usage="composes before/after items and a keyboard-operable indicator."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/compare"
  />
</template>
