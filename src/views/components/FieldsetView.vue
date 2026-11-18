<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/FieldsetExample.vue'
import code from '@/components/docs/examples/FieldsetExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Group related delivery details with a legend.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'legend', type: 'string', default: '-', description: 'Header text of the fieldset.' },
  {
    name: 'toggleable',
    type: 'boolean',
    default: 'false',
    description: 'When specified, content can toggled by clicking the legend.',
  },
]
const accessibility = [
  'Use the legend to name the group and keep the native toggle button keyboard accessible.',
]
</script>

<template>
  <ComponentDoc
    title="Fieldset"
    componentName="Fieldset"
    category="Panels"
    description="Group related delivery details with a legend."
    usage="provides a legend and an optional toggle button."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/fieldset"
  />
</template>
