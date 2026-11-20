<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/VirtualScrollerExample.vue'
import code from '@/components/docs/examples/VirtualScrollerExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Render 1,000 deliveries while only the rows in view, plus a few either side, exist in the page. Each row is fixed at 48 pixels to match itemSize.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'items',
    type: 'null | any[] | any[][]',
    default: '-',
    description: 'Records to render. Use an array of arrays with orientation both for a grid.',
  },
  {
    name: 'itemSize',
    type: 'number | number[]',
    default: '0',
    description:
      'Height of each row in pixels (width when horizontal). Must match the rendered size, or rows will overlap or leave gaps.',
  },
  {
    name: 'scrollHeight',
    type: 'string',
    default: '-',
    description: 'Height of the scroll area. Set this or give the component a height with a class.',
  },
  {
    name: 'orientation',
    type: "'vertical' | 'horizontal' | 'both'",
    default: 'vertical',
    description: 'Scroll direction.',
  },
  {
    name: 'numToleratedItems',
    type: 'number',
    default: '-',
    description:
      'Extra rows rendered outside the view. Defaults to half the number of visible rows.',
  },
  {
    name: 'lazy',
    type: 'boolean',
    default: 'false',
    description:
      'Loads rows on demand. Handle the lazy-load event and fill the matching slice of items.',
  },
  {
    name: 'showLoader',
    type: 'boolean',
    default: 'false',
    description: 'Shows the loader slot while loading is true.',
  },
]
const accessibility = [
  'VirtualScroller adds no role. Give it role region and an aria-label that names the content and its size, as in the example.',
  'The scroll area is in the tab order by default, so keyboard users can scroll it with the arrow keys and Page Up and Page Down.',
  'Rows outside the view do not exist in the page, so screen reader users and browser find cannot reach them. When people need to search or review every record, add a search field or use pagination instead.',
]
</script>

<template>
  <ComponentDoc
    title="VirtualScroller"
    componentName="VirtualScroller"
    category="Data"
    description="Render long lists quickly by drawing only the rows in view."
    usage="VirtualScroller takes items and a fixed itemSize that matches the real row height, and renders each row through the item slot. Use it for long, uniform lists. DataTable, Select, MultiSelect and Listbox use it through their virtualScrollerOptions prop."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/virtualscroller"
  />
</template>
