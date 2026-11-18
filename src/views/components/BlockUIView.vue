<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/BlockUIExample.vue'
import code from '@/components/docs/examples/BlockUIExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Prevent interaction with a region while work is pending.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'blocked',
    type: 'boolean',
    default: 'false',
    description: 'Controls the blocked state.',
  },
]
const accessibility = [
  'An overlay alone does not stop keyboard interaction. Disable or make the busy controls inert and announce the busy state.',
]
</script>

<template>
  <ComponentDoc
    title="BlockUI"
    componentName="BlockUI"
    category="Misc"
    description="Prevent interaction with a region while work is pending."
    usage="uses blocked for its overlay. Keep an unblock or cancel action outside the blocked region."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/blockui"
  />
</template>
