<script setup lang="ts">
import { shallowRef, useId } from 'vue'
const id = useId()
const visible = shallowRef(false)
let trigger: HTMLElement | null = null
function open(event: Event) {
  trigger = event.currentTarget as HTMLElement
  visible.value = true
}
</script>

<template>
  <Button
    type="button"
    severity="primary"
    outlined
    aria-haspopup="dialog"
    :aria-controls="id"
    :aria-expanded="visible"
    @click="open"
    >View order details</Button
  >
  <Drawer
    :id="id"
    v-model:visible="visible"
    header="Order FTF-1042"
    aria-label="Order FTF-1042 details"
    position="right"
    blockScroll
    class="w-full sm:w-96"
    @after-hide="trigger?.focus()"
  >
    <div class="flex flex-col gap-6 text-sm">
      <div class="flex flex-wrap items-center gap-3">
        <Tag severity="success">Confirmed</Tag><span class="text-muted">12 items</span>
      </div>
      <p class="text-muted">Order information stays alongside the list you are working from.</p>
      <dl class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <dt class="text-muted">Customer</dt>
          <dd>Green Basket</dd>
        </div>
        <div class="space-y-1">
          <dt class="text-muted">Delivery</dt>
          <dd>Friday, 20 November</dd>
        </div>
        <div class="col-span-2 space-y-1">
          <dt class="text-muted">Delivery address</dt>
          <dd>14 Market Road, Nairobi</dd>
        </div>
      </dl>
      <Card
        ><template #title><h3 class="text-lg font-medium">Delivery note</h3></template
        ><template #content
          ><p class="leading-relaxed text-muted">
            Use the loading entrance. Call the receiving team on arrival.
          </p></template
        ></Card
      >
    </div>
    <template #footer
      ><div class="flex justify-end">
        <Button type="button" severity="secondary" outlined @click="visible = false"
          >Close details</Button
        >
      </div></template
    >
  </Drawer>
</template>
