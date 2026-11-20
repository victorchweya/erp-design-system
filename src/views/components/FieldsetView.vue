<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/FieldsetExample.vue'
import code from '@/components/docs/examples/FieldsetExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Group related form fields under a legend. Make the group toggleable only when it is optional or rarely changed.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'legend',
    type: 'string',
    default: '—',
    description: 'Text of the legend that names the group. Use the legend slot for custom content.',
  },
  {
    name: 'toggleable',
    type: 'boolean',
    default: 'false',
    description: 'Adds a button to the legend that shows and hides the content.',
  },
  {
    name: 'collapsed',
    type: 'boolean',
    default: 'false',
    description: 'Whether the content starts hidden. Use v-model:collapsed to control it.',
  },
  {
    name: 'toggleButtonProps',
    type: 'object',
    default: '—',
    description: 'Attributes passed to the toggle button.',
  },
]
const accessibility = [
  'Fieldset renders a native fieldset and legend, so screen readers announce the legend when focus enters the group.',
  'When toggleable, the legend contains a button with aria-expanded and aria-controls. Enter and Space toggle it.',
  'Do not collapse a group that contains required or invalid fields; people cannot see the errors.',
]
</script>

<template>
  <ComponentDoc
    title="Fieldset"
    componentName="Fieldset"
    category="Panel"
    description="Group related form fields under a visible legend."
    usage="wraps related fields in a native fieldset with a legend. Use it for groups such as an address or delivery instructions, and add toggleable for optional sections."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/fieldset"
  />
</template>
