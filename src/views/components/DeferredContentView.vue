<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/DeferredContentExample.vue'
import code from '@/components/docs/examples/DeferredContentExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Load content when it reaches the viewport.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = ['Do not defer essential navigation or content needed to complete the task.']
</script>

<template>
  <ComponentDoc
    title="DeferredContent"
    componentName="DeferredContent"
    category="Panels"
    description="Load content when it reaches the viewport."
    usage="wraps content that can wait until it becomes visible. It does not automatically fetch data."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/deferredcontent"
  />
</template>
