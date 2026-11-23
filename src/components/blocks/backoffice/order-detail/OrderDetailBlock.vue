<script setup lang="ts">
import { shallowRef, useId, useTemplateRef } from 'vue'
import type Menu from 'primevue/menu'
import EllipsisV from '@primeicons/vue/ellipsis-v'
import History from '@primeicons/vue/history'
import Pencil from '@primeicons/vue/pencil'
import Sync from '@primeicons/vue/sync'
import TimesCircle from '@primeicons/vue/times-circle'
import Undo from '@primeicons/vue/undo'
import StatusTagBlock from '@/components/blocks/backoffice/status-tag/StatusTagBlock.vue'
import RecordDetailHeaderBlock from '@/components/blocks/headers/RecordDetailHeaderBlock.vue'
import { DISPLAY_PLACEHOLDER, formatCurrency, formatDateTime, formatNumber } from '@/utils/format'

const menu = useTemplateRef<InstanceType<typeof Menu>>('menu')
const menuId = useId()
const menuOpen = shallowRef(false)
const feedback = shallowRef('')

const orderItems = [
  {
    product: 'Alika Potato – grade 1',
    sku: 'FTF-5988',
    unit: 'KG',
    specification: 'Semi-ripe',
    kgPerUnit: 1,
    quantity: 20,
    buyingPrice: 105,
    sellingPrice: 140,
    flashSalePrice: null,
    total: 2800,
  },
  {
    product: 'Hass avocado – grade 1',
    sku: 'FTF-4102',
    unit: 'PC',
    specification: 'Ready to eat',
    kgPerUnit: 0.25,
    quantity: 48,
    buyingPrice: 24,
    sellingPrice: 35,
    flashSalePrice: 32,
    total: 1536,
  },
  {
    product: 'Red onion – grade 1',
    sku: 'FTF-2014',
    unit: 'KG',
    specification: 'Dry',
    kgPerUnit: 1,
    quantity: 30,
    buyingPrice: 68,
    sellingPrice: 90,
    flashSalePrice: null,
    total: 2700,
  },
  {
    product: 'Tomato – grade 1',
    sku: 'FTF-1038',
    unit: 'KG',
    specification: 'Firm ripe',
    kgPerUnit: 1,
    quantity: 25,
    buyingPrice: 60,
    sellingPrice: 80,
    flashSalePrice: null,
    total: 2000,
  },
  {
    product: 'Carrot – grade 1',
    sku: 'FTF-3072',
    unit: 'KG',
    specification: 'Medium',
    kgPerUnit: 1,
    quantity: 20,
    buyingPrice: 72,
    sellingPrice: 95,
    flashSalePrice: null,
    total: 1900,
  },
  {
    product: 'Cabbage – grade 1',
    sku: 'FTF-2206',
    unit: 'PC',
    specification: 'Medium head',
    kgPerUnit: 1.2,
    quantity: 15,
    buyingPrice: 52,
    sellingPrice: 70,
    flashSalePrice: null,
    total: 1050,
  },
  {
    product: 'Sukuma wiki',
    sku: 'FTF-7201',
    unit: 'BUNCH',
    specification: 'Fresh cut',
    kgPerUnit: 0.3,
    quantity: 40,
    buyingPrice: 17,
    sellingPrice: 25,
    flashSalePrice: 22,
    total: 880,
  },
  {
    product: 'Spinach',
    sku: 'FTF-7204',
    unit: 'BUNCH',
    specification: 'Fresh cut',
    kgPerUnit: 0.25,
    quantity: 30,
    buyingPrice: 20,
    sellingPrice: 30,
    flashSalePrice: null,
    total: 900,
  },
  {
    product: 'Green pepper – grade 1',
    sku: 'FTF-4401',
    unit: 'KG',
    specification: 'Large',
    kgPerUnit: 1,
    quantity: 12,
    buyingPrice: 125,
    sellingPrice: 160,
    flashSalePrice: null,
    total: 1920,
  },
  {
    product: 'Yellow pepper – grade 1',
    sku: 'FTF-4403',
    unit: 'KG',
    specification: 'Large',
    kgPerUnit: 1,
    quantity: 10,
    buyingPrice: 175,
    sellingPrice: 220,
    flashSalePrice: null,
    total: 2200,
  },
  {
    product: 'Courgette – grade 1',
    sku: 'FTF-3302',
    unit: 'KG',
    specification: 'Medium',
    kgPerUnit: 1,
    quantity: 18,
    buyingPrice: 82,
    sellingPrice: 110,
    flashSalePrice: null,
    total: 1980,
  },
  {
    product: 'French beans – grade 1',
    sku: 'FTF-5101',
    unit: 'KG',
    specification: 'Fine',
    kgPerUnit: 1,
    quantity: 16,
    buyingPrice: 138,
    sellingPrice: 180,
    flashSalePrice: 165,
    total: 2640,
  },
  {
    product: 'Snow peas – grade 1',
    sku: 'FTF-5104',
    unit: 'KG',
    specification: 'Fine',
    kgPerUnit: 1,
    quantity: 10,
    buyingPrice: 205,
    sellingPrice: 260,
    flashSalePrice: null,
    total: 2600,
  },
  {
    product: 'Broccoli – grade 1',
    sku: 'FTF-6201',
    unit: 'KG',
    specification: 'Medium head',
    kgPerUnit: 1,
    quantity: 12,
    buyingPrice: 145,
    sellingPrice: 190,
    flashSalePrice: null,
    total: 2280,
  },
  {
    product: 'Cauliflower – grade 1',
    sku: 'FTF-6203',
    unit: 'PC',
    specification: 'Medium head',
    kgPerUnit: 1.1,
    quantity: 14,
    buyingPrice: 130,
    sellingPrice: 170,
    flashSalePrice: null,
    total: 2380,
  },
  {
    product: 'Sweet potato – grade 1',
    sku: 'FTF-2108',
    unit: 'KG',
    specification: 'Medium',
    kgPerUnit: 1,
    quantity: 25,
    buyingPrice: 62,
    sellingPrice: 85,
    flashSalePrice: null,
    total: 2125,
  },
  {
    product: 'Butternut – grade 1',
    sku: 'FTF-3308',
    unit: 'KG',
    specification: 'Medium',
    kgPerUnit: 1,
    quantity: 20,
    buyingPrice: 55,
    sellingPrice: 75,
    flashSalePrice: null,
    total: 1500,
  },
  {
    product: 'Ginger – grade 1',
    sku: 'FTF-8102',
    unit: 'KG',
    specification: 'Washed',
    kgPerUnit: 1,
    quantity: 8,
    buyingPrice: 225,
    sellingPrice: 280,
    flashSalePrice: null,
    total: 2240,
  },
  {
    product: 'Garlic – grade 1',
    sku: 'FTF-8104',
    unit: 'KG',
    specification: 'Dry',
    kgPerUnit: 1,
    quantity: 6,
    buyingPrice: 260,
    sellingPrice: 320,
    flashSalePrice: null,
    total: 1920,
  },
  {
    product: 'Lemon – grade 1',
    sku: 'FTF-4206',
    unit: 'PC',
    specification: 'Medium',
    kgPerUnit: 0.12,
    quantity: 60,
    buyingPrice: 9,
    sellingPrice: 15,
    flashSalePrice: 12,
    total: 720,
  },
]

const orderTotal = orderItems.reduce((total, item) => total + item.total, 0)
const includedTax = orderTotal - orderTotal / 1.16

const deliveredItems = orderItems.map(({ product, sku, unit, quantity }) => ({
  product,
  sku,
  unit,
  ordered: quantity,
  dispatched: quantity,
  received: quantity,
  inventory: quantity,
  rejected: null,
  rejectionReason: null,
}))

const etimsRecords = [
  {
    scuId: null,
    receiptNumber: null,
    receiptSignature: null,
    invoice: null,
    sentAt: null,
  },
]

const deliveryDetails: { label: string; value: string; href?: string }[] = [
  { label: 'Location', value: 'Total Uthiru' },
  { label: 'Address', value: 'Uthiru' },
  { label: 'Contact', value: 'Felix Mutinda' },
  { label: 'Phone', value: '0734 943 613', href: 'tel:+254734943613' },
  { label: 'Delivery date', value: formatDateTime('2026-11-21T03:00:00+03:00') },
  { label: 'Delivery window', value: '06:00–08:00' },
  { label: 'Delivery type', value: 'Delivery' },
  { label: 'Instructions', value: 'Call the contact on arrival.' },
]

const customerDetails: { label: string; value: string; href?: string }[] = [
  { label: 'Name', value: 'Odida Enterprises' },
  { label: 'Category', value: 'Hotel / Restaurant' },
  { label: 'Contact person', value: 'John Odida' },
  { label: 'Phone', value: '0723 000 111', href: 'tel:+254723000111' },
  { label: 'Email', value: 'john@odida.com', href: 'mailto:john@odida.com' },
  { label: 'KRA PIN', value: 'P051234567A' },
]

const actions = [
  {
    label: 'Sync to eTIMS',
    icon: Sync,
    command: () => (feedback.value = 'eTIMS sync selected in this preview.'),
  },
  {
    label: 'Cancel order',
    icon: TimesCircle,
    command: () => (feedback.value = 'Cancel order selected in this preview.'),
  },
  {
    label: 'Reverse inventory',
    icon: Undo,
    command: () => (feedback.value = 'Reverse inventory selected in this preview.'),
  },
  { separator: true },
  {
    label: 'View history',
    icon: History,
    command: () => (feedback.value = 'Order history selected in this preview.'),
  },
]

function selectAction(message: string) {
  feedback.value = message
}
</script>

<template>
  <section
    class="order-detail flex min-w-0 flex-col gap-4 text-color"
    aria-labelledby="order-title"
  >
    <RecordDetailHeaderBlock
      title="Order #RJ-CO-2026-07-010"
      title-id="order-title"
      heading-tag="h1"
      back-label="Back to orders"
      @back="selectAction('Back to orders selected in this preview.')"
    >
      <template #status><StatusTagBlock domain="order" status="dispatched" /></template>
      <template #metadata>
        <dl class="flex flex-wrap gap-x-4 gap-y-0.5 text-sm">
          <div class="flex gap-2">
            <dt class="text-muted">Customer:</dt>
            <dd class="font-medium">Odida Enterprises</dd>
          </div>
          <div class="flex gap-2">
            <dt class="text-muted">Order date:</dt>
            <dd class="font-medium"><time datetime="2026-11-20">20 Nov 2026</time></dd>
          </div>
          <div class="flex gap-2">
            <dt class="text-muted">Source:</dt>
            <dd class="font-medium">Chaser</dd>
          </div>
          <div class="flex gap-2">
            <dt class="text-muted">Created by:</dt>
            <dd class="font-medium">Tech FTF</dd>
          </div>
          <div class="flex gap-2">
            <dt class="text-muted">Updated:</dt>
            <dd class="font-medium">
              <time datetime="2026-11-20T13:17:00+03:00">20 Nov 2026, 1:17 PM</time> by Amina Hassan
            </dd>
          </div>
        </dl>
      </template>
      <template #actions>
        <Button
          type="button"
          size="small"
          @click="selectAction('Edit order selected in this preview.')"
        >
          <Pencil aria-hidden="true" />Edit order
        </Button>
        <Button
          type="button"
          severity="primary"
          outlined
          size="small"
          iconOnly
          aria-label="More order actions"
          aria-haspopup="menu"
          :aria-controls="menuId"
          :aria-expanded="menuOpen"
          @click="menu?.toggle($event)"
        >
          <EllipsisV aria-hidden="true" />
        </Button>
        <Menu
          :id="menuId"
          ref="menu"
          :model="actions"
          popup
          aria-label="Order actions"
          @show="menuOpen = true"
          @hide="menuOpen = false"
        />
      </template>
    </RecordDetailHeaderBlock>

    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">
      {{ feedback }}
    </p>

    <div class="order-detail-layout grid min-w-0 items-start gap-4">
      <main class="flex min-w-0 flex-col gap-4">
        <section class="min-w-0" aria-labelledby="order-items-title">
          <div class="min-w-0 max-w-full overflow-x-auto">
            <DataTable
              :value="orderItems"
              dataKey="sku"
              size="small"
              showGridlines
              scrollable
              tableClass="text-sm"
              :tableStyle="{ minWidth: '70rem' }"
              :tableProps="{ 'aria-label': 'Order items' }"
            >
              <template #header>
                <h2 id="order-items-title" class="text-sm font-medium">Order items</h2>
              </template>
              <Column field="product" header="Product" frozen>
                <template #body="{ data }">
                  <div class="flex min-w-44 flex-col gap-1">
                    <span class="font-medium">{{ data.product }}</span>
                    <span class="text-xs text-muted">SKU: {{ data.sku }}</span>
                  </div>
                </template>
              </Column>
              <Column field="unit" header="Unit" />
              <Column field="specification" header="Specifications" />
              <Column field="kgPerUnit" header="KG / unit">
                <template #body="{ data }">{{ formatNumber(data.kgPerUnit) }}</template>
              </Column>
              <Column field="quantity" header="Order quantity">
                <template #body="{ data }">{{ formatNumber(data.quantity) }}</template>
              </Column>
              <Column field="buyingPrice" header="Set buying price">
                <template #body="{ data }">{{ formatCurrency(data.buyingPrice) }}</template>
              </Column>
              <Column field="sellingPrice" header="Selling price">
                <template #body="{ data }">{{ formatCurrency(data.sellingPrice) }}</template>
              </Column>
              <Column field="flashSalePrice" header="Flash sale price">
                <template #body="{ data }">{{ formatCurrency(data.flashSalePrice) }}</template>
              </Column>
              <Column field="total" header="Total">
                <template #body="{ data }">
                  <span class="font-medium tabular-nums">{{ formatCurrency(data.total) }}</span>
                </template>
              </Column>
            </DataTable>
          </div>
        </section>

        <section class="min-w-0" aria-labelledby="delivered-items-title">
          <div class="min-w-0 max-w-full overflow-x-auto">
            <DataTable
              :value="deliveredItems"
              dataKey="sku"
              size="small"
              showGridlines
              scrollable
              tableClass="text-sm"
              :tableStyle="{ minWidth: '64rem' }"
              :tableProps="{ 'aria-label': 'Delivered items' }"
            >
              <template #header>
                <h2 id="delivered-items-title" class="text-sm font-medium">Delivered items</h2>
              </template>
              <Column field="product" header="Product" frozen>
                <template #body="{ data }">
                  <div class="flex min-w-44 flex-col gap-1">
                    <span class="font-medium">{{ data.product }}</span>
                    <span class="text-xs text-muted">SKU: {{ data.sku }}</span>
                  </div>
                </template>
              </Column>
              <Column field="unit" header="Unit" />
              <Column field="ordered" header="Ordered">
                <template #body="{ data }">{{ formatNumber(data.ordered) }}</template>
              </Column>
              <Column field="dispatched" header="Dispatched">
                <template #body="{ data }">{{ formatNumber(data.dispatched) }}</template>
              </Column>
              <Column field="received" header="Received">
                <template #body="{ data }">{{ formatNumber(data.received) }}</template>
              </Column>
              <Column field="inventory" header="Inventory">
                <template #body="{ data }">{{ formatNumber(data.inventory) }}</template>
              </Column>
              <Column field="rejected" header="Rejected">
                <template #body="{ data }">{{ formatNumber(data.rejected) }}</template>
              </Column>
              <Column field="rejectionReason" header="Rejection reason">
                <template #body="{ data }">{{
                  data.rejectionReason ?? DISPLAY_PLACEHOLDER
                }}</template>
              </Column>
            </DataTable>
          </div>
        </section>

        <section class="min-w-0" aria-labelledby="etims-title">
          <div class="min-w-0 max-w-full overflow-x-auto">
            <DataTable
              :value="etimsRecords"
              size="small"
              showGridlines
              scrollable
              tableClass="text-sm"
              :tableStyle="{ minWidth: '48rem' }"
              :tableProps="{ 'aria-label': 'eTIMS information' }"
            >
              <template #header>
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <h2 id="etims-title" class="text-sm font-medium">eTIMS information</h2>
                  <Button
                    type="button"
                    severity="primary"
                    outlined
                    size="small"
                    @click="selectAction('eTIMS sync selected in this preview.')"
                  >
                    <Sync aria-hidden="true" />Sync to eTIMS
                  </Button>
                </div>
              </template>
              <Column field="scuId" header="SCU ID">
                <template #body="{ data }">{{ data.scuId ?? DISPLAY_PLACEHOLDER }}</template>
              </Column>
              <Column field="receiptNumber" header="Receipt number">
                <template #body="{ data }">{{
                  data.receiptNumber ?? DISPLAY_PLACEHOLDER
                }}</template>
              </Column>
              <Column field="receiptSignature" header="Receipt signature">
                <template #body="{ data }">{{
                  data.receiptSignature ?? DISPLAY_PLACEHOLDER
                }}</template>
              </Column>
              <Column field="invoice" header="Invoice">
                <template #body="{ data }">{{ data.invoice ?? DISPLAY_PLACEHOLDER }}</template>
              </Column>
              <Column field="sentAt" header="Sent at">
                <template #body="{ data }">{{ formatDateTime(data.sentAt) }}</template>
              </Column>
            </DataTable>
          </div>
        </section>
      </main>

      <aside class="flex min-w-0 flex-col gap-4" aria-label="Order information">
        <Card>
          <template #title><h2 class="text-lg font-medium">Order summary</h2></template>
          <template #content>
            <dl class="flex flex-col gap-3 text-sm">
              <div class="flex items-center justify-between gap-4">
                <dt class="text-muted">Payment</dt>
                <dd><StatusTagBlock domain="payment" status="pending" /></dd>
              </div>
              <div class="flex items-center justify-between gap-4">
                <dt class="text-muted">Subtotal</dt>
                <dd class="font-medium tabular-nums">{{ formatCurrency(orderTotal) }}</dd>
              </div>
              <div class="flex items-center justify-between gap-4">
                <dt class="text-muted">Tax included</dt>
                <dd class="font-medium tabular-nums">{{ formatCurrency(includedTax) }}</dd>
              </div>
              <div class="flex items-center justify-between gap-4">
                <dt class="text-muted">Delivery fee</dt>
                <dd class="font-medium tabular-nums">{{ formatCurrency(0) }}</dd>
              </div>
              <div class="flex items-center justify-between gap-4 border-t border-surface pt-3">
                <dt class="font-medium">Total</dt>
                <dd class="text-lg font-medium tabular-nums">{{ formatCurrency(orderTotal) }}</dd>
              </div>
            </dl>
            <p class="mt-4 border-t border-surface pt-4 text-xs leading-relaxed text-muted">
              VAT is included in the selling price and delivery fee where applicable.
            </p>
          </template>
        </Card>

        <Card>
          <template #title><h2 class="text-lg font-medium">Delivery details</h2></template>
          <template #content>
            <dl class="flex flex-col gap-3 text-sm">
              <div
                v-for="detail in deliveryDetails"
                :key="detail.label"
                class="flex items-start justify-between gap-4"
              >
                <dt class="text-muted">{{ detail.label }}</dt>
                <dd class="max-w-48 text-right font-medium">
                  <a v-if="detail.href" :href="detail.href" class="text-primary hover:underline">{{
                    detail.value
                  }}</a>
                  <template v-else>{{ detail.value }}</template>
                </dd>
              </div>
            </dl>
          </template>
        </Card>

        <Card>
          <template #title><h2 class="text-lg font-medium">Customer details</h2></template>
          <template #content>
            <dl class="flex flex-col gap-3 text-sm">
              <div
                v-for="detail in customerDetails"
                :key="detail.label"
                class="flex items-start justify-between gap-4"
              >
                <dt class="text-muted">{{ detail.label }}</dt>
                <dd class="max-w-48 break-words text-right font-medium">
                  <a v-if="detail.href" :href="detail.href" class="text-primary hover:underline">{{
                    detail.value
                  }}</a>
                  <template v-else>{{ detail.value }}</template>
                </dd>
              </div>
            </dl>
          </template>
        </Card>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.order-detail {
  container-type: inline-size;
}

@container (min-width: 64rem) {
  .order-detail-layout {
    grid-template-columns: minmax(0, 2.25fr) minmax(18rem, 0.75fr);
  }
}
</style>
