<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import CodeExample from '@/components/CodeExample.vue'
import OrderEntryBlock from '@/components/blocks/order-entry/OrderEntryBlock.vue'
import pageCode from '@/components/blocks/order-entry/OrderEntryBlock.vue?raw'
import itemsCode from '@/components/blocks/order-entry/OrderItemsCard.vue?raw'
import deliveryCode from '@/components/blocks/order-entry/OrderDeliveryCard.vue?raw'
import summaryCode from '@/components/blocks/order-entry/OrderSummaryCard.vue?raw'
import dataCode from '@/components/blocks/order-entry/order-entry.ts?raw'
import ReconciliationBlock from '@/components/blocks/order-entry/ReconciliationBlock.vue'
import reconciliationCode from '@/components/blocks/order-entry/ReconciliationBlock.vue?raw'
import {
  sampleReconciliation,
  type ReconciliationResult,
} from '@/components/blocks/order-entry/reconciliation'

const files = [
  { name: 'OrderEntryBlock.vue', code: pageCode },
  { name: 'OrderItemsCard.vue', code: itemsCode },
  { name: 'OrderDeliveryCard.vue', code: deliveryCode },
  { name: 'OrderSummaryCard.vue', code: summaryCode },
  { name: 'order-entry.ts', code: dataCode },
]
const selectedFile = shallowRef(files[0]!.name)
const source = computed(() => files.find((file) => file.name === selectedFile.value)!)
const receiving = ref(sampleReconciliation())
const receivingSaved = shallowRef('')
function saveReceiving(results: ReconciliationResult[]) {
  const accepted = results.reduce((sum, line) => sum + line.accepted, 0)
  receivingSaved.value = `Preview: ${accepted} packs accepted. Nothing has been saved.`
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-(--breakpoint-xl) flex-col gap-12 px-4 py-10 text-sm">
    <header class="flex flex-col gap-3">
      <p class="font-medium uppercase tracking-wide text-primary">UI blocks</p>
      <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Order entry</h1>
      <p class="text-base leading-relaxed text-muted">
        Build a customer order with FTF produce, delivery details, and a clear credit decision. This
        page uses our standard components and theme.
      </p>
    </header>
    <section class="flex flex-col gap-4" aria-labelledby="order-usage-title">
      <h2 id="order-usage-title" class="text-2xl font-medium">How to use</h2>
      <p class="leading-relaxed text-muted">
        Change quantities, add or remove produce, and choose how to handle an order that exceeds
        available credit. Amounts use Kenyan shillings; quantities count the packs shown beside each
        product.
      </p>
      <p class="leading-relaxed text-muted">
        Switch to <Tag severity="secondary">Code</Tag> and use
        <Tag severity="secondary">Source file</Tag> to copy all five files into the same folder. The
        page uses native Card, DataTable, and form controls, with a two-column layout when its
        container has enough space.
      </p>
      <p class="leading-relaxed text-muted">
        This is a local preview. Connect customer selection, stock, prices, delivery availability,
        credit checks, draft storage, and approval or payment services before using it in the ERP.
      </p>
    </section>
    <section class="flex min-w-0 flex-col gap-4" aria-labelledby="order-example-title">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 id="order-example-title" class="text-2xl font-medium">Customer order</h2>
        <div class="flex min-w-0 flex-col gap-1">
          <label for="order-source" class="font-medium">Source file</label>
          <Select
            inputId="order-source"
            v-model="selectedFile"
            :options="files"
            optionLabel="name"
            optionValue="name"
            size="small"
          />
        </div>
      </div>
      <CodeExample
        :title="source.name"
        :code="source.code"
        :language="source.name.endsWith('.ts') ? 'TypeScript' : 'Vue'"
        tabbed
      >
        <OrderEntryBlock />
      </CodeExample>
    </section>
    <section class="flex min-w-0 flex-col gap-4" aria-labelledby="receiving-example-title">
      <div class="flex flex-col gap-2">
        <h2 id="receiving-example-title" class="text-2xl font-medium">Receiving reconciliation</h2>
        <p class="leading-relaxed text-muted">
          Check what arrived against what was ordered, line by line, and say why anything was
          rejected. Saving stays off until every rejection has a reason and nothing exceeds the
          order; excess goes through a separate flow. Copy reconciliation.ts beside the block.
        </p>
      </div>
      <CodeExample title="ReconciliationBlock.vue" :code="reconciliationCode" language="Vue" tabbed>
        <div class="flex flex-col gap-3">
          <ReconciliationBlock v-model:lines="receiving" @save="saveReceiving" />
          <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !receivingSaved }">
            {{ receivingSaved }}
          </p>
        </div>
      </CodeExample>
    </section>
  </div>
</template>
