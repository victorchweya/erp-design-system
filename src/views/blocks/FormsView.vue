<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import SupplierFormBlock from '@/components/blocks/forms/SupplierFormBlock.vue'
import code0 from '@/components/blocks/forms/SupplierFormBlock.vue?raw'
import FilterFormBlock from '@/components/blocks/forms/FilterFormBlock.vue'
import code1 from '@/components/blocks/forms/FilterFormBlock.vue?raw'
const examples = [
  {
    id: 'supplier-form',
    title: 'Supplier details',
    description:
      'A responsive field grid, optional notes, inline errors, and actions in the Card footer.',
    component: SupplierFormBlock,
    code: code0,
  },
  {
    id: 'filter-form',
    title: 'Filter form',
    description: 'Compact search and status controls with explicit Apply and Clear actions.',
    component: FilterFormBlock,
    code: code1,
  },
]
const usage = [
  'Use native form controls. Use Card only when the form is a self-contained unit; keep a page’s primary form open in the main content flow. The supplier example uses the installed @primevue/forms resolver for required fields and email validation.',
  'Give every control one visible label. Put helper text and validation in the same place below the control, connect them with aria-describedby, and keep entered values when validation fails.',
  'Show validation after submit or after a field has been visited, not while the user is first typing. Move focus to the first invalid field after an unsuccessful submit.',
  'When most fields are required, mark the exceptions as optional. When most are optional, mark the required fields instead; do not mix both conventions in one form.',
  'Use one column in narrow containers and no more than two for ordinary forms. Keep DOM order equal to reading order, let long fields span both columns, and place form actions after the fields with the primary action last.',
  'These examples use per-instance IDs so multiple copies can share a page.',
  'The filter form applies only on submit and clears both draft controls and applied feedback on reset. Save actions stay local to the preview.',
]
</script>

<template>
  <BlockDoc
    title="Forms"
    description="Labelled form layouts with helper text, validation, and clear submit or reset actions."
    :usage="usage"
    :examples="examples"
  />
</template>
