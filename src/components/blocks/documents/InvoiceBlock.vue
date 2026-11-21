<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'
import DocumentShell from './DocumentShell.vue'
import {
  STANDARD_VAT_RATE,
  date,
  invoice,
  invoiceSeverity,
  invoiceStatuses,
  lineTotal,
  money,
  isVatExempt,
  subtotalOf,
  taxableOf,
  vatOf,
  type InvoiceStatus,
} from './documents'

const id = useId()
const status = shallowRef<InvoiceStatus>('Issued')
const subtotal = subtotalOf(invoice.lines)
const taxable = taxableOf(invoice.lines)
const vat = vatOf(invoice.lines)
const total = subtotal + vat
const standardRate = `${STANDARD_VAT_RATE * 100}%`

const meta = [
  { label: 'Invoice date', value: date(invoice.issued) },
  { label: 'Due date', value: date(invoice.due) },
  { label: 'Order reference', value: invoice.order },
  { label: 'Payment terms', value: invoice.terms },
]
const statusNote = computed(
  () =>
    ({
      Draft: 'Draft. Not yet sent to the customer.',
      Issued: `Payment of ${money(total)} is due by ${date(invoice.due)}.`,
      Paid: `Paid in full on ${date(invoice.paid)}. Thank you.`,
      Overdue: `Payment was due on ${date(invoice.due)}. Please pay ${money(total)} now or contact accounts.`,
    })[status.value],
)
</script>

<template>
  <DocumentShell title="Invoice" :number="invoice.number" :meta="meta">
    <template #actions>
      <span :id="`${id}-status-label`" class="font-medium">Preview status</span>
      <SelectButton
        v-model="status"
        :options="invoiceStatuses"
        :allowEmpty="false"
        size="small"
        :aria-labelledby="`${id}-status-label`"
      />
    </template>
    <template #status>
      <Tag
        :severity="invoiceSeverity[status]"
        :value="status"
        class="print:border print:border-black"
      />
    </template>

    <div class="grid gap-6 sm:grid-cols-2 print:grid-cols-2">
      <section :aria-labelledby="`${id}-bill-to`" class="flex flex-col gap-2">
        <h4 :id="`${id}-bill-to`" class="text-xs font-medium uppercase tracking-wide text-muted">
          Bill to
        </h4>
        <address class="flex flex-col not-italic">
          <span class="font-medium">{{ invoice.customer.name }}</span>
          <span>Attn: {{ invoice.customer.contact }}</span>
          <span v-for="line in invoice.customer.address" :key="line">{{ line }}</span>
          <span>KRA PIN {{ invoice.customer.kraPin }}</span>
        </address>
      </section>
      <p
        role="status"
        class="self-start rounded-lg border border-surface p-4"
        :class="{ 'text-danger': status === 'Overdue' }"
      >
        {{ statusNote }}
      </p>
    </div>

    <div class="overflow-x-auto print:overflow-visible">
      <table class="w-full min-w-[36rem] border-collapse text-left print:min-w-0">
        <caption class="sr-only">
          Invoice line items
        </caption>
        <thead>
          <tr class="border-b border-surface text-xs uppercase tracking-wide text-muted">
            <th scope="col" class="py-2 pr-3 font-medium">Item</th>
            <th scope="col" class="px-3 py-2 text-right font-medium">Qty</th>
            <th scope="col" class="px-3 py-2 text-right font-medium">Unit price</th>
            <th scope="col" class="px-3 py-2 text-right font-medium">VAT</th>
            <th scope="col" class="py-2 pl-3 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="line in invoice.lines"
            :key="line.id"
            class="border-b border-surface break-inside-avoid"
          >
            <th scope="row" class="py-3 pr-3 font-normal">
              <span class="block font-medium">{{ line.name }}</span>
              <span class="text-xs text-muted">{{ line.pack }} · {{ line.id }}</span>
            </th>
            <td class="px-3 py-3 text-right tabular-nums">{{ line.quantity }}</td>
            <td class="whitespace-nowrap px-3 py-3 text-right tabular-nums">
              {{ money(line.price) }}
            </td>
            <td class="whitespace-nowrap px-3 py-3 text-right">
              {{ isVatExempt(line) ? 'Exempt' : standardRate }}
            </td>
            <td class="whitespace-nowrap py-3 pl-3 text-right tabular-nums">
              {{ money(lineTotal(line)) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <dl
      aria-label="Invoice totals"
      class="ml-auto flex w-full max-w-xs flex-col gap-2 break-inside-avoid"
    >
      <div class="flex justify-between gap-4">
        <dt class="text-muted">Subtotal</dt>
        <dd class="tabular-nums">{{ money(subtotal) }}</dd>
      </div>
      <div class="flex justify-between gap-4">
        <dt class="text-muted">VAT {{ standardRate }} on {{ money(taxable) }}</dt>
        <dd class="tabular-nums">{{ money(vat) }}</dd>
      </div>
      <div class="flex justify-between gap-4 border-t border-surface pt-3">
        <dt class="font-medium">Total due</dt>
        <dd class="text-lg font-medium tabular-nums">{{ money(total) }}</dd>
      </div>
    </dl>

    <section
      :aria-labelledby="`${id}-payment`"
      class="flex flex-col gap-3 rounded-lg border border-surface p-4 break-inside-avoid"
    >
      <h4 :id="`${id}-payment`" class="font-medium">How to pay</h4>
      <dl class="grid gap-x-6 gap-y-3 sm:grid-cols-2 print:grid-cols-2">
        <div class="flex flex-col gap-1">
          <dt class="text-xs text-muted">M-Pesa paybill (sample)</dt>
          <dd class="tabular-nums">{{ invoice.payment.paybill }} · Account {{ invoice.number }}</dd>
        </div>
        <div class="flex flex-col gap-1">
          <dt class="text-xs text-muted">Bank transfer (sample)</dt>
          <dd>
            {{ invoice.payment.bank }}, {{ invoice.payment.branch }} · A/C
            <span class="tabular-nums">{{ invoice.payment.account }}</span>
          </dd>
        </div>
      </dl>
      <p class="text-xs text-muted">
        Quote the invoice number with every payment. These payment details are placeholders; do not
        send money to them. The VAT split is an example (fresh produce exempt, packaging and
        delivery at {{ standardRate }}); confirm each product’s VAT treatment with finance.
      </p>
    </section>
  </DocumentShell>
</template>
