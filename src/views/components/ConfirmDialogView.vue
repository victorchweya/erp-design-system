<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/blocks/modals/ConfirmationModalBlock.vue'
import code from '@/components/blocks/modals/ConfirmationModalBlock.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Ask for confirmation before committing an action.',
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
    title="ConfirmDialog"
    componentName="ConfirmDialog"
    category="Overlay"
    description="Ask for confirmation before committing an action."
    usage="uses useConfirm with the ConfirmationService registered once in main.ts."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/confirmdialog"
  />
</template>
