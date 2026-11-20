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
    description:
      'Square and circle shapes in normal, large, and xlarge sizes. Each avatar has role img and the full name.',
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
    description: 'Initials or other short text.',
  },
  {
    name: 'image',
    type: 'string',
    default: '—',
    description:
      'Image URL. Shown only when label and icon are unset; handle the error event to switch to initials.',
  },
  {
    name: 'icon',
    type: 'string',
    default: '—',
    description: 'Icon class. Use the default slot for an icon component.',
  },
  {
    name: 'size',
    type: "'normal' | 'large' | 'xlarge'",
    default: 'normal',
    description: 'Avatar size.',
  },
  {
    name: 'shape',
    type: "'square' | 'circle'",
    default: 'square',
    description: 'Avatar shape. Use one shape consistently within a view.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: '—',
    description: 'Accessible name. Pair it with role="img" so the name is announced.',
  },
]
const accessibility = [
  'Avatar renders a plain element with no role. When it is the only identification, add role="img" and the full name with aria-label, because initials alone do not identify a person.',
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
