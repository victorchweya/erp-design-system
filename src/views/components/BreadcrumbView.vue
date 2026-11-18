<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/BreadcrumbExample.vue'
import code from '@/components/docs/examples/BreadcrumbExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Show the current position in a page hierarchy.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'model', type: 'MenuItem[]', default: '-', description: 'An array of menuitems.' },
]
const accessibility = [
  'Name breadcrumb navigation and mark the current page when adapting item templates.',
]
</script>

<template>
  <ComponentDoc
    title="Breadcrumb"
    componentName="Breadcrumb"
    category="Menus"
    description="Show the current position in a page hierarchy."
    usage="accepts a model of items. This example keeps parent actions local; use router links for real navigation."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/breadcrumb"
  />
</template>
