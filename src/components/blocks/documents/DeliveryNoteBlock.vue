<script setup lang="ts">
import { useId } from 'vue'
import { formatDateTime } from '@/utils/format'
import DocumentShell from './DocumentShell.vue'
import DocumentSignature from './DocumentSignature.vue'
import { acceptedOf, deliveryNote as note } from './documents'

const id = useId()
const meta = [
  { label: 'Dispatched', value: formatDateTime(note.dispatched) },
  { label: 'Order reference', value: note.order },
  { label: 'Route', value: note.route },
  { label: 'Driver · vehicle', value: `${note.driver} · ${note.vehicle}` },
]
const totals = note.lines.reduce(
  (sum, line) => ({
    ordered: sum.ordered + line.ordered,
    delivered: sum.delivered + line.delivered,
    rejected: sum.rejected + line.rejected,
    accepted: sum.accepted + acceptedOf(line),
  }),
  { ordered: 0, delivered: 0, rejected: 0, accepted: 0 },
)
const summary = [
  { label: 'Packs ordered', value: totals.ordered },
  { label: 'Packs delivered', value: totals.delivered },
  { label: 'Packs rejected', value: totals.rejected },
  { label: 'Packs accepted', value: totals.accepted },
  { label: 'Crates delivered', value: note.crates.dispatched },
  { label: 'Empty crates collected', value: note.crates.collected },
]
</script>

<template>
  <DocumentShell title="Delivery note" :number="note.number" :meta="meta">
    <template #status>
      <Tag severity="warn" value="Awaiting signature" class="print:border print:border-black" />
    </template>

    <section :aria-labelledby="`${id}-deliver-to`" class="flex flex-col gap-2">
      <h4 :id="`${id}-deliver-to`" class="text-xs font-medium uppercase tracking-wide text-muted">
        Deliver to
      </h4>
      <address class="flex flex-col not-italic">
        <span class="font-medium">{{ note.customer.name }}</span>
        <span v-for="line in note.customer.address" :key="line">{{ line }}</span>
      </address>
    </section>

    <div class="overflow-x-auto print:overflow-visible">
      <table class="w-full min-w-[40rem] border-collapse text-left print:min-w-0">
        <caption class="sr-only">
          Ordered, delivered, rejected, and accepted packs. The receiver records rejections and
          reasons on delivery.
        </caption>
        <thead>
          <tr class="border-b border-surface text-xs uppercase tracking-wide text-muted">
            <th scope="col" class="py-2 pr-3 font-medium">Item</th>
            <th scope="col" class="px-3 py-2 text-right font-medium">Ordered</th>
            <th scope="col" class="px-3 py-2 text-right font-medium">Delivered</th>
            <th scope="col" class="px-3 py-2 text-right font-medium">Rejected</th>
            <th scope="col" class="px-3 py-2 text-right font-medium">Accepted</th>
            <th scope="col" class="py-2 pl-3 font-medium">Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="line in note.lines"
            :key="line.id"
            class="border-b border-surface break-inside-avoid"
          >
            <th scope="row" class="py-3 pr-3 font-normal">
              <span class="block font-medium">{{ line.name }}</span>
              <span class="text-xs text-muted">{{ line.pack }}</span>
            </th>
            <td class="px-3 py-3 text-right tabular-nums">{{ line.ordered }}</td>
            <td
              class="px-3 py-3 text-right tabular-nums"
              :class="{ 'font-medium text-warn': line.delivered < line.ordered }"
            >
              {{ line.delivered }}
            </td>
            <td
              class="px-3 py-3 text-right tabular-nums"
              :class="{ 'font-medium text-danger': line.rejected > 0 }"
            >
              {{ line.rejected }}
            </td>
            <td class="px-3 py-3 text-right font-medium tabular-nums">{{ acceptedOf(line) }}</td>
            <td class="py-3 pl-3" :class="{ 'text-muted': !line.reason }">
              {{ line.reason ?? '—' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <dl
      aria-label="Delivery totals"
      class="grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg border border-surface p-4 break-inside-avoid sm:grid-cols-3 print:grid-cols-3"
    >
      <div v-for="item in summary" :key="item.label" class="flex flex-col gap-1">
        <dt class="text-xs text-muted">{{ item.label }}</dt>
        <dd class="text-lg font-medium tabular-nums">{{ item.value }}</dd>
      </div>
    </dl>

    <p class="text-muted">
      Check each item before signing. Record rejected packs and the reason above; the driver returns
      them to the hub and the invoice is adjusted to accepted quantities.
    </p>

    <div class="grid gap-4 sm:grid-cols-2 print:grid-cols-2">
      <DocumentSignature label="Received by (customer)" />
      <DocumentSignature label="Delivered by (driver)" :name="note.driver" role="Driver" />
    </div>
  </DocumentShell>
</template>
