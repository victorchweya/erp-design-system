<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import CodeExample from '@/components/CodeExample.vue'
import OrderEntryBlock from '@/components/blocks/order-entry/OrderEntryBlock.vue'
import pageCode from '@/components/blocks/order-entry/OrderEntryBlock.vue?raw'
import itemsCode from '@/components/blocks/order-entry/OrderItemsCard.vue?raw'
import deliveryCode from '@/components/blocks/order-entry/OrderDeliveryCard.vue?raw'
import summaryCode from '@/components/blocks/order-entry/OrderSummaryCard.vue?raw'
import dataCode from '@/components/blocks/order-entry/order-entry.ts?raw'

const files = [
  { name: 'OrderEntryBlock.vue', code: pageCode },
  { name: 'OrderItemsCard.vue', code: itemsCode },
  { name: 'OrderDeliveryCard.vue', code: deliveryCode },
  { name: 'OrderSummaryCard.vue', code: summaryCode },
  { name: 'order-entry.ts', code: dataCode },
]
const selectedFile = shallowRef(files[0]!.name)
const source = computed(() => files.find((file) => file.name === selectedFile.value)!)
</script>

<template>
  <div class="mx-auto flex w-full max-w-screen-xl flex-col gap-12 px-6 py-10 text-sm">
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
  </div>
</template>
