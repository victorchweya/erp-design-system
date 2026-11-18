<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/DynamicDialogExample.vue'
import code from '@/components/docs/examples/DynamicDialogExample.vue?raw'
import Content from '@/components/docs/examples/DeliveryDetailsContent.vue'
import contentCode from '@/components/docs/examples/DeliveryDetailsContent.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Create a dialog from a reusable content component.',
    component: Example,
    code: code,
  },
  {
    id: 'content',
    title: 'Dialog content',
    description: 'Copy this content component alongside the example above.',
    component: Content,
    code: contentCode,
  },
]
const api: never[] = []
const accessibility = [
  'Keep dynamic content labelled by the dialog header. Use Dialog for content that does not need a service.',
]
</script>

<template>
  <ComponentDoc
    title="DynamicDialog"
    componentName="DynamicDialog"
    category="Overlay"
    description="Create a dialog from a reusable content component."
    usage="uses useDialog with DialogService registered once in main.ts. Copy both source files below."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/dynamicdialog"
  />
</template>
