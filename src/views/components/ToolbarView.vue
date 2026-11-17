<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import ToolbarExample from '@/components/docs/examples/ToolbarExample.vue'
import code0 from '@/components/docs/examples/ToolbarExample.vue?raw'
const examples = [
  {
    id: 'toolbar-0',
    title: 'Grouped actions',
    description: 'These actions only update the local preview.',
    component: ToolbarExample,
    code: code0,
  },
]
const api: never[] = []
const accessibility = [
  'Give the toolbar a name that identifies its purpose.',
  'Controls follow the normal tab sequence. Retain clear labels and visible focus.',
]
</script>

<template>
  <ComponentDoc
    title="Toolbar"
    category="Core elements"
    description="Keep related actions together above the content they affect."
    usage="Use the start, center, and end slots to arrange actions. Keep the number of actions small and allow space for narrower screens."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/toolbar"
  />
</template>
