<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import RatingExample from '@/components/docs/examples/RatingExample.vue'
import code0 from '@/components/docs/examples/RatingExample.vue?raw'
const examples = [
  {
    id: 'rating-0',
    title: 'Interactive and read-only ratings',
    description: 'Keep a text equivalent for the selected score.',
    component: RatingExample,
    code: code0,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'null | number',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    default: 'false',
    description: 'Display the value without allowing edits.',
  },
  {
    name: 'stars',
    type: 'number',
    default: '5',
    description: 'Number of stars in the rating scale.',
  },
]
const accessibility = [
  'Group the rating with a visible legend. The component names its star options.',
  'Use the native radio-style keyboard controls and keep the scale understandable without colour.',
]
</script>

<template>
  <ComponentDoc
    title="Rating"
    category="Forms"
    description="Collect a rating on a short, clearly described scale."
    usage="Bind a number with v-model. Use stars to set the scale, readonly to display a recorded score, and disabled when editing is unavailable."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/rating"
  />
</template>
