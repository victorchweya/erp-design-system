<script setup lang="ts">
import { reactive, type Component } from 'vue'
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import InvoiceBlock from '@/components/blocks/documents/InvoiceBlock.vue'
import invoiceCode from '@/components/blocks/documents/InvoiceBlock.vue?raw'
import PurchaseOrderBlock from '@/components/blocks/documents/PurchaseOrderBlock.vue'
import purchaseCode from '@/components/blocks/documents/PurchaseOrderBlock.vue?raw'
import DeliveryNoteBlock from '@/components/blocks/documents/DeliveryNoteBlock.vue'
import deliveryCode from '@/components/blocks/documents/DeliveryNoteBlock.vue?raw'
import shellCode from '@/components/blocks/documents/DocumentShell.vue?raw'
import signatureCode from '@/components/blocks/documents/DocumentSignature.vue?raw'
import dataCode from '@/components/blocks/documents/documents.ts?raw'

interface SourceFile {
  name: string
  code: string
}

const shared: SourceFile[] = [
  { name: 'DocumentShell.vue', code: shellCode },
  { name: 'documents.ts', code: dataCode },
]
const signature: SourceFile = { name: 'DocumentSignature.vue', code: signatureCode }

const examples: {
  id: string
  title: string
  description: string
  component: Component
  files: SourceFile[]
}[] = [
  {
    id: 'invoice',
    title: 'Invoice',
    description:
      'Bill a customer with line items, VAT, totals, payment terms, and payment details. Preview each status before printing.',
    component: InvoiceBlock,
    files: [{ name: 'InvoiceBlock.vue', code: invoiceCode }, ...shared],
  },
  {
    id: 'purchase-order',
    title: 'Purchase order',
    description:
      'Order produce from a supplier farm with grades, pack sizes, a delivery window, terms, and approval signatures.',
    component: PurchaseOrderBlock,
    files: [{ name: 'PurchaseOrderBlock.vue', code: purchaseCode }, signature, ...shared],
  },
  {
    id: 'delivery-note',
    title: 'Delivery note',
    description:
      'Hand over a delivery with route, driver, vehicle, crates, and ordered, delivered, and rejected quantities for the receiver to sign.',
    component: DeliveryNoteBlock,
    files: [{ name: 'DeliveryNoteBlock.vue', code: deliveryCode }, signature, ...shared],
  },
]
const selectedFiles = reactive<Record<string, string>>(
  Object.fromEntries(examples.map(({ id, files }) => [id, files[0]!.name])),
)
const sections = [
  { id: 'how-to-use', label: 'How to use' },
  ...examples.map(({ id, title }) => ({ id, label: title })),
]
const activeSection = useActiveSection(sections.map(({ id }) => id))

function sourceOf(example: (typeof examples)[number]) {
  return example.files.find(({ name }) => name === selectedFiles[example.id]) ?? example.files[0]!
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-(--breakpoint-xl) gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">UI blocks</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Documents</h1>
        <p class="text-base leading-relaxed text-muted">
          Printable invoices, purchase orders, and delivery notes for FTF customers, suppliers, and
          drivers. Each document shares a header, details list, and print action.
        </p>
      </header>
      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />
      <div class="flex flex-col gap-12">
        <section
          id="how-to-use"
          aria-labelledby="documents-usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="documents-usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted">
            Switch to <Tag severity="secondary">Code</Tag> and use
            <Tag severity="secondary">Source file</Tag> to copy every file a document needs into the
            same folder. Documents use semantic tables, address blocks, and description lists so
            they read correctly with assistive technology and on paper.
          </p>
          <p class="leading-relaxed text-muted">
            <Tag severity="secondary">Print</Tag> prints only that document on A4, in black on
            white, with table headers repeated on each page and rows kept whole. Printing from the
            browser menu still prints the full page.
          </p>
          <p class="leading-relaxed text-muted">
            All company, customer, tax, and payment details are fictional. The 16% VAT rate is an
            example; confirm each product’s VAT treatment with finance and load registered details,
            numbering, and statuses from your ERP services.
          </p>
        </section>
        <section
          v-for="example in examples"
          :id="example.id"
          :key="example.id"
          :aria-labelledby="`${example.id}-title`"
          class="flex min-w-0 scroll-mt-24 flex-col gap-4"
        >
          <div class="flex flex-wrap items-end justify-between gap-4">
            <h2 :id="`${example.id}-title`" class="text-2xl font-medium">{{ example.title }}</h2>
            <div class="flex min-w-0 flex-col gap-1">
              <label :for="`${example.id}-source`" class="font-medium">Source file</label>
              <Select
                v-model="selectedFiles[example.id]"
                :inputId="`${example.id}-source`"
                :options="example.files"
                optionLabel="name"
                optionValue="name"
                size="small"
              />
            </div>
          </div>
          <p class="leading-relaxed text-muted">{{ example.description }}</p>
          <CodeExample
            :title="sourceOf(example).name"
            :code="sourceOf(example).code"
            :language="sourceOf(example).name.endsWith('.ts') ? 'TypeScript' : 'Vue'"
            tabbed
          >
            <component :is="example.component" />
          </CodeExample>
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
