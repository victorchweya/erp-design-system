<script setup lang="ts">
import { computed, ref, shallowRef, useId, useTemplateRef } from 'vue'
import type Popover from 'primevue/popover'
import Bell from '@primeicons/vue/bell'
import CheckCircle from '@primeicons/vue/check-circle'
import Inbox from '@primeicons/vue/inbox'
import NotificationFeedItem from './NotificationFeedItem.vue'
import { sampleNotifications, type AppNotification } from './notifications'

const id = useId()
const popover = useTemplateRef<InstanceType<typeof Popover>>('popover')
const visible = shallowRef(false)
const tab = shallowRef('all')
const notifications = ref<AppNotification[]>(sampleNotifications())
const status = shallowRef('')

const unread = computed(() => notifications.value.filter((item) => !item.read))
const tabs = computed(() => [
  { value: 'all', label: 'All', items: notifications.value, empty: 'No notifications yet' },
  {
    value: 'unread',
    label: `Unread (${unread.value.length})`,
    items: unread.value,
    empty: 'You’re all caught up',
  },
])
const triggerLabel = computed(() =>
  unread.value.length
    ? `Notifications, ${unread.value.length} unread`
    : 'Notifications, none unread',
)
// The button name includes the count, so the badge is hidden from assistive technology,
// and from view when there is nothing unread.
const badgePt = computed(() => ({
  pcBadge: {
    root: { 'aria-hidden': 'true', style: unread.value.length ? undefined : { display: 'none' } },
  },
}))

let trigger: HTMLElement | null = null

function toggle(event: Event) {
  trigger = event.currentTarget as HTMLElement
  popover.value?.toggle(event)
}
function markRead(itemId: string) {
  const item = notifications.value.find((notification) => notification.id === itemId)
  if (item) item.read = true
}
function markAllRead() {
  notifications.value.forEach((item) => (item.read = true))
  status.value = 'All notifications marked as read.'
}
function open(item: AppNotification, event: MouseEvent) {
  // Preview only: in your app, let the link navigate (or use RouterLink) instead.
  event.preventDefault()
  markRead(item.id)
  popover.value?.hide()
  trigger?.focus()
  status.value = `${item.title}. In your app this opens ${item.href}.`
}
function reset() {
  notifications.value = sampleNotifications()
  status.value = ''
}
</script>

<template>
  <div class="flex flex-col items-start gap-3 text-sm">
    <OverlayBadge :value="unread.length" severity="danger" :pt="badgePt">
      <Button
        type="button"
        iconOnly
        severity="secondary"
        outlined
        :aria-label="triggerLabel"
        aria-haspopup="dialog"
        :aria-controls="`${id}-popover`"
        :aria-expanded="visible"
        @click="toggle"
      >
        <Bell aria-hidden="true" focusable="false" />
      </Button>
    </OverlayBadge>
    <p role="status" class="text-muted" :class="{ 'sr-only': !status }">{{ status }}</p>
    <Button
      v-if="!unread.length"
      type="button"
      size="small"
      severity="secondary"
      outlined
      @click="reset"
      >Reset preview</Button
    >
    <Popover
      :id="`${id}-popover`"
      ref="popover"
      :aria-labelledby="`${id}-title`"
      class="max-w-[calc(100vw-2rem)]"
      @show="visible = true"
      @hide="visible = false"
    >
      <div class="flex w-[22rem] max-w-full flex-col gap-2 text-sm">
        <div class="flex items-center justify-between gap-3">
          <h3 :id="`${id}-title`" class="text-lg font-medium">Notifications</h3>
          <Button
            type="button"
            size="small"
            variant="text"
            :disabled="!unread.length"
            @click="markAllRead"
            >Mark all as read</Button
          >
        </div>
        <Tabs v-model:value="tab">
          <TabList aria-label="Show notifications">
            <Tab v-for="item in tabs" :key="item.value" :value="item.value">{{ item.label }}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel v-for="panel in tabs" :key="panel.value" :value="panel.value">
              <ul v-if="panel.items.length" class="max-h-80 overflow-y-auto">
                <li
                  v-for="item in panel.items"
                  :key="item.id"
                  class="border-b border-surface last:border-b-0"
                >
                  <NotificationFeedItem
                    :item="item"
                    @open="open(item, $event)"
                    @mark-read="markRead(item.id)"
                  />
                </li>
              </ul>
              <div v-else class="flex flex-col items-center gap-2 py-8 text-center">
                <component
                  :is="panel.value === 'unread' ? CheckCircle : Inbox"
                  :size="28"
                  aria-hidden="true"
                  class="text-muted"
                />
                <p class="font-medium">{{ panel.empty }}</p>
                <p class="text-muted">New order, approval and delivery updates appear here.</p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <a
          href="#notification-inbox"
          class="self-center rounded-sm font-medium text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          @click="popover?.hide()"
          >View all notifications</a
        >
      </div>
    </Popover>
  </div>
</template>
