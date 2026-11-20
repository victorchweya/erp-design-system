<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/PanelExample.vue'
import code from '@/components/docs/examples/PanelExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Use header for the title and toggleable to let people collapse details they do not always need.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'header',
    type: 'string',
    default: '—',
    description: 'Header text. It also names the toggle button.',
  },
  {
    name: 'toggleable',
    type: 'boolean',
    default: 'false',
    description: 'Adds a button to the header that expands and collapses the content.',
  },
  {
    name: 'collapsed',
    type: 'boolean',
    default: 'false',
    description: 'Whether the content starts collapsed. Use v-model:collapsed to control it.',
  },
  {
    name: 'toggleButtonProps',
    type: 'object',
    default: "{ severity: 'secondary', text: true, rounded: true }",
    description: 'Props for the toggle Button, such as ariaLabel when you use the header slot.',
  },
  {
    name: 'header, icons, footer slots',
    type: 'VNode[]',
    default: '—',
    description: 'Custom header content, extra header actions, and a footer area.',
  },
]
const accessibility = [
  'The toggle button has aria-expanded and aria-controls, and takes its accessible name from header. If you use the header slot instead, set toggleButtonProps.ariaLabel.',
  'Header text renders in a span, not a heading. Put a heading element in the header slot when the panel should appear in the page outline.',
]
</script>

<template>
  <ComponentDoc
    title="Panel"
    componentName="Panel"
    category="Panel"
    description="Group content in a titled container that can optionally collapse."
    usage="takes a header for its title and toggleable for an optional collapse button. Use Card when the content never collapses, and Fieldset when it groups form fields."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/panel"
  />
</template>
