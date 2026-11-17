<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import InputOtpExample from '@/components/docs/examples/InputOtpExample.vue'
import code0 from '@/components/docs/examples/InputOtpExample.vue?raw'
import InputOtpStatesExample from '@/components/docs/examples/InputOtpStatesExample.vue'
import code1 from '@/components/docs/examples/InputOtpStatesExample.vue?raw'
const examples = [
  {
    id: 'input-otp-0',
    title: 'Code entry',
    description: 'The component handles movement between fields and pasting a code.',
    component: InputOtpExample,
    code: code0,
  },
  {
    id: 'input-otp-1',
    title: 'Invalid and disabled',
    description:
      'Only mark a code invalid after a real validation response; this sample displays the styling.',
    component: InputOtpStatesExample,
    code: code1,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'string | boolean',
    default: 'null',
    description: 'Code string bound with v-model.',
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
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
  },
  {
    name: 'length',
    type: 'number',
    default: '4',
    description: 'Number of code characters.',
  },
  {
    name: 'mask',
    type: 'boolean',
    default: 'false',
    description: 'Hide the entered characters.',
  },
  {
    name: 'integerOnly',
    type: 'boolean',
    default: 'false',
    description: 'Accept digits only.',
  },
]
const accessibility = [
  'Group the fields under a visible legend. Keep the component\u2019s native per-character labels and paste behavior.',
  'Do not announce or log the entered code. Explain expiry and retry behavior in the surrounding application.',
]
</script>

<template>
  <ComponentDoc
    title="InputOtp"
    category="Forms"
    description="Enter a short verification code across connected fields."
    usage="Bind one string with v-model. Set length to the required number of characters and integerOnly for numeric codes. Verification belongs to the server."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/inputotp"
  />
</template>
