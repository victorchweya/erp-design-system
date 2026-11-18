<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/TerminalExample.vue'
import code from '@/components/docs/examples/TerminalExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'A local command prompt with a small set of demo commands.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'welcomeMessage',
    type: 'string',
    default: '-',
    description: 'Initial text to display on terminal.',
  },
  { name: 'prompt', type: 'string', default: '-', description: 'Prompt text for each command.' },
]
const accessibility = [
  'Label the command input. Never forward arbitrary terminal input to a shell or interpolate responses as HTML.',
]
</script>

<template>
  <ComponentDoc
    title="Terminal"
    componentName="Terminal"
    category="Misc"
    description="A local command prompt with a small set of demo commands."
    usage="uses TerminalService. Register the command listener when mounted and remove it when leaving the page."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/terminal"
  />
</template>
