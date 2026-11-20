<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import Bars from '@primeicons/vue/bars'
import Search from '@primeicons/vue/search'
import ThLarge from '@primeicons/vue/th-large'
import { formatCurrency } from '@/utils/format'

type StockStatus = 'In stock' | 'Low stock' | 'Out of stock'

interface Product {
  sku: string
  name: string
  unit: string
  price: number
  status: StockStatus
}

const products: Product[] = [
  { sku: 'VEG-0101', name: 'Carrots', unit: '10 kg crate', price: 950, status: 'In stock' },
  { sku: 'FRT-0204', name: 'Limes', unit: '5 kg bag', price: 1200, status: 'Low stock' },
  { sku: 'LGR-0310', name: 'Kale', unit: '20 bunches', price: 600, status: 'In stock' },
  { sku: 'VEG-0122', name: 'Tomatoes', unit: '12 kg crate', price: 1450, status: 'Out of stock' },
  { sku: 'FRT-0219', name: 'Avocados', unit: '4 kg box', price: 880, status: 'In stock' },
  { sku: 'VEG-0137', name: 'Red onions', unit: '10 kg bag', price: 1100, status: 'Low stock' },
]

const severities: Record<StockStatus, 'success' | 'warn' | 'danger'> = {
  'In stock': 'success',
  'Low stock': 'warn',
  'Out of stock': 'danger',
}

const layout = shallowRef<'list' | 'grid'>('grid')
const layouts = [
  { label: 'List', value: 'list', icon: Bars },
  { label: 'Grid', value: 'grid', icon: ThLarge },
]
const query = shallowRef('')
const first = shallowRef(0)
const visible = computed(() => {
  const search = query.value.trim().toLowerCase()
  return products.filter((product) =>
    `${product.name} ${product.sku}`.toLowerCase().includes(search),
  )
})

// DataView keeps its page when value changes, so return to the first page on a new search.
watch(query, () => (first.value = 0))
</script>

<template>
  <DataView
    v-model:first="first"
    :value="visible"
    :layout="layout"
    dataKey="sku"
    paginator
    :rows="4"
  >
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <IconField>
          <InputIcon><Search aria-hidden="true" /></InputIcon>
          <InputText
            v-model="query"
            aria-label="Search products"
            placeholder="Name or SKU"
            size="small"
          />
        </IconField>
        <SelectButton
          v-model="layout"
          :options="layouts"
          optionLabel="label"
          optionValue="value"
          :allowEmpty="false"
          aria-label="Layout"
          size="small"
        >
          <template #option="{ option }">
            <component :is="option.icon" aria-hidden="true" />
            <span>{{ option.label }}</span>
          </template>
        </SelectButton>
      </div>
    </template>

    <template #list="{ items }">
      <ul class="flex flex-col divide-y divide-surface">
        <li
          v-for="product in items"
          :key="product.sku"
          class="flex flex-wrap items-center justify-between gap-3 py-4"
        >
          <div>
            <h3 class="font-medium">{{ product.name }}</h3>
            <p class="text-muted-color">{{ product.sku }} · {{ product.unit }}</p>
          </div>
          <div class="flex items-center gap-4">
            <span class="font-medium">{{ formatCurrency(product.price) }}</span>
            <Tag :value="product.status" :severity="severities[product.status as StockStatus]" />
          </div>
        </li>
      </ul>
    </template>

    <template #grid="{ items }">
      <ul class="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
        <li
          v-for="product in items"
          :key="product.sku"
          class="flex flex-col gap-3 rounded-lg border border-surface p-4"
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="font-medium">{{ product.name }}</h3>
              <p class="text-muted-color">{{ product.sku }}</p>
            </div>
            <Tag :value="product.status" :severity="severities[product.status as StockStatus]" />
          </div>
          <p class="text-muted-color">{{ product.unit }}</p>
          <p class="text-lg font-medium">{{ formatCurrency(product.price) }}</p>
        </li>
      </ul>
    </template>

    <template #empty>
      <p class="py-6 text-center text-muted-color">No products match this search.</p>
    </template>
  </DataView>
</template>
