<script setup lang="ts">
import { computed, ref, shallowRef, useId } from 'vue'

type Channel = 'inApp' | 'email' | 'sms'
type Preferences = Record<string, Record<Channel, boolean>>

const id = useId()
const channels: { id: Channel; label: string }[] = [
  { id: 'inApp', label: 'In-app' },
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
]
const events: {
  id: string
  group: string
  label: string
  /** Channels that cannot be changed, with the reason shown to the user. */
  locked?: { channel: Channel; reason: string }
}[] = [
  { id: 'order-new', group: 'Orders', label: 'New customer order' },
  { id: 'order-changed', group: 'Orders', label: 'Order changed by customer' },
  {
    id: 'approval-needed',
    group: 'Approvals',
    label: 'Purchase order needs my approval',
    locked: { channel: 'inApp', reason: 'Approvals always appear in the app.' },
  },
  { id: 'approval-decided', group: 'Approvals', label: 'My request was approved or rejected' },
  { id: 'delivery-delayed', group: 'Deliveries', label: 'Delivery delayed' },
  { id: 'delivery-completed', group: 'Deliveries', label: 'Delivery completed' },
  { id: 'maintenance', group: 'System', label: 'Scheduled maintenance' },
  {
    id: 'security',
    group: 'System',
    label: 'Sign-in from a new device',
    locked: { channel: 'email', reason: 'Security alerts are always emailed.' },
  },
]
const defaults: Preferences = {
  'order-new': { inApp: true, email: false, sms: false },
  'order-changed': { inApp: true, email: true, sms: false },
  'approval-needed': { inApp: true, email: true, sms: false },
  'approval-decided': { inApp: true, email: false, sms: false },
  'delivery-delayed': { inApp: true, email: false, sms: true },
  'delivery-completed': { inApp: true, email: false, sms: false },
  maintenance: { inApp: true, email: true, sms: false },
  security: { inApp: true, email: true, sms: false },
}

const clone = (value: Preferences): Preferences => JSON.parse(JSON.stringify(value))
const saved = shallowRef<Preferences>(clone(defaults))
const draft = ref<Preferences>(clone(defaults))
const status = shallowRef('')
const changed = computed(() => JSON.stringify(draft.value) !== JSON.stringify(saved.value))
const groups = computed(() =>
  [...new Set(events.map((event) => event.group))].map((group) => ({
    group,
    events: events.filter((event) => event.group === group),
  })),
)

function save() {
  saved.value = clone(draft.value)
  status.value = 'Notification preferences saved.'
}
function discard() {
  draft.value = clone(saved.value)
  status.value = 'Changes discarded.'
}
</script>

<template>
  <Card>
    <template #title><h3 class="text-xl font-medium">Notification preferences</h3></template>
    <template #subtitle>Choose how you hear about each event.</template>
    <template #content>
      <form class="flex flex-col gap-4 text-sm" novalidate @submit.prevent="save">
        <div
          class="overflow-x-auto rounded-border border border-surface"
          role="region"
          :aria-labelledby="`${id}-caption`"
          tabindex="0"
        >
          <table class="w-full min-w-[32rem] border-collapse">
            <caption :id="`${id}-caption`" class="sr-only">
              Notification channels for each event
            </caption>
            <thead>
              <tr class="border-b border-surface">
                <th scope="col" class="p-3 text-left font-medium">Event</th>
                <th
                  v-for="channel in channels"
                  :id="`${id}-${channel.id}`"
                  :key="channel.id"
                  scope="col"
                  class="w-24 p-3 text-center font-medium"
                >
                  {{ channel.label }}
                </th>
              </tr>
            </thead>
            <tbody v-for="group in groups" :key="group.group">
              <tr class="border-b border-surface bg-emphasis">
                <th
                  :id="`${id}-${group.group}`"
                  scope="colgroup"
                  :colspan="channels.length + 1"
                  class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted"
                >
                  {{ group.group }}
                </th>
              </tr>
              <tr
                v-for="event in group.events"
                :key="event.id"
                class="border-b border-surface last:border-b-0"
              >
                <th :id="`${id}-${event.id}`" scope="row" class="p-3 text-left font-normal">
                  <span class="block">{{ event.label }}</span>
                  <span v-if="event.locked" class="block text-xs text-muted">{{
                    event.locked.reason
                  }}</span>
                </th>
                <td v-for="channel in channels" :key="channel.id" class="p-3 text-center">
                  <ToggleSwitch
                    v-model="draft[event.id]![channel.id]"
                    :disabled="event.locked?.channel === channel.id"
                    :ariaLabelledby="`${id}-${event.id} ${id}-${channel.id}`"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Button type="submit" size="small" :disabled="!changed">Save preferences</Button>
          <Button
            type="button"
            size="small"
            severity="secondary"
            outlined
            :disabled="!changed"
            @click="discard"
            >Discard changes</Button
          >
          <p role="status" :class="changed ? 'font-medium' : 'text-muted'">
            {{ changed ? 'You have unsaved changes.' : status }}
          </p>
        </div>
      </form>
    </template>
  </Card>
</template>
