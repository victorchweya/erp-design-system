<script setup lang="ts">
import { computed, shallowRef } from 'vue'
const first = shallowRef(0)
const rows = shallowRef(5)
const records = Array.from({ length: 24 }, (_, i) => `Delivery ${i + 1}`)
const page = computed(() => records.slice(first.value, first.value + rows.value))
</script>

<template>
  <div class="flex flex-col gap-4">
    <ul class="flex flex-col gap-2">
      <li v-for="record in page" :key="record">{{ record }}</li>
    </ul>
    <Paginator v-model:first="first" :rows="rows" :totalRecords="records.length" />
  </div>
</template>
