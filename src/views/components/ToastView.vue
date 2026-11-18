<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ToastExample.vue'
import code from '@/components/docs/examples/ToastExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Severity',
    description: 'Success, information, warning, error, secondary, and contrast feedback.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'group',
    type: 'string',
    default: '-',
    description: 'Unique identifier of a message group.',
  },
  {
    name: 'breakpoints',
    type: 'ToastBreakpointsType',
    default: '-',
    description: 'Object literal to define styles per screen size.',
  },
]
const accessibility = [
  'Do not put essential instructions only in a disappearing message. Keep the native close button accessible.',
]
</script>

<template>
  <ComponentDoc
    title="Toast"
    componentName="Toast"
    category="Messages"
    description="Transient feedback after a local action."
    usage="uses useToast with ToastService registered once in main.ts. Keep important information available outside a toast."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/toast"
  />
</template>
