<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/blocks/drawers/DrawerWidthsBlock.vue'
import code from '@/components/blocks/drawers/DrawerWidthsBlock.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Use a side panel for contextual content.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Give the overlay a descriptive heading and its trigger an accessible name.',
  'Keep Escape and focus restoration working.',
]
</script>

<template>
  <ComponentDoc
    title="Drawer"
    componentName="Drawer"
    category="Overlay"
    description="Use a side panel for contextual content."
    usage="binds visible and supports full, half, third, and quarter-width layouts."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/drawer"
  />
</template>
