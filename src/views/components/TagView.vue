<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import TagSeverityExample from '@/components/docs/examples/TagSeverityExample.vue'
import code0 from '@/components/docs/examples/TagSeverityExample.vue?raw'
import TagContentExample from '@/components/docs/examples/TagContentExample.vue'
import code1 from '@/components/docs/examples/TagContentExample.vue?raw'
const examples = [
  {
    id: 'tag-0',
    title: 'Severities',
    description:
      'Order statuses, from left: primary (the default), secondary, success, info, warn, danger, and contrast. Primary uses Kale and success uses emerald. Help is a Button-only severity.',
    component: TagSeverityExample,
    code: code0,
  },
  {
    id: 'tag-1',
    title: 'Icons and shape',
    description:
      'Keep the label alongside its icon. Rounded changes the shape without changing its meaning.',
    component: TagContentExample,
    code: code1,
  },
]
const api = [
  {
    name: 'value',
    type: 'any',
    default: '—',
    description: 'Text label. Use the default slot for richer content.',
  },
  {
    name: 'severity',
    type: "'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast'",
    default: '—',
    description: 'Semantic colour. Omit for primary.',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: 'false',
    description: 'Use a pill shape.',
  },
  {
    name: 'icon',
    type: 'string',
    default: '—',
    description: 'Icon class shown before the value. Use the icon slot for an icon component.',
  },
]
const accessibility = [
  'Tags are labels, not controls. Do not add them to the tab order unless they perform an action.',
  'Keep a text label alongside colour. Hide decorative icons from assistive technology.',
]
</script>

<template>
  <ComponentDoc
    title="Tag"
    category="Misc"
    description="Label content, categories, and statuses with a short phrase."
    usage="Put readable text in the default slot. Use severity for status and rounded for a pill shape. Choose Badge for counts."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/tag"
  />
</template>
