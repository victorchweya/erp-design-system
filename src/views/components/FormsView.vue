<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import FormValidationExample from '@/components/docs/examples/FormValidationExample.vue'
import code0 from '@/components/docs/examples/FormValidationExample.vue?raw'
const examples = [
  {
    id: 'validation-0',
    title: 'Validation and submission',
    description:
      'Submit an empty or whitespace-only name to see the error. A valid name reports success locally; Reset restores the initial value.',
    component: FormValidationExample,
    code: code0,
  },
]
const api = [
  {
    name: 'initialValues',
    type: 'object',
    default: '\u2014',
    description: 'Starting values keyed by field name.',
  },
  {
    name: 'resolver',
    type: 'Function',
    default: '\u2014',
    description: 'Returns field errors and optional values.',
  },
  {
    name: 'validateOnValueUpdate',
    type: 'boolean | string[]',
    default: 'true',
    description: 'Validate when field values change.',
  },
  {
    name: 'validateOnBlur',
    type: 'boolean | string[]',
    default: 'false',
    description: 'Validate when fields lose focus.',
  },
  {
    name: 'validateOnSubmit',
    type: 'boolean | string[]',
    default: 'true',
    description: 'Validate before emitting submit.',
  },
]
const accessibility = [
  'Associate errors with the relevant input and explain how to correct them.',
  'Keep the submit button available so users can request validation. Do not send a form until the submit event reports valid. Server validation is still required.',
]
</script>

<template>
  <ComponentDoc
    title="Form validation"
    componentName="Form"
    category="Forms"
    description="Manage field state and show useful validation before submitting."
    usage="Use Form from @primevue/forms. Link each PrimeVue control with name; Form owns its value and validation state. Return field-keyed errors from a resolver and handle submit only when valid."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/forms"
  />
</template>
