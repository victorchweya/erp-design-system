<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import SplitButtonExample from '@/components/docs/examples/SplitButtonExample.vue'
import code0 from '@/components/docs/examples/SplitButtonExample.vue?raw'
import SplitButtonVariantsExample from '@/components/docs/examples/SplitButtonVariantsExample.vue'
import code1 from '@/components/docs/examples/SplitButtonVariantsExample.vue?raw'
const examples = [
  {
    id: 'split-button-0',
    title: 'Primary and menu actions',
    description: 'Both the main action and menu commands report their result locally.',
    component: SplitButtonExample,
    code: code0,
  },
  {
    id: 'split-button-1',
    title: 'Variants and states',
    description:
      'Severity, size, outlined, and disabled apply to both buttons. Name each menu button after the actions it reveals.',
    component: SplitButtonVariantsExample,
    code: code1,
  },
]
const api = [
  {
    name: 'label',
    type: 'string',
    default: '—',
    description: 'Text of the main action. Also used as its accessible name.',
  },
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '—',
    description: 'Menu items, each with a label and a command.',
  },
  {
    name: 'severity',
    type: "'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'",
    default: '—',
    description: 'Semantic colour of both buttons. Omit for primary.',
  },
  {
    name: 'size',
    type: "'small' | 'large'",
    default: '—',
    description: 'Control size. Omit for the compact default.',
  },
  {
    name: 'outlined / text',
    type: 'boolean',
    default: 'false',
    description: 'Lower-emphasis variants, matching Button.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the main action and the menu button.',
  },
  {
    name: 'buttonProps',
    type: 'ButtonHTMLAttributes',
    default: '—',
    description: 'Attributes for the main button, such as type.',
  },
  {
    name: 'menuButtonProps',
    type: 'ButtonHTMLAttributes',
    default: '—',
    description: 'Attributes for the menu button. Set aria-label here; it has no name by default.',
  },
]
const accessibility = [
  'The main button takes its name from label. The menu button is icon-only and has no name by default, so pass aria-label through menuButtonProps.',
  'The menu button sets aria-haspopup and aria-expanded. Enter, Space, or Down Arrow opens the menu; arrow keys move between items and Escape closes it.',
  'Keep the main action the most common, safe choice. Put destructive commands behind a confirmation rather than in the menu alone.',
]
</script>

<template>
  <ComponentDoc
    title="SplitButton"
    category="Button"
    description="Pair a frequent action with a menu of related alternatives."
    usage="Use label for the main action and model for the related commands. Handle the main click separately from each menu command, and use a plain Button when there are no alternatives."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/splitbutton"
  />
</template>
