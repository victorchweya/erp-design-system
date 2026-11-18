<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/FocusTrapExample.vue'
import code from '@/components/docs/examples/FocusTrapExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Keep keyboard focus inside an explicitly activated region.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Never create an inescapable keyboard trap. Dialog and Drawer already manage focus; avoid adding a second trap.',
]
</script>

<template>
  <ComponentDoc
    title="FocusTrap"
    componentName="FocusTrap"
    category="Misc"
    description="Keep keyboard focus inside an explicitly activated region."
    usage="is a directive. Enable the trap only when needed and always provide an exit."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/focustrap"
  />
</template>
