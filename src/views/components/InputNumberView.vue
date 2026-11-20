<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import InputNumberExample from '@/components/docs/examples/InputNumberExample.vue'
import code0 from '@/components/docs/examples/InputNumberExample.vue?raw'
import InputNumberStatesExample from '@/components/docs/examples/InputNumberStatesExample.vue'
import code1 from '@/components/docs/examples/InputNumberStatesExample.vue?raw'
const examples = [
  {
    id: 'input-number-0',
    title: 'Quantity and currency',
    description: 'Buttons adjust quantity while currency formatting displays Kenyan shillings.',
    component: InputNumberExample,
    code: code0,
  },
  {
    id: 'input-number-1',
    title: 'Invalid and disabled',
    description:
      'Formatting does not replace validation of business rules. The help and error text reach the inner input through pt.',
    component: InputNumberStatesExample,
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
    name: 'showButtons',
    type: 'boolean',
    default: 'false',
    description: 'Show increment and decrement buttons.',
  },
  {
    name: 'locale',
    type: 'string',
    default: '—',
    description: 'Locale used to format the value.',
  },
  {
    name: 'mode',
    type: 'any',
    default: 'decimal',
    description: 'Numeric or currency display.',
  },
  {
    name: 'currency',
    type: 'string',
    default: '—',
    description: 'Currency code, such as KES.',
  },
  {
    name: 'min',
    type: 'number',
    default: '—',
    description: 'Minimum allowed value.',
  },
  {
    name: 'max',
    type: 'number',
    default: '—',
    description: 'Maximum allowed value.',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    description: 'Amount added or removed per step.',
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
]
const accessibility = [
  'Give every field a visible label. Match label for to id on native inputs or inputId on composite controls.',
  'Use help text for expected values and an associated error message for invalid fields. Keep the theme\u2019s visible focus and native keyboard behavior.',
  'InputNumber puts extra attributes on its wrapper, so aria-describedby there is not announced. Pass it to the input with :pt="{ pcInputText: { root: { \'aria-describedby\': id } } }".',
  'The input has the spinbutton role. Up and Down arrows change the value by step; Home and End jump to min and max when they are set.',
]
</script>

<template>
  <ComponentDoc
    title="InputNumber"
    category="Form"
    description="Enter a numeric quantity or a formatted amount."
    usage="The model contains a number, separate from its display formatting. Set min, max, and step to match the allowed range; use currency and locale for money display."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/inputnumber"
  />
</template>
