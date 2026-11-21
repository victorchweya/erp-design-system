<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import LabelExample from '@/components/docs/examples/LabelExample.vue'
import code0 from '@/components/docs/examples/LabelExample.vue?raw'
import LabelWrapperExample from '@/components/docs/examples/LabelWrapperExample.vue'
import code1 from '@/components/docs/examples/LabelWrapperExample.vue?raw'
const examples = [
  {
    id: 'label-0',
    title: 'Linked and required',
    description:
      'Link Label to the control with for. Mark a required field with a visible asterisk hidden from screen readers, and set required on the input.',
    component: LabelExample,
    code: code0,
  },
  {
    id: 'label-1',
    title: 'Wrapping a control',
    description:
      'Label can wrap a control instead of using for, which makes the whole card a click target. Keep related cards in a fieldset with a legend.',
    component: LabelWrapperExample,
    code: code1,
  },
]
const api = [
  {
    name: 'as',
    type: 'string | Component',
    default: 'LABEL',
    description: 'Element or component to render as the root.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'Render the default slot as the root instead of a wrapper element.',
  },
  {
    name: 'for',
    type: 'string',
    default: '—',
    description: 'Native attribute passed to the label. Use the id or inputId of the control.',
  },
  {
    name: 'unstyled',
    type: 'boolean',
    default: 'false',
    description: 'Remove the component styles.',
  },
]
const accessibility = [
  'Label renders a native label element, so for and implicit wrapping give the control its accessible name and make the label a click target.',
  'For PrimeVue controls, point for at inputId (Checkbox, RadioButton, DatePicker, Select) or id (InputText, Textarea).',
  'Select renders a non-input combobox that for cannot name. Also give the Label an id and pass it to the Select ariaLabelledby prop.',
  'Do not change as to a non-label element for a form field; only a native label is associated through for.',
]
</script>

<template>
  <ComponentDoc
    title="Label"
    category="Form"
    description="Give a form control a visible, accessible name."
    usage="Label is a styled native label element with no props of its own beyond as and asChild. The erp-theme label tokens give it medium weight, the default text colour, the form-field font size, and a gap for an inline icon. Use it, or a plain label with the same for attribute, above every ERP form field. For grouped choices use a fieldset with a legend; for dense layouts see FloatLabel and IftaLabel."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/label"
  />
</template>
