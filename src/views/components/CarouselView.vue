<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/CarouselExample.vue'
import code from '@/components/docs/examples/CarouselExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Browse related content one slide at a time.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Give the carousel and navigation controls meaningful labels. Prefer manual navigation to autoplay.',
]
</script>

<template>
  <ComponentDoc
    title="Carousel"
    componentName="Carousel"
    category="Media"
    description="Browse related content one slide at a time."
    usage="composes content, items, indicators, and navigation controls. This example does not autoplay."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/carousel"
  />
</template>
