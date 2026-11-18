<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/MegaMenuExample.vue'
import code from '@/components/docs/examples/MegaMenuExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Organise a larger navigation menu into columns.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'model', type: 'MenuItem[]', default: '-', description: 'An array of menuitems.' },
]
const accessibility = ['Use clear group labels and retain native keyboard navigation.']
</script>

<template>
  <ComponentDoc
    title="MegaMenu"
    componentName="MegaMenu"
    category="Menu"
    description="Organise a larger navigation menu into columns."
    usage="uses nested arrays of menu groups for each top-level item."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/megamenu"
  />
</template>
