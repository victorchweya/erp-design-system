<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import OrderItemsCard from './OrderItemsCard.vue'
import OrderDeliveryCard from './OrderDeliveryCard.vue'
import OrderSummaryCard from './OrderSummaryCard.vue'
import { customer, money, produce, sampleOrder } from './order-entry'

const items = ref(sampleOrder())
const address = shallowRef(customer.address)
const warehouse = shallowRef('Nairobi hub')
const slot = shallowRef('Next delivery day · 8am–12pm')
const resolution = shallowRef<'upfront' | 'approval' | 'split'>('upfront')
const feedback = shallowRef('')
const subtotal = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
)
const packs = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
const delivery = computed(() => (items.value.length ? 1500 : 0))
const total = computed(() => subtotal.value + delivery.value)
const available = customer.creditLimit - customer.outstanding
const shortfall = computed(() => Math.max(0, total.value - available))
const valid = computed(
  () => items.value.length > 0 && !!address.value.trim() && !!warehouse.value && !!slot.value,
)

function updateQuantity(id: string, quantity: number | null) {
  const item = items.value.find((item) => item.id === id)
  if (!item || quantity === null || !Number.isFinite(quantity)) return
  item.quantity = Math.min(item.stock, Math.max(1, Math.round(quantity)))
  feedback.value = ''
}
function add(id: string) {
  const product = produce.find((item) => item.id === id)
  if (!product || items.value.some((item) => item.id === id)) return
  items.value.push({ ...product, quantity: 1 })
  feedback.value = ''
}
function remove(id: string) {
  items.value = items.value.filter((item) => item.id !== id)
  feedback.value = ''
}
function reorder() {
  items.value = sampleOrder()
  feedback.value = 'Preview: items from the last sample order have been loaded.'
}
function submit() {
  if (!valid.value) return
  if (!shortfall.value)
    feedback.value = `Preview: order FTF-1049 for ${money(total.value)} is ready for confirmation.`
  else if (resolution.value === 'upfront')
    feedback.value = `Preview: collect ${money(shortfall.value)} before dispatch. No payment request has been sent.`
  else if (resolution.value === 'approval')
    feedback.value =
      'Preview: this order needs a finance review. Dispatch remains on hold; no request has been sent.'
  else
    feedback.value = `Preview: review a split within ${money(available)} of available credit. No items have been allocated or dispatched.`
}
</script>

<template>
  <div class="order-entry flex flex-col gap-6 text-color">
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div class="flex min-w-0 flex-1 basis-64 flex-col gap-2">
        <h2 class="text-xl font-medium tracking-tight sm:text-2xl">New customer order</h2>
        <p class="text-sm text-muted">
          Draft FTF-1049 · started by Amina Hassan from a customer request.
        </p>
      </div>
      <Button
        type="button"
        severity="primary"
        outlined
        @click="
          feedback = 'Draft preview prepared. Changes are not saved when you leave this page.'
        "
        >Save draft</Button
      >
    </header>
    <p role="status" class="text-sm text-primary" :class="{ 'sr-only': !feedback }">
      {{ feedback }}
    </p>
    <div class="order-layout grid min-w-0 items-start gap-4">
      <div class="flex min-w-0 flex-col gap-4">
        <Card>
          <template #title><h3 class="text-lg font-medium">Customer</h3></template>
          <template #content>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-1">
                <p class="font-medium">{{ customer.name }}</p>
                <p class="text-sm text-muted">
                  Westlands, Nairobi · {{ customer.contact }} · hospitality customer
                </p>
              </div>
              <dl class="grid grid-cols-1 gap-3 border-t border-surface pt-4 sm:grid-cols-3">
                <div class="flex flex-col gap-1">
                  <dt class="text-xs text-muted">Credit limit</dt>
                  <dd class="text-sm font-medium tabular-nums">
                    {{ money(customer.creditLimit) }}
                  </dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-xs text-muted">Outstanding</dt>
                  <dd class="text-sm font-medium tabular-nums">
                    {{ money(customer.outstanding) }}
                  </dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-xs text-muted">Available credit</dt>
                  <dd class="text-sm font-medium tabular-nums">{{ money(available) }}</dd>
                </div>
              </dl>
            </div>
          </template>
        </Card>
        <OrderItemsCard
          :items="items"
          @quantity="updateQuantity"
          @remove="remove"
          @add="add"
          @reorder="reorder"
        />
        <OrderDeliveryCard
          v-model:address="address"
          v-model:warehouse="warehouse"
          v-model:slot="slot"
        />
      </div>
      <OrderSummaryCard
        v-model="resolution"
        :subtotal="subtotal"
        :delivery="delivery"
        :packs="packs"
        :valid="valid"
        @submit="submit"
        @approval="
          feedback =
            'Preview: order FTF-1049 is ready for sales-lead review. No request has been sent.'
        "
      />
    </div>
  </div>
</template>

<style scoped>
.order-entry {
  container-type: inline-size;
}
@container (min-width: 58rem) {
  .order-layout {
    grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  }
}
</style>
