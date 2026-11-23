<script setup lang="ts">
import { computed, ref, useId, type Component } from 'vue'
import TimesCircle from '@primeicons/vue/times-circle'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import InfoCircle from '@primeicons/vue/info-circle'
import { alerts, initialTasks } from './dashboard'

const alertIcons: Record<string, Component> = { error: TimesCircle, warn: ExclamationTriangle, info: InfoCircle }

const id = useId()
const tasks = ref(initialTasks.map((task) => ({ ...task })))
const remaining = computed(() => tasks.value.filter(({ done }) => !done).length)
</script>

<template>
  <Card class="min-w-0">
    <template #title><h3 class="text-lg font-medium">Alerts and tasks</h3></template>
    <template #subtitle>Items that need attention today</template>
    <template #content>
      <div class="flex flex-col gap-6">
        <section :aria-labelledby="`${id}-alerts`" class="flex flex-col gap-3">
          <h4 :id="`${id}-alerts`" class="text-sm font-medium">Alerts ({{ alerts.length }})</h4>
          <Message v-for="alert in alerts" :key="alert.id" :severity="alert.severity" size="small">
            <template #icon="{ class: iconClass }">
              <component :is="alertIcons[alert.severity]" :class="iconClass" aria-hidden="true" />
            </template>
            {{ alert.title }}. {{ alert.detail }}
          </Message>
        </section>
        <section :aria-labelledby="`${id}-tasks`" class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2">
            <h4 :id="`${id}-tasks`" class="text-sm font-medium">My tasks</h4>
            <span role="status" class="text-xs text-muted">{{ remaining }} remaining</span>
          </div>
          <ul class="flex flex-col gap-3 text-sm">
            <li v-for="task in tasks" :key="task.id" class="flex items-start gap-2">
              <Checkbox v-model="task.done" :inputId="`${id}-${task.id}`" binary />
              <label :for="`${id}-${task.id}`" class="flex min-w-0 flex-col">
                <span :class="{ 'text-muted line-through': task.done }">{{ task.label }}</span>
                <span class="text-xs text-muted">Due {{ task.due }}</span>
              </label>
            </li>
          </ul>
        </section>
      </div>
    </template>
  </Card>
</template>
