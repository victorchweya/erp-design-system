<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import ImagePreviewExample from '@/components/docs/examples/ImagePreviewExample.vue'
import code0 from '@/components/docs/examples/ImagePreviewExample.vue?raw'
import ImagePreviewIconExample from '@/components/docs/examples/ImagePreviewIconExample.vue'
import code1 from '@/components/docs/examples/ImagePreviewIconExample.vue?raw'

const examples = [
  {
    id: 'image-0',
    title: 'Preview',
    description:
      'Enable preview so people can zoom and rotate artwork or product photos before approving them.',
    component: ImagePreviewExample,
    code: code0,
  },
  {
    id: 'image-1',
    title: 'Custom preview icon',
    description:
      'Replace the default eye icon with the previewicon slot when another icon better describes the action.',
    component: ImagePreviewIconExample,
    code: code1,
  },
]
const api = [
  {
    name: 'src',
    type: 'string',
    default: '—',
    description: 'Image URL. Import local assets so the build can fingerprint them.',
  },
  {
    name: 'alt',
    type: 'string',
    default: '—',
    description: 'Native img attribute, like width, passed through to the image element.',
  },
  {
    name: 'preview',
    type: 'boolean',
    default: 'false',
    description: 'Opens a modal preview with zoom and rotate controls.',
  },
  {
    name: 'imageClass',
    type: 'any',
    default: '—',
    description: 'Classes for the image element.',
  },
  {
    name: 'pt',
    type: 'ImagePassThroughOptions',
    default: '—',
    description: 'Adds attributes such as previewMask, mask, and original labels.',
  },
]
const accessibility = [
  'Write alt text that says what the image shows in context, such as the product, variety, and pack size. Use an empty alt only for decorative images.',
  'The enlarged image has no alt by default. Pass the same text through pt.original.alt.',
  'The preview button is labelled “Zoom Image” by default. Give it a specific label with pt.previewMask, and name the dialog with pt.mask.',
  'In the preview, focus starts on the close button, Tab moves through the toolbar, and Escape closes it. Focus then returns to the preview button.',
]
</script>

<template>
  <ComponentDoc
    title="Image"
    componentName="Image"
    category="Media"
    description="Show a product photo or artwork with an optional zoomable preview."
    usage="Image works like a native img with src and alt. Add preview for images people need to inspect. Use Gallery when there are several images to browse."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/image"
  />
</template>
