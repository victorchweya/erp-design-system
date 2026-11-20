<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/DynamicDialogExample.vue'
import openerCode from '@/components/docs/examples/DynamicDialogExample.vue?raw'
import contentCode from '@/components/docs/examples/DynamicDialogRescheduleContent.vue?raw'

const examples = [
  {
    id: 'dynamic-dialog-data',
    title: 'Pass data in and get a result back',
    description:
      'The opener passes the delivery in data. The content component reads it from the injected dialogRef and returns the chosen window through close, which reaches onClose. Copy both files.',
    component: Example,
    code: `<!-- DynamicDialogExample.vue -->\n${openerCode}\n<!-- DynamicDialogRescheduleContent.vue -->\n${contentCode}`,
  },
]
const api = [
  {
    name: 'open(component, options)',
    type: 'useDialog()',
    default: '—',
    description: 'Opens a dialog that renders the component as its content.',
  },
  {
    name: 'props',
    type: 'DialogProps',
    default: '—',
    description: 'Option. Dialog props, such as header, modal and style.',
  },
  {
    name: 'data',
    type: 'any',
    default: '—',
    description: 'Option. Values for the content component. Read them from dialogRef.value.data.',
  },
  {
    name: 'onClose',
    type: '(options) => void',
    default: '—',
    description:
      'Option. Called when the dialog closes. options.data holds the value passed to close, or is empty when the person cancels.',
  },
  {
    name: 'dialogRef',
    type: 'Ref<DynamicDialogInstance>',
    default: '—',
    description:
      "Injected into the content component with inject('dialogRef'). Call dialogRef.value.close(result) to close.",
  },
]
const accessibility = [
  'DynamicDialog renders a Dialog, so the Dialog guidance applies: set header so the dialog is labelled, and set modal for tasks that block the page.',
  'Focus moves to the first element with autofocus in the content. Without one, it lands on the close button.',
  'Focus returns to the element that opened the dialog when it closes.',
]
</script>

<template>
  <ComponentDoc
    title="DynamicDialog"
    componentName="DynamicDialog"
    category="Overlay"
    description="Open a dialog from code with any component as its content, and get a result back."
    usage="is opened with useDialog().open(component, options). DialogService is registered once in main.ts. Render a single DynamicDialog in App.vue; each extra instance opens its own copy. Use Dialog when the content belongs to one page."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/dynamicdialog"
  />
</template>
