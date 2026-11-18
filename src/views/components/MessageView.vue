<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/MessageExample.vue'
import code from '@/components/docs/examples/MessageExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Inline feedback with severity and optional dismissal.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'severity', type: 'any', default: 'info', description: 'Severity level of the message.' },
  {
    name: 'closable',
    type: 'boolean',
    default: 'false',
    description: 'Whether the message can be closed manually using the close icon.',
  },
]
const accessibility = [
  'Use text to explain the outcome and next action. Do not rely on colour alone.',
]
</script>

<template>
  <ComponentDoc
    title="Message"
    componentName="Message"
    category="Messages"
    description="Inline feedback with severity and optional dismissal."
    usage="supports success, info, warn, error, secondary, and contrast severities. Message uses error where buttons use danger."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/message"
  />
</template>
