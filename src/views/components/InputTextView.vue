<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import InputTextExample from '@/components/docs/examples/InputTextExample.vue'
import code0 from '@/components/docs/examples/InputTextExample.vue?raw'
import InputTextSizesExample from '@/components/docs/examples/InputTextSizesExample.vue'
import code1 from '@/components/docs/examples/InputTextSizesExample.vue?raw'
import InputTextStatesExample from '@/components/docs/examples/InputTextStatesExample.vue'
import code2 from '@/components/docs/examples/InputTextStatesExample.vue?raw'
const examples = [
  {
    id: 'inputs-0',
    title: 'Basic input',
    description: 'Values stay local to this preview.',
    component: InputTextExample,
    code: code0,
  },
  {
    id: 'inputs-1',
    title: 'Size and fill',
    description:
      'Small, default, and large controls share the theme\u2019s form-field scale. Filled is an optional surface treatment.',
    component: InputTextSizesExample,
    code: code1,
  },
  {
    id: 'inputs-2',
    title: 'Invalid and disabled',
    description:
      'Inputs use invalid rather than severity. Use a text error message alongside the danger border.',
    component: InputTextStatesExample,
    code: code2,
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
    name: 'size',
    type: 'any',
    default: '—',
    description: 'Control size; omit for the default.',
  },
  {
    name: 'invalid',
    type: 'null | boolean',
    default: 'false',
    description: 'Show the error state.',
  },
  {
    name: 'variant',
    type: 'any',
    default: 'null',
    description: 'Optional filled input surface.',
  },
  {
    name: 'fluid',
    type: 'null | boolean',
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
    title="InputText"
    category="Forms"
    description="Capture a short text value with a clear label and useful hint."
    usage="Bind the value with v-model. Use a suitable native type and autocomplete value. Placeholder text supplements the visible label."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/inputtext"
  />
</template>
