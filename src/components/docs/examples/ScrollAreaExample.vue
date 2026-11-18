<script setup lang="ts">
const deliveries = Array.from({ length: 20 }, (_, i) => `Scheduled delivery ${i + 1}`)
</script>

<template>
  <ScrollArea class="h-64"
    ><ScrollAreaViewport tabindex="0" role="region" aria-label="Scheduled deliveries"
      ><ScrollAreaContent class="flex flex-col gap-3 p-4"
        ><p v-for="delivery in deliveries" :key="delivery">{{ delivery }}</p></ScrollAreaContent
      ></ScrollAreaViewport
    ><ScrollAreaScrollbar orientation="vertical"><ScrollAreaHandle /></ScrollAreaScrollbar
  ></ScrollArea>
</template>
