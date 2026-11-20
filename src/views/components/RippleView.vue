<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/RippleExample.vue'
import code from '@/components/docs/examples/RippleExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Custom action tile',
    description:
      'Add v-ripple to a custom button. PrimeVue components such as Button already include the ripple, so do not add it to them.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'ripple (PrimeVue config)',
    type: 'boolean',
    default: 'false',
    description:
      'Turns ripples on for PrimeVue components and v-ripple. This app sets it to true in main.ts.',
  },
  {
    name: 'v-ripple',
    type: 'directive',
    default: '—',
    description: 'Takes no value. The host element needs position relative and overflow hidden.',
  },
  {
    name: 'ripple.background',
    type: 'token',
    default: 'theme',
    description: 'Colour of the ripple, set per colour scheme in the theme.',
  },
]
const accessibility = [
  'Put v-ripple on a native button or link. The ripple adds no role, name, or keyboard support.',
  'Ripple is pointer-only feedback. Keep a visible hover, focus, and result state as well.',
  'When reduced motion is requested, the global rule in main.css shortens the ripple animation to almost nothing, so no extra handling is needed.',
]
</script>

<template>
  <ComponentDoc
    title="Ripple"
    componentName="Ripple"
    category="Misc"
    description="Show a brief ink effect where a pointer presses an interactive surface."
    usage="Ripple is a directive imported from primevue/ripple as vRipple. It only works when ripple is true in the PrimeVue configuration, which main.ts enables. Use it on custom clickable surfaces only."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/ripple"
  />
</template>
