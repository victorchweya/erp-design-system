<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import CustomerProfileExample from '@/components/blocks/backoffice/record-details/CustomerProfileExample.vue'
// The first example shows the reusable block itself; the others show how to call it.
import code0 from '@/components/blocks/backoffice/record-details/RecordDetailsBlock.vue?raw'
import SupplierOrderSidebarExample from '@/components/blocks/backoffice/record-details/SupplierOrderSidebarExample.vue'
import code1 from '@/components/blocks/backoffice/record-details/SupplierOrderSidebarExample.vue?raw'
import PaymentDrawerExample from '@/components/blocks/backoffice/record-details/PaymentDrawerExample.vue'
import code2 from '@/components/blocks/backoffice/record-details/PaymentDrawerExample.vue?raw'
const examples = [
  {
    id: 'customer-profile',
    title: 'Customer profile',
    description:
      'One-row header with tags and actions, a credit line, and grouped details in two columns.',
    component: CustomerProfileExample,
    code: code0,
  },
  {
    id: 'order-sidebar',
    title: 'Supplier order sidebar',
    description: 'The narrow variant with right-aligned values and a custom payment status.',
    component: SupplierOrderSidebarExample,
    code: code1,
  },
  {
    id: 'payment-drawer',
    title: 'Payment details in a drawer',
    description: 'Headerless details in a Drawer, with labelled copy buttons.',
    component: PaymentDrawerExample,
    code: code2,
  },
]
const usage = [
  'RecordDetailsBlock shows a record’s key facts: an optional one-row header, a credit line, and grouped label and value pairs. Pass sections of items with a key, label, value, and kind (text, currency, date, number, or link). Empty values show a dash and are read aloud as “Not provided”.',
  'Set headingTag so the page keeps one h1; group headings use the next level. Use variant="sidebar" for a narrow panel such as a Drawer.',
  'Set copyable on identifiers. The button is labelled, appears on hover and focus (always on touch), and announces success politely; a failure shows as text. Use the value-<key>, tags, and actions slots for custom content.',
  'The first example’s Code tab is the block itself. The others show how to use it.',
]
</script>

<template>
  <BlockDoc
    title="Record details"
    description="A labelled details list and record header for customers, orders, and payments."
    eyebrow="UI blocks"
    :usage="usage"
    :examples="examples"
  />
</template>
