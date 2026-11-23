<script setup lang="ts">
import { computed, onMounted, shallowRef, useTemplateRef } from 'vue'
import ArrowLeft from '@primeicons/vue/arrow-left'
import Pencil from '@primeicons/vue/pencil'
import Plus from '@primeicons/vue/plus'
import { formatCurrency, formatDate, formatDateTime } from '@/utils/format'
import { statusSeverity, type Supplier } from './suppliers'

const props = defineProps<{ supplier: Supplier; feedback?: string }>()
const emit = defineEmits<{ back: []; edit: [event: Event] }>()
const heading = useTemplateRef<HTMLElement>('heading')
const tab = shallowRef('overview')
const actionFeedback = shallowRef('')

const orderTotal = computed(() =>
  props.supplier.orders.reduce((total, order) => total + order.amount, 0),
)
const details = computed(() => [
  { label: 'Contact', value: props.supplier.contact },
  { label: 'Phone', value: props.supplier.phone },
  { label: 'County', value: props.supplier.county },
  { label: 'Produce', value: props.supplier.produce },
  { label: 'Payment terms', value: props.supplier.paymentTerms },
  { label: 'Orders value', value: formatCurrency(orderTotal.value) },
])
const orderSeverity = { Received: 'success', 'In transit': 'info', Scheduled: 'secondary' } as const

// Move focus to the new view so keyboard and screen reader users know it changed.
onMounted(() => heading.value?.focus())
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <Button type="button" variant="text" severity="secondary" size="small" @click="emit('back')">
        <ArrowLeft aria-hidden="true" />
        Back to suppliers
      </Button>
    </div>
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div class="min-w-0 flex-1 basis-64 space-y-2">
        <div class="flex flex-wrap items-center gap-3">
          <h3
            ref="heading"
            tabindex="-1"
            class="text-xl font-medium tracking-tight outline-none sm:text-2xl"
          >
            {{ supplier.name }}
          </h3>
          <Tag :severity="statusSeverity[supplier.status]">{{ supplier.status }}</Tag>
        </div>
        <p class="text-sm text-muted">{{ supplier.id }} · {{ supplier.county }} County</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <Button
          type="button"
          severity="primary"
          outlined
          @click="actionFeedback = 'Create purchase order selected in this preview.'"
        >
          <Plus aria-hidden="true" />
          Purchase order
        </Button>
        <Button type="button" aria-haspopup="dialog" @click="emit('edit', $event)">
          <Pencil aria-hidden="true" />
          Edit supplier
        </Button>
      </div>
    </header>
    <p
      role="status"
      class="text-sm text-primary"
      :class="{ 'sr-only': !(feedback || actionFeedback) }"
    >
      {{ actionFeedback || feedback }}
    </p>
    <Tabs v-model:value="tab">
      <TabList :aria-label="`${supplier.name} details`">
        <Tab value="overview">Overview</Tab>
        <Tab value="orders">Orders ({{ supplier.orders.length }})</Tab>
        <Tab value="activity">Activity</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="overview">
          <dl class="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in details" :key="item.label" class="space-y-1">
              <dt class="text-muted">{{ item.label }}</dt>
              <dd class="font-medium">{{ item.value }}</dd>
            </div>
            <div class="space-y-1 sm:col-span-2 lg:col-span-3">
              <dt class="text-muted">Notes</dt>
              <dd>{{ supplier.notes || 'No notes' }}</dd>
            </div>
          </dl>
        </TabPanel>
        <TabPanel value="orders">
          <DataTable
            :value="supplier.orders"
            dataKey="reference"
            size="small"
            showGridlines
            scrollable
            :tableProps="{ 'aria-label': `Purchase orders for ${supplier.name}` }"
          >
            <Column field="reference" header="Order" />
            <Column field="date" header="Date">
              <template #body="{ data }">{{ formatDate(data.date) }}</template>
            </Column>
            <Column field="produce" header="Produce" />
            <Column field="amount" header="Amount">
              <template #body="{ data }">
                <span class="tabular-nums">{{ formatCurrency(data.amount) }}</span>
              </template>
            </Column>
            <Column field="status" header="Status">
              <template #body="{ data }">
                <Tag :severity="orderSeverity[data.status as keyof typeof orderSeverity]">{{
                  data.status
                }}</Tag>
              </template>
            </Column>
            <template #empty>
              <p class="py-2 text-muted">No purchase orders for this supplier yet.</p>
            </template>
          </DataTable>
        </TabPanel>
        <TabPanel value="activity">
          <ol class="flex flex-col gap-4 text-sm">
            <li
              v-for="entry in supplier.activity"
              :key="entry.id"
              class="flex flex-col gap-1 border-l-2 border-surface pl-4"
            >
              <time :datetime="entry.date" class="text-xs text-muted">{{
                formatDateTime(entry.date)
              }}</time>
              <span>{{ entry.text }}</span>
            </li>
          </ol>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
