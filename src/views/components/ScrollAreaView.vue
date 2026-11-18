<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ScrollAreaExample.vue'
import code from '@/components/docs/examples/ScrollAreaExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'A bounded, keyboard-accessible scrolling region.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'The viewport must be focusable and named. Keep native wheel, touch, and keyboard scrolling.',
]
</script>

<template>
  <ComponentDoc
    title="ScrollArea"
    componentName="ScrollArea"
    category="Panels"
    description="A bounded, keyboard-accessible scrolling region."
    usage="composes a viewport, content, scrollbar, and handle."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/scrollarea"
  />
</template>
