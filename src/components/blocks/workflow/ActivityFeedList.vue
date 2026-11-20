<script setup lang="ts">
import Sync from '@primeicons/vue/sync'
import Pencil from '@primeicons/vue/pencil'
import Comment from '@primeicons/vue/comment'
import Cog from '@primeicons/vue/cog'
import { formatDateTime } from '@/utils/format'
import { formatRelative, typeLabel, type ActivityEntry } from './activity-feed'

defineProps<{
  groups: { key: string; label: string; entries: ActivityEntry[] }[]
  now: Date
  idPrefix: string
}>()
const typeIcon = { status: Sync, edit: Pencil, comment: Comment, system: Cog }
</script>

<template>
  <div class="flex flex-col gap-6">
    <section
      v-for="group in groups"
      :key="group.key"
      :aria-labelledby="`${idPrefix}-${group.key}`"
      class="flex flex-col gap-3"
    >
      <h4 :id="`${idPrefix}-${group.key}`" class="text-sm font-medium uppercase text-muted">
        {{ group.label }}
      </h4>
      <Timeline
        :value="group.entries"
        dataKey="id"
        :aria-labelledby="`${idPrefix}-${group.key}`"
        :pt="{ eventOpposite: { class: 'hidden' } }"
      >
        <template #marker="{ item }">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-full border border-surface text-muted"
            aria-hidden="true"
          >
            <component :is="typeIcon[(item as ActivityEntry).type]" />
          </span>
        </template>
        <template #content="{ item }">
          <article
            :id="`${idPrefix}-${item.id}`"
            tabindex="-1"
            class="flex flex-col gap-2 pb-5 text-sm focus:outline-none"
          >
            <p>
              <span class="sr-only">{{ typeLabel[(item as ActivityEntry).type] }}: </span>
              <span class="font-medium">{{ item.actor }}</span>
              {{ item.action }}
              <span class="font-medium">{{ item.record }}</span>
            </p>
            <p class="text-muted">
              <time :datetime="item.at">{{ formatRelative(item.at, now) }}</time>
              <span aria-hidden="true"> · </span><span class="sr-only">, </span
              >{{ formatDateTime(item.at) }}
            </p>
            <ul
              v-if="item.changes?.length"
              class="flex flex-col gap-1 rounded-lg border border-surface p-3"
              aria-label="Changes"
            >
              <li v-for="change in item.changes" :key="change.field" class="flex flex-wrap gap-x-2">
                <span class="font-medium">{{ change.field }}:</span>
                <span class="sr-only">changed from</span>
                <del class="text-muted">{{ change.before }}</del>
                <span aria-hidden="true">→</span>
                <span class="sr-only">to</span>
                <ins class="no-underline">{{ change.after }}</ins>
              </li>
            </ul>
            <p
              v-if="item.comment"
              class="rounded-lg border border-surface p-3 leading-relaxed text-muted"
            >
              “{{ item.comment }}”
            </p>
          </article>
        </template>
      </Timeline>
    </section>
  </div>
</template>
