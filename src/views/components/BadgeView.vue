<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import BadgeSeverityExample from '@/components/docs/examples/BadgeSeverityExample.vue'
import code0 from '@/components/docs/examples/BadgeSeverityExample.vue?raw'
import BadgeSizesExample from '@/components/docs/examples/BadgeSizesExample.vue'
import code1 from '@/components/docs/examples/BadgeSizesExample.vue?raw'
import BadgeOverlayExample from '@/components/docs/examples/BadgeOverlayExample.vue'
import code2 from '@/components/docs/examples/BadgeOverlayExample.vue?raw'
const examples = [
  {
    id: 'badge-0',
    title: 'Severities',
    description: 'Badge supports the same seven native severities as Tag.',
    component: BadgeSeverityExample,
    code: code0,
  },
  {
    id: 'badge-1',
    title: 'Sizes and context',
    description:
      'Small, default, large, and xlarge sizes. Give a notification button one accessible name that includes its count.',
    component: BadgeSizesExample,
    code: code1,
  },
  {
    id: 'badge-2',
    title: 'OverlayBadge',
    description:
      'OverlayBadge pins a count or dot to the corner of an icon button. Put the count in the button name and hide the badge from screen readers.',
    component: BadgeOverlayExample,
    code: code2,
  },
]
const api = [
  {
    name: 'value',
    type: 'string | number',
    default: '—',
    description: 'Count or short indicator text.',
  },
  {
    name: 'severity',
    type: 'any',
    default: '—',
    description: 'Semantic colour variant.',
  },
  {
    name: 'size',
    type: 'any',
    default: '—',
    description: 'Small, default, large, or xlarge.',
  },
]
const accessibility = [
  'A number alone needs context, such as unread notifications or orders awaiting review.',
  'Badges are not interactive. When a button already announces the count, hide the duplicate badge from screen readers.',
  'OverlayBadge passes attributes to its wrapper, not the badge. Use pt.pcBadge.root to set aria-hidden on the badge, and give the wrapped icon button an aria-label that includes the count.',
  'Remove the overlay when the count reaches zero, and announce changes the user caused in a status message.',
]
</script>

<template>
  <ComponentDoc
    title="Badge"
    category="Misc"
    description="Show a count or small indicator alongside related content."
    usage="Use value for the count and size for density. Put the badge next to the item it describes. Wrap an icon button in OverlayBadge to show a count on its corner; omit value for a dot. Choose Tag for a status phrase."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/badge"
  />
</template>
