<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ScrollAreaExample.vue'
import code from '@/components/docs/examples/ScrollAreaExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Vertical list',
    description:
      'Set a height on ScrollArea and compose the viewport, content, scrollbar, and handle. Name the viewport so people know what they are scrolling.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'variant',
    type: "'auto' | 'hover' | 'scroll' | 'always' | 'hidden'",
    default: 'auto',
    description:
      'When the scrollbars are visible. Avoid hidden; people lose the cue that more content exists.',
  },
  {
    name: 'mask',
    type: 'boolean',
    default: 'false',
    description: 'Fades the content at the scrollable edges.',
  },
  {
    name: 'tabIndex',
    type: 'number',
    default: '0',
    description:
      'Tab index of the viewport when content overflows. The viewport leaves the tab order when everything fits.',
  },
  {
    name: 'ScrollAreaScrollbar orientation',
    type: "'vertical' | 'horizontal'",
    default: 'vertical',
    description: 'Axis the scrollbar tracks. Add one scrollbar per axis that can overflow.',
  },
]
const accessibility = [
  'The viewport stays natively scrollable and becomes focusable when it overflows. Arrow keys, Page Up, Page Down, Home, and End scroll it.',
  'Give the viewport role="region" and an aria-label so the focus stop is announced with a name.',
  'Do not nest scroll areas or use them for whole pages; keep them for bounded lists and side panels.',
]
</script>

<template>
  <ComponentDoc
    title="ScrollArea"
    componentName="ScrollArea"
    category="Panel"
    description="Scroll a bounded region with themed scrollbars."
    usage="ScrollArea composes ScrollAreaViewport, ScrollAreaContent, ScrollAreaScrollbar, and ScrollAreaHandle. Give the root a fixed height or max height. Use the scrollable options on DataTable and Tabs for those components instead."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/scrollarea"
  />
</template>
