<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import InputMaskPhoneExample from '@/components/docs/examples/InputMaskPhoneExample.vue'
import code0 from '@/components/docs/examples/InputMaskPhoneExample.vue?raw'
import InputMaskIdentityExample from '@/components/docs/examples/InputMaskIdentityExample.vue'
import code1 from '@/components/docs/examples/InputMaskIdentityExample.vue?raw'
import InputMaskSizesExample from '@/components/docs/examples/InputMaskSizesExample.vue'
import code2 from '@/components/docs/examples/InputMaskSizesExample.vue?raw'
import InputMaskStatesExample from '@/components/docs/examples/InputMaskStatesExample.vue'
import code3 from '@/components/docs/examples/InputMaskStatesExample.vue?raw'
const examples = [
  {
    id: 'inputmask-0',
    title: 'Kenyan phone number',
    description:
      'The +254 prefix is a literal in the mask. With unmask, the bound value holds only the nine digits the user typed.',
    component: InputMaskPhoneExample,
    code: code0,
  },
  {
    id: 'inputmask-1',
    title: 'KRA PIN and national ID',
    description:
      'Use a for letters and 9 for digits. Characters after ? are optional, so the ID accepts seven or eight digits.',
    component: InputMaskIdentityExample,
    code: code1,
  },
  {
    id: 'inputmask-2',
    title: 'Size and fill',
    description:
      'InputMask renders an InputText, so it shares the same size scale and filled surface. The example uses a vehicle plate mask.',
    component: InputMaskSizesExample,
    code: code2,
  },
  {
    id: 'inputmask-3',
    title: 'Invalid and disabled',
    description:
      'Use invalid with a text message that names the missing part. Disabled fields keep the formatted value readable.',
    component: InputMaskStatesExample,
    code: code3,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'null | string',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'mask',
    type: 'string',
    default: '—',
    description:
      'Pattern: a for a letter, 9 for a digit, * for either. Other characters are literals.',
  },
  {
    name: 'unmask',
    type: 'boolean',
    default: 'false',
    description: 'Bind only the typed characters instead of the formatted value.',
  },
  {
    name: 'autoClear',
    type: 'boolean',
    default: 'true',
    description: 'Clear an incomplete value on blur.',
  },
  {
    name: 'slotChar',
    type: 'string',
    default: '_',
    description: 'Placeholder for each unfilled position.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Show the error state.',
  },
  {
    name: 'size',
    type: 'any',
    default: '—',
    description: 'Control size; omit for the default.',
  },
]
const accessibility = [
  'Give every field a visible label with for and id, and put the expected format in help text linked with aria-describedby. The mask alone is not announced as an instruction.',
  'autoClear removes an incomplete value on blur. Tell people why the value disappeared, or set autoClear to false and validate the value instead.',
  'Masks enforce characters, not meaning. Validate KRA PINs, ID numbers and phone numbers on the server.',
]
</script>

<template>
  <ComponentDoc
    title="InputMask"
    category="Form"
    description="Enter a value in a fixed format, such as a phone number, KRA PIN or ID number."
    usage="Set mask to the fixed pattern and bind the value with v-model. Use unmask when the API expects raw digits. The mask accepts letters in either case, so normalise them before saving. InputMask has no design tokens of its own and inherits InputText styling. For dates, prefer DatePicker; for amounts, prefer InputNumber."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/inputmask"
  />
</template>
