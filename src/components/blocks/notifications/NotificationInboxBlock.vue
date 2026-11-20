<script setup lang="ts">
import { computed, nextTick, ref, shallowRef, useTemplateRef, watch } from 'vue'
import Inbox from '@primeicons/vue/inbox'
import InboxDetail from './InboxDetail.vue'
import InboxList from './InboxList.vue'
import InboxToolbar from './InboxToolbar.vue'
import {
  notificationTypes,
  sampleNotifications,
  type AppNotification,
  type NotificationType,
} from './notifications'

const notifications = ref<AppNotification[]>(sampleNotifications())
const filter = shallowRef<NotificationType | 'all'>('all')
const selected = ref<string[]>([])
const activeId = shallowRef<string | null>(null)
const status = shallowRef('')
const listColumn = useTemplateRef<HTMLElement>('listColumn')
const detailColumn = useTemplateRef<HTMLElement>('detailColumn')
const detail = useTemplateRef<InstanceType<typeof InboxDetail>>('detail')

const shown = computed(() =>
  filter.value === 'all'
    ? notifications.value
    : notifications.value.filter((item) => item.type === filter.value),
)
const active = computed(() => shown.value.find((item) => item.id === activeId.value) ?? null)
const unreadCount = computed(() => notifications.value.filter((item) => !item.read).length)
const emptyTitle = computed(() =>
  filter.value === 'all'
    ? 'Inbox is empty'
    : `No ${notificationTypes[filter.value].label.toLowerCase()} notifications`,
)

// Selection applies only to what is shown, so clear it when the filter changes.
watch(filter, () => (selected.value = []))

function plural(count: number) {
  return `${count} ${count === 1 ? 'notification' : 'notifications'}`
}
function setRead(ids: string[], read: boolean) {
  notifications.value.forEach((item) => {
    if (ids.includes(item.id)) item.read = read
  })
}
function toggle(itemId: string, checked: boolean) {
  selected.value = checked
    ? [...selected.value, itemId]
    : selected.value.filter((selectedId) => selectedId !== itemId)
}
function selectAll(checked: boolean) {
  selected.value = checked ? shown.value.map((item) => item.id) : []
}
async function open(itemId: string) {
  activeId.value = itemId
  setRead([itemId], true)
  await nextTick()
  // When the detail pane is stacked below the list on narrow layouts, take the reader to it.
  const list = listColumn.value?.getBoundingClientRect()
  const pane = detailColumn.value?.getBoundingClientRect()
  if (list && pane && pane.top >= list.bottom) detail.value?.focus()
}
function markSelectedRead() {
  setRead(selected.value, true)
  status.value = `${plural(selected.value.length)} marked as read.`
  selected.value = []
}
function archive(ids: string[]) {
  notifications.value = notifications.value.filter((item) => !ids.includes(item.id))
  if (activeId.value && ids.includes(activeId.value)) activeId.value = null
  status.value = `${plural(ids.length)} archived.`
  selected.value = []
}
function follow(item: AppNotification, event: MouseEvent) {
  // Preview only: in your app, let the link navigate (or use RouterLink) instead.
  event.preventDefault()
  status.value = `In your app this opens ${item.href}.`
}
// Detail actions remove the open item, so return focus to the list.
async function focusList(rowId?: string) {
  await nextTick()
  const row = rowId ? `[data-row="${rowId}"]` : '[data-row][tabindex="0"]'
  listColumn.value?.querySelector<HTMLElement>(row)?.focus()
}
function markActiveUnread() {
  const item = active.value
  if (!item) return
  setRead([item.id], false)
  status.value = 'Marked as unread.'
  activeId.value = null
  focusList(item.id)
}
function archiveActive() {
  if (!active.value) return
  archive([active.value.id])
  focusList()
}
function reset() {
  notifications.value = sampleNotifications()
  activeId.value = null
  status.value = 'Sample notifications restored.'
}
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-wrap items-center gap-2">
        <h3 class="text-xl font-medium">Notifications</h3>
        <Tag severity="secondary">{{ unreadCount }} unread</Tag>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-4 text-sm">
        <InboxToolbar
          v-model:filter="filter"
          :selectedCount="selected.length"
          :shownCount="shown.length"
          @select-all="selectAll"
          @mark-read="markSelectedRead"
          @archive="archive(selected)"
        />
        <p role="status" class="text-muted" :class="{ 'sr-only': !status }">{{ status }}</p>
        <div class="flex flex-wrap items-start gap-6">
          <div ref="listColumn" class="min-w-0 flex-[1_1_18rem]">
            <InboxList
              v-if="shown.length"
              :items="shown"
              :selected="selected"
              :activeId="activeId"
              @toggle="toggle"
              @open="open"
            />
            <div v-else class="flex flex-col items-center gap-2 py-8 text-center">
              <Inbox :size="28" aria-hidden="true" class="text-muted" />
              <p class="font-medium">{{ emptyTitle }}</p>
              <p class="text-muted">New updates will appear here.</p>
              <Button
                v-if="!notifications.length"
                type="button"
                size="small"
                severity="secondary"
                outlined
                @click="reset"
                >Restore sample notifications</Button
              >
            </div>
          </div>
          <div ref="detailColumn" class="min-w-0 flex-[2_1_20rem]">
            <InboxDetail
              ref="detail"
              :item="active"
              @mark-unread="markActiveUnread"
              @archive="archiveActive"
              @follow="active && follow(active, $event)"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
