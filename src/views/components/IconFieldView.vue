<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import IconFieldSearchExample from '@/components/docs/examples/IconFieldSearchExample.vue'
import code0 from '@/components/docs/examples/IconFieldSearchExample.vue?raw'
import IconFieldLoadingExample from '@/components/docs/examples/IconFieldLoadingExample.vue'
import code1 from '@/components/docs/examples/IconFieldLoadingExample.vue?raw'
import IconFieldClearExample from '@/components/docs/examples/IconFieldClearExample.vue'
import code2 from '@/components/docs/examples/IconFieldClearExample.vue?raw'
import IconFieldSizesExample from '@/components/docs/examples/IconFieldSizesExample.vue'
import code3 from '@/components/docs/examples/IconFieldSizesExample.vue?raw'
const examples = [
  {
    id: 'iconfield-0',
    title: 'Leading and trailing icons',
    description:
      'Place InputIcon before the input for a leading icon or after it for a trailing icon. Icons are decorative.',
    component: IconFieldSearchExample,
    code: code0,
  },
  {
    id: 'iconfield-1',
    title: 'Loading indicator',
    description:
      'Show a trailing spinner while a lookup runs and announce the result in text. The spinner stops rotating when reduced motion is requested.',
    component: IconFieldLoadingExample,
    code: code1,
  },
  {
    id: 'iconfield-2',
    title: 'Clear button',
    description:
      'Put a real button inside InputIcon so the action works with a keyboard. Return focus to the field after clearing.',
    component: IconFieldClearExample,
    code: code2,
  },
  {
    id: 'iconfield-3',
    title: 'Sizes',
    description: 'Set size on the input. IconField scales the icon to match.',
    component: IconFieldSizesExample,
    code: code3,
  },
]
const api = [
  {
    name: 'IconField default slot',
    type: 'VNode[]',
    default: '—',
    description: 'One input and up to two InputIcon elements.',
  },
  {
    name: 'InputIcon default slot',
    type: 'VNode[]',
    default: '—',
    description: 'An icon component, or a button for an icon action.',
  },
  {
    name: 'dt',
    type: 'any',
    default: '—',
    description: 'Scoped design tokens, such as iconfield.icon.color.',
  },
]
const accessibility = [
  'IconField and InputIcon add no roles. Label the input itself and hide decorative icons with aria-hidden.',
  'Do not attach click handlers to icons. Use a button with an aria-label for actions such as clearing, and keep it reachable with Tab.',
  'A spinner is not announced. Report loading and results in text, for example with an aria-live region.',
]
</script>

<template>
  <ComponentDoc
    title="IconField"
    category="Form"
    description="Show an icon inside a text field to signal its purpose or state."
    usage="Wrap an input and one or two InputIcon elements. Order sets the side: an icon before the input leads, an icon after it trails. Import icons from @primeicons/vue."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/iconfield"
  />
</template>
