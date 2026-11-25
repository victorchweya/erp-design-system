<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import PaymentAllocationExample from '@/components/blocks/backoffice/payment-allocation/PaymentAllocationExample.vue'
// The Code tab shows the reusable block. The rules it uses live in allocation.ts.
import code from '@/components/blocks/backoffice/payment-allocation/PaymentAllocationBlock.vue?raw'
import { customerInvoices } from '@/components/blocks/backoffice/payment-allocation/invoices'

const examples = [
  {
    id: 'allocate-a-payment',
    title: 'Allocate a payment',
    description:
      'Auto-allocate fills the oldest due invoices first, and Save stays off until the whole payment is allocated.',
    component: PaymentAllocationExample,
    code,
    props: { invoices: customerInvoices, paymentAmount: 200000 },
  },
  {
    id: 'over-allocated',
    title: 'Over-allocated payment',
    description:
      'Allocating more than the payment, or more than an invoice balance, blocks Save and says why.',
    component: PaymentAllocationExample,
    code,
    props: {
      invoices: customerInvoices,
      paymentAmount: 150000,
      initialAllocations: { 'inv-2041': 90000, 'inv-2047': 80000 },
    },
  },
]
const usage = [
  "Use PaymentAllocationBlock to split one payment across a customer's open invoices. Pass the invoices with their balances and the payment amount, bind v-model:allocations, and handle save, which emits the invoices that receive money and any amount kept as customer credit.",
  'Auto-allocate pays the oldest due invoice first and never goes past a balance or the payment. Clear removes every allocation. The rules, in Ksh cents, live in allocation.ts, so the same checks can run on the server.',
  'Save is available when no invoice is over its balance and the allocations fit the payment. A payment no larger than what is owed must be allocated in full. A larger payment keeps the rest as customer credit, or the whole payment can be left unapplied.',
]
</script>

<template>
  <BlockDoc
    eyebrow="UI blocks"
    title="Payment allocation"
    description="Allocate one payment across open invoices and see what is still unallocated before saving."
    :usage="usage"
    :examples="examples"
  />
</template>
