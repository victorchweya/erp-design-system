<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/RippleExample.vue'
import code from '@/components/docs/examples/RippleExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Add pointer feedback to an interactive surface.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Keep interactive surfaces as native buttons; ripple must not be the only feedback.',
]
</script>

<template>
  <ComponentDoc
    title="Ripple"
    componentName="Ripple"
    category="Misc"
    description="Add pointer feedback to an interactive surface."
    usage="is a directive and requires ripple: true in the PrimeVue configuration. The application enables it once in main.ts."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/ripple"
  />
</template>
