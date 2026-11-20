<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import InputGroupAddonsExample from '@/components/docs/examples/InputGroupAddonsExample.vue'
import code0 from '@/components/docs/examples/InputGroupAddonsExample.vue?raw'
import InputGroupButtonExample from '@/components/docs/examples/InputGroupButtonExample.vue'
import code1 from '@/components/docs/examples/InputGroupButtonExample.vue?raw'
import InputGroupCheckboxExample from '@/components/docs/examples/InputGroupCheckboxExample.vue'
import code2 from '@/components/docs/examples/InputGroupCheckboxExample.vue?raw'
import InputGroupSizesExample from '@/components/docs/examples/InputGroupSizesExample.vue'
import code3 from '@/components/docs/examples/InputGroupSizesExample.vue?raw'
const examples = [
  {
    id: 'inputgroup-0',
    title: 'Currency and unit addons',
    description:
      'Place InputGroupAddon before or after the field for a currency or unit. Repeat the unit in the label because addon text is not part of the accessible name.',
    component: InputGroupAddonsExample,
    code: code0,
  },
  {
    id: 'inputgroup-1',
    title: 'Button addons',
    description:
      'A Button can sit directly in the group or inside an addon. Icon-only buttons need an aria-label.',
    component: InputGroupButtonExample,
    code: code1,
  },
  {
    id: 'inputgroup-2',
    title: 'Checkbox addon',
    description:
      'A Checkbox addon can enable the related field. Give the checkbox its own accessible name.',
    component: InputGroupCheckboxExample,
    code: code2,
  },
  {
    id: 'inputgroup-3',
    title: 'Sizes',
    description:
      'Set size on the field. Addons follow the field size through the theme’s control scale.',
    component: InputGroupSizesExample,
    code: code3,
  },
]
const api = [
  {
    name: 'InputGroup default slot',
    type: 'VNode[]',
    default: '—',
    description: 'Fields, addons and buttons in visual order.',
  },
  {
    name: 'InputGroupAddon default slot',
    type: 'VNode[]',
    default: '—',
    description: 'Text, an icon, a Button, a Checkbox or a RadioButton.',
  },
  {
    name: 'dt',
    type: 'any',
    default: '—',
    description: 'Scoped design tokens, such as inputgroup.addon.background.',
  },
]
const accessibility = [
  'InputGroup and InputGroupAddon add no roles or keyboard behavior. Each field and control inside still needs its own label.',
  'Addon text such as KES or kg is visual. Include the currency or unit in the visible label, or reference the addon with aria-describedby.',
  'Buttons in a group keep normal Tab order. Give icon-only buttons an aria-label that names the action and the field.',
]
</script>

<template>
  <ComponentDoc
    title="InputGroup"
    category="Form"
    description="Attach a currency, unit, button or checkbox to a form field."
    usage="Wrap the field and each InputGroupAddon in InputGroup. Put short text such as KES or kg in an addon, and place Button directly in the group or inside an addon. Set size on the field; addons follow it."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/inputgroup"
  />
</template>
