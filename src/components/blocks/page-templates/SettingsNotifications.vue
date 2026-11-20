<script setup lang="ts">
import { useId } from 'vue'
import { notificationOptions, type NotificationPreferences } from './settings'

const preferences = defineModel<NotificationPreferences>({ required: true })
const id = useId()

function update(key: keyof NotificationPreferences, value: boolean) {
  preferences.value = { ...preferences.value, [key]: value }
}
</script>

<template>
  <ul class="flex flex-col divide-y divide-surface-200 text-sm dark:divide-surface-700">
    <li
      v-for="option in notificationOptions"
      :key="option.key"
      class="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
    >
      <div class="flex min-w-0 flex-col gap-1">
        <label :for="`${id}-${option.key}`" class="font-medium">{{ option.label }}</label>
        <p :id="`${id}-${option.key}-help`" class="text-muted">{{ option.description }}</p>
      </div>
      <ToggleSwitch
        :inputId="`${id}-${option.key}`"
        :modelValue="preferences[option.key]"
        :aria-describedby="`${id}-${option.key}-help`"
        class="shrink-0"
        @update:modelValue="update(option.key, $event)"
      />
    </li>
  </ul>
</template>
