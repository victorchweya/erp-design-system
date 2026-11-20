<script setup lang="ts">
const customers = ['Green Basket', 'Harvest Kitchen', 'Market Table', 'Fresh Corner']
const deliveries = Array.from({ length: 1000 }, (_, i) => ({
  reference: `FTF-${10001 + i}`,
  customer: customers[i % customers.length],
  crates: 8 + ((i * 7) % 30),
}))
</script>

<template>
  <VirtualScroller
    :items="deliveries"
    :itemSize="48"
    class="h-64 w-full rounded-lg border border-surface"
    role="region"
    aria-label="Deliveries, 1,000 records"
    ><template #item="{ item }"
      ><div class="flex h-12 items-center justify-between gap-4 border-b border-surface px-4">
        <span class="font-medium">{{ item.reference }}</span>
        <span class="flex-1 truncate">{{ item.customer }}</span>
        <span class="text-muted-color">{{ item.crates }} crates</span>
      </div></template
    ></VirtualScroller
  >
</template>
