<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/FocusTrapExample.vue'
import code from '@/components/docs/examples/FocusTrapExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Trap with an exit',
    description:
      'Render the trapped region with v-if while it is open. autoFocus moves focus into it; Escape and Done return focus to the trigger.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'autoFocus',
    type: 'boolean',
    default: 'false',
    description:
      'Focuses the first focusable element when the trap mounts. An element with the autofocus attribute is focused either way.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description:
      'Skips the trap. It is read only when the element mounts, so toggling it later has no effect. Use v-if instead.',
  },
]
const accessibility = [
  'Never create an inescapable keyboard trap. Always offer Escape and a visible button that releases focus.',
  'FocusTrap does not restore focus when the region closes. Return focus to the control that opened it yourself.',
  'Dialog and Drawer already trap focus; do not add a second trap inside them.',
]
</script>

<template>
  <ComponentDoc
    title="FocusTrap"
    componentName="FocusTrap"
    category="Misc"
    description="Keep keyboard focus inside an explicitly activated region."
    usage="FocusTrap is a directive imported from primevue/focustrap as vFocustrap. Use it for custom overlays that PrimeVue does not provide, mount it only while the overlay is open, and always provide an exit."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/focustrap"
  />
</template>
