<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import DeliveryCalendarBlock from '@/components/blocks/scheduling/DeliveryCalendarBlock.vue'
import calendarCode from '@/components/blocks/scheduling/DeliveryCalendarBlock.vue?raw'
import StatusBoardBlock from '@/components/blocks/scheduling/StatusBoardBlock.vue'
import boardCode from '@/components/blocks/scheduling/StatusBoardBlock.vue?raw'

const examples = [
  {
    id: 'delivery-calendar',
    title: 'Delivery calendar',
    description:
      'Plan delivery and farm pickup runs by week or month, jump to a date, and open a run to see its vehicle, driver, and crates.',
    component: DeliveryCalendarBlock,
    code: calendarCode,
    mobilePreview: true,
  },
  {
    id: 'status-board',
    title: 'Status board',
    description:
      'Track orders from received to delivered. Drag cards between columns or move them from each card’s menu.',
    component: StatusBoardBlock,
    code: boardCode,
    mobilePreview: true,
  },
]
const usage = [
  'Weeks start on Monday and dates use Nairobi time. The week view becomes a day-by-day agenda when its container is narrow, and the month view counts runs per day; choose a day to open its week.',
  'The calendar uses headings, lists, and a native table rather than an ARIA grid. Each run and each day is a button in normal tab order, so screen readers get row and column headers without a custom arrow-key model to learn or maintain.',
  'Dragging is a shortcut, not the only way to move a card. Move to opens a menu with the other columns, focus returns to the moved card, and a status message announces the change and the new column count.',
  'These examples use local sample data. Connect runs, order stages, and permission checks to your planning and fulfilment services, and confirm moves the server rejects.',
]
</script>

<template>
  <BlockDoc
    title="Scheduling"
    description="Calendar and status-board patterns for planning runs and moving orders through fulfilment."
    :usage="usage"
    :examples="examples"
  />
</template>
