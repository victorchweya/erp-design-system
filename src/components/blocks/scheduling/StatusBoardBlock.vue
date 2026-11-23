<script setup lang="ts">
import { computed, nextTick, shallowRef, useId, useTemplateRef } from 'vue'
import type Menu from 'primevue/menu'
import ChevronDown from '@primeicons/vue/chevron-down'
import { formatNumber } from '@/utils/format'

const stages = ['Received', 'Picking', 'Packed', 'Dispatched', 'Delivered'] as const
type Stage = (typeof stages)[number]
interface BoardOrder {
  reference: string
  customer: string
  crates: number
  slot: string
  stage: Stage
  urgent?: boolean
}

const id = useId()
const menu = useTemplateRef<InstanceType<typeof Menu>>('menu')
const orders = shallowRef<BoardOrder[]>([
  {
    reference: 'FTF-1042',
    customer: 'Green Basket',
    crates: 12,
    slot: '6:00–8:00 am',
    stage: 'Received',
  },
  {
    reference: 'FTF-1043',
    customer: 'Harvest Kitchen',
    crates: 8,
    slot: '7:00–9:00 am',
    stage: 'Received',
    urgent: true,
  },
  {
    reference: 'FTF-1044',
    customer: 'Market Table',
    crates: 15,
    slot: '8:00–10:00 am',
    stage: 'Picking',
  },
  {
    reference: 'FTF-1045',
    customer: 'Fresh Corner',
    crates: 6,
    slot: '6:00–8:00 am',
    stage: 'Picking',
  },
  {
    reference: 'FTF-1046',
    customer: 'Savannah Grill',
    crates: 20,
    slot: '9:00–11:00 am',
    stage: 'Packed',
  },
  {
    reference: 'FTF-1047',
    customer: 'Kilimani Grocers',
    crates: 9,
    slot: '5:30–7:30 am',
    stage: 'Dispatched',
  },
  {
    reference: 'FTF-1048',
    customer: 'Westlands Deli',
    crates: 4,
    slot: '5:00–7:00 am',
    stage: 'Delivered',
  },
])
const columns = computed(() =>
  stages.map((stage) => ({
    stage,
    orders: orders.value.filter((order) => order.stage === stage),
  })),
)

const announcement = shallowRef('')
const dragging = shallowRef<string | null>(null)
const dropTarget = shallowRef<Stage | null>(null)
const menuOrder = shallowRef<BoardOrder | null>(null)
const menuVisible = shallowRef(false)
let focusAfterMove: string | null = null

const menuItems = computed(() => {
  const order = menuOrder.value
  if (!order) return []
  return [
    {
      label: `Move ${order.reference} to`,
      items: stages
        .filter((stage) => stage !== order.stage)
        .map((stage) => ({
          label: stage,
          command: () => {
            focusAfterMove = order.reference
            move(order.reference, stage)
          },
        })),
    },
  ]
})

function move(reference: string, to: Stage) {
  const order = orders.value.find((item) => item.reference === reference)
  if (!order || order.stage === to) return
  const from = order.stage
  // Moved cards go to the end of their new column.
  orders.value = [...orders.value.filter((item) => item !== order), { ...order, stage: to }]
  const count = orders.value.filter((item) => item.stage === to).length
  announcement.value = `${reference} moved from ${from} to ${to}. ${to} has ${count} ${
    count === 1 ? 'order' : 'orders'
  }.`
}

function openMenu(order: BoardOrder, event: Event) {
  menuOrder.value = order
  menu.value?.toggle(event)
}
// The trigger is re-created in its new column, so return focus to it there.
function onMenuHide() {
  menuVisible.value = false
  const reference = focusAfterMove
  focusAfterMove = null
  if (reference) nextTick(() => document.getElementById(`${id}-${reference}-move`)?.focus())
}

function onDragStart(event: DragEvent, order: BoardOrder) {
  dragging.value = order.reference
  event.dataTransfer?.setData('text/plain', order.reference)
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
}
function onDragLeave(event: DragEvent) {
  const column = event.currentTarget as HTMLElement
  if (!column.contains(event.relatedTarget as Node | null)) dropTarget.value = null
}
function onDrop(event: DragEvent, stage: Stage) {
  const reference = event.dataTransfer?.getData('text/plain') || dragging.value
  if (reference) move(reference, stage)
  dragging.value = null
  dropTarget.value = null
}
function onDragEnd() {
  dragging.value = null
  dropTarget.value = null
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-muted">
      Drag a card to another column, or use <span class="font-medium text-color">Move to</span> on
      the card.
    </p>
    <div class="board grid grid-flow-col gap-3 overflow-x-auto pb-2">
      <section
        v-for="column in columns"
        :key="column.stage"
        :aria-labelledby="`${id}-${column.stage}`"
        class="flex min-w-0 flex-col gap-3 rounded-border border p-2 transition-colors"
        :class="
          dropTarget === column.stage
            ? 'border-primary bg-highlight'
            : 'border-surface bg-surface-50 dark:bg-surface-950'
        "
        @dragover.prevent="dropTarget = column.stage"
        @dragleave="onDragLeave"
        @drop.prevent="onDrop($event, column.stage)"
      >
        <div class="flex items-center justify-between gap-2 px-1">
          <h3 :id="`${id}-${column.stage}`" class="font-medium">
            {{ column.stage }}<span class="sr-only">, {{ column.orders.length }} orders</span>
          </h3>
          <Badge :value="column.orders.length" severity="secondary" aria-hidden="true" />
        </div>
        <ul v-if="column.orders.length" class="flex flex-col gap-2">
          <li
            v-for="order in column.orders"
            :key="order.reference"
            draggable="true"
            class="flex cursor-grab flex-col gap-2 rounded-border border border-surface bg-surface-0 p-3 dark:bg-surface-900"
            :class="{ 'opacity-50': dragging === order.reference }"
            @dragstart="onDragStart($event, order)"
            @dragend="onDragEnd"
          >
            <div class="flex items-start justify-between gap-2">
              <span :id="`${id}-${order.reference}-ref`" class="font-medium">{{
                order.reference
              }}</span>
              <Tag v-if="order.urgent" severity="warn" value="Urgent" />
            </div>
            <span>{{ order.customer }}</span>
            <span class="text-xs text-muted"
              >{{ formatNumber(order.crates) }} crates · {{ order.slot }}</span
            >
            <Button
              :id="`${id}-${order.reference}-move`"
              type="button"
              size="small"
              severity="primary"
              text
              class="self-start"
              aria-haspopup="menu"
              :aria-controls="`${id}-menu`"
              :aria-expanded="menuVisible && menuOrder?.reference === order.reference"
              :aria-describedby="`${id}-${order.reference}-ref`"
              @click="openMenu(order, $event)"
              >Move to<ChevronDown aria-hidden="true"
            /></Button>
          </li>
        </ul>
        <p v-else class="px-1 text-xs text-muted">No orders</p>
      </section>
    </div>
    <p role="status" class="sr-only">{{ announcement }}</p>
    <Menu
      :id="`${id}-menu`"
      ref="menu"
      :model="menuItems"
      :aria-label="menuOrder ? `Move ${menuOrder.reference} to` : 'Move order to'"
      popup
      @show="menuVisible = true"
      @hide="onMenuHide"
    />
  </div>
</template>

<style scoped>
.board {
  grid-auto-columns: minmax(13rem, 1fr);
}
</style>
