<script setup lang="ts">
import type { Component } from 'vue'
import Check from '@primeicons/vue/check'
import Clock from '@primeicons/vue/clock'
import Inbox from '@primeicons/vue/inbox'
import Send from '@primeicons/vue/send'
import Truck from '@primeicons/vue/truck'
import { formatDateTime } from '@/utils/format'

interface StatusEvent {
  status: string
  detail: string
  by?: string
  at?: string
  icon: Component
  done: boolean
}

// Newest first, so the current status is at the top.
const history: StatusEvent[] = [
  {
    status: 'Fully received',
    detail: 'Waiting for the remaining 20 crates of tomatoes.',
    icon: Clock,
    done: false,
  },
  {
    status: 'Partly received',
    detail: '60 of 80 crates received at Nairobi warehouse.',
    by: 'Mercy Achieng',
    at: '2026-11-19T07:40:00Z',
    icon: Inbox,
    done: true,
  },
  {
    status: 'Dispatched by supplier',
    detail: 'Valley Growers, vehicle KDA 123B.',
    by: 'Valley Growers',
    at: '2026-11-19T03:10:00Z',
    icon: Truck,
    done: true,
  },
  {
    status: 'Sent to supplier',
    detail: 'Emailed to orders@valleygrowers.example.',
    by: 'Peter Otieno',
    at: '2026-11-18T12:05:00Z',
    icon: Send,
    done: true,
  },
  {
    status: 'Approved',
    detail: 'KES 184,000 approved against the November produce budget.',
    by: 'Grace Wanjiru',
    at: '2026-11-18T09:30:00Z',
    icon: Check,
    done: true,
  },
]
</script>

<template>
  <Timeline :value="history" dataKey="status" aria-label="Purchase order PO-2318 status history">
    <template #marker="{ item }">
      <span
        class="flex size-8 shrink-0 items-center justify-center rounded-full border"
        :class="
          item.done
            ? 'border-primary bg-primary text-primary-contrast'
            : 'border-dashed border-surface bg-emphasis text-muted-color'
        "
      >
        <component :is="item.icon" aria-hidden="true" />
      </span>
    </template>
    <template #content="{ item }">
      <div class="flex flex-col gap-1 pb-6">
        <p class="font-medium">
          {{ item.status }}
          <Tag v-if="!item.done" value="Pending" severity="secondary" class="ml-2" />
        </p>
        <p>{{ item.detail }}</p>
        <p v-if="item.at" class="text-muted-color">
          <time :datetime="item.at">{{ formatDateTime(item.at) }}</time> · {{ item.by }}
        </p>
      </div>
    </template>
  </Timeline>
</template>
