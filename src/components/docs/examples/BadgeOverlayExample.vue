<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import Bell from '@primeicons/vue/bell'
import FileCheck from '@primeicons/vue/file-check'
import Inbox from '@primeicons/vue/inbox'
const unread = shallowRef(3)
const pendingApprovals = 12
const notificationsLabel = computed(() =>
  unread.value > 0 ? `Notifications, ${unread.value} unread` : 'Notifications, none unread',
)
const status = computed(() => (unread.value === 0 ? 'All notifications marked as read.' : ''))
// The button name already includes the count, so hide the visual badge from assistive technology.
const hiddenBadge = { pcBadge: { root: { 'aria-hidden': 'true' } } }
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-6">
      <OverlayBadge v-if="unread > 0" :value="unread" severity="danger" :pt="hiddenBadge">
        <Button
          type="button"
          iconOnly
          severity="secondary"
          outlined
          :aria-label="notificationsLabel"
        >
          <Bell aria-hidden="true" focusable="false" />
        </Button>
      </OverlayBadge>
      <Button
        v-else
        type="button"
        iconOnly
        severity="secondary"
        outlined
        :aria-label="notificationsLabel"
      >
        <Bell aria-hidden="true" focusable="false" />
      </Button>
      <OverlayBadge :value="pendingApprovals" severity="warn" :pt="hiddenBadge">
        <Button
          type="button"
          iconOnly
          severity="secondary"
          outlined
          :aria-label="`Purchase orders awaiting approval, ${pendingApprovals}`"
        >
          <FileCheck aria-hidden="true" focusable="false" />
        </Button>
      </OverlayBadge>
      <OverlayBadge severity="info" :pt="hiddenBadge">
        <Button
          type="button"
          iconOnly
          severity="secondary"
          outlined
          aria-label="Supplier messages, new messages"
        >
          <Inbox aria-hidden="true" focusable="false" />
        </Button>
      </OverlayBadge>
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <Button
        type="button"
        severity="secondary"
        size="small"
        :disabled="unread === 0"
        label="Mark notifications read"
        @click="unread = 0"
      />
      <p role="status" class="text-muted-color">{{ status }}</p>
    </div>
  </div>
</template>
