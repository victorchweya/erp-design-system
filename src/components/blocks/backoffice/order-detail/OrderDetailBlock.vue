<script setup lang="ts">
import { shallowRef, useId, useTemplateRef, type Component } from 'vue'
import type DataTable from 'primevue/datatable'
import type Menu from 'primevue/menu'
import Building from '@primeicons/vue/building'
import Calendar from '@primeicons/vue/calendar'
import Clock from '@primeicons/vue/clock'
import Comment from '@primeicons/vue/comment'
import EllipsisV from '@primeicons/vue/ellipsis-v'
import Eye from '@primeicons/vue/eye'
import History from '@primeicons/vue/history'
import MapMarker from '@primeicons/vue/map-marker'
import Pencil from '@primeicons/vue/pencil'
import Phone from '@primeicons/vue/phone'
import Sync from '@primeicons/vue/sync'
import TimesCircle from '@primeicons/vue/times-circle'
import Truck from '@primeicons/vue/truck'
import Undo from '@primeicons/vue/undo'
import User from '@primeicons/vue/user'
import StatusTagBlock from '@/components/blocks/backoffice/status-tag/StatusTagBlock.vue'
import RecordDetailHeaderBlock from '@/components/blocks/headers/RecordDetailHeaderBlock.vue'
import TableHeaderActionsBlock, {
  type TableColumnOption,
} from '@/components/blocks/tables/TableHeaderActionsBlock.vue'
import { DISPLAY_PLACEHOLDER, formatCurrency, formatDateTime, formatNumber } from '@/utils/format'

const menu = useTemplateRef<InstanceType<typeof Menu>>('menu')
const menuId = useId()
const menuOpen = shallowRef(false)
const feedback = shallowRef('')
const detailsVisible = shallowRef(false)
const detailView = shallowRef<'all' | 'delivery'>('all')
let detailsTrigger: HTMLElement | null = null
let menuTrigger: HTMLElement | null = null
const orderItemsTable = useTemplateRef<InstanceType<typeof DataTable>>('orderItemsTable')
const deliveredItemsTable = useTemplateRef<InstanceType<typeof DataTable>>('deliveredItemsTable')

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

const etimsDetails = [
  { label: 'SCU ID', value: null },
  { label: 'Receipt number', value: null },
  { label: 'Receipt signature', value: null },
  { label: 'Invoice', value: null },
  { label: 'Sent at', value: null },
]

const orderColumns = [
  { key: 'product', label: 'Product', required: true },
  { key: 'unit', label: 'Unit' },
  { key: 'specification', label: 'Specifications' },
  { key: 'kgPerUnit', label: 'KG / unit' },
  { key: 'quantity', label: 'Order quantity' },
  { key: 'buyingPrice', label: 'Set buying price' },
  { key: 'sellingPrice', label: 'Selling price' },
  { key: 'flashSalePrice', label: 'Flash sale price' },
  { key: 'total', label: 'Total' },
] satisfies readonly TableColumnOption[]
const deliveredColumns = [
  { key: 'product', label: 'Product', required: true },
  { key: 'unit', label: 'Unit' },
  { key: 'ordered', label: 'Ordered' },
  { key: 'dispatched', label: 'Dispatched' },
  { key: 'received', label: 'Received' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'rejectionReason', label: 'Rejection reason' },
] satisfies readonly TableColumnOption[]
const visibleOrderColumns = shallowRef(orderColumns.map(({ key }) => key))
const visibleDeliveredColumns = shallowRef(deliveredColumns.map(({ key }) => key))

const deliveryDetails: { label: string; value: string; icon: Component; href?: string }[] = [
  { label: 'Location', value: 'Total Uthiru', icon: MapMarker },
  { label: 'Address', value: 'Uthiru', icon: Building },
  { label: 'Contact', value: 'Felix Mutinda', icon: User },
  { label: 'Phone', value: '0734 943 613', icon: Phone, href: 'tel:+254734943613' },
  {
    label: 'Delivery date',
    value: formatDateTime('2026-11-21T03:00:00+03:00'),
    icon: Calendar,
  },
  { label: 'Delivery window', value: '06:00–08:00', icon: Clock },
  { label: 'Delivery type', value: 'Delivery', icon: Truck },
]
const deliveryInstructions = 'Call the contact on arrival.'

const customerHref = '/customers/odida-enterprises'
const customerDetails: { label: string; value: string; href?: string }[] = [
  { label: 'Name', value: 'Odida Enterprises', href: customerHref },
  { label: 'Category', value: 'Hotel / Restaurant' },
  { label: 'Contact person', value: 'John Odida' },
  { label: 'Phone', value: '0723 000 111', href: 'tel:+254723000111' },
  { label: 'Email', value: 'john@odida.com', href: 'mailto:john@odida.com' },
  { label: 'KRA PIN', value: 'P051234567A' },
]

const actions = [
  {
    label: 'View order details',
    icon: Eye,
    command: openDetails,
  },
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

function openDetails() {
  detailsTrigger = menuTrigger
  detailView.value = 'all'
  detailsVisible.value = true
}

function openDeliveryDetails(event: Event) {
  detailsTrigger = event.currentTarget as HTMLElement
  detailView.value = 'delivery'
  detailsVisible.value = true
}

function toggleMenu(event: Event) {
  menuTrigger = event.currentTarget as HTMLElement
  menu.value?.toggle(event)
}

function exportOrderItems() {
  orderItemsTable.value?.exportCSV()
  feedback.value = `Exported ${orderItems.length} order items to CSV.`
}

function exportDeliveredItems() {
  deliveredItemsTable.value?.exportCSV()
  feedback.value = `Exported ${deliveredItems.length} delivered items to CSV.`
}
</script>

<template>
  <section
    class="order-detail flex min-w-0 flex-col gap-6 text-color"
    aria-labelledby="order-title"
  >
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">
      {{ feedback }}
    </p>

    <div class="flex flex-col gap-4">
      <RecordDetailHeaderBlock
        title="Order #RJ-CO-2026-07-010"
        title-id="order-title"
        heading-tag="h1"
        back-label="Back to orders"
        @back="selectAction('Back to orders selected in this preview.')"
      >
        <template #status><StatusTagBlock domain="order" status="dispatched" /></template>
        <template #actions>
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
            @click="toggleMenu"
          >
            <EllipsisV aria-hidden="true" />
          </Button>
          <Button
            type="button"
            size="small"
            @click="selectAction('Edit order selected in this preview.')"
          >
            <Pencil aria-hidden="true" />Edit order
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
    </div>

    <div class="order-detail-layout grid min-w-0 items-start gap-4">
      <aside class="min-w-0" aria-label="Order information">
        <Card>
          <template #content>
            <div class="flex flex-col gap-6">
              <section class="flex flex-col gap-4" aria-labelledby="sidebar-customer-title">
                <h2 id="sidebar-customer-title" class="text-base font-medium">
                  <a :href="customerHref" class="text-primary hover:underline">Odida Enterprises</a>
                </h2>
                <dl class="flex flex-col gap-3 text-sm">
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-muted">Order date</dt>
                    <dd class="text-right font-medium">
                      <time datetime="2026-11-20">20 Nov 2026</time>
                    </dd>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-muted">Source</dt>
                    <dd class="text-right font-medium">Chaser</dd>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-muted">Created by</dt>
                    <dd class="text-right font-medium">Tech FTF</dd>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-muted">Updated</dt>
                    <dd class="text-right font-medium">
                      <time datetime="2026-11-20T13:17:00+03:00">20 Nov 2026, 1:17 PM</time>
                    </dd>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-muted">Updated by</dt>
                    <dd class="text-right font-medium">Amina Hassan</dd>
                  </div>
                </dl>
              </section>

              <section
                class="flex flex-col gap-4 border-t border-surface pt-6"
                aria-labelledby="sidebar-summary-title"
              >
                <h2 id="sidebar-summary-title" class="text-base font-medium">Order summary</h2>
                <dl class="flex flex-col gap-3 text-sm">
                  <div class="flex items-center justify-between gap-4">
                    <dt class="text-muted">Subtotal</dt>
                    <dd class="font-medium tabular-nums">{{ formatCurrency(orderTotal) }}</dd>
                  </div>
                  <div class="flex items-center justify-between gap-4">
                    <dt class="text-muted">Tax</dt>
                    <dd class="font-medium tabular-nums">{{ formatCurrency(includedTax) }}</dd>
                  </div>
                  <div class="flex items-center justify-between gap-4">
                    <dt class="text-muted">Delivery fee</dt>
                    <dd class="font-medium tabular-nums">{{ formatCurrency(0) }}</dd>
                  </div>
                  <div class="flex items-center justify-between gap-4 border-t border-surface pt-3">
                    <dt class="font-medium">Total</dt>
                    <dd class="text-lg font-medium tabular-nums">
                      {{ formatCurrency(orderTotal) }}
                    </dd>
                  </div>
                </dl>
                <p class="border-t border-surface pt-3 text-xs leading-relaxed text-muted">
                  VAT is included in the selling price and delivery fee where applicable.
                </p>
              </section>

              <section
                class="flex flex-col gap-4 border-t border-surface pt-6"
                aria-labelledby="sidebar-payments-title"
              >
                <div class="flex items-center justify-between gap-3">
                  <h2 id="sidebar-payments-title" class="text-base font-medium">Payments</h2>
                  <StatusTagBlock domain="payment" status="pending" />
                </div>
                <dl class="flex flex-col gap-3 text-sm">
                  <div class="flex items-center justify-between gap-4">
                    <dt class="text-muted">Amount paid</dt>
                    <dd class="text-muted">{{ DISPLAY_PLACEHOLDER }}</dd>
                  </div>
                  <div class="flex items-center justify-between gap-4">
                    <dt class="text-muted">Balance due</dt>
                    <dd class="font-medium tabular-nums">{{ formatCurrency(orderTotal) }}</dd>
                  </div>
                  <div class="flex items-center justify-between gap-4">
                    <dt class="text-muted">Payment reference</dt>
                    <dd class="text-muted">{{ DISPLAY_PLACEHOLDER }}</dd>
                  </div>
                </dl>
              </section>

              <section
                class="flex flex-col gap-4 border-t border-surface pt-6"
                aria-labelledby="sidebar-etims-title"
              >
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <h2 id="sidebar-etims-title" class="text-base font-medium">eTIMS information</h2>
                  <Button
                    v-tooltip.bottom="'Sync to eTIMS'"
                    type="button"
                    severity="primary"
                    text
                    size="small"
                    @click="selectAction('eTIMS sync selected in this preview.')"
                  >
                    <Sync aria-hidden="true" />eTIMS
                  </Button>
                </div>
                <dl class="flex flex-col gap-3 text-sm">
                  <div
                    v-for="detail in etimsDetails"
                    :key="detail.label"
                    class="flex items-start justify-between gap-4"
                  >
                    <dt class="text-muted">{{ detail.label }}</dt>
                    <dd class="max-w-48 break-words text-right font-medium">
                      {{ detail.value ?? DISPLAY_PLACEHOLDER }}
                    </dd>
                  </div>
                </dl>
              </section>

              <section
                class="flex flex-col gap-4 border-t border-surface pt-6"
                aria-labelledby="sidebar-delivery-title"
              >
                <h2 id="sidebar-delivery-title">
                  <button
                    type="button"
                    class="rounded-sm text-left text-base font-medium text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-haspopup="dialog"
                    :aria-expanded="detailsVisible && detailView === 'delivery'"
                    @click="openDeliveryDetails"
                  >
                    Delivery details
                  </button>
                </h2>
                <dl class="flex flex-col gap-3 text-sm">
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-muted">Date</dt>
                    <dd class="text-right font-medium">
                      <time datetime="2026-11-21T03:00:00+03:00">21 Nov 2026, 3:00 AM</time>
                    </dd>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-muted">Window</dt>
                    <dd class="text-right font-medium">06:00–08:00</dd>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-muted">Location</dt>
                    <dd class="text-right font-medium">Total Uthiru</dd>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-muted">Contact</dt>
                    <dd class="text-right font-medium">Felix Mutinda</dd>
                  </div>
                </dl>
              </section>

              <section
                class="flex flex-col gap-4 border-t border-surface pt-6"
                aria-labelledby="sidebar-feedback-title"
              >
                <h2 id="sidebar-feedback-title" class="text-base font-medium">Delivery feedback</h2>
                <dl class="flex flex-col gap-3 text-sm">
                  <div class="flex items-center justify-between gap-4">
                    <dt class="text-muted">Rating</dt>
                    <dd class="font-medium">{{ DISPLAY_PLACEHOLDER }}</dd>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-muted">Comment</dt>
                    <dd class="max-w-48 break-words text-right font-medium">
                      {{ DISPLAY_PLACEHOLDER }}
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </template>
        </Card>
      </aside>

      <main class="flex min-w-0 flex-col gap-4">
        <section class="min-w-0" aria-labelledby="order-items-title">
          <div class="min-w-0 max-w-full overflow-x-auto">
            <DataTable
              ref="orderItemsTable"
              :value="orderItems"
              dataKey="sku"
              exportFilename="order-RJ-CO-2026-07-010-items"
              size="small"
              showGridlines
              scrollable
              tableClass="text-sm"
              :tableStyle="{ minWidth: '70rem' }"
              :tableProps="{ 'aria-label': 'Order items' }"
            >
              <template #header>
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <h2 id="order-items-title" class="text-lg font-medium">Order items</h2>
                  <TableHeaderActionsBlock
                    v-model:visible-columns="visibleOrderColumns"
                    :columns="orderColumns"
                    @export="exportOrderItems"
                  />
                </div>
              </template>
              <Column
                v-if="visibleOrderColumns.includes('product')"
                field="product"
                header="Product"
                frozen
              >
                <template #body="{ data }">
                  <div class="flex min-w-44 flex-col gap-1">
                    <span class="font-medium">{{ data.product }}</span>
                    <span class="text-xs text-muted">SKU: {{ data.sku }}</span>
                  </div>
                </template>
              </Column>
              <Column v-if="visibleOrderColumns.includes('unit')" field="unit" header="Unit" />
              <Column
                v-if="visibleOrderColumns.includes('specification')"
                field="specification"
                header="Specifications"
              />
              <Column
                v-if="visibleOrderColumns.includes('kgPerUnit')"
                field="kgPerUnit"
                header="KG / unit"
              >
                <template #body="{ data }">{{ formatNumber(data.kgPerUnit) }}</template>
              </Column>
              <Column
                v-if="visibleOrderColumns.includes('quantity')"
                field="quantity"
                header="Order quantity"
              >
                <template #body="{ data }">{{ formatNumber(data.quantity) }}</template>
              </Column>
              <Column
                v-if="visibleOrderColumns.includes('buyingPrice')"
                field="buyingPrice"
                header="Set buying price"
              >
                <template #body="{ data }">{{ formatCurrency(data.buyingPrice) }}</template>
              </Column>
              <Column
                v-if="visibleOrderColumns.includes('sellingPrice')"
                field="sellingPrice"
                header="Selling price"
              >
                <template #body="{ data }">{{ formatCurrency(data.sellingPrice) }}</template>
              </Column>
              <Column
                v-if="visibleOrderColumns.includes('flashSalePrice')"
                field="flashSalePrice"
                header="Flash sale price"
              >
                <template #body="{ data }">{{ formatCurrency(data.flashSalePrice) }}</template>
              </Column>
              <Column v-if="visibleOrderColumns.includes('total')" field="total" header="Total">
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
              ref="deliveredItemsTable"
              :value="deliveredItems"
              dataKey="sku"
              exportFilename="order-RJ-CO-2026-07-010-delivered-items"
              size="small"
              showGridlines
              scrollable
              tableClass="text-sm"
              :tableStyle="{ minWidth: '64rem' }"
              :tableProps="{ 'aria-label': 'Delivered items' }"
            >
              <template #header>
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <h2 id="delivered-items-title" class="text-base font-medium">Delivered items</h2>
                  <TableHeaderActionsBlock
                    v-model:visible-columns="visibleDeliveredColumns"
                    :columns="deliveredColumns"
                    @export="exportDeliveredItems"
                  />
                </div>
              </template>
              <Column
                v-if="visibleDeliveredColumns.includes('product')"
                field="product"
                header="Product"
                frozen
              >
                <template #body="{ data }">
                  <div class="flex min-w-44 flex-col gap-1">
                    <span class="font-medium">{{ data.product }}</span>
                    <span class="text-xs text-muted">SKU: {{ data.sku }}</span>
                  </div>
                </template>
              </Column>
              <Column v-if="visibleDeliveredColumns.includes('unit')" field="unit" header="Unit" />
              <Column
                v-if="visibleDeliveredColumns.includes('ordered')"
                field="ordered"
                header="Ordered"
              >
                <template #body="{ data }">{{ formatNumber(data.ordered) }}</template>
              </Column>
              <Column
                v-if="visibleDeliveredColumns.includes('dispatched')"
                field="dispatched"
                header="Dispatched"
              >
                <template #body="{ data }">{{ formatNumber(data.dispatched) }}</template>
              </Column>
              <Column
                v-if="visibleDeliveredColumns.includes('received')"
                field="received"
                header="Received"
              >
                <template #body="{ data }">{{ formatNumber(data.received) }}</template>
              </Column>
              <Column
                v-if="visibleDeliveredColumns.includes('inventory')"
                field="inventory"
                header="Inventory"
              >
                <template #body="{ data }">{{ formatNumber(data.inventory) }}</template>
              </Column>
              <Column
                v-if="visibleDeliveredColumns.includes('rejected')"
                field="rejected"
                header="Rejected"
              >
                <template #body="{ data }">{{ formatNumber(data.rejected) }}</template>
              </Column>
              <Column
                v-if="visibleDeliveredColumns.includes('rejectionReason')"
                field="rejectionReason"
                header="Rejection reason"
              >
                <template #body="{ data }">{{
                  data.rejectionReason ?? DISPLAY_PLACEHOLDER
                }}</template>
              </Column>
            </DataTable>
          </div>
        </section>
      </main>
    </div>

    <Drawer
      v-model:visible="detailsVisible"
      :header="detailView === 'delivery' ? 'Delivery details' : 'Order #RJ-CO-2026-07-010'"
      :aria-label="detailView === 'delivery' ? 'Delivery details' : 'Order details'"
      position="right"
      blockScroll
      class="w-full sm:w-[28rem]"
      @after-hide="detailsTrigger?.focus()"
    >
      <div class="flex flex-col gap-6 text-sm">
        <section
          v-if="detailView === 'all'"
          class="flex flex-col gap-3"
          aria-labelledby="drawer-summary-title"
        >
          <h3 id="drawer-summary-title" class="text-base font-medium">Payment summary</h3>
          <dl class="flex flex-col gap-3">
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
              <dd class="font-medium tabular-nums">{{ formatCurrency(orderTotal) }}</dd>
            </div>
          </dl>
          <p class="text-xs leading-relaxed text-muted">
            VAT is included in the selling price and delivery fee where applicable.
          </p>
        </section>

        <section
          v-if="detailView === 'all'"
          class="flex flex-col gap-3 border-t border-surface pt-5"
          aria-labelledby="drawer-customer-title"
        >
          <h3 id="drawer-customer-title" class="text-base font-medium">Customer details</h3>
          <dl class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div v-for="detail in customerDetails" :key="detail.label" class="flex flex-col gap-1">
              <dt class="text-muted">{{ detail.label }}</dt>
              <dd class="break-words font-medium">
                <a v-if="detail.href" :href="detail.href" class="text-primary hover:underline">{{
                  detail.value
                }}</a>
                <template v-else>{{ detail.value }}</template>
              </dd>
            </div>
          </dl>
        </section>

        <section
          class="flex flex-col gap-3"
          :class="{ 'border-t border-surface pt-5': detailView === 'all' }"
          aria-labelledby="drawer-delivery-title"
        >
          <h3
            id="drawer-delivery-title"
            class="text-base font-medium"
            :class="{ 'sr-only': detailView === 'delivery' }"
          >
            Delivery details
          </h3>
          <div
            v-if="detailView === 'delivery'"
            class="mb-2 flex min-h-48 items-center justify-center rounded-lg border border-surface bg-surface-50 p-6 text-center dark:bg-surface-800"
            role="img"
            aria-label="Map placeholder showing Total Uthiru"
          >
            <div class="flex flex-col items-center gap-2">
              <MapMarker :size="28" aria-hidden="true" class="text-primary" />
              <p class="font-medium">Total Uthiru</p>
              <p class="text-xs text-muted">Map preview placeholder</p>
            </div>
          </div>
          <dl class="grid grid-cols-1 gap-3">
            <div
              v-for="detail in deliveryDetails"
              :key="detail.label"
              class="flex items-start justify-between gap-4"
            >
              <dt class="flex items-center gap-2 text-muted">
                <component :is="detail.icon" :size="14" aria-hidden="true" class="shrink-0" />
                {{ detail.label }}
              </dt>
              <dd class="break-words text-right font-medium">
                <a v-if="detail.href" :href="detail.href" class="text-primary hover:underline">{{
                  detail.value
                }}</a>
                <template v-else>{{ detail.value }}</template>
              </dd>
            </div>
          </dl>
          <div class="flex flex-col gap-1 border-t border-surface pt-3">
            <p class="flex items-center gap-2 text-muted">
              <Comment :size="14" aria-hidden="true" class="shrink-0" />
              Instructions
            </p>
            <p class="break-words font-medium leading-relaxed">{{ deliveryInstructions }}</p>
          </div>
        </section>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <Button type="button" severity="primary" outlined @click="detailsVisible = false">
            Close details
          </Button>
        </div>
      </template>
    </Drawer>
  </section>
</template>

<style scoped>
.order-detail {
  container-type: inline-size;
}

@container (min-width: 56rem) {
  .order-detail-layout {
    grid-template-columns: minmax(16rem, 0.7fr) minmax(0, 2.3fr);
  }
}
</style>
