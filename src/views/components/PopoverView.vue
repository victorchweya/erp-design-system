<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/blocks/popups/RecordPopoverBlock.vue'
import code from '@/components/blocks/popups/RecordPopoverBlock.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Show contextual record details without leaving the page.',
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
    title="Popover"
    componentName="Popover"
    category="Overlay"
    description="Show contextual record details without leaving the page."
    usage="opens relative to its trigger through the component toggle method."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/popover"
  />
</template>
