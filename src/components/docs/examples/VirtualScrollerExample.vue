<script setup lang="ts">
const items = Array.from({ length: 1000 }, (_, i) => `Delivery ${i + 1}`)
</script>

<template>
  <VirtualScroller
    :items="items"
    :itemSize="48"
    class="h-64 w-full rounded-lg border border-surface"
    tabindex="0"
    aria-label="Delivery list"
    ><template #item="{ item }"
      ><div class="flex h-12 items-center border-b border-surface px-4">{{ item }}</div></template
    ></VirtualScroller
  >
</template>
