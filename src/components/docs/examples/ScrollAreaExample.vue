<script setup lang="ts">
const deliveries = Array.from({ length: 20 }, (_, i) => ({
  id: `DLV-${5120 - i}`,
  time: `${String(6 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`,
}))
</script>

<template>
  <ScrollArea class="h-64 max-w-sm">
    <!-- ScrollArea makes the viewport focusable when it overflows; name it with aria-label. -->
    <ScrollAreaViewport role="region" aria-label="Scheduled deliveries">
      <ScrollAreaContent class="flex flex-col gap-3 p-4">
        <p v-for="delivery in deliveries" :key="delivery.id" class="flex justify-between gap-4">
          <span>{{ delivery.id }}</span>
          <span class="text-muted-color">{{ delivery.time }}</span>
        </p>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="vertical"><ScrollAreaHandle /></ScrollAreaScrollbar>
  </ScrollArea>
</template>
