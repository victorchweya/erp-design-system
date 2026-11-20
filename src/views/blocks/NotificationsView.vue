<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import NotificationCentreBlock from '@/components/blocks/notifications/NotificationCentreBlock.vue'
import code0 from '@/components/blocks/notifications/NotificationCentreBlock.vue?raw'
import NotificationInboxBlock from '@/components/blocks/notifications/NotificationInboxBlock.vue'
import code1 from '@/components/blocks/notifications/NotificationInboxBlock.vue?raw'
import NotificationPreferencesBlock from '@/components/blocks/notifications/NotificationPreferencesBlock.vue'
import code2 from '@/components/blocks/notifications/NotificationPreferencesBlock.vue?raw'
const examples = [
  {
    id: 'notification-centre',
    title: 'Notification centre',
    description:
      'Open recent notifications from the header bell, switch between all and unread, and mark items as read.',
    component: NotificationCentreBlock,
    code: code0,
  },
  {
    id: 'notification-inbox',
    title: 'Inbox',
    description:
      'Filter by type, select several notifications to mark as read or archive, and read details beside the list or below it on narrow screens.',
    component: NotificationInboxBlock,
    code: code1,
    mobilePreview: true,
  },
  {
    id: 'notification-preferences',
    title: 'Preferences',
    description:
      'Choose in-app, email, and SMS delivery for each event, with required channels explained.',
    component: NotificationPreferencesBlock,
    code: code2,
  },
]
const usage = [
  'The bell uses OverlayBadge for the unread count and Popover for recent items. The button name includes the count, so the visual badge is hidden from assistive technology. Unread items are marked with bold text and a “New” label, not colour alone.',
  'In the inbox, arrow keys, Home, and End move between notifications and Enter opens one. Checkboxes select items for bulk actions, and selection clears when the type filter changes. On narrow layouts, opening a notification moves focus to its details below the list.',
  'Preferences use a table with column and row headers, so each ToggleSwitch is named by its event and channel. Replace sample data and preview link handling with your notification API and router.',
]
</script>

<template>
  <BlockDoc
    title="Notifications"
    description="Patterns for surfacing updates, working through them, and choosing how they are delivered."
    :usage="usage"
    :examples="examples"
  />
</template>
