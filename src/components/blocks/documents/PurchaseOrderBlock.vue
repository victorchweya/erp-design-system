<script setup lang="ts">
import { useId } from 'vue'
import DocumentShell from './DocumentShell.vue'
import DocumentSignature from './DocumentSignature.vue'
import { amount, date, money, purchaseLineTotal, purchaseOrder as po } from './documents'

const id = useId()
const total = po.lines.reduce((sum, line) => sum + purchaseLineTotal(line), 0)
const meta = [
  { label: 'Order date', value: date(po.raised) },
  { label: 'Delivery date', value: date(po.deliveryDate) },
  { label: 'Delivery window', value: po.deliveryWindow },
  { label: 'Payment', value: '7 days after goods received' },
]
</script>

<template>
  <DocumentShell title="Purchase order" :number="po.number" :meta="meta">
    <template #status>
      <Tag severity="info" value="Approved" class="print:border print:border-black" />
    </template>

    <div class="grid gap-6 sm:grid-cols-2 print:grid-cols-2">
      <section :aria-labelledby="`${id}-supplier`" class="flex flex-col gap-2">
        <h4 :id="`${id}-supplier`" class="text-xs font-medium uppercase tracking-wide text-muted">
          Supplier
        </h4>
        <address class="flex flex-col not-italic">
          <span class="font-medium">{{ po.supplier.name }}</span>
          <span>{{ po.supplier.farm }}</span>
          <span>Contact: {{ po.supplier.contact }}</span>
          <span>KRA PIN {{ po.supplier.kraPin }}</span>
        </address>
      </section>
      <section :aria-labelledby="`${id}-deliver-to`" class="flex flex-col gap-2">
        <h4 :id="`${id}-deliver-to`" class="text-xs font-medium uppercase tracking-wide text-muted">
          Deliver to
        </h4>
        <address class="flex flex-col not-italic">
          <span v-for="line in po.deliverTo" :key="line">{{ line }}</span>
          <span
            >{{ date(po.deliveryDate) }},
            <strong class="font-medium">{{ po.deliveryWindow }}</strong></span
          >
        </address>
      </section>
    </div>

    <div class="overflow-x-auto print:overflow-visible">
      <table class="w-full min-w-[40rem] border-collapse text-left print:min-w-0">
        <caption class="sr-only">
          Items ordered. Unit prices are per kilogram; quantities count packs.
        </caption>
        <thead>
          <tr class="border-b border-surface text-xs uppercase tracking-wide text-muted">
            <th scope="col" class="py-2 pr-3 font-medium">Item</th>
            <th scope="col" class="px-3 py-2 font-medium">Pack</th>
            <th scope="col" class="px-3 py-2 text-right font-medium">Packs</th>
            <th scope="col" class="px-3 py-2 text-right font-medium">Quantity</th>
            <th scope="col" class="px-3 py-2 text-right font-medium">Unit price</th>
            <th scope="col" class="py-2 pl-3 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="line in po.lines"
            :key="line.id"
            class="border-b border-surface break-inside-avoid"
          >
            <th scope="row" class="py-3 pr-3 font-normal">
              <span class="block font-medium">{{ line.name }}</span>
              <span class="text-xs text-muted">{{ line.grade }}</span>
            </th>
            <td class="px-3 py-3">{{ line.pack }}</td>
            <td class="px-3 py-3 text-right tabular-nums">{{ line.quantity }}</td>
            <td class="whitespace-nowrap px-3 py-3 text-right tabular-nums">
              {{ amount(line.quantity * line.unitsPerPack) }} {{ line.unit }}
            </td>
            <td class="whitespace-nowrap px-3 py-3 text-right tabular-nums">
              {{ money(line.price) }}/{{ line.unit }}
            </td>
            <td class="whitespace-nowrap py-3 pl-3 text-right tabular-nums">
              {{ money(purchaseLineTotal(line)) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <dl aria-label="Purchase order total" class="ml-auto flex w-full max-w-xs flex-col gap-2">
      <div class="flex justify-between gap-4 border-t border-surface pt-3">
        <dt class="font-medium">Order total (excl. VAT)</dt>
        <dd class="text-lg font-medium tabular-nums">{{ money(total) }}</dd>
      </div>
    </dl>

    <section :aria-labelledby="`${id}-terms`" class="flex flex-col gap-2 break-inside-avoid">
      <h4 :id="`${id}-terms`" class="font-medium">Terms</h4>
      <ol class="flex list-decimal flex-col gap-1 pl-5 text-muted">
        <li v-for="term in po.terms" :key="term">{{ term }}</li>
      </ol>
    </section>

    <div class="grid gap-4 sm:grid-cols-2 print:grid-cols-2">
      <DocumentSignature
        label="Prepared by"
        :name="po.preparedBy.name"
        :role="po.preparedBy.role"
      />
      <DocumentSignature label="Approved by" :name="po.approver.name" :role="po.approver.role" />
    </div>
  </DocumentShell>
</template>
