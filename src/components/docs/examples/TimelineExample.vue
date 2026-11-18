<script setup lang="ts">
const events = [
  { status: 'Order placed', time: '08:15' },
  { status: 'Packed', time: '09:00' },
  { status: 'Out for delivery', time: '10:30' },
]
</script>

<template>
  <Timeline :value="events"
    ><template #content="{ item }"
      ><div class="pb-6">
        <p class="font-medium">{{ item.status }}</p>
        <p class="text-muted">{{ item.time }}</p>
      </div></template
    ></Timeline
  >
</template>
