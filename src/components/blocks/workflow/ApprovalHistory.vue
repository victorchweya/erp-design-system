<script setup lang="ts">
import { formatDateTime } from '@/utils/format'
import type { HistoryEntry } from './approval-flow'

defineProps<{ entries: HistoryEntry[]; headingId: string }>()
</script>

<template>
  <section :aria-labelledby="headingId" class="flex flex-col gap-3">
    <h4 :id="headingId" class="text-base font-medium">Status history</h4>
    <Timeline
      :value="entries"
      dataKey="id"
      :aria-labelledby="headingId"
      :pt="{ eventOpposite: { class: 'hidden' } }"
    >
      <template #content="{ item }: { item: HistoryEntry }">
        <div class="flex flex-col gap-1 pb-5">
          <div class="flex flex-wrap items-center gap-2">
            <Tag :severity="item.severity">{{ item.action }}</Tag>
            <time :datetime="item.at" class="text-muted">{{ formatDateTime(item.at) }}</time>
          </div>
          <p>
            <span class="font-medium">{{ item.actor.name }}</span>
            <span class="text-muted"> · {{ item.actor.title }}</span>
          </p>
          <p v-if="item.comment" class="leading-relaxed text-muted">“{{ item.comment }}”</p>
        </div>
      </template>
    </Timeline>
  </section>
</template>
