<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import FloatLabelVariantsExample from '@/components/docs/examples/FloatLabelVariantsExample.vue'
import code0 from '@/components/docs/examples/FloatLabelVariantsExample.vue?raw'
import FloatLabelSelectDateExample from '@/components/docs/examples/FloatLabelSelectDateExample.vue'
import code1 from '@/components/docs/examples/FloatLabelSelectDateExample.vue?raw'
import IftaLabelExample from '@/components/docs/examples/IftaLabelExample.vue'
import code2 from '@/components/docs/examples/IftaLabelExample.vue?raw'
import FloatLabelInvalidExample from '@/components/docs/examples/FloatLabelInvalidExample.vue'
import code3 from '@/components/docs/examples/FloatLabelInvalidExample.vue?raw'
const examples = [
  {
    id: 'float-label-0',
    title: 'FloatLabel variants',
    description:
      'over is the default and moves the label above the field. in keeps it inside the field and on places it on the border.',
    component: FloatLabelVariantsExample,
    code: code0,
  },
  {
    id: 'float-label-1',
    title: 'Select and DatePicker',
    description:
      'Wrap the control and its label. Select and DatePicker take inputId; Select also needs ariaLabelledby so screen readers announce the label rather than the selected value.',
    component: FloatLabelSelectDateExample,
    code: code1,
  },
  {
    id: 'float-label-2',
    title: 'IftaLabel',
    description:
      'IftaLabel keeps a small label at the top inside the field at all times, so it never overlaps a value or placeholder.',
    component: IftaLabelExample,
    code: code2,
  },
  {
    id: 'float-label-3',
    title: 'Invalid',
    description:
      'Set invalid on the control; the wrapper colours its label. Link the error text to the focusable element so the reason is announced.',
    component: FloatLabelInvalidExample,
    code: code3,
  },
]
const api = [
  {
    name: 'variant',
    type: '"over" | "in" | "on"',
    default: 'over',
    description: 'FloatLabel only. Where the label sits when the field is focused or filled.',
  },
  {
    name: 'dt',
    type: 'object',
    default: '—',
    description: 'Scoped design-token overrides. Prefer the shared ERP theme.',
  },
  {
    name: 'pt',
    type: 'object',
    default: '—',
    description: 'Pass attributes to the root element.',
  },
]
const accessibility = [
  'Both wrappers are presentational. The child label element, linked with for to the control id or inputId, provides the accessible name.',
  'A floating label replaces the placeholder. Do not add a placeholder that repeats or competes with the label, and keep hints and errors in visible text below the field.',
  'Select renders a non-input combobox, so a label for attribute alone does not name it. Give the label an id and pass it to ariaLabelledby.',
  'Set invalid on the control rather than relying on the red label, and reference the error message with aria-describedby on the focusable element.',
]
</script>

<template>
  <ComponentDoc
    title="FloatLabel & IftaLabel"
    componentName="FloatLabel"
    category="Form"
    description="Place a field label inside or on the edge of the input for dense layouts."
    usage="Wrap one form control and its label element. ERP forms default to a visible label above the field, documented in Field layout at /components/forms/field-layout. Use FloatLabel or IftaLabel only where space is tight, such as filter bars, table toolbars, and short dialogs, and use one style per form."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/floatlabel"
  />
</template>
