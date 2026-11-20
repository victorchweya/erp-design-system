<script setup lang="ts">
import { computed, shallowRef, useId, useTemplateRef } from 'vue'
import { formatDateTime } from '@/utils/format'
import { notificationTypes, type AppNotification } from './notifications'

const props = defineProps<{
  items: AppNotification[]
  selected: string[]
  activeId: string | null
}>()
const emit = defineEmits<{ toggle: [id: string, checked: boolean]; open: [id: string] }>()
const id = useId()
const list = useTemplateRef<HTMLElement>('list')
const focusedId = shallowRef<string | null>(null)

// One row button is in the tab order; arrow keys move between rows (roving tabindex).
const tabStop = computed(() => {
  const ids = props.items.map((item) => item.id)
  if (focusedId.value && ids.includes(focusedId.value)) return focusedId.value
  if (props.activeId && ids.includes(props.activeId)) return props.activeId
  return ids[0] ?? null
})

function focusRow(index: number) {
  const item = props.items[index]
  if (!item) return
  focusedId.value = item.id
  list.value?.querySelector<HTMLElement>(`[data-row="${item.id}"]`)?.focus()
}
function onKeydown(event: KeyboardEvent, index: number) {
  const last = props.items.length - 1
  const targets: Record<string, number> = {
    ArrowDown: Math.min(index + 1, last),
    ArrowUp: Math.max(index - 1, 0),
    Home: 0,
    End: last,
  }
  const target = targets[event.key]
  if (target === undefined) return
  event.preventDefault()
  focusRow(target)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <p :id="`${id}-hint`" class="sr-only">
      Use the up and down arrow keys to move between notifications. Press Enter to open one.
    </p>
    <ul ref="list" aria-label="Notifications" class="flex flex-col">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="flex items-start gap-3 border-b border-surface py-3 last:border-b-0"
      >
        <Checkbox
          :modelValue="selected.includes(item.id)"
          binary
          :ariaLabel="`Select: ${item.title}`"
          class="mt-0.5"
          @update:model-value="emit('toggle', item.id, !!$event)"
        />
        <button
          type="button"
          :data-row="item.id"
          :tabindex="item.id === tabStop ? 0 : -1"
          :aria-current="item.id === activeId ? 'true' : undefined"
          :aria-describedby="`${id}-hint`"
          class="flex min-w-0 flex-1 flex-col gap-1 rounded-border px-2 py-1 text-left hover:bg-emphasis focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          :class="{ 'bg-highlight': item.id === activeId }"
          @click="emit('open', item.id)"
          @focus="focusedId = item.id"
          @keydown="onKeydown($event, index)"
        >
          <span class="flex items-start gap-2">
            <span
              v-if="!item.read"
              aria-hidden="true"
              class="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
            />
            <span :class="item.read ? 'font-normal' : 'font-semibold'">{{ item.title }}</span>
          </span>
          <span class="text-xs text-muted">
            <template v-if="!item.read"><strong class="font-medium">Unread</strong> · </template>
            {{ notificationTypes[item.type].label }} ·
            <time :datetime="item.createdAt">{{ formatDateTime(item.createdAt) }}</time>
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>
