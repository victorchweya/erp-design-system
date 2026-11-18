<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/MessageExample.vue'
import code from '@/components/docs/examples/MessageExample.vue?raw'
import MessageSeverityExample from '@/components/docs/examples/MessageSeverityExample.vue'
import severityCode from '@/components/docs/examples/MessageSeverityExample.vue?raw'
import MessageIconExample from '@/components/docs/examples/MessageIconExample.vue'
import iconCode from '@/components/docs/examples/MessageIconExample.vue?raw'
import MessageVariantExample from '@/components/docs/examples/MessageVariantExample.vue'
import variantCode from '@/components/docs/examples/MessageVariantExample.vue?raw'
import MessageSizesExample from '@/components/docs/examples/MessageSizesExample.vue'
import sizesCode from '@/components/docs/examples/MessageSizesExample.vue?raw'
import MessageDynamicExample from '@/components/docs/examples/MessageDynamicExample.vue'
import dynamicCode from '@/components/docs/examples/MessageDynamicExample.vue?raw'
import MessageClosableExample from '@/components/docs/examples/MessageClosableExample.vue'
import closableCode from '@/components/docs/examples/MessageClosableExample.vue?raw'
import MessageLifeExample from '@/components/docs/examples/MessageLifeExample.vue'
import lifeCode from '@/components/docs/examples/MessageLifeExample.vue?raw'
import MessageFormExample from '@/components/docs/examples/MessageFormExample.vue'
import formCode from '@/components/docs/examples/MessageFormExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Inline feedback with severity and optional dismissal.',
    component: Example,
    code: code,
  },
  {
    id: 'severity',
    title: 'Severity',
    description: 'Choose the semantic state that matches the meaning of the feedback.',
    component: MessageSeverityExample,
    code: severityCode,
  },
  {
    id: 'icon',
    title: 'Icons',
    description: 'Use the icon slot when the default severity icon does not describe the event.',
    component: MessageIconExample,
    code: iconCode,
  },
  {
    id: 'variant',
    title: 'Variants',
    description:
      'Use outlined for lower-emphasis notices and simple for validation or supporting feedback.',
    component: MessageVariantExample,
    code: variantCode,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Small and large sizes are available around the compact ERP default.',
    component: MessageSizesExample,
    code: sizesCode,
  },
  {
    id: 'dynamic',
    title: 'Dynamic messages',
    description: 'Render a collection when an operation produces more than one result.',
    component: MessageDynamicExample,
    code: dynamicCode,
  },
  {
    id: 'closable',
    title: 'Closable',
    description: 'Allow dismissal when the feedback is no longer required to complete the task.',
    component: MessageClosableExample,
    code: closableCode,
  },
  {
    id: 'life',
    title: 'Timed message',
    description: 'Use life for short confirmation that can safely disappear.',
    component: MessageLifeExample,
    code: lifeCode,
  },
  {
    id: 'forms',
    title: 'Form validation',
    description: 'Place a small simple error message next to the invalid field it describes.',
    component: MessageFormExample,
    code: formCode,
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
  {
    name: 'icon',
    type: 'string',
    default: '—',
    description: 'Custom icon class, or use the icon slot for an icon component.',
  },
  {
    name: 'variant',
    type: 'outlined | simple',
    default: '—',
    description: 'Changes the visual emphasis of the message.',
  },
  {
    name: 'size',
    type: 'small | large',
    default: '—',
    description: 'Changes message padding, text, and icon size.',
  },
  {
    name: 'life',
    type: 'number',
    default: '—',
    description: 'Milliseconds before the message closes automatically.',
  },
]
const accessibility = [
  'Use text to explain the outcome and next action. Do not rely on colour alone.',
  'Message has an alert role and is announced immediately by screen readers.',
  'The close control works with Enter and Space. Use closeButtonProps when it needs a more specific accessible label.',
  'Do not let essential instructions disappear automatically. Keep timed messages for non-critical confirmation.',
]
</script>

<template>
  <ComponentDoc
    title="Message"
    componentName="Message"
    category="Messages"
    description="Inline feedback for system status, validation, warnings, and operation outcomes."
    usage="supports severity, custom icons, outlined and simple variants, three sizes, dismissal, timed life, and dynamic rendering. Use error for Message where Button uses danger."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/message"
  />
</template>
