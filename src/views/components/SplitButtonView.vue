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
    description: 'Use native severity, size, outlined, and disabled props.',
    component: SplitButtonVariantsExample,
    code: code1,
  },
]
const api = [
  {
    name: 'label',
    type: 'string',
    default: '—',
    description: 'Visible text label.',
  },
  {
    name: 'model',
    type: 'MenuItem[]',
    default: '—',
    description: 'Menu items with labels and commands.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
  },
  {
    name: 'menuButtonProps',
    type: 'ButtonHTMLAttributes',
    default: '—',
    description: 'Properties for the menu button, including its accessible name.',
  },
  {
    name: 'severity',
    type: 'any',
    default: '—',
    description: 'Semantic colour variant.',
  },
  {
    name: 'size',
    type: 'any',
    default: '—',
    description: 'Control size; omit for the default.',
  },
]
const accessibility = [
  'Give the menu button its own accessible label through menuButtonProps.',
  'Enter or Space activates the main action. Arrow keys navigate the menu and Escape closes it.',
]
</script>

<template>
  <ComponentDoc
    title="SplitButton"
    category="Core elements"
    description="Pair a frequent action with a menu of related alternatives."
    usage="Use label for the primary action and model for the menu items. Handle the main click separately from each menu command."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/splitbutton"
  />
</template>
