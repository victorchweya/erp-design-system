<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import TextareaExample from '@/components/docs/examples/TextareaExample.vue'
import code0 from '@/components/docs/examples/TextareaExample.vue?raw'
import TextareaStatesExample from '@/components/docs/examples/TextareaStatesExample.vue'
import code1 from '@/components/docs/examples/TextareaStatesExample.vue?raw'
const examples = [
  {
    id: 'textarea-0',
    title: 'Growing input',
    description: 'A native maxlength constrains this example to 240 characters.',
    component: TextareaExample,
    code: code0,
  },
  {
    id: 'textarea-1',
    title: 'Invalid and disabled',
    description:
      'Link the error or the reason a field is locked to the textarea with aria-describedby.',
    component: TextareaStatesExample,
    code: code1,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'any',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'rows',
    type: 'Numberish',
    default: '—',
    description: 'Native attribute. Starting height in lines of text.',
  },
  {
    name: 'autoResize',
    type: 'boolean',
    default: 'false',
    description: 'Grow to fit the entered text.',
  },
  {
    name: 'size',
    type: 'any',
    default: '—',
    description: 'Control size; omit for the default.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Show the error state.',
  },
  {
    name: 'disabled',
    type: 'Booleanish',
    default: '—',
    description: 'Native attribute. Prevent interaction.',
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
]
</script>

<template>
  <ComponentDoc
    title="Textarea"
    category="Form"
    description="Capture longer text such as notes and instructions."
    usage="Use v-model for the text value, rows for the starting height, and autoResize when the field should grow with its content."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/textarea"
  />
</template>
