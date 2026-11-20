<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/DeferredContentExample.vue'
import code from '@/components/docs/examples/DeferredContentExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Load data when visible',
    description:
      'Fetch below-the-fold data in the load event so the first view of the page renders faster.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'load event',
    type: '() => void',
    default: '—',
    description:
      'Fires once, when the content first enters the viewport. Start data requests here.',
  },
  {
    name: 'default slot',
    type: 'VNode[]',
    default: '—',
    description: 'Content that is not rendered until it is visible.',
  },
]
const accessibility = [
  'Do not defer navigation or content needed to complete the task.',
  'DeferredContent adds no role. Add aria-live="polite" when people should hear that new content has loaded, and show a loading state while data is fetched.',
  'Content that has not loaded cannot be found with the browser’s find in page. Load search-critical content up front.',
]
</script>

<template>
  <ComponentDoc
    title="DeferredContent"
    componentName="DeferredContent"
    category="Panel"
    description="Postpone rendering content until it scrolls into view."
    usage="wraps content that can wait until it becomes visible. It renders the slot and emits load once; it does not fetch data for you."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/deferredcontent"
  />
</template>
