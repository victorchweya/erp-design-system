<script setup lang="ts">
// GOAL: A record opens in a drawer that has its own link, so it can be shared and Back closes it.
import { computed, nextTick, onBeforeUnmount, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import Copy from '@primeicons/vue/copy'
import { useRouteDrawer } from './useRouteDrawer'
import { routeDrawerOrders } from './route-drawer'

const {
  orders = routeDrawerOrders,
  queryKey = 'record',
  label = 'Orders',
} = defineProps<{
  orders?: typeof routeDrawerOrders
  /** Query parameter that holds the open record's id. */
  queryKey?: string
  /** Accessible name for the list. */
  label?: string
}>()

const route = useRoute()
const { lastId, visible, open, close } = useRouteDrawer({
  key: queryKey,
  isKnown: (id) => orders.some((order) => order.id === id),
})
const order = computed(() => orders.find((item) => item.id === lastId.value))

// A deep link has no trigger to return to, so focus only moves back when a button opened it.
let trigger: HTMLElement | null = null
function openFrom(id: string, event: Event) {
  trigger = event.currentTarget as HTMLElement
  open(id)
}
function onVisible(next: boolean) {
  if (!next) close()
}
function restoreFocus() {
  trigger?.focus()
  trigger = null
}

const status = shallowRef('')
const failed = shallowRef(false)
let timer: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(timer))
async function copyLink() {
  clearTimeout(timer)
  // Clear first so repeated copies are announced again.
  status.value = ''
  failed.value = false
  await nextTick()
  try {
    await navigator.clipboard.writeText(location.href)
    status.value = 'Link copied'
  } catch {
    failed.value = true
    status.value = 'Couldn’t copy the link. Copy it from the address bar instead.'
  }
  timer = setTimeout(() => (status.value = ''), 3000)
}
</script>

<template>
  <div class="flex max-w-xl flex-col gap-2 text-sm">
    <ul :aria-label="label" class="divide-y divide-surface">
      <li v-for="item in orders" :key="item.id" class="flex items-center gap-3 py-1">
        <span class="min-w-0 flex-1 truncate">
          <span class="font-medium tabular-nums">{{ item.id }}</span>
          <span class="text-muted"> · {{ item.customer }}</span>
        </span>
        <Tag :severity="item.severity">{{ item.status }}</Tag>
        <Button
          type="button"
          size="small"
          severity="secondary"
          outlined
          :aria-label="`View order ${item.id}`"
          @click="openFrom(item.id, $event)"
          >View</Button
        >
      </li>
    </ul>
    <p class="text-xs text-muted">
      Link to this page: <span class="break-all tabular-nums">{{ route.fullPath }}</span>
    </p>
  </div>
  <Drawer
    :visible="visible"
    position="right"
    blockScroll
    class="w-full sm:w-96"
    :aria-label="`Order ${order?.id} details`"
    @update:visible="onVisible"
    @after-hide="restoreFocus"
  >
    <template #header>
      <div class="flex min-w-0 flex-1 items-center gap-1">
        <h2 class="truncate text-lg font-medium">Order {{ order?.id }}</h2>
        <Button
          type="button"
          iconOnly
          size="small"
          severity="secondary"
          text
          aria-label="Copy link"
          title="Copy link"
          @click="copyLink"
        >
          <Copy aria-hidden="true" />
        </Button>
      </div>
    </template>
    <div v-if="order" class="flex flex-col gap-3 text-sm">
      <Message v-if="failed && status" severity="error" variant="simple" size="small">
        {{ status }}
      </Message>
      <p v-else role="status" class="sr-only">{{ status }}</p>
      <div class="flex flex-wrap items-center gap-2">
        <Tag :severity="order.severity">{{ order.status }}</Tag>
        <span class="tabular-nums text-muted">{{ order.items }} items</span>
      </div>
      <dl class="grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <dt class="text-muted">Customer</dt>
          <dd>{{ order.customer }}</dd>
        </div>
        <div>
          <dt class="text-muted">Delivery</dt>
          <dd>{{ order.delivery }}</dd>
        </div>
        <div class="col-span-2">
          <dt class="text-muted">Delivery address</dt>
          <dd>{{ order.address }}</dd>
        </div>
      </dl>
    </div>
  </Drawer>
</template>
