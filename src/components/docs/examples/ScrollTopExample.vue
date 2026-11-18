<script setup lang="ts">
const deliveries = Array.from({ length: 30 }, (_, i) => `Delivery ${i + 1}`)
</script>

<template>
  <div
    tabindex="0"
    role="region"
    aria-label="Delivery history"
    class="relative h-64 overflow-auto rounded-lg border border-surface p-4"
  >
    <div class="flex flex-col gap-4">
      <p v-for="delivery in deliveries" :key="delivery">{{ delivery }}</p>
    </div>
    <ScrollTop
      target="parent"
      :threshold="100"
      behavior="instant"
      :buttonProps="{ 'aria-label': 'Back to top of delivery history' }"
    />
  </div>
</template>
