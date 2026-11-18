<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import InputTagsExample from '@/components/docs/examples/InputTagsExample.vue'
import code0 from '@/components/docs/examples/InputTagsExample.vue?raw'
import InputTagsStatesExample from '@/components/docs/examples/InputTagsStatesExample.vue'
import code1 from '@/components/docs/examples/InputTagsStatesExample.vue?raw'
const examples = [
  {
    id: 'input-tags-0',
    title: 'Adding and removing tags',
    description: 'Enter a value, paste comma-separated text, or remove an existing chip.',
    component: InputTagsExample,
    code: code0,
  },
  {
    id: 'input-tags-1',
    title: 'Invalid and disabled',
    description:
      'The current InputTags component uses the shared form-field border and surface tokens.',
    component: InputTagsStatesExample,
    code: code1,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'string[]',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Show the error state.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
  },
  {
    name: 'max',
    type: 'number',
    default: '—',
    description: 'Maximum number of tags.',
  },
  {
    name: 'delimiter',
    type: 'string | RegExp',
    default: '—',
    description: 'Character or pattern that separates tags.',
  },
  {
    name: 'allowDuplicate',
    type: 'boolean',
    default: 'false',
    description: 'Allow repeated tags.',
  },
  {
    name: 'fluid',
    type: 'boolean',
    default: 'null',
    description: 'Fill the available width.',
  },
]
const accessibility = [
  'Give every field a visible label. Match label for to id on native inputs or inputId on composite controls.',
  'Use help text for expected values and an associated error message for invalid fields. Keep the theme\u2019s visible focus and native keyboard behavior.',
  'Explain how to add and remove items. Preserve the component\u2019s keyboard support for editing chips.',
]
</script>

<template>
  <ComponentDoc
    title="InputTags"
    category="Form"
    description="Enter a list of short text values as removable chips."
    usage="Bind an array of strings. Use delimiter to split entries and max to limit the list. Duplicates are rejected by default."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/inputtags"
  />
</template>
