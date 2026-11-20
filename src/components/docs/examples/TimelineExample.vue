<script setup lang="ts">
import { formatTime } from '@/utils/format'

const events = [
  { status: 'Order placed', at: '2026-11-20T05:15:00Z' },
  { status: 'Packed', at: '2026-11-20T06:00:00Z' },
  { status: 'Out for delivery', at: '2026-11-20T07:30:00Z' },
]
</script>

<template>
  <Timeline :value="events" dataKey="status" aria-label="Delivery FTF-1042 progress">
    <template #opposite="{ item }">
      <time :datetime="item.at" class="text-muted-color">{{ formatTime(item.at) }}</time>
    </template>
    <template #content="{ item }">
      <p class="pb-6 font-medium">{{ item.status }}</p>
    </template>
  </Timeline>
</template>
