<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/AccordionExample.vue'
import code from '@/components/docs/examples/AccordionExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Expand related delivery information.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'null | string | number | string[] | number[]',
    default: 'null',
    description: 'Value of the active panel or an array of values in multiple mode.',
  },
]
const accessibility = [
  'Use the native header buttons. Enter and Space toggle panels; arrow keys move between headers.',
]
</script>

<template>
  <ComponentDoc
    title="Accordion"
    componentName="Accordion"
    category="Panel"
    description="Expand related delivery information."
    usage="composes AccordionPanel, AccordionHeader, and AccordionContent with matching values."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/accordion"
  />
</template>
