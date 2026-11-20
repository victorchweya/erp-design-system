<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/AccordionExample.vue'
import code from '@/components/docs/examples/AccordionExample.vue?raw'
import AccordionMultipleExample from '@/components/docs/examples/AccordionMultipleExample.vue'
import multipleCode from '@/components/docs/examples/AccordionMultipleExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'One panel opens at a time. Set value to the panel that should start open.',
    component: Example,
    code: code,
  },
  {
    id: 'multiple',
    title: 'Multiple and disabled panels',
    description:
      'With multiple, several panels can stay open and value becomes an array. Disable a panel when its content is not available yet, and say why in the header.',
    component: AccordionMultipleExample,
    code: multipleCode,
  },
]
const api = [
  {
    name: 'value',
    type: 'null | string | number | string[] | number[]',
    default: 'null',
    description: 'Open panel, or an array of open panels in multiple mode. Use v-model:value.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: 'Allows more than one panel to be open.',
  },
  {
    name: 'lazy',
    type: 'boolean',
    default: 'false',
    description: 'Renders panel content only when it is opened, instead of hiding it with CSS.',
  },
  {
    name: 'selectOnFocus',
    type: 'boolean',
    default: 'false',
    description: 'Opens a panel when its header receives focus.',
  },
  {
    name: 'AccordionPanel value',
    type: 'string | number',
    default: '—',
    description: 'Unique value that links the panel to the Accordion value.',
  },
  {
    name: 'AccordionPanel disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevents the panel from opening.',
  },
]
const accessibility = [
  'Each header is a button with aria-expanded and aria-controls. Enter and Space toggle a panel; Up and Down Arrow, Home, and End move between headers.',
  'Headers are not headings. If the sections belong in the page outline, wrap the accordion under a heading that names the group.',
  'Do not hide information people need to compare at the same time. Use multiple, or show the content without an accordion.',
]
</script>

<template>
  <ComponentDoc
    title="Accordion"
    componentName="Accordion"
    category="Panel"
    description="Show and hide sections of related content under clickable headers."
    usage="Accordion composes AccordionPanel, AccordionHeader, and AccordionContent. Give each panel a unique value and keep header labels short."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/accordion"
  />
</template>
