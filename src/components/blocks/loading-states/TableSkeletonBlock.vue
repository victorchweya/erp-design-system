<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import { formatCurrency, formatDate, formatNumber } from '@/utils/format'

const id = useId()
const loaded = shallowRef(false)
const motion = usePreferredReducedMotion()
const animation = computed(() => (motion.value === 'reduce' ? 'none' : 'wave'))

const orders = [
  {
    reference: 'FTF-1042',
    customer: 'Green Basket',
    delivery: '2026-11-23',
    crates: 12,
    total: 18450,
    status: 'Confirmed',
  },
  {
    reference: 'FTF-1043',
    customer: 'Harvest Kitchen',
    delivery: '2026-11-23',
    crates: 8,
    total: 9200,
    status: 'Pending',
  },
  {
    reference: 'FTF-1044',
    customer: 'Market Table',
    delivery: '2026-11-24',
    crates: 15,
    total: 24600,
    status: 'Pending',
  },
  {
    reference: 'FTF-1045',
    customer: 'Fresh Corner',
    delivery: '2026-11-24',
    crates: 6,
    total: 7350,
    status: 'Confirmed',
  },
  {
    reference: 'FTF-1046',
    customer: 'Savannah Grill',
    delivery: '2026-11-25',
    crates: 20,
    total: 31800,
    status: 'Confirmed',
  },
]
// Placeholder rows match the page size so the table does not jump when data arrives.
const placeholders = orders.map((_, index) => ({ reference: `loading-${index}` }))
const rows = computed(() => (loaded.value ? orders : placeholders))
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <ToggleSwitch v-model="loaded" :inputId="`${id}-loaded`" />
      <label :for="`${id}-loaded`">Show loaded data</label>
    </div>
    <p role="status" class="sr-only">
      {{ loaded ? `${orders.length} orders loaded` : 'Loading orders' }}
    </p>
    <div :aria-busy="!loaded">
      <DataTable
        :value="rows"
        dataKey="reference"
        size="small"
        showGridlines
        :tableProps="{ 'aria-label': 'Customer orders' }"
      >
        <Column field="reference" header="Reference" style="min-width: 7rem">
          <template #body="{ data }">
            <Skeleton v-if="!loaded" width="5rem" :animation="animation" />
            <span v-else class="font-medium">{{ data.reference }}</span>
          </template>
        </Column>
        <Column field="customer" header="Customer" style="min-width: 10rem">
          <template #body="{ data }">
            <Skeleton v-if="!loaded" width="8rem" :animation="animation" />
            <template v-else>{{ data.customer }}</template>
          </template>
        </Column>
        <Column field="delivery" header="Delivery" style="min-width: 8rem">
          <template #body="{ data }">
            <Skeleton v-if="!loaded" width="6rem" :animation="animation" />
            <template v-else>{{ formatDate(data.delivery) }}</template>
          </template>
        </Column>
        <Column field="crates" header="Crates" style="min-width: 5rem">
          <template #body="{ data }">
            <Skeleton v-if="!loaded" width="2.5rem" :animation="animation" />
            <template v-else>{{ formatNumber(data.crates) }}</template>
          </template>
        </Column>
        <Column field="total" header="Total" style="min-width: 8rem">
          <template #body="{ data }">
            <Skeleton v-if="!loaded" width="6rem" :animation="animation" />
            <template v-else>{{ formatCurrency(data.total) }}</template>
          </template>
        </Column>
        <Column field="status" header="Status" style="min-width: 7rem">
          <template #body="{ data }">
            <Skeleton
              v-if="!loaded"
              width="5rem"
              height="1.5rem"
              borderRadius="1rem"
              :animation="animation"
            />
            <Tag
              v-else
              :severity="data.status === 'Confirmed' ? 'success' : 'warn'"
              :value="data.status"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
