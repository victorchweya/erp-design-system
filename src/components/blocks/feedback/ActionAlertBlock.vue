<script setup lang="ts">
import { shallowRef } from 'vue'
import CheckCircle from '@primeicons/vue/check-circle'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'

const state = shallowRef<'review' | 'reviewed' | 'dismissed'>('review')
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 py-4 sm:py-6">
    <Message
      v-if="state !== 'dismissed'"
      :key="state"
      :severity="state === 'review' ? 'warn' : 'success'"
      closable
      :closeButtonProps="{ 'aria-label': 'Dismiss quantities notice' }"
      :pt="
        state === 'review'
          ? {
              content: { class: 'items-start' },
              text: { class: 'min-w-0 flex-1' },
              closeButton: { class: 'shrink-0 self-start' },
            }
          : undefined
      "
      class="w-full"
      @close="state = 'dismissed'"
    >
      <template #icon>
        <component
          :is="state === 'review' ? ExclamationTriangle : CheckCircle"
          size="var(--p-message-icon-size)"
          :class="['shrink-0', { 'mt-0.5': state === 'review' }]"
          aria-hidden="true"
        />
      </template>
      <div v-if="state === 'review'" class="flex min-w-0 flex-col items-start gap-2">
        <span>Two quantities changed. Review them before confirming.</span>
        <Button type="button" severity="warn" size="small" outlined @click="state = 'reviewed'"
          >Mark as reviewed</Button
        >
      </div>
      <span v-else>Quantities reviewed. The order is ready for confirmation.</span>
    </Message>
    <Button
      v-if="state !== 'review'"
      type="button"
      severity="secondary"
      outlined
      size="small"
      @click="state = 'review'"
      >Reset preview</Button
    >
  </div>
</template>
