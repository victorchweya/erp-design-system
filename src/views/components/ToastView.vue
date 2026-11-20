<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ToastExample.vue'
import code from '@/components/docs/examples/ToastExample.vue?raw'
import ToastStickyExample from '@/components/docs/examples/ToastStickyExample.vue'
import stickyCode from '@/components/docs/examples/ToastStickyExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Severity',
    description:
      'Success, info, warn, error, secondary, and contrast. Toast uses error where Button uses danger.',
    component: Example,
    code: code,
  },
  {
    id: 'sticky',
    title: 'Long-running task',
    description:
      'Omit life to keep a toast open while work runs, then remove it and add the result. Give the result a life so it closes on its own.',
    component: ToastStickyExample,
    code: stickyCode,
  },
]
const api = [
  {
    name: 'group',
    type: 'string',
    default: '—',
    description: 'Shows only messages added with the same group. Use one per Toast instance.',
  },
  {
    name: 'position',
    type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center'",
    default: 'top-right',
    description: 'Position of the toast stack in the viewport.',
  },
  {
    name: 'mode',
    type: "'stacked' | 'expanded'",
    default: 'stacked',
    description: 'Stacked overlaps toasts and expands them on hover or focus.',
  },
  {
    name: 'limit',
    type: 'number',
    default: '3',
    description: 'Maximum number of visible toasts in the stack.',
  },
  {
    name: 'breakpoints',
    type: 'ToastBreakpointsType',
    default: '—',
    description: 'Styles per screen width, for example a full-width toast on phones.',
  },
  {
    name: 'closeButtonProps',
    type: 'ButtonHTMLAttributes',
    default: '—',
    description: 'Attributes for each close button, such as a more specific aria-label.',
  },
  {
    name: 'toast.add(options)',
    type: 'ToastMessageOptions',
    default: '—',
    description:
      'Message fields: severity, summary, detail, life (milliseconds), closable, and group. Without life the toast stays open.',
  },
  {
    name: 'toast.remove / removeGroup',
    type: 'function',
    default: '—',
    description: 'Remove one message object, or every message in a group.',
  },
]
const accessibility = [
  'Each toast has an alert role, so screen readers announce it immediately and interrupt other speech. Keep summaries short and avoid several toasts at once.',
  'Toasts do not take focus. The close button has a localised aria-label and closes with Enter or Space. In stacked mode, moving focus into the group expands it so hidden close buttons stay reachable.',
  'Hovering pauses the life timer, but keyboard and screen reader users may still miss a timed toast. Put essential information or required actions on the page, or use Message or ConfirmDialog.',
]
</script>

<template>
  <ComponentDoc
    title="Toast"
    componentName="Toast"
    category="Messages"
    description="Brief, non-blocking feedback about the outcome of an action."
    usage="shows messages added with useToast. ToastService is registered once in main.ts. Place a Toast in the layout, or give each local Toast a group and add messages to that group. Keep important information available outside a toast."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/toast"
  />
</template>
