<script setup lang="ts">
import { shallowRef } from 'vue'
import CheckCircle from '@primeicons/vue/check-circle'
import InfoCircle from '@primeicons/vue/info-circle'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'

const icons = { success: CheckCircle, info: InfoCircle, warn: ExclamationTriangle }

type Severity = 'success' | 'info' | 'warn'
type PreviewMessage = { id: number; severity: Severity; text: string }

const messages = shallowRef<PreviewMessage[]>([])

function addMessages() {
  messages.value = [
    { id: 1, severity: 'success', text: 'The inventory sync completed.' },
    { id: 2, severity: 'info', text: 'Four supplier records were updated.' },
    { id: 3, severity: 'warn', text: 'One record still needs review.' },
  ]
}

function clearMessages() {
  messages.value = []
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      <Button type="button" @click="addMessages">Add messages</Button>
      <Button type="button" severity="secondary" outlined @click="clearMessages"
        >Clear messages</Button
      >
    </div>
    <div class="flex flex-col gap-3" aria-live="polite">
      <Message v-for="message in messages" :key="message.id" :severity="message.severity">
        <template #icon="{ class: iconClass }">
          <component :is="icons[message.severity]" :class="iconClass" aria-hidden="true" />
        </template>
        {{ message.text }}
      </Message>
    </div>
  </div>
</template>
