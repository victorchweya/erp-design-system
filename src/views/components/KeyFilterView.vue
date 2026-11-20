<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import KeyFilterPresetsExample from '@/components/docs/examples/KeyFilterPresetsExample.vue'
import code0 from '@/components/docs/examples/KeyFilterPresetsExample.vue?raw'
import KeyFilterRegexExample from '@/components/docs/examples/KeyFilterRegexExample.vue'
import code1 from '@/components/docs/examples/KeyFilterRegexExample.vue?raw'
import KeyFilterValidateOnlyExample from '@/components/docs/examples/KeyFilterValidateOnlyExample.vue'
import code2 from '@/components/docs/examples/KeyFilterValidateOnlyExample.vue?raw'
const examples = [
  {
    id: 'keyfilter-0',
    title: 'Presets',
    description:
      'Add a modifier such as .pint, .int, .pnum, .num, .money, .hex, .email, .alpha or .alphanum. Note that .alphanum accepts lowercase letters only.',
    component: KeyFilterPresetsExample,
    code: code0,
  },
  {
    id: 'keyfilter-1',
    title: 'Regular expression',
    description:
      'Pass a regular expression to allow a custom set of keys. KeyFilter checks each key, so validate the complete format separately.',
    component: KeyFilterRegexExample,
    code: code1,
  },
  {
    id: 'keyfilter-2',
    title: 'Whole-value pattern',
    description:
      'With validateOnly, a key is accepted only when the resulting value still matches the pattern.',
    component: KeyFilterValidateOnlyExample,
    code: code2,
  },
]
const api = [
  {
    name: 'v-keyfilter.<preset>',
    type: 'pint | int | pnum | num | money | hex | email | alpha | alphanum',
    default: '—',
    description: 'Built-in set of allowed keys.',
  },
  {
    name: 'v-keyfilter="pattern"',
    type: 'RegExp',
    default: '—',
    description: 'Custom pattern each key must match.',
  },
  {
    name: 'v-keyfilter="{ pattern, validateOnly }"',
    type: '{ pattern: RegExp; validateOnly: boolean }',
    default: '—',
    description: 'With validateOnly, test the resulting value instead of the key.',
  },
]
const accessibility = [
  'KeyFilter blocks keys silently, with no announcement. Always state the allowed characters in visible help text linked with aria-describedby.',
  'Blocking keys is not validation. Check the complete value, show an associated error message, and validate again on the server.',
  'KeyFilter works only on InputText and Textarea. Use InputNumber for amounts and InputMask for fixed formats when they fit better.',
]
</script>

<template>
  <ComponentDoc
    title="KeyFilter"
    componentName="v-keyfilter"
    category="Form"
    description="Block keys that cannot appear in a text field's value."
    usage="is a directive for InputText and Textarea. Import it explicitly as vKeyfilter, then add a preset modifier or pass a regular expression. Pasted text is checked too."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/keyfilter"
  />
</template>
