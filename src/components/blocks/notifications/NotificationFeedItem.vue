<script setup lang="ts">
import { computed } from 'vue'
import Check from '@primeicons/vue/check'
import { formatDateTime } from '@/utils/format'
import { notificationTypes, type AppNotification } from './notifications'

const props = defineProps<{ item: AppNotification }>()
const emit = defineEmits<{ open: [event: MouseEvent]; markRead: [] }>()
const type = computed(() => notificationTypes[props.item.type])
</script>

<template>
  <div class="flex gap-3 py-3">
    <component :is="type.icon" aria-hidden="true" class="mt-0.5 shrink-0 text-muted" />
    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <a
        :href="item.href"
        class="rounded-sm underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :class="item.read ? 'text-color' : 'font-semibold text-color'"
        @click="emit('open', $event)"
        >{{ item.title }}<span v-if="!item.read" class="sr-only"> (unread)</span></a
      >
      <p class="text-xs text-muted">
        {{ type.label }} ·
        <time :datetime="item.createdAt">{{ formatDateTime(item.createdAt) }}</time>
      </p>
    </div>
    <div v-if="!item.read" class="flex shrink-0 flex-col items-end gap-1">
      <Tag severity="info" aria-hidden="true">New</Tag>
      <Button
        type="button"
        iconOnly
        size="small"
        variant="text"
        severity="primary"
        :aria-label="`Mark as read: ${item.title}`"
        @click="emit('markRead')"
        ><Check aria-hidden="true"
      /></Button>
    </div>
  </div>
</template>
