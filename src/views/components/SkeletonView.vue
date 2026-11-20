<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import SkeletonExample from '@/components/docs/examples/SkeletonExample.vue'
import code0 from '@/components/docs/examples/SkeletonExample.vue?raw'
import SkeletonShapesExample from '@/components/docs/examples/SkeletonShapesExample.vue'
import code1 from '@/components/docs/examples/SkeletonShapesExample.vue?raw'
const examples = [
  {
    id: 'skeleton-0',
    title: 'Loading content',
    description: 'Keep the placeholder close to the final layout to reduce movement.',
    component: SkeletonExample,
    code: code0,
  },
  {
    id: 'skeleton-1',
    title: 'Shapes',
    description:
      'Use circle, width, height, and size. Disable animation when movement is unnecessary.',
    component: SkeletonShapesExample,
    code: code1,
  },
]
const api = [
  {
    name: 'shape',
    type: "'rectangle' | 'circle'",
    default: 'rectangle',
    description: 'Rectangle or circle.',
  },
  {
    name: 'size',
    type: 'string',
    default: '—',
    description: 'CSS width and height together, for a square or circle.',
  },
  {
    name: 'width',
    type: 'string',
    default: '100%',
    description: 'CSS width.',
  },
  {
    name: 'height',
    type: 'string',
    default: '1rem',
    description: 'CSS height.',
  },
  {
    name: 'borderRadius',
    type: 'string',
    default: '—',
    description: 'Overrides the theme radius, for example to match a card.',
  },
  {
    name: 'animation',
    type: "'wave' | 'none'",
    default: 'wave',
    description: 'Shimmer animation, or none for a static placeholder.',
  },
]
const accessibility = [
  'Each Skeleton renders with aria-hidden="true". Set aria-busy on the container and announce loading once with a status message.',
  'The global reduced-motion rule in main.css stops the shimmer for people who ask for less motion. Use animation="none" where many placeholders would move at once.',
]
</script>

<template>
  <ComponentDoc
    title="Skeleton"
    category="Misc"
    description="Reserve space for content while it loads."
    usage="Match the placeholder to the content shape. Place related skeletons inside a container marked aria-busy, then replace the whole group when loading completes."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/skeleton"
  />
</template>
