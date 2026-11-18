<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/SplitterExample.vue'
import code from '@/components/docs/examples/SplitterExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Resize neighbouring content areas.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'The gutter supports keyboard resizing. Keep both panels usable at their minimum sizes.',
]
</script>

<template>
  <ComponentDoc
    title="Splitter"
    componentName="Splitter"
    category="Panel"
    description="Resize neighbouring content areas."
    usage="uses SplitterPanel size and minSize values as percentages."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/splitter"
  />
</template>
