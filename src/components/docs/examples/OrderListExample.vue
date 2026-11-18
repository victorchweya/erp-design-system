<script setup lang="ts">
import { ref } from 'vue'
const items = ref([
  { id: '1', name: 'Green Basket' },
  { id: '2', name: 'Valley Kitchen' },
  { id: '3', name: 'Market Square' },
])
</script>

<template>
  <OrderList v-model="items" dataKey="id" aria-label="Delivery priorities" breakpoint="700px"
    ><template #option="{ option, index }"
      ><span>{{ index + 1 }}. {{ option.name }}</span></template
    ></OrderList
  >
</template>
