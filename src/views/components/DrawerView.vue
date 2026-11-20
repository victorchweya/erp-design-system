<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import PositionsExample from '@/components/docs/examples/DrawerPositionsExample.vue'
import positionsCode from '@/components/docs/examples/DrawerPositionsExample.vue?raw'
import WidthsExample from '@/components/blocks/drawers/DrawerWidthsBlock.vue'
import widthsCode from '@/components/blocks/drawers/DrawerWidthsBlock.vue?raw'

const examples = [
  {
    id: 'drawer-positions',
    title: 'Positions',
    description:
      'Open from the right for record details, which is the default choice in the ERP. The example stores the trigger and returns focus to it after the drawer closes.',
    component: PositionsExample,
    code: positionsCode,
  },
  {
    id: 'drawer-widths',
    title: 'Widths',
    description:
      'Set the width with utility classes. Below 1024px, every option here uses the full width so content stays readable.',
    component: WidthsExample,
    code: widthsCode,
  },
]
const api = [
  {
    name: 'visible',
    type: 'boolean',
    default: 'false',
    description: 'Whether the drawer is open. Use v-model:visible.',
  },
  {
    name: 'position',
    type: "'left' | 'right' | 'top' | 'bottom' | 'full'",
    default: "'left'",
    description: 'Edge the drawer opens from. full covers the whole viewport.',
  },
  {
    name: 'header',
    type: 'string',
    default: '—',
    description: 'Title text. It does not label the drawer, so add aria-label as well.',
  },
  {
    name: 'modal',
    type: 'boolean',
    default: 'true',
    description: 'Adds a mask and keeps Tab inside the drawer.',
  },
  {
    name: 'dismissable',
    type: 'boolean',
    default: 'true',
    description: 'Closes the drawer when the mask is clicked.',
  },
  {
    name: 'closeOnEscape',
    type: 'boolean',
    default: 'true',
    description: 'Closes the drawer when Escape is pressed.',
  },
  {
    name: 'blockScroll',
    type: 'boolean',
    default: 'false',
    description: 'Stops the page behind from scrolling while the drawer is open.',
  },
]
const accessibility = [
  'A modal drawer uses the dialog role with aria-modal and keeps Tab inside it. Without modal, it uses the complementary role and focus is not trapped.',
  'The header text does not label the drawer. Add aria-label or aria-labelledby.',
  'On open, focus moves to the first element with autofocus, otherwise to the close button.',
  'Drawer does not return focus when it closes. Store the trigger and focus it in the after-hide event, as both examples do.',
  'Set aria-haspopup="dialog", aria-controls and aria-expanded on the trigger yourself. Escape closes the drawer unless closeOnEscape is false.',
]
</script>

<template>
  <ComponentDoc
    title="Drawer"
    componentName="Drawer"
    category="Overlay"
    description="Show record details or a longer form in a panel that slides in from the edge of the screen."
    usage="Drawer binds visible with v-model and opens from the left by default. Set position to right for record details and size it with width classes. Use Dialog for short, focused tasks."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/drawer"
  />
</template>
