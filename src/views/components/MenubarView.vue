<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/MenubarExample.vue'
import code from '@/components/docs/examples/MenubarExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Navigate related actions using the native Menubar component.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'model', type: 'MenuItem[]', default: '-', description: 'An array of menuitems.' },
]
const accessibility = [
  'Use meaningful labels. Native menu items support keyboard navigation and disabled states.',
]
</script>

<template>
  <ComponentDoc
    title="Menubar"
    componentName="Menubar"
    category="Menus"
    description="Navigate related actions using the native Menubar component."
    usage="accepts a model of labelled items and local command handlers. Replace commands with product navigation when copying."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/menubar"
  />
</template>
