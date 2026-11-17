<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import InputPasswordExample from '@/components/docs/examples/InputPasswordExample.vue'
import code0 from '@/components/docs/examples/InputPasswordExample.vue?raw'
import InputPasswordStatesExample from '@/components/docs/examples/InputPasswordStatesExample.vue'
import code1 from '@/components/docs/examples/InputPasswordStatesExample.vue?raw'
const examples = [
  {
    id: 'input-password-0',
    title: 'Reveal password',
    description:
      'The reveal control supports keyboard use and announces its pressed state. The password is never echoed elsewhere on the page.',
    component: InputPasswordExample,
    code: code0,
  },
  {
    id: 'input-password-1',
    title: 'Invalid and disabled',
    description: 'Use the shared form-field states rather than the older Password component API.',
    component: InputPasswordStatesExample,
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
    name: 'mask',
    type: 'boolean',
    default: 'true',
    description: 'Hide the entered characters.',
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
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
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
  'Do not prevent pasting or password-manager autocomplete. Keep the reveal action\u2019s accessible name stable.',
]
</script>

<template>
  <ComponentDoc
    title="InputPassword"
    category="Forms"
    description="Enter a masked password with an optional reveal action."
    usage="Use mask to control whether the value is hidden. PrimeVue 5 uses a native-style input; add an accessible Button to let users reveal it."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/inputpassword"
  />
</template>
