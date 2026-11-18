<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/blocks/modals/AssignmentModalBlock.vue'
import code from '@/components/blocks/modals/AssignmentModalBlock.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Edit a small task in a modal dialog.',
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
    title="Dialog"
    componentName="Dialog"
    category="Overlays"
    description="Edit a small task in a modal dialog."
    usage="binds visible and uses native focus trapping, Escape handling, and labelled headers."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/dialog"
  />
</template>
