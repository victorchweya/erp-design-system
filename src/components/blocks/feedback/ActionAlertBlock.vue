<script setup lang="ts">
import { shallowRef } from 'vue'
import CheckCircle from '@primeicons/vue/check-circle'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'

const state = shallowRef<'review' | 'reviewed' | 'dismissed'>('review')
const messageLayout = {
  content: { class: 'items-start gap-3 p-4' },
  text: { class: 'min-w-0 flex-1' },
  closeButton: { class: '-mr-1 -mt-1' },
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 py-4 sm:py-6">
    <Message
      v-if="state !== 'dismissed'"
      :key="state"
      :severity="state === 'review' ? 'warn' : 'success'"
      closable
      :closeButtonProps="{ 'aria-label': 'Dismiss quantities notice' }"
      :pt="messageLayout"
      class="w-full"
      @close="state = 'dismissed'"
    >
      <template #icon>
        <component
          :is="state === 'review' ? ExclamationTriangle : CheckCircle"
          size="var(--p-message-icon-size)"
          class="mt-0.5 shrink-0"
          aria-hidden="true"
        />
      </template>
      <div class="flex min-w-0 flex-col gap-2 text-sm font-normal">
        <p class="font-medium">
          {{ state === 'review' ? 'Quantities need review' : 'Quantities reviewed' }}
        </p>
        <p v-if="state === 'review'">
          Two items changed since this order was created. Review them before confirming.
        </p>
        <p v-else>Quantities reviewed in this preview. The order is ready for confirmation.</p>
        <div v-if="state === 'review'" class="-ml-2 flex flex-wrap gap-2 pt-1">
          <Button type="button" severity="warn" size="small" text @click="state = 'reviewed'"
            >Mark as reviewed</Button
          >
        </div>
      </div>
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
