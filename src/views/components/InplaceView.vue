<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import InplaceExample from '@/components/docs/examples/InplaceExample.vue'
import code0 from '@/components/docs/examples/InplaceExample.vue?raw'
const examples = [
  {
    id: 'inplace-0',
    title: 'Save and cancel',
    description:
      'Save commits a non-empty name locally. Cancel leaves the displayed name unchanged.',
    component: InplaceExample,
    code: code0,
  },
]
const api = [
  {
    name: 'active',
    type: 'boolean',
    default: 'false',
    description: 'Show the editing content.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
  },
  {
    name: 'displayProps',
    type: 'HTMLAttributes',
    default: '—',
    description: 'Attributes for the display action.',
  },
]
const accessibility = [
  'Give the display action an accessible name. Enter opens the editor; label the field and provide clear Save and Cancel actions.',
  'Use closeCallback to return focus to the display action after closing.',
]
</script>

<template>
  <ComponentDoc
    title="Inplace"
    category="Form"
    description="Switch a small piece of displayed content into an editing field."
    usage="Put the read view in display and the editor in content. Use the content slot\u2019s closeCallback to close the editor and restore focus. Keep a draft so Cancel discards edits."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/inplace"
  />
</template>
