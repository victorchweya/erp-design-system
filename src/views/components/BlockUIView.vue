<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/BlockUIExample.vue'
import code from '@/components/docs/examples/BlockUIExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Block a region while saving',
    description:
      'Bind blocked to the pending state. The mask stops pointer input; the disabled fieldset stops keyboard input.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'blocked',
    type: 'boolean',
    default: 'false',
    description: 'Shows the mask and sets aria-busy on the container.',
  },
  {
    name: 'fullScreen',
    type: 'boolean',
    default: 'false',
    description: 'Blocks the whole document instead of the wrapped content.',
  },
  {
    name: 'autoZIndex',
    type: 'boolean',
    default: 'true',
    description: 'Manages the mask’s z-index automatically.',
  },
  {
    name: 'baseZIndex',
    type: 'number',
    default: '0',
    description: 'Starting z-index when autoZIndex is on.',
  },
  {
    name: 'block / unblock events',
    type: '() => void',
    default: '—',
    description: 'Fire when the mask is shown and removed.',
  },
]
const accessibility = [
  'BlockUI sets aria-busy on its container, but the mask does not stop keyboard focus. Disable the blocked controls, for example with a disabled fieldset or inert.',
  'Announce the busy state and its end in text, such as a role="status" message.',
  'Keep a cancel action outside the blocked region and avoid fullScreen for long tasks; people need a way out.',
]
</script>

<template>
  <ComponentDoc
    title="BlockUI"
    componentName="BlockUI"
    category="Misc"
    description="Prevent interaction with part of the page while work is pending."
    usage="uses blocked for its overlay. Keep an unblock or cancel action outside the blocked region."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/blockui"
  />
</template>
