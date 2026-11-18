<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/blocks/popups/ConfirmPopupBlock.vue'
import code from '@/components/blocks/popups/ConfirmPopupBlock.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Confirm a contextual action next to its trigger.',
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
    title="ConfirmPopup"
    componentName="ConfirmPopup"
    category="Overlay"
    description="Confirm a contextual action next to its trigger."
    usage="uses useConfirm and the trigger element as target. Register ConfirmationService once."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/confirmpopup"
  />
</template>
