<script setup lang="ts">
import { useId } from 'vue'
import Check from '@primeicons/vue/check'
import Inbox from '@primeicons/vue/inbox'
import { notificationTypes, type NotificationType } from './notifications'

defineProps<{ selectedCount: number; shownCount: number }>()
const emit = defineEmits<{ selectAll: [checked: boolean]; markRead: []; archive: [] }>()
const filter = defineModel<NotificationType | 'all'>('filter', { required: true })
const id = useId()
const filters = [
  { value: 'all', label: 'All' },
  ...Object.entries(notificationTypes).map(([value, { label }]) => ({ value, label })),
]
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-2">
      <span :id="`${id}-filter`" class="font-medium">Type</span>
      <SelectButton
        v-model="filter"
        :options="filters"
        optionLabel="label"
        optionValue="value"
        :allowEmpty="false"
        size="small"
        :aria-labelledby="`${id}-filter`"
        class="flex-wrap"
      />
    </div>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div class="flex items-center gap-2">
        <Checkbox
          :inputId="`${id}-all`"
          binary
          :modelValue="shownCount > 0 && selectedCount === shownCount"
          :indeterminate="selectedCount > 0 && selectedCount < shownCount"
          :disabled="!shownCount"
          @update:model-value="emit('selectAll', !!$event)"
        />
        <label :for="`${id}-all`">Select all shown</label>
      </div>
      <span class="text-muted" aria-live="polite">{{ selectedCount }} selected</span>
      <div class="flex flex-wrap gap-2">
        <Button
          type="button"
          size="small"
          severity="primary"
          outlined
          :disabled="!selectedCount"
          @click="emit('markRead')"
          ><Check aria-hidden="true" />Mark as read</Button
        >
        <Button
          type="button"
          size="small"
          severity="primary"
          outlined
          :disabled="!selectedCount"
          @click="emit('archive')"
          ><Inbox aria-hidden="true" />Archive</Button
        >
      </div>
    </div>
  </div>
</template>
