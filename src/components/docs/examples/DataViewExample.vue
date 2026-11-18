<script setup lang="ts">
const products = [
  { id: '1', name: 'Carrots', category: 'Vegetables', quantity: 24 },
  { id: '2', name: 'Limes', category: 'Fruit', quantity: 18 },
  { id: '3', name: 'Kale', category: 'Leafy greens', quantity: 32 },
  { id: '4', name: 'Tomatoes', category: 'Vegetables', quantity: 16 },
]
</script>

<template>
  <DataView :value="products" paginator :rows="2">
    <template #list="{ items }"
      ><ul class="flex flex-col divide-y divide-surface">
        <li
          v-for="product in items"
          :key="product.id"
          class="flex flex-wrap items-center justify-between gap-3 py-4"
        >
          <div>
            <h3 class="text-lg font-medium">{{ product.name }}</h3>
            <p class="text-muted">{{ product.category }}</p>
          </div>
          <Tag severity="secondary">{{ product.quantity }} crates</Tag>
        </li>
      </ul></template
    >
  </DataView>
</template>
