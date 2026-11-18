<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/AnimateOnScrollExample.vue'
import code from '@/components/docs/examples/AnimateOnScrollExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Animate a content reveal as it enters the viewport.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Respect reduced-motion preferences and keep important content available without animation.',
]
</script>

<template>
  <ComponentDoc
    title="AnimateOnScroll"
    componentName="AnimateOnScroll"
    category="Misc"
    description="Animate a content reveal as it enters the viewport."
    usage="is a directive imported as vAnimateonscroll. Essential content remains visible when reduced motion is requested."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/animateonscroll"
  />
</template>
