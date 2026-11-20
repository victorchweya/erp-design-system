<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/TerminalExample.vue'
import code from '@/components/docs/examples/TerminalExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Open on request',
    description:
      'Terminal focuses its input when it mounts, so render it only after people open it. Commands go through TerminalService.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'welcomeMessage',
    type: 'string',
    default: '—',
    description: 'Text shown above the first prompt. Say which commands exist.',
  },
  {
    name: 'prompt',
    type: 'string',
    default: '—',
    description: 'Text shown before each command.',
  },
  {
    name: "TerminalService.on('command')",
    type: '(text: string) => void',
    default: '—',
    description: 'Receives each command. Register on mount and remove with off before unmount.',
  },
  {
    name: "TerminalService.emit('response')",
    type: '(text: string) => void',
    default: '—',
    description: 'Shows a response under the last command. Responses render as text.',
  },
  {
    name: 'pt.commandText',
    type: 'object',
    default: '—',
    description: 'Attributes for the command input. Use it to set aria-label.',
  },
]
const accessibility = [
  'The command input has no label by default. Add one with pt.commandText, as the example does.',
  'Terminal moves focus to its input when it mounts. Do not render it on page load.',
  'Responses are in an aria-live region, so screen readers announce them.',
  'Never forward input to a shell or render responses as HTML. Offer the same actions as normal buttons for people who do not use the console.',
]
</script>

<template>
  <ComponentDoc
    title="Terminal"
    componentName="Terminal"
    category="Misc"
    description="Run text commands in a console-style prompt."
    usage="Terminal talks to your code through TerminalService, a shared event bus. Register the command listener when mounted and remove it when leaving the page. Use it only for power-user tools, never as the only way to do a task."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/terminal"
  />
</template>
