<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import FieldLabelsExample from '@/components/docs/examples/FieldLabelsExample.vue'
import code0 from '@/components/docs/examples/FieldLabelsExample.vue?raw'
import FieldGroupsExample from '@/components/docs/examples/FieldGroupsExample.vue'
import code1 from '@/components/docs/examples/FieldGroupsExample.vue?raw'
const examples = [
  {
    id: 'field-layout-0',
    title: 'Label styles',
    description:
      'Every style still connects label for with input id. The default layout uses gap-1 within fields and gap-6 between groups.',
    component: FieldLabelsExample,
    code: code0,
  },
  {
    id: 'field-layout-1',
    title: 'Groups and icons',
    description: 'Add-ons and icons supplement the visible label; they do not replace it.',
    component: FieldGroupsExample,
    code: code1,
  },
]
const api = [
  {
    name: 'FloatLabel variant',
    type: "'over' | 'in' | 'on'",
    default: "'over'",
    description: 'Where the label sits once the field has focus or a value.',
  },
]
const accessibility = [
  'Give every field a visible label. Match label for to id on native inputs or inputId on composite controls.',
  'Use help text for expected values and an associated error message for invalid fields. Keep the theme\u2019s visible focus and native keyboard behavior.',
  'Use fieldset and legend for related checkboxes or radio buttons. Put errors close to their fields and connect them with aria-describedby.',
]
</script>

<template>
  <ComponentDoc
    title="Labels &amp; field layout"
    componentName="FloatLabel"
    category="Form"
    description="Label, group, and space form fields using the native PrimeVue helpers."
    usage="Start with a visible label above a field. FloatLabel and IftaLabel are optional presentations. InputGroup adds units or actions, and IconField adds a decorative icon."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/floatlabel"
  />
</template>
