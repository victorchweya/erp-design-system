<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import BadgeSeverityExample from '@/components/docs/examples/BadgeSeverityExample.vue'
import code0 from '@/components/docs/examples/BadgeSeverityExample.vue?raw'
import BadgeSizesExample from '@/components/docs/examples/BadgeSizesExample.vue'
import code1 from '@/components/docs/examples/BadgeSizesExample.vue?raw'
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
]
</script>

<template>
  <ComponentDoc
    title="Badge"
    category="Core elements"
    description="Show a count or small indicator alongside related content."
    usage="Use value for the count and size for density. Put the badge next to the item it describes. Choose Tag for a status phrase."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/badge"
  />
</template>
