<script setup lang="ts">
import { useId, useTemplateRef } from 'vue'
import Envelope from '@primeicons/vue/envelope'
import Inbox from '@primeicons/vue/inbox'
import { formatDateTime } from '@/utils/format'
import { notificationTypes, type AppNotification } from './notifications'

defineProps<{ item: AppNotification | null }>()
const emit = defineEmits<{ markUnread: []; archive: []; follow: [event: MouseEvent] }>()
const id = useId()
const heading = useTemplateRef<HTMLElement>('heading')
defineExpose({ focus: () => heading.value?.focus() })
</script>

<template>
  <section
    class="flex min-h-48 flex-col gap-4 rounded-border border border-surface p-4"
    :aria-labelledby="`${id}-title`"
  >
    <template v-if="item">
      <div class="flex flex-col gap-2">
        <Tag
          :severity="item.type === 'approvals' ? undefined : 'secondary'"
          class="self-start"
          :class="{ 'bg-note text-note': item.type === 'approvals' }"
          >{{ notificationTypes[item.type].label }}</Tag
        >
        <h3 :id="`${id}-title`" ref="heading" tabindex="-1" class="text-lg font-medium">
          {{ item.title }}
        </h3>
        <p class="text-xs text-muted">
          <time :datetime="item.createdAt">{{ formatDateTime(item.createdAt) }}</time>
        </p>
      </div>
      <p class="leading-relaxed">{{ item.body }}</p>
      <a
        :href="item.href"
        class="self-start rounded-xs font-medium text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        @click="emit('follow', $event)"
        >{{ item.linkLabel }}</a
      >
      <div class="mt-auto flex flex-wrap gap-2">
        <Button type="button" size="small" severity="primary" outlined @click="emit('markUnread')"
          ><Envelope aria-hidden="true" />Mark as unread</Button
        >
        <Button type="button" size="small" severity="primary" outlined @click="emit('archive')"
          ><Inbox aria-hidden="true" />Archive</Button
        >
      </div>
    </template>
    <div v-else class="flex flex-1 flex-col items-center justify-center gap-2 text-center">
      <Inbox :size="28" aria-hidden="true" class="text-muted" />
      <h3 :id="`${id}-title`" class="font-medium">No notification open</h3>
      <p class="text-muted">Choose a notification to read the details.</p>
    </div>
  </section>
</template>
