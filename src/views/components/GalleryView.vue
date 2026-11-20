<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/GalleryExample.vue'
import code from '@/components/docs/examples/GalleryExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Step through brand assets with the previous and next buttons, or focus the gallery and use Left and Right Arrow. The caption below names the current image.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'activeIndex',
    type: 'number',
    default: '0',
    description: 'Index of the image on show. Use v-model:activeIndex to read or set it.',
  },
  {
    name: 'fullscreen',
    type: 'boolean',
    default: '-',
    description:
      'Whether the gallery fills the screen. Use v-model:fullscreen, or add GalleryFullscreen for a built-in toggle.',
  },
  {
    name: 'closeOnEscape',
    type: 'boolean',
    default: 'true',
    description: 'Leaves full screen when Escape is pressed.',
  },
  {
    name: 'normalScale',
    type: 'number',
    default: '1',
    description: 'GalleryItem prop. Scale of the image before zooming.',
  },
  {
    name: 'zoomedScale',
    type: 'number',
    default: '3',
    description: 'GalleryItem prop. Scale of the image after zooming in.',
  },
]
const accessibility = [
  'Give every image alt text that says what it shows, such as Delivery note for FTF-1042, signed. Use empty alt only for decorative images.',
  'The gallery root is focusable but has no role. Add role region and an aria-label so screen readers announce it on focus.',
  'With the gallery focused, Left and Right Arrow change image and Escape leaves full screen. Image changes are not announced, so add a status message with the image number and description.',
  'GalleryPrev, GalleryNext and the action buttons, such as GalleryZoomIn, have no default labels and no theme focus style. Give each one an aria-label and a visible focus style.',
]
</script>

<template>
  <ComponentDoc
    title="Gallery"
    componentName="Gallery"
    category="Media"
    description="View a set of images one at a time, with optional zoom, rotate, full screen and download controls."
    usage="Gallery is built from parts: GalleryContent holds one GalleryItem per image, and GalleryPrev, GalleryNext and the action parts, such as GalleryZoomIn and GalleryDownload, control it. Use it for delivery photos, proof of delivery and scanned documents."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/gallery"
  />
</template>
