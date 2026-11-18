<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import RecordDrawerBlock from '@/components/blocks/drawers/RecordDrawerBlock.vue'
import code0 from '@/components/blocks/drawers/RecordDrawerBlock.vue?raw'
import EditDrawerBlock from '@/components/blocks/drawers/EditDrawerBlock.vue'
import code1 from '@/components/blocks/drawers/EditDrawerBlock.vue?raw'
import DrawerWidthsBlock from '@/components/blocks/drawers/DrawerWidthsBlock.vue'
import widthsCode from '@/components/blocks/drawers/DrawerWidthsBlock.vue?raw'
const examples = [
  {
    id: 'drawer-widths',
    title: 'Drawer widths',
    description:
      'Compare full, half, one-third, and one-quarter viewport widths. Each option opens a working Drawer with copyable sizing classes.',
    component: DrawerWidthsBlock,
    code: widthsCode,
  },
  {
    id: 'record-drawer',
    title: 'Record details',
    description: 'Status, metadata, and a delivery note in a right-hand Drawer.',
    component: RecordDrawerBlock,
    code: code0,
  },
  {
    id: 'edit-drawer',
    title: 'Edit in a drawer',
    description: 'A validated delivery form with separate Cancel and Save actions.',
    component: EditDrawerBlock,
    code: code1,
  },
]
const usage = [
  'Open the native Drawer from a clearly labelled button. Use a short title, scrollable content, and footer actions.',
  'Editing starts from the last saved value. Cancel, close, and Escape discard the draft; Save validates and commits locally. Mask dismissal is disabled for the edit form.',
  'The examples restore focus to their trigger after closing and use full width on small screens.',
  'Width examples use viewport fractions from lg (1024px): w-full, w-1/2, w-1/3, and w-1/4. Below lg they all use w-full. Use normal width utilities so responsive widths can override w-full.',
]
</script>

<template>
  <BlockDoc
    title="Drawers"
    description="Keep list context visible while reviewing or editing a record in a side panel."
    :usage="usage"
    :examples="examples"
  />
</template>
