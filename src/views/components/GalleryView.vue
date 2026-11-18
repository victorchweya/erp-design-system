<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/GalleryExample.vue'
import code from '@/components/docs/examples/GalleryExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'View local brand assets in a navigable gallery.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Provide useful image alternatives and labelled navigation. Keep image controls keyboard operable.',
]
</script>

<template>
  <ComponentDoc
    title="Gallery"
    componentName="Gallery"
    category="Media"
    description="View local brand assets in a navigable gallery."
    usage="composes content, items, and previous/next controls."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/gallery"
  />
</template>
