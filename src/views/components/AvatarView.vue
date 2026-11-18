<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import AvatarExample from '@/components/docs/examples/AvatarExample.vue'
import code0 from '@/components/docs/examples/AvatarExample.vue?raw'
import AvatarGroupExample from '@/components/docs/examples/AvatarGroupExample.vue'
import code1 from '@/components/docs/examples/AvatarGroupExample.vue?raw'
const examples = [
  {
    id: 'avatar-0',
    title: 'Shape and size',
    description: 'Default, large, and xlarge sizes use the shared theme.',
    component: AvatarExample,
    code: code0,
  },
  {
    id: 'avatar-1',
    title: 'Groups',
    description: 'Keep a group label and meaningful names for each person.',
    component: AvatarGroupExample,
    code: code1,
  },
]
const api = [
  {
    name: 'label',
    type: 'string',
    default: '—',
    description: 'Initials or short fallback text.',
  },
  {
    name: 'image',
    type: 'string',
    default: '—',
    description: 'Image URL.',
  },
  {
    name: 'size',
    type: 'any',
    default: 'normal',
    description: 'Default, large, or xlarge.',
  },
  {
    name: 'shape',
    type: 'any',
    default: 'square',
    description: 'Square or circle.',
  },
]
const accessibility = [
  'Initials alone may not identify a person. Add a full accessible name when the avatar carries identity.',
  'If a visible name already gives the same information, use aria-hidden on the decorative avatar.',
]
</script>

<template>
  <ComponentDoc
    title="Avatar"
    category="Misc"
    description="Represent a person or a team with initials, an image, or an icon."
    usage="Use label for initials, image for a photo, and shape for square or circle. Group people with AvatarGroup."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/avatar"
  />
</template>
